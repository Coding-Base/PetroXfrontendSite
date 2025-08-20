import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBook,
  FaUsers,
  FaComments,
  FaCalculator,
  FaFileUpload,
  FaGraduationCap,
  FaRobot,
  FaCompass,
  FaClipboardList,
  FaDownload,
  FaMapMarkerAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import image1 from '../images/land1.png';
import image2 from '../images/land2.png';
import Affilate from './AffilateDeals';

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [stats, setStats] = useState({ users: 0, questions: 0, downloads: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const observer = useRef(null);

  const slides = [
    {
      title: 'Navigate Your Academic Journey',
      subtitle: 'Campus compass, study resources, and AI-powered learning',
      image: 'https://wordinblack.com/wp-content/uploads/2024/09/GettyImages-2172168002-scaled.jpg'
    },
    {
      title: 'Master Your Subjects',
      subtitle: 'Personalized learning with PetroMark AI assistant',
      image: 'https://plus.unsplash.com/premium_photo-1683135216954-ab7130031b44?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxhY2slMjBzdHVkZW50c3xlbnwwfHwwfHx8MA%3D%3D'
    },
    {
      title: 'Access 482+ Past Questions',
      subtitle: 'Comprehensive exam preparation resources',
      image: image1,
    }
  ];
  
  // Fetch stats from backend
  const fetchStats = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/stats/');
      if (response.ok) {
        const data = await response.json();
        setStats({
          users: data.total_users || 80,
          questions: data.total_questions || 482,
          downloads: data.total_downloads || 14
        });
      } else {
        // Fallback to default values if API fails
        setStats({
          users: 80,
          questions: 482,
          downloads: 14
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Fallback to default values
      setStats({
        users: 80,
        questions: 482,
        downloads: 14
      });
    } finally {
      setLoading(false);
    }
  };

  // Preloader effect
  useEffect(() => {
    fetchStats();
  }, []);

  // Carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Scroll detection for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observer for animations
  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.animate-section');
    sections.forEach((section) => observer.current.observe(section));

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.menu-button')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="relative mx-auto mb-6 h-20 w-20">
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-gray-700 border-t-indigo-500"></div>
          </div>
          <h1 className="text-4xl font-bold tracking-wider text-white">
            <span className="text-indigo-400">PETRO</span>
            <span className="text-amber-400">X</span>
          </h1>
          <p className="mt-4 font-light text-gray-400">
            Preparing your learning experience
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Header */}
      <header className="relative h-[70vh] md:h-[90vh] overflow-hidden">
        {/* Carousel */}
        <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Image with 20% opacity */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
                style={{ backgroundImage: `url(${slide.image})` }}
              ></div>

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <nav
          className={`fixed z-30 flex w-full items-center justify-between px-4 py-3 transition-all duration-300 md:px-12 ${
            scrolled ? 'bg-gray-900/90 backdrop-blur-sm' : 'bg-transparent'
          }`}
        >
          <div className="flex items-center">
            <h1 className="text-xl md:text-2xl font-bold tracking-wider text-white">
              <span className="text-indigo-400">PETRO</span>
              <span className="text-amber-400">X</span>
            </h1>
          </div>

          <div className="hidden space-x-4 md:space-x-8 md:flex">
            <a
              href="#features"
              className="text-gray-200 transition-colors hover:text-white text-sm md:text-base"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-200 transition-colors hover:text-white text-sm md:text-base"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-gray-200 transition-colors hover:text-white text-sm md:text-base"
            >
              Testimonials
            </a>
            <Link
              to="/about"
              className="text-gray-200 transition-colors hover:text-white text-sm md:text-base"
            >
              About
            </Link>
            <Link
              to="/policies"
              className="text-gray-200 transition-colors hover:text-white text-sm md:text-base"
            >
              Policies
            </Link>
          </div>

          <div className="flex items-center">
            <Link
              to="/login"
              className="rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-700 md:px-6 md:text-base"
            >
              Get Started
            </Link>
            
            {/* Mobile menu button */}
            <button 
              className="ml-4 text-white md:hidden menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="fixed top-16 right-4 z-40 w-48 rounded-lg bg-gray-800 py-2 shadow-xl md:hidden mobile-menu">
            <a
              href="#features"
              className="block px-4 py-2 text-gray-200 transition-colors hover:bg-gray-700 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block px-4 py-2 text-gray-200 transition-colors hover:bg-gray-700 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="block px-4 py-2 text-gray-200 transition-colors hover:bg-gray-700 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <Link
              to="/about"
              className="block px-4 py-2 text-gray-200 transition-colors hover:bg-gray-700 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/policies"
              className="block px-4 py-2 text-gray-200 transition-colors hover:bg-gray-700 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Policies
            </Link>
          </div>
        )}

        {/* Hero Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center md:px-6">
          <div className="max-w-4xl">
            <h1 className="mb-4 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              {slides[currentSlide].title}
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-200 md:mb-10 md:text-xl">
              {slides[currentSlide].subtitle}
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                to="/signup"
                className="rounded bg-indigo-600 px-6 py-3 font-medium text-white transition-all hover:bg-indigo-700 md:px-8"
              >
                Create Free Account
              </Link>
              <Link
                to="/features"
                className="rounded border border-gray-300 bg-transparent px-6 py-3 font-medium text-white transition-all hover:bg-white/10 md:px-8"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 transform space-x-2 md:bottom-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full transition-all md:h-3 md:w-3 ${
                currentSlide === index
                  ? 'w-4 bg-white md:w-6'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </header>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 py-8 text-white md:py-12">
        <div className="mx-auto max-w-6xl px-4 md:px-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold md:text-4xl lg:text-5xl">
                {stats.users.toLocaleString()}+
              </div>
              <div className="mt-2 text-base font-medium md:text-lg">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold md:text-4xl lg:text-5xl">
                {stats.questions.toLocaleString()}+
              </div>
              <div className="mt-2 text-base font-medium md:text-lg">Past Questions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold md:text-4xl lg:text-5xl">
                {stats.downloads.toLocaleString()}+
              </div>
              <div className="mt-2 text-base font-medium md:text-lg">Resources Downloaded</div>
            </div>
          </div>
        </div>
      </section>

      <Affilate/>

      {/* Features Section */}
      <section
        id="features"
        className={`animate-section bg-white px-4 py-12 transition-all duration-700 md:px-12 md:py-20 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl lg:text-4xl">
              Powerful Learning Tools
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 md:text-lg">
              PetroX provides everything you need to excel academically
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`rounded-lg border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-indigo-300 hover:shadow-md md:p-8 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 text-2xl text-indigo-600 md:mb-6 md:text-3xl">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-lg font-bold text-gray-800 md:text-xl">
                  {feature.title}
                </h3>
                <p className="mb-4 text-gray-600 md:text-base">{feature.description}</p>
                <div className="flex flex-wrap gap-2">
                  {feature.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 md:px-3"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-gray-50 px-4 py-12 md:px-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl lg:text-4xl">
              How PetroX Works
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 md:text-lg">
              A seamless learning experience designed for academic success
            </p>
          </div>

          <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
            <div className="w-full lg:w-1/2">
              <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-4 shadow-sm md:p-6">
                <div className="flex h-64 w-full items-center justify-center rounded-lg border border-gray-300 bg-gray-100 md:h-80">
                  <div className="h-48 w-full rounded-xl border-2 border-dashed bg-gray-200 md:h-64" />
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="space-y-6 md:space-y-8">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 md:h-12 md:w-12">
                      <span className="text-lg font-bold md:text-xl">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-bold text-gray-800 md:text-xl">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 md:text-base">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 p-0.5 shadow-sm md:mt-12">
                <div className="rounded-lg bg-white p-4 md:p-6">
                  <div className="flex flex-col items-center justify-between sm:flex-row">
                    <div className="text-center sm:text-left">
                      <h3 className="mb-2 text-lg font-bold text-gray-800 md:text-xl">
                        Ready to get started?
                      </h3>
                      <p className="text-gray-600 md:text-base">
                        Join thousands of students already using PetroX
                      </p>
                    </div>
                    <Link
                      to="/signup"
                      className="mt-4 rounded bg-indigo-600 px-6 py-2 font-medium text-white transition-all hover:bg-indigo-700 sm:mt-0 md:px-8 md:py-3"
                    >
                      Sign Up Free
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Resources Section */}
      <section className="bg-white px-4 py-12 md:px-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl lg:text-4xl">
              Academic Resources
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 md:text-lg">
              Comprehensive tools for exam preparation and campus navigation
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all hover:shadow-lg md:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 md:mb-6 md:h-16 md:w-16">
                <FaCompass className="text-xl md:text-2xl" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-gray-800 md:mb-4 md:text-xl">Campus Compass</h3>
              <p className="mb-4 text-gray-600 md:mb-6 md:text-base">
                Never get lost on campus again. Our interactive campus map helps you find classrooms, libraries, and facilities with ease.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 md:px-3">
                  Navigation
                </span>
                <span className="rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 md:px-3">
                  Real-time
                </span>
                <span className="rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 md:px-3">
                  Interactive Map
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all hover:shadow-lg md:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 md:mb-6 md:h-16 md:w-16">
                <FaClipboardList className="text-xl md:text-2xl" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-gray-800 md:mb-4 md:text-xl">Online Tests</h3>
              <p className="mb-4 text-gray-600 md:mb-6 md:text-base">
                Create and take timed exams, invite friends to join, and get instant results with detailed performance analytics.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 md:px-3">
                  Timed Exams
                </span>
                <span className="rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 md:px-3">
                  Collaborate
                </span>
                <span className="rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 md:px-3">
                  Analytics
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all hover:shadow-lg md:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 md:mb-6 md:h-16 md:w-16">
                <FaDownload className="text-xl md:text-2xl" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-gray-800 md:mb-4 md:text-xl">Resource Library</h3>
              <p className="mb-4 text-gray-600 md:mb-6 md:text-base">
                Access our collection of {stats.questions.toLocaleString()}+ past questions, course materials, and textbooks. Download and study anytime, anywhere.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 md:px-3">
                  PDF Downloads
                </span>
                <span className="rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 md:px-3">
                  {stats.questions.toLocaleString()}+ Resources
                </span>
                <span className="rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 md:px-3">
                  All Subjects
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="bg-gray-900 px-4 py-12 text-white md:px-12 md:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
              What Students Say
            </h2>
            <p className="mx-auto max-w-2xl text-gray-400 md:text-lg">
              Hear from students who have transformed their academic journey
              with PetroX
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-700 bg-gray-800 p-4 md:p-6"
              >
                <div className="mb-4 flex items-center md:mb-6">
                  <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 md:mr-4 md:h-12 md:w-12">
                    <span className="text-base font-medium text-indigo-400 md:text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold md:text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400 md:text-base">{testimonial.role}</p>
                  </div>
                </div>
                <p className="mb-4 text-sm text-gray-300 md:text-base">"{testimonial.quote}"</p>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-3 w-3 fill-current md:h-4 md:w-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="bg-white px-4 py-12 md:px-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
            <div className="w-full lg:w-1/2">
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                <div className="mb-4 flex items-center md:mb-6">
                  <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 md:mr-4 md:h-12 md:w-12">
                    <FaRobot className="text-lg md:text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 md:text-xl">
                      PetroMark AI Assistant
                    </h3>
                    <p className="text-gray-600 md:text-base">
                      Your personal learning companion
                    </p>
                  </div>
                </div>

                <div className="mb-4 space-y-3 md:mb-6 md:space-y-4">
                  <div className="flex items-start">
                    <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-xs md:mr-3 md:h-8 md:w-8 md:text-sm">
                      AI
                    </div>
                    <div className="rounded-lg rounded-tl-none bg-indigo-50 p-3 md:p-4">
                      <p className="text-sm text-gray-800 md:text-base">
                        How can I help with your studies today?
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start justify-end">
                    <div className="max-w-xs rounded-lg rounded-tr-none bg-indigo-600 p-3 text-white md:p-4">
                      <p className="text-sm md:text-base">Can you explain quantum physics concepts?</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 md:p-4">
                  <p className="mb-2 text-sm font-medium text-gray-700 md:mb-3 md:text-base">
                    PetroMark is ready to assist with:
                  </p>
                  <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-2">
                    {aiFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="mr-1 h-1.5 w-1.5 rounded-full bg-indigo-600 md:mr-2"></div>
                        <span className="text-xs text-gray-700 md:text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <h2 className="mb-4 text-2xl font-bold text-gray-800 md:mb-6 md:text-3xl lg:text-4xl">
                Intelligent Learning with{' '}
                <span className="text-indigo-600">PetroMark AI</span>
              </h2>
              <p className="mb-6 text-gray-600 md:mb-8 md:text-base">
                Our advanced AI assistant provides personalized tutoring,
                answers your questions in real-time, and helps you master
                complex subjects through interactive learning.
              </p>

              <ul className="mb-6 space-y-3 md:mb-8 md:space-y-4">
                {aiBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mt-1 mr-2 rounded-full bg-indigo-100 p-1 text-indigo-600 md:mr-3">
                      <svg
                        className="h-3 w-3 md:h-4 md:w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700 md:text-base">{benefit}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/petromark"
                className="inline-flex items-center rounded bg-indigo-600 px-6 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-700 md:px-8 md:py-3 md:text-base"
              >
                <FaRobot className="mr-2" />
                Try PetroMark Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 px-4 pt-12 pb-6 text-white md:px-12 md:pt-16 md:pb-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 grid grid-cols-1 gap-8 md:mb-12 md:grid-cols-4">
            <div>
              <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
                <span className="text-indigo-400">PETRO</span>
                <span className="text-amber-400">X</span>
              </h3>
              <p className="mb-4 text-sm text-gray-400 md:mb-6 md:text-base">
                The ultimate academic platform for students seeking excellence.
              </p>
              <div className="flex space-x-3 md:space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="flex h-7 w-7 items-center justify-center rounded bg-gray-800 text-gray-300 transition-colors hover:bg-gray-700 md:h-8 md:w-8"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-base font-bold text-gray-200 md:mb-4 md:text-lg">
                Resources
              </h4>
              <ul className="space-y-2">
                {resources.map((resource, index) => (
                  <li key={index}>
                    <a
                      href={resource.url}
                      className="text-sm text-gray-400 transition-colors hover:text-white md:text-base"
                    >
                      {resource.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-base font-bold text-gray-200 md:mb-4 md:text-lg">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/policies"
                    className="text-sm text-gray-400 transition-colors hover:text-white md:text-base"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/policies"
                    className="text-sm text-gray-400 transition-colors hover:text-white md:text-base"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-sm text-gray-400 transition-colors hover:text-white md:text-base"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about#contact"
                    className="text-sm text-gray-400 transition-colors hover:text-white md:text-base"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-base font-bold text-gray-200 md:mb-4 md:text-lg">
                Stay Updated
              </h4>
              <p className="mb-3 text-sm text-gray-400 md:mb-4 md:text-base">
                Subscribe to our newsletter for updates
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-l bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none md:px-4 md:py-2 md:text-base"
                />
                <button className="rounded-r bg-indigo-600 px-3 py-2 text-sm text-white transition-colors hover:bg-indigo-700 md:px-4 md:py-2 md:text-base">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500 md:pt-8 md:text-sm">
            <p>
              &copy; {new Date().getFullYear()} PetroX. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Data arrays
const features = [
  {
    icon: <FaBook />,
    title: 'Study Materials',
    description:
      'Access thousands of resources, textbooks, and past questions for all subjects.',
    tags: ['Resources', 'Textbooks', 'Past Questions']
  },
  {
    icon: <FaUsers />,
    title: 'Group Tests',
    description:
      'Create and join collaborative tests with peers to prepare for exams.',
    tags: ['Collaborative', 'Real-time', 'Custom Tests']
  },
  {
    icon: <FaComments />,
    title: 'Live Chat',
    description:
      'Connect with other students for study sessions and discussions.',
    tags: ['Real-time', 'Study Groups', 'Collaboration']
  },
  {
    icon: <FaCompass />,
    title: 'Campus Compass',
    description:
      'Navigate campus with our interactive map and location services.',
    tags: ['Navigation', 'Maps', 'Location']
  },
  {
    icon: <FaFileUpload />,
    title: 'Material Upload',
    description:
      'Share study materials and earn recognition for contributions.',
    tags: ['Upload', 'Badges', 'Community']
  },
  {
    icon: <FaGraduationCap />,
    title: 'Past Questions',
    description: 'Access 482+ past exam questions with solutions and analytics.',
    tags: ['Exams', 'Solutions', 'Analytics']
  }
];

const steps = [
  {
    title: 'Create Your Profile',
    description: 'Set up your academic profile in minutes'
  },
  {
    title: 'Access Resources',
    description: 'Browse our library of textbooks and study materials'
  },
  {
    title: 'Join Study Groups',
    description: 'Connect with peers and create collaborative sessions'
  },
  {
    title: 'Take Tests & Download',
    description: 'Complete exams and download resources'
  },
  {
    title: 'Track Progress',
    description: 'Use our tools to monitor your academic journey'
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Medical Student',
    quote:
      'The campus compass saved me so much time finding my classes. PetroX transformed how I navigate campus and prepare for exams.'
  },
  {
    name: 'David Chen',
    role: 'Engineering Student',
    quote:
      'I downloaded 42 past questions last semester. The GP calculator and PetroMark AI helped me improve my GPA significantly.'
  },
  {
    name: 'Amanda Rodriguez',
    role: 'Law Student',
    quote:
      'Creating group tests with friends made studying enjoyable. Finding quality study materials used to take hours. With PetroX, everything is in one place.'
  },
  {
    name: 'GIDEON OJUMIRAYO A.',
    role: 'Geology Student',
    quote:
      'The website is an excellent resource for students, especially those in 100 level. The tests provided are well-structured, engaging, and highly beneficial for academic growth. I truly appreciate the platform — its a great tool that supports learning and helps students prepare effectively, especially for 100L students'

  }
];

const aiFeatures = [
  'Concept Explanations',
  'Homework Help',
  'Study Planning',
  'Practice Questions',
  'Research Assistance',
  'Exam Preparation',
  'Essay Feedback',
  'Concept Mapping'
];

const aiBenefits = [
  '24/7 personalized tutoring in any subject',
  'Instant answers to complex questions',
  'Adaptive learning paths based on progress',
  'Comprehensive explanations with examples',
  'Study recommendations based on syllabus',
  'Exam preparation strategies'
];

const socialLinks = [
  { name: 'Facebook', icon: 'FB', url: 'https://petrox-test-frontend.onrender.com/login' },
  { name: 'Twitter', icon: 'TW', url: 'https://petrox-test-frontend.onrender.com/login' },
  { name: 'Instagram', icon: 'IG', url: 'https://petrox-test-frontend.onrender.com/login' },
  { name: 'LinkedIn', icon: 'IN', url: 'https://petrox-test-frontend.onrender.com/login' }
];

const resources = [
  { name: 'Blog', url: 'https://petrox-test-frontend.onrender.com/login' },
  { name: 'Help Center', url: 'https://petrox-test-frontend.onrender.com/login' },
  { name: 'Community', url: 'https://petrox-test-frontend.onrender.com/login' },
  { name: 'Study Guides', url: 'https://petrox-test-frontend.onrender.com/login' },
  { name: 'Past Questions', url: 'https://petrox-test-frontend.onrender.com/login' },
  { name: 'Campus Map', url: 'https://petrox-test-frontend.onrender.com/login' }
];

export default LandingPage;
