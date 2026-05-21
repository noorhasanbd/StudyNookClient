"use client";
import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { FiUser, FiMail, FiEdit3, FiX, FiLock, FiImage } from "react-icons/fi";

const MyProfile = () => {
  const {
    data: session,
    isPending: isSessionPending,
    refetch,
  } = authClient.useSession();
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [profileName, setProfileName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profilePassword, setProfilePassword] = useState("");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  useEffect(() => {
    if (!isSessionPending && session?.user) {
      setProfileName(session.user.name || "");
      setProfileImage(session.user.image || "");
    }
  }, [session, isSessionPending]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    try {
      
      await authClient.updateUser({
        name: profileName,
        image: profileImage,
      });

      
      if (profilePassword.trim() !== "") {
        await authClient.changePassword({
          newPassword: profilePassword,
        });
      }

      await refetch();

      toast.success("Profile updated successfully.");
      setIsEditingProfile(false);
      setProfilePassword("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile database records.");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  if (isSessionPending) {
    return (
      <div className="flex justify-center items-center py-24 w-full">
        <span className="loading loading-spinner loading-lg text-neutral"></span>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-base-content">
          My Account Profile
        </h1>
        <p className="text-sm text-base-content/60 mt-1">
          Manage your credentials and personal workspace records.
        </p>
      </div>

      {session?.user ? (
        <div className="card bg-base-100 border border-base-300 shadow-sm p-6 rounded-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name}
                  className="w-16 h-16 rounded-full object-cover border border-base-300"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center text-base-content/40 border border-base-300">
                  <FiUser className="w-8 h-8" />
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
                  {session.user.name}
                </h2>
                <p className="text-sm text-base-content/60 flex items-center gap-1.5 mt-0.5">
                  <FiMail className="w-3.5 h-3.5" /> {session.user.email}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsEditingProfile(true)}
              className="btn btn-outline btn-sm normal-case rounded-lg flex items-center gap-1.5"
            >
              <FiEdit3 className="w-3.5 h-3.5" /> Edit Profile
            </button>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning">
          <span>Please log in to view profile configurations.</span>
        </div>
      )}

      {isEditingProfile && (
        <dialog
          open
          className="modal modal-bottom sm:modal-middle bg-black/50 backdrop-blur-xs z-50"
        >
          <div className="modal-box bg-base-100 border border-base-300 max-w-md p-6 relative rounded-2xl shadow-2xl">
            <button
              onClick={() => {
                setIsEditingProfile(false);
                setProfilePassword("");
              }}
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-base-content/50"
            >
              <FiX className="w-4 h-4" />
            </button>
            <h3 className="font-bold text-xl text-base-content tracking-tight mb-6">
              Edit Profile Details
            </h3>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="form-control w-full">
                <label className="label text-xs font-semibold uppercase tracking-wider text-base-content/70 pb-1">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
                  <input
                    type="text"
                    required
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="input input-bordered focus:border-neutral focus:outline-none text-sm w-full pl-10"
                  />
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label text-xs font-semibold uppercase tracking-wider text-base-content/70 pb-1">
                  Image URL
                </label>
                <div className="relative">
                  <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
                  <input
                    type="url"
                    value={profileImage}
                    onChange={(e) => setProfileImage(e.target.value)}
                    className="input input-bordered focus:border-neutral focus:outline-none text-sm w-full pl-10"
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label text-xs font-semibold uppercase tracking-wider text-base-content/70 pb-1">
                  New Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
                  <input
                    type="password"
                    value={profilePassword}
                    onChange={(e) => setProfilePassword(e.target.value)}
                    className="input input-bordered focus:border-neutral focus:outline-none text-sm w-full pl-10"
                    placeholder="Leave blank to keep current password"
                  />
                </div>
              </div>

              <div className="modal-action pt-2">
                <button
                  type="submit"
                  disabled={isUpdatingProfile}
                  className="btn btn-neutral w-full normal-case font-bold shadow-md"
                >
                  {isUpdatingProfile ? "Saving Profile..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyProfile;
