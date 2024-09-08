"use client";

import Link from 'next/link';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

// BUILDING FORMS with React Hook Form and Zod
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { createUser } from "@/lib/actions/patient.actions";
import { UserFormValidation } from "@/lib/validation";

import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";

export const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true); // INI UNTUK ASYNC ACTION

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      // ini untuk mengirim DATA USER KE CLOUD
      const newUser = await createUser(user);

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`); // INI URL nya DYNAMIC sesuai ID nya
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="text-white flex-1 space-y-6">
        <section className="mb-10 space-y-4">
          <h1 className="header">Sign in to Account</h1>
          <p className="">Get started here</p>
        </section>

        {/* ini sudah di DEVINE tipenya di Custom Form Field shg bisa digunakan lagi template nya */}
        <CustomFormField
          fieldType={FormFieldType.INPUT} // FormFieldType ini untuk menghindari TYPO dari INPUT 
          control={form.control}
          name="name"
          label="Full Name" // label di atas input
          placeholder="Your Name" // ini muncul di dalam box input
          iconSrc="/assets/icons/user.svg" // ini icon yg muncul didlm input
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Your Email"
          placeholder="yourmail@email.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone Number"
          placeholder="(62+) 123-4567-789"
        />

        {/* INI JIKA SUDAH DIKLIK AKAN MENGARAHKAN KE PAGE YG LAIN */}
        <SubmitButton isLoading={isLoading}>Sign Up</SubmitButton>
      </form>
    </Form>
  );
};
