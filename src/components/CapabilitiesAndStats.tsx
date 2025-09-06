"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mic, Bot, BarChart3, Brain, Sparkles } from "lucide-react";

interface Capability {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  aiTag: string;
  gradient: string;
  hoverGradient: string;
}

const capabilities: Capability[] = [
  {
    id: "voice-prototype",
    icon: Mic,
    title: "Voice-to-Prototype",
    description: "Turn voice commands into interactive UI mockups.",
    aiTag: "Process time <2s",
    gradient: "from-purple-500/20 via-blue-500/20 to-cyan-500/20",
    hoverGradient: "from-purple-500/40 via-blue-500/40 to-cyan-500/40"
  },
  {
    id: "generative-wireframes", 
    icon: Bot,
    title: "Generative Wireframes",
    description: "Instant layout variations powered by AI.",
    aiTag: "99.2% accuracy",
    gradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20",
    hoverGradient: "from-green-500/40 via-emerald-500/40 to-teal-500/40"
  },
  {
    id: "data-driven-design",
    icon: BarChart3,
    title: "Data-Driven Design", 
    description: "Optimize UX with predictive analytics.",
    aiTag: "Real-time insights",
    gradient: "from-pink-500/20 via-rose-500/20 to-red-500/20",
    hoverGradient: "from-pink-500/40 via-rose-500/40 to-red-500/40"
  },
  {
    id: "ai-research",
    icon: Brain,
    title: "AI Research Assistant",
    description: "Extract insights from user feedback in seconds.",
    aiTag: "Smart analysis",
    gradient: "from-orange-500/20 via-amber-500/20 to-yellow-500/20",
    hoverGradient: "from-orange-500/40 via-amber-500/40 to-yellow-500/40"
  }
];

// Neural network background component
const NeuralBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10">
      <svg className="w-full h-full" viewBox="0 0 800 600">
        <defs>
          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
            <stop stopColor="#e7ff3a" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#e7ff3a" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Animated neural network nodes and connections */}
        <motion.g
          animate={{ 
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.circle
              key={i}
              cx={100 + (i % 4) * 200}
              cy={100 + Math.floor(i / 4) * 150}
              r="3"
              fill="url(#nodeGradient)"
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 2 + (i * 0.2),
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
          
          {/* Connection lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.line
              key={`line-${i}`}
              x1={100 + (i % 3) * 200}
              y1={100 + Math.floor(i / 3) * 150}
              x2={300 + (i % 2) * 200}
              y2={250 + Math.floor(i / 2) * 100}
              stroke="#e7ff3a"
              strokeWidth="1"
              strokeOpacity="0.3"
              animate={{
                strokeOpacity: [0.1, 0.5, 0.1],
                pathLength: [0, 1, 0]
              }}
              transition={{
                duration: 3 + (i * 0.3),
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.g>
      </svg>
    </div>
  );
};

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-accent/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * (window?.innerWidth || 1200),
            y: Math.random() * (window?.innerHeight || 800),
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
};

export default function CapabilitiesAndStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.04, 0.62, 0.23, 0.98],
      },
    },
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-background via-muted/50 to-background py-32 overflow-hidden">
      {/* Background Effects */}
      <NeuralBackground />
      <FloatingParticles />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/90 to-transparent" />
      
      <div className="relative container max-w-7xl mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">AI-Powered</span>
          </motion.div>
          
          <h2 className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-accent bg-clip-text text-transparent">
            Design Intelligence,<br />Powered by AI
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We don't just design interfaces. We design with intelligence.
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-16"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {capabilities.map((capability, index) => {
            const IconComponent = capability.icon;
            
            return (
              <motion.div
                key={capability.id}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                className="group relative"
              >
                {/* Glassmorphism card */}
                <div className={`relative glass rounded-2xl p-8 border-2 border-white/10 bg-gradient-to-br ${capability.gradient} group-hover:bg-gradient-to-br group-hover:${capability.hoverGradient} transition-all duration-500`}>
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 blur-xl -z-10" 
                       style={{
                         background: index === 0 ? 'linear-gradient(45deg, rgba(168, 85, 247, 0.3), rgba(59, 130, 246, 0.3), rgba(6, 182, 212, 0.3))' :
                                   index === 1 ? 'linear-gradient(45deg, rgba(34, 197, 94, 0.3), rgba(16, 185, 129, 0.3), rgba(20, 184, 166, 0.3))' :
                                   index === 2 ? 'linear-gradient(45deg, rgba(236, 72, 153, 0.3), rgba(244, 63, 94, 0.3), rgba(239, 68, 68, 0.3))' :
                                   'linear-gradient(45deg, rgba(249, 115, 22, 0.3), rgba(245, 158, 11, 0.3), rgba(234, 179, 8, 0.3))'
                       }} />
                  
                  {/* AI Tag */}
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 rounded-full bg-accent/20 border border-accent/30 backdrop-blur-sm">
                      <span className="text-xs font-medium text-accent">{capability.aiTag}</span>
                    </div>
                  </div>
                  
                  {/* Icon */}
                  <motion.div
                    className="mb-6 p-4 rounded-2xl bg-foreground/5 backdrop-blur-sm border border-white/10 w-fit"
                    whileHover={{ 
                      rotate: [0, -5, 5, 0],
                      scale: 1.1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <IconComponent className="w-8 h-8 text-foreground group-hover:text-accent transition-colors duration-300" />
                  </motion.div>
                  
                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                      {capability.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {capability.description}
                    </p>
                  </div>
                  
                  {/* Hover pulse effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    animate={{ 
                      boxShadow: [
                        "0 0 0 0 rgba(231, 255, 58, 0)",
                        "0 0 0 10px rgba(231, 255, 58, 0.1)",
                        "0 0 0 0 rgba(231, 255, 58, 0)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.8, duration: 0.6 }
            }
          }}
        >
          <Button
            size="lg"
            onClick={() => scrollToSection('portfolio-contact')}
            className="relative group px-8 py-6 text-lg font-semibold bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent text-accent-foreground border-0 rounded-2xl overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent via-accent/80 to-accent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ backgroundSize: '200% 200%' }}
            />
            
            <span className="relative z-10 flex items-center gap-3">
              Explore Our Process
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}