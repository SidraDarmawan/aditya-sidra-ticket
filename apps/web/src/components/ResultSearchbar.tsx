import Search from "@/components/search";
import * as React from "react"
import {useState} from "react";

export default function ResultSearchbar () {
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
            <div className="">
                <div className="lg:inline-block min-w-[500px]">
                    <Search onSearch={handleSearch} />
                    <p className="text-white text-[10px] p-1 pl-[20px]">Search for Event, Promo, Review, Details etc ...</p>
                </div>
                <h2 className='text-white text-xs flex w-full justify-center pt-[70px]'>This is what you are looking for:</h2>
                <p className=''> {searchValue}</p>
            </div>
        </div>
    </main>
    </>
  );
};
