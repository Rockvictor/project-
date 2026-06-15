import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CATEGORIES = ['News', 'Product', 'Community', 'Impact', 'Event'];

export default function UpdateForm({ item, onClose, onSaved }) {
  const isNew = !item.id;
  const [form, setForm] = useState({
    title: item.title || '',
    category: item.category || 'News',
    excerpt: item.excerpt || '',
    body: item.body || '',
    image_url: item.image_url || '',
    published_date: item.published_date || new Date().toISOString().slice(0, 10),
    is_published: item.is_published !== false,
  });

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const saveMutation = useMutation({
    mutationFn: (data) =>
      isNew
        ? base44.entities.Update.create(data)
        : base44.entities.Update.update(item.id, data),
    onSuccess: onSaved,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    saveMutation.mutate(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-card z-10">
          <h2 className="font-display text-lg font-bold text-primary">
            {isNew ? 'Add New Update' : `Edit: ${item.title}`}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-1.5">
            <Label>Title *</Label>
            <Input required value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="Update headline…" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select value={form.category} onValueChange={(v) => set('category', v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Published Date</Label>
              <Input type="date" value={form.published_date} onChange={(e) => set('published_date', e.target.value)} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Excerpt * <span className="text-muted-foreground font-normal text-xs">(shown in card)</span></Label>
            <Textarea required value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} rows={3} placeholder="Short 2–3 sentence summary…" />
          </div>

          <div className="space-y-1.5">
            <Label>Full Body <span className="text-muted-foreground font-normal text-xs">(optional)</span></Label>
            <Textarea value={form.body} onChange={(e) => set('body', e.target.value)} rows={6} placeholder="Full article content…" />
          </div>

          <div className="space-y-1.5">
            <Label>Image URL</Label>
            <Input value={form.image_url} onChange={(e) => set('image_url', e.target.value)} placeholder="https://…" />
            {form.image_url && (
              <img src={form.image_url} alt="preview" className="mt-2 w-full h-36 object-cover rounded-xl" />
            )}
          </div>

          <div className="flex items-center gap-3">
            <Switch checked={form.is_published} onCheckedChange={(v) => set('is_published', v)} />
            <Label className="cursor-pointer">Published (visible on site)</Label>
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button
              type="submit"
              disabled={saveMutation.isPending}
              className="bg-secondary text-secondary-foreground hover:brightness-110 rounded-full gap-1.5"
            >
              {saveMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              {isNew ? 'Create Update' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}