import { FaEnvelope } from "react-icons/fa";


export default function Footer() {
  return (
  <>
    <section className="bg-slate-900 md:bg-[#0C0C0C] w-full pt-32">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col mx-auto">
          <h1 className="text-white text-center font-serif text-3xl md:text-4xl">Come Talk With Us</h1>
          <div className="text-gray-300 text-center text-[10px] font-serif pt-14 md:flex md:justify-between md:px-20 md:text-sm">
            <div className="flex flex-col items-center pb-16">
              <p className="pb-3">STAY UP TO DATE <span className="block">WITH OUR NEW SLETTER</span></p>
              <div className="flex justify-center items-center rounded-full border w-10 h-10 ">
                <FaEnvelope />
              </div>
            </div>
            <div className="flex flex-col items-center pb-16">
              <p className="pb-3">CONTACT OUR GENERAL MANAGER</p>
              <button className="border px-3 py-2 rounded-sm">VALERIE VAN DELFT</button></div>
                <div className="flex flex-col items-center  pb-16">
                  <p className="pb-3">AGENCY PRESENTATION</p>
                  <div className="flex justify-center items-center rounded-full border w-10 h-10 ">
                  </div>
                </div>
          </div>
        </div>
      </div>
      <div className="w-full  bg-gray-800  py-5 md:bg-[#131313]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-around md:gap-5 md:px-10 items-center text-gray-300 text-sm font-semibold">
          <p className="hidden md:flex">CONTACT US</p>
          <p className="">NEWSLETTER</p>
          <p className="hidden md:flex">PODCAST</p>
          <p className="hidden md:flex">1 SITE PAR JOUR</p>
          <p className="hidden md:flex">AGENCY PRESENTATION</p>
          <p className="md:hidden">AGENCY PRES.</p>
        </div>
      </div>
    </section>
  </>
);
}