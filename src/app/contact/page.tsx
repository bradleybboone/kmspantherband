'use client';

import { useState } from 'react';

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
    <div className="max-w-7xl mx-auto px-8 lg:px-16 py-20">
      <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">
        Contact Us
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-primary">Get in Touch</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Band Office</h3>
              <p className="text-gray-dark">
                KMS Panther Band<br />
                123 School Street<br />
                Your City, State 12345
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
              <p className="text-gray-dark">
                <strong>Phone:</strong> (555) 123-4567<br />
                <strong>Email:</strong> band@kms.edu
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Office Hours</h3>
              <p className="text-gray-dark">
                Monday - Friday: 7:30 AM - 4:00 PM<br />
                Band Hall Hours: 7:00 AM - 5:00 PM
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Directors</h3>
              <div className="space-y-3">
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
          <h2 className="text-2xl font-semibold mb-6 text-primary">Send us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
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
              <label htmlFor="email" className="block text-sm font-medium mb-1">
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
              <label htmlFor="subject" className="block text-sm font-medium mb-1">
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
              <label htmlFor="message" className="block text-sm font-medium mb-1">
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
  );
}