import Link from "next/link";
import React from "react";

const Navbar = () => {
    const navigation = [
        { name: "Home", href: "#" },
        { name: "Rooms", href: "/all-rooms" },
        { name: "About", href: "About" },
 
    ];
  return (
    <div className="navbar bg-base-100 shadow-sm md:px-12">
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
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navigation.map((nav,i)=> <li key={i}> <Link href={nav.href}>{nav.name}</Link></li>)}
            
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">StudyNook</Link>
       
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
         {navigation.map((nav,i)=> <li key={i}> <Link href={nav.href}>{nav.name}</Link></li>)}
        </ul>
      </div>
      <div className="navbar-end">
        
      </div>
      <div className="dropdown dropdown-end flex items-center gap-4">
        <Link className="btn" href="/login">
          Login
        </Link>
        <Link className="btn" href="/register">
          Register
        </Link>
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <ul
          tabIndex="-1"
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li>
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <a>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
