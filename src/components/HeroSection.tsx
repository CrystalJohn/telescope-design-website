"use client";

import { useState, useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Telescope, Sparkles, Zap, Brain } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export default function HeroSection() {
  const [showContactForm, setShowContactForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const { actualTheme } = useTheme()
  
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  // Trigger animations when component comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const handleStartProject = () => {
    toast.success("Ready to start your AI product journey!")
    setShowContactForm(true)
  }

  const handleTalkToUs = () => {
    const capabilitiesSection = document.getElementById("capabilities-stats")
    if (capabilitiesSection) {
      capabilitiesSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      errors.name = "Name is required"
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email"
    }
    
    if (!formData.message.trim()) {
      errors.message = "Message is required"
    }

    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setIsSubmitting(true)
    setFormErrors({})

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))

    toast.success("Message sent! We'll get back to you soon.")
    setFormData({ name: "", email: "", message: "" })
    setShowContactForm(false)
    setIsSubmitting(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  const gradientTextVariants = {
    hidden: { backgroundPosition: "0% 50%" },
    visible: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }

  // Particle component
  const Particle = ({ delay = 0 }: { delay?: number }) => (
    <motion.div
      className={`absolute w-1 h-1 rounded-full ${
        actualTheme === 'dark' ? 'bg-cyan-400' : 'bg-purple-400'
      } opacity-70`}
      initial={{ 
        x: Math.random() * window.innerWidth, 
        y: window.innerHeight + 10,
        scale: 0 
      }}
      animate={{
        x: Math.random() * window.innerWidth,
        y: -10,
        scale: [0, 1, 0],
        opacity: [0, 0.7, 0]
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        delay: delay,
        ease: "linear"
      }}
    />
  )

  return (
    <section 
      ref={ref}
      className="relative min-h-screen overflow-hidden"
      style={{
        background: actualTheme === 'dark' 
          ? 'linear-gradient(135deg, #0f0f0f 0%, #1a0826 25%, #2d1b69 50%, #0f0f0f 75%, #1a0826 100%)'
          : 'linear-gradient(135deg, #f3efe7 0%, #e8d5ff 25%, #b8f2ff 50%, #e7ff3a 75%, #f3efe7 100%)',
        backgroundSize: '400% 400%'
      }}
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          background: actualTheme === 'dark'
            ? 'linear-gradient(45deg, rgba(231, 255, 58, 0.1) 0%, rgba(139, 69, 19, 0.1) 25%, rgba(128, 0, 128, 0.1) 50%, rgba(0, 255, 255, 0.1) 75%, rgba(231, 255, 58, 0.1) 100%)'
            : 'linear-gradient(45deg, rgba(147, 51, 234, 0.1) 0%, rgba(6, 182, 212, 0.1) 25%, rgba(231, 255, 58, 0.1) 50%, rgba(168, 85, 247, 0.1) 75%, rgba(147, 51, 234, 0.1) 100%)',
          backgroundSize: '400% 400%'
        }}
      />

      {/* Particle System */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <Particle key={i} delay={i * 0.2} />
        ))}
      </div>

      {/* Neural Network Background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-20" viewBox="0 0 1000 1000">
          <defs>
            <radialGradient id="nodeGradient">
              <stop offset="0%" stopColor={actualTheme === 'dark' ? '#e7ff3a' : '#8b45f7'} />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          {/* Neural network nodes and connections */}
          <motion.circle
            cx="200" cy="200" r="3" fill="url(#nodeGradient)"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle
            cx="800" cy="300" r="3" fill="url(#nodeGradient)"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          <motion.circle
            cx="400" cy="600" r="3" fill="url(#nodeGradient)"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
          <motion.line
            x1="200" y1="200" x2="800" y2="300"
            stroke={actualTheme === 'dark' ? '#e7ff3a' : '#8b45f7'}
            strokeWidth="1"
            opacity="0.3"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.line
            x1="800" y1="300" x2="400" y2="600"
            stroke={actualTheme === 'dark' ? '#e7ff3a' : '#8b45f7'}
            strokeWidth="1"
            opacity="0.3"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          />
        </svg>
      </div>

      <div className="relative z-10 container max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-16 lg:pt-32 lg:pb-24">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Left Column - Content */}
          <div className="space-y-8 lg:space-y-12">
            <motion.div className="space-y-6" variants={itemVariants}>
              <motion.h1 
                className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] tracking-tight"
                variants={itemVariants}
              >
                <span className={actualTheme === 'dark' ? 'text-white' : 'text-gray-900'}>
                  Design{" "}
                </span>
                <motion.span
                  className="relative inline-block"
                  variants={gradientTextVariants}
                  initial="hidden"
                  animate="visible"
                  style={{
                    background: actualTheme === 'dark'
                      ? 'linear-gradient(45deg, #e7ff3a, #00ffff, #ff00ff, #e7ff3a)'
                      : 'linear-gradient(45deg, #8b45f7, #06b6d4, #e7ff3a, #8b45f7)',
                    backgroundSize: '300% 300%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  AI Products
                </motion.span>
                <br />
                <span className={actualTheme === 'dark' ? 'text-white' : 'text-gray-900'}>
                  That Work
                </span>
              </motion.h1>
              
              <motion.p 
                className={`text-xl lg:text-2xl font-medium leading-relaxed max-w-xl ${
                  actualTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}
                variants={itemVariants}
              >
                We craft intelligent experiences that transform how people interact with AI technology.
              </motion.p>
            </motion.div>

            {/* CTAs */}
            <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="relative overflow-hidden bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-4 text-lg rounded-lg shadow-lg group"
                  onClick={handleStartProject}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent via-green-400 to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <span className="relative z-10">Start Project</span>
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(231, 255, 58, 0.5)',
                        '0 0 40px rgba(231, 255, 58, 0.8)',
                        '0 0 20px rgba(231, 255, 58, 0.5)'
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  className="relative overflow-hidden bg-transparent font-semibold px-8 py-4 text-lg rounded-lg backdrop-blur-sm group"
                  onClick={handleTalkToUs}
                  style={{
                    border: actualTheme === 'dark' 
                      ? '2px solid transparent'
                      : '2px solid transparent',
                    background: actualTheme === 'dark'
                      ? 'linear-gradient(45deg, rgba(231, 255, 58, 0.1), rgba(0, 255, 255, 0.1)) padding-box, linear-gradient(45deg, #e7ff3a, #00ffff) border-box'
                      : 'linear-gradient(45deg, rgba(139, 69, 247, 0.1), rgba(6, 182, 212, 0.1)) padding-box, linear-gradient(45deg, #8b45f7, #06b6d4) border-box',
                    color: actualTheme === 'dark' ? '#ffffff' : '#1f2937'
                  }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{
                      background: actualTheme === 'dark'
                        ? 'linear-gradient(45deg, #e7ff3a, #00ffff)'
                        : 'linear-gradient(45deg, #8b45f7, #06b6d4)'
                    }}
                  />
                  <span className="relative z-10">Talk to Us</span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust badges */}
            <motion.div 
              className={`flex flex-wrap items-center gap-6 text-sm font-medium ${
                actualTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
              variants={itemVariants}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>Trusted by Fortune 500</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" />
                <span>50+ AI Products Launched</span>
              </div>
            </motion.div>

            {/* Contact Form */}
            {showContactForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`p-6 backdrop-blur-md border-0 shadow-2xl rounded-xl ${
                  actualTheme === 'dark' 
                    ? 'bg-black/40 border-white/10' 
                    : 'bg-white/90 border-gray-200/20'
                }`}>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Input
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className={`border-input focus:ring-2 focus:ring-accent ${
                            formErrors.name ? "border-destructive" : ""
                          }`}
                          disabled={isSubmitting}
                        />
                        {formErrors.name && (
                          <p className="text-destructive text-sm mt-1">{formErrors.name}</p>
                        )}
                      </div>
                      
                      <div>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={`border-input focus:ring-2 focus:ring-accent ${
                            formErrors.email ? "border-destructive" : ""
                          }`}
                          disabled={isSubmitting}
                        />
                        {formErrors.email && (
                          <p className="text-destructive text-sm mt-1">{formErrors.email}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Textarea
                        placeholder="Tell us about your AI product idea..."
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        className={`min-h-[100px] border-input focus:ring-2 focus:ring-accent resize-none ${
                          formErrors.message ? "border-destructive" : ""
                        }`}
                        disabled={isSubmitting}
                      />
                      {formErrors.message && (
                        <p className="text-destructive text-sm mt-1">{formErrors.message}</p>
                      )}
                    </div>
                    
                    <div className="flex gap-3">
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold focus:ring-2 focus:ring-accent"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                      
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setShowContactForm(false)}
                        disabled={isSubmitting}
                        className="border-input hover:bg-muted focus:ring-2 focus:ring-accent"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Right Column - 3D Animated Telescope */}
          <motion.div 
            className="flex justify-center lg:justify-end order-first lg:order-last"
            variants={itemVariants}
          >
            <div className="relative">
              {/* Glowing orb background */}
              <motion.div
                className="absolute inset-0 rounded-full blur-3xl opacity-30"
                animate={{
                  background: [
                    `radial-gradient(circle, ${actualTheme === 'dark' ? '#e7ff3a' : '#8b45f7'} 0%, transparent 70%)`,
                    `radial-gradient(circle, ${actualTheme === 'dark' ? '#00ffff' : '#06b6d4'} 0%, transparent 70%)`,
                    `radial-gradient(circle, ${actualTheme === 'dark' ? '#ff00ff' : '#e7ff3a'} 0%, transparent 70%)`,
                    `radial-gradient(circle, ${actualTheme === 'dark' ? '#e7ff3a' : '#8b45f7'} 0%, transparent 70%)`
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />

              {/* 3D Telescope Container */}
              <motion.div
                className="relative z-10"
                animate={{
                  rotateY: [0, 360],
                  rotateX: [0, 10, 0, -10, 0]
                }}
                transition={{
                  rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
                  rotateX: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{ perspective: "1000px" }}
              >
                <Card className={`backdrop-blur-md border shadow-2xl rounded-2xl p-8 lg:p-12 max-w-md w-full ${
                  actualTheme === 'dark' 
                    ? 'bg-black/20 border-white/10' 
                    : 'bg-white/20 border-white/30'
                }`}>
                  <div className={`aspect-square rounded-xl border flex items-center justify-center ${
                    actualTheme === 'dark' 
                      ? 'bg-gradient-to-br from-gray-900/50 via-purple-900/30 to-cyan-900/30 border-white/10' 
                      : 'bg-gradient-to-br from-purple-100/50 via-cyan-100/30 to-lime-100/30 border-purple-200/30'
                  }`}>
                    <div className="relative">
                      {/* Scanning animation rings */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-accent/30"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 0, 0.3]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                        style={{ width: '200px', height: '200px' }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-accent/20"
                        animate={{
                          scale: [1, 2, 1],
                          opacity: [0.2, 0, 0.2]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeOut",
                          delay: 1
                        }}
                        style={{ width: '200px', height: '200px' }}
                      />

                      {/* Telescope with glow effect */}
                      <motion.div
                        animate={{
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{
                          rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                        }}
                      >
                        <Telescope className="w-24 h-24 lg:w-32 lg:h-32 text-accent drop-shadow-2xl" />
                        
                        {/* Additional tech elements */}
                        <motion.div
                          className="absolute -top-2 -right-2"
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0.8, 1.2, 0.8]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <Brain className="w-6 h-6 text-cyan-400" />
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Data visualization bars */}
                  <div className="mt-6 space-y-3">
                    {[0.8, 0.6, 0.9, 0.4].map((width, index) => (
                      <motion.div
                        key={index}
                        className={`h-3 rounded-full ${
                          actualTheme === 'dark' ? 'bg-white/10' : 'bg-gray-200/30'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${width * 100}%` }}
                        transition={{
                          duration: 2,
                          delay: index * 0.2,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}