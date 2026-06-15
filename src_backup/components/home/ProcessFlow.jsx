import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ArrowRight, Loader2 } from 'lucide-react';

export default function ProcessFlow() {
  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: () => base44.entities.ServiceItem.list('order', 50),
  });

  const activeServices = services.filter((s) => s.is_active !== false);

  return (
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
            <span className="text-secondary text-sm font-semibold uppercase tracking-widest">How It Works</span>
            <div className="h-px w-10 bg-secondary" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
            The Circular <span className="text-accent italic">Process</span>
          </h2>
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading…
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeServices.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/3]">
                  <img
                    src={s.image_url}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-secondary text-secondary-foreground font-display font-bold text-sm px-3 py-1 rounded-full">
                    Step {String(i + 1).padStart(2, '0')}
                  </div>
                </div>
                <h3 className="font-display text-2xl font-bold text-primary mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-base leading-relaxed">{s.description}</p>

                {i < activeServices.length - 1 && (
                  <div className="hidden md:flex absolute top-1/4 -right-6 z-10">
                    <ArrowRight className="w-6 h-6 text-secondary" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}