"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  FiGrid,
  FiMapPin,
  FiUsers,
  FiDollarSign,
  FiPlus,
  FiEye,
  FiEdit3,
  FiTrash2,
  FiLayers,
} from "react-icons/fi";

const MyListingsPage = () => {
  const { data: session, isPending: isSessionPending } =
    authClient.useSession();
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isSessionPending || !session?.user?.id) return;

    const fetchMyListings = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/rooms?createdBy=${session.user.id}`,
          {
            cache: "no-store",
          },
        );
        if (res.ok) {
          const data = await res.json();
          setListings(data);
        }
      } catch (error) {
        console.error("Failed fetching listings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyListings();
  }, [session, isSessionPending]);

  if (isSessionPending || isLoading) {
    return (
      <div className="flex justify-center items-center py-24 w-full">
        <span className="loading loading-spinner loading-lg text-neutral"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-base-content">
            My Workspace Listings
          </h1>
          <p className="text-sm text-base-content/60 mt-1">
            Manage, audit, and track your registered study environments.
          </p>
        </div>
        <Link
          href="/add-room"
          className="btn btn-neutral normal-case font-medium shadow-sm"
        >
          <FiPlus className="w-4 h-4" /> Add New Space
        </Link>
      </div>

      <div className="stats shadow w-full grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="stat bg-base-100">
          <div className="stat-title text-base-content/60 text-xs font-semibold uppercase tracking-wider">
            Total Active Units
          </div>
          <div className="stat-value text-base-content mt-1">
            {listings.length}
          </div>
          <div className="stat-desc text-base-content/40 mt-1">
            In network registry
          </div>
        </div>
        <div className="stat bg-base-100">
          <div className="stat-title text-base-content/60 text-xs font-semibold uppercase tracking-wider">
            Accumulated Seat Capacity
          </div>
          <div className="stat-value text-base-content mt-1">
            {listings.reduce((acc, curr) => acc + (curr.capacity || 0), 0)}
          </div>
          <div className="stat-desc text-base-content/40 mt-1">
            Simultaneous users accommodated
          </div>
        </div>
        <div className="stat bg-base-100">
          <div className="stat-title text-base-content/60 text-xs font-semibold uppercase tracking-wider">
            Average Rate Yield
          </div>
          <div className="stat-value text-base-content mt-1">
            $
            {listings.length > 0
              ? (
                  listings.reduce(
                    (acc, curr) => acc + (curr.pricePerHour || 0),
                    0,
                  ) / listings.length
                ).toFixed(2)
              : "0.00"}
          </div>
          <div className="stat-desc text-base-content/40 mt-1">
            Calculated per hour metric
          </div>
        </div>
      </div>

      {listings.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-12 bg-base-100 rounded-2xl border border-dashed border-base-300 shadow-sm min-h-[300px]">
          <div className="w-12 h-12 rounded-full bg-base-200 flex items-center justify-center text-base-content/40 mb-4">
            <FiGrid className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-base-content">
            No active listings deployed
          </h3>
          <p className="text-sm text-base-content/50 max-w-sm mt-1 mb-6">
            You haven't uploaded any study rooms, conference corners, or quiet
            research pods yet.
          </p>
          <Link href="/add-room" className="btn btn-neutral btn-sm normal-case">
            List Your First Space
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {listings.map((room) => (
            <div
              key={room._id}
              className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group"
            >
              <figure className="relative aspect-[16/10] bg-base-300 overflow-hidden">
                <img
                  src={
                    room.imageUrl ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200"
                  }
                  alt={room.roomName}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-base-100/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-base-content flex items-center shadow-sm border border-base-200">
                  <FiDollarSign className="w-3.5 h-3.5 text-success mr-0.5" />
                  <span>{Number(room.pricePerHour || 0).toFixed(2)}/hr</span>
                </div>
              </figure>

              <div className="card-body p-5 flex flex-col justify-between">
                <div className="space-y-2">
                  <h2 className="card-title text-lg font-bold tracking-tight text-base-content truncate">
                    {room.roomName}
                  </h2>
                  <p className="text-sm text-base-content/60 line-clamp-2 min-h-[40px]">
                    {room.description}
                  </p>
                </div>

                <div className="border-t border-base-200 pt-4 mt-4 space-y-2.5 text-xs font-medium text-base-content/70">
                  <div className="flex items-center gap-2 truncate">
                    <FiMapPin className="w-4 h-4 text-base-content/40 flex-shrink-0" />
                    <span className="truncate">{room.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FiLayers className="w-4 h-4 text-base-content/40" />
                      <span>{room.floor || "Main Floor"}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-base-200 px-2 py-1 rounded-md text-base-content/80">
                      <FiUsers className="w-3.5 h-3.5" />
                      <span>{room.capacity} Seats</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-5 mt-2 border-t border-base-100">
                  <Link
                    href={`/rooms/${room._id}`}
                    className="btn btn-outline btn-neutral btn-xs h-9 normal-case flex items-center justify-center gap-1 rounded-lg px-1.5"
                  >
                    <FiEye className="w-3.5 h-3.5" /> View
                  </Link>
                  <Link
                    href={`/edit-room/${room._id}`}
                    className="btn btn-outline btn-warning btn-xs h-9 normal-case flex items-center justify-center gap-1 rounded-lg px-1.5"
                  >
                    <FiEdit3 className="w-3.5 h-3.5" /> Edit
                  </Link>
                  <button
                    onClick={() =>
                      console.log("Delete triggered for:", room._id)
                    }
                    className="btn btn-ghost btn-xs h-9 text-error hover:bg-error/10 normal-case flex items-center justify-center gap-1 rounded-lg px-1.5"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListingsPage;