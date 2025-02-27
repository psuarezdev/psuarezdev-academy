import { ProductDetail } from '@/stripe/stripe.service';
import { Role } from '@prisma/client';
import { Expose, Exclude } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, Length } from 'class-validator';
import Stripe from 'stripe';

export class UserDTO {
  @Expose()
  @IsNotEmpty({ message: 'ID cannot be empty' })
  id!: string;

  @Expose()
  subscriptionId!: string | null;

  @Expose()
  @IsNotEmpty({ message: 'First name cannot be empty' })
  @Length(2, 50, { message: 'First name must be between 2 and 50 characters' })
  firstName!: string;

  @Expose()
  @IsNotEmpty({ message: 'Last name cannot be empty' })
  @Length(2, 50, { message: 'Last name must be between 2 and 50 characters' })
  lastName!: string;

  @Expose()
  @IsEmail({}, { message: 'Email must be valid' })
  email!: string;

  @Expose()
  @IsEnum(Role, { message: `Role must be one of this options: ${Object.values(Role).join(', ')}` })
  role!: Role;

  @Expose()
  subscription!: Stripe.Response<Stripe.Subscription> & {
    productDetails: ProductDetail | null;
  } | null;

  @Expose()
  avatar!: string;

  @Exclude()
  password!: string;
}
