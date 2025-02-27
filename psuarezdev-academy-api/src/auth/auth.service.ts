import { compare } from 'bcrypt';
import { JwtService } from '@/shared/jwt.service';
import { UserService } from '@/user/user.service';
import { UtilsService } from '@/shared/utils.service';
import { StripeService } from '@/stripe/stripe.service';

import { UserDTO } from '@/user/dto/user.dto';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { CustomApiError } from '@/lib/errors';

export class AuthService {
  constructor(
    private readonly utilsService: UtilsService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly stripeService: StripeService
  ) { }

  async login(loginDto: LoginDTO) {
    try {
      const userFound = await this.userService.findByEmail(loginDto.email);

      if (!userFound) {
        throw new CustomApiError(400, 'Wrong credentials');
      }

      const passwordMatch = await compare(loginDto.password, userFound.password);

      if (!passwordMatch) {
        throw new CustomApiError(400, 'Wrong credentials');
      }

      const user = await this.utilsService.mapToDto(userFound, UserDTO);

      if (!user.dto || Object.keys(user.errors).length > 0) {
        throw new CustomApiError(400, 'Error mapping to UserDTO', user.errors);
      }

      const accessToken = this.jwtService.generateToken(user.dto);

      return { user: user.dto, accessToken };
    } catch (error) {
      return null;
    }
  }

  async register(registerDto: RegisterDTO) {
    try {
      const emailExists = await this.userService.findByEmail(registerDto.email);

      if (emailExists) {
        throw new CustomApiError(409, 'Email is already registered');
      }

      const user = await this.userService.create(registerDto);

      if (!user.dto || Object.keys(user.errors).length > 0) {
        throw new CustomApiError(500, 'Error mapping to UserDTO', user.errors);
      }

      const accessToken = this.jwtService.generateToken(user.dto);

      return { user: user.dto, accessToken };
    } catch (error) {
      return null;
    }
  }

  async profile(userDto: UserDTO, accessToken: string) {
    try {
      const user = await this.userService.findById(userDto.id);

      if (!user) return null;

      const subscription = user.subscriptionId
        ? await this.stripeService.getSubscription(user.subscriptionId)
        : null;

      return { ...user, accessToken, subscription };
    } catch (error) {
      return null;
    }
  }
}
