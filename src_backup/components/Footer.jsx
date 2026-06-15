import { Link } from 'react-router-dom';
import { Wheat, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <Wheat className="w-6 h-6 text-secondary" />
              <span className="font-display text-lg font-semibold">
                Ecoshemill Agri Solutions <span className="text-secondary">Ltd</span>
              </span>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Transforming post-harvest waste into livestock wealth for Kenyan smallholder farmers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-secondary mb-4">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2.5">
              {['/', '/services', '/products', '/impact', '/contact'].map((path, i) =>
              <Link
                key={path}
                to={path}
                className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors">
                
                  {['Home', 'Services', 'Products', 'Impact', 'Contact'][i]}
                </Link>
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-secondary mb-4">
              Our Services
            </h4>
            <div className="flex flex-col gap-2.5 text-sm text-primary-foreground/70">
              <span>Maize Shelling</span>
              <span>Feed Milling</span>
              <span>Poultry Feed</span>
              <span>Dairy Feed</span>
              <span>Pig & Goat Feed</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-secondary mb-4">
              Get In Touch
            </h4>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-secondary" />
                <span>+254 798 894145</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-secondary" />
                <span>info@ecoshemill.co.ke</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary" />
                <span>Siaya, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/50">
            © 2026 Ecoshemill Ltd. All rights reserved.
          </p>
          <p className="text-xs text-primary-foreground/50">
            Building climate resilience for Kenyan communities.
          </p>
        </div>
      </div>
    </footer>);

}