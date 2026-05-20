"use client";

import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const LoginForm = () => {
  const handleGoogleSignin = async () => {
        console.log("Initiating Google Sign-In...");
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    };
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });
    console.log({ data, error });
    if (data) {
      redirect("/");
    }
    if (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <div>
      <div>
        <div className="flex min-h-[80vh] items-center justify-center bg-base-100 px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md rounded-2xl border border-base-200 bg-base-100 p-8 shadow-xl">
            <div className="flex flex-col gap-2 text-center mb-8">
              <h1 className="text-2xl font-bold tracking-tight text-base-content font-sans">
                Welcome back
              </h1>
              <p className="text-sm text-base-content/60">
                Enter your credentials to access your study space
              </p>
            </div>

            <form className="space-y-5" onSubmit={onSubmit}>
              <div className="form-control w-full">
                <label className="label font-medium text-sm text-base-content/80 pb-1.5">
                  Email Address
                </label>
                <div className="input input-bordered flex items-center gap-3 focus-within:border-neutral focus-within:outline-none transition-colors w-full">
                  <FiMail className="text-base-content/40 w-4 h-4" />
                  <input
                    type="email"
                    name="email"
                    required
                    className="grow text-sm bg-transparent placeholder:text-base-content/30 w-full"
                    placeholder="you@library.edu"
                  />
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label font-medium text-sm text-base-content/80 pb-1.5">
                  Password
                </label>
                <div className="input input-bordered flex items-center gap-3 focus-within:border-neutral focus-within:outline-none transition-colors w-full">
                  <FiLock className="text-base-content/40 w-4 h-4" />
                  <input
                    type="password"
                    name="password"
                    required
                    className="grow text-sm bg-transparent placeholder:text-base-content/30 w-full"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button className="btn btn-neutral w-full normal-case text-sm font-medium shadow-md group">
                Sign In
                <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>

            <div className="divider my-6 text-xs text-base-content/40 uppercase tracking-wider font-medium">
              or
            </div>

            <button className="btn btn-outline border-base-300 hover:bg-base-200 hover:text-base-content w-full normal-case text-sm font-medium transition-all" onClick={handleGoogleSignin}>
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.33 0 3.33 2.69 1.386 6.614l3.88 3.151z"
                />
                <path
                  fill="#4285F4"
                  d="M23.519 12.214c0-.796-.068-1.608-.205-2.393H12v4.537h6.477a5.534 5.534 0 0 1-2.4 3.632l3.725 2.89c2.177-2.01 3.717-4.973 3.717-8.666z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.266 14.235L1.386 17.386A11.947 11.947 0 0 0 12 24c2.936 0 5.764-.995 7.795-2.73l-3.725-2.89a7.13 7.13 0 0 1-4.07 1.129 7.08 7.08 0 0 1-6.734-5.274z"
                />
                <path
                  fill="#34A853"
                  d="M1.386 6.614A11.947 11.947 0 0 0 0 12c0 1.923.455 3.74 1.259 5.357l4.007-3.122a7.16 7.16 0 0 1-.223-2.235c0-.773.127-1.523.363-2.236L1.386 6.614z"
                />
              </svg>
              Continue with Google
            </button>

            <p className="text-center text-sm text-slate-500 mt-8">
              Don’t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-slate-950 hover:underline underline-offset-4 transition-all"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;