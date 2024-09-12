import LoginForm from "@/components/loginForm";
import Wrapper from "@/components/wrapper";
import { Suspense } from "react";

export default function Login () {
    return (
        <Wrapper>
            <div className="flex justify-center w-full ">
                <Suspense>
                    <LoginForm />
                </Suspense>
            </div>
        </Wrapper>
    )
}