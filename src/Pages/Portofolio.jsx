import React, { useEffect, useState, useCallback } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/system";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import Certificate from "../components/Certificate";
import AOS from "aos";
import "aos/dist/aos.css";
import { Code, Award, Boxes } from "lucide-react";

/* =====================
   TOGGLE BUTTON
===================== */
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="px-3 py-1.5 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 bg-white/5 hover:bg-white/10 rounded-md border border-white/10"
  >
    {isShowingMore ? "See Less" : "See More"}
  </button>
);

/* =====================
   TAB PANEL
===================== */
function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "MUI.svg", language: "Material UI" },
  { icon: "vercel.svg", language: "Vercel" },
];

export default function Portfolio() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  /* ✅ REQUIRED */
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const projectSnapshot = await getDocs(collection(db, "projects"));
      const certificateSnapshot = await getDocs(collection(db, "certificates"));

      const projectData = projectSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const certificateData = certificateSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProjects(projectData);
      setCertificates(certificateData);

      localStorage.setItem("projects", JSON.stringify(projectData));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
    } catch (error) {
      console.error("Firebase fetch error:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const displayedProjects = showAllProjects
    ? projects
    : projects.slice(0, initialItems);

  const displayedCertificates = showAllCertificates
    ? certificates
    : certificates.slice(0, initialItems);

  return (
    <div
      id="Portofolio"
      className="px-[5%] md:px-[10%] bg-[#030014] overflow-hidden"
    >
      {/* HEADER */}
      <div className="text-center pb-10">
        <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          Portfolio Showcase
        </h2>
        <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
          Projects, certifications, and technical expertise.
        </p>
      </div>

      {/* TABS */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: "transparent" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          sx={{
            minHeight: "70px",

            "& .MuiTab-root": {
              fontSize: { xs: "0.9rem", md: "1rem" },
              fontWeight: 600,
              color: "#c7c7ff",
              textTransform: "none",
              padding: "20px 0",
              borderRadius: "14px",
              transition: "all 0.3s ease",
              gap: "6px",

              "& svg": {
                color: "#c7c7ff",
              },

              "&:hover": {
                color: "#ffffff",
                background: "rgba(168, 85, 247, 0.15)",
                transform: "translateY(-2px)",
              },
            },

            "& .Mui-selected": {
              color: "#ffffff !important",
              background:
                "linear-gradient(135deg, rgba(168,85,247,0.35), rgba(99,102,241,0.35))",
              boxShadow: "0 0 25px rgba(168,85,247,0.35)",

              "& svg": {
                color: "#ffffff",
              },
            },

            "& .MuiTabs-indicator": {
              display: "none",
            },
          }}
        >
          <Tab icon={<Code />} label="Projects" />
          <Tab icon={<Award />} label="Certificates" />
          <Tab icon={<Boxes />} label="Tech Stack" />
        </Tabs>
      </AppBar>

      {/* CONTENT */}
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={setValue}
      >
        {/* PROJECTS */}
        <TabPanel value={value} index={0}>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {displayedProjects.map((project) => (
              <CardProject
                key={project.id}
                Img={project.Img}
                Title={project.Title}
                Description={project.Description}
                Link={project.Link}
                id={project.id}
              />
            ))}
          </div>

          {projects.length > initialItems && (
            <div className="mt-6">
              <ToggleButton
                onClick={() => setShowAllProjects(!showAllProjects)}
                isShowingMore={showAllProjects}
              />
            </div>
          )}
        </TabPanel>

        {/* CERTIFICATES */}
        <TabPanel value={value} index={1}>
          <div className="grid md:grid-cols-3 gap-5">
            {displayedCertificates.map((cert) => (
              <Certificate key={cert.id} ImgSertif={cert.Img} />
            ))}
          </div>

          {certificates.length > initialItems && (
            <div className="mt-6">
              <ToggleButton
                onClick={() => setShowAllCertificates(!showAllCertificates)}
                isShowingMore={showAllCertificates}
              />
            </div>
          )}
        </TabPanel>

        {/* TECH STACK */}
        <TabPanel value={value} index={2}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {techStacks.map((stack, index) => (
              <TechStackIcon
                key={index}
                TechStackIcon={stack.icon}
                Language={stack.language}
              />
            ))}
          </div>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
