import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { X, Plus, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function ServiceForm({ item, onClose, onSaved }) {
  const isNew = !item.id;
  const [form, setForm] = useState({
    title: item.title || '',
    subtitle: item.subtitle || '',
    description: item.description || '',
    features: item.features || [''],
    image_url: item.image_url || '',
    order: item.order ?? 99,
    is_active: item.is_active !== false,
  });

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const setFeature = (i, val) => {
    const f = [...form.features];
    f[i] = val;
    set('features', f);
  };

  const addFeature = () => set('features', [...form.features, '']);
  const removeFeature = (i) => set('features', form.features.filter((_, idx) => idx !== i));

  const saveMutation = useMutation({
    mutationFn: (data) =>
      isNew
        ? base44.entities.ServiceItem.create(data)
        : base44.entities.ServiceItem.update(item.id, data),
    onSuccess: onSaved,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    saveMutation.mutate({
      ...form,
      features: form.features.filter((f) => f.trim()),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-card z-10">
          <h2 className="font-display text-lg font-bold text-primary">
            {isNew ? 'Add New Service' : `Edit: ${item.title}`}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label>Title *</Label>
              <Input required value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="e.g. Maize Shelling" />
            </div>
            <div className="space-y-1.5">
              <Label>Subtitle / Machine</Label>
              <Input value={form.subtitle} onChange={(e) => set('subtitle', e.target.value)} placeholder="e.g. 7.5 HP Maize Sheller" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Description *</Label>
            <Textarea required value={form.description} onChange={(e) => set('description', e.target.value)} rows={4} placeholder="Full service description…" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Feature Bullet Points</Label>
              <button type="button" onClick={addFeature} className="text-secondary text-xs flex items-center gap-1 hover:underline">
                <Plus className="w-3 h-3" /> Add
              </button>
            </div>
            <div className="space-y-2">
              {form.features.map((f, i) => (
                <div key={i} className="flex gap-2">
                  <Input value={f} onChange={(e) => setFeature(i, e.target.value)} placeholder={`Feature ${i + 1}`} />
                  <button type="button" onClick={() => removeFeature(i)} className="text-muted-foreground hover:text-destructive shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Image URL</Label>
            <Input value={form.image_url} onChange={(e) => set('image_url', e.target.value)} placeholder="https://…" />
            {form.image_url && (
              <img src={form.image_url} alt="preview" className="mt-2 w-full h-36 object-cover rounded-xl" />
            )}
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label>Display Order</Label>
              <Input type="number" value={form.order} onChange={(e) => set('order', Number(e.target.value))} min={1} />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <Switch checked={form.is_active} onCheckedChange={(v) => set('is_active', v)} />
              <Label className="cursor-pointer">Active (visible on site)</Label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button
              type="submit"
              disabled={saveMutation.isPending}
              className="bg-secondary text-secondary-foreground hover:brightness-110 rounded-full gap-1.5"
            >
              {saveMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              {isNew ? 'Create Service' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}