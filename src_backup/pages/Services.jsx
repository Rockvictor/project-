import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ArrowRight, Recycle, Shield, Clock, DollarSign, Loader2 } from 'lucide-react';

const benefits = [
{ icon: Recycle, title: 'Zero Waste', desc: 'Every part of the maize is used — kernels for sale, stalks and cobs for feed.' },
{ icon: Shield, title: 'Climate Resilience', desc: 'Affordable local feed reduces dependence on expensive imports and climate shocks.' },
{ icon: Clock, title: 'Time Savings', desc: 'Mechanical processing is 10x faster than manual methods, freeing farmers for other tasks.' },
{ icon: DollarSign, title: 'Cost Effective', desc: 'Locally milled feed sold at significantly lower prices than commercial alternatives.' }];


export default function Services() {
  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: () => base44.entities.ServiceItem.list('order', 50)
  });

  const activeServices = services.filter((s) => s.is_active !== false);

  return (
    <div>
      {/* Hero */}
      <section className="py-20 px-6 bg-primary/[0.03]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-10 bg-secondary" />
              <span className="text-secondary text-sm font-semibold uppercase tracking-widest">The Milling Terminal</span>
              <div className="h-px w-10 bg-secondary" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6">
              Our <span className="text-accent italic">Services</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From shelling to milling, we provide end-to-end agricultural processing that transforms raw harvest into market-ready products and nutrient-rich livestock feed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services list */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {isLoading ?
          <div className="flex items-center justify-center py-24 text-muted-foreground">
              <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading services…
            </div> :

          <div className="space-y-28">
              {activeServices.map((service, i) =>
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
                  <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                      <img src="https://media.base44.com/images/public/6a19db27c939b090c239bd1a/89f7a0aa8_generated_5010bea8.png"

                  alt={service.title}
                  className="w-full h-full object-cover" />
                  
                    </div>
                  </div>
                  <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                    {service.subtitle &&
                <span className="text-secondary text-sm font-semibold uppercase tracking-wider block mb-3">
                        {service.subtitle}
                      </span>
                }
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary mb-4">{service.title}</h2>
                    <p className="text-muted-foreground text-base leading-relaxed mb-6">{service.description}</p>
                    {service.features?.length > 0 &&
                <ul className="space-y-3 mb-8">
                        {service.features.map((f) =>
                  <li key={f} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2.5 shrink-0" />
                            <span className="text-foreground/80 text-sm">{f}</span>
                          </li>
                  )}
                      </ul>
                }
                    <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-7 py-3 rounded-full font-semibold text-sm hover:brightness-110 transition-all">
                  
                      Book This Service <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
            )}
            </div>
          }
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-6 bg-primary/[0.03]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary">
              Why Choose <span className="text-secondary italic">Us</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, i) =>
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center">
              
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <b.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-lg font-bold text-primary mb-2">{b.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>);

}