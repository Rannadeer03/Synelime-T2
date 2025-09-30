import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Linkedin, 
  Twitter, 
  Github, 
  Instagram,
  Mail,
  Phone,
  MapPin,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

import logoImage from "@assets/Screenshot_2025-09-14_160710-removebg-preview_1759223714497.png";

const CompanyLogo = () => (
  <img 
    src={logoImage} 
    alt="TechFlow Solutions Logo" 
    className="w-10 h-10 object-contain"
  />
);

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: contactContent } = useQuery<any>({
    queryKey: ["/api/company-content/contact"],
  });

  const submitInquiry = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest("POST", "/api/inquiries", data);
    },
    onSuccess: async (response) => {
      const result = await response.json();
      toast({
        title: "Message Sent!",
        description: result.message,
      });
      setFormData({ name: "", email: "", company: "", message: "" });
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    submitInquiry.mutate(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const services = [
    "Software Development",
    "Cloud Solutions", 
    "Mobile Apps",
    "Data Analytics",
    "Cybersecurity"
  ];

  const socialLinks = [
    { icon: Linkedin, href: contactContent?.content?.socialMedia?.linkedin || "#", label: "LinkedIn" },
    { icon: Twitter, href: contactContent?.content?.socialMedia?.twitter || "#", label: "Twitter" },
    { icon: Github, href: contactContent?.content?.socialMedia?.github || "#", label: "GitHub" },
    { icon: Instagram, href: contactContent?.content?.socialMedia?.instagram || "#", label: "Instagram" },
  ];

  return (
    <footer id="contact" className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        name="name"
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        data-testid="contact-name"
                      />
                    </div>
                    <div>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Your Email *"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        data-testid="contact-email"
                      />
                    </div>
                  </div>
                  <div>
                    <Input
                      name="company"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={handleInputChange}
                      data-testid="contact-company"
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message *"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      required
                      data-testid="contact-message"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full gradient-primary text-white hover:opacity-90"
                    disabled={submitInquiry.isPending}
                    data-testid="contact-submit"
                  >
                    {submitInquiry.isPending ? "Sending..." : "Send Message"}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <span className="text-muted-foreground" data-testid="contact-info-email">
                    {contactContent?.content?.email || "hello@techflowsolutions.com"}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <span className="text-muted-foreground" data-testid="contact-info-phone">
                    {contactContent?.content?.phone || "+1 (555) 123-4567"}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <span className="text-muted-foreground" data-testid="contact-info-address">
                    {contactContent?.content?.address || "San Francisco, CA"}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    data-testid={`social-${social.label.toLowerCase()}`}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <CompanyLogo />
              <span className="text-xl font-bold gradient-text">TechFlow Solutions</span>
            </div>
            <p className="text-muted-foreground max-w-md">
              Empowering businesses through innovative technology solutions and digital transformation strategies that drive sustainable growth.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-muted-foreground">
              {services.map((service, index) => (
                <li key={service}>
                  <a 
                    href="#services" 
                    className="hover:text-primary transition-colors"
                    data-testid={`footer-service-${index}`}
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 TechFlow Solutions. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-muted-foreground mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
