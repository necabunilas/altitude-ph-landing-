'use client';

import { useState } from 'react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <h1 className="text-3xl font-black tracking-tight text-black">
                ALTITUDE
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-10">
              <a href="#about" className="text-[#1A1A1A] hover:text-[#E0A55B] transition-all duration-200 font-semibold text-sm uppercase tracking-wide">About</a>
              <a href="#menu" className="text-[#1A1A1A] hover:text-[#E0A55B] transition-all duration-200 font-semibold text-sm uppercase tracking-wide">Menu</a>
              <a href="#hobbies" className="text-[#1A1A1A] hover:text-[#E0A55B] transition-all duration-200 font-semibold text-sm uppercase tracking-wide">Hobbies</a>
              <a href="#gallery" className="text-[#1A1A1A] hover:text-[#E0A55B] transition-all duration-200 font-semibold text-sm uppercase tracking-wide">Gallery</a>
              <a href="#contact" className="text-[#1A1A1A] hover:text-[#E0A55B] transition-all duration-200 font-semibold text-sm uppercase tracking-wide">Contact</a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#1A1A1A] hover:text-[#E0A55B] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-4">
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-[#1A1A1A] hover:text-[#E0A55B] transition-all duration-200 font-semibold text-sm uppercase tracking-wide py-2">About</a>
                <a href="#menu" onClick={() => setMobileMenuOpen(false)} className="text-[#1A1A1A] hover:text-[#E0A55B] transition-all duration-200 font-semibold text-sm uppercase tracking-wide py-2">Menu</a>
                <a href="#hobbies" onClick={() => setMobileMenuOpen(false)} className="text-[#1A1A1A] hover:text-[#E0A55B] transition-all duration-200 font-semibold text-sm uppercase tracking-wide py-2">Hobbies</a>
                <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="text-[#1A1A1A] hover:text-[#E0A55B] transition-all duration-200 font-semibold text-sm uppercase tracking-wide py-2">Gallery</a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-[#1A1A1A] hover:text-[#E0A55B] transition-all duration-200 font-semibold text-sm uppercase tracking-wide py-2">Contact</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-4 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-7xl md:text-9xl font-black text-black mb-8 leading-none tracking-tighter">
              Fuel Your<br />Adventure
            </h2>
            <p className="text-xl md:text-2xl text-[#1A1A1A] mb-14 max-w-3xl mx-auto leading-relaxed font-medium">
              Where great coffee meets outdoor passion. Your pit stop for cycling, running, and unforgettable outdoor experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="#menu"
                className="px-12 py-5 bg-[#E0A55B] text-black font-bold uppercase tracking-wide hover:bg-[#d09849] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View Menu
              </a>
              <a
                href="#hobbies"
                className="px-12 py-5 border-2 border-black text-black font-bold uppercase tracking-wide hover:bg-black hover:text-white transition-all duration-300"
              >
                Explore Activities
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-28 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h3 className="text-6xl font-black text-black leading-tight tracking-tight">More Than Just Coffee</h3>
              <p className="text-lg text-[#1A1A1A] leading-relaxed">
                Altitude PH is a community hub where coffee lovers and outdoor enthusiasts come together.
                Whether you&apos;re gearing up for a morning ride, recovering from a trail run, or simply
                looking for great coffee and conversation, you&apos;ve found your home base.
              </p>
              <p className="text-lg text-[#1A1A1A] leading-relaxed">
                We believe in the power of good coffee to fuel great adventures and the importance of
                community in pushing our limits.
              </p>
            </div>
            <div className="h-96 overflow-hidden shadow-2xl">
              <img
                src="/gallery/E398FA98-68C6-4E05-B951-802224DF1B0F_1_105_c.jpeg"
                alt="Altitude PH Coffee Shop"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hobbies/Activities Section */}
      <section id="hobbies" className="py-28 px-4 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-6xl font-black text-black text-center mb-20 tracking-tight">Our Passion</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cycling */}
            <div className="bg-white p-12 shadow-lg hover:shadow-2xl transition-all duration-300 group">
              <div className="w-24 h-24 bg-[#E0A55B] flex items-center justify-center mb-10 group-hover:bg-black transition-colors duration-300">
                <svg className="w-12 h-12 text-black group-hover:text-[#E0A55B]" fill="currentColor" viewBox="0 0 640 512">
                  <path d="M400 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm27.2 64l-61.8-48.8c-17.3-13.6-41.7-13.8-59.1-.3l-83.1 64.2c-30.7 23.8-28.5 70.8 4.3 91.6L288 305.1V416c0 17.7 14.3 32 32 32s32-14.3 32-32V288c0-10.7-5.3-20.7-14.2-26.6L295 232.9l60.3-48.5L396 217c5.7 4.5 12.7 7 20 7h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H427.2zM56 384a72 72 0 1 1 144 0A72 72 0 1 1 56 384zm200 0A128 128 0 1 0 0 384a128 128 0 1 0 256 0zm184 0a72 72 0 1 1 144 0 72 72 0 1 1 -144 0zm200 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"/>
                </svg>
              </div>
              <h4 className="text-3xl font-black text-black mb-6 uppercase tracking-tight">Cycling</h4>
              <p className="text-[#1A1A1A] leading-relaxed text-base">
                Join our weekly group rides and cycling community. From casual cruises to challenging climbs,
                there&apos;s a ride for everyone.
              </p>
            </div>

            {/* Running */}
            <div className="bg-white p-12 shadow-lg hover:shadow-2xl transition-all duration-300 group">
              <div className="w-24 h-24 bg-[#E0A55B] flex items-center justify-center mb-10 group-hover:bg-black transition-colors duration-300">
                <svg className="w-12 h-12 text-black group-hover:text-[#E0A55B]" fill="currentColor" viewBox="0 0 448 512">
                  <path d="M320 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM125.7 175.5c9.9-9.9 23.4-15.5 37.5-15.5c1.9 0 3.8 .1 5.6 .3L137.6 254c-9.3 28 1.7 58.8 26.8 74.5l86.2 53.9-25.4 88.8c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l28.7-100.4c5.9-20.6-2.6-42.6-20.7-53.9L238 299l30.9-82.4 5.1 12.3C289 264.7 323.9 288 362.7 288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H362.7c-12.9 0-24.6-7.8-29.5-19.7l-6.3-15.2c-11.6-27.8-42-42.2-70.7-33.5l-97.8 29.3c-32.1 9.6-54.4 39.5-54.4 73.1V304c0 17.7 14.3 32 32 32s32-14.3 32-32V258.5c0-5.6 3.1-10.8 8.1-13.3l29.7-15c.8-.4 1.6-.8 2.4-1.2l-7.8 20.9c-8.4 22.4-6.9 47.3 4.2 68.5l43.3 82.5c8.6 16.4 28.7 22.8 45.1 14.2s22.8-28.7 14.2-45.1l-43.3-82.5c-1.9-3.6-2.6-7.8-2-11.8l18.6-124.8c2-13.6-4.2-27.1-15.5-33.9l-61.4-37.3c-11.3-6.9-25.2-9.4-38.5-7.1L125.7 175.5z"/>
                </svg>
              </div>
              <h4 className="text-3xl font-black text-black mb-6 uppercase tracking-tight">Running</h4>
              <p className="text-[#1A1A1A] leading-relaxed text-base">
                Connect with fellow runners, share routes, and train together. Perfect recovery spot
                for post-run coffee and stretching.
              </p>
            </div>

            {/* Outdoors */}
            <div className="bg-white p-12 shadow-lg hover:shadow-2xl transition-all duration-300 group">
              <div className="w-24 h-24 bg-[#E0A55B] flex items-center justify-center mb-10 group-hover:bg-black transition-colors duration-300">
                <svg className="w-12 h-12 text-black group-hover:text-[#E0A55B]" fill="currentColor" viewBox="0 0 512 512">
                  <path d="M256 32c12.5 0 24.1 6.4 30.8 17L503.4 394.4c5.6 8.9 8.6 19.2 8.6 29.7c0 30.9-25 55.9-55.9 55.9H55.9C25 480 0 455 0 424.1c0-10.5 3-20.8 8.6-29.7L225.2 49c6.6-10.6 18.3-17 30.8-17zm65 192L256 120.4 176.9 246.5 208 288l-48 64h192l-31-64z"/>
                </svg>
              </div>
              <h4 className="text-3xl font-black text-black mb-6 uppercase tracking-tight">Outdoors</h4>
              <p className="text-[#1A1A1A] leading-relaxed text-base">
                From hiking trails to weekend camping trips, we organize outdoor adventures that bring
                our community together in nature.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section id="menu" className="py-28 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-6xl font-black text-black text-center mb-20 tracking-tight">Our Menu</h3>

          <div className="bg-[#1A1A1A] p-16 shadow-2xl mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-[#E0A55B] flex items-center justify-center flex-shrink-0">
                  <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 512 512">
                    <path d="M88 0C74.7 0 64 10.7 64 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C120.5 112.3 128 119.9 128 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C119.5 47.7 112 40.1 112 24c0-13.3-10.7-24-24-24zM32 192c-17.7 0-32 14.3-32 32V416c0 53 43 96 96 96H288c53 0 96-43 96-96h16c61.9 0 112-50.1 112-112s-50.1-112-112-112H352 32zm352 64h16c26.5 0 48 21.5 48 48s-21.5 48-48 48H384V256zM224 24c0-13.3-10.7-24-24-24s-24 10.7-24 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C232.5 112.3 240 119.9 240 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C231.5 47.7 224 40.1 224 24z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-4xl font-black text-white mb-4 uppercase tracking-tight">Coffee & Drinks</h4>
                  <p className="text-[#B3B3B3] text-lg leading-relaxed">
                    From espresso to cold brew, specialty lattes to refreshing iced drinks. Every cup crafted with passion to fuel your adventures.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a
              href="https://altitudeph.catalog.kyte.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-16 py-6 bg-[#E0A55B] text-black font-black text-lg uppercase tracking-wider hover:bg-black hover:text-[#E0A55B] transition-all duration-300 shadow-2xl hover:shadow-3xl"
            >
              View Full Menu
            </a>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-28 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-6xl font-black text-black text-center mb-20 tracking-tight">Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Gallery Grid */}
            {[
              '6CCF93EA-0E83-423B-9504-6BAA73BEF798_4_5005_c.jpeg',
              '8BE81068-CE48-4439-9BE0-545B60B4157F.jpeg',
              '3F6DBA67-D9BE-4783-9CD1-CB185EB7C68A_1_105_c.jpeg',
              'B3D4475F-D5E4-46BA-A6CA-F315C1F59CEA_1_105_c.jpeg',
              '9083CD6C-EF73-4919-AAA9-0A5C84DAE84B_1_105_c.jpeg',
              'A095E589-437D-416C-B987-A826C8EC5EA5_1_105_c.jpeg',
              '95B19B86-C81E-46DD-A081-8E25E958A3B5_1_105_c.jpeg',
              'C8EF3D05-5BEB-4802-8FF0-B532EAB1D9BA_1_105_c.jpeg'
            ].map((photo, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(photo)}
                className="aspect-square overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <img
                  src={`/gallery/${photo}`}
                  alt={`Altitude PH Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-28 px-4 bg-[#F7F7F7]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-6xl font-black text-black mb-10 tracking-tight">Visit Us</h3>
            <p className="text-2xl text-[#1A1A1A] font-semibold tracking-wide">
              Come for the coffee, stay for the community
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="bg-white p-12 shadow-2xl space-y-6 text-lg text-[#1A1A1A]">
              <div>
                <p className="font-bold text-xl uppercase tracking-wide mb-4">Opening Hours:</p>
                <div className="space-y-2 text-base">
                  <p className="font-semibold">Monday - Saturday: <span className="text-[#E0A55B] font-black">10:00 AM - 8:00 PM</span></p>
                  <p className="font-semibold">Tuesday: <span className="text-[#5A0F2E] font-black">CLOSED</span></p>
                  <p className="font-semibold">Sunday: <span className="text-[#E0A55B] font-black">2:00 PM - 7:00 PM</span></p>
                </div>
              </div>
              <div className="pt-4">
                <p className="font-bold text-xl uppercase tracking-wide mb-3">Location:</p>
                <a
                  href="https://www.google.com/maps/place/Altitude+Coffee/@8.151921,125.1287152,17z/data=!3m1!4b1!4m6!3m5!1s0x32ffab81efb0a5d9:0xa216df42f9b50e57!8m2!3d8.1519157!4d125.1312901!16s%2Fg%2F11swp9rzp3!5m1!1e4?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E0A55B] font-black hover:text-[#d09849] transition-colors text-base"
                >
                  Altitude Coffee<br />
                  View on Google Maps →
                </a>
              </div>
              <div className="pt-4">
                <p className="font-bold text-xl uppercase tracking-wide mb-3">Contact:</p>
                <a
                  href="tel:+639610549635"
                  className="text-[#E0A55B] font-black hover:text-[#d09849] transition-colors text-base"
                >
                  +63 961 054 9635
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white shadow-2xl overflow-hidden h-[400px] md:h-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.8867687845855!2d125.12871520000001!3d8.1519157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32ffab81efb0a5d9%3A0xa216df42f9b50e57!2sAltitude%20Coffee!5e0!3m2!1sen!2sph!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Altitude Coffee Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-[#E0A55B] transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={`/gallery/${selectedImage}`}
            alt="Gallery image enlarged"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-6 tracking-tight">ALTITUDE</h2>
            <p className="text-[#E0A55B] text-xl font-bold mb-8 uppercase tracking-widest">Fuel Your Adventure</p>

            {/* Social Media Links */}
            <div className="flex justify-center space-x-6 mb-8">
              <a
                href="https://www.facebook.com/altitudecoffeeph"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#E0A55B] hover:bg-white flex items-center justify-center transition-all duration-300"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/altitude.ph/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#E0A55B] hover:bg-white flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="text-center text-sm text-[#B3B3B3] border-t border-[#1A1A1A] pt-10 uppercase tracking-wider">
            © 2026 Altitude PH. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
