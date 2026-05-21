"use client";
import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import {
  FiCalendar,
  FiClock,
  FiUsers,
  FiDollarSign,
  FiTrash2,
  FiEdit3,
  FiMapPin,
  FiLayers,
  FiX,
  FiGrid,
} from "react-icons/fi";

const MyBookings = () => {
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeEditingBooking, setActiveEditingBooking] = useState(null);
  const [isSubmittingUpdate, setIsSubmittingUpdate] = useState(false);

  const [editDate, setEditDate] = useState("");
  const [editStart, setEditStart] = useState("");
  const [editEnd, setEditEnd] = useState("");

  const fetchUserBookings = async () => {
    if (!session?.user?.id) return;
    try {
      const res = await fetch(`http://localhost:5000/bookings/user/${session.user.id}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isSessionPending && session?.user?.id) {
      fetchUserBookings();
    }
  }, [session, isSessionPending]);

  const openEditModal = (booking) => {
    setActiveEditingBooking(booking);
    setEditDate(booking.date);
    setEditStart(booking.startTime);
    setEditEnd(booking.endTime);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingUpdate(true);

    try {
      const response = await fetch(`http://localhost:5000/bookings/${activeEditingBooking._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session?.user?.id,
          date: editDate,
          startTime: editStart,
          endTime: editEnd,
        }),
      });

      if (response.ok) {
        toast.success("Reservation schedule adjustments authorized successfully.");
        setActiveEditingBooking(null);
        fetchUserBookings();
      } else {
        const err = await response.json();
        toast.error(err.message || "Failed to update scheduling grid.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Communication failure updating resource allocation.");
    } finally {
      setIsSubmittingUpdate(false);
    }
  };

  const handleCancelBooking = async (id, roomName) => {
    const confirmCancellation = window.confirm(`Are you sure you want to cancel your reservation for "${roomName}"?`);
    if (!confirmCancellation) return;

    try {
      const response = await fetch(`http://localhost:5000/bookings/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session?.user?.id }),
      });

      if (response.ok) {
        toast.success("Reservation safely removed from scheduler matrices.");
        setBookings((prev) => prev.filter((item) => item._id !== id));
      } else {
        const err = await response.json();
        toast.error(err.message || "Failed to drop allocation node.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network communication failure executing cancellation.");
    }
  };

  if (isSessionPending || isLoading) {
    return (
      <div className="flex justify-center items-center py-24 w-full">
        <span className="loading loading-spinner loading-lg text-neutral"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-base-content">
          My Reserved Spaces
        </h1>
        <p className="text-sm text-base-content/60 mt-1">
          Review, manage, and audit your upcoming room time allocations.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-12 bg-base-100 rounded-2xl border border-dashed border-base-300 shadow-sm min-h-[300px]">
          <div className="w-12 h-12 rounded-full bg-base-200 flex items-center justify-center text-base-content/40 mb-4">
            <FiGrid className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-base-content">
            No active schedules logged
          </h3>
          <p className="text-sm text-base-content/50 max-w-sm mt-1">
            You don't have any workspace leases processing right now. Browse our catalogs to book a pod.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="card-body p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <h2 className="text-lg font-bold tracking-tight text-base-content truncate">
                      {booking.roomName}
                    </h2>
                    <span className="badge badge-success badge-sm font-bold uppercase text-[10px] tracking-wider rounded-md p-2.5">
                      {booking.status || "Confirmed"}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-base-content/40 uppercase tracking-widest flex items-center gap-1">
                    ID: <span className="font-mono text-base-content/70">{booking._id.slice(-8)}</span>
                  </p>
                </div>

                <div className="bg-base-200/50 rounded-xl p-3.5 space-y-2.5 text-sm font-medium text-base-content/80 border border-base-200">
                  <div className="flex items-center gap-2">
                    <FiCalendar className="w-4 h-4 text-neutral/50" />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock className="w-4 h-4 text-neutral/50" />
                    <span>{booking.startTime} - {booking.endTime}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-base-300/60 pt-2 mt-1">
                    <div className="flex items-center gap-2">
                      <FiUsers className="w-4 h-4 text-neutral/50" />
                      <span>{booking.seatsReserved} Seats Allocated</span>
                    </div>
                    <div className="flex items-center font-bold text-success">
                      <FiDollarSign className="w-3.5 h-3.5" />
                      <span>{Number(booking.totalPaid || 0).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => openEditModal(booking)}
                    className="btn btn-outline btn-neutral btn-sm normal-case rounded-lg flex items-center justify-center gap-1.5 h-9"
                  >
                    <FiEdit3 className="w-3.5 h-3.5" /> Reschedule
                  </button>
                  <button
                    onClick={() => handleCancelBooking(booking._id, booking.roomName)}
                    className="btn btn-ghost btn-sm text-error hover:bg-error/10 normal-case rounded-lg flex items-center justify-center gap-1.5 h-9"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" /> Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeEditingBooking && (
        <dialog open className="modal modal-bottom sm:modal-middle bg-black/50 backdrop-blur-xs z-50">
          <div className="modal-box bg-base-100 border border-base-300 max-w-md p-6 relative rounded-2xl shadow-2xl">
            <button
              onClick={() => setActiveEditingBooking(null)}
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-base-content/50"
            >
              <FiX className="w-4 h-4" />
            </button>

            <h3 className="font-bold text-xl text-base-content tracking-tight mb-1">
              Reschedule Window
            </h3>
            <p className="text-xs text-base-content/60 mb-6 truncate">
              Modifying: <strong>{activeEditingBooking.roomName}</strong>
            </p>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div className="form-control w-full">
                <label className="label text-xs font-semibold uppercase tracking-wider text-base-content/70 pb-1">
                  Adjusted Target Date
                </label>
                <input
                  type="date"
                  required
                  value={editDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="input input-bordered focus:border-neutral focus:outline-none text-sm w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control w-full">
                  <label className="label text-xs font-semibold uppercase tracking-wider text-base-content/70 pb-1">
                    Start Hour
                  </label>
                  <input
                    type="time"
                    required
                    value={editStart}
                    onChange={(e) => setEditStart(e.target.value)}
                    className="input input-bordered focus:border-neutral focus:outline-none text-sm w-full"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label text-xs font-semibold uppercase tracking-wider text-base-content/70 pb-1">
                    End Hour
                  </label>
                  <input
                    type="time"
                    required
                    value={editEnd}
                    onChange={(e) => setEditEnd(e.target.value)}
                    className="input input-bordered focus:border-neutral focus:outline-none text-sm w-full"
                  />
                </div>
              </div>

              <div className="modal-action pt-2">
                <button
                  type="submit"
                  disabled={isSubmittingUpdate}
                  className="btn btn-neutral w-full normal-case font-bold shadow-md disabled:bg-base-300"
                >
                  {isSubmittingUpdate ? "Saving Allocation..." : "Confirm Schedule Adjustments"}
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyBookings;