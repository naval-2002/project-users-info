"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ReactForm } from "./react-hook-form";
import { useSearchParams } from "next/navigation";

export const genderOptions = ["Male", "Female", "Others"];
export const maritialStatus = ["single", "married"];
export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export type UserData = {
  name: string;
  email: string;
  gender: string;
  maritalStatus: string;
  bloodGroup: string;
  dob: string;
  description: string;
  password: string;
  confirmPassword: string;
  image: string;
};

type FormErrors = Partial<Record<keyof UserData, string>>;

const initialData: UserData = {
  name: "",
  email: "",
  gender: "",
  maritalStatus: "",
  bloodGroup: "",
  dob: "",
  description: "",
  password: "",
  confirmPassword: "",
  image: "",
};

const handleData = (
  data: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
) => {
  switch (data.name) {
    case "name":
      return { name: data.value };
    case "email":
      return { email: data.value };
    case "gender":
      return { gender: data.value };
    case "maritalStatus":
      if (!data.checked) return { maritalStatus: "" };
      return { maritalStatus: data.value };
    case "bloodGroup":
      return { bloodGroup: data.value };
    case "dob":
      return { dob: data.value };
    case "description":
      return { description: data.value };
    case "password":
      return { password: data.value };
    case "confirmPassword":
      return { confirmPassword: data.value };
    case "image": {
      const file = data?.files[0];
      const localUrl = URL.createObjectURL(file);
      return { image: localUrl };
    }
    default: {
    }
  }
};
const isValidEmail = (value: string) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/.test(value);
};

const validate = (data: UserData) => {
  const {
    name,
    email,
    gender,
    maritalStatus,
    bloodGroup,
    dob,
    description,
    password,
    confirmPassword,
    image,
  } = data;
  const newErrors: Partial<UserData> = {};
  if (!name.trim()) newErrors.name = "Name is required";
  if (!email.trim()) newErrors.email = "Email is required";
  else if (!isValidEmail(data.email)) newErrors.email = "Email is not valid";
  if (!gender) newErrors.gender = "Gender is required";
  if (!maritalStatus) newErrors.maritalStatus = "Marital Status is required";

  if (!bloodGroup) newErrors.bloodGroup = "Please select blood group";
  if (!dob) newErrors.dob = "Please select dob";
  if (!description.trim()) newErrors.description = "Description is required";
  if (!password.trim()) newErrors.password = "Password is required";
  if (!confirmPassword.trim())
    newErrors.confirmPassword = "Confirm Password is required";
  if (!image) newErrors.image = "Please select the image";

  return newErrors;
};
const d = new Date();
// In this there might be some issues in midnight as it is ISO so it will not collaborate with local time zone
// const currentDate = new Date().toISOString().split("T")[0];
export const currentDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const AddUserForm = () => {
  const [userData, setUserData] = useState<UserData>(initialData);
  const [errors, setErrors] = useState<FormErrors>();

  const reactForm = useSearchParams().get("reactForm");

  const headerClassName =
    "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300 mt-10";

  const inputClassName =
    "w-full max-w-md rounded-xl border border-black/10 bg-white/70 px-3.5 py-2.5 text-sm text-gray-900 shadow-sm backdrop-blur transition-all duration-200 outline-none placeholder:text-gray-400 hover:border-black/20 focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 focus:ring-4 focus:ring-indigo-500/15 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500 dark:hover:border-white/20 dark:focus:bg-white/10";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const target = e.target;

    if (!target) {
      return;
    }
    setUserData((prev) => ({ ...prev, ...handleData(target) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const getErrors = validate(userData);
    if (!!getErrors) {
      setErrors(getErrors);

      return;
    }

    window.alert(
      `name: ${userData.name},
      gender: ${userData.gender},
      maritalStatus: ${userData.maritalStatus},
      bloodGroup: ${userData.bloodGroup},
      dob: ${userData.dob},
      description: ${userData.description},
      password: ${userData.password},
      confirmPassword: ${userData.confirmPassword},
      image: ${userData.image},`,
    );
    setUserData(initialData);
  };

  if (reactForm) return <ReactForm />;

  return (
    <form className="mx-auto p-10" onSubmit={handleSubmit}>
      <div className="">
        <h1 className="text-3xl text-center">Add User</h1>

        <div className="w-96 mt-10">
          <label
            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300 "
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="e.g. Ada Lovelace"
            className={inputClassName}
            onChange={handleChange}
          />
          {!!errors && !!errors.name && (
            <span className="text-red-400 text-sm">{errors.name}</span>
          )}
        </div>
        <div className="w-96 mt-10">
          <label
            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300 "
            htmlFor="name"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="xyz@gmail.com"
            className={inputClassName}
            onChange={handleChange}
          />
          {!!errors && !!errors.email && (
            <span className="text-red-400 text-sm">{errors.email}</span>
          )}
        </div>
        <div className="w-96 mt-10">
          <p className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300 ">
            Gender
          </p>
          <div className="flex flex-wrap gap-2">
            {genderOptions.map((option) => (
              <label
                key={option}
                htmlFor={option.toLowerCase()}
                className="flex cursor-pointer items-center gap-2 rounded-xl border border-black/10 bg-white/70 px-3.5 py-2.5 text-sm font-medium text-gray-700 shadow-sm backdrop-blur transition-all duration-200 select-none hover:border-black/20 has-checked:border-indigo-500 has-checked:bg-indigo-50/80 has-checked:text-indigo-700 has-checked:shadow-md has-checked:shadow-indigo-500/10 has-focus-visible:ring-4 has-focus-visible:ring-indigo-500/15 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:border-white/20 dark:has-checked:border-indigo-400 dark:has-checked:bg-indigo-500/15 dark:has-checked:text-indigo-200"
              >
                <input
                  type="radio"
                  id={option.toLowerCase()}
                  name="gender"
                  value={option}
                  className="h-4 w-4 shrink-0 appearance-none rounded-full border border-black/20 bg-white transition-all duration-200 outline-none checked:border-[5px] checked:border-indigo-500 dark:border-white/25 dark:bg-white/10 dark:checked:border-indigo-400"
                  onChange={handleChange}
                  checked={userData.gender === option}
                />
                {option}
              </label>
            ))}
            {!!errors && !!errors.gender && (
              <span className="text-red-400 text-sm">{errors.gender}</span>
            )}
          </div>
          <div>
            <p className={headerClassName}>Marital Status</p>
            <div className="grid grid-cols-2 gap-5">
              {maritialStatus.map((status) => {
                return (
                  <label
                    key={status}
                    htmlFor={status}
                    className="flex capitalize cursor-pointer items-center justify-center rounded-xl border border-black/10 bg-white/70 px-2 py-2.5 text-sm font-semibold text-gray-700 shadow-sm backdrop-blur transition-all duration-200 select-none hover:border-black/20 hover:text-gray-900 has-checked:border-transparent has-checked:bg-linear-to-br has-checked:from-indigo-500 has-checked:to-violet-500 has-checked:text-white has-checked:shadow-md has-checked:shadow-indigo-500/30 has-focus-visible:ring-4 has-focus-visible:ring-indigo-500/15 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:border-white/20 dark:hover:text-white"
                  >
                    <input
                      type="checkbox"
                      id={status}
                      value={status}
                      name="maritalStatus"
                      className="sr-only"
                      onChange={handleChange}
                      checked={status === userData.maritalStatus}
                    />

                    {status}
                  </label>
                );
              })}
            </div>
            {!!errors && !!errors.maritalStatus && (
              <span className="text-red-400 text-sm">
                {errors.maritalStatus}
              </span>
            )}
          </div>
          <div className="mt-10">
            <label
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="bloodGroup"
            >
              Blood Group
            </label>
            <div className="relative w-full max-w-md">
              <select
                id="bloodGroup"
                name="bloodGroup"
                defaultValue={""}
                className="peer w-full cursor-pointer appearance-none rounded-xl border border-black/10 bg-white/70 py-2.5 pr-10 pl-3.5 text-sm text-gray-900 shadow-sm backdrop-blur transition-all duration-200 outline-none hover:border-black/20 focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 focus:ring-4 focus:ring-indigo-500/15 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-white/20 dark:focus:bg-white/10"
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {bloodGroups.map((bGroup) => {
                  return (
                    <option
                      key={bGroup}
                      value={bGroup}
                      className="bg-white text-gray-900 dark:bg-neutral-900 dark:text-white"
                    >
                      {bGroup}
                    </option>
                  );
                })}
              </select>

              {/* Chevron — tints indigo while the select is focused */}
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors duration-200 peer-focus:text-indigo-500 dark:text-gray-500 dark:peer-focus:text-indigo-400"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
              {!!errors && !!errors.bloodGroup && (
                <span className="text-red-400 text-sm">
                  {errors.bloodGroup}
                </span>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="dob" className={headerClassName}>
              Date of Birth
            </label>

            <input
              id="dob"
              type="date"
              className={`${inputClassName} `}
              max={currentDate}
              onChange={handleChange}
              name="dob"
            />
            {!!errors && !!errors.dob && (
              <span className="text-red-400 text-sm">{errors.dob}</span>
            )}
          </div>
          <div>
            <label className={headerClassName} htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className={`${inputClassName} min-h-16`}
              onChange={handleChange}
              placeholder="Please enter about your self..."
              name="description"
            />
            {!!errors && !!errors.description && (
              <span className="text-red-400 text-sm">{errors.description}</span>
            )}
          </div>

          <div>
            <label className={headerClassName} htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              placeholder="Please enter password"
              className={inputClassName}
              name="password"
            />
            {!!errors && !!errors.password && (
              <span className="text-red-400 text-sm">{errors.password}</span>
            )}
          </div>
          <div>
            <label className={headerClassName} htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              onChange={handleChange}
              placeholder="Please enter confirm password"
              className={inputClassName}
              name="confirmPassword"
            />
            {!!errors && !!errors.confirmPassword && (
              <span className="text-red-400 text-sm">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <div>
            <label className={headerClassName} htmlFor="image-upload">
              Upload User Image
            </label>

            <div className="flex w-full max-w-md items-center gap-4">
              {/* Preview thumbnail — shows the placeholder until an image is set */}
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-black/10 bg-white/70 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
                {!!userData.image.length ? (
                  <Image fill src={userData.image} alt="image" />
                ) : (
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20a8 8 0 0 1 16 0" />
                  </svg>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <input
                  id="image-upload"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  className={`${inputClassName} cursor-pointer p-2 file:mr-3.5 file:cursor-pointer file:rounded-lg file:border-0 file:bg-linear-to-br file:from-indigo-500 file:to-violet-500 file:px-3.5 file:py-2 file:text-sm file:font-semibold file:text-white file:shadow-md file:shadow-indigo-500/30 file:transition-all file:duration-200 hover:file:from-indigo-600 hover:file:to-violet-600`}
                  onChange={handleChange}
                  name="image"
                />

                <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                  JPG or PNG only.
                </p>
              </div>
            </div>
            {!!errors && !!errors.image && (
              <span className="text-red-400 text-sm">{errors.image}</span>
            )}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="mt-10 w-96 max-w-md cursor-pointer rounded-xl border border-transparent bg-linear-to-br from-indigo-500 to-violet-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/30 transition-all duration-200 select-none hover:from-indigo-600 hover:to-violet-600 hover:shadow-lg hover:shadow-indigo-500/40 focus-visible:ring-4 focus-visible:ring-indigo-500/15 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
      >
        Submit
      </button>
    </form>
  );
};
export default AddUserForm;
