import React from "react";
import contactImage from "../../images/banner/1.png";

const ContactUs = () => {
  return (
    <div
      data-aos="zoom-in-down"
      data-aos-duration="1000"
      className="bg-gray-100 py-12"
    >
      <div className="max-w-6xl mx-auto bg-accent shadow-lg rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:order-2">
            <img
              src={contactImage}
              alt="Contact Us"
              className="mb-6 w-full h-auto rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-primary mb-6">
              Contact Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Our Address</h3>
                <p className="text-gray-600">1414 Shopper Place, USA</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Contact Information
                </h3>
                <p className="text-gray-600">Email: contact@example.com</p>
                <p className="text-gray-600">Phone: +1 123-456-7890</p>
              </div>
            </div>
            <form className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  rows="4"
                  className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                ></textarea>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
