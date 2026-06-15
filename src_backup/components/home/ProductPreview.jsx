import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const feeds = [
  { name: 'Poultry Feed', protein: 22, fiber: 5, type: 'Layers & Broilers' },
  { name: 'Dairy Feed', protein: 18, fiber: 12, type: 'Dairy Cows' },
  { name: 'Pig Feed', protein: 16, fiber: 8, type: 'Growers & Finishers' },
  { name: 'Goat Feed', protein: 14, fiber: 15, type: 'All Ages' },
];

function NutrientBar({ label, value, max = 25 }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold text-foreground">{value}%</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="h-full bg-secondary rounded-full"
        />
      </div>
    </div>
  );
}

export default function ProductPreview() {
  return (
    <section className="py-24 px-6 bg-primary/[0.03]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-10 bg-secondary" />
              <span className="text-secondary text-sm font-semibold uppercase tracking-widest">Our Feeds</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
              Nutrition <span className="text-accent italic">Commissary</span>
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-secondary font-semibold text-sm hover:gap-3 transition-all"
          >
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {feeds.map((feed, i) => (
            <motion.div
              key={feed.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-secondary/30 transition-all duration-300 group"
            >
              <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-1">{feed.type}</p>
              <h3 className="font-display text-xl font-bold text-primary mb-5">{feed.name}</h3>
              <div className="space-y-3">
                <NutrientBar label="Protein" value={feed.protein} />
                <NutrientBar label="Fiber" value={feed.fiber} />
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <Link
                  to="/products"
                  className="text-sm text-muted-foreground group-hover:text-secondary transition-colors inline-flex items-center gap-1"
                >
                  Learn more <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}