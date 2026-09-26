import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 xl:px-40 py-16">
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand Column */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">
                Boda<span className="text-orange-400">Store</span>
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Premium posters and prints for motivation, cars, sports players,
                and anime. Elevate your space with art that speaks to you.
              </p>
              <div className="flex items-center gap-4 pt-2">
                {/* Instagram */}
                <a
                  href="#"
                  aria-label="Instagram"
                  className="text-zinc-400 hover:text-orange-400 transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                {/* Twitter / X */}
                <a
                  href="#"
                  aria-label="Twitter"
                  className="text-zinc-400 hover:text-orange-400 transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
                {/* TikTok */}
                <a
                  href="#"
                  aria-label="TikTok"
                  className="text-zinc-400 hover:text-orange-400 transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold tracking-wide">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="text-zinc-400 text-sm hover:text-orange-400 transition-colors duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="text-zinc-400 text-sm hover:text-orange-400 transition-colors duration-200"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 text-sm hover:text-orange-400 transition-colors duration-200"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 text-sm hover:text-orange-400 transition-colors duration-200"
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 text-sm hover:text-orange-400 transition-colors duration-200"
                  >
                    Shipping Info
                  </a>
                </li>
              </ul>
            </div>

            {/* Categories Column */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold tracking-wide">
                Categories
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/products"
                    className="text-zinc-400 text-sm hover:text-orange-400 transition-colors duration-200"
                  >
                    Motivation
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="text-zinc-400 text-sm hover:text-orange-400 transition-colors duration-200"
                  >
                    Cars
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="text-zinc-400 text-sm hover:text-orange-400 transition-colors duration-200"
                  >
                    Players
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="text-zinc-400 text-sm hover:text-orange-400 transition-colors duration-200"
                  >
                    Anime
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="text-zinc-400 text-sm hover:text-orange-400 transition-colors duration-200"
                  >
                    Gaming
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold tracking-wide">
                Contact Us
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                  <a
                    href="mailto:info@bodastore.com"
                    className="text-zinc-400 text-sm hover:text-orange-400 transition-colors duration-200"
                  >
                    info@bodastore.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                  <a
                    href="tel:+201234567890"
                    className="text-zinc-400 text-sm hover:text-orange-400 transition-colors duration-200"
                  >
                    +20 10 69647553
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                  <span className="text-zinc-400 text-sm">
                    Cairo, Egypt
                    <br />
                    123 Main Street
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-400 text-sm">
            &copy; {new Date().getFullYear()} BodaStore. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-zinc-400 text-sm hover:text-orange-400 transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-zinc-400 text-sm hover:text-orange-400 transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;