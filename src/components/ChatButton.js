import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatSystem from "./ChatSystem";

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <i className="fas fa-comments text-2xl"></i>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <ChatSystem isOpen={isOpen} onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatButton;
