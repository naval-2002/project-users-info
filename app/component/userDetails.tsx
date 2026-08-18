"use client";

import { useState } from "react";

export type UserDetail = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: { color: string; type: string };
  ip: string;
  macAddress: string;
  ein: string;
  ssn: string;
  userAgent: string;
  university: string;
  role: string;
  address: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    country: string;
    coordinates: { lat: number; lng: number };
  };
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    department: string;
    name: string;
    title: string;
  };
  crypto: { coin: string; wallet: string; network: string };
};

const TABS = ["Overview", "Contact", "Work", "Finance", "System"] as const;
type Tab = (typeof TABS)[number];

/* ---------- Small pieces ---------- */

function CopyIcon({ copied }: { copied: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
    >
      {copied ? (
        <path d="m5 13 4 4L19 7" />
      ) : (
        <>
          <rect x="9" y="9" width="11" height="11" rx="2" />
          <path d="M5 15V5a2 2 0 0 1 2-2h10" />
        </>
      )}
    </svg>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
      {!open && <path d="m3 3 18 18" />}
    </svg>
  );
}

function Field({
  label,
  value,
  mono = false,
  copyable = false,
  sensitive = false,
}: {
  label: string;
  value?: string | number;
  mono?: boolean;
  copyable?: boolean;
  sensitive?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const text =
    value === undefined || value === null || value === "" ? "—" : String(value);
  const display =
    sensitive && !revealed ? "•".repeat(Math.min(text.length, 14)) : text;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="group/field flex items-center justify-between gap-3 rounded-xl border border-black/5 bg-white/60 px-4 py-3 transition-all duration-200 hover:border-indigo-500/30 hover:bg-white hover:shadow-sm dark:border-white/10 dark:bg-white/5 dark:hover:border-indigo-400/30 dark:hover:bg-white/10">
      <div className="min-w-0">
        <p className="text-[11px] font-medium tracking-wider text-gray-400 uppercase dark:text-gray-500">
          {label}
        </p>
        <p
          className={`mt-0.5 truncate text-sm font-medium text-gray-900 dark:text-gray-100 ${
            mono ? "font-mono text-[13px]" : ""
          }`}
          title={sensitive && !revealed ? undefined : text}
        >
          {display}
        </p>
      </div>

      {(copyable || sensitive) && (
        <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity duration-200 group-hover/field:opacity-100 focus-within:opacity-100">
          {sensitive && (
            <button
              type="button"
              onClick={() => setRevealed((r) => !r)}
              aria-label={revealed ? `Hide ${label}` : `Reveal ${label}`}
              className="cursor-pointer rounded-lg p-1.5 text-gray-400 transition-colors outline-none hover:bg-black/5 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <EyeIcon open={revealed} />
            </button>
          )}

          {copyable && (
            <button
              type="button"
              onClick={copy}
              aria-label={`Copy ${label}`}
              className={`cursor-pointer rounded-lg p-1.5 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                copied
                  ? "text-emerald-500"
                  : "text-gray-400 hover:bg-black/5 hover:text-gray-900 dark:hover:bg-white/10 dark:hover:text-white"
              }`}
            >
              <CopyIcon copied={copied} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="rounded-xl border border-black/5 bg-white/60 px-4 py-3 text-center transition-transform duration-200 hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5">
      <p className={`text-lg font-semibold ${accent}`}>{value}</p>
      <p className="mt-0.5 text-[11px] tracking-wider text-gray-400 uppercase dark:text-gray-500">
        {label}
      </p>
    </div>
  );
}

/* ---------- Screen ---------- */

export default function UserDetails({
  user,
  onBack,
}: {
  user: UserDetail;
  onBack?: () => void;
}) {
  const [tab, setTab] = useState<Tab>("Overview");

  const fullName = [user.firstName, user.maidenName, user.lastName]
    .filter(Boolean)
    .join(" ");

  const location = [user.address?.city, user.address?.stateCode]
    .filter(Boolean)
    .join(", ");

  return (
    <section className="animate-fade-up mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-black/5 bg-white/70 shadow-xl shadow-black/5 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
      {/* Banner */}
      <div className="relative h-28 bg-linear-to-r from-indigo-500 via-violet-500 to-fuchsia-500">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_120%,rgba(255,255,255,0.35),transparent_60%)]"
        />

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="absolute top-4 left-4 cursor-pointer rounded-full bg-black/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur transition-colors outline-none hover:bg-black/35 focus-visible:ring-2 focus-visible:ring-white"
          >
            ← Back
          </button>
        )}

        <span className="absolute top-4 right-4 rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold tracking-wider text-white uppercase backdrop-blur">
          {user.role}
        </span>
      </div>

      {/* Identity */}
      <header className="relative px-6 pb-6">
        <div className="-mt-12 flex flex-col items-center gap-4 sm:flex-row sm:items-end">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user.image}
            alt={fullName}
            className="h-24 w-24 shrink-0 rounded-2xl border-4 border-white bg-white object-cover shadow-lg dark:border-neutral-900 dark:bg-neutral-800"
          />

          <div className="min-w-0 flex-1 text-center sm:pb-1 sm:text-left">
            <h2 className="truncate text-2xl font-bold text-gray-900 dark:text-white">
              {fullName}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              @{user.username} · {user.company?.title}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:pb-1">
            <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-600 capitalize dark:text-indigo-300">
              {user.gender}
            </span>
            {location && (
              <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-600 dark:text-sky-300">
                {location}
              </span>
            )}
          </div>
        </div>

        {/* Quick stats */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat
            label="Age"
            value={`${user.age}`}
            accent="text-indigo-600 dark:text-indigo-300"
          />
          <Stat
            label="Height"
            value={`${user.height} cm`}
            accent="text-violet-600 dark:text-violet-300"
          />
          <Stat
            label="Weight"
            value={`${user.weight} kg`}
            accent="text-sky-600 dark:text-sky-300"
          />
          <Stat
            label="Blood"
            value={user.bloodGroup}
            accent="text-rose-600 dark:text-rose-300"
          />
        </div>
      </header>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="User details sections"
        className="flex gap-1 overflow-x-auto border-y border-black/5 px-4 dark:border-white/10"
      >
        {TABS.map((t) => {
          const active = t === tab;

          return (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t)}
              className={`relative cursor-pointer px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                active
                  ? "text-indigo-600 dark:text-indigo-300"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              {t}
              <span
                aria-hidden
                className={`absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-linear-to-r from-indigo-500 to-violet-500 transition-transform duration-300 ${
                  active ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Panels */}
      <div
        role="tabpanel"
        className="animate-fade-up grid grid-cols-1 gap-3 p-6 sm:grid-cols-2"
        key={tab}
      >
        {tab === "Overview" && (
          <>
            <Field label="First name" value={user.firstName} />
            <Field label="Last name" value={user.lastName} />
            <Field label="Maiden name" value={user.maidenName} />
            <Field label="Birth date" value={user.birthDate} />
            <Field label="Eye color" value={user.eyeColor} />
            <Field
              label="Hair"
              value={user.hair && `${user.hair.color} · ${user.hair.type}`}
            />
            <Field label="Blood group" value={user.bloodGroup} />
            <Field label="University" value={user.university} />
          </>
        )}

        {tab === "Contact" && (
          <>
            <Field label="Email" value={user.email} copyable />
            <Field label="Phone" value={user.phone} copyable />
            <Field label="Username" value={user.username} copyable />
            <Field label="Password" value={user.password} sensitive mono />
            <Field label="Street" value={user.address?.address} />
            <Field label="City" value={user.address?.city} />
            <Field
              label="State"
              value={
                user.address &&
                `${user.address.state} (${user.address.stateCode})`
              }
            />
            <Field label="Postal code" value={user.address?.postalCode} />
            <Field label="Country" value={user.address?.country} />
            <Field
              label="Coordinates"
              mono
              copyable
              value={
                user.address?.coordinates &&
                `${user.address.coordinates.lat}, ${user.address.coordinates.lng}`
              }
            />
          </>
        )}

        {tab === "Work" && (
          <>
            <Field label="Company" value={user.company?.name} />
            <Field label="Title" value={user.company?.title} />
            <Field label="Department" value={user.company?.department} />
            <Field label="Role" value={user.role} />
            <Field label="University" value={user.university} />
            <Field label="EIN" value={user.ein} mono copyable />
          </>
        )}

        {tab === "Finance" && (
          <>
            <Field label="Card type" value={user.bank?.cardType} />
            <Field
              label="Card number"
              value={user.bank?.cardNumber}
              sensitive
              mono
              copyable
            />
            <Field label="Expires" value={user.bank?.cardExpire} />
            <Field label="Currency" value={user.bank?.currency} />
            <Field
              label="IBAN"
              value={user.bank?.iban}
              sensitive
              mono
              copyable
            />
            <Field label="SSN" value={user.ssn} sensitive mono />
            <Field label="Coin" value={user.crypto?.coin} />
            <Field label="Network" value={user.crypto?.network} />
            <Field
              label="Wallet"
              value={user.crypto?.wallet}
              sensitive
              mono
              copyable
            />
          </>
        )}

        {tab === "System" && (
          <>
            <Field label="User ID" value={user.id} mono />
            <Field label="IP address" value={user.ip} mono copyable />
            <Field label="MAC address" value={user.macAddress} mono copyable />
            <div className="sm:col-span-2">
              <Field label="User agent" value={user.userAgent} mono copyable />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
