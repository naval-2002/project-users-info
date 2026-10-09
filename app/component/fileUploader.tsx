import Image from "next/image";
import React from "react";
import { headerClassName } from "../users/addUser/page";

const FileUploader = ({
  imageUrl,
  register,
  inputClassName,
  errors,
}: {
  imageUrl?: string;
  register?: any;
  inputClassName?: string;
  errors?: any;
}) => {
  return (
    <div>
      <label className={`${headerClassName} !mt-0`} htmlFor="image-upload">
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
            {...register}
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
  );
};

export default FileUploader;
