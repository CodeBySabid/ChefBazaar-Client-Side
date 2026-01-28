import { motion } from "motion/react"; // Check your import based on motion version
import { Link } from "react-router-dom";
import { HiExclamationCircle, HiHome } from "react-icons/hi";

// Helper for Tailwind classes

export default function ErrorPageProps() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 text-center dark:bg-slate-950">
      {/* Floating Icon Animation */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: [0, -20, 0], opacity: 1 }}
        transition={{
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 0.5 }
        }}
        className="mb-8 text-red-500"
      >
        <HiExclamationCircle size={120} />
      </motion.div>

      {/* Staggered Text */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
          }
        }}
      >
        <motion.h1 
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          className="text-9xl font-black text-slate-200 dark:text-slate-800"
        >
          404
        </motion.h1>
        
        <motion.h2 
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          className="mt-4 text-3xl font-bold text-slate-900 dark:text-white"
        >
          Oops! Page not found.
        </motion.h2>
        
        <motion.p 
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          className="mt-2 text-slate-600 dark:text-slate-400"
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>
      </motion.div>

      {/* Interactive Button */}
      <motion.div
        className="mt-10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to="/"
          className=
            "flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <HiHome className="text-xl" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}