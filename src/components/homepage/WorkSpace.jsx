import React from "react";

export const WorkspaceTiers = () => {
  const tiers = [
    {
      icon: "🤫",
      name: "Silent Nook",
      tagline: "Zero noise. Maximum focus.",
      bestFor: "Exam prep, deep coding sessions, and intensive research.",
      perks: [
        "Noise-canceling acoustic walls",
        "Individual reading lamps",
        "Dedicated power outlets",
      ],
    },
    {
      icon: "🗣️",
      name: "Collab Pod",
      tagline: "Brainstorm without boundaries.",
      bestFor: "Group projects, presentation practice, and team sprints.",
      perks: [
        "4K whiteboard screens",
        "Modular seating layouts",
        "Dual-connectivity arrays",
      ],
    },
    {
      icon: "☕",
      name: "Lounge Hub",
      tagline: "Casual productivity.",
      bestFor: "Light reading, networking, and networking breaks.",
      perks: [
        "Premium espresso bar access",
        "Ergonomic sofa desks",
        "Ambient lo-fi audio tracks",
      ],
    },
  ];

  return (
    <section className="bg-slate-50 py-24 px-6 border-t border-slate-200/60">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Spaces Built For You
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Choose Your Productivity Pace
          </h2>
          <p className="text-slate-500 mt-4">
            Whether you need complete sensory deprivation for exam prep or
            dynamic setups for team collaboration, we have a room calibrated for
            your goals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200/80 rounded-2xl p-8 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-950/5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full transform translate-x-4 -translate-y-4 group-hover:bg-indigo-600/5 transition-colors duration-300"></div>
              <div>
                <span className="text-4xl">{tier.icon}</span>
                <h3 className="text-xl font-bold text-slate-900 mt-4 group-hover:text-indigo-600 transition-colors">
                  {tier.name}
                </h3>
                <p className="text-sm font-medium text-slate-400 mt-1">
                  {tier.tagline}
                </p>
                <hr className="my-5 border-slate-150" />
                <p className="text-sm text-slate-600 leading-relaxed">
                  <strong className="text-slate-800 font-semibold block mb-1">
                    Best For:
                  </strong>
                  {tier.bestFor}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {tier.perks.map((perk, pIndex) => (
                    <li
                      key={pIndex}
                      className="text-xs text-slate-500 flex items-center gap-2"
                    >
                      <span className="text-indigo-500 font-bold">✓</span>{" "}
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <button className="w-full bg-slate-900 text-white group-hover:bg-indigo-600 text-sm font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-md shadow-slate-900/10 group-hover:shadow-indigo-600/20 active:scale-[0.98]">
                  View Available Rooms
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
