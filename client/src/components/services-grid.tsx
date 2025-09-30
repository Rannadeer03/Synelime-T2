import { motion } from "framer-motion";
import { 
  Code2, 
  Cloud, 
  Smartphone, 
  BarChart3, 
  Shield, 
  Settings,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Code2,
    title: "Software Development",
    description: "Custom software solutions built with cutting-edge technologies to meet your unique business requirements and scale with your growth.",
    gradient: "gradient-primary"
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and migration services that ensure reliability, security, and optimal performance for your applications.",
    gradient: "gradient-secondary"
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    description: "Native and cross-platform mobile apps that deliver exceptional user experiences across iOS and Android platforms.",
    gradient: "bg-gradient-to-br from-pink-500 to-purple-600"
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    description: "Advanced analytics and business intelligence solutions that transform your data into actionable insights and strategic advantages.",
    gradient: "bg-gradient-to-br from-blue-500 to-cyan-600"
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Comprehensive security solutions to protect your digital assets, ensure compliance, and maintain customer trust.",
    gradient: "bg-gradient-to-br from-orange-500 to-red-600"
  },
  {
    icon: Settings,
    title: "Digital Transformation",
    description: "End-to-end transformation strategies that modernize your operations and position your business for future success.",
    gradient: "bg-gradient-to-br from-green-500 to-teal-600"
  }
];

export default function ServicesGrid() {
  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive technology solutions designed to accelerate your business growth and digital transformation journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover-lift border-2 group cursor-pointer relative overflow-hidden" 
                    style={{ borderImage: `linear-gradient(135deg, ${index % 3 === 0 ? 'var(--gradient-purple), var(--gradient-pink)' : index % 3 === 1 ? 'var(--gradient-blue), var(--gradient-orange)' : 'var(--gradient-pink), var(--gradient-blue)'}) 1` }}
                    data-testid={`service-card-${index}`}>
                <div className="absolute inset-0 opacity-5" style={{ background: index % 3 === 0 ? 'linear-gradient(135deg, var(--gradient-purple), var(--gradient-pink))' : index % 3 === 1 ? 'linear-gradient(135deg, var(--gradient-blue), var(--gradient-orange))' : 'linear-gradient(135deg, var(--gradient-pink), var(--gradient-blue))' }}></div>
                <CardContent className="p-8 relative z-10">
                  <div className={`w-16 h-16 ${service.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <service.icon className="text-white text-2xl" size={28} />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <Button 
                    variant="ghost" 
                    className="p-0 h-auto text-primary font-semibold hover:no-underline group-hover:translate-x-2 transition-transform"
                    data-testid={`service-learn-more-${index}`}
                  >
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
