"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { X, ArrowRight, ExternalLink, CheckCircle, Circle, Mail, Linkedin, Twitter, Github } from "lucide-react";
import { toast } from "sonner";

interface CaseStudy {
  id: string;
  title: string;
  result: string;
  badges: string[];
  coverImage: string;
  heroImage: string;
  challenge: string[];
  outcome: string[];
  screenshots: string[];
  team: string[];
}

const caseStudies: CaseStudy[] = [
  {
    id: "ai-dashboard",
    title: "AI Analytics Dashboard",
    result: "40% engagement uplift",
    badges: ["Product Design", "AI"],
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    challenge: [
      "Complex data visualization needed simplification",
      "Users struggled with information hierarchy",
      "Real-time updates caused performance issues"
    ],
    outcome: [
      "40% increase in daily active users",
      "60% reduction in support tickets",
      "50% faster task completion times"
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop"
    ],
    team: ["Product Designer", "UX Researcher", "Frontend Developer"]
  },
  {
    id: "fintech-app",
    title: "FinTech Mobile App",
    result: "3x conversion rate",
    badges: ["Mobile Design", "FinTech"],
    coverImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=600&fit=crop",
    challenge: [
      "Low user trust in financial transactions",
      "Complex onboarding process",
      "High abandonment rates during signup"
    ],
    outcome: [
      "300% improvement in conversion rates",
      "85% reduction in onboarding time",
      "90% user satisfaction score"
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1590479773265-7464e5d48118?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop"
    ],
    team: ["Product Designer", "User Researcher", "iOS Developer", "Backend Engineer"]
  },
  {
    id: "ecommerce-platform",
    title: "E-commerce Platform",
    result: "25% revenue increase",
    badges: ["E-commerce", "Web Design"],
    coverImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop",
    challenge: [
      "Poor mobile shopping experience",
      "Complex checkout process",
      "Low product discovery rates"
    ],
    outcome: [
      "25% increase in total revenue",
      "45% improvement in mobile conversions",
      "35% reduction in cart abandonment"
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=600&h=400&fit=crop"
    ],
    team: ["Lead Designer", "UX Strategist", "Frontend Developer"]
  },
  {
    id: "healthcare-portal",
    title: "Healthcare Patient Portal",
    result: "80% adoption rate",
    badges: ["Healthcare", "Portal Design"],
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=600&fit=crop",
    challenge: [
      "Complex medical information presentation",
      "Accessibility requirements for all ages",
      "Integration with legacy systems"
    ],
    outcome: [
      "80% patient portal adoption rate",
      "50% reduction in administrative calls",
      "95% accessibility compliance score"
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=400&fit=crop"
    ],
    team: ["Senior Designer", "Accessibility Specialist", "Healthcare UX Researcher"]
  },
  {
    id: "saas-onboarding",
    title: "SaaS Onboarding Flow",
    result: "70% completion rate",
    badges: ["SaaS", "Onboarding"],
    coverImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop",
    challenge: [
      "High drop-off during initial setup",
      "Complex feature introduction",
      "Overwhelming first-time experience"
    ],
    outcome: [
      "70% onboarding completion rate",
      "45% faster time to first value",
      "60% increase in feature adoption"
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop"
    ],
    team: ["Product Designer", "Growth Designer", "Frontend Engineer"]
  },
  {
    id: "blockchain-wallet",
    title: "Blockchain Wallet Interface",
    result: "90% security score",
    badges: ["Blockchain", "Security"],
    coverImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=600&fit=crop",
    challenge: [
      "Complex security requirements",
      "User education about blockchain",
      "Trust building for new technology"
    ],
    outcome: [
      "90% security audit score",
      "75% user comprehension rate",
      "85% user trust rating"
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=600&h=400&fit=crop"
    ],
    team: ["Crypto UX Designer", "Security Consultant", "Blockchain Developer"]
  }
];

const processSteps = [
  { number: 1, title: "Discovery", description: "Research & strategy" },
  { number: 2, title: "Prototype", description: "Design & iterate" },
  { number: 3, title: "Validate", description: "Test & refine" },
  { number: 4, title: "Ship", description: "Launch & optimize" }
];

export default function PortfolioAndContact() {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleCaseClick = (caseStudy: CaseStudy) => {
    setSelectedCase(caseStudy);
    setIsDrawerOpen(true);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Mock success/failure
      if (Math.random() > 0.1) {
        toast.success("Successfully subscribed to our newsletter!");
        setEmail("");
      } else {
        throw new Error("Subscription failed");
      }
    } catch {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleImageError = (imageId: string) => {
    setImageErrors(prev => ({ ...prev, [imageId]: true }));
  };

  return (
    <section className="bg-muted/50">
      {/* Process Row */}
      <div className="px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">How We Work</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our proven process ensures every project delivers measurable results
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={step.number} className="text-center">
                <div className="relative mb-4">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-semibold mx-auto mb-2">
                    {step.number}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-border -translate-y-0.5 -z-10" />
                  )}
                </div>
                <h3 className="font-heading font-semibold text-lg mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Case Studies</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our recent work and the measurable impact we've delivered for clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy) => (
              <div
                key={caseStudy.id}
                className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                onClick={() => handleCaseClick(caseStudy)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCaseClick(caseStudy);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View case study: ${caseStudy.title}`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  {imageErrors[`cover-${caseStudy.id}`] ? (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">Image unavailable</span>
                    </div>
                  ) : (
                    <img
                      src={caseStudy.coverImage}
                      alt={`${caseStudy.title} cover image`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={() => handleImageError(`cover-${caseStudy.id}`)}
                    />
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {caseStudy.badges.map((badge) => (
                      <Badge key={badge} variant="secondary" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  
                  <h3 className="font-heading font-semibold text-lg mb-2">{caseStudy.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{caseStudy.result}</p>
                  
                  <Button size="sm" className="group-hover:bg-primary/90 transition-colors">
                    Read case
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA Band */}
      <div className="bg-primary text-primary-foreground px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ready to transform your product?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Let's discuss how we can help you achieve measurable results through thoughtful design.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="min-w-[200px]">
                  Start a project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Let's start your project</DialogTitle>
                  <DialogDescription>
                    Tell us about your project and we'll get back to you within 24 hours.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="project-email" className="text-sm font-medium">Email</label>
                    <Input id="project-email" type="email" placeholder="your@email.com" className="mt-1" />
                  </div>
                  <div>
                    <label htmlFor="project-details" className="text-sm font-medium">Project details</label>
                    <textarea
                      id="project-details"
                      placeholder="Tell us about your project..."
                      className="mt-1 w-full min-h-[100px] px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <Button className="w-full">Send message</Button>
                </div>
              </DialogContent>
            </Dialog>
            
            <span className="text-primary-foreground/60">or</span>
            
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Email for updates"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-w-[200px] bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                disabled={isSubscribing}
              />
              <Button 
                type="submit" 
                variant="secondary" 
                disabled={isSubscribing || !email}
              >
                {isSubscribing ? (
                  <Circle className="h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle className="h-4 w-4" />
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-card px-8 py-12 border-t">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-heading font-semibold mb-3">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Product Design</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">UX Research</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Design Systems</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">AI Integration</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold mb-3">Industries</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">FinTech</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Healthcare</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">E-commerce</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">SaaS</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Team</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold mb-3">Connect</h4>
              <div className="flex gap-3">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Email">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t text-sm text-muted-foreground">
            <p>&copy; 2024 Telescope. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Drawer */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent side="bottom" className="h-[80vh] sm:h-[90vh] overflow-y-auto">
          {selectedCase ? (
            <>
              <SheetHeader className="mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <SheetTitle className="text-2xl md:text-3xl font-heading">
                      {selectedCase.title}
                    </SheetTitle>
                    <SheetDescription className="text-lg mt-2">
                      {selectedCase.result}
                    </SheetDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsDrawerOpen(false)}
                    className="shrink-0"
                    aria-label="Close case study"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedCase.badges.map((badge) => (
                    <Badge key={badge} variant="secondary">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </SheetHeader>

              <div className="space-y-8">
                {/* Hero Image */}
                <div className="aspect-[2/1] rounded-lg overflow-hidden">
                  {imageErrors[`hero-${selectedCase.id}`] ? (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">Hero image unavailable</span>
                    </div>
                  ) : (
                    <img
                      src={selectedCase.heroImage}
                      alt={`${selectedCase.title} hero image`}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(`hero-${selectedCase.id}`)}
                    />
                  )}
                </div>

                {/* Challenge & Outcome */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-heading font-semibold text-xl mb-4">Challenge</h3>
                    <ul className="space-y-2">
                      {selectedCase.challenge.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Circle className="h-2 w-2 rounded-full bg-destructive mt-2 shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-heading font-semibold text-xl mb-4">Outcome</h3>
                    <ul className="space-y-2">
                      {selectedCase.outcome.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Screenshots */}
                <div>
                  <h3 className="font-heading font-semibold text-xl mb-4">Design Solutions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedCase.screenshots.map((screenshot, index) => (
                      <div key={index} className="aspect-[4/3] rounded-lg overflow-hidden">
                        {imageErrors[`screenshot-${selectedCase.id}-${index}`] ? (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <span className="text-muted-foreground text-xs">Screenshot unavailable</span>
                          </div>
                        ) : (
                          <img
                            src={screenshot}
                            alt={`${selectedCase.title} screenshot ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={() => handleImageError(`screenshot-${selectedCase.id}-${index}`)}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Team & CTA */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pt-6 border-t">
                  <div>
                    <h4 className="font-heading font-semibold mb-2">Project Team</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCase.team.map((member) => (
                        <Badge key={member} variant="outline" className="text-xs">
                          {member}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button onClick={() => setIsContactOpen(true)} className="shrink-0">
                    Start a similar project
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-64 w-full" />
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </section>
  );
}