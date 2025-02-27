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
import { Course } from '@prisma/client';

interface CourseSelectorProps {
  courses: Course[];
  onSelect: (course: Course | null) => void;
  defaultValue?: string;
  widthClass?: string;
  showCheck?: boolean;
}


export default function CourseSelector({ courses, onSelect, defaultValue, widthClass, showCheck = true }: CourseSelectorProps) {
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
            ? courses.find(course => course.id === value)?.title
            : 'Seleccionar curso...'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn('p-0', widthClass ? widthClass : 'w-[200px]')}>
        <Command>
          <CommandInput placeholder="Buscar curso..." />
          <CommandList>
            <CommandEmpty>No hay cursos.</CommandEmpty>
            <CommandGroup>
              {courses.map(course => (
                <CommandItem
                  key={course.id}
                  value={course.title}
                  onSelect={(currentValue) => {
                    setValue(currentValue.toLowerCase() === value.toLowerCase() ? '' : course.id);
                    onSelect(currentValue.toLowerCase() === value.toLowerCase() ? null : course);
                    setOpen(false);
                  }}
                >
                  {course.title}
                  {showCheck && (
                    <Check
                      className={cn(
                        'ml-auto',
                        value === course.id ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
