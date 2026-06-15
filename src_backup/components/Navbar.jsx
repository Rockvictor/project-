import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Wheat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
{ label: 'Home', path: '/' },
{ label: 'Services', path: '/services' },
{ label: 'Products', path: '/products' },
{ label: 'Impact', path: '/impact' },
{ label: 'Updates', path: '/updates' },
{ label: 'Contact', path: '/contact' }];


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <Wheat className="w-7 h-7 text-secondary my-2" />
          <span className="font-display tracking-tight text-primary my-4 px-1 font-bold text-lg">Ecoshemill Agri Solutions

          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
          <Link
            key={link.path}
            to={link.path}
            className={`text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${
            location.pathname === link.path ?
            'text-secondary' :
            'text-foreground/70 hover:text-foreground'}`
            }>
            
              {link.label}
            </Link>
          )}
          <Link
            to="/contact"
            className="bg-secondary text-secondary-foreground px-5 py-2 text-sm font-semibold rounded-full hover:brightness-110 transition-all duration-200">
            
            Book Service
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open &&
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-background border-b border-border">
          
            <div className="px-6 py-4 flex flex-col gap-3">
              {navLinks.map((link) =>
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={`text-base font-medium py-2 ${
              location.pathname === link.path ? 'text-secondary' : 'text-foreground/70'}`
              }>
              
                  {link.label}
                </Link>
            )}
              <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="bg-secondary text-secondary-foreground px-5 py-2.5 text-sm font-semibold rounded-full text-center mt-2">
              
                Book Service
              </Link>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </nav>);

}