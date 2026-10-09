import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React, { useMemo } from "react";

import { Controller, useForm } from "react-hook-form";
import {
  genderOptions,
  UserData,
  interestOptions,
  headerClassName,
  maritialStatus,
  bloodGroups,
  bloodGroupOptions,
  currentDate,
} from "./page";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import FileUploader from "@/app/component/fileUploader";
import { inputClassName } from "./react-hook-form";
import { localUrl } from "@/app/utils/helper";

type HybridForm = Omit<UserData, "image"> & {
  interested?: string[] | undefined;
  image?: FileList;
};

export const HybridForm = () => {
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    watch,
    setValue,
  } = useForm<HybridForm>();
  const onSubmit = (data: HybridForm) => {
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
      image: ${imageUrl},
      `,
    );
  };
  const watchedImage = watch("image")?.[0];
  const imageUrl = useMemo(() => {
    return localUrl(watchedImage);
  }, [watchedImage]);
  return (
    <div className="mx-auto p-10">
      <h1 className="text-3xl text-center mb-4 underline">Hybrid Form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend className="!text-3xl text-center">
              Add User
            </FieldLegend>

            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input {...register("name", { required: "Name is required" })} />
              {errors.name && <FieldError>{errors?.name.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Email is not valid",
                  },
                })}
                placeholder="xyz@gmail.com"
              />
              {errors.email && <FieldError>{errors?.email.message}</FieldError>}
            </Field>

            <Field>
              <p className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300 ">
                Gender
              </p>

              <Controller
                control={control}
                name="gender"
                rules={{ required: "This field is mandatory" }}
                render={({ field: { onChange, onBlur, value } }) => {
                  return (
                    <>
                      <RadioGroup
                        onValueChange={onChange}
                        className="flex flex-row flex-wrap gap-2"
                      >
                        {genderOptions.map((option) => (
                          <Field
                            key={option}
                            orientation={"horizontal"}
                            className="flex w-auto cursor-pointer items-center gap-2 rounded-xl border border-black/10 bg-white/70 px-3.5 py-2.5 text-sm font-medium text-gray-700 shadow-sm backdrop-blur transition-all duration-200 select-none hover:border-black/20 has-data-checked:border-indigo-500 has-data-checked:bg-indigo-50/80 has-data-checked:text-indigo-700 has-data-checked:shadow-md has-data-checked:shadow-indigo-500/10 has-focus-visible:ring-4 has-focus-visible:ring-indigo-500/15 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:border-white/20 dark:has-data-checked:border-indigo-400 dark:has-data-checked:bg-indigo-500/15 dark:has-data-checked:text-indigo-200"
                          >
                            <FieldLabel htmlFor={option}>{option}</FieldLabel>
                            <RadioGroupItem
                              value={option}
                              id={option}
                              className="border-black/20 bg-white transition-all duration-200 data-checked:border-indigo-500 data-checked:bg-indigo-500 dark:border-white/25 dark:bg-white/10 dark:data-checked:border-indigo-400 dark:data-checked:bg-indigo-400"
                            />
                          </Field>
                        ))}
                      </RadioGroup>
                      {errors.gender && (
                        <FieldError>{errors?.gender.message}</FieldError>
                      )}
                    </>
                  );
                }}
              />
            </Field>

            <Field>
              <p className={`${headerClassName} !mt-0`}>Marital Status</p>

              <Controller
                control={control}
                name="maritalStatus"
                rules={{ required: "Please select some" }}
                render={({ field: { onChange } }) => (
                  <RadioGroup onValueChange={onChange}>
                    <div className="grid grid-cols-2 gap-5">
                      {maritialStatus.map((status) => {
                        return (
                          <FieldLabel
                            key={status}
                            htmlFor={status}
                            className="text-sm w-full font-semibold text-gray-700 flex capitalize cursor-pointer items-center justify-center rounded-xl border border-black/10 bg-white/70 px-2 py-2.5 shadow-sm backdrop-blur transition-all duration-200 select-none hover:border-black/20 hover:text-gray-900 has-checked:border-transparent has-checked:bg-linear-to-br has-checked:from-indigo-500 has-checked:to-violet-500 has-checked:text-white has-checked:shadow-md has-checked:shadow-indigo-500/30 has-focus-visible:ring-4 has-focus-visible:ring-indigo-500/15 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:border-white/20 dark:hover:text-white"
                          >
                            {status}
                            <RadioGroupItem
                              value={status}
                              id={status}
                              className="sr-only"
                            />
                          </FieldLabel>
                        );
                      })}
                    </div>

                    {errors.maritalStatus && (
                      <FieldError>{errors?.maritalStatus.message}</FieldError>
                    )}
                  </RadioGroup>
                )}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="bloodGroup">Blood Group</FieldLabel>
              <Controller
                name="bloodGroup"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field: { onChange } }) => (
                  <>
                    <Select
                      id="bloodGroup"
                      items={bloodGroupOptions}
                      onValueChange={onChange}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {bloodGroupOptions.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.bloodGroup && (
                      <FieldError>{errors?.bloodGroup.message}</FieldError>
                    )}
                  </>
                )}
              />
            </Field>
            <FieldSet>
              <FieldLabel>Interested In</FieldLabel>
              <Controller
                control={control}
                name="interested"
                rules={{
                  required:
                    "Please select some options in which you are interested",
                }}
                render={() => (
                  <>
                    <FieldGroup className=" grid grid-cols-2 ">
                      {interestOptions.map((option) => {
                        return (
                          <Field key={option} orientation={"horizontal"}>
                            <Checkbox
                              value={option}
                              id={option}
                              onCheckedChange={(checked) => {
                                const previousData = watch("interested");
                                const updatedData = previousData?.filter(
                                  (value) => value !== option,
                                );
                                return setValue(
                                  "interested",
                                  checked
                                    ? [...(previousData ?? []), option]
                                    : updatedData,
                                );
                              }}
                            />
                            <Label htmlFor={option}>{option}</Label>
                          </Field>
                        );
                      })}
                    </FieldGroup>
                    {errors.interested && (
                      <FieldError>{errors.interested.message}</FieldError>
                    )}
                  </>
                )}
              />
            </FieldSet>

            <Field>
              <FieldLabel htmlFor="dob">Date of Birth</FieldLabel>
              <Input
                id="dob"
                type="date"
                {...register("dob", {
                  required: "Please select or enter DOB",
                  //   validate: (v) =>
                  //     v > currentDate
                  //       ? "Date of birth cannot be in the future"
                  //       : true,
                  validate: (selectedDate) =>
                    selectedDate < currentDate ||
                    "Date of birth cannot be in the future",
                })}
                style={{ colorScheme: "normal" }}
                max={currentDate}
              />
              {errors.dob && <FieldError>{errors?.dob.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel>Description</FieldLabel>
              <Textarea
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <FieldError>{errors.description.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel>Password</FieldLabel>
              <Input
                type="password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <FieldError>{errors.password.message}</FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel>Confirm Password</FieldLabel>
              <Input
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (inputValue) => {
                    return (
                      watch("password") === inputValue ||
                      "Password & Confirm Password must be same"
                    );
                  },
                })}
              />
              {errors.confirmPassword && (
                <FieldError>{errors.confirmPassword.message}</FieldError>
              )}
            </Field>
            <FileUploader
              imageUrl={imageUrl}
              errors={errors}
              inputClassName={inputClassName}
              register={{
                ...register("image", {
                  required: "Image is required",
                }),
              }}
            />
          </FieldSet>
        </FieldGroup>
        <button
          type="submit"
          className="mt-10 w-96 max-w-md cursor-pointer rounded-xl border border-transparent bg-linear-to-br from-indigo-500 to-violet-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/30 transition-all duration-200 select-none hover:from-indigo-600 hover:to-violet-600 hover:shadow-lg hover:shadow-indigo-500/40 focus-visible:ring-4 focus-visible:ring-indigo-500/15 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
