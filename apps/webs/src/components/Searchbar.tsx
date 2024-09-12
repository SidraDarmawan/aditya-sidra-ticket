'use client';
import * as React from "react"


import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


const combobox = [
  {
    value: "next.js",
    label: "Jakarta",
  },
  {
    value: "sveltekit",
    label: "Bandung",
  },
  {
    value: "nuxt.js",
    label: "Semarang",
  },
  {
    value: "remix",
    label: "Surabaya",
  },
  {
    value: "astro",
    label: "Jogja",
  },
]

export default function Searchbar() {
    
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

  return (
    <>
    <main className=" flex w-full flex-col items-center justify-between">
      <div className="w-full max-w-[60%] items-center justify-between lg:flex-inline">
        <h1 className='text-white text-5xl pb-1 text-center'><b>Spirit of Java Festival</b></h1>
        <p className="text-white text-3xl pb-10 text-center">Thank you and See you at</p>
        <div className="sm:flex flex-row w-full justify-center space-x-5">

          <div className="hidden sm:flex lg:inline-block min-w-[200px]">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="text-[#0000006c] w-[200px] justify-between"
                >
                  {value
                    ? combobox.find((framework) => framework.value === value)?.label
                    : "Search Location"}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Type here" className="" />
                  <CommandList>
                    <CommandEmpty>No Location Exist</CommandEmpty>
                    <CommandGroup>
                      {combobox.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          value={framework.value}
                          onSelect={(currentValue) => {
                            setValue(currentValue === value ? "" : currentValue)
                            setOpen(false)
                          }}
                        >
                          {framework.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              value === framework.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>          
        </div>
        
      </div>
    </main>
    </>
  )
}
