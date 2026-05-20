"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { FiLogOut, FiUser, FiSliders } from "react-icons/fi";
import React from "react";

const Navbar = () => {
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Rooms", href: "/all-rooms" },
    { name: "About", href: "/about" },
  ];

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 border-b border-base-200">
      <div className="container mx-auto flex items-center justify-between">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-xl z-[1] mt-3 w-52 p-2 shadow-lg border border-base-200 space-y-1"
            >
              {navigation.map((nav, i) => (
                <li key={i}>
                  <Link
                    href={nav.href}
                    className={pathname === nav.href ? "active" : ""}
                  >
                    {nav.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost text-xl font-bold font-sans tracking-tightnormal-case hover:bg-transparent">
            Study<span className="text-blue-500">Nook</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            {navigation.map((nav, i) => (
              <li key={i}>
                <Link
                  href={nav.href}
                  className={`font-medium px-4 py-2 rounded-lg transition-colors ${
                    pathname === nav.href 
                      ? "bg-base-200 text-base-content font-semibold" 
                      : "text-base-content/70 hover:text-base-content hover:bg-base-100"
                  }`}
                >
                  {nav.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end gap-2">
          {isPending ? (
            <div className="h-10 w-10 animate-pulse rounded-full bg-base-200 flex items-center justify-center">
              <FiUser className="h-4 w-4 text-base-content/30" />
            </div>
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="btn btn-ghost btn-sm gap-2 normal-case font-medium flex"
              >
                <FiSliders className="h-4 w-4" />
                Dashboard
              </Link>

              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar ring-1 ring-base-200 ring-offset-2 hover:ring-primary transition-all"
                >
                  <div className="w-10 rounded-full overflow-hidden bg-base-200 relative">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User"}
                        width={40}
                        height={40}
                        className="object-cover h-full w-full"
                        priority
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <FiUser className="h-4 w-4 text-base-content/60" />
                      </div>
                    )}
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-xl z-[1] mt-3 w-52 p-2 shadow-xl border border-base-200 space-y-1"
                >
                  <li className="menu-title text-xs font-semibold tracking-wider uppercase text-base-content/40 px-3 py-2">
                    {user.name}
                  </li>
                  <div className="border-b border-base-200 my-1"></div>
                  <li>
                    <Link href="/profile" className="py-2.5 gap-3 rounded-lg font-medium">
                      <FiUser className="h-4 w-4 text-base-content/60" /> Profile
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard" className="py-2.5 gap-3 rounded-lg font-medium">
                      <FiSliders className="h-4 w-4 text-base-content/60" /> Dashboard
                    </Link>
                  </li>
                  <div className="border-b border-base-200 my-1"></div>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="py-2.5 gap-3 rounded-lg font-medium text-error hover:bg-error/10 hover:text-error"
                    >
                      <FiLogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link className="btn btn-ghost btn-sm normal-case font-medium" href="/login">
                Login
              </Link>
              <Link className="btn btn-neutral btn-sm normal-case font-medium shadow-sm" href="/register">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;