import React from "react";
import RoomDetailsClient from "./RoomDetailsClient";

const RoomDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${id}`, {
    cache: "no-store",
  });
  const roomData = await res.json();

  const room = {
    id: id,
    roomName: roomData?.roomName || "Premium Study Suite",
    description: roomData?.description || "No description available for this workspace resource.",
    imageUrl: roomData?.imageUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200",
    floor: roomData?.floor || "Main Floor",
    location: roomData?.location || "Location data unavailable",
    capacity: Number(roomData?.capacity) || 0,
    pricePerHour: Number(roomData?.pricePerHour) || 0.0,
    amenities: Array.isArray(roomData?.amenities) ? roomData.amenities : [],
  };

  return <RoomDetailsClient room={room} />;
};

export default RoomDetailsPage;