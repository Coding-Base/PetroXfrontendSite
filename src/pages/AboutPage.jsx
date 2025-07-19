import React from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaUser } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="relative h-96 overflow-hidden bg-gradient-to-r from-indigo-600 to-indigo-800">
        <div className="absolute inset-0 bg-grid-white/10 bg-[length:40px_40px]"></div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            About Us
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-indigo-100">
            Learn about our mission and connect with us
          </p>
        </div>
      </header>

      {/* About Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <FaUser className="text-2xl" />
            </div>
            <h2 className="mt-4 mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
              Meet Osimi Godsgift Gbubemi
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Creator of PetroX Educational Platform
            </p>
          </div>

          <div className="flex flex-col items-center gap-12 lg:flex-row">
            <div className="lg:w-1/3">
              <div className="overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMaHANnMgvaIHW7JrRnFX0jTlvtBPcpPOrzw&s"
                  alt="Osimi Godsgift Gbubemi"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            
            <div className="lg:w-2/3">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700">
                  Hello! I'm <span className="font-semibold">Osimi Godsgift Gbubemi</span>, the creator of PetroX educational platform. 
                  I'm passionate about making study resources and past exam questions accessible to learners everywhere.
                </p>
                
                <p className="text-lg text-gray-700">
                  Through PetroX, I share course materials and practice questions for various subjects to help students prepare for exams. 
                  I study and live in Delta State, Nigeria, and I built this platform to contribute to my community's learning.
                </p>
                
                <p className="text-lg text-gray-700">
                  Feel free to browse the content, and know that this platform is built on honesty and respect for all users' contributions.
                </p>
                
                <div className="mt-8 rounded-xl bg-indigo-50 p-6">
                  <h3 className="mb-4 flex items-center text-xl font-bold text-indigo-800">
                    <FaMapMarkerAlt className="mr-2" />
                    Based in Delta State, Nigeria
                  </h3>
                  <p className="text-gray-700">
                    Creating educational solutions for Nigerian students and learners worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-100 px-6 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <FaEnvelope className="text-2xl" />
            </div>
            <h2 className="mt-4 mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
              Get In Touch
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Have questions or feedback? We'd love to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <h3 className="mb-6 text-2xl font-bold text-gray-800">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                    <FaEnvelope className="text-lg" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">Email</h4>
                    <a 
                      href="mailto:Osimigbubemigodsgift@gmail.com" 
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Osimigbubemigodsgift@gmail.com
                    </a>
                    <p className="mt-1 text-sm text-gray-600">
                      Use this email to report issues or ask questions
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                    <FaMapMarkerAlt className="text-lg" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">Location</h4>
                    <p className="text-gray-700">Delta State, Nigeria</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="mb-4 text-lg font-semibold text-gray-800">Response Time</h4>
                <div className="rounded-lg bg-indigo-50 p-4">
                  <p className="text-gray-700">
                    I aim to respond to all inquiries within 1-2 business days. 
                    Your input is valuable and helps improve the platform!
                  </p>
                </div>
              </div>
            </div>
            
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <h3 className="mb-6 text-2xl font-bold text-gray-800">
                Send a Message
              </h3>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="mb-2 block font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="mb-2 block font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="mb-2 block font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    placeholder="Type your message here..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;