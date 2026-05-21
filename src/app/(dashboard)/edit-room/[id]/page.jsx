"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import {
  FiGrid,
  FiFileText,
  FiImage,
  FiLayers,
  FiUsers,
  FiDollarSign,
  FiMapPin,
} from "react-icons/fi";

const EditRoomPage = ({ params }) => {
  const unwrappedParams = React.use(params);
  const roomId = unwrappedParams.id;
  
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [room, setRoom] = useState(null);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const amenitiesOptions = [
    "Whiteboard",
    "Projector",
    "Wi‑Fi",
    "Power Outlets",
    "Quiet Zone",
    "Air Conditioning",
  ];

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const res = await fetch(`http://localhost:5000/rooms/${roomId}`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          setRoom(data);
          setSelectedAmenities(data?.amenities || []);
        } else {
          toast.error("Failed to fetch room profile details.");
        }
      } catch (error) {
        console.error("Error loading room data:", error);
        toast.error("An error occurred loading the configuration layout.");
      } finally {
        setIsLoading(false);
      }
    };

    if (roomId) {
      fetchRoomDetails();
    }
  }, [roomId]);

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const formFields = Object.fromEntries(formData.entries());

    const formattedPayload = {
      ...formFields,
      capacity: Number(formFields.capacity),
      pricePerHour: Number(formFields.pricePerHour),
      amenities: selectedAmenities,
      userId: session?.user?.id,
    };

    try {
      const response = await fetch(`http://localhost:5000/rooms/${roomId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedPayload),
      });

      if (response.ok) {
        toast.success(`${formFields.roomName || "Workspace"} config adjusted smoothly.`);
        router.push("/my-listings");
        router.refresh();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to adjust data specifications.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during verification submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-24 w-full">
        <span className="loading loading-spinner loading-lg text-neutral"></span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-base-200 px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl rounded-2xl border border-base-300 bg-base-100 p-8 shadow-sm sm:p-12">
        <div className="flex flex-col gap-2 text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-base-content font-sans">
            Modify Workspace Layout
          </h1>
          <p className="text-sm text-base-content/60">
            Editing resource asset as:{" "}
            <span className="font-semibold text-neutral">
              {session?.user?.email}
            </span>
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
                defaultValue={room?.roomName || ""}
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
                defaultValue={room?.description || ""}
                className="grow text-sm bg-transparent placeholder:text-base-content/30 w-full resize-none focus:outline-none"
                placeholder="Provide a detailed description of the room layout, optimal use cases..."
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
                defaultValue={room?.imageUrl || ""}
                className="grow text-sm bg-transparent placeholder:text-base-content/30 w-full"
                placeholder="https://images.unsplash.com/your-room-image.jpg"
              />
            </div>
          </div>

          <div className="form-control w-full">
            <label className="label font-medium text-sm text-base-content/80 pb-1.5">
              Full Physical Address
            </label>
            <div className="input input-bordered flex items-center gap-3 focus-within:border-neutral focus-within:outline-none transition-colors w-full">
              <FiMapPin className="text-base-content/40 w-4 h-4" />
              <input
                type="text"
                name="location"
                required
                defaultValue={room?.location || ""}
                className="grow text-sm bg-transparent placeholder:text-base-content/30 w-full"
                placeholder="e.g., 3rd floor, Imperial Amin Square, Dhanmondi, 1209"
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
                  defaultValue={room?.floor || ""}
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
                  defaultValue={room?.capacity || ""}
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
                  defaultValue={room?.pricePerHour || ""}
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
                    className="checkbox checkbox-neutral checkbox-sm rounded"
                    value={amenity}
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => handleAmenityChange(amenity)}
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
              disabled={isSubmitting}
              className="btn btn-neutral w-full normal-case text-base font-medium shadow-md disabled:bg-base-300"
            >
              {isSubmitting ? "Applying Updates..." : "Save Registry Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRoomPage;