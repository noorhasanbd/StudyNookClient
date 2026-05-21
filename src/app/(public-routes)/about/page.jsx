import React from 'react';

const AboutPage = () => {
    return (
        <div className="bg-slate-50 min-h-screen text-slate-800 selection:bg-indigo-500 selection:text-white">
            
            {/* Hero Section */}
            <header className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 py-24 px-6 text-center text-white overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <span className="text-indigo-400 text-sm font-semibold tracking-wider uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                        Our Story
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mt-4 mb-6 bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent">
                        Redefining How the World Studies
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
                        Welcome to <span className="text-indigo-400 font-semibold">StudyNook</span>. We bridge the gap between isolation and collaboration, offering a sanctuary for students, creators, and remote professionals to find their perfect focus.
                    </p>
                </div>
            </header>

            {/* Core Statistics Section */}
            <section className="max-w-6xl mx-auto -mt-12 px-6 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 text-center">
                    <div>
                        <p className="text-3xl md:text-4xl font-extrabold text-indigo-600">50+</p>
                        <p className="text-xs md:text-sm font-medium text-slate-500 uppercase tracking-wider mt-1">Study Hubs</p>
                    </div>
                    <div className="border-l border-slate-100">
                        <p className="text-3xl md:text-4xl font-extrabold text-indigo-600">10k+</p>
                        <p className="text-xs md:text-sm font-medium text-slate-500 uppercase tracking-wider mt-1">Active Minds</p>
                    </div>
                    <div className="border-l border-slate-100">
                        <p className="text-3xl md:text-4xl font-extrabold text-indigo-600">99.8%</p>
                        <p className="text-xs md:text-sm font-medium text-slate-500 uppercase tracking-wider mt-1">Booking Success</p>
                    </div>
                    <div className="border-l border-slate-100">
                        <p className="text-3xl md:text-4xl font-extrabold text-indigo-600">24/7</p>
                        <p className="text-xs md:text-sm font-medium text-slate-500 uppercase tracking-wider mt-1">Cloud Access</p>
                    </div>
                </div>
            </section>

            {/* Main Mission Content */}
            <section className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Designed to Eliminate Distractions, Crafted for Deep Work.
                    </h2>
                    <p className="text-slate-600 leading-relaxed">
                        Finding a productive space shouldn't be a secondary challenge to your workload. Whether you're a student cramming for finals, a developer building the next major SaaS API, or a remote team designing creative interfaces, we provide high-fidelity environments optimized for cognitive flow.
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                        Built completely on top of a cutting-edge technical stack featuring modern cloud routing, real-time database verification, and seamless authentication parameters—StudyNook handles the logistics so you can focus entirely on your milestones.
                    </p>
                </div>
                
                {/* Visual Representation Graphic Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-indigo-600 text-white p-8 rounded-2xl flex flex-col justify-between aspect-square transform hover:scale-[1.02] transition duration-300 shadow-lg shadow-indigo-600/20">
                        <div className="text-3xl">🎯</div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Tailored Environments</h3>
                            <p className="text-xs text-indigo-100">Silent zones, group pods, or dynamic workspaces built for your pace.</p>
                        </div>
                    </div>
                    <div className="bg-slate-900 text-white p-8 rounded-2xl flex flex-col justify-between aspect-square mt-8 transform hover:scale-[1.02] transition duration-300 shadow-lg shadow-slate-900/20">
                        <div className="text-3xl">⚡</div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Instant Reservation</h3>
                            <p className="text-xs text-slate-300">No waiting lines. Secure your spot in real-time right through your live portal.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values / Features Section */}
            <section className="bg-slate-100 border-t border-b border-slate-200/60 py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-slate-900">Why the Community Chooses StudyNook</h2>
                        <p className="text-slate-500 mt-3">We balance clean infrastructure with rich utility features built from the ground up.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-8 rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md transition">
                            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 text-xl font-bold mb-6">
                                🔐
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Secure Verification</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Integrated with industry-grade authentication protocols to ensure your data pipelines, user profiles, and logs remain uniquely protected.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-8 rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md transition">
                            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 text-xl font-bold mb-6">
                                🌐
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Always Connected</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Backed by globally distributed high-speed cloud clusters ensuring instant database handshakes and sub-millisecond API response runtimes.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-8 rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md transition">
                            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 text-xl font-bold mb-6">
                                👥
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Collaborative Ecosystem</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Connect effortlessly with thousands of peer developers, student researchers, and digital creators trying to solve the exact same puzzles.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Footer CTA */}
            <section className="max-w-5xl mx-auto py-24 px-6 text-center">
                <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 text-white rounded-3xl p-12 shadow-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready to Secure Your Next Focus Window?</h2>
                        <p className="text-indigo-200 text-sm md:text-base font-light">
                            Explore our live catalog of dynamic study rooms, choose your layout preference, and get your next major breakthrough rolling today.
                        </p>
                        <div className="pt-4">
                            <button className="bg-white text-indigo-950 hover:bg-slate-100 font-semibold px-8 py-3 rounded-xl transition shadow-lg shadow-black/10 active:scale-[0.98]">
                                Explore Rooms Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutPage;