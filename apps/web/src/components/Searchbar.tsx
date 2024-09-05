'use client';
import * as React from "react"
import {useState} from "react";
import Search from "@/components/search";

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
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (value: string) => {
        // Here, you can access the search value when Enter is pressed
        console.log(value);
        setSearchValue(value);
    };

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

  return (
    <>
    <main className=" flex w-full min-h-screen flex-col items-center justify-between">
      <div className="w-full max-w-[60%] items-center justify-between lg:flex-inline">
        <h1 className='text-white text-5xl pb-1 text-center'><b>Spirit of Java Festival</b></h1>
        <p className="text-white text-3xl pb-10 text-center">Thank you and See you at</p>
        <div className="flex w-full justify-center space-x-10">

          <div className="lg:inline-block min-w-[500px]">
              <Search onSearch={handleSearch} />
              <p className="text-white text-[10px] p-1 pl-[20px]">Search for Event, Promo, Review, Details etc ...</p>
          </div>

          <div className="lg:inline-block min-w-[200px]">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {value
                  ? combobox.find((framework) => framework.value === value)?.label
                  : "Select the location..."}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search Location..." className="h-9" />
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
        <h2 className='text-white text-xs flex w-full justify-center pt-[70px]'>This is what you are looking for:</h2>
        <p className=''> {searchValue}</p>
      </div>
    </main>
    </>
  )
}
