import React from "react";
import Link from "next/link";
import { FiArrowRight, FiCalendar } from "react-icons/fi";

const HeroSection = () => {
  return (
    <div className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-base-300">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105 animate-[pulse_8s_infinite_alternate]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop')`,
        }}
      />

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-neutral/70 via-neutral/80 to-base-100" />

      <div className="absolute top-1/4 left-1/4 z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-pulse duration-4000" />
      <div className="absolute bottom-1/4 right-1/4 z-10 h-96 w-96 rounded-full bg-secondary/10 blur-3xl animate-pulse duration-7000" />

      <div className="relative z-20 max-w-4xl px-4 mx-auto text-center text-neutral-content sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-base-100/10 backdrop-blur-md border border-base-100/20 text-xs font-medium uppercase tracking-wider mb-6 text-secondary-content/90 animate-[bounce_3s_infinite]">
          <span className="flex h-2 w-2 rounded-full bg-success animate-ping" />
          24/7 Silent Study Access Available
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-sans mb-6 drop-shadow-md bg-clip-text text-transparent bg-gradient-to-r from-base-100 via-base-200 to-base-100 animate-[fadeInUp_0.8s_ease-out]">
          Your Perfect Study Space, <br />
          <span className="text-primary-content bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Booked Instantly.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-neutral-content/80 max-w-2xl mx-auto mb-10 font-normal leading-relaxed animate-[fadeInUp_1s_ease-out_forwards]">
          Escape the noise. Find, schedule, and secure premium quiet rooms,
          group collaboration spaces, and study desks tailored to your focus
          hours.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-[fadeInUp_1.2s_ease-out_forwards]">
          <Link
            href="/rooms"
            className="btn btn-primary btn-md sm:btn-lg px-8 normal-case font-medium shadow-lg hover:shadow-primary/30 transition-all duration-300 group w-full sm:w-auto"
          >
            Explore Rooms
            <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>

          
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-base-100 to-transparent z-20" />
    </div>
  );
};

export default HeroSection;
