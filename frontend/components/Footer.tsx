"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaTwitter, FaYoutube, FaDiscord, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();
  
  const [clickedLinkId, setClickedLinkId] = useState(null);

  const socialLinks = [
    { id: 1, href: "https://twitter.com", icon: <FaTwitter />, label: "Twitter" },
    { id: 2, href: "https://youtube.com", icon: <FaYoutube />, label: "YouTube" },
    { id: 3, href: "https://discord.com", icon: <FaDiscord />, label: "Discord" },
    { id: 4, href: "https://linkedin.com", icon: <FaLinkedin />, label: "LinkedIn" },
    { id: 5, href: "https://github.com", icon: <FaGithub />, label: "GitHub" },
  ];

  return (
    <footer id="footer" className="bg-gray-900 text-white py-10 mt-20">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-8 md:space-y-0">
          
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-2xl font-bold mb-2 hover:text-blue-400 transition-colors duration-300 text-shadow-white">Stay Connected</h2>
            <p className="text-sm text-gray-400">Follow us on social media for the latest updates.</p>
          </motion.div>

          {/* Social Icons */}
          <motion.div
              className="flex space-x-7"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 transition-colors duration-300 text-xl 
                    ${link.label === "Twitter" ? "hover:text-blue-400" : ""}
                    ${link.label === "YouTube" ? "hover:text-red-500" : ""}
                    ${link.label === "Discord" ? "hover:text-purple-600" : ""}
                    ${link.label === "LinkedIn" ? "hover:text-blue-700" : ""}
                    ${link.label === "GitHub" ? "hover:text-gray-500" : ""}
                  `}
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </motion.div>

        </div>

        {/* Middle Section - Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-shadow-white">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-blue-400 transition-colors duration-300">Home</Link></li>
              <li><Link href="/about" className="hover:text-blue-400 transition-colors duration-300">About</Link></li>
              <li><Link href="/blog" className="hover:text-blue-400 transition-colors duration-300">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors duration-300">Contact</Link></li>
            </ul>
          </motion.div>

          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <h3 className="text-lg font-semibold mb-4 hover:text-white-900 transition-colors duration-300 text-shadow-white">Quick Links</h3>
            <ul className="space-y-2 text-sm ">
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors duration-300">Contact Us</Link></li>
              <li><Link href="/coming " className="hover:text-blue-400 transition-colors duration-300">Coming soon</Link></li>
              <li><Link href="/FAQ" className="hover:text-blue-400 transition-colors duration-300">FAQ</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-400 transition-colors duration-300">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-400 transition-colors duration-300">Terms of Service</Link></li>
            </ul>
          </motion.div>
          </div>

          <div>
          <motion.div
                className="text-center md:text-left "
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
              >
                <h3 className="text-lg font-semibold mb-4 text-white text-shadow-white">Subscribe</h3>
                <p className="text-sm text-gray-400 mb-4">Get the latest updates right in your inbox.</p>
                <form className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gray-800 text-gray-300 placeholder-gray-500 px-4 py-2 rounded-lg focus:outline-none w-full text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 hover:text-white hover:shadow-md hover:shadow-blue-500 transition duration-300 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Subscribe
                  </button>
                </form>
          </motion.div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <motion.div
              className="flex justify-center items-center text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.3 }}
            >
              <p className="text-sm text-gray-400 mt-12">&copy; {year} Your Blog. All rights reserved.</p>
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;
