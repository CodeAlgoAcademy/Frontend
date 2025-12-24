import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { FaApple, FaGooglePlay } from "react-icons/fa";

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppDownloadModal: React.FC<AppDownloadModalProps> = ({ isOpen, onClose }) => {
  const appStoreLinks = {
    apple: "https://apps.apple.com/us/app/codealgo/id6753643848",
    google: "https://play.google.com/store/apps/details?id=com.your.app"
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative w-full max-w-md rounded-2xl bg-gradient-to-b from-mainBlack to-gray-900 p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20"
              aria-label="Close modal"
            >
              <AiOutlineClose className="text-white" size={20} />
            </button>
            <div className="text-center">
              <h2 className="mb-2 text-2xl font-bold text-white">
                Select Your device
              </h2>
              <div className="mb-8 flex justify-center">
                <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm">
                  <img 
                    src="/assets/landing/revamp/logo.webp" 
                    alt="App Logo" 
                    className="h-20 w-20"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <a
                  href={appStoreLinks.apple}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 text-gray-900 transition-all hover:scale-[1.02] hover:bg-gray-100 active:scale-[0.98]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaApple size={24} />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-lg font-bold">App Store</div>
                  </div>
                </a>

                <div
                  className="flex cursor-not-allowed items-center justify-center gap-3 rounded-xl bg-gray-600/40 px-6 py-4 text-white opacity-60"
                  title="Coming soon"
                >
                  <FaGooglePlay size={24} />
                  <div className="text-left">
                    <div className="text-xs">Coming soon on</div>
                    <div className="text-lg font-bold">Google Play</div>
                  </div>
                </div>

                {/* <a
                  href={appStoreLinks.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 px-6 py-4 text-white transition-all hover:scale-[1.02] hover:from-blue-600 hover:to-green-600 active:scale-[0.98]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaGooglePlay size={24} />
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-lg font-bold">Google Play</div>
                  </div>
                </a> */}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AppDownloadModal;