"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../ui/CustomFormField";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import SubmitButton from "../ui/SubmitButton"
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { GenderOptions } from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import { Doctors } from "@/constants";
import Image from "next/image";

const RegisterForm = ({ user }: { user: User }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",

    },
  });


  async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try{
      const userData = { name, email, phone };

      const user = await createUser(userData);
      
      if(user) router.push(`/patients/${user.$id}/register`)
    } catch(error){
      console.log(error)
    }

    setIsLoading(false);
  }
  return (  
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Welcome </h1>
          <p className="text-dark-700">
           Let us know more about yourself.
          </p>
        </section>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
          <h2 className= "sub-header">
           Personal Information
          </h2>
          </div>
        </section>

        <CustomFormField 
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="(555) 123-4567"
        />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="birthDate"
          label="Date of Birth"
        
        />

        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="gender"
          label="Gender"
          renderSkeleton={(field) => (
            <FormControl>
                <RadioGroup className="flex h-11 gap-6 xl:justify-between" 
                onValueChange={field.onChange}
                defaultValue={field.value}
                >
                  {GenderOptions.map((option) => (
                    <div key={option}
                    className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option}
                      className="cursor-pointer">
                        {option}
                      </Label> 
                    </div>
                        
                  ))}
               

                </RadioGroup>
            </FormControl>
  )}
        />
        </div>


        <div className="flex flex-col gap-6 xl:flex-row">

        <CustomFormField 
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="address"
          label="Address"
          placeholder="Building, Street, City"
        
        />

<CustomFormField 
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="occupation  "
          label="Occupation"
          placeholder="Engineer, Nurse, etc"
        
        />
          
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">

          <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="emergencyContact"
          label="Emergency Contact Name"
          placeholder="Guardian, Spouse, etc"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="emergencyContactNumber"
          label="Emergency Contact Number"
          placeholder="(555) 123-4567"
        />
          </div>

          <section className=" space-y-6">
          <div className="mb-9 space-y-1">
          <h2 className= "sub-header text-dark-700">
           Medical Information
          </h2></div>
          </section>
 
          <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="primaryPhysician"
          label="Primary Physician"
          placeholder="Select a Physician"
          >
          {Doctors.map((doctor) => (
        <SelectItem 
            key={doctor.name} 
            value={doctor.name}>
              <div className="flex cursor-pointer items-center gap-2">
                <Image src={doctor.image}
                width={32}
                 height={32}
                alt={doctor.name}
                className="rounded-ful border border-dark-500" 
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
 ))}
          </CustomFormField>

          <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="allergies"
          label="Allergies (if any)"
          placeholder="Food, Medications etc"
        />

<CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="currentMedication"
          label="Current Medication (if any)"
          placeholder="Current Medications"
        />
            </div>
         

            <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="familyMedicalHistory"
          label="Family Medical History"
          placeholder="Mother had Diaetes, Father had Hypertension etc"
        />

<CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="pastMedicalHistory"
          label="Past Medical History"
          placeholder="Previous Surgeries, Illnesses etc"
        />
            </div>

            <section className=" space-y-6">
          <div className="mb-9 space-y-1">
          <h2 className= "sub-header text-dark-700">
           Consent and Privacy
          </h2></div>
          </section>

          <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="I consent to treatment"
          />

          <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="I consent to disclosure of information"
          />

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="I consent to Privacy Policy"
          />

         



          <div className="flex flex-col gap-6 xl:flex-row"></div>

          <div className="flex flex-col gap-6 xl:flex-row"></div>

  
       
<SubmitButton isLoading={isLoading}>Register</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
