import Image from "next/image";
import Searchbar from "./Searchbar";


export default function Hero() {
    return (
    <>
    <div className="relative flex h-full w-full justify-center pt-[112px]">
        <Image
          src="/assets/images/hero.png"
          alt="Gradient"
          width={1000}
          height={1000}
          className="max-h-[600px] w-full object-cover"
        />
        <div className="pt-[80px] absolute center flex w-full flex-col items-center">
          <div className="flex w-full lg:container lg:flex-row lg:justify-between lg:px-20">            
            <Searchbar />
          </div>
        </div>
      </div>
    </>
  );
}
