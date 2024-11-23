"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const navLinks = [
    { id: 1, href: "#header", text: "Home" },
    { id: 2, href: "#blogs", text: "Blog" },
    { id: 3, href: "#subscribe", text: "Subscribe" },
    { id: 4, href: "#footer", text: "Contact" },
  ];

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setNavOpen(false); // Close the mobile menu after clicking a link
  };

  return (
    <header className="bg-gray-900 text-white py-4 shadow-md fixed w-full z-50">
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          className=" motion-animate text-3xl font-bold"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link href="/" legacyBehavior>
            <a className="hover:text-blue-400 transition-colors duration-300">
              TECH.
            </a>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          className="hidden md:flex space-x-8 text-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {navLinks.map((link) => (
            <Link key={link.id} href={link.href} legacyBehavior>
              <a
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default navigation behavior
                  handleScroll(link.href.slice(1)); // Scroll to the section
                }}
                className="hover:text-blue-400 transition-colors duration-300"
              >
                {link.text}
              </a>
            </Link>
          ))}
        </motion.nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleNav} aria-label="Toggle navigation">
            {navOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.nav
          className={`fixed top-0 left-0 scroll-smooth w-full h-full bg-gray-900 flex flex-col items-center justify-center transform ${
            navOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out z-40 md:hidden`}
        >
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.id}
              onClick={(e) => {
                e.preventDefault(); // Prevent the default navigation behavior

                handleScroll(link.href.slice(1)); // Handle scroll for mobile links
                setNavOpen(false); // Close the menu after clicking a link
              }}
              className="text-2xl mb-6 hover:text-blue-400 transition-colors duration-300"
            >
              {link.text}
            </Link>
          ))}
        </motion.nav>
      </div>
    </header>
  );
};

export default Navbar;
