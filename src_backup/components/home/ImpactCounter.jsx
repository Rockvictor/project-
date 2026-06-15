import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Leaf, Users } from 'lucide-react';

function AnimatedNumber({ target, duration = 2 }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{value.toLocaleString()}</span>;
}

const counters = [
  {
    icon: TrendingUp,
    value: 48500,
    label: 'Kg Maize Shelled',
    suffix: 'kg',
  },
  {
    icon: Leaf,
    value: 32000,
    label: 'Kg Feed Produced',
    suffix: 'kg',
  },
  {
    icon: Users,
    value: 1240,
    label: 'Farmers Served',
    suffix: '+',
  },
];

export default function ImpactCounter() {
  return (
    <div className="bg-background/10 backdrop-blur-md border border-primary-foreground/10 rounded-2xl p-8">
      <h3 className="font-display text-primary-foreground text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
        Real-Time Impact
      </h3>
      <div className="space-y-6">
        {counters.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.2 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center shrink-0">
              <c.icon className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-primary-foreground">
                <AnimatedNumber target={c.value} />
                <span className="text-secondary text-lg ml-1">{c.suffix}</span>
              </p>
              <p className="text-primary-foreground/60 text-sm">{c.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}