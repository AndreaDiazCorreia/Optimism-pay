import { ContactForm } from "@/components/contact/contact-form";
import { Mail, MessageSquare, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: Mail,
              title: "Email",
              description: "support@optimismpay.com",
            },
            {
              icon: MessageSquare,
              title: "Live Chat",
              description: "Available during business hours",
            },
            {
              icon: Clock,
              title: "Response Time",
              description: "Within 24 hours",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-card border"
            >
              <item.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl shadow-lg p-6 md:p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
