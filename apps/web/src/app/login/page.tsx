import Image from 'next/image'
import Link from "next/link";
import { PasskeyModal } from "@/components/PasskeyModal";
import { LoginForm } from '@/components/forms/LoginForm';

export default function Login({ searchParams }: SearchParamProps) {

  const isAdmin = searchParams?.admin === "true";
  return (
    <>
    <div className="flex h-screen max-h-screen">

      {/* //! OTP VERIFICATION PASSKEY MODEL */}
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          

          <LoginForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-white xl:text-left">
              © 2025 AditSidra Fest
            </p>
            <Link href="/create" className="text-red-500">
              CREATE EVENT
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="Concert"
        className="side-img max-w-[50%]"
      />
    </div>
    </>
  )
}