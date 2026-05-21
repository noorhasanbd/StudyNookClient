import RoomCard from "@/components/shared/RoomCard";
import React from "react";

const AllRoomsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms`, {
    cache: "no-store",
  });
  const rooms = await res.json();

  return <div className="mx-auto container max-w-7xl">
    <h1 className="text-3xl font-bold mb-6">All Study Rooms</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
  </div>;
};

export default AllRoomsPage;
