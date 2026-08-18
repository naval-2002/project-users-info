"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export type User = {
  id: number;
  firstName: string;
  age: number;
};

const AVATAR_GRADIENTS = [
  "from-indigo-500 to-violet-500",
  "from-sky-500 to-cyan-400",
  "from-rose-500 to-orange-400",
  "from-emerald-500 to-teal-400",
  "from-fuchsia-500 to-pink-500",
  "from-amber-500 to-yellow-400",
];

const gradientFor = (id: number) =>
  AVATAR_GRADIENTS[id % AVATAR_GRADIENTS.length];

export default function UserCards({ users }: { users?: User[] }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const router = useRouter();
  const handleOnCardPress = (user: User) => {
    if (user.id) {
      router.push(`users/${user.id}`);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {!users
        ? /* Skeleton cards mirroring the real card layout */
          Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-2xl border border-black/5 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 shrink-0 rounded-full bg-black/10 dark:bg-white/10" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 w-16 rounded bg-black/10 dark:bg-white/10" />
                  <div className="h-3 w-12 rounded bg-black/5 dark:bg-white/10" />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-3 dark:border-white/10">
                <div className="h-3 w-10 rounded bg-black/5 dark:bg-white/10" />
                <div className="h-3 w-12 rounded bg-black/5 dark:bg-white/10" />
              </div>
            </div>
          ))
        : users.map((user, index) => {
            const selected = user.id === selectedId;
            const gradient = gradientFor(user.id);

            return (
              <button
                key={user.id}
                type="button"
                aria-pressed={selected}
                onClick={() => handleOnCardPress(user)}
                style={{ animationDelay: `${Math.min(index, 9) * 45}ms` }}
                className={`group animate-fade-up relative cursor-pointer overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 outline-none hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                  selected
                    ? "border-indigo-500/60 bg-white shadow-lg shadow-indigo-500/15 dark:border-indigo-400/50 dark:bg-white/10"
                    : "border-black/5 bg-white/70 shadow-sm hover:border-black/10 hover:shadow-xl hover:shadow-black/5 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20"
                }`}
              >
                {/* Accent wash that fades in on hover / selection */}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 bg-linear-to-br ${gradient} transition-opacity duration-300 ${
                    selected ? "opacity-10" : "opacity-0 group-hover:opacity-5"
                  }`}
                />

                {/* Selected tick — pinned to the corner so it never crowds the name */}
                <span
                  className={`absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-[10px] text-white transition-all duration-300 ${
                    selected ? "scale-100 opacity-100" : "scale-50 opacity-0"
                  }`}
                >
                  ✓
                </span>

                {/* User info */}
                <div className="relative flex items-center gap-3">
                  {/* Avatar */}
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br ${gradient} text-lg font-semibold text-white shadow-inner transition-transform duration-300 group-hover:scale-105`}
                  >
                    {user.firstName.charAt(0)}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-gray-900 dark:text-white">
                      {user.firstName}
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user.age} years old
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="relative mt-5 flex items-center justify-between border-t border-black/5 pt-4 dark:border-white/10">
                  <span className="text-[11px] tracking-wide text-gray-400 dark:text-gray-500">
                    #{user.id}
                  </span>

                  <span
                    className={`text-xs font-medium transition-colors ${
                      selected
                        ? "text-indigo-600 dark:text-indigo-300"
                        : "text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    }`}
                  >
                    {selected ? "Selected" : "View →"}
                  </span>
                </div>
              </button>
            );
          })}
    </div>
  );
}
