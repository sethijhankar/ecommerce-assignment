"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (productId) {
      fetch(`https://fakestoreapi.com/products/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          setLoading(false);
        });
    }
  }, [productId]);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading product details...</p>
        </motion.div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Back to Home
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" mx-auto px-4 sm:px-6 lg:px-8 py-6"
      >
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span>›</span>
          <span className="capitalize">{product.category}</span>
          <span>›</span>
          <span className="text-gray-800 font-medium truncate max-w-xs">
            {product.title}
          </span>
        </nav>
      </motion.div>

      <div className=" mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Main Image */}
            <div className="bg-white rounded-2xl shadow-xl p-8 aspect-square">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={productImages[selectedImage]}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Image Thumbnails */}
            <div className="flex space-x-4 overflow-x-auto">
              {productImages.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index
                      ? "border-blue-500 shadow-lg"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-contain p-2 bg-white"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Product Title & Category */}
            <div>
              <span className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4 capitalize">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight mb-4">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < Math.floor(product.rating.rate)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ⭐
                    </span>
                  ))}
                  <span className="text-gray-600 ml-2">
                    {product.rating.rate}/5
                  </span>
                </div>
                <span className="text-gray-500">
                  ({product.rating.count} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-3xl font-bold text-green-600">
                    ${product.price}
                  </span>
                  <span className="text-gray-500 ml-2 line-through text-lg">
                    ${(product.price * 1.2).toFixed(2)}
                  </span>
                </div>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  17% OFF
                </span>
              </div>
              <p className="text-green-700 text-sm mt-2">
                💰 Save ${(product.price * 1.2 - product.price).toFixed(2)} with
                this deal!
              </p>
            </div>

            {/* Description */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                {/* Quantity Selector */}
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-3 bg-gray-100 rounded-xl p-1">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleQuantityChange(-1)}
                      className="w-10 h-10 bg-white rounded-lg shadow flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors font-bold"
                    >
                      −
                    </motion.button>
                    <span className="font-semibold text-gray-800 min-w-[3rem] text-center text-lg">
                      {quantity}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleQuantityChange(1)}
                      className="w-10 h-10 bg-white rounded-lg shadow flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors font-bold"
                    >
                      +
                    </motion.button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div className="flex-1 w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className={`w-full relative overflow-hidden py-4 px-8 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${
                      addedToCart
                        ? "bg-green-500 text-white"
                        : "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    }`}
                  >
                    <motion.span
                      animate={addedToCart ? { scale: [1, 1.2, 1] } : {}}
                      className="flex items-center justify-center space-x-2"
                    >
                      {addedToCart ? (
                        <>
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>Added to Cart!</span>
                        </>
                      ) : (
                        <>
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
                          <span>Add to Cart</span>
                        </>
                      )}
                    </motion.span>
                  </motion.button>
                </div>
              </div>

              {/* Total Price */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total:</span>
                  <span className="text-2xl font-bold text-gray-800">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-gray-200/50"
              >
                <div className="text-2xl mb-2">🚚</div>
                <div className="text-sm font-semibold text-gray-800">
                  Free Shipping
                </div>
                <div className="text-xs text-gray-600">On orders over $50</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-gray-200/50"
              >
                <div className="text-2xl mb-2">🔄</div>
                <div className="text-sm font-semibold text-gray-800">
                  Easy Returns
                </div>
                <div className="text-xs text-gray-600">30-day policy</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-gray-200/50"
              >
                <div className="text-2xl mb-2">🔒</div>
                <div className="text-sm font-semibold text-gray-800">
                  Secure Payment
                </div>
                <div className="text-xs text-gray-600">SSL encrypted</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
