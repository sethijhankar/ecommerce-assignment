"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "./components/ProductCard";
import FilterSidebar from "./components/FilterSidebar";
import SortOptions from "./components/SortOptions";
import { Product } from "./types/product";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-cyan-100/30 to-cyan-200/30">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 text-white py-20 mb-8"
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10  mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent"
          >
            Discover Amazing Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-cyan-100 mb-8 max-w-3xl mx-auto"
          >
            Explore our curated collection of premium products at unbeatable
            prices
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <span className="text-yellow-300">⭐</span>
              <span className="text-white font-semibold">4.8+ Rating</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <span className="text-green-300">📦</span>
              <span className="text-white font-semibold">Free Shipping</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <span className="text-cyan-300">🔒</span>
              <span className="text-white font-semibold">Secure Payment</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <div className=" mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar products={products} setFiltered={setFiltered} />

          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Explore Products
                </h2>
                <p className="text-gray-600">
                  {loading
                    ? "Loading products..."
                    : `Showing ${filtered.length} of ${products.length} products`}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <SortOptions products={filtered} setFiltered={setFiltered} />
              </div>
            </motion.div>

            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg p-6 animate-pulse"
                  >
                    <div className="h-48 bg-gray-200 rounded-xl mb-4" />
                    <div className="h-4 bg-gray-200 rounded mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                    <div className="h-6 bg-gray-200 rounded w-1/3" />
                  </motion.div>
                ))}
              </div>
            )}

            {!loading && (
              <>
                {filtered.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
                  >
                    {filtered.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: index * 0.1,
                          duration: 0.5,
                          ease: "easeOut",
                        }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                  >
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      No products found
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Try adjusting your filters to see more results
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.location.reload()}
                      className="bg-gradient-to-r from-cyan-500 to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Reset Filters
                    </motion.button>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-cyan-900 to-cyan-800 text-white py-16 mt-16"
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl text-cyan-100 mb-8">
            Join thousands of happy customers and discover your next favorite
            product
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyan-500 to-cyan-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Browse All Products
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Learn More
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
