import {
  Field as FormikField,
  Form,
  Formik,
  FormikHelpers,
  FormikValues,
  ErrorMessage,
  FieldProps,
} from "formik";
import React from "react";
import {
  bloodGroupOptions,
  currentDate,
  genderOptions,
  interestOptions,
  maritialStatus,
  UserData,
} from "./page";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type UserFormData = Omit<UserData, "image"> & {
  interested: string[];
  image: File | null;
};

const inputClassName =
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40";

export default function FormikForm() {
  const defaultValue: UserFormData = {
    name: "",
    email: "",
    gender: "",
    maritalStatus: "",
    bloodGroup: "",
    interested: [],
    dob: "",
    description: "",
    password: "",
    confirmPassword: "",
    image: null,
  };

  const validate = (values: UserFormData) => {
    const errors: Partial<Record<keyof UserFormData, string>> = {};

    if (!values.name) errors.name = "Name is required";
    if (!values.email) errors.email = "Email is required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
      errors.email = "Invalid Email";
    if (!values.gender) errors.gender = "Please select some option";
    if (!values.maritalStatus)
      errors.maritalStatus = "Please select some option";

    if (!values.bloodGroup) errors.bloodGroup = "Please select option";
    if (!values.interested.length)
      errors.interested = "Please select at least one option";

    if (!values.dob) errors.dob = "Please select date";
    else if (values.dob > currentDate)
      errors.dob = "Date can't be current or future";
    if (!values.description) errors.description = "Description is required";
    if (!values.password) errors.password = "Password is required";
    else if (values.password.trim().length < 8)
      errors.password = "Password must be minimum of 8 words";
    if (!values.confirmPassword)
      errors.confirmPassword = "Confirm Password is also required";
    else if (values.password !== values.confirmPassword)
      errors.confirmPassword = "Password & confirm password must be same";
    return errors;
  };

  return (
    <div className="mx-auto p-10">
      <h1 className="text-3xl text-center mb-4 underline">Formik Form</h1>

      <Formik
        initialValues={defaultValue}
        onSubmit={(data) => {
          window.alert(
            `name: ${data.name},
      gender: ${data.gender},
      maritalStatus: ${data.maritalStatus},
      bloodGroup: ${data.bloodGroup},
      dob: ${data.dob},
      description: ${data.description},
      password: ${data.password},
      confirmPassword: ${data.confirmPassword},
      interested: ${data.interested?.join(", ")},
      `,
          );
        }}
        validate={validate}
      >
        <Form>
          <FieldGroup>
            <FieldSet>
              <FieldLegend className="!text-3xl text-center">
                Add User
              </FieldLegend>

              <Field>
                <FieldLabel>Name</FieldLabel>
                <FormikField
                  name="name"
                  as={Input}
                  placeholder={"Please enter your name"}
                />
                <ErrorMessage
                  className=" text-red-400 text-sm"
                  name="name"
                  component={"div"}
                />
              </Field>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <FormikField
                  name="email"
                  type="email"
                  as={Input}
                  placeholder={"Please enter your email"}
                />
                <ErrorMessage
                  className=" text-red-400 text-sm"
                  name="email"
                  component={"span"}
                />
              </Field>
              <Field>
                <FieldLabel>Gender</FieldLabel>

                <FormikField name="gender">
                  {({ form, field }: FieldProps) => {
                    return (
                      <RadioGroup
                        value={field.value}
                        // option 1 but it did not provide error in realtime
                        // onValueChange={form.handleChange("gender")}
                        onValueChange={(value) => {
                          form.setFieldValue("gender", value);
                          form.setFieldTouched("gender", true, false);
                        }}
                        className="flex flex-row flex-wrap gap-2"
                      >
                        {genderOptions.map((value) => {
                          return (
                            <Field
                              key={value}
                              className="flex w-auto cursor-pointer items-center gap-2 rounded-xl border border-black/10 bg-white/70 px-3.5 py-2.5 text-sm font-medium text-gray-700 shadow-sm backdrop-blur transition-all duration-200 select-none hover:border-black/20 has-data-checked:border-indigo-500 has-data-checked:bg-indigo-50/80 has-data-checked:text-indigo-700 has-data-checked:shadow-md has-data-checked:shadow-indigo-500/10 has-focus-visible:ring-4 has-focus-visible:ring-indigo-500/15 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:border-white/20 dark:has-data-checked:border-indigo-400 dark:has-data-checked:bg-indigo-500/15 dark:has-data-checked:text-indigo-200"
                              orientation={"horizontal"}
                            >
                              <FieldLabel htmlFor={value}>{value}</FieldLabel>
                              <RadioGroupItem
                                id={value}
                                value={value}
                                className="border-black/20 bg-white transition-all duration-200 data-checked:border-indigo-500 data-checked:bg-indigo-500 dark:border-white/25 dark:bg-white/10 dark:data-checked:border-indigo-400 dark:data-checked:bg-indigo-400"
                              />
                            </Field>
                          );
                        })}
                      </RadioGroup>
                    );
                  }}
                </FormikField>

                <ErrorMessage
                  className=" text-red-400 text-sm"
                  name="gender"
                  component={"span"}
                />
              </Field>

              <Field>
                <FieldLabel>Marital Status</FieldLabel>

                <FormikField>
                  {({ form, field }: FieldProps) => {
                    return (
                      <RadioGroup
                        onValueChange={(value) => {
                          form.setFieldValue("maritalStatus", value);
                          form.setFieldTouched("maritalStatus", true, false);
                        }}
                        className={"grid grid-cols-2 gap-5"}
                      >
                        {maritialStatus.map((value) => {
                          return (
                            <Field key={value}>
                              <FieldLabel
                                htmlFor={value}
                                className="text-sm w-full font-semibold text-gray-700 flex capitalize cursor-pointer items-center justify-center rounded-xl border border-black/10 bg-white/70 px-2 py-2.5 shadow-sm backdrop-blur transition-all duration-200 select-none hover:border-black/20 hover:text-gray-900 has-checked:border-transparent has-checked:bg-linear-to-br has-checked:from-indigo-500 has-checked:to-violet-500 has-checked:text-white has-checked:shadow-md has-checked:shadow-indigo-500/30 has-focus-visible:ring-4 has-focus-visible:ring-indigo-500/15 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:border-white/20 dark:hover:text-white"
                              >
                                {value}
                                <RadioGroupItem
                                  className={"sr-only"}
                                  value={value}
                                  id={value}
                                />
                              </FieldLabel>
                            </Field>
                          );
                        })}
                      </RadioGroup>
                    );
                  }}
                </FormikField>

                <ErrorMessage
                  name="maritalStatus"
                  className=" text-red-400 text-sm"
                  component={"span"}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="bloodGroup">Blood Group</FieldLabel>

                <FormikField>
                  {({ field, form }: FieldProps) => {
                    return (
                      <Select
                        items={bloodGroupOptions}
                        onValueChange={(value) => {
                          form.setFieldValue("bloodGroup", value);
                          form.setFieldTouched("bloodGroup", true, false);
                        }}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select blood group" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            {bloodGroupOptions.map((item) => {
                              return (
                                <SelectItem key={item.label} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    );
                  }}
                </FormikField>

                <ErrorMessage
                  name="bloodGroup"
                  className=" text-red-400 text-sm"
                  component={"span"}
                />
              </Field>

              <Field>
                <FieldLabel>Interested In </FieldLabel>

                <FormikField name="interested">
                  {({ form, field }: FieldProps) => {
                    return (
                      <FieldGroup className="grid grid-cols-2">
                        {interestOptions.map((option) => {
                          return (
                            <Field key={option} orientation={"horizontal"}>
                              <Checkbox
                                id={option}
                                value={option}
                                onCheckedChange={(checked) => {
                                  checked
                                    ? form.setFieldValue("interested", [
                                        ...field.value,
                                        option,
                                      ])
                                    : form.setFieldValue(
                                        "interested",
                                        field.value.filter(
                                          (prev) => prev !== option,
                                        ),
                                      );
                                }}
                              />
                              <Label htmlFor={option}>{option}</Label>
                            </Field>
                          );
                        })}
                      </FieldGroup>
                    );
                  }}
                </FormikField>
                <ErrorMessage
                  name="interested"
                  className=" text-red-400 text-sm"
                  component={"span"}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="dob">Date of Birth</FieldLabel>

                <FormikField
                  name="dob"
                  as={Input}
                  type="date"
                  max={currentDate}
                />

                <ErrorMessage
                  name="dob"
                  className=" text-red-400 text-sm"
                  component={"span"}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <FormikField
                  id="description"
                  as={Textarea}
                  name="description"
                />
                <ErrorMessage
                  name="description"
                  className=" text-red-400 text-sm"
                  component={"span"}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <FormikField
                  id="password"
                  type="password"
                  as={Input}
                  name="password"
                />
                <ErrorMessage
                  name="password"
                  className=" text-red-400 text-sm"
                  component={"span"}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  Confirm Password
                </FieldLabel>
                <FormikField
                  id="confirmPassword"
                  type="password"
                  as={Input}
                  name="confirmPassword"
                />
                <ErrorMessage
                  name="confirmPassword"
                  className=" text-red-400 text-sm"
                  component={"span"}
                />
              </Field>
            </FieldSet>
          </FieldGroup>
          <button
            type="submit"
            className="mt-10 w-96 max-w-md cursor-pointer rounded-xl border border-transparent bg-linear-to-br from-indigo-500 to-violet-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/30 transition-all duration-200 select-none hover:from-indigo-600 hover:to-violet-600 hover:shadow-lg hover:shadow-indigo-500/40 focus-visible:ring-4 focus-visible:ring-indigo-500/15 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}
