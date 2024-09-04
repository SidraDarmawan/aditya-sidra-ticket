'use client';
import {useState} from "react";
import Search from "@/components/search";

export default function Searchbar() {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (value: string) => {
        // Here, you can access the search value when Enter is pressed
        console.log(value);
        setSearchValue(value);
    };

  return (
    <>
    <main className=" flex w-full min-h-screen flex-col items-center justify-between">
      <div className="w-full max-w-[60%] items-center justify-between lg:flex-inline">
        <h1 className='text-3xl pb-2 text-center'><b>View Doctor, Book an Appointment</b></h1>
        <p className="pb-8 text-center">Find the best doctors, clinics & hospitals in the city nearest to you.</p>
            <div className="absolute right-[25%]">
                <Search onSearch={handleSearch} />
            </div>
        <h2 className='text-2xl mt-20 mx-2'>Searched for:</h2>
        <p className=''> {searchValue}</p>
      </div>
    </main>
    </>
  )
}
