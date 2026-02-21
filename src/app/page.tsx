"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth-store";
import {
  Users,
  UserCheck,
  BarChart3,
  Shield,
  RefreshCw,
  Zap,
  ArrowRight,
  Star,
  CheckCircle,
} from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const features = [
  {
    icon: Users,
    title: "Follower Tracking",
    description: "See exactly who follows you and who unfollowed — updated in real time.",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    icon: UserCheck,
    title: "Mutual Detection",
    description: "Instantly discover mutual followers and non-followers at a glance.",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    icon: BarChart3,
    title: "Growth Analytics",
    description: "Interactive charts and insights to understand your growth patterns.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: RefreshCw,
    title: "Auto Sync",
    description: "Set it and forget it — your follower data updates automatically.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data is encrypted and never shared. We take privacy seriously.",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built for speed — get instant results even with thousands of followers.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "50M+", label: "Followers Tracked" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.9★", label: "User Rating" },
];

export default function LandingPage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="absolute top-1/4 -left-20 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-primary/15 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-accent/15 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-success/10 blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm mb-6 sm:mb-8">
              <Star className="h-4 w-4 text-warning fill-warning" />
              <span className="text-muted-foreground">
                Trusted by 10,000+ Instagram users
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Know Who{" "}
              <span className="gradient-text">Follows</span>
              {" "}You — And Who{" "}
              <span className="gradient-text">Doesn&apos;t</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
              Track followers, detect unfollowers, find mutuals, and analyze your Instagram growth — all in one beautiful dashboard.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto text-base px-8 shadow-xl shadow-primary/20">
                    Go to Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/register">
                    <Button size="lg" className="w-full sm:w-auto text-base px-8 shadow-xl shadow-primary/20">
                      Get Started Free
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto text-base px-8">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold">
              Everything You Need to{" "}
              <span className="gradient-text">Grow</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Powerful tools designed to help you understand and grow your Instagram presence.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={item}>
                <Card hover className="h-full p-6 sm:p-8">
                  <div className={`rounded-2xl ${feature.bg} p-3 w-fit mb-4`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 sm:py-24 bg-card/50 border-y">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold">
              Simple, Transparent{" "}
              <span className="gradient-text">Pricing</span>
            </h2>
            <p className="mt-4 text-muted-foreground">Start free. Upgrade when you need more.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Free */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 sm:p-8 h-full flex flex-col">
                <h3 className="text-xl font-bold">Free</h3>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3 flex-1">
                  {["Up to 1,000 followers", "Daily sync", "Basic analytics", "Mutual detection"].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-success shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="mt-6">
                  <Button variant="outline" className="w-full">Get Started</Button>
                </Link>
              </Card>
            </motion.div>

            {/* Pro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 sm:p-8 h-full flex flex-col border-primary/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-xl">
                  POPULAR
                </div>
                <h3 className="text-xl font-bold">Pro</h3>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-bold">$9</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3 flex-1">
                  {["Unlimited followers", "Hourly sync", "Advanced analytics", "Export data (CSV/JSON)", "Priority support", "Unfollower alerts"].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-success shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="mt-6">
                  <Button className="w-full">Upgrade to Pro</Button>
                </Link>
              </Card>
            </motion.div>

            {/* Enterprise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 sm:p-8 h-full flex flex-col">
                <h3 className="text-xl font-bold">Enterprise</h3>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3 flex-1">
                  {["Everything in Pro", "Multi-account", "API access", "Custom reports", "Dedicated support", "White-label option"].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-success shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="mt-6">
                  <Button variant="outline" className="w-full">Contact Sales</Button>
                </Link>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl gradient-bg p-8 sm:p-12 lg:p-16 text-center text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Ccircle%20cx%3D%221%22%20cy%3D%221%22%20r%3D%221%22%20fill%3D%22rgba(255%2C255%2C255%2C0.1)%22/%3E%3C/svg%3E')] opacity-30" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Track Your Followers?
              </h2>
              <p className="text-white/80 max-w-md mx-auto mb-8">
                Join thousands of Instagram users who trust FollowTracker for their growth analytics.
              </p>
              <Link href={isAuthenticated ? "/dashboard" : "/register"}>
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 shadow-xl text-base px-8"
                >
                  {isAuthenticated ? "Go to Dashboard" : "Start Free — No Credit Card"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
