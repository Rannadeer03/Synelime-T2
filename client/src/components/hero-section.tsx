import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Play } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 gradient-primary opacity-5"></div>
      
      {/* Floating geometric elements inspired by logo */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-purple-400 opacity-30"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-40 right-20 w-24 h-24 rounded-full bg-pink-400 opacity-40"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute bottom-32 left-1/4 w-20 h-20 rounded-full bg-blue-400 opacity-30"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute bottom-20 right-1/3 w-28 h-28 rounded-full bg-orange-400 opacity-25"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="gradient-text">Transform</span> Your Digital Future
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Empowering businesses through innovative technology solutions, cutting-edge software development, and digital transformation strategies that drive growth and success.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button 
                size="lg"
                className="gradient-primary text-white hover:opacity-90 transition-opacity group"
                onClick={() => scrollToSection("services")}
                data-testid="hero-explore-services"
              >
                Explore Our Services
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors group"
                data-testid="hero-watch-demo"
              >
                <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Right side - Interactive tech visualization */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-full h-96 rounded-2xl gradient-secondary opacity-20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-4 gap-4 p-8">
                {Array.from({ length: 16 }, (_, i) => (
                  <motion.div
                    key={i}
                    className={`w-16 h-16 rounded-xl opacity-80 hover-lift cursor-pointer ${
                      i % 4 === 0 ? 'gradient-primary' :
                      i % 4 === 1 ? 'bg-blue-500' :
                      i % 4 === 2 ? 'bg-pink-500' : 'bg-orange-500'
                    }`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.8, scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.8 + (i * 0.1),
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      scale: 1.1, 
                      opacity: 1,
                      transition: { duration: 0.2 }
                    }}
                    data-testid={`hero-tech-block-${i}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
