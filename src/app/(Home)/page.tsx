"use client";
import {
  IconArrowRight,
  IconBolt,
  IconBook,
  IconBrain,
  IconCpu,
  IconDownload,
  IconPlayCard,
  IconSparkles,
  IconTarget,
  IconUpload,
  IconUser,
  IconVideo,
} from "@tabler/icons-react";
import Link from "next/link";

const features = [
  {
    icon: IconBrain,
    title: "AI-Powered Summaries",
    description:
      "Get instant, intelligent summaries of any video content with key insights highlighted.",
  },
  {
    icon: IconSparkles,
    title: "Smart Highlights",
    description:
      "Automatically extract the most important moments and concepts from hours of content.",
  },
  {
    icon: IconBook,
    title: "Interactive Quizzes",
    description:
      "Test your knowledge with auto-generated quizzes based on video content.",
  },
  {
    icon: IconTarget,
    title: "Precision Learning",
    description:
      "Focus on what matters most with timestamped references and topic breakdowns.",
  },
  {
    icon: IconBolt,
    title: "Lightning Fast",
    description:
      "Process videos in seconds, not hours. Get insights faster than ever before.",
  },
  {
    icon: IconUser,
    title: "Collaborative Tools",
    description:
      "Share summaries, notes, and quizzes with your team or study group.",
  },
];
const steps = [
  {
    icon: IconUpload,
    number: "01",
    title: "Upload Your Video",
    description:
      "Paste a YouTube link or upload any video file. We support all major formats.",
  },
  {
    icon: IconCpu,
    number: "02",
    title: "AI Processing",
    description:
      "Our advanced AI analyzes the content, extracting key insights and concepts.",
  },
  {
    icon: IconDownload,
    number: "03",
    title: "Get Your Results",
    description:
      "Receive structured summaries, highlights, and quizzes instantly.",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          id="hero-background"
          style={{
            backgroundImage: `url(./assets/hero-bg-light.jpg)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-bg-base-100/90 via-bg-base-100/80 to-bg-base-100" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Turn Videos into <span className="gradient-text">Knowledge</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              AI-powered platform that transforms video content into structured
              summaries, highlights, and quizzes. Perfect for students,
              professionals, and content creators.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/signup" className="btn btn-accent">
                Get Started Free
                <IconArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="btn btn-outline btn-secondary">
                <IconPlayCard className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span>10,000+ videos processed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>Trusted by 5,000+ users</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>
      <section id="features" className="py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything you need to{" "}
              <span className="gradient-text">learn faster</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Transform the way you consume video content with our powerful
              AI-driven features
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card p-6 bg-base-300 hover:shadow-lg transition-shadow group"
              >
                <div className="mb-4 p-3 rounded-lg bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="how-it-works" className="py-24 px-6 bg-base-300/30">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How <span className="gradient-text">It Works</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to transform any video into actionable
              knowledge
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="p-8 card border hover:border-primary/50 transition-all duration-300 h-full">
                  <div className="mb-6">
                    <div className="text-6xl font-bold text-primary/20 mb-4">
                      {step.number}
                    </div>
                    <div className="p-4 rounded-lg bg-primary/10 w-fit">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-secondary" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 px-6 h-[calc(100vh-4rem)]">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 p-12 md:p-16 text-center border border-primary/30">
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Learning?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of students and professionals who are learning
                smarter, not harder.
              </p>
              <button className="btn btn-accent btn-xl group">
                Start Free Trial
                <IconArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-sm text-muted-foreground mt-4">
                No credit card required • Cancel anytime
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
          </div>
        </div>
      </section>
      <footer className="py-12 px-6 border-t border bg-base-300">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <IconVideo className="w-8 h-8 text-primary" />
                <span className="text-xl font-bold gradient-text">
                  NeuroStream
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Turn videos into knowledge with AI-powered summaries and
                insights.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#features"
                    className="hover:text-foreground transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-foreground transition-colors"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-foreground transition-colors"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#about"
                    className="hover:text-foreground transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#blog"
                    className="hover:text-foreground transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#careers"
                    className="hover:text-foreground transition-colors"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#privacy"
                    className="hover:text-foreground transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#terms"
                    className="hover:text-foreground transition-colors"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} NeuroStream. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
