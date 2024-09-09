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
          className="w-full object-cover min-h-[500px]"
        />
        <div className="pt-[200px] absolute center flex w-full flex-col items-center">
          <div className="lg:container lg:flex-row lg:justify-between">
            <Searchbar />
          </div>
        </div>
      </div>
    </>
  );
}
