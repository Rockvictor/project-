import { useState } from 'react';
import { Wheat, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const ok = onLogin(password);
      if (!ok) {
        setError('Incorrect password. Please try again.');
        setPassword('');
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center mb-4">
            <Wheat className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="font-display text-2xl font-bold text-primary-foreground">Ecoshemill Agri Solutions Ltd</h1>
          <p className="text-primary-foreground/50 text-sm mt-1">Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-8 space-y-5">
          <div className="flex items-center gap-3 mb-2">
            <Lock className="w-4 h-4 text-secondary" />
            <h2 className="text-primary-foreground font-semibold text-sm uppercase tracking-wider">Secure Access</h2>
          </div>

          <div className="space-y-2">
            <Label className="text-primary-foreground/70 text-xs uppercase tracking-wider">Password</Label>
            <div className="relative">
              <Input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="Enter admin password"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 pr-10"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/40 hover:text-primary-foreground/70"
              >
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 px-3 py-2 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={!password || loading}
            className="w-full bg-secondary text-secondary-foreground hover:brightness-110 rounded-full font-semibold"
          >
            {loading ? 'Verifying…' : 'Enter Dashboard'}
          </Button>
        </form>

        <p className="text-center text-primary-foreground/30 text-xs mt-6">
          Restricted access — authorised personnel only
        </p>
      </div>
    </div>
  );
}