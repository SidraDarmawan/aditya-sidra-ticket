'use client'
import React, { ChangeEvent, useState } from 'react';

export type SearchProps = {
    onSearch: (value: string) => void
}

const Search = (props: SearchProps) => {
    const { onSearch } = props;
    const placeholderValue ='Press ENTER'
    const [value, setValue] = useState('placeholderValue');

    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event;
        setValue(target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            // Here, we call the onSearch function and pass the value
            onSearch(value);
        }
    };

    return (
        <div className="relative w-full text-gray-600">
            <input
                type="search"
                name="search"
                placeholder={placeholderValue}
                className="bg-white h-10 px-5 pr-10 w-full *:text-sm focus:outline-none"
                onChange={searchHandler}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

export default Search;
