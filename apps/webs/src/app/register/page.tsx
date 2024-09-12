import RegisterForm from "@/components/registerForm";
import Wrapper from "@/components/wrapper";
  
export default function Register() {
    return (
        <Wrapper>
            <div className="pt-[112px] flex justify-center w-full ">
                <RegisterForm />
            </div>
        </Wrapper>
    )
}