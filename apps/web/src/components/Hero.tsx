import Image from "next/image";


export default function Hero() {
    return (
    <>
    <div className="relative flex h-full w-full justify-center">
        <Image
          src="/assets/images/hero.png"
          alt="Gradient"
          width={1000}
          className="min-h-[320px] w-full object-cover lg:h-auto"
        />
        <div className="absolute center flex w-full flex-col items-center">
          <div className="flex w-full flex-col items-center lg:container lg:flex-row lg:justify-between lg:px-20">
            <p className="text-[#FFFFFF] text-center lg:text-[18px]">Trusted by these companies</p>
            
          </div>
        </div>
      </div>
    </>
  );
}
