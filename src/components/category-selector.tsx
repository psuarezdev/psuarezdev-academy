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
import { Category } from '@prisma/client';

interface InstructorSelectorProps {
  categories: Category[];
  onSelect: (category: Category | null) => void;
  defaultValue?: string;
  widthClass?: string;
}

export default function CategorySelector({ widthClass, defaultValue, categories, onSelect }: InstructorSelectorProps) {
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
          ? categories.find(categories => categories.id === value)?.name
          : 'Seleccionar categoría...'}
        <ChevronsUpDown className="opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className={cn('p-0', widthClass ? widthClass : 'w-[200px]')}>
      <Command>
        <CommandInput placeholder="Buscar instructor..." />
        <CommandList>
          <CommandEmpty>No hay categorías.</CommandEmpty>
          <CommandGroup>
            {categories.map(category => (
              <CommandItem
                key={category.id}
                value={category.name}
                onSelect={(currentValue) => {
                  setValue(currentValue.toLowerCase() === value.toLowerCase() ? '' : category.id);
                  onSelect(currentValue.toLowerCase() === value.toLowerCase() ? null : category);
                  setOpen(false);
                }}
              >
                {category.name}
                <Check
                  className={cn(
                    'ml-auto',
                    value === category.id ? 'opacity-100' : 'opacity-0'
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
