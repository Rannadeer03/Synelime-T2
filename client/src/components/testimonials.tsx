import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Johnson",
    position: "CTO, InnovateCorp",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
    content: "TechFlow Solutions transformed our legacy systems into a modern, scalable platform. Their expertise and dedication exceeded our expectations.",
    rating: 5
  },
  {
    name: "Michael Chen",
    position: "CEO, RetailPlus",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
    content: "The mobile app they developed for us has significantly improved our customer engagement. Outstanding work from start to finish.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    position: "Director, FinancePro",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
    content: "Their cloud migration strategy saved us 40% in infrastructure costs while improving performance. Highly recommended!",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-xl text-muted-foreground">Trusted by leading companies worldwide</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover-lift border border-border" data-testid={`testimonial-${index}`}>
                <CardContent className="p-8">
                  {/* Star Rating */}
                  <div className="flex items-center mb-6">
                    <div className="flex text-yellow-400" data-testid={`testimonial-stars-${index}`}>
                      {Array.from({ length: testimonial.rating }, (_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" aria-label="star" data-testid={`star-${index}-${i}`} />
                      ))}
                    </div>
                  </div>
                  
                  {/* Testimonial Content */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  
                  {/* Client Info */}
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={`${testimonial.name} profile`}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                      data-testid={`testimonial-image-${index}`}
                    />
                    <div>
                      <div className="font-semibold" data-testid={`testimonial-name-${index}`}>
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground" data-testid={`testimonial-position-${index}`}>
                        {testimonial.position}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
