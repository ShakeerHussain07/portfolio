import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("Home");

    const navItems = [
        { href: "#Home", label: "Home" },
        { href: "#About", label: "About" },
        { href: "#Portofolio", label: "Portofolio" },
        { href: "#Contact", label: "Contact" },
        {
            href: "/resume/SHAKEER%20HUSSAIN%20SHAIK.pdf",
            label: "Resume",
            external: true
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            const sections = navItems
                .filter(item => !item.external)
                .map(item => {
                    const section = document.querySelector(item.href);
                    if (section) {
                        return {
                            id: item.href.replace("#", ""),
                            offset: section.offsetTop - 550,
                            height: section.offsetHeight
                        };
                    }
                    return null;
                })
                .filter(Boolean);

            const currentPosition = window.scrollY;
            const active = sections.find(
                section =>
                    currentPosition >= section.offset &&
                    currentPosition < section.offset + section.height
            );

            if (active) {
                setActiveSection(active.id);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset";
    }, [isOpen]);

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const section = document.querySelector(href);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 100,
                behavior: "smooth"
            });
        }
        setIsOpen(false);
    };

    return (
        <nav
            className={`fixed w-full top-0 z-50 transition-all duration-500 ${
                isOpen
                    ? "bg-[#030014]"
                    : scrolled
                    ? "bg-[#030014]/50 backdrop-blur-xl"
                    : "bg-transparent"
            }`}
        >
            <div className="mx-auto px-4 sm:px-6 lg:px-[10%]">
                <div className="flex items-center justify-between h-16">
                    <a
                        href="#Home"
                        onClick={(e) => scrollToSection(e, "#Home")}
                        className="text-xl font-bold bg-gradient-to-r from-[#a855f7] to-[#6366f1] bg-clip-text text-transparent"
                    >
                        SHAIK SHAKEER HUSSAIN
                    </a>

                    <div className="hidden md:flex space-x-8">
                        {navItems.map(item =>
                            item.external ? (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-[#e2d3fd] hover:text-white transition-colors"
                                >
                                    {item.label}
                                </a>
                            ) : (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => scrollToSection(e, item.href)}
                                    className={`text-sm font-medium transition-colors ${
                                        activeSection === item.href.substring(1)
                                            ? "text-white"
                                            : "text-[#e2d3fd] hover:text-white"
                                    }`}
                                >
                                    {item.label}
                                </a>
                            )
                        )}
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-[#e2d3fd]"
                        >
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={`md:hidden fixed inset-0 bg-[#030014] transition-all duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                style={{ top: "64px" }}
            >
                <div className="flex flex-col p-6 space-y-4">
                    {navItems.map(item =>
                        item.external ? (
                            <a
                                key={item.label}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg text-[#e2d3fd] hover:text-white"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </a>
                        ) : (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => scrollToSection(e, item.href)}
                                className="text-lg text-[#e2d3fd] hover:text-white"
                            >
                                {item.label}
                            </a>
                        )
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
