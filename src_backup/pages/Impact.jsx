import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingDown, TrendingUp, Leaf, Heart, Users, Sprout } from 'lucide-react';

const COMMUNITY_IMG = 'https://media.base44.com/images/public/6a19db27c939b090c239bd1a/201562c1e_generated_ed28a8df.png';
const LANDSCAPE_IMG = 'https://media.base44.com/images/public/6a19db27c939b090c239bd1a/aab86ff32_generated_e48f9645.png';

const impactMetrics = [
  { icon: TrendingDown, value: '40%', label: 'Post-Harvest Loss Reduction', description: 'Our mechanical shelling prevents grain damage and contamination that occurs with manual methods.' },
  { icon: TrendingUp, value: '35%', label: 'Smallholder Profit Increase', description: 'Farmers earn more by selling clean, high-quality shelled maize at premium market prices.' },
  { icon: Leaf, value: '60%', label: 'Feed Cost Savings', description: 'Locally milled feeds cost significantly less than commercial alternatives from urban distributors.' },
  { icon: Heart, value: '100%', label: 'Waste Utilization', description: 'Every part of the maize plant is used — nothing goes to waste in our circular system.' },
];

const sdgGoals = [
  { number: 1, title: 'No Poverty', desc: 'Increasing farmer incomes through reduced losses and affordable feed production.' },
  { number: 2, title: 'Zero Hunger', desc: 'Improving food security through better grain preservation and livestock nutrition.' },
  { number: 12, title: 'Responsible Consumption', desc: 'Zero-waste circular processing that upcycles all agricultural byproducts.' },
  { number: 13, title: 'Climate Action', desc: 'Reducing carbon footprint of feed production and building community resilience.' },
];

const testimonials = [
  { name: 'Mary Wanjiku', location: 'Nyeri County', text: 'Before Ecoshemill, I was losing nearly half my maize to poor shelling. Now I save everything and my chickens eat better too.' },
  { name: 'John Ochieng', location: 'Kisumu County', text: 'The dairy feed has improved my cows\' milk production. And the price is much lower than what I was paying in town.' },
  { name: 'Grace Muthoni', location: 'Kiambu County', text: 'Our farmer group now brings all our maize here. The service is fast, clean, and the cob meal for our goats is a bonus we never expected.' },
];

export default function Impact() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img src={LANDSCAPE_IMG} alt="Kenyan landscape" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-10 bg-secondary" />
              <span className="text-secondary text-sm font-semibold uppercase tracking-widest">Climate Dashboard</span>
              <div className="h-px w-10 bg-secondary" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Our <span className="text-secondary italic">Impact</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Measuring what matters — from reduced post-harvest losses to improved livelihoods, every metric tells a story of community transformation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {impactMetrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg hover:border-secondary/30 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <m.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="font-display text-4xl font-bold text-primary mb-1">{m.value}</p>
                    <p className="font-semibold text-foreground text-sm mb-2">{m.label}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{m.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community photo + SDGs */}
      <section className="py-24 px-6 bg-primary/[0.03]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="rounded-2xl overflow-hidden aspect-[16/10]">
                <img src={COMMUNITY_IMG} alt="Farmer community" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-10 bg-secondary" />
                <span className="text-secondary text-sm font-semibold uppercase tracking-widest">UN SDGs Alignment</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary mb-8">
                Contributing to Global <span className="text-accent italic">Goals</span>
              </h2>
              <div className="space-y-5">
                {sdgGoals.map((g) => (
                  <div key={g.number} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-display font-bold text-sm shrink-0">
                      {g.number}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{g.title}</p>
                      <p className="text-muted-foreground text-sm">{g.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-10 bg-secondary" />
              <span className="text-secondary text-sm font-semibold uppercase tracking-widest">Voices from the Field</span>
              <div className="h-px w-10 bg-secondary" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary">
              Farmer <span className="text-accent italic">Stories</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-8"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-secondary text-lg">★</span>
                  ))}
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-primary text-sm">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-secondary text-secondary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Join the Movement</h2>
          <p className="text-secondary-foreground/80 mb-8 max-w-xl mx-auto">
            Whether you're a smallholder farmer, a farmer group, or an organization supporting climate resilience — we'd love to work with you.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full font-semibold text-sm hover:brightness-110 transition-all"
          >
            Partner With Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}