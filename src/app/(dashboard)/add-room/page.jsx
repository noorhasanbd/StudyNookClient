'use client'
import React from "react";
import {
  FiGrid,
  FiFileText,
  FiImage,
  FiLayers,
  FiUsers,
  FiDollarSign,
} from "react-icons/fi";

const AddRoomPage = () => {
  const amenitiesOptions = [
    "Whiteboard",
    "Projector",
    "Wi‑Fi",
    "Power Outlets",
    "Quiet Zone",
    "Air Conditioning",
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const roomData = Object.fromEntries(formData.entries());
    
    
    const selectedAmenities = Array.from(formData.getAll("amenities"));
    roomData.amenities = selectedAmenities;

 
    const formattedData = {
      ...roomData,
      capacity: Number(roomData.capacity),
      pricePerHour: Number(roomData.pricePerHour),
    };

    console.log("Captured Room Data:", formattedData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl rounded-2xl border border-base-200 bg-base-100 p-8 shadow-xl sm:p-12">
        <div className="flex flex-col gap-2 text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-base-content font-sans">
            Add New Study Room
          </h1>
          <p className="text-sm text-base-content/60">
            Enter the room details to list it on the booking platform
          </p>
        </div>

        <form className="space-y-6" onSubmit={onSubmit}>
         
          <div className="form-control w-full">
            <label className="label font-medium text-sm text-base-content/80 pb-1.5">
              Room Name
            </label>
            <div className="input input-bordered flex items-center gap-3 focus-within:border-neutral focus-within:outline-none transition-colors w-full">
              <FiGrid className="text-base-content/40 w-4 h-4" />
              <input
                type="text"
                name="roomName" 
                required
                className="grow text-sm bg-transparent placeholder:text-base-content/30 w-full"
                placeholder="e.g., Turing Seminar Room"
              />
            </div>
          </div>

     
          <div className="form-control w-full">
            <label className="label font-medium text-sm text-base-content/80 pb-1.5">
              Description
            </label>
            <div className="flex gap-3 px-3 py-2 border border-base-300 rounded-lg focus-within:border-neutral transition-colors w-full bg-base-100">
              <FiFileText className="text-base-content/40 w-4 h-4 mt-1 flex-shrink-0" />
              <textarea
                name="description" 
                required
                rows={4}
                className="grow text-sm bg-transparent placeholder:text-base-content/30 w-full resize-none focus:outline-none"
                placeholder="Provide a detailed description of the room layout, optimal use cases, and special guidelines..."
              />
            </div>
          </div>

    
          <div className="form-control w-full">
            <label className="label font-medium text-sm text-base-content/80 pb-1.5">
              Image URL
            </label>
            <div className="input input-bordered flex items-center gap-3 focus-within:border-neutral focus-within:outline-none transition-colors w-full">
              <FiImage className="text-base-content/40 w-4 h-4" />
              <input
                type="url"
                name="imageUrl" 
                required
                className="grow text-sm bg-transparent placeholder:text-base-content/30 w-full"
                placeholder="https://images.unsplash.com/your-room-image.jpg"
              />
            </div>
          </div>

   
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
            <div className="form-control w-full">
              <label className="label font-medium text-sm text-base-content/80 pb-1.5">
                Floor
              </label>
              <div className="input input-bordered flex items-center gap-3 focus-within:border-neutral focus-within:outline-none transition-colors w-full">
                <FiLayers className="text-base-content/40 w-4 h-4" />
                <input
                  type="text"
                  name="floor" 
                  required
                  className="grow text-sm bg-transparent placeholder:text-base-content/30 w-full"
                  placeholder="e.g., 3rd Floor"
                />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label font-medium text-sm text-base-content/80 pb-1.5">
                Capacity (Persons)
              </label>
              <div className="input input-bordered flex items-center gap-3 focus-within:border-neutral focus-within:outline-none transition-colors w-full">
                <FiUsers className="text-base-content/40 w-4 h-4" />
                <input
                  type="number"
                  name="capacity" 
                  min="1"
                  required
                  className="grow text-sm bg-transparent placeholder:text-base-content/30 w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="e.g., 4"
                />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label font-medium text-sm text-base-content/80 pb-1.5">
                Hourly Rate
              </label>
              <div className="input input-bordered flex items-center gap-3 focus-within:border-neutral focus-within:outline-none transition-colors w-full">
                <FiDollarSign className="text-base-content/40 w-4 h-4" />
                <input
                  type="number"
                  name="pricePerHour" 
                  min="0"
                  step="0.01"
                  required
                  className="grow text-sm bg-transparent placeholder:text-base-content/30 w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="e.g., 5.00"
                />
              </div>
            </div>
          </div>

          <div className="form-control w-full">
            <label className="label font-medium text-sm text-base-content/80 pb-2">
              Amenities
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4 border border-base-200 bg-base-200/20 rounded-xl">
              {amenitiesOptions.map((amenity, index) => (
                <label
                  key={index}
                  className="label cursor-pointer justify-start gap-3 hover:bg-base-200/50 p-2 rounded-lg transition-colors"
                >
                  <input
                    type="checkbox"
                    name="amenities" 
                    className="checkbox checkbox-neutral checkbox-sm rounded"
                    value={amenity}
                  />
                  <span className="label-text text-sm font-medium text-base-content/80">
                    {amenity}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="btn btn-neutral w-full normal-case text-base font-medium shadow-md"
            >
              List Room Resource
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoomPage;