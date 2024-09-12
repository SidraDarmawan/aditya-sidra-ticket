"use client";
import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import Marquee from "react-fast-marquee";
import { Button } from "@/components/ui/button";

import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
// import AutocompleteSearchBar from './search/AutocompleteSearchBar';


export const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false)
  const handleNav = () => {
    setMenuOpen(!menuOpen)
  }

  return(
    <>
      <nav className="fixed bg-[#292929] top-0 right-0 w-full z-50 shadow-md">
        {/* TEXT PROMO PALING ATAS */}
        <div className="bg-gradient-to-r from-[#291261] to-[#57005a] text-[#ffffff] py-1">
          <div className="container py-[2px] sm:block hidden">
            <div className="flex items-center justify-between">
              <Marquee className='text-sm'>BOOK NOW AND GET 20% OFF | You can book the ticket in your comfort zone | Mobile no. +91 123456789</Marquee>
            </div>
          </div>
        </div>

        <div className="md:py-10 lg:py-5 flex px-[50px] items-center py-5">
          <Link href={'/'}>
            <Image src="/assets/icons/logo-full_1.svg" alt="Logo" height={1000} width={1000} className="max-w-[30%] h-10 hover:drop-shadow-[0_0_0.3rem_#ffffff70] md:hidden lg:flex" />
          </Link>
          <div className='absolute right-0 px-10'>
            <ul className='hidden items-center justify-self-auto md:flex gap-x-[50px] p-[10px]'>
              <Link href={'/'}>
                <li className="nav-link text-white hover:text-[#ff4693] hover:drop-shadow-[0_0_0.3rem_#ff445d70] font-extrabold size-fit cursor-pointer">Home</li></Link>
              <Link href={'/pricing'}>
                <li className="nav-link text-white hover:text-[#ff4693] hover:drop-shadow-[0_0_0.3rem_#ff445d70] size-fit cursor-pointer">Pricing</li></Link>
              <Link href={'/review'}>
                <li className="nav-link text-white hover:text-[#ff4693] hover:drop-shadow-[0_0_0.3rem_#ff445d70] size-fit cursor-pointer">Review</li></Link>

              <div className="px-[] justify-center items-center">
                {/* <AutocompleteSearchBar /> */}
              </div>

              <Button className='bg-[#ff2ba0] space-x-[10px] min-w-[50px]'>
                <Link href={'/register'}>                  
                  <li className=" hover:text-[#ff4693] hover:drop-shadow-[0_0_0.3rem_#ff445d70]  cursor-pointer">Register</li></Link>
                <Link href={'/login'}>                  
                  <li className=" hover:text-[#ff4693] hover:drop-shadow-[0_0_0.3rem_#ff445d70]  cursor-pointer">Login</li></Link>
              </Button>
            </ul>
          </div>                  
        </div>
      </nav>

      {/* NAVBAR SCREEN KECIL */}
      
      <div className='fixed w-full z-50'>

        {/* INI ICON SHOW MENU nya */}
        <div onClick={handleNav} className="fixed items-center md:hidden right-[10%] cursor-pointer p-8 sm:p-14">
          <GiHamburgerMenu size={25} fill='white' className="hover:drop-shadow-[0_0_0.3rem_#ffffff70]"/>               
        </div>

        <div className={
            menuOpen
            // INI JIKA MENU OPEN nya ngapain
            ? "fixed left-0 top-0 w-[30%] backdrop-blur-md md:hidden h-full bg-gradient-to-br from-[#272727] to-[#111111] ease-in duration-500"

            // INI JIKA MENU CLOSE nya ngapain
            : "fixed left-[-100%] w-[30%] backdrop-blur-md h-full bg-gradient-to-br from-[#272727] to-[#111111] ease-in duration-500" }>

            {/* INI ICON X nya */}
          <div className='flex w-full items-center justify-end p-[20px]'>
            <div onClick={handleNav} className='cursor-pointer hover:drop-shadow-[0_0_0.3rem_#ffffff70]'>
              <IoClose size={25} fill='white' />
            </div>
          </div>
          
          <div className='flex-col px-[30px]'>  
            <ul className=''>
              <Link href={'/'}>
                <li onClick={() => setMenuOpen(false)}
                  className='text-white py-4 font-extrabold size-fit cursor-pointer hover:text-[#f04aff] hover:drop-shadow-[0_0_0.3rem_#c2384f70]'>Home</li>
              </Link>
              <Link href={'/pricing'}>
                <li onClick={() => setMenuOpen(false)}
                  className='text-white py-4 font-extrabold size-fit cursor-pointer hover:text-[#f04aff] hover:drop-shadow-[0_0_0.3rem_#c2384f70]'>Pricing</li>
              </Link>
              <Link href={'/review'}>
                <li onClick={() => setMenuOpen(false)}
                  className='text-white py-4 font-extrabold size-fit cursor-pointer hover:text-[#f04aff] hover:drop-shadow-[0_0_0.3rem_#c2384f70]'>Review</li>
              </Link>

              <Link href={'/register'}>
                <li onClick={() => setMenuOpen(false)}
                  className='sm:hidden flex text-white py-4 font-extrabold size-fit cursor-pointer hover:text-[#f04aff] hover:drop-shadow-[0_0_0.3rem_#c2384f70]'>Register</li>
              </Link>
              <Link href={'/login'}>
                <li onClick={() => setMenuOpen(false)}
                  className='sm:hidden flex text-white py-4 font-extrabold size-fit cursor-pointer hover:text-[#f04aff] hover:drop-shadow-[0_0_0.3rem_#c2384f70]'>Login</li>
              </Link>
              
              
              <Button className='hidden sm:flex mt-[16px] bg-[#ff2ba0] hover:bg-[#181818] space-x-3 w-full justify-center'>
                <Link href={'/register'}>
                  <li onClick={() => setMenuOpen(false)}
                    className='hover:text-[#f04aff] hover:drop-shadow-[0_0_0.3rem_#ff445d70] cursor-pointer'>
                    Register</li>
                </Link>
                <Link href={'/login'}>
                  <li onClick={() => setMenuOpen(false)}
                    className='hover:text-[#f04aff] hover:drop-shadow-[0_0_0.3rem_#ff445d70] cursor-pointer'>
                    Login</li>
                </Link>
              </Button>
            </ul>            
          </div>
          <Link href={'/'} className="flex absolute bottom-[5%] down-[-100%] px-[15px] justify-center w-full">
            <Image src="/assets/icons/logo-full_1.svg" alt="Logo" height={1000} width={1000} className="h-[100px] hover:drop-shadow-[0_0_0.3rem_#ffffff70] cursor-pointer" />
          </Link>          
        </div>
      </div>      
    </>
  )
};
