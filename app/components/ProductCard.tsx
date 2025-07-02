"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Product } from "../types/product";

export default function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-[450px] flex flex-col font-[monotype-corsiva]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />

      <div className="relative p-6 pb-4 flex-1 flex flex-col font-[monotype-corsiva]">
        <div className="relative h-48 mb-4 overflow-hidden rounded-xl bg-gray-50">
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            whileHover={{ scale: 1.05 }}
          />

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg"
          >
            ⭐ {product.rating?.rate}
          </motion.div>
        </div>

        <div className="space-y-3 relative z-10 flex-1 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-200 font-[monotype-corsiva]">
            {product.title}
          </h2>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-col space-y-1">
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-[monotype-corsiva]">
                ${product.price}
              </span>
              <span className="text-sm text-gray-500 capitalize font-[monotype-corsiva]">
                {product.category}
              </span>
            </div>

            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 * i }}
                  className={`text-sm ${
                    i < Math.floor(product.rating?.rate || 0)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  ⭐
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 relative z-10">
        <Link href={`/product/${product.id}`}>
          <motion.button
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.02 }}
            className="w-full relative overflow-hidden bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group/button"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/button:translate-x-full transition-transform duration-700" />

            <span className="relative z-10 flex items-center justify-center space-x-2 font-[monotype-corsiva]">
              <span>View Details</span>
              <motion.svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={isHovered ? { x: 5 } : { x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </motion.svg>
            </span>
          </motion.button>
        </Link>
      </div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}
