import { motion } from "framer-motion";

const services = [
  {
    title: "Online Food Ordering",
    description: "Easily order your favorite food online.",
    icon: "🍽️",
  },
  {
    title: "Fast Delivery",
    description: "Fast and reliable delivery service.",
    icon: "🚚",
  },
  {
    title: "Quality Food",
    description: "Healthy food prepared by experienced chefs.",
    icon: "🧑‍🍳",
  },
  {
    title: "Easy Payment",
    description: "Easy and secure online payment facility.",
    icon: "💳",
  },
];

const OurServices = () => {
  return (
    <section className="bg-base-200 py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold">
            Our Services
          </h2>
          <p className="mt-4">
            ChefBazaar Online the best solution for your food
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center cursor-pointer"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">
                {service.title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
