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
      gradient: 'from-black/90 via-black/70 to-black/40'
    },
    {
      title: 'Master Your Subjects',
      subtitle: 'Personalized learning with PetroMark AI assistant',
      image: 'https://plus.unsplash.com/premium_photo-1683135216954-ab7130031b44?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxhY2slMjBzdHVkZW50c3xlbnwwfHwwfHx8MA%3D%3D',
      gradient: 'from-black/90 via-zinc-900/70 to-black/40'
    },
    {
      title: 'Access 538+ Past Questions',
      subtitle: 'Comprehensive exam preparation resources',
      image: image1,
      gradient: 'from-black/90 via-black/70 to-amber-950/30'
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
          users: data.total_users ?? 299,
          questions: data.total_questions ?? 880,
          downloads: data.total_downloads ?? 20
        });
      } else {
        setStats({
          users: 299,
          questions: 880,
          downloads: 20
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats({
        users: 299,
        questions: 880,
        downloads: 20
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();

    // Wake up the backend by pinging the admin endpoint
    const wakeBackend = async () => {
      try {
        await fetch('https://petroxtestbackend.onrender.com/admin', { method: 'GET' });
        console.log('Backend wake-up ping sent');
      } catch (error) {
        // Silent fail - don't block page load if ping fails
        console.log('Backend wake-up ping failed (non-blocking):', error);
      }
    };

    wakeBackend();
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

  // Cosmetic only: load the display/body typefaces used by the new theme.
  useEffect(() => {
    const linkId = 'petrox-theme-fonts';
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  const displayFont = { fontFamily: "'Fraunces', serif" };
  const bodyFont = { fontFamily: "'Inter', sans-serif" };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black" style={bodyFont}>
        <div className="text-center">
          <div className="relative mx-auto mb-6">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-amber-500 border-t-transparent"></div>
            <div className="absolute inset-0 h-16 w-16 animate-ping rounded-full border-4 border-amber-400/60 opacity-60"></div>
          </div>
          <h1 className="text-4xl font-bold tracking-wider text-white mb-2" style={displayFont}>
            <span className="text-white">PETRO</span>
            <span className="text-amber-400">X</span>
          </h1>
          <p className="text-zinc-400 font-light tracking-wide">Preparing your learning experience</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black overflow-x-hidden" style={bodyFont}>
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
                className="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale-[15%]"
                style={{ backgroundImage: `url(${slide.image})` }}
              ></div>
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}></div>
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <nav
          className={`fixed z-50 w-full transition-all duration-500 ${
            scrolled
              ? 'bg-black/90 backdrop-blur-xl shadow-lg shadow-black/50 py-2 border-b border-amber-500/10'
              : 'bg-transparent py-4'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <div className={`rounded-lg p-2 ${
                  scrolled ? 'bg-zinc-900 border border-amber-500/20' : 'bg-white/10'
                }`}>
                  <h1 className="text-2xl font-bold tracking-tight" style={displayFont}>
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
                    className="font-medium text-zinc-300 hover:text-amber-400 transition-all duration-300"
                  >
                    {item}
                  </a>
                ))}
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-6 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20"
                >
                  Get Started
                </Link>
              </div>

              {/* Mobile menu button */}
              <button
                className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
                  scrolled ? 'bg-zinc-900 border border-amber-500/20' : 'bg-white/10'
                } menu-button`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <FaTimes className="text-white" size={20} />
                ) : (
                  <FaBars className="text-white" size={20} />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed top-20 right-4 z-50 w-64 bg-zinc-950/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/60 border border-amber-500/10 py-4 md:hidden mobile-menu">
            {['Features', 'How It Works', 'Testimonials', 'About', 'Policies'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="block px-6 py-3 text-zinc-300 font-medium transition-all duration-300 hover:bg-amber-500/10 hover:text-amber-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="px-6 pt-4 border-t border-zinc-800">
              <Link
                to="/login"
                className="block w-full text-center bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-4 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105"
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
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/5 border border-amber-500/20 backdrop-blur-sm px-4 py-2 text-sm text-zinc-200">
              <FaStar className="text-amber-400" />
              <span>Trusted by {safeFormatNumber(stats.users)}+ Students</span>
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl" style={displayFont}>
              <span className="bg-gradient-to-r from-white via-zinc-100 to-amber-200 bg-clip-text text-transparent">
                {slides[currentSlide].title}
              </span>
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-xl text-zinc-300 lg:text-2xl">
              {slides[currentSlide].subtitle}
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/signup"
                className="group relative bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Create Free Account
                  <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>

              <Link
                to="/features"
                className="group bg-white/5 backdrop-blur-sm border border-white/10 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-amber-500/30 hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <FaPlay className="text-sm text-amber-400" />
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
                  <div className="text-2xl font-bold text-amber-400 sm:text-3xl" style={displayFont}>
                    {safeFormatNumber(stat.value)}+
                  </div>
                  <div className="text-sm text-zinc-400">{stat.label}</div>
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
                  ? 'w-8 bg-amber-400'
                  : 'w-3 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2">
          <div className="animate-bounce">
            <div className="h-6 w-px bg-amber-400/60"></div>
          </div>
        </div>
      </header>

      {/* Trust Badges */}
      <section className="bg-black py-8 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <p className="text-zinc-500 text-sm font-medium tracking-wide">Trusted by students from</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-50">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="text-center text-zinc-500 font-semibold text-lg" style={displayFont}>
                University {i + 1}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-amber-500 text-sm font-semibold tracking-[0.2em] uppercase mb-3">— What's Inside</p>
            <h2 className="text-4xl font-bold text-white mb-4" style={displayFont}>
              Everything You Need to <span className="text-amber-400">Excel</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Comprehensive tools and resources designed to transform your academic journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-zinc-950 rounded-2xl p-8 shadow-sm hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-500 border border-zinc-800 hover:border-amber-500/30"
              >
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-2xl flex items-center justify-center text-black text-2xl mb-6 group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3" style={displayFont}>
                    {feature.title}
                  </h3>

                  <p className="text-zinc-400 mb-4 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {feature.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full text-xs font-medium border border-amber-500/10"
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
      <section className="py-20 bg-zinc-950 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: stats.users, label: 'Current Users' },
              { value: stats.questions, label: 'Past Questions' },
              { value: stats.downloads, label: 'Resources Downloadable' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div
                  className="text-5xl font-bold bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={displayFont}
                >
                  {safeFormatNumber(stat.value)}+
                </div>
                <div className="text-xl text-zinc-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Affilate />

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-amber-500 text-sm font-semibold tracking-[0.2em] uppercase mb-3">— The Process</p>
            <h2 className="text-4xl font-bold text-white mb-4" style={displayFont}>
              How <span className="text-amber-400">PetroX</span> Works
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Get started in minutes and unlock your academic potential
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-zinc-950 rounded-2xl shadow-xl border border-zinc-800 p-8">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShGiNXczSdhTVmzY7W3nf4y7imrrf5NZhGhA&s"
                  alt="PetroX Platform"
                  className="w-full h-auto rounded-xl shadow-lg grayscale-[10%]"
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-amber-500 rounded-2xl opacity-10 animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-amber-400 rounded-2xl opacity-10 animate-pulse delay-1000"></div>
            </div>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start group">
                  <div className="flex-shrink-0 relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-xl flex items-center justify-center text-black font-bold text-lg group-hover:scale-110 transition-transform duration-300 shadow-lg" style={displayFont}>
                      {index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-8 bg-gradient-to-b from-amber-500/60 to-transparent"></div>
                    )}
                  </div>

                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-white mb-2" style={displayFont}>
                      {step.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* CTA Card */}
              <div className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded-2xl p-8 text-black">
                <h3 className="text-2xl font-bold mb-2" style={displayFont}>Ready to get started?</h3>
                <p className="text-black/70 mb-6">
                  Join thousands of students already using PetroX
                </p>
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 bg-black text-amber-400 px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
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
      <section className="py-20 bg-zinc-950 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <FaRobot />
                AI-Powered Learning
              </div>

              <h2 className="text-4xl font-bold text-white mb-6" style={displayFont}>
                Meet <span className="text-amber-400">PetroMark AI</span>
              </h2>

              <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
                Your personal AI tutor that adapts to your learning style and helps you master complex subjects through intelligent, interactive assistance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {aiBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaCheckCircle className="text-amber-400 text-sm" />
                    </div>
                    <span className="text-zinc-300">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/petromark"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-amber-500/20"
              >
                <FaRobot />
                Try PetroMark Now
              </Link>
            </div>

            <div className="relative">
              <div className="bg-black rounded-2xl p-8 shadow-xl border border-zinc-800">
                {/* AI Chat Interface */}
                <div className="bg-zinc-950 rounded-xl shadow-lg overflow-hidden border border-zinc-800">
                  <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-4 text-black">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center">
                        <FaRobot />
                      </div>
                      <div>
                        <div className="font-semibold">PetroMark AI</div>
                        <div className="text-black/70 text-sm">Online • Ready to help</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <FaRobot className="text-amber-400 text-sm" />
                      </div>
                      <div className="bg-zinc-900 rounded-2xl rounded-tl-none px-4 py-3">
                        <p className="text-zinc-200">Hi! I'm PetroMark. How can I help with your studies today?</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 justify-end">
                      <div className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded-2xl rounded-tr-none px-4 py-3 max-w-xs">
                        <p className="text-black">Can you explain quantum physics concepts?</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {aiFeatures.slice(0, 4).map((feature, index) => (
                        <div key={index} className="text-center p-3 bg-zinc-900 border border-zinc-800 rounded-lg">
                          <div className="text-xs text-amber-400 font-medium">{feature}</div>
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
      <section id="testimonials" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-amber-500 text-sm font-semibold tracking-[0.2em] uppercase mb-3">— Real Stories</p>
            <h2 className="text-4xl font-bold text-white mb-4" style={displayFont}>
              What Students Say
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Hear from students who have transformed their academic journey with PetroX
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-zinc-950 rounded-2xl p-8 border border-zinc-800 hover:border-amber-500/30 transition-all duration-500 group"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center text-black font-bold text-lg mr-4" style={displayFont}>
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white" style={displayFont}>{testimonial.name}</h4>
                    <p className="text-zinc-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                <div className="relative">
                  <FaQuoteLeft className="text-amber-500/30 text-2xl mb-4" />
                  <p className="text-zinc-300 leading-relaxed mb-6">"{testimonial.quote}"</p>

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
      <section className="py-20 bg-gradient-to-b from-black via-zinc-950 to-black border-t border-amber-500/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6" style={displayFont}>
            Ready to Transform Your Academic Journey?
          </h2>
          <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
            Join thousands of successful students who are already achieving their academic goals with PetroX.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/signup"
              className="bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-2xl shadow-amber-500/20"
            >
              Start Learning Free
            </Link>
            <Link
              to="/features"
              className="border-2 border-amber-500/40 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all duration-300"
            >
              Explore Features
            </Link>
          </div>

          <p className="text-zinc-500 mt-6 text-sm">
            No credit card required • Free forever plan
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-amber-400 to-yellow-600 rounded-lg p-2 mr-3">
                  <h1 className="text-xl font-bold text-black" style={displayFont}>PX</h1>
                </div>
                <h1 className="text-2xl font-bold" style={displayFont}>
                  <span className="text-white">PETRO</span>
                  <span className="text-amber-400">X</span>
                </h1>
              </div>
              <p className="text-zinc-500 mb-6 leading-relaxed">
                The ultimate academic platform for students seeking excellence and success in their educational journey.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-500/30 transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold text-lg mb-6" style={displayFont}>Resources</h4>
              <ul className="space-y-3">
                {resources.map((resource, index) => (
                  <li key={index}>
                    <a
                      href={resource.url}
                      className="text-zinc-500 hover:text-amber-400 transition-colors duration-300"
                    >
                      {resource.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold text-lg mb-6" style={displayFont}>Legal</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/policies" className="text-zinc-500 hover:text-amber-400 transition-colors duration-300">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/policies" className="text-zinc-500 hover:text-amber-400 transition-colors duration-300">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-zinc-500 hover:text-amber-400 transition-colors duration-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-zinc-500 hover:text-amber-400 transition-colors duration-300">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-bold text-lg mb-6" style={displayFont}>Stay Updated</h4>
              <p className="text-zinc-500 mb-4">
                Get the latest updates and academic tips
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-l-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/50"
                />
                <button className="bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-6 py-3 rounded-r-lg font-semibold hover:opacity-90 transition-opacity duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-900 mt-12 pt-8 text-center">
            <p className="text-zinc-600">
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
  { name: 'CEO DESKS', url: 'https://petrox-test-frontend.onrender.com/about' }
];

export default LandingPage;
