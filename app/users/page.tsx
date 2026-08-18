"use client";

import React, { useEffect, useState } from "react";
import CollectionCards from "../component/collectionCard";

type UsersList = {
  id: number;
  firstName: string;
  age: number;
};
type HandleCurrentProps = {
  clickedValue: number | string;
  dropdownBox?: boolean;
};
const HomeScreen = () => {
  const [usersList, setUsersList] = useState<UsersList[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [openPagesList, setOpenPagesList] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const pageNumbers = [5, 15, 20, 25, 30, 35, 40, 45, 50];

  const getUsersList = async () => {
    try {
      await fetch(
        `https://dummyjson.com/users?limit=10&skip=${currentPage * 10 - 10}&select=firstName,age`,
      ).then((res) =>
        res.json().then((res) => {
          setTotalItems(res.total);
          setUsersList(res.users);
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };
  const searchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e?.target?.value);
  };

  let isLastAchieved = false;
  const filteredPageList: number[] = pageNumbers
    .map((pageNumber, index) => {
      if (isLastAchieved) return undefined;
      if (pageNumbers[index + 1] > Math.ceil(totalItems / 10)) {
        isLastAchieved = true;
        return Math.ceil(totalItems / 10);
      } else if (Math.ceil(totalItems / 10) > pageNumber) {
        return pageNumber;
      }
      return undefined;
    })
    .filter((page): page is number => page !== undefined);
  const handleCurrentPage = ({
    clickedValue,
    dropdownBox,
  }: HandleCurrentProps) => {
    if (clickedValue === "...") {
      setOpenPagesList(true);
      return;
    }
    setCurrentPage(Number(clickedValue));
    if (dropdownBox) {
      setOpenPagesList(false);
    }
  };
  const getSearchData = () => {
    fetch(
      `https://dummyjson.com/users/search?q=${searchValue}&limit=10&skip=${currentPage * 10 - 10}`,
    )
      .then((res) => res.json())
      .then((res) => setUsersList(res.users))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsersList();
  }, [currentPage]);

  useEffect(() => {
    getSearchData();
  }, [searchValue]);

  console.log(usersList);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Ambient background — outside the scroll area so it stays put */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-indigo-50 via-white to-white dark:from-indigo-950/40 dark:via-neutral-950 dark:to-neutral-950"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-72 w-2xl -translate-x-1/2 rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-600/15"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-40 -right-20 -z-10 h-64 w-64 rounded-full bg-sky-400/15 blur-3xl dark:bg-sky-600/10"
      />

      <div className="scroll-area flex h-[calc(100vh-130px)] flex-col overflow-auto">
        <div className="mx-auto my-auto flex w-full max-w-7xl flex-col items-center px-5 py-12">
          {/* Header */}
          <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-3 py-1 text-xs font-medium text-gray-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            User directory
          </span>

          <h3 className="mt-4 bg-linear-to-r from-gray-900 via-indigo-800 to-violet-700 bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent sm:text-5xl dark:from-white dark:via-indigo-200 dark:to-violet-300">
            Select User to see Details
          </h3>

          <p className="mt-3 max-w-md text-center text-sm text-gray-500 dark:text-gray-400">
            Tap any card below to pick a user from the directory.
          </p>

          {/* Search */}
          <div className="relative mt-8 w-full max-w-md">
            <input
              type="search"
              placeholder="Search users…"
              aria-label="Search users"
              className="peer w-full rounded-full border border-black/10 bg-white/70 py-3 pr-4 pl-11 text-sm text-gray-900 shadow-sm backdrop-blur transition-all duration-200 outline-none placeholder:text-gray-400 hover:border-black/20 focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 focus:ring-4 focus:ring-indigo-500/15 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500 dark:hover:border-white/20 dark:focus:bg-white/10"
              onChange={searchUser}
            />

            {/* Magnifier — tints indigo while the field is focused */}
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors duration-200 peer-focus:text-indigo-500 dark:text-gray-500 dark:peer-focus:text-indigo-400"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </div>
          {!usersList?.length && (
            <div className="animate-fade-up mt-12 flex w-full max-w-md flex-col items-center rounded-2xl border border-dashed border-black/10 bg-white/50 px-8 py-12 text-center backdrop-blur dark:border-white/15 dark:bg-white/5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-indigo-500/15 to-violet-500/15 text-indigo-500 dark:text-indigo-300">
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  className="h-6 w-6"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </div>

              <p className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                No users found
              </p>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Try a different name or clear the search to see everyone.
              </p>
            </div>
          )}
          {/* Cards */}
          <div className="mt-10 w-full">
            <CollectionCards users={usersList} />
          </div>
        </div>
      </div>

      {/* Pagination */}

      <nav
        aria-label="Pagination"
        className="mx-auto my-8 flex w-fit items-center gap-1 rounded-full border border-black/5 bg-white/80 p-1.5 shadow-lg shadow-black/5 ring-1 ring-white/50 backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/70 dark:ring-white/5"
      >
        <button
          type="button"
          disabled={currentPage === 1}
          className="cursor-pointer rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition-colors outline-none hover:bg-black/5 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          ← Prev
        </button>

        {[1, 2, 3, currentPage > 3 ? currentPage : undefined, "..."]
          .filter((page): page is number | string => Boolean(page))
          .map((page) => {
            const active =
              page === currentPage || (openPagesList && page === "...");

            return (
              <div key={page} className="relative">
                <button
                  type="button"
                  onClick={() => handleCurrentPage({ clickedValue: page })}
                  aria-current={active ? "page" : undefined}
                  className={`h-9 w-9 cursor-pointer rounded-full text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    active
                      ? "bg-linear-to-br from-indigo-500 to-violet-500 text-white shadow-md shadow-indigo-500/30"
                      : "text-gray-600 hover:bg-black/5 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
                  }`}
                >
                  {page}
                </button>

                {/* Jump-to-page popover */}
                {openPagesList && page === "..." && (
                  <div className="absolute bottom-full left-1/2 z-20 mb-3 w-max -translate-x-1/2 rounded-2xl border border-black/5 bg-white/90 p-2 shadow-xl shadow-black/10 backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/90">
                    <p className="px-2 pt-1 pb-2 text-[11px] font-medium tracking-wider whitespace-nowrap text-gray-400 uppercase dark:text-gray-500">
                      Jump to page
                    </p>

                    <div className="grid grid-cols-3 gap-1">
                      {filteredPageList.map((jumpPage) => {
                        const jumpActive = jumpPage === currentPage;
                        // const isLastPage=
                        return (
                          <button
                            key={jumpPage}
                            type="button"
                            onClick={() =>
                              handleCurrentPage({
                                clickedValue: jumpPage,
                                dropdownBox: true,
                              })
                            }
                            aria-current={jumpActive ? "page" : undefined}
                            className={`h-9 w-9 cursor-pointer rounded-lg text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                              jumpActive
                                ? "bg-linear-to-br from-indigo-500 to-violet-500 text-white shadow-sm shadow-indigo-500/30"
                                : "text-gray-600 hover:bg-indigo-500/10 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
                            }`}
                          >
                            {jumpPage}
                          </button>
                        );
                      })}
                    </div>

                    {/* Arrow pointing down at the ellipsis button */}
                    <span
                      aria-hidden
                      className="absolute -bottom-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-r border-b border-black/5 bg-white/90 dark:border-white/10 dark:bg-neutral-900/90"
                    />
                  </div>
                )}
              </div>
            );
          })}

        <button
          type="button"
          disabled={currentPage === Math.ceil(totalItems / 10)}
          className="cursor-pointer rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition-colors outline-none hover:bg-black/5 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next →
        </button>
      </nav>
    </main>
  );
};

export default HomeScreen;
