"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-cyan-200/50 shadow-lg"
    >
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-700 bg-clip-text text-transparent">
                ZenStore
              </h1>
            </motion.div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="relative text-gray-700 hover:text-cyan-600 font-medium transition-colors duration-200 cursor-pointer group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-cyan-700 group-hover:w-full transition-all duration-300"></span>
              </motion.span>
            </Link>
            <Link href="/cart">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="relative text-gray-700 hover:text-cyan-600 font-medium transition-colors duration-200 cursor-pointer group flex items-center space-x-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h10"
                  />
                </svg>
                <span>Cart</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-cyan-700 group-hover:w-full transition-all duration-300"></span>
              </motion.span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-cyan-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={
            isMenuOpen
              ? { height: "auto", opacity: 1 }
              : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <motion.div
                whileHover={{ x: 5 }}
                className="block px-4 py-2 text-gray-700 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-all duration-200"
              >
                Home
              </motion.div>
            </Link>
            <Link href="/cart" onClick={() => setIsMenuOpen(false)}>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-all duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h10"
                  />
                </svg>
                <span>Cart</span>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
