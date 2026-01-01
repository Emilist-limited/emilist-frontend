"use client";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { categories, faqs } from "@/lib/constants/faq";
import { ChevronDown, Search } from "lucide-react";

const FaqWrapper = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFaqs = faqs?.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };
  return (
    <div className="py-8">
      <div className="padding-ctn">
        {" "}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12"
        >
          <div className="text-center max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl font-bold text-slate-900 mb-6"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-slate-600 mb-8"
            >
              Everything you need to know about connecting with skilled artisans
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative"
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-2 border-slate-200 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all text-slate-900 placeholder:text-slate-400"
              />
            </motion.div>
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8"
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {categories?.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-[#3ad87e] to-[#9ef769] text-white shadow-lg"
                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.section>
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => {
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-5 flex items-start justify-between text-left hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">
                        {faq.question}
                      </h3>
                      <span className="text-xs font-medium text-primary-green bg-green-50 px-2.5 py-1 rounded-full">
                        {faq.category}
                      </span>
                    </div>

                    <motion.div
                      animate={{ rotate: openId === faq.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-4 flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pl-20">
                          <p className="text-slate-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
          {filteredFaqs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                <Search className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                No results found
              </h3>
              <p className="text-slate-600">
                Try adjusting your search or filter
              </p>
            </motion.div>
          )}
        </section>
      </div>
    </div>
  );
};

export default FaqWrapper;
