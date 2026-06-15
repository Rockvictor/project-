import { useState } from 'react';
import { Wheat, LayoutGrid, Newspaper, LogOut, Menu, X } from 'lucide-react';
import ServicesManager from './ServicesManager';
import UpdatesManager from './UpdatesManager';

const tabs = [
  { id: 'services', label: 'Services Grid', icon: LayoutGrid },
  { id: 'updates', label: 'Latest Updates', icon: Newspaper },
];

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('services');
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="h-14 bg-primary text-primary-foreground flex items-center justify-between px-5 shrink-0">
        <div className="flex items-center gap-2.5">
          <Wheat className="w-5 h-5 text-secondary" />
          <span className="font-display font-semibold text-sm">
            Ecoshemill Agri Solutions <span className="text-secondary">Admin</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="text-primary-foreground/60 hover:text-primary-foreground text-xs hidden sm:block transition-colors"
          >
            ← View Site
          </a>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 text-primary-foreground/60 hover:text-primary-foreground text-xs transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
          <button className="sm:hidden text-primary-foreground/70" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`
          ${mobileOpen ? 'flex' : 'hidden'} sm:flex
          flex-col w-52 bg-muted/50 border-r border-border shrink-0
          absolute sm:relative top-14 sm:top-0 left-0 h-[calc(100vh-3.5rem)] sm:h-auto z-40
        `}>
          <nav className="p-3 space-y-1 pt-4">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => { setActiveTab(t.id); setMobileOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === t.id
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <t.icon className="w-4 h-4 shrink-0" />
                {t.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-7">
          {activeTab === 'services' && <ServicesManager />}
          {activeTab === 'updates' && <UpdatesManager />}
        </main>
      </div>
    </div>
  );
}