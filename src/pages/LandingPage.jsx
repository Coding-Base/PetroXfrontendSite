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
  FaTimes,
  FaCheckCircle,
  FaLightbulb,
  FaChartLine,
  FaMobileAlt,
  FaClock,
  FaAward,
  FaArrowRight,
  FaStar,
  FaPlay,
  FaQuoteLeft
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
      image: 'https://wordinblack.com/wp-content/uploads/2024/09/GettyImages-2172168002-scaled.jpg',
      gradient: 'from-blue-900/80 to-purple-900/80'
    },
    {
      title: 'Master Your Subjects',
      subtitle: 'Personalized learning with PetroMark AI assistant',
      image: 'https://plus.unsplash.com/premium_photo-1683135216954-ab7130031b44?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxhY2slMjBzdHVkZW50c3xlbnwwfHwwfHx8MA%3D%3D',
      gradient: 'from-indigo-900/80 to-blue-900/80'
    },
    {
      title: 'Access 538+ Past Questions',
      subtitle: 'Comprehensive exam preparation resources',
      image: image1,
      gradient: 'from-purple-900/80 to-pink-900/80'
    }
  ];
  
  const safeFormatNumber = (v) => {
    if (v === null || v === undefined || v === '') return '—';
    if (typeof v === 'number') return v.toLocaleString();
    const n = Number(v);
    return Number.isNaN(n) ? '—' : n.toLocaleString();
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats/');
      if (response.ok) {
        const data = await response.json();
        setStats({
          users: data.total_users ?? 200,
          questions: data.total_questions ?? 538,
          downloads: data.total_downloads ?? 20
        });
      } else {
        setStats({
          users: 200,
          questions: 538,
          downloads: 20
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats({
        users: 200,
        questions: 538,
        downloads: 20
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="text-center">
          <div className="relative mx-auto mb-6">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            <div className="absolute inset-0 h-16 w-16 animate-ping rounded-full border-4 border-blue-400 opacity-75"></div>
          </div>
          <h1 className="text-4xl font-bold tracking-wider text-white mb-2">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">PETRO</span>
            <span className="text-amber-400">X</span>
          </h1>
          <p className="text-gray-300 font-light">Preparing your learning experience</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 overflow-x-hidden">
      {/* Enhanced Header */}
      <header className="relative h-screen overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 transform ${
                currentSlide === index 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-110'
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              ></div>
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}></div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <nav
          className={`fixed z-50 w-full transition-all duration-500 ${
            scrolled 
              ? 'bg-white/90 backdrop-blur-xl shadow-lg py-2' 
              : 'bg-transparent py-4'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <div className={`rounded-lg p-2 ${
                  scrolled ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-white/20'
                }`}>
                  <h1 className="text-2xl font-bold tracking-tight">
                    <span className="text-white">PETRO</span>
                    <span className="text-amber-400">X</span>
                  </h1>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {['Features', 'How It Works', 'Testimonials', 'About', 'Policies'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className={`font-medium transition-all duration-300 hover:scale-105 ${
                      scrolled 
                        ? 'text-gray-700 hover:text-blue-600' 
                        : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {item}
                  </a>
                ))}
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Get Started
                </Link>
              </div>

              {/* Mobile menu button */}
              <button 
                className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
                  scrolled ? 'bg-gray-100' : 'bg-white/20'
                } menu-button`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <FaTimes className={scrolled ? 'text-gray-700' : 'text-white'} size={20} />
                ) : (
                  <FaBars className={scrolled ? 'text-gray-700' : 'text-white'} size={20} />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed top-20 right-4 z-50 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl py-4 md:hidden mobile-menu">
            {['Features', 'How It Works', 'Testimonials', 'About', 'Policies'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="block px-6 py-3 text-gray-700 font-medium transition-all duration-300 hover:bg-blue-50 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="px-6 pt-4 border-t border-gray-200">
              <Link
                to="/login"
                className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}

        {/* Hero Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm text-white">
              <FaStar className="text-amber-400" />
              <span>Trusted by {safeFormatNumber(stats.users)}+ Students</span>
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                {slides[currentSlide].title}
              </span>
            </h1>
            
            <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-100 lg:text-2xl">
              {slides[currentSlide].subtitle}
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/signup"
                className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Create Free Account
                  <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
              
              <Link
                to="/features"
                className="group bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white/30 hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <FaPlay className="text-sm" />
                  Watch Demo
                </span>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {[
                { value: stats.users, label: 'Active Students' },
                { value: stats.questions, label: 'Past Questions' },
                { value: stats.downloads, label: 'Resources' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-white sm:text-3xl">
                    {safeFormatNumber(stat.value)}+
                  </div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 transform space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all duration-500 ${
                currentSlide === index
                  ? 'w-8 bg-white'
                  : 'w-3 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2">
          <div className="animate-bounce">
            <div className="h-6 w-px bg-white/60"></div>
          </div>
        </div>
      </header>

      {/* Trust Badges */}
      <section className="bg-white py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <p className="text-gray-500 text-sm font-medium">Trusted by students from</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="text-center text-gray-400 font-semibold text-lg">
                University {i + 1}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Excel</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and resources designed to transform your academic journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {feature.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: stats.users, label: 'Current Users', suffix: '+', color: 'from-blue-400 to-cyan-400' },
              { value: stats.questions, label: 'Past Questions', suffix: '+', color: 'from-purple-400 to-pink-400' },
              { value: stats.downloads, label: 'Resources Downloadable', suffix: '+', color: 'from-green-400 to-blue-400' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {safeFormatNumber(stat.value)}{stat.suffix}
                </div>
                <div className="text-xl text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Affilate />

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">PetroX</span> Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in minutes and unlock your academic potential
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShGiNXczSdhTVmzY7W3nf4y7imrrf5NZhGhA&s" 
                  alt="PetroX Platform" 
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500 rounded-2xl opacity-10 animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500 rounded-2xl opacity-10 animate-pulse delay-1000"></div>
            </div>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start group">
                  <div className="flex-shrink-0 relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      {index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-8 bg-gradient-to-b from-blue-500 to-purple-600"></div>
                    )}
                  </div>
                  
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* CTA Card */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Ready to get started?</h3>
                <p className="text-blue-100 mb-6">
                  Join thousands of students already using PetroX
                </p>
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
                >
                  Sign Up Free
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <FaRobot className="text-blue-600" />
                AI-Powered Learning
              </div>

              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Meet <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">PetroMark AI</span>
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Your personal AI tutor that adapts to your learning style and helps you master complex subjects through intelligent, interactive assistance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {aiBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaCheckCircle className="text-green-600 text-sm" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/petromark"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                <FaRobot />
                Try PetroMark Now
              </Link>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-xl">
                {/* AI Chat Interface */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <FaRobot />
                      </div>
                      <div>
                        <div className="font-semibold">PetroMark AI</div>
                        <div className="text-blue-100 text-sm">Online • Ready to help</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <FaRobot className="text-blue-600 text-sm" />
                      </div>
                      <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3">
                        <p className="text-gray-700">Hi! I'm PetroMark. How can I help with your studies today?</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 justify-end">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl rounded-tr-none px-4 py-3 max-w-xs">
                        <p className="text-white">Can you explain quantum physics concepts?</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {aiFeatures.slice(0, 4).map((feature, index) => (
                        <div key={index} className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-xs text-blue-700 font-medium">{feature}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              What Students Say
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Hear from students who have transformed their academic journey with PetroX
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 group"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-blue-200 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="relative">
                  <FaQuoteLeft className="text-blue-300/40 text-2xl mb-4" />
                  <p className="text-blue-100 leading-relaxed mb-6">"{testimonial.quote}"</p>
                  
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Academic Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful students who are already achieving their academic goals with PetroX.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-2xl"
            >
              Start Learning Free
            </Link>
            <Link
              to="/features"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Explore Features
            </Link>
          </div>
          
          <p className="text-blue-200 mt-6 text-sm">
            No credit card required • Free forever plan
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-2 mr-3">
                  <h1 className="text-xl font-bold text-white">PX</h1>
                </div>
                <h1 className="text-2xl font-bold">
                  <span className="text-white">PETRO</span>
                  <span className="text-amber-400">X</span>
                </h1>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                The ultimate academic platform for students seeking excellence and success in their educational journey.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold text-lg mb-6">Resources</h4>
              <ul className="space-y-3">
                {resources.map((resource, index) => (
                  <li key={index}>
                    <a
                      href={resource.url}
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {resource.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold text-lg mb-6">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/policies" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/policies" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/about#contact" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-bold text-lg mb-6">Stay Updated</h4>
              <p className="text-gray-400 mb-4">
                Get the latest updates and academic tips
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-l-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-r-lg font-semibold hover:opacity-90 transition-opacity duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-500">
              &copy; {new Date().getFullYear()} PetroX. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Data arrays (unchanged functionality)
const features = [
  {
    icon: <FaBook />,
    title: 'Study Materials',
    description: 'Access thousands of resources, textbooks, and past questions for all subjects.',
    tags: ['Resources', 'Textbooks', 'Past Questions']
  },
  {
    icon: <FaUsers />,
    title: 'Group Tests',
    description: 'Create and join collaborative tests with peers to prepare for exams.',
    tags: ['Collaborative', 'Real-time', 'Custom Tests']
  },
  {
    icon: <FaComments />,
    title: 'Live Chat',
    description: 'Connect with other students for study sessions and discussions.',
    tags: ['Real-time', 'Study Groups', 'Collaboration']
  },
  {
    icon: <FaCompass />,
    title: 'Campus Compass',
    description: 'Navigate campus with our interactive map and location services.',
    tags: ['Navigation', 'Maps', 'Location']
  },
  {
    icon: <FaFileUpload />,
    title: 'Material Upload',
    description: 'Share study materials and earn recognition for contributions.',
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
    description: 'Set up your academic profile in minutes with our intuitive onboarding process.'
  },
  {
    title: 'Access Resources',
    description: 'Browse our extensive library of textbooks, study materials, and past questions.'
  },
  {
    title: 'Join Study Groups',
    description: 'Connect with peers, create collaborative sessions, and learn together.'
  },
  {
    title: 'Take Tests & Download',
    description: 'Complete timed exams, download resources, and track your progress.'
  },
  {
    title: 'Track Progress',
    description: 'Use our advanced analytics to monitor your academic journey and improvements.'
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Medical Student',
    quote: 'The campus compass saved me so much time finding my classes. PetroX transformed how I navigate campus and prepare for exams.'
  },
  {
    name: 'David Chen',
    role: 'Engineering Student',
    quote: 'I downloaded 42 past questions last semester. The GP calculator and PetroMark AI helped me improve my GPA significantly.'
  },
  {
    name: 'Amanda Rodriguez',
    role: 'Law Student',
    quote: 'Creating group tests with friends made studying enjoyable. Finding quality study materials used to take hours. With PetroX, everything is in one place.'
  },
  {
    name: 'GIDEON OJUMIRAYO A.',
    role: 'Geology Student',
    quote: 'The website is an excellent resource for students, especially those in 100 level. The tests provided are well-structured, engaging, and highly beneficial for academic growth.'
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
