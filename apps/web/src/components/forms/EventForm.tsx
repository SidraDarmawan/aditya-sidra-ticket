"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { registerPatient } from "@/lib/actions/patient.actions";
import { PatientFormValidation } from "@/lib/validation";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { FileUploader } from "../FileUploader";
import SubmitButton from "../SubmitButton";

const EventForm = ({ user }: { user: User }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
  
    const form = useForm<z.infer<typeof PatientFormValidation>>({
      resolver: zodResolver(PatientFormValidation),
      defaultValues: {
        ...PatientFormDefaultValues,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  
    const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
      setIsLoading(true);
  
      // Store file info in form data as
      let formData;
      if (
        values.identificationDocument &&
        values.identificationDocument?.length > 0
      ) {
        const blobFile = new Blob([values.identificationDocument[0]], {
          type: values.identificationDocument[0].type,
        });
  
        formData = new FormData();
        formData.append("blobFile", blobFile);
        formData.append("fileName", values.identificationDocument[0].name);
      }
  
      try {
        const patient = {
          userId: user.$id,
          name: values.name,
          email: values.email,
          phone: values.phone,
          birthDate: new Date(values.birthDate),
          gender: values.gender,
          address: values.address,
          occupation: values.occupation,
          emergencyContactName: values.emergencyContactName,
          emergencyContactNumber: values.emergencyContactNumber,
          primaryPhysician: values.primaryPhysician,
          insuranceProvider: values.insuranceProvider,
          insurancePolicyNumber: values.insurancePolicyNumber,
          allergies: values.allergies,
          currentMedication: values.currentMedication,
          familyMedicalHistory: values.familyMedicalHistory,
          pastMedicalHistory: values.pastMedicalHistory,
          identificationType: values.identificationType,
          identificationNumber: values.identificationNumber,
          identificationDocument: values.identificationDocument
            ? formData
            : undefined,
          privacyConsent: values.privacyConsent,
        };
  
        const newPatient = await registerPatient(patient);
  
        if (newPatient) {
          router.push(`/patients/${user.$id}/new-appointment`);
        }
      } catch (error) {
        console.log(error);
      }
  
      setIsLoading(false);
    };
  
    return (
        <Form {...form}>
            <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 space-y-12">

            <section className="space-y-6 text-white">
                <div className="mb-9 space-y-1">
                    <h2 className="sub-header">Create Event</h2>
                </div>

                <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="identificationType"
                    label="Identification Type"
                    placeholder="Select identification type"
                >
                    {IdentificationTypes.map((type, i) => (
                    <SelectItem key={type + i} value={type}>
                        {type}
                    </SelectItem>
                    ))}
                </CustomFormField>

                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="identificationNumber"
                    label="Identification Number"
                    placeholder="123456789"
                />

                <CustomFormField
                    fieldType={FormFieldType.SKELETON}
                    control={form.control}
                    name="identificationDocument"
                    label="Scanned Copy of Identification Document"
                    renderSkeleton={(field) => (
                    <FormControl>
                        <FileUploader files={field.value} onChange={field.onChange} />
                    </FormControl>
                    )}
                />
            </section>

            <section className="space-y-6">
                <div className="mb-9 space-y-1">
                    <h2 className="sub-header text-white">Consent and Privacy</h2>
                </div>

                <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name="treatmentConsent"
                    label="I consent to receive treatment for my health condition."
                />

                <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name="disclosureConsent"
                    label="I consent to the use and disclosure of my health
                    information for treatment purposes."
                />

                <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name="privacyConsent"
                    label="I acknowledge that I have reviewed and agree to the
                    privacy policy"
                />
            </section>
            <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
            </form>
        </Form>
    );
};

export default EventForm;