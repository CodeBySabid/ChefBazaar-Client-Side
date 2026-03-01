import React from "react";

const About = () => {
  return (
    <div className="bg-base-100 text-base-content">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-orange-500 to-red-500 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Connecting Passionate Chefs with Food Lovers
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            ChefBazaar is a modern digital marketplace designed to bring
            homemade meals closer to your table. We empower local chefs and
            provide food enthusiasts with easy access to fresh, quality dishes.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="mb-4">
              Our mission is to support local home chefs by giving them a
              professional online platform to showcase their culinary talents.
              At the same time, we help customers discover healthy,
              home-cooked meals with convenience and trust.
            </p>
            <p>
              ChefBazaar combines community, technology, and food culture into
              one seamless digital experience.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d"
              alt="Local Chef Cooking"
              className="rounded-2xl shadow-lg w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-base-200 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold">What Makes ChefBazaar Special?</h2>
        </div>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-base-100 rounded-xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">
              Discover Local Chefs
            </h3>
            <p>
              Explore talented home chefs, browse their profiles, and check
              daily menus with detailed dish information.
            </p>
          </div>

          <div className="p-6 bg-base-100 rounded-xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">
              Easy & Secure Ordering
            </h3>
            <p>
              Place orders seamlessly through a responsive and intuitive user
              interface powered by modern React technologies.
            </p>
          </div>

          <div className="p-6 bg-base-100 rounded-xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">
              Modern & Responsive Design
            </h3>
            <p>
              Built with React, Tailwind CSS, and Vite to ensure speed,
              scalability, and full responsiveness across all devices.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold">Powered by Modern Technology</h2>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <p className="mb-4">
            ChefBazaar is built using React for dynamic UI rendering,
            Tailwind CSS and DaisyUI for sleek styling, React Router for
            seamless navigation, and Firebase for authentication support.
          </p>
          <p>
            Our technology stack ensures fast performance, scalability,
            and a smooth user experience.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-500 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Join the ChefBazaar Community
        </h2>
        <p className="mb-6">
          Whether you're a food lover or a passionate home chef, ChefBazaar
          welcomes you to experience a new way of sharing and enjoying food.
        </p>
        <button className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
          Explore Now
        </button>
      </section>
    </div>
  );
};

export default About;