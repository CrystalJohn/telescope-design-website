"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { Menu, X, Sun, Moon, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

interface HeaderProps {
  className?: string
}

export default function Header({ className }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [isLoaded, setIsLoaded] = useState(false)
  const { theme, setTheme, actualTheme } = useTheme()
  const controls = useAnimation()

  const navLinks = [
    { label: "Work", href: "#portfolio-contact", id: "portfolio-contact" },
    { label: "Capabilities", href: "#capabilities-stats", id: "capabilities-stats" },
    { label: "Process", href: "#capabilities-stats", id: "capabilities-stats" },
    { label: "Contact", href: "#portfolio-contact", id: "portfolio-contact" }
  ]

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 20)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Intersection Observer for active section
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { 
        threshold: [0.1, 0.5, 0.9],
        rootMargin: '-20% 0px -20% 0px'
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
      controls.start("visible")
    }, 100)

    return () => clearTimeout(timer)
  }, [controls])

  const handleStartProject = useCallback(() => {
    toast.success("Thanks — we'll follow up.")
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }, [])

  const toggleTheme = () => {
    const themes: Array<typeof theme> = ['light', 'dark', 'system']
    const currentIndex = themes.indexOf(theme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]
    setTheme(nextTheme)
  }

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return Sun
      case 'dark': return Moon
      default: return Monitor
    }
  }

  const ThemeIcon = getThemeIcon()

  // Animation variants
  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  }

  const underlineVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: { 
      scaleX: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  }

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0,
      x: "100%",
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  }

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${className || ""}`}
      variants={headerVariants}
      initial="hidden"
      animate={controls}
      style={{
        background: isScrolled 
          ? `rgba(${actualTheme === 'dark' ? '15, 15, 15' : '243, 239, 231'}, 0.8)`
          : `rgba(${actualTheme === 'dark' ? '15, 15, 15' : '243, 239, 231'}, 0.6)`,
        backdropFilter: isScrolled ? 'blur(20px)' : 'blur(10px)',
        WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'blur(10px)',
        borderBottom: isScrolled 
          ? `1px solid rgba(${actualTheme === 'dark' ? '255, 255, 255' : '0, 0, 0'}, 0.1)`
          : 'none'
      }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <motion.div 
          className="flex items-center space-x-2"
          variants={itemVariants}
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <button 
            onClick={scrollToTop}
            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-sm group"
            aria-label="Go to top of page"
          >
            <motion.div 
              className="h-6 w-6 rounded bg-primary flex items-center justify-center"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className="h-2 w-2 rounded-full bg-primary-foreground" />
            </motion.div>
            <span className="text-xl font-heading font-bold text-foreground group-hover:text-accent transition-colors duration-200">
              Telescope
            </span>
          </button>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.label}
              className="relative"
              variants={itemVariants}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <motion.button
                onClick={() => scrollToSection(link.href)}
                className={`relative text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-sm px-2 py-1 group ${
                  activeSection === link.id
                    ? 'text-accent'
                    : 'text-foreground hover:text-accent'
                }`}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent origin-left"
                  variants={underlineVariants}
                  initial="hidden"
                  animate={activeSection === link.id ? "visible" : "hidden"}
                  whileHover="visible"
                />
              </motion.button>
            </motion.div>
          ))}
        </nav>

        {/* Desktop Utility Area */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme Toggle */}
          <motion.div variants={itemVariants}>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="h-9 w-9 p-0 hover:bg-accent/10"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} theme`}
            >
              <motion.div
                key={theme}
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ThemeIcon className="h-4 w-4" />
              </motion.div>
            </Button>
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <Button
              onClick={handleStartProject}
              className="relative h-9 px-6 text-sm font-semibold overflow-hidden group"
              style={{
                background: `linear-gradient(45deg, ${actualTheme === 'dark' ? '#e7ff3a, #b8ff00' : '#1a1a1a, #2f2f2f'})`
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent via-accent/80 to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{
                  background: [
                    "linear-gradient(45deg, #e7ff3a, #b8ff00)",
                    "linear-gradient(45deg, #b8ff00, #e7ff3a)",
                    "linear-gradient(45deg, #e7ff3a, #b8ff00)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="relative z-10 text-accent-foreground">
                Start a Project
              </span>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <motion.div variants={itemVariants}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-9 w-9 p-0"
              aria-label="Toggle navigation menu"
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </motion.div>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/50 md:hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="container mx-auto px-6 py-6 space-y-6">
              {/* Mobile Navigation */}
              <nav className="space-y-4" aria-label="Mobile navigation">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className={`block w-full text-left text-lg font-semibold transition-colors duration-200 py-2 px-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
                      activeSection === link.id
                        ? 'text-accent'
                        : 'text-foreground hover:text-accent'
                    }`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              {/* Mobile Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="h-10 px-4"
                  aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} theme`}
                >
                  <ThemeIcon className="h-4 w-4 mr-2" />
                  <span className="capitalize">{theme}</span>
                </Button>

                <Button
                  onClick={() => {
                    handleStartProject()
                    setMobileMenuOpen(false)
                  }}
                  className="h-10 px-6 text-sm font-semibold"
                  style={{
                    background: `linear-gradient(45deg, ${actualTheme === 'dark' ? '#e7ff3a, #b8ff00' : '#1a1a1a, #2f2f2f'})`
                  }}
                >
                  <span className="text-accent-foreground">Start a Project</span>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}