'use client';

import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { User } from '@prisma/client';

interface UserSelectorProps {
  users: Omit<User, 'password'>[];
  onSelect: (user: Omit<User, 'password'> | null) => void;
  defaultValue?: string;
  widthClass?: string;
  isInstructor?: boolean;
}

export default function UserSelector({ widthClass, defaultValue, users, onSelect, isInstructor = true }: UserSelectorProps) {
  const [value, setValue] = useState(defaultValue ?? '');
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className={cn('justify-between',  widthClass ? widthClass : 'w-[200px]')}
      >
        {value
          ? `${users.find(user => user.id === value)?.firstName} ${users.find(user => user.id === value)?.lastName}`
          : `Seleccionar ${isInstructor ? 'instructor' : 'usuario'}...`}
        <ChevronsUpDown className="opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className={cn('p-0', widthClass ? widthClass : 'w-[200px]')}>
      <Command>
        <CommandInput placeholder={`Buscar ${isInstructor ? 'instructor' : 'usuario'}...`} />
        <CommandList>
          <CommandEmpty>No hay {isInstructor ? 'instructores' : 'usuarios'}.</CommandEmpty>
          <CommandGroup>
            {users.map(user => (
              <CommandItem
                key={user.id}
                value={`${user.firstName} ${user.lastName}`}
                onSelect={(currentValue) => {
                  setValue(currentValue.toLowerCase() === value.toLowerCase() ? '' : user.id);
                  onSelect(currentValue.toLowerCase() === value.toLowerCase() ? null : user);
                  setOpen(false);
                }}
              >
                {user.firstName} {user.lastName}
                <Check
                  className={cn(
                    'ml-auto',
                    value === user.id ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
  );
}
