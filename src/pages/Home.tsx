import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Star,
  PlayCircle,
  Brain,
  Zap,
  Target,
  Shield,
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
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/hooks/useLanguage";
import img from "../assets/math-bg.jpg";

// CountUp Animation Component
interface CountUpProps {
  target: number;
  suffix?: string;
  duration?: number;
  isVisible?: boolean;
}

const CountUp = ({
  target,
  suffix = "",
  duration = 2000,
  isVisible = false,
}: CountUpProps) => {
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
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const Home = () => {
  const { t } = useTranslation();
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

    const statsSection = document.getElementById("stats-section");
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Brain,
      title: t("home.features.adaptive.title"),
      description: t("home.features.adaptive.description"),
    },
    {
      icon: Zap,
      title: t("home.features.interactive.title"),
      description: t("home.features.interactive.description"),
    },
    {
      icon: Target,
      title: t("home.features.gamified.title"),
      description: t("home.features.gamified.description"),
    },
    {
      icon: Shield,
      title: t("home.features.bilingual.title"),
      description: t("home.features.bilingual.description"),
    },
  ];

  const stats = [
    { number: 50, suffix: "K+", label: t("home.stats.students") },
    { number: 1000, suffix: "+", label: t("home.stats.problems") },
    { number: 95, suffix: "%", label: t("home.stats.success") },
    { number: 24, suffix: "/7", label: t("home.stats.support") },
  ];

  const testimonials = [
    {
      name: t("home.testimonials.sarah.name"),
      role: t("home.testimonials.sarah.role"),
      content: t("home.testimonials.sarah.content"),
      rating: 5,
    },
    {
      name: t("home.testimonials.mohammed.name"),
      role: t("home.testimonials.mohammed.role"),
      content: t("home.testimonials.mohammed.content"),
      rating: 4,
    },
    {
      name: t("home.testimonials.lisa.name"),
      role: t("home.testimonials.lisa.role"),
      content: t("home.testimonials.lisa.content"),
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-olive backdrop-blur-lg border-b border-primary-200/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 me-2">
              <div className="relative p-3 rounded-2xl olive-gradient group-hover:shadow-lg group-hover:shadow-primary-200 transition-all duration-300">
                <Leaf className="h-7 w-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gradient-olive">
                  {t("navigation.gauss")}
                </span>
                <span className="text-xs text-sage-600 font-medium -mt-1">
                  {t("navigation.platform")}
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center justify-between space-x-8 gap-8 ">
              <Link
                to="/about"
                className="text-sage-700 hover:text-primary-700 transition-colors font-medium"
              >
                {t("navigation.about")}
              </Link>
              <Link
                to="/lessons"
                className="text-sage-700 hover:text-primary-700 transition-colors font-medium"
              >
                {t("navigation.lessons")}
              </Link>
              <Link
                to="/contact"
                className="text-sage-700 hover:text-primary-700 transition-colors font-medium"
              >
                {t("navigation.contact")}
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="text-sage-700 hover:text-primary-700 hover:bg-primary-50"
                >
                  {t("navigation.signIn")}
                </Button>
              </Link>
              <Link to="/register">
                <Button className="btn-olive-gradient border-0">
                  {t("navigation.getStarted")}
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
              {t("home.hero.badge")}
            </Badge>

            <div className="flex flex-col items-center justify-center text-4xl md:text-7xl font-bold mb-6 leading-tight">
              <h1>{t("home.title")}</h1>
              <span className="text-gradient-olive">{t("home.subtitle")}</span>
            </div>

            <p className="text-xl md:text-2xl text-sage-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t("home.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/register">
                <Button
                  size="lg"
                  className="btn-olive-gradient text-lg px-8 py-6 border-0"
                >
                  {t("home.getStarted")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" className="btn-outline-olive text-lg px-8 py-6">
                <PlayCircle className="mr-2 h-5 w-5" />
                {t("home.learnMore")}
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
      <section
        id="stats-section"
        className="py-20 glass-olive backdrop-blur-sm"
      >
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
                  <CountUp
                    target={stat.number}
                    suffix={stat.suffix}
                    duration={2000}
                    isVisible={statsInView}
                  />
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-sage-700">
              {t("home.features.title")}
            </h2>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto">
              {t("home.features.subtitle")}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-sage-700">
              {t("home.testimonials.title")}
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
            {t("home.cta.title")}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {t("home.cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6 bg-white text-primary-700 hover:bg-primary-50 border-0 font-semibold"
              >
                {t("home.cta.startTrial")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 text-white bg-primary-700 border-primary-700 hover:bg-white hover:text-primary-700 hover:border-white border-2 font-semibold"
              >
                {t("home.cta.contactSales")}
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
                {t("home.footer.description")}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">
                {t("home.footer.product")}
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/lessons"
                    className="hover:text-accent-400 transition-colors"
                  >
                    {t("home.footer.lessons")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="hover:text-accent-400 transition-colors"
                  >
                    {t("home.footer.dashboard")}
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-accent-400 transition-colors"
                  >
                    {t("home.footer.pricing")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">
                {t("home.footer.company")}
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-accent-400 transition-colors"
                  >
                    {t("home.footer.about")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-accent-400 transition-colors"
                  >
                    {t("home.footer.contact")}
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-accent-400 transition-colors"
                  >
                    {t("home.footer.careers")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">
                {t("home.footer.support")}
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-accent-400 transition-colors"
                  >
                    {t("home.footer.helpCenter")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-accent-400 transition-colors"
                  >
                    {t("home.footer.community")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-accent-400 transition-colors"
                  >
                    {t("home.footer.status")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary-700 mt-8 pt-8 text-center text-sm">
            <p>{t("home.footer.copyright")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
