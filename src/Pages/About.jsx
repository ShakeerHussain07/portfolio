import React, { useEffect, memo, useMemo } from "react";
import {
  FileText,
  Code,
  Award,
  Globe,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

/* =======================
   HEADER
======================= */
const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <h2
      className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
      data-aos="zoom-in-up"
    >
      About Me
    </h2>
    <p
      className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
    >
      <Sparkles className="w-5 h-5 text-purple-400" />
      Passionate BTech student & aspiring software developer
      <Sparkles className="w-5 h-5 text-purple-400" />
    </p>
  </div>
));

/* =======================
   PROFILE IMAGE
======================= */
const ProfileImage = memo(() => (
  <div className="flex justify-end items-center sm:p-12 p-0">
    <div className="relative group" data-aos="fade-up">
      <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(120,119,198,0.3)]">
        <img
          src="/Photo.jpg"
          alt="Shaik Shakeer Hussain"
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          loading="lazy"
        />
      </div>
    </div>
  </div>
));

/* =======================
   STAT CARD
======================= */
const StatCard = memo(
  ({ icon: Icon, color, value, label, description }) => (
    <div className="relative group">
      <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:scale-105 transition-all duration-300 h-full">
        <div
          className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20`}
        ></div>

        <div className="flex items-center justify-between mb-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <span className="text-4xl font-bold text-white">{value}</span>
        </div>

        <p className="text-sm uppercase tracking-wider text-gray-300 mb-2">
          {label}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">{description}</p>
          <ArrowUpRight className="w-4 h-4 text-white/50" />
        </div>
      </div>
    </div>
  )
);

/* =======================
   MAIN ABOUT PAGE
======================= */
const AboutPage = () => {
  const { totalProjects, totalCertificates } = useMemo(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const storedCertificates = JSON.parse(
      localStorage.getItem("certificates") || "[]"
    );

    return {
      totalProjects: storedProjects.length,
      totalCertificates: storedCertificates.length,
    };
  }, []);

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const statsData = [
    {
      icon: Code,
      color: "from-[#6366f1] to-[#a855f7]",
      value: totalProjects,
      label: "Projects",
      description: "Academic & personal projects",
    },
    {
      icon: Award,
      color: "from-[#a855f7] to-[#6366f1]",
      value: totalCertificates,
      label: "Certificates",
      description: "Courses & skill certifications",
    },
    {
      icon: Globe,
      color: "from-[#6366f1] to-[#a855f7]",
      value: "BTech",
      label: "Student",
      description: "Computer Science background",
    },
  ];

  /* =======================
     BUTTON HANDLERS
  ======================= */
  const handleResumeDownload = () => {
    window.open(
      `${import.meta.env.BASE_URL}resume/SHAKEER%20HUSSAIN%20SHAIK.pdf`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleViewProjects = () => {
    const section = document.getElementById("Portofolio");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="pb-[10%] text-white overflow-hidden px-[5%] lg:px-[10%] mt-10"
      id="About"
    >
      <Header />

      <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 items-center mt-12">
        {/* LEFT */}
        <div className="space-y-6 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
              Hello, I’m
            </span>
            <span className="block mt-2 text-gray-200">
              Shaik Shakeer Hussain
            </span>
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed">
            I am a BTech student with a strong interest in software development,
            data structures, and backend technologies. I enjoy building real-world
            applications using Java, Python, and modern web frameworks.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              type="button"
              onClick={handleResumeDownload}
              className="relative z-50 px-6 py-3 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium hover:scale-105 transition"
            >
              <FileText className="inline w-5 h-5 mr-2" />
              Download Resume
            </button>

            <button
              type="button"
              onClick={handleViewProjects}
              className="relative z-50 px-6 py-3 rounded-lg border border-[#a855f7]/50 text-[#a855f7] hover:bg-[#a855f7]/10 transition"
            >
              <Code className="inline w-5 h-5 mr-2" />
              View Projects
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <ProfileImage />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {statsData.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default memo(AboutPage);
