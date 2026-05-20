import React from "react";
import Link from "next/link";
import { FiUsers, FiLayers, FiDollarSign, FiArrowRight } from "react-icons/fi";

const RoomCard = ({ room }) => {
  const {
    _id,
    roomName = "Unnamed Study Room",
    description = "No structural layout description provided for this study room.",
    imageUrl = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500",
    floor = "N/A",
    capacity = 0,
    pricePerHour = 0,
    amenities = [],
  } = room || {};

  const cleanPrice =
    typeof pricePerHour === "number" ? pricePerHour : Number(pricePerHour || 0);

  return (
    <div className="card bg-base-100 w-full shadow-md hover:shadow-xl border border-base-200/60 transition-all duration-300 group overflow-hidden h-full flex flex-col">
      <figure className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-base-300 flex-shrink-0">
        <img
          src={imageUrl}
          alt={roomName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        <div className="absolute top-4 right-4 badge badge-neutral p-3.5 font-semibold shadow-md gap-0.5 text-sm">
          <FiDollarSign className="w-3.5 h-3.5 text-success" />
          <span className="text-base-100 font-bold">
            {cleanPrice.toFixed(2)}
          </span>
          <span className="text-xs font-normal text-base-100/60">/hr</span>
        </div>
      </figure>

      <div className="card-body p-6 gap-4 flex flex-col flex-grow">
        <div>
          <h2 className="card-title text-xl font-bold text-base-content group-hover:text-primary transition-colors line-clamp-1">
            {roomName}
          </h2>
          <p className="text-sm text-base-content/70 line-clamp-2 leading-relaxed mt-2 min-h-[2.5rem]">
            {description}
          </p>
        </div>

        <div className="flex flex-col gap-2 pt-1">
          <div className="flex items-center gap-2 text-xs text-base-content/60 font-semibold tracking-wide uppercase">
            <FiLayers className="w-4 h-4 text-primary" />
            <span>Location: {floor}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-base-content/80 font-medium">
            <FiUsers className="w-4 h-4 text-base-content/50" />
            <span>
              Max Capacity:{" "}
              <strong className="text-base-content font-bold">
                {capacity} Seats
              </strong>
            </span>
          </div>
        </div>

        {amenities && amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {amenities.slice(0, 3).map((amenity, i) => (
              <span
                key={`${amenity}-${i}`}
                className="badge badge-sm border-base-300 bg-base-200/40 text-base-content/70 font-medium px-2.5 py-2.5 rounded-md"
              >
                {amenity}
              </span>
            ))}
            {amenities.length > 3 && (
              <span className="text-xs text-base-content/40 self-center font-bold tracking-wider pl-1">
                +{amenities.length - 3} MORE
              </span>
            )}
          </div>
        )}

        <div className="card-actions mt-auto pt-4 border-t border-base-200/80">
          <Link
            href={`/rooms/${_id}`}
            className="btn btn-neutral btn-block normal-case group-hover:btn-primary group-hover:text-primary-content transition-all duration-300 gap-2 font-bold shadow-sm"
          >
            View Details
            <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
