import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className="text-white w-full items-center justify-between flex max-w-[80%] mt-[50px] mb-[20px] mx-[150px]">
      <div className="flex w-full flex-col gap-5">
        <div className="flex flex-col items-start justify-center gap-[10%] md:flex-row">
          <Link href="/" className="mb-10">
            <Image
            src="/assets/icons/logo-full_1.svg"
            alt="Gradient"
            width={1000}
            height={1000}
            className="h-[150px] w-full object-cover cursor-pointer hover:drop-shadow-[0_0_0.3rem_#ffffff70]"></Image>
          </Link>

          <div className='flex flex-wrap gap-10 sm:justify-between md:flex-1'>
          {FOOTER_LINKS.map((columns) => (
              <FooterColumn title={columns.title}>
                <ul className="regular-14 flex flex-col gap-4 text-gray-30">
                  {columns.links.map((link) => (
                    <Link href="/" key={link}>
                      {link}
                    </Link>
                  ))}
                </ul>
              </FooterColumn>
            ))}

            <div className="flex flex-col gap-5 min-w-[196px]">
              <FooterColumn title={FOOTER_CONTACT_INFO.title}>
                {FOOTER_CONTACT_INFO.links.map((link) => (
                  <Link
                    href="/"
                    key={link.label}
                    className="flex gap-4 md:flex-col lg:flex-row"
                  >
                    <p className="whitespace-nowrap">
                      {link.label}:
                    </p>
                    <p className="medium-14 whitespace-nowrap text-blue-70">
                      {link.value}
                    </p>
                  </Link>
                ))}
              </FooterColumn>
            </div>

            <div className="flex flex-col gap-5 min-w-[196px]">
              <FooterColumn title={SOCIALS.title}>
                <ul className="regular-14 flex gap-4">
                  {SOCIALS.links.map((link) => (
                    <Link href="/" key={link}>
                      <Image src={link} alt="logo" width={25} height={25} className='h-[25px]' />
                    </Link>
                  ))}
                </ul>
              </FooterColumn>
            </div>
          </div>
        </div>
        <div className="border bg-gray-20" />
        <p className="regular-14 w-full text-center text-white">2024 Spirit of Java Festival | Adit Sidra</p>
      </div>
    </div>
  )
}

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
}

const FooterColumn = ({ title, children }: FooterColumnProps) => {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="text-2xl"><b>{title}</b></h4>
      {children}
    </div>
  )
}

export default Footer