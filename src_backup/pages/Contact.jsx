import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const contactInfo = [
  { icon: Phone, title: 'Phone', value: '+254 798 894 145', href: 'tel:+254798894145' },
  { icon: Mail, title: 'Email', value: 'info@terratechsynergy.co.ke', href: 'mailto:info@terratechsynergy.co.ke' },
  { icon: MapPin, title: 'Location', value: 'Rural Kenya', href: null },
  { icon: Clock, title: 'Hours', value: 'Mon — Sat: 7am — 6pm', href: null },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', email: '', service: '', message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      {/* Hero */}
      <section className="py-20 px-6 bg-primary/[0.03]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-10 bg-secondary" />
              <span className="text-secondary text-sm font-semibold uppercase tracking-widest">Get In Touch</span>
              <div className="h-px w-10 bg-secondary" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6">
              Book a <span className="text-accent italic">Service</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ready to reduce post-harvest losses and access affordable livestock feed? Reach out to schedule a shelling, order feeds, or learn more about our services.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h2 className="font-display text-2xl font-bold text-primary mb-6">Contact Information</h2>
              <div className="space-y-6 mb-10">
                {contactInfo.map((c) => (
                  <div key={c.title} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                      <c.icon className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{c.title}</p>
                      {c.href ? (
                        <a href={c.href} className="font-medium text-foreground hover:text-secondary transition-colors text-sm">
                          {c.value}
                        </a>
                      ) : (
                        <p className="font-medium text-foreground text-sm">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-accent text-accent-foreground rounded-2xl p-6">
                <h3 className="font-display text-lg font-bold mb-2">Serving Farmer Groups</h3>
                <p className="text-accent-foreground/80 text-sm leading-relaxed">
                  We offer special rates for farmer groups and cooperatives with large batches. Contact us for group pricing and scheduled processing days.
                </p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              {submitted ? (
                <div className="bg-card border border-border rounded-2xl p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-primary mb-3">Message Sent!</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Thank you for your interest. We'll get back to you within 24 hours to discuss your needs and schedule a service.
                  </p>
                  <Button
                    onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', service: '', message: '' }); }}
                    variant="outline"
                    className="mt-6"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        value={form.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="e.g. Clinton Ochieng"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        required
                        value={form.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="e.g. 0712 345 678"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="e.g. clinton@gmail.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Service Needed *</Label>
                    <Select value={form.service} onValueChange={(v) => handleChange('service', v)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maize_shelling">Maize Shelling</SelectItem>
                        <SelectItem value="feed_milling">Feed Milling</SelectItem>
                        <SelectItem value="poultry_feed">Buy Poultry Feed</SelectItem>
                        <SelectItem value="dairy_feed">Buy Dairy Feed</SelectItem>
                        <SelectItem value="pig_feed">Buy Pig Feed</SelectItem>
                        <SelectItem value="goat_feed">Buy Goat Feed</SelectItem>
                        <SelectItem value="other">Other / General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      required
                      value={form.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Tell us about your needs — quantity, preferred dates, location, etc."
                      rows={5}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-secondary text-secondary-foreground hover:brightness-110 rounded-full py-6 text-sm font-semibold"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}