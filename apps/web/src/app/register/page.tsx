import Image from 'next/image'
import Link from "next/link";
import { PasskeyModal } from "@/components/PasskeyModal";
import { RegForm } from '@/components/forms/RegForm';

export default function Register ({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams?.admin === "true";
    
  return (
    <>
    <div className="flex pt-[112px] h-[650px]">

      {/* //! OTP VERIFICATION PASSKEY MODEL */}
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container">
        <div className="pt-[30px] items-center justify-center">
          

          <RegForm />

          <div className="text-14-regular mt-[25px] flex justify-between">
            <p className="justify-items-end text-white xl:text-left">
              © 2025 AditSidra Fest
            </p>
            <Link href="/login" className="text-[#ff4693]">
              Already have an Account?
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
  );
};
