"use client";
import React, { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import {
  FiUsers,
  FiLayers,
  FiDollarSign,
  FiCheckCircle,
  FiClock,
  FiChevronLeft,
  FiCalendar,
  FiInfo,
  FiMapPin,
  FiX,
} from "react-icons/fi";

const RoomDetailsClient = ({ room }) => {
  const { data: session } = authClient.useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [requestedSeats, setRequestedSeats] = useState(1);

  if (!room || !room.id) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full bg-base-100">
        <span className="loading loading-spinner loading-lg text-neutral"></span>
      </div>
    );
  }

  const calculateTotalPrice = () => {
    if (!startTime || !endTime) return 0;
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    const durationInHours =
      endHours + endMinutes / 60 - (startHours + startMinutes / 60);
    return durationInHours > 0 ? durationInHours * room.pricePerHour : 0;
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!session) {
      toast.error("Please sign in to schedule a booking reservation.");
      return;
    }

    if (requestedSeats > room.capacity) {
      toast.error(
        `Cannot reserve more than the maximum ${room.capacity} available seats.`,
      );
      return;
    }

    const calculatedTotal = calculateTotalPrice();
    if (calculatedTotal <= 0) {
      toast.error(
        "Invalid timeframe choice. End time must be ahead of start time.",
      );
      return;
    }

    setIsSubmitting(true);

    const bookingPayload = {
      roomId: room.id,
      roomName: room.roomName,
      userId: session.user.id,
      userEmail: session.user.email,
      date: bookingDate,
      startTime,
      endTime,
      seatsReserved: Number(requestedSeats),
      totalPaid: calculatedTotal,
      status: "confirmed",
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings"`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });

      if (response.ok) {
        toast.success(
          `Reservation for "${room.roomName}" successfully authorized!`,
        );
        setIsModalOpen(false);
        setBookingDate("");
        setStartTime("");
        setEndTime("");
        setRequestedSeats(1);
      } else {
        const err = await response.json();
        toast.error(
          err.message || "Slot allocation collision or error detected.",
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Network communication failure to server backend.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 text-sm font-medium text-base-content/60 hover:text-primary transition-colors group"
          >
            <FiChevronLeft className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" />
            Back to Room Catalog
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden border border-base-200 shadow-sm bg-base-300">
              <img
                src={room.imageUrl}
                alt={room.roomName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="border-b border-base-200 pb-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-base-content tracking-tight">
                {room.roomName}
              </h1>

              <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-semibold uppercase tracking-wide">
                <div className="flex items-center gap-1.5 bg-base-200/60 px-3 py-1.5 rounded-lg border border-base-200 text-base-content/70">
                  <FiLayers className="w-4 h-4 text-primary" />
                  <span>{room.floor}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-base-200/60 px-3 py-1.5 rounded-lg border border-base-200 text-base-content/70">
                  <FiUsers className="w-4 h-4 text-primary" />
                  <span>{room.capacity} Available Seats</span>
                </div>
                <div className="flex items-center gap-1.5 bg-base-200/60 px-3 py-1.5 rounded-lg border border-base-200 text-base-content/70 normal-case">
                  <FiMapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{room.location}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-base-content tracking-tight">
                About This Workspace
              </h3>
              <p className="text-base-content/75 text-base leading-relaxed whitespace-pre-line">
                {room.description}
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-base-content tracking-tight">
                Included Amenities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {room.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl border border-base-200 bg-base-200/20 text-sm text-base-content/80 font-medium"
                  >
                    <FiCheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl border border-info/20 bg-info/5 flex gap-3 text-sm text-info-content/90 leading-relaxed">
              <FiInfo className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block mb-0.5">
                  Booking Etiquette Notice:
                </strong>
                Please maintain appropriate noise thresholds when inside this
                pod resource. Ensure layout configurations are returned to
                native templates post-checkout.
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-8">
            <div className="card bg-base-100 border border-base-200 shadow-xl rounded-2xl overflow-hidden">
              <div className="card-body p-6 sm:p-8 space-y-6">
                <div className="flex items-baseline justify-between border-b border-base-200 pb-4">
                  <span className="text-sm font-semibold text-base-content/60">
                    Resource Rate
                  </span>
                  <div className="flex items-baseline text-base-content">
                    <FiDollarSign className="w-4 h-4 text-success self-center font-bold" />
                    <span className="text-3xl font-extrabold tracking-tight">
                      {room.pricePerHour.toFixed(2)}
                    </span>
                    <span className="text-sm font-medium text-base-content/50 ml-1">
                      / hour
                    </span>
                  </div>
                </div>

                <div className="space-y-3.5 text-sm font-medium text-base-content/80">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-base-content/60">
                      <FiClock className="w-4 h-4" /> Min Duration
                    </span>
                    <span>1.0 Hour</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-base-content/60">
                      <FiUsers className="w-4 h-4" /> Allocation Rule
                    </span>
                    <span>Entire Room</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-base-content/60">
                      <FiCalendar className="w-4 h-4" /> Instant Approval
                    </span>
                    <span className="text-success font-semibold">Active</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (!session) {
                        toast.error(
                          "Please log in to register a workspace reservation.",
                        );
                        return;
                      }
                      setIsModalOpen(true);
                    }}
                    className="btn btn-neutral btn-block normal-case font-bold text-base shadow-md hover:btn-primary transition-colors"
                  >
                    Reserve This Space
                  </button>
                  <p className="text-center text-xs text-base-content/40 mt-3 font-medium">
                    Tax and usage allocations are calculated at next screen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <dialog
          open
          className="modal modal-bottom sm:modal-middle bg-black/50 backdrop-blur-xs z-50 animate-fade-in"
        >
          <div className="modal-box bg-base-100 border border-base-300 max-w-md p-6 relative rounded-2xl shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-base-content/50"
            >
              <FiX className="w-4 h-4" />
            </button>

            <h3 className="font-bold text-xl text-base-content tracking-tight mb-1">
              Book {room.roomName}
            </h3>
            <p className="text-xs text-base-content/60 mb-6">
              Hourly cost configuration:{" "}
              <span className="font-semibold text-neutral">
                ${room.pricePerHour.toFixed(2)}/hr
              </span>
            </p>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4 bg-base-200/50 p-3 rounded-xl border border-base-200">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-base-content/50 uppercase tracking-wider">
                    Seats Available
                  </span>
                  <span className="text-lg font-extrabold text-neutral">
                    {room.capacity} Total
                  </span>
                </div>
                <div className="form-control w-full">
                  <label className="text-xs font-semibold text-base-content/50 uppercase tracking-wider pb-1">
                    Seats Desired
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max={room.capacity}
                    value={requestedSeats}
                    onChange={(e) => setRequestedSeats(Number(e.target.value))}
                    className="input input-sm input-bordered focus:border-neutral focus:outline-none font-bold text-sm text-center w-full"
                  />
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label text-xs font-semibold uppercase tracking-wider text-base-content/70 pb-1">
                  Target Date
                </label>
                <input
                  type="date"
                  required
                  value={bookingDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setBookingDate(e.target.value)}
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
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
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
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="input input-bordered focus:border-neutral focus:outline-none text-sm w-full"
                  />
                </div>
              </div>

              {calculateTotalPrice() > 0 && (
                <div className="p-4 rounded-xl bg-base-200/60 border border-base-300 flex justify-between items-center mt-2 animate-fade-in">
                  <span className="text-xs font-bold uppercase tracking-wider text-base-content/60">
                    Estimated Cost
                  </span>
                  <span className="text-xl font-black text-neutral">
                    ${calculateTotalPrice().toFixed(2)}
                  </span>
                </div>
              )}

              <div className="modal-action pt-2">
                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    calculateTotalPrice() <= 0 ||
                    requestedSeats > room.capacity ||
                    requestedSeats < 1
                  }
                  className="btn btn-neutral w-full normal-case font-bold shadow-md disabled:bg-base-300"
                >
                  {isSubmitting
                    ? "Processing Schedule..."
                    : "Confirm Booking Allocation"}
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default RoomDetailsClient;
