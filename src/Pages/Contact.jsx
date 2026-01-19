import React, { useEffect } from "react";
import { Instagram, Github, Linkedin } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactPage = () => {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <div
      id="Contact"
      className="px-[5%] md:px-[10%] py-20 bg-[#030014] text-white"
    >
      {/* Heading */}
      <div className="text-center mb-10" data-aos="fade-down">
        <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          Contact Me
        </h2>
        <p className="text-slate-400 mt-3 text-sm md:text-base">
          Any questions? Feel free to reach out through my social profiles.
        </p>
      </div>

      {/* Social Links */}
      <div
        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        data-aos="fade-up"
      >
        {/* Instagram */}
        <a
          href="https://www.instagram.com/shakeer._shaik"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-pink-500/20 transition"
        >
          <Instagram className="w-6 h-6 text-pink-400" />
          <span className="text-sm font-medium">Instagram</span>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/ShakeerHussain07"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-gray-500/20 transition"
        >
          <Github className="w-6 h-6 text-gray-300" />
          <span className="text-sm font-medium">GitHub</span>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/shakeer-hussain-8ab1352b2"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-500/20 transition"
        >
          <Linkedin className="w-6 h-6 text-blue-400" />
          <span className="text-sm font-medium">LinkedIn</span>
        </a>
      </div>
    </div>
  );
};

export default ContactPage;
