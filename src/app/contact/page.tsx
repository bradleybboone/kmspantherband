'use client';

import { useState } from 'react';
import Header from "@/components/Header";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Solid header for contact page */}
      <Header variant="solid" />
      
      {/* Spacer div to push content below fixed header */}
      <div className="h-20 lg:h-24" />
      
      {/* Page content */}
      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-20">
      <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-24">
        Contact Us
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-semibold mb-12 text-primary">Get in Touch</h2>
          
          <div className="space-y-16">
            <div>
              <h3 className="text-lg font-semibold mb-4">Band Office</h3>
              <p className="text-gray-dark">
                C.E. King Middle School<br />
                8540 C.E. King Parkway<br />
                Houston, TX 77044
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Office Hours</h3>
              <p className="text-gray-dark">
                Monday - Friday: 7:45 AM - 4:00 PM
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Directors</h3>
              <div className="space-y-6">
                <div>
                  <p className="font-medium">Dr. Bradley Boone - Band Director</p>
                  <p className="text-gray-dark">Email: bradleyboone@sheldonisd.com</p>
                </div>
                <div>
                  <p className="font-medium">Ms. Catherine Ruiz - Assistant Band Director</p>
                  <p className="text-gray-dark">Email: catherineruiz@sheldonisd.com</p>
                </div>
                <div>
                  <p className="font-medium">Ms. Jenny Cooper - Assistant Band Director</p>
                  <p className="text-gray-dark">Email: jennycooper@sheldonisd.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold mb-12 text-primary">Send us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-light rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-light rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-light rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="join">Joining the Band</option>
                <option value="rental">Instrument Rental</option>
                <option value="event">Event Information</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-light rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-hover text-secondary py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
}