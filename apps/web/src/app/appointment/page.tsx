import Image from 'next/image'
import Link from "next/link";
import { PasskeyModal } from "@/components/PasskeyModal";
import { PatientForm } from '@/components/forms/PatientForm';

export default function Appointment({ searchParams }: SearchParamProps) {

  const isAdmin = searchParams?.admin === "true";
  return (
    <>
    <div className="flex h-screen max-h-screen">

      {/* //! OTP VERIFICATION PASSKEY MODEL */}
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          

          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-700 xl:text-left">
              © 2025 AditSidra Care
            </p>
<<<<<<< HEAD
            <Link href="/AdminPage" className="text-blue-500">
=======

            {/* INI UNTUK MENUJU HALAMAN ADMIN BERIKUTNYA  */}
            <Link href="/?admin=true" className="text-green-500">
>>>>>>> caeb316f5659c81550d87fa8fd03f8da37f245df
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
    </>
  )
}