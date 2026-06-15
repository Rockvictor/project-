import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const COMMUNITY_IMG = 'https://media.base44.com/images/public/6a19db27c939b090c239bd1a/201562c1e_generated_ed28a8df.png';

export default function CommunitySection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden aspect-[16/10]">
              <img
                src={COMMUNITY_IMG}
                alt="Kenyan farmer community gathered at processing station"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-secondary text-secondary-foreground rounded-xl p-5 shadow-lg">
              <p className="font-display text-2xl font-bold">500+</p>
              <p className="text-xs font-medium">Farmer Groups Reached</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-10 bg-secondary" />
              <span className="text-secondary text-sm font-semibold uppercase tracking-widest">Our Mission</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary mb-6 leading-tight">
              Building Climate Resilience, One <span className="text-accent italic">Community</span> at a Time
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-4">
              We target smallholder farmers, farmer groups, and local markets across Kenya. By providing affordable maize shelling and locally milled livestock feed, we create a circular economy that benefits the entire agricultural value chain.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              Our approach reduces dependence on expensive imported feeds, minimizes post-harvest waste, and empowers communities to build sustainable, climate-resilient livelihoods.
            </p>
            <Link
              to="/impact"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-7 py-3.5 rounded-full font-semibold text-sm hover:brightness-110 transition-all duration-300"
            >
              See Our Impact <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}