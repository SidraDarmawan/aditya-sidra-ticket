import Image from "next/image";
import { redirect } from "next/navigation";

import RegisterForm from "@/components/forms/RegisterForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";

// INI DYNAMIC SESUAI DENGAN PERUBAHAN ID USER
const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  const patient = await getPatient(userId);

  if (patient) redirect(`/patients/${userId}/new-appointment`);

  return (
    <div className="flex h-screen max-h-screen pt-[112px]">
      <section className="remove-scrollbar container">
        <div className="sub-container flex-1 flex-col">
          

          <RegisterForm user={user} />
          

          <p className="copyright py-12">© 2024 AditSidra Fest</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%] max-h-[750px]"
      />
    </div>
  );
};

export default Register;