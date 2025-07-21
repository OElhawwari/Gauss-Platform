import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Users,
  Star,
  PlayCircle,
  Brain,
  Zap,
  Target,
  Shield,
  Award,
  ChevronDown,
  Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import img from "../assets/math-bg.jpg";

// CountUp Animation Component
interface CountUpProps {
  target: number;
  suffix?: string;
  duration?: number;
  isVisible?: boolean;
}

const CountUp = ({ target, suffix = "", duration = 2000, isVisible = false }: CountUpProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | undefined;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentCount = Math.floor(target * easeOutExpo);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [target, duration, isVisible]);

  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [statsInView, setStatsInView] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Intersection Observer for stats section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Brain,
      title: "Adaptive Learning",
      description:
        "AI-powered lessons that adapt to your unique learning style and pace for optimal understanding.",
    },
    {
      icon: Zap,
      title: "Interactive Visualizations",
      description:
        "Stunning 3D math visualizations and interactive problem-solving tools to make abstract concepts clear.",
    },
    {
      icon: Target,
      title: "Gamified Progress",
      description:
        "Earn achievements, unlock new levels, and track your progress with our engaging gamification system.",
    },
    {
      icon: Shield,
      title: "Bilingual Support",
      description:
        "Full Arabic and English language support for inclusive learning across different cultures.",
    },
  ];

  const stats = [
    { number: 50, suffix: "K+", label: "Students Learning" },
    { number: 1000, suffix: "+", label: "Math Problems" },
    { number: 95, suffix: "%", label: "Success Rate" },
    { number: 24, suffix: "/7", label: "AI Support" },
  ];

  const testimonials = [
    {
      name: "Sarah Ahmed",
      role: "High School Student",
      content:
        "Gauss Platform made calculus actually enjoyable! The visualizations helped me understand derivatives in a way textbooks never could.",
      rating: 5,
    },
    {
      name: "Dr. Mohammed Hassan",
      role: "Mathematics Professor",
      content:
        "I recommend Gauss Platform to all my students. The adaptive learning technology is revolutionary.",
      rating: 4,
    },
    {
      name: "Lisa Chen",
      role: "Parent",
      content:
        "My daughter's confidence in math has skyrocketed since using Gauss Platform. The progress tracking is fantastic.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-olive backdrop-blur-lg border-b border-primary-200/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative p-3 rounded-2xl olive-gradient group-hover:shadow-lg group-hover:shadow-primary-200 transition-all duration-300">
                <Leaf className="h-7 w-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gradient-olive">
                  Gauss
                </span>
                <span className="text-xs text-sage-600 font-medium -mt-1">
                  Platform
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/about"
                className="text-sage-700 hover:text-primary-700 transition-colors font-medium"
              >
                About
              </Link>
              <Link
                to="/lessons"
                className="text-sage-700 hover:text-primary-700 transition-colors font-medium"
              >
                Lessons
              </Link>
              <Link
                to="/contact"
                className="text-sage-700 hover:text-primary-700 transition-colors font-medium"
              >
                Contact
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="text-sage-700 hover:text-primary-700 hover:bg-primary-50"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="btn-olive-gradient border-0">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 hero-bg">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Badge className="mb-6 bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700 border-primary-200">
              AI-Powered Math Learning Platform
            </Badge>

            <div className="flex flex-col items-center justify-center text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <h1>Master Math with</h1>
              <span className="text-gradient-olive">Intelligent Learning</span>
            </div>

            <p className="text-xl md:text-2xl text-sage-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience the future of mathematics education with our AI-powered
              platform that adapts to your learning style and makes complex
              concepts simple.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/register">
                <Button
                  size="lg"
                  className="btn-olive-gradient text-lg px-8 py-6 border-0"
                >
                  Start Learning Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" className="btn-outline-olive text-lg px-8 py-6">
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-20"
          >
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute inset-0 olive-gradient rounded-3xl blur-3xl opacity-20 " />
              <div className="relative glass-olive rounded-3xl p-8 shadow-2xl cursor-not-allowed">
                <div className="relative aspect-video border-2 border-primary-200 overflow-hidden rounded-2xl flex items-center justify-center">
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover absolute inset-0 -z-10 rounded-2xl blur-[2px] opacity-50"
                  />
                  <div className="text-center">
                    <PlayCircle className="h-16 w-16 text-primary-600 mx-auto mb-4" />
                    <p className="text-sage-700 font-semibold">
                      Interactive Math Visualization Demo
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats-section" className="py-20 glass-olive backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-gradient-olive mb-2">
                  <CountUp target={stat.number} suffix={stat.suffix} duration={2000} isVisible={statsInView} />
                </div>
                <div className="text-sage-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose{" "}
              <span className="text-gradient-olive">Gauss Platform?</span>
            </h2>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto">
              Our cutting-edge technology and pedagogical expertise combine to
              create the most effective math learning experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              >
                <Card className="modern-card h-full hover:scale-105 transition-all duration-300 cursor-pointer">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-100 to-accent-100 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <CardTitle className="text-xl text-sage-800">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sage-600 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our <span className="text-gradient-olive">Students Say</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
              >
                <Card className="modern-card h-full">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-sage-600 mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <p className="font-semibold text-sage-800">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-sage-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 olive-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Math Skills?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of students who have already revolutionized their
            learning with Gauss Platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6 bg-white text-primary-700 hover:bg-primary-50 border-0 font-semibold"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 text-white bg-primary-700 border-primary-700 hover:bg-white hover:text-primary-700 hover:border-white border-2 font-semibold"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-secondary-800 text-gray-300">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative p-2 rounded-lg olive-gradient">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-white">Gauss</span>
                  <span className="text-xs text-gray-400 -mt-1">Platform</span>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Revolutionizing mathematics education through intelligent
                learning technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/lessons"
                    className="hover:text-accent-400 transition-colors"
                  >
                    Lessons
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="hover:text-accent-400 transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-accent-400 transition-colors"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-accent-400 transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-accent-400 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-accent-400 transition-colors"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-accent-400 transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-accent-400 transition-colors"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-accent-400 transition-colors"
                  >
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary-700 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 Gauss Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
