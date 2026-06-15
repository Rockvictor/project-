import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Loader2, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const CATEGORY_COLORS = {
  News: 'bg-blue-100 text-blue-700',
  Product: 'bg-secondary/20 text-secondary-foreground',
  Community: 'bg-accent/20 text-accent',
  Impact: 'bg-green-100 text-green-700',
  Event: 'bg-purple-100 text-purple-700',
};

export default function Updates() {
  const { data: updates = [], isLoading } = useQuery({
    queryKey: ['updates'],
    queryFn: () => base44.entities.Update.list('-published_date', 50),
  });

  const published = updates.filter((u) => u.is_published !== false);

  return (
    <div>
      <section className="py-20 px-6 bg-primary/[0.03]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-10 bg-secondary" />
              <span className="text-secondary text-sm font-semibold uppercase tracking-widest">Latest Updates</span>
              <div className="h-px w-10 bg-secondary" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6">
              News & <span className="text-accent italic">Stories</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Follow our journey — from community launches to new products and on-the-ground impact stories.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-20 text-muted-foreground">
              <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading updates…
            </div>
          ) : published.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">No updates yet. Check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {published.map((upd, i) => (
                <motion.article
                  key={upd.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-secondary/30 transition-all duration-300 group flex flex-col"
                >
                  {upd.image_url && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={upd.image_url}
                        alt={upd.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[upd.category] || 'bg-muted text-muted-foreground'}`}>
                        {upd.category}
                      </span>
                      {upd.published_date && (
                        <span className="text-muted-foreground text-xs flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(upd.published_date), 'dd MMM yyyy')}
                        </span>
                      )}
                    </div>
                    <h2 className="font-display text-xl font-bold text-primary mb-3 leading-tight">{upd.title}</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">{upd.excerpt}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}