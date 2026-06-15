import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Plus, Pencil, Trash2, GripVertical, ToggleLeft, ToggleRight, X, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import ServiceForm from './ServiceForm';
import DeleteConfirm from './DeleteConfirm';

export default function ServicesManager() {
  const qc = useQueryClient();
  const [editingItem, setEditingItem] = useState(null); // null=closed, {}=new, item=edit
  const [deletingId, setDeletingId] = useState(null);

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['admin-services'],
    queryFn: () => base44.entities.ServiceItem.list('order', 50),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.ServiceItem.delete(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-services'] }); qc.invalidateQueries({ queryKey: ['services'] }); setDeletingId(null); },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, val }) => base44.entities.ServiceItem.update(id, { is_active: val }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-services'] }); qc.invalidateQueries({ queryKey: ['services'] }); },
  });

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-primary">Services Grid</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Manage the services shown on the public Services page.</p>
        </div>
        <Button
          onClick={() => setEditingItem({})}
          className="bg-secondary text-secondary-foreground hover:brightness-110 rounded-full text-sm gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Service
        </Button>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading…
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground text-sm">
            No services yet. Click "Add Service" to create one.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">Service</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider hidden md:table-cell">Subtitle</th>
                <th className="text-center px-5 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">Active</th>
                <th className="text-right px-5 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {services.map((svc) => (
                <tr key={svc.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {svc.image_url && (
                        <img src={svc.image_url} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                      )}
                      <div>
                        <p className="font-semibold text-foreground">{svc.title}</p>
                        <p className="text-muted-foreground text-xs mt-0.5 line-clamp-1 max-w-xs">{svc.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground hidden md:table-cell">{svc.subtitle}</td>
                  <td className="px-5 py-4 text-center">
                    <Switch
                      checked={svc.is_active !== false}
                      onCheckedChange={(val) => toggleMutation.mutate({ id: svc.id, val })}
                    />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingItem(svc)}
                        className="h-8 px-3 text-xs gap-1"
                      >
                        <Pencil className="w-3 h-3" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setDeletingId(svc.id)}
                        className="h-8 px-3 text-xs gap-1 text-destructive border-destructive/30 hover:bg-destructive/5"
                      >
                        <Trash2 className="w-3 h-3" /> Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Form modal */}
      {editingItem !== null && (
        <ServiceForm
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSaved={() => {
            qc.invalidateQueries({ queryKey: ['admin-services'] });
            qc.invalidateQueries({ queryKey: ['services'] });
            setEditingItem(null);
          }}
        />
      )}

      {/* Delete confirm */}
      {deletingId && (
        <DeleteConfirm
          message="Delete this service? It will be removed from the public site immediately."
          onConfirm={() => deleteMutation.mutate(deletingId)}
          onCancel={() => setDeletingId(null)}
          loading={deleteMutation.isPending}
        />
      )}
    </div>
  );
}