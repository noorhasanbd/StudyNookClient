import React from "react";
import Link from "next/link";
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
} from "react-icons/fi";

const RoomDetailsPage = async ({ params }) => {
  const { id } = await params;

  console.log("Room ID from URL:", id);
  const res = await fetch(`http://localhost:5000/rooms/${id}`, {
    cache: "no-store",
  });
  const roomData = await res.json();

  console.log("Fetched Room Data:", roomData);

  const room = {
    roomName: roomData?.roomName || "Premium Study Suite",
    description:
      roomData?.description ||
      "No description available for this workspace resource.",
    imageUrl:
      roomData?.imageUrl ||
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200",
    floor: roomData?.floor || "Main Floor",
    location: roomData?.location || "Location data unavailable",
    capacity: roomData?.capacity || 0,
    pricePerHour: Number(roomData?.pricePerHour) || 0.0,
    amenities: roomData?.amenities || [],
  };

  return (
    <div className="min-h-screen bg-base-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link
            href="/all-rooms"
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
                  <button className="btn btn-neutral btn-block normal-case font-bold text-base shadow-md hover:btn-primary transition-colors">
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
    </div>
  );
};

export default RoomDetailsPage;