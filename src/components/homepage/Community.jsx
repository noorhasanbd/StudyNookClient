import React from "react";

export const CommunityActivity = () => {
  const reviews = [
    {
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      name: "Sarah Jenkins",
      role: "Computer Science Major",
      status: "Booked Room 4B (3 Hours)",
      comment:
        "Finally found a study spot with consistent high-speed internet and silent study pods. The Google integration made reservation instant.",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      name: "Alex Rivera",
      role: "Full-Stack Engineer",
      status: "Booked Collab Pod A (5 Hours)",
      comment:
        "We managed to pull off an entire weekend team sprint here. Whiteboards, screen mirroring, and clean architecture right inside the hub.",
    },
  ];

  return (
    <section className="bg-slate-900 text-white py-24 px-6 relative overflow-hidden">
      {/* Visual background grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px]"></div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12 items-center relative z-10">
        {/* Left side static context column */}
        <div className="md:col-span-2 space-y-6">
          <span className="text-xs font-bold tracking-widest uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
            Live Ecosystem
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Loved by Builders, Scholars, & Creators.
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light">
            Don’t take our word for it. Thousands of dynamic work hours are
            logged inside our system daily by developers building platforms and
            students breaking records.
          </p>
          <div className="pt-2 flex gap-6 items-center">
            <div>
              <p className="text-2xl font-black text-indigo-400">4.9/5</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-0.5">
                Average Rating
              </p>
            </div>
            <div className="w-px h-10 bg-slate-800"></div>
            <div>
              <p className="text-2xl font-black text-indigo-400">14k+</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-0.5">
                Reservations Logged
              </p>
            </div>
          </div>
        </div>

        {/* Right side interactive card layout feed */}
        <div className="md:col-span-3 space-y-6">
          {reviews.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl shadow-black/40 hover:border-slate-700/60 transition duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500/30 ring-4 ring-indigo-500/5"
                  />
                  <div>
                    <h4 className="font-bold text-slate-200">{item.name}</h4>
                    <p className="text-xs text-slate-400 font-medium">
                      {item.role}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2.5 py-1 rounded-full self-start sm:self-center">
                  ● {item.status}
                </span>
              </div>
              <p className="text-sm text-slate-300 font-light mt-4 leading-relaxed italic">
                "{item.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
