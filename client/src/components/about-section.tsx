import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Award, Users, TrendingUp, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AboutSection() {
  const { data: aboutContent, isLoading } = useQuery<any>({
    queryKey: ["/api/company-content/about"],
  });

  const stats = [
    {
      icon: TrendingUp,
      value: aboutContent?.content?.stats?.projectsDelivered || "250+",
      label: "Projects Delivered"
    },
    {
      icon: Users,
      value: aboutContent?.content?.stats?.clientSatisfaction || "95%",
      label: "Client Satisfaction"
    },
    {
      icon: Users,
      value: aboutContent?.content?.stats?.teamMembers || "50+",
      label: "Team Members"
    },
    {
      icon: Clock,
      value: aboutContent?.content?.stats?.yearsExperience || "8",
      label: "Years Experience"
    }
  ];

  if (isLoading) {
    return (
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="h-8 bg-muted rounded animate-pulse"></div>
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded animate-pulse"></div>
                <div className="h-4 bg-muted rounded animate-pulse"></div>
                <div className="h-4 bg-muted rounded animate-pulse"></div>
              </div>
            </div>
            <div className="h-96 bg-muted rounded-2xl animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold">
              About <span className="gradient-text">TechFlow Solutions</span>
            </h2>
            
            <div className="space-y-6 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                {aboutContent?.content?.description || 
                "Founded with a vision to transform businesses through innovative technology solutions, TechFlow Solutions has emerged as a leading partner for companies seeking digital transformation."}
              </p>
              
              <p className="text-lg leading-relaxed">
                {aboutContent?.content?.mission || 
                "Our mission is to empower businesses through innovative technology solutions and digital transformation strategies that drive sustainable growth."}
              </p>
              
              {aboutContent?.content?.values && (
                <div className="space-y-2">
                  <h4 className="text-foreground font-semibold">Our Values:</h4>
                  <ul className="space-y-1">
                    {aboutContent.content.values.map((value: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <Award className="h-4 w-4 text-primary mr-2" />
                        {value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Statistics */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  data-testid={`stat-${index}`}
                >
                  <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Team collaboration image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="TechFlow Solutions team collaborating in modern office"
                className="w-full h-auto object-cover"
                data-testid="about-team-image"
              />
            </div>
            
            {/* Floating value cards */}
            <motion.div 
              className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-lg border border-border max-w-xs"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center">
                  <Award className="text-white" size={20} />
                </div>
                <div>
                  <div className="font-semibold">Innovation First</div>
                  <div className="text-sm text-muted-foreground">Cutting-edge solutions</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute -top-6 -right-6 bg-card p-6 rounded-xl shadow-lg border border-border max-w-xs"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 gradient-secondary rounded-lg flex items-center justify-center">
                  <Users className="text-white" size={20} />
                </div>
                <div>
                  <div className="font-semibold">Client Success</div>
                  <div className="text-sm text-muted-foreground">Your growth is our mission</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
