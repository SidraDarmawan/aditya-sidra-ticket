"use client";
import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import Marquee from "react-fast-marquee";
import { Button } from "@/components/ui/button";

import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from "react";


export const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false)
  const handleNav = () => {
    setMenuOpen(!menuOpen)
  }

  return(
    <>
      <nav className="fixed bg-[#ffffff40] top-0 right-0 w-full z-50 backdrop-blur-sm shadow-md">
        {/* TEXT PROMO PALING ATAS */}
        <div className="bg-gradient-to-r from-cyan-500 to-secondary text-black py-1">
          <div className="container py-[2px] sm:block hidden">
            <div className="flex items-center justify-between">
              <Marquee className='text-sm'>BOOK NOW AND GET 20% OFF | You can book appointments from your comfort zone | Mobile no. +91 123456789</Marquee>
            </div>
          </div>
        </div>

        <div className="md:py-10 lg:py-5 flex px-[50px] items-center cursor-pointer py-5">
          <Link href={'/'}>
            <Image src="/assets/icons/logo-full_2.svg" alt="Logo" height={1000} width={1000} className="max-w-[30%] h-10 hover:drop-shadow-[0_0_0.3rem_#ffffff70] md:hidden lg:flex" />
          </Link>
          <div className='absolute right-0 px-10'>
            <ul className='hidden items-center justify-self-auto md:flex gap-x-[100px] p-[10px]'>
              <Link href={'/'}>
                <li className="text-black hover:text-blue-400 hover:drop-shadow-[0_0_0.3rem_#ffffff70] font-extrabold size-fit cursor-pointer">Home</li></Link>
              <Link href={'/about-us'}>
                <li className="text-black hover:text-blue-400 hover:drop-shadow-[0_0_0.3rem_#ffffff70] font-extrabold size-fit cursor-pointer">Details</li></Link>
              <Link href={'/service'}>
                <li className="text-black hover:text-blue-400 hover:drop-shadow-[0_0_0.3rem_#ffffff70] font-extrabold size-fit cursor-pointer">Promo</li></Link>
              <Link href={'/teams'}>
                <li className="text-black hover:text-blue-400 hover:drop-shadow-[0_0_0.3rem_#ffffff70] font-extrabold size-fit cursor-pointer">Review</li></Link>
              <Link href={'/teams'}>
                <Button className='bg-blue-400'>
                <li className="text-black hover:text-blue-400 hover:drop-shadow-[0_0_0.3rem_#ffffff70] font-extrabold size-fit cursor-pointer">Book Now</li></Button></Link>
            </ul>            
          </div>                  
        </div>
      </nav>

      {/* NAVBAR SCREEN KECIL */}
      
      <div className='fixed w-full z-50'>

        {/* INI ICON SHOW MENU nya */}
        <div onClick={handleNav} className="fixed items-center md:hidden right-[10%] cursor-pointer p-8 sm:p-14">
          <GiHamburgerMenu size={25} className="hover:drop-shadow-[0_0_0.3rem_#ffffff70]"/>               
        </div>

        <div className={
            menuOpen
            // INI JIKA MENU OPEN nya ngapain
            ? "fixed left-0 top-0 w-[40%] backdrop-blur-md md:hidden h-screen bg-gradient-to-br from-cyan-500 to-blue-500 ease-in duration-500"

            // INI JIKA MENU CLOSE nya ngapain
            : "fixed left-[-100%] w-[40%] backdrop-blur-md h-screen bg-gradient-to-br from-cyan-500 to-blue-500 ease-in duration-500" }>

            {/* INI ICON X nya */}
          <div className='flex w-full items-center justify-end p-[20px]'>
            <div onClick={handleNav} className='cursor-pointer hover:drop-shadow-[0_0_0.3rem_#ffffff70]'>
              <AiOutlineClose size={25} /></div></div>
          <div className='flex-col py-4 p-10'>
  
            <ul>
              <Link href={'/'}>
                <li onClick={() => setMenuOpen(false)}
                  className='py-4 font-extrabold size-fit cursor-pointer hover:text-blue-400 hover:drop-shadow-[0_0_0.3rem_#ffffff70]'>Home</li>
              </Link>
              <Link href={'/about-us'}>
                <li onClick={() => setMenuOpen(false)}
                  className='py-4 font-extrabold size-fit cursor-pointer hover:text-blue-400 hover:drop-shadow-[0_0_0.3rem_#ffffff70]'>Details</li>
              </Link>
              <Link href={'/service'}>
                <li onClick={() => setMenuOpen(false)}
                  className='py-4 font-extrabold size-fit cursor-pointer hover:text-blue-400 hover:drop-shadow-[0_0_0.3rem_#ffffff70]'>Promo</li>
              </Link>
              <Link href={'/teams'}>
                <li onClick={() => setMenuOpen(false)}
                  className='py-4 font-extrabold size-fit cursor-pointer hover:text-blue-400 hover:drop-shadow-[0_0_0.3rem_#ffffff70]'>Review</li>
              </Link>
              <Link href={'/login'}>
                <li onClick={() => setMenuOpen(false)}
                  className='pl-8 py-4 font-extrabold size-fit cursor-pointer hover:text-blue-400 hover:drop-shadow-[0_0_0.3rem_#ffffff70]'>
                  <Button className='bg-blue-400'>Book Now</Button></li>
              </Link>
            </ul>            
          </div>
          <Link href={'/'} className="flex absolute bottom-0 down-[-100%] p-[50px] justify-center w-full hover:drop-shadow-[0_0_0.3rem_#ffffff70]">
            <Image src="/assets/icons/logo-full_2.svg" alt="Logo" height={1000} width={1000} className="h-10" />
          </Link>          
        </div>
      </div>

      
      
    </>
  )
};
