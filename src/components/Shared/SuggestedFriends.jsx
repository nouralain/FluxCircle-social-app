import React from "react";
import useSuggestedFriends from "../../hooks/useSuggestedFriends";
import MyButton from "./Button";

// show suggested friends when user click on friends button in HOME
export default function SuggestedFriends() {
  const { suggestedFriends, isLoading } = useSuggestedFriends();
  return (
    <>
      {isLoading ? (
        ""
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-users text-[#1877f2]"
                aria-hidden="true"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <circle cx={9} cy={7} r={4} />
              </svg>
              <h3 className="text-base font-extrabold text-slate-900">
                Suggested Friends
              </h3>
            </div>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
              5
            </span>
          </div>
          <div className="mb-3">
            <label className="relative block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={15}
                height={15}
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
                placeholder="Search friends..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-[#1877f2] focus:bg-white"
                defaultValue
              />
            </label>
          </div>
          {suggestedFriends.map((friend) => (
            <div key={friend._id} className="space-y-3">
              <div className="rounded-xl border border-slate-200 p-2.5">
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    className="flex min-w-0 items-center gap-2 rounded-lg px-1 py-1 text-left transition hover:bg-slate-50"
                  >
                    <img
                      alt={friend.name}
                      className="h-10 w-10 rounded-full object-cover"
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
              </div>
            </div>
          ))}
          <MyButton
            target={"/suggestions"}
            styles={
              "mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
            }
          >
            View more
          </MyButton>
        </div>
      )}
    </>
  );
}
