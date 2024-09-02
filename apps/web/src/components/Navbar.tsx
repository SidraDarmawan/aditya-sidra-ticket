"use client";
import React from 'react';
import Image from "next/image";
import Link from 'next/link';
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
      <nav className="fixed bg-[#2b2b2b40] top-0 right-0 w-full z-50 backdrop-blur-sm shadow-md">
        {/* TEXT PROMO PALING ATAS */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white ">
          <div className="container py-[2px] sm:block hidden">
            <div className="flex items-center justify-between">
              <p className="text-sm">20% off on next booking</p>
              <p>mobile no. +91 123456789</p>
            </div>
          </div>
        </div>

        <div className="flex px-[50px] items-center">
          <Link href={'/'}>
            <Image src="/assets/icons/logo-full_2.svg" alt="Logo" height={1000} width={1000} className="h-10 hover:drop-shadow-[0_0_0.3rem_#ffffff70]" />
          </Link>
          <div className=''>
            <ul className='hidden justify-self-auto md:flex gap-x-[100px] p-[10px]'>
              <Link href={'/'}>
                <li className="text-black hover:text-purple-600 hover:drop-shadow-[0_0_0.3rem_#ffffff70] font-extrabold size-fit cursor-pointer">Home</li></Link>
              <Link href={'/about-us'}>
                <li className="text-black hover:text-purple-600 hover:drop-shadow-[0_0_0.3rem_#ffffff70] font-extrabold size-fit cursor-pointer">About Us</li></Link>
              <Link href={'/service'}>
                <li className="text-black hover:text-purple-600 hover:drop-shadow-[0_0_0.3rem_#ffffff70] font-extrabold size-fit cursor-pointer">Service</li></Link>
              <Link href={'/teams'}>
                <li className="text-black hover:text-purple-600 hover:drop-shadow-[0_0_0.3rem_#ffffff70] font-extrabold size-fit cursor-pointer">Teams</li></Link>
              <Link href={'/teams'}>
                <Button>
                <li className="text-black hover:text-purple-600 hover:drop-shadow-[0_0_0.3rem_#ffffff70] font-extrabold size-fit cursor-pointer">Book Now</li></Button></Link>
            </ul>            
          </div>                  
        </div>
      </nav>

      {/* NAVBAR SCREEN KECIL */}
      <div onClick={handleNav} className="fixed items-center md:hidden right-[10%] cursor-pointer p-[50px] z-10">
          <GiHamburgerMenu size={25} className="hover:drop-shadow-[0_0_0.3rem_#ffffff70]"/>               
      </div>
      <div className='fixed w-full z-10'>
        <div className={
            menuOpen
            ? "fixed left-0 top-0 w-[40%] backdrop-blur-md md:hidden h-screen bg-gradient-to-r from-cyan-500 ease-in duration-500"
            : "fixed left-[-100%] w-[40%] backdrop-blur-md h-screen bg-gradient-to-r from-cyan-500 ease-in duration-500" }>
          <div className='flex w-full items-center justify-end p-[50px]'>
            <div onClick={handleNav} className='cursor-pointer hover:drop-shadow-[0_0_0.3rem_#ffffff70]'>
              <AiOutlineClose size={25} /></div></div>
          <div className='flex-col py-4 p-10'>
            <ul>
              <Link href={'/'}>
                <li onClick={() => setMenuOpen(false)}
                  className='py-4 font-extrabold size-fit cursor-pointer hover:text-purple-800 hover:drop-shadow-[0_0_0.3rem_#ffffff70]'>Home</li>
              </Link>
              <Link href={'/about-us'}>
                <li onClick={() => setMenuOpen(false)}
                  className='py-4 font-extrabold size-fit cursor-pointer hover:text-purple-800 hover:drop-shadow-[0_0_0.3rem_#ffffff70]'>About Us</li>
              </Link>
              <Link href={'/service'}>
                <li onClick={() => setMenuOpen(false)}
                  className='py-4 font-extrabold size-fit cursor-pointer hover:text-purple-800 hover:drop-shadow-[0_0_0.3rem_#ffffff70]'>Service</li>
              </Link>
              <Link href={'/teams'}>
                <li onClick={() => setMenuOpen(false)}
                  className='py-4 font-extrabold size-fit cursor-pointer hover:text-purple-800 hover:drop-shadow-[0_0_0.3rem_#ffffff70]'>Teams</li>
              </Link>
              <Link href={'/login'}>
                <li onClick={() => setMenuOpen(false)}
                  className='py-4 font-extrabold size-fit cursor-pointer hover:text-purple-800 hover:drop-shadow-[0_0_0.3rem_#ffffff70]'>Login</li>
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
