'use client'
import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  FiGrid, 
  FiPlusCircle, 
  FiCalendar, 
  FiUser, 
  FiMenu 
} from "react-icons/fi";

const AdminLayout = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-200">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-neutral mb-2"></span>
          <p className="text-sm font-medium text-base-content/60">Verifying administrator identity...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const navigationLinks = [
    { name: "My Listings", href: "/my-listings", icon: FiGrid },
    { name: "Add Room", href: "/add-room", icon: FiPlusCircle },
    { name: "My Bookings", href: "/my-bookings", icon: FiCalendar },
    { name: "My Profile", href: "/my-profile", icon: FiUser },
  ];

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-base-200">
      <input id="admin-sidebar-drawer" type="checkbox" className="drawer-toggle" />
      <ToastContainer />
      
      <div className="drawer-content flex flex-col">
        <header className="navbar bg-base-100 border-b border-base-300 px-4 lg:hidden sticky top-0 z-30 shadow-sm">
          <div className="flex-1">
            <span className="font-bold tracking-tight text-base-content font-sans">
              StudyNook Panel
            </span>
          </div>
          <div className="flex-none">
            <label htmlFor="admin-sidebar-drawer" className="btn btn-square btn-ghost drawer-button">
              <FiMenu className="w-6 h-6 text-base-content" />
            </label>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      <div className="drawer-side z-40">
        <label
          htmlFor="admin-sidebar-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        
        <div className="flex flex-col bg-base-100 border-r border-base-300 min-h-full w-80 p-4">
          <div className="flex items-center gap-2 px-2 pb-6 pt-2 border-b border-base-200 mb-6">
            <div className="w-8 h-8 rounded-lg bg-neutral flex items-center justify-center text-neutral-content font-bold">
              SN
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-base-content leading-tight">
                StudyNook Hub
              </span>
              <span className="text-xs text-base-content/50 truncate max-w-[180px]">
                {session.user.email}
              </span>
            </div>
          </div>

          <ul className="menu w-full p-0 space-y-1 flex-1">
            <li className="menu-title font-semibold text-xs tracking-wider text-base-content/40 mb-2 px-2 uppercase">
              Management
            </li>
            
            {navigationLinks.map((link) => {
              const IconComponent = link.icon;
              const isActive = pathname === link.href;
              
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all group ${
                      isActive 
                        ? "bg-neutral text-neutral-content shadow-sm" 
                        : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                    }`}
                  >
                    <IconComponent className={`w-5 h-5 flex-shrink-0 ${
                      isActive ? "text-neutral-content" : "text-base-content/40 group-hover:text-base-content/70"
                    }`} />
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="border-t border-base-200 pt-4 px-2 mt-auto">
            <div className="text-xs text-base-content/40 text-center font-medium">
              StudyNook Portal &bull; v1.0.0
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;