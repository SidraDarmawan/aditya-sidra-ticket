import Image from "next/image";
import { redirect } from "next/navigation";

import RegisterForm from "@/components/forms/RegisterForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";

// INI DYNAMIC SESUAI DENGAN PERUBAHAN ID USER
const Registered = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  const userA = await getPatient(userId);

  if (userA) redirect(`/register/${userId}/new-user`);

  return (
    <div className="flex pt-[112px]">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          

          <RegisterForm user={user} />
          

          <p className="copyright py-12">© 2024 AditSidra Fest</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="USER"
        className="side-img max-w-[50%] min-h-[600px]"
      />
    </div>
  );
};

export default Registered;
