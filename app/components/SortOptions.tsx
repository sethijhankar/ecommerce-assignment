"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Product } from "../types/product";

interface SortOptionsProps {
  products: Product[];
  setFiltered: (products: Product[]) => void;
}

export default function SortOptions({
  products,
  setFiltered,
}: SortOptionsProps) {
  const [selectedSort, setSelectedSort] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: "price-asc", label: "Price: Low to High", icon: "📈" },
    { value: "price-desc", label: "Price: High to Low", icon: "📉" },
    { value: "name", label: "Name A-Z", icon: "🔤" },
    { value: "rating", label: "Highest Rated", icon: "⭐" },
    { value: "newest", label: "Newest First", icon: "🆕" },
  ];

  const handleSort = (value: string) => {
    setSelectedSort(value);
    setIsOpen(false);

    let sorted = [...products];

    switch (value) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "rating":
        sorted.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
        break;
      case "newest":
        sorted.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    setFiltered(sorted);
  };

  const selectedOption = sortOptions.find(
    (option) => option.value === selectedSort,
  );

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-xl px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]"
      >
        <div className="flex items-center space-x-2 flex-1">
          <span className="text-lg">{selectedOption?.icon || "🔄"}</span>
          <span className="font-medium text-gray-700">
            {selectedOption?.label || "Sort by"}
          </span>
        </div>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={
          isOpen
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: -10, scale: 0.95 }
        }
        transition={{ duration: 0.2 }}
        className={`absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-lg border border-gray-200/50 rounded-xl shadow-2xl z-50 overflow-hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {sortOptions.map((option, index) => (
          <motion.button
            key={option.value}
            initial={{ opacity: 0, x: -20 }}
            animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => handleSort(option.value)}
            className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 ${
              selectedSort === option.value
                ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 font-medium"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            <span className="text-lg">{option.icon}</span>
            <span className="flex-1">{option.label}</span>
            {selectedSort === option.value && (
              <motion.svg
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-4 h-4 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </motion.svg>
            )}
          </motion.button>
        ))}

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ delay: sortOptions.length * 0.05 }}
          onClick={() => {
            setSelectedSort("");
            setIsOpen(false);
            setFiltered([...products]);
          }}
          className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 border-t border-gray-100"
        >
          <span className="text-lg">🔄</span>
          <span className="flex-1">Reset Sorting</span>
        </motion.button>
      </motion.div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40"
        />
      )}
    </div>
  );
}
