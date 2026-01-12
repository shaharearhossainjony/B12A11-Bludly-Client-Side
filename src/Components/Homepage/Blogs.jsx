
import React from "react";
import { 
  BookOpen, Droplets, UserCheck, HeartPulse, ShieldAlert,
  Users, Droplet, Heart, ShieldCheck, 
 
} from "lucide-react";

const blogsData = [
  {
    id: 1,
    title: "Importance of Blood Donation",
    description: "Blood donation saves lives! Learn why it is crucial to donate regularly and how it helps patients.",
    icon: <Droplets size={64} className="text-red-600" />,
    emoji: "🩸",
    tag: "Life Style",
    bgColor: "bg-red-50 dark:bg-red-900/10"
  },
  {
    id: 2,
    title: "Who Can Donate Blood?",
    description: "Not everyone can donate. Learn the eligibility criteria and guidelines for safe blood donation.",
    icon: <UserCheck size={64} className="text-blue-600" />,
    emoji: "🙋‍♂️",
    tag: "Health",
    bgColor: "bg-blue-50 dark:bg-blue-900/10"
  },
  {
    id: 3,
    title: "Benefits of Donating Blood",
    description: "Donating blood is not only life-saving but also has health benefits for donors. Find out more.",
    icon: <HeartPulse size={64} className="text-emerald-600" />,
    emoji: "💖",
    tag: "Awareness",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/10"
  },
  {
    id: 4,
    title: "Blood Donation Myths Debunked",
    description: "Let's separate fact from fiction and encourage more donors by debunking common myths.",
    icon: <ShieldAlert size={64} className="text-amber-600" />,
    emoji: "🔬",
    tag: "Fact Check",
    bgColor: "bg-amber-50 dark:bg-amber-900/10"
  }
];

const Blogs = () => {
  return (
    <div className="bg-base-100 font-body transition-colors duration-500 overflow-hidden">
      
     


      {/* --- BLOGS SECTION --- */}
      <section className="py-24 px-4 bg-base-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-600 px-4 py-1 rounded-full mb-4">
              <BookOpen size={16} />
              <span className="text-xs font-black uppercase tracking-widest text-red-600 dark:text-red-400">Resources</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-base-content tracking-tighter uppercase">
              Latest <span className="text-red-600">Articles</span> & News
            </h2>
            <div className="w-20 h-1.5 bg-red-600 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {blogsData.map((blog) => (
              <div
                key={blog.id}
                className="group bg-base-100 dark:bg-zinc-900 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-base-200 dark:border-white/5 overflow-hidden flex flex-col cursor-pointer"
              >
                <div className={`relative overflow-hidden h-52 flex items-center justify-center ${blog.bgColor} transition-colors duration-500`}>
                  <div className="relative z-10 transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 text-6xl">
                    {blog.emoji}
                  </div>
                  <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    {blog.icon}
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider shadow-lg">
                      {blog.tag}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow text-center lg:text-left">
                  <h3 className="text-xl font-bold text-base-content mb-3 group-hover:text-red-600 transition-colors line-clamp-2 uppercase tracking-tighter">
                    {blog.title}
                  </h3>
                  <p className="text-base-content/60 text-sm line-clamp-3 leading-relaxed">
                    {blog.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-20 bg-red-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { label: "Happy Donors", value: "12K+", icon: <Users /> },
              { label: "Blood Bags", value: "8.5K", icon: <Droplet /> },
              { label: "Lives Saved", value: "25K+", icon: <Heart /> },
              { label: "Verified Centers", value: "150+", icon: <ShieldCheck /> },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-center opacity-50 mb-2">{stat.icon}</div>
                <h3 className="text-4xl md:text-5xl font-black tracking-tighter">{stat.value}</h3>
                <p className="text-xs uppercase font-bold tracking-widest opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
};

export default Blogs;




