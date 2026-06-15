import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Wheat, Factory } from 'lucide-react';
import ImpactCounter from './ImpactCounter';

const HERO_IMG = 'https://media.base44.com/images/public/6a19db27c939b090c239bd1a/5881d5875_generated_3791783a.png';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="Kenyan farmer holding freshly shelled golden maize kernels" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-10 bg-secondary" />
              <span className="text-secondary text-sm font-semibold uppercase tracking-widest">ecoshemill agri solutions

              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6">
              From Harvest Waste to{' '}
              <span className="text-secondary italic">Livestock Wealth</span>
            </h1>

            <p className="text-primary-foreground/80 text-lg max-w-xl mb-8 leading-relaxed">
              Maize shelling and livestock feed milling services that reduce post-harvest losses, improve climate resilience, and empower smallholder farmers across Kenya.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-7 py-3.5 rounded-full font-semibold text-sm hover:brightness-110 transition-all duration-300 hover:scale-105">
                
                Schedule a Shelling
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 border border-primary-foreground/30 text-primary-foreground px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-primary-foreground/10 transition-all duration-300">
                
                Explore Services
              </Link>
            </div>

            {/* Mini stats */}
            <div className="flex flex-wrap gap-8 mt-12">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Wheat className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-primary-foreground font-display font-bold text-lg">7.5 HP</p>
                  <p className="text-primary-foreground/60 text-xs">Maize Sheller</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Factory className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-primary-foreground font-display font-bold text-lg">7.5 HP</p>
                  <p className="text-primary-foreground/60 text-xs">Feed Chopper</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Impact counter */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block">
            
            <ImpactCounter />
          </motion.div>
        </div>
      </div>
    </section>);

}