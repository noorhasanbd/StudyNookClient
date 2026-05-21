"use client";
import React from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { FiLayout, FiArrowRight, FiLogIn } from "react-icons/fi";

const UnifiedHomePage = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-neutral"></span>
      </div>
    );
  }

  if (session) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-base-100">
        <div className="w-16 h-16 rounded-2xl bg-neutral/5 text-neutral flex items-center justify-center mb-6 border border-base-200">
          <FiLayout className="w-8 h-8" />
        </div>
        <h2 className="text-4xl font-black tracking-tight text-base-content font-sans">
          Welcome to Dashboard
        </h2>
        <p className="text-sm text-base-content/60 mt-2 max-w-sm">
          Logged in as{" "}
          <span className="font-semibold text-neutral">
            {session.user.email}
          </span>
          . Use the sidebar menu to manage your workspace nodes.
        </p>
        <div className="mt-6">
          <Link
            href="/my-listings"
            className="btn btn-neutral btn-sm normal-case gap-2 rounded-xl"
          >
            Go to My Listings <FiArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <div className="w-12 h-12 rounded-xl bg-neutral text-neutral-content flex items-center justify-center font-black mx-auto mb-6 shadow-sm">
            SN
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-base-content">
            Find Your Next Study Nook
          </h1>
          <p className="py-4 text-sm text-base-content/60 leading-relaxed">
            Discover high-productivity study spaces, seminar halls, and
            presentation labs customized directly for your academic sprint
            sessions.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Link
              href="/login"
              className="btn btn-neutral btn-sm normal-case gap-2 rounded-xl shadow-sm"
            >
              <FiLogIn className="w-4 h-4" /> Sign In to Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedHomePage;
