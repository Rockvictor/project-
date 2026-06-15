import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Egg, MilkOff, Beef } from 'lucide-react';

const FEED_IMG = 'https://media.base44.com/images/public/6a19db27c939b090c239bd1a/f378d38b7_generated_641808bd.png';

const products = [
  {
    name: 'Poultry Feed — Layers',
    animal: 'Chickens (Layers)',
    description: 'Specially formulated from ground maize cobs and grains to support egg production and maintain healthy feather condition in laying hens.',
    protein: 22,
    fiber: 5,
    energy: 2800,
    price: 'KES 1,800',
    unit: 'per 50kg bag',
    ingredients: ['Ground maize', 'Maize cob meal', 'Mineral premix', 'Bone meal'],
  },
  {
    name: 'Poultry Feed — Broilers',
    animal: 'Chickens (Broilers)',
    description: 'High-protein feed designed for rapid, healthy growth in broiler chickens. Made from locally milled grains and fortified with essential nutrients.',
    protein: 24,
    fiber: 4,
    energy: 3000,
    price: 'KES 2,000',
    unit: 'per 50kg bag',
    ingredients: ['Ground maize', 'Soybean meal', 'Maize cob meal', 'Premix'],
  },
  {
    name: 'Dairy Feed',
    animal: 'Dairy Cows',
    description: 'A balanced dairy meal combining shredded maize stalks with ground grains, formulated to boost milk production while maintaining body condition.',
    protein: 18,
    fiber: 12,
    energy: 2500,
    price: 'KES 1,500',
    unit: 'per 50kg bag',
    ingredients: ['Shredded maize stalks', 'Ground maize', 'Cob meal', 'Salt lick'],
  },
  {
    name: 'Pig Feed — Growers',
    animal: 'Pigs (Growers)',
    description: 'Energy-dense feed for growing pigs, combining ground maize with cob meal to promote steady weight gain and strong skeletal development.',
    protein: 16,
    fiber: 8,
    energy: 2700,
    price: 'KES 1,600',
    unit: 'per 50kg bag',
    ingredients: ['Ground maize', 'Maize cob meal', 'Fish meal', 'Mineral premix'],
  },
  {
    name: 'Pig Feed — Finishers',
    animal: 'Pigs (Finishers)',
    description: 'Optimized for the finishing stage with lower protein and higher energy to ensure quality meat production and efficient feed conversion.',
    protein: 14,
    fiber: 7,
    energy: 2900,
    price: 'KES 1,500',
    unit: 'per 50kg bag',
    ingredients: ['Ground maize', 'Cob meal', 'Wheat bran', 'Premix'],
  },
  {
    name: 'Goat Feed',
    animal: 'Goats (All Ages)',
    description: 'A roughage-rich feed combining shredded maize stalks with ground cobs, perfect for maintaining digestive health and supporting growth in goats.',
    protein: 14,
    fiber: 15,
    energy: 2200,
    price: 'KES 1,200',
    unit: 'per 50kg bag',
    ingredients: ['Shredded maize stalks', 'Ground cobs', 'Maize grain', 'Salt'],
  },
];

function NutrientGauge({ label, value, max, color }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold text-foreground">{value}{label === 'Energy' ? ' kcal' : '%'}</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  );
}

export default function Products() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img src={FEED_IMG} alt="Livestock feed products" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-10 bg-secondary" />
              <span className="text-secondary text-sm font-semibold uppercase tracking-widest">Nutrition Commissary</span>
              <div className="h-px w-10 bg-secondary" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Our <span className="text-secondary italic">Products</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Locally milled, nutrient-rich livestock feeds at prices smallholder farmers can afford. Every bag contributes to the circular economy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-secondary/30 transition-all duration-300 group"
              >
                <div className="p-6">
                  <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-1">{p.animal}</p>
                  <h3 className="font-display text-xl font-bold text-primary mb-3">{p.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{p.description}</p>

                  <div className="space-y-3 mb-5">
                    <NutrientGauge label="Protein" value={p.protein} max={30} color="bg-secondary" />
                    <NutrientGauge label="Fiber" value={p.fiber} max={20} color="bg-accent" />
                    <NutrientGauge label="Energy" value={p.energy} max={3500} color="bg-primary/60" />
                  </div>

                  <div className="mb-5">
                    <p className="text-xs text-muted-foreground mb-2">Key Ingredients:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.ingredients.map((ing) => (
                        <span key={ing} className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-end justify-between pt-4 border-t border-border">
                    <div>
                      <p className="font-display text-2xl font-bold text-primary">{p.price}</p>
                      <p className="text-xs text-muted-foreground">{p.unit}</p>
                    </div>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 bg-secondary text-secondary-foreground px-4 py-2 rounded-full font-semibold text-xs hover:brightness-110 transition-all"
                    >
                      Order <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Need a Custom Feed Mix?</h2>
          <p className="text-accent-foreground/80 mb-8 max-w-xl mx-auto">
            We can create custom feed formulations based on your livestock needs and available raw materials. Contact us to discuss your requirements.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-7 py-3.5 rounded-full font-semibold text-sm hover:brightness-110 transition-all"
          >
            Get In Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}