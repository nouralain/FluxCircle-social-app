import React from "react";
import { LuArrowLeft, LuUsers } from "react-icons/lu";
import useSuggestedFriends from "../../hooks/useSuggestedFriends";
import MyButton from "../../components/Shared/Button";
import PostSkeleton from "../../components/Shared/PostSkeleton";

// page user enter when click on show more in suggested friends menu
export default function Suggestions() {
  // custome hook to get suggested friends
  const { suggestedFriends, isLoading } = useSuggestedFriends();
  return (
    <>
      <div className="mx-auto max-w-4xl mt-25 ">
        <button className="mb-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
          <LuArrowLeft />
          Back to feed
        </button>
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <LuUsers />

              <h1 className="text-xl font-extrabold text-slate-900">
                All Suggested Friends
              </h1>
            </div>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
              20
            </span>
          </div>
          <label className="relative mb-4 block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-search pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            >
              <path d="m21 21-4.34-4.34" />
              <circle cx={11} cy={11} r={8} />
            </svg>
            <input
              placeholder="Search by name or username..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none focus:border-[#1877f2] focus:bg-white"
              defaultValue
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            {isLoading ? (
              <PostSkeleton />
            ) : (
              suggestedFriends.map((friend) => (
                <article className="rounded-xl border border-slate-200 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      className="flex min-w-0 items-center gap-3 rounded-lg px-1 py-1 text-left transition hover:bg-slate-50"
                    >
                      <img
                        alt={friend.name}
                        className="h-12 w-12 rounded-full object-cover"
                        src={friend.photo}
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-900 hover:underline">
                          {friend.name}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          FluxCircle user
                        </p>
                      </div>
                    </button>
                    <button className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition disabled:opacity-60 bg-[#e7f3ff] text-[#1877f2] hover:bg-[#d8ebff]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={13}
                        height={13}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-user-plus"
                        aria-hidden="true"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx={9} cy={7} r={4} />
                        <line x1={19} x2={19} y1={8} y2={14} />
                        <line x1={22} x2={16} y1={11} y2={11} />
                      </svg>
                      Follow
                    </button>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                    <span className="rounded-full bg-slate-100 px-2 py-0.5">
                      {friend.followersCount} followers
                    </span>
                    <span className="rounded-full bg-[#edf4ff] px-2 py-0.5 text-[#1877f2]">
                      {friend.mutualFollowersCount} mutual
                    </span>
                  </div>
                </article>
              ))
            )}
          </div>
          <MyButton
            styles={
              "mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
            }
          >
            View more
          </MyButton>
        </section>
      </div>
    </>
  );
}
