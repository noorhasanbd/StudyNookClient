import React from "react";
import RoomCard from "../shared/RoomCard";

const CardSection = async () => {
 
  const res = await fetch("http://localhost:5000/rooms", {
    cache: "no-store", 
  });
  const rooms = await res.json();

  return (
    <section className="max-w-7xl mx-auto px-4 my-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-base-content tracking-tight">
          Featured Study Rooms
        </h2>
        <p className="text-sm text-base-content/60 mt-1">
          Discover and reserve the perfect space for your next deep-focus or
          collaboration session.
        </p>
      </div>

      {rooms.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-base-300 rounded-xl">
          <p className="text-base-content/50 font-medium">
            No study rooms available right now.
          </p>
        </div>
      ) : (
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CardSection;
