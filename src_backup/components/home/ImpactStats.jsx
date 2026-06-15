import { motion } from 'framer-motion';

const LANDSCAPE_IMG = 'https://media.base44.com/images/public/6a19db27c939b090c239bd1a/aab86ff32_generated_e48f9645.png';

const stats = [
  { value: '40%', label: 'Post-Harvest Loss Reduction' },
  { value: '35%', label: 'Smallholder Profit Increase' },
  { value: '60%', label: 'Feed Cost Savings' },
  { value: '1,200+', label: 'Farming Families Impacted' },
];

export default function ImpactStats() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <img src={LANDSCAPE_IMG} alt="Kenyan agricultural landscape" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-10 bg-secondary" />
            <span className="text-secondary text-sm font-semibold uppercase tracking-widest">Community Impact</span>
            <div className="h-px w-10 bg-secondary" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground">
            Climate <span className="text-secondary italic">Dashboard</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="font-display text-5xl sm:text-6xl font-bold text-secondary mb-2">
                {s.value}
              </p>
              <p className="text-primary-foreground/70 text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}