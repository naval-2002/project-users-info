import { useForm } from "react-hook-form";
import {
  bloodGroups,
  currentDate,
  genderOptions,
  maritialStatus,
} from "./page";
import Image from "next/image";
import { useEffect, useState } from "react";

export const ReactForm = () => {
  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();
  const [imageUrl, setImageUrl] = useState("");
  const inputClassName =
    "w-full max-w-md rounded-xl border border-black/10 bg-white/70 px-3.5 py-2.5 text-sm text-gray-900 shadow-sm backdrop-blur transition-all duration-200 outline-none placeholder:text-gray-400 hover:border-black/20 focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 focus:ring-4 focus:ring-indigo-500/15 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500 dark:hover:border-white/20 dark:focus:bg-white/10";

  const headerClassName =
    "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300 mt-10";

  const data = watch();

  const file = getValues("image")?.[0];

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    return () => URL.revokeObjectURL(url); // ← prevents the leak
  }, [file]);

  const handlesubmit = () => {
    window.alert(
      `name: ${data.name},
      gender: ${data.gender},
      maritalStatus: ${data.maritalStatus},
      bloodGroup: ${data.bloodGroup},
      dob: ${data.dob},
      description: ${data.description},
      password: ${data.password},
      confirmPassword: ${data.confirmPassword},
      image: ${imageUrl},`,
    );
  };

  return (
    <>
      <form className="mx-auto p-10" onSubmit={handleSubmit(handlesubmit)}>
        <div className="">
          <h1 className="text-3xl text-center mb-4 underline">React Form</h1>
          <h1 className="text-3xl text-center">Add User</h1>
          <div className="w-96 mt-10">
            <label
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300 "
              htmlFor="name"
            >
              Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="e.g. Ada Lovelace"
              className={inputClassName}
            />
            {!!errors?.name && (
              <span className="text-red-400 text-sm">
                {String(errors?.name?.message)}
              </span>
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
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email is not valid",
                },
              })}
              type="text"
              placeholder="xyz@gmail.com"
              className={inputClassName}
            />
            {!!errors.email && (
              <span className="text-red-400 text-sm">
                {String(errors.email.message)}
              </span>
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
                  htmlFor={option}
                  className="flex cursor-pointer items-center gap-2 rounded-xl border border-black/10 bg-white/70 px-3.5 py-2.5 text-sm font-medium text-gray-700 shadow-sm backdrop-blur transition-all duration-200 select-none hover:border-black/20 has-checked:border-indigo-500 has-checked:bg-indigo-50/80 has-checked:text-indigo-700 has-checked:shadow-md has-checked:shadow-indigo-500/10 has-focus-visible:ring-4 has-focus-visible:ring-indigo-500/15 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:border-white/20 dark:has-checked:border-indigo-400 dark:has-checked:bg-indigo-500/15 dark:has-checked:text-indigo-200"
                >
                  <input
                    {...register("gender", {
                      required: "Gender is required",
                    })}
                    type="radio"
                    className="h-4 w-4 shrink-0 appearance-none rounded-full border border-black/20 bg-white transition-all duration-200 outline-none checked:border-[5px] checked:border-indigo-500 dark:border-white/25 dark:bg-white/10 dark:checked:border-indigo-400"
                    id={option}
                    value={option}
                  />

                  {option}
                </label>
              ))}
              {!!errors && !!errors.gender?.message && (
                <span className="text-red-400 text-sm">
                  {String(errors.gender.message)}
                </span>
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
                        {...register("maritalStatus", {
                          required: "Please select marital status",
                        })}
                        type="radio"
                        id={status}
                        value={status}
                        className="sr-only"
                      />

                      {status}
                    </label>
                  );
                })}
              </div>
              {!!errors && !!errors.maritalStatus?.message && (
                <span className="text-red-400 text-sm">
                  {String(errors.maritalStatus.message)}
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
                  defaultValue={""}
                  className="peer w-full cursor-pointer appearance-none rounded-xl border border-black/10 bg-white/70 py-2.5 pr-10 pl-3.5 text-sm text-gray-900 shadow-sm backdrop-blur transition-all duration-200 outline-none hover:border-black/20 focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 focus:ring-4 focus:ring-indigo-500/15 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-white/20 dark:focus:bg-white/10"
                  {...register("bloodGroup", {
                    required: "Please select blood group",
                  })}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {bloodGroups.map((bGroup) => {
                    return (
                      <option
                        key={bGroup}
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
                {!!errors && !!errors.bloodGroup?.message && (
                  <span className="text-red-400 text-sm">
                    {String(errors.bloodGroup.message)}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="dob" className={headerClassName}>
                Date of Birth
              </label>

              <input
                {...register("dob", {
                  required: "DOB is required",
                  validate: (v) =>
                    !v ||
                    v <= currentDate ||
                    "Date of birth cannot be in the future",
                })}
                type="date"
                className={`${inputClassName} `}
                id="dob"
                max={currentDate}
              />
              {!!errors && !!errors.dob?.message && (
                <span className="text-red-400 text-sm">
                  {String(errors.dob.message)}
                </span>
              )}
            </div>
            <div>
              <label className={headerClassName} htmlFor="description">
                Description
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                className={`${inputClassName} min-h-16`}
                placeholder="Please enter about your self..."
                name="description"
              />
              {!!errors && !!errors.description?.message && (
                <span className="text-red-400 text-sm">
                  {String(errors.description.message)}
                </span>
              )}
            </div>

            <div>
              <label className={headerClassName} htmlFor="password">
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Minimum 8 length is required",
                  },
                })}
                type="password"
                id="password"
                placeholder="Please enter password"
                className={inputClassName}
              />
              {!!errors && !!errors.password?.message && (
                <span className="text-red-400 text-sm">
                  {String(errors.password.message)}
                </span>
              )}
            </div>
            <div>
              <label className={headerClassName} htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: {
                    checkPassword: (confirmPassword, { password }) => {
                      if (confirmPassword !== password)
                        return "Confirm Password & Password must be same";
                    },
                  },
                })}
                type="password"
                id="confirmPassword"
                className={inputClassName}
                placeholder="Please enter confirm password"
              />
              {!!errors && !!errors.confirmPassword?.message && (
                <span className="text-red-400 text-sm">
                  {String(errors.confirmPassword.message)}
                </span>
              )}
            </div>

            <div>
              <label className={headerClassName} htmlFor="image-upload">
                Upload User Image
              </label>
              {/* -------------> */}
              <div className="flex w-full max-w-md items-center gap-4">
                {/* Preview thumbnail — shows the placeholder until an image is set */}
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-black/10 bg-white/70 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
                  {!!imageUrl ? (
                    <Image fill src={imageUrl} alt="image" />
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
                    {...register("image", {
                      required: "Image is required",
                    })}
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    className={`${inputClassName} cursor-pointer p-2 file:mr-3.5 file:cursor-pointer file:rounded-lg file:border-0 file:bg-linear-to-br file:from-indigo-500 file:to-violet-500 file:px-3.5 file:py-2 file:text-sm file:font-semibold file:text-white file:shadow-md file:shadow-indigo-500/30 file:transition-all file:duration-200 hover:file:from-indigo-600 hover:file:to-violet-600`}
                  />

                  <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                    JPG or PNG only.
                  </p>
                </div>
              </div>
              {!!errors && !!errors.image?.message && (
                <span className="text-red-400 text-sm">
                  {String(errors.image.message)}
                </span>
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
    </>
  );
};
