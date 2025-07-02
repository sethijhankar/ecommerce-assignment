"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "../types/product";

interface FilterSidebarProps {
  products: Product[];
  setFiltered: (products: Product[]) => void;
}

export default function DrawerFilterSidebar({
  products,
  setFiltered,
}: FilterSidebarProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [minRating, setMinRating] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const categories = [...new Set(products.map((p) => p.category))];

  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map((p) => p.price);
      const minPrice = Math.floor(Math.min(...prices));
      const maxPrice = Math.ceil(Math.max(...prices));
      setPriceRange({ min: minPrice, max: maxPrice });
    }
  }, [products]);

  useEffect(() => {
    let filtered = [...products];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category),
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max,
    );

    if (minRating > 0) {
      filtered = filtered.filter(
        (product) => product.rating?.rate >= minRating,
      );
    }

    setFiltered(filtered);
  }, [selectedCategories, priceRange, minRating, products, setFiltered]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: 1000 });
    setMinRating(0);
  };

  const FilterContent = () => (
    <motion.aside
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full lg:w-72 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 p-6 h-fit sticky top-24"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Filters
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={clearAllFilters}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Clear All
        </motion.button>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
          Categories
        </h4>
        <div className="space-y-3">
          {categories.map((category, index) => (
            <motion.label
              key={category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 border-2 rounded-md transition-all duration-200 ${
                    selectedCategories.includes(category)
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 border-blue-500"
                      : "border-gray-300 group-hover:border-blue-400"
                  }`}
                >
                  {selectedCategories.includes(category) && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 text-white absolute top-0.5 left-0.5"
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
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700 capitalize group-hover:text-blue-600 transition-colors">
                {category}
              </span>
            </motion.label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
          Price Range
        </h4>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">Min</label>
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange((prev) => ({
                    ...prev,
                    min: Number(e.target.value),
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                min="0"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">Max</label>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange((prev) => ({
                    ...prev,
                    max: Number(e.target.value),
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                min="0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
          Minimum Rating
        </h4>
        <div className="space-y-3">
          {[4, 3, 2, 1].map((rating) => (
            <label
              key={rating}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <input
                type="radio"
                name="rating"
                checked={minRating === rating}
                onChange={() => setMinRating(rating)}
              />
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ⭐
                  </span>
                ))}
                <span className="text-sm text-gray-600 ml-2">& up</span>
              </div>
            </label>
          ))}
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="rating"
              checked={minRating === 0}
              onChange={() => setMinRating(0)}
            />
            <span className="text-sm text-gray-600">All Ratings</span>
          </label>
        </div>
      </div>
    </motion.aside>
  );

  return (
    <>
      {/* Mobile button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl shadow-lg font-semibold"
        >
          Open Filters
        </button>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <FilterContent />
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-white z-50 shadow-xl p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Filters</h3>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-gray-500 hover:text-red-600"
                >
                  ✕
                </button>
              </div>
              <FilterContent />
            </motion.div>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
