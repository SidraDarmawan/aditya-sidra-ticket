import Image from 'next/image'
import Link from "next/link";
import { PasskeyModal } from "@/components/PasskeyModal";
import { PatientForm } from '@/components/forms/PatientForm';

export default function Login({ searchParams }: SearchParamProps) {

  const isAdmin = searchParams?.admin === "true";
  return (
    <>
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          

          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2025 AditSidra Care
            </p>
            <Link href="/?admin=true" className="text-green-500">
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