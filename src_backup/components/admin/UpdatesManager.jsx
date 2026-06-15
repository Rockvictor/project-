import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import UpdateForm from './UpdateForm';
import DeleteConfirm from './DeleteConfirm';
import { format } from 'date-fns';

const CATEGORY_COLORS = {
  News: 'bg-blue-100 text-blue-700',
  Product: 'bg-secondary/20 text-secondary-foreground',
  Community: 'bg-accent/20 text-accent',
  Impact: 'bg-green-100 text-green-700',
  Event: 'bg-purple-100 text-purple-700',
};

export default function UpdatesManager() {
  const qc = useQueryClient();
  const [editingItem, setEditingItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const { data: updates = [], isLoading } = useQuery({
    queryKey: ['admin-updates'],
    queryFn: () => base44.entities.Update.list('-published_date', 50),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Update.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-updates'] });
      qc.invalidateQueries({ queryKey: ['updates'] });
      setDeletingId(null);
    },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, val }) => base44.entities.Update.update(id, { is_published: val }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-updates'] });
      qc.invalidateQueries({ queryKey: ['updates'] });
    },
  });

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-primary">Latest Updates</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Manage news, product announcements, and community stories.</p>
        </div>
        <Button
          onClick={() => setEditingItem({})}
          className="bg-secondary text-secondary-foreground hover:brightness-110 rounded-full text-sm gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Update
        </Button>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading…
          </div>
        ) : updates.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground text-sm">
            No updates yet. Click "Add Update" to create one.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">Title</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider hidden lg:table-cell">Category</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider hidden md:table-cell">Date</th>
                <th className="text-center px-5 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">Published</th>
                <th className="text-right px-5 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {updates.map((upd) => (
                <tr key={upd.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {upd.image_url && (
                        <img src={upd.image_url} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0 hidden sm:block" />
                      )}
                      <div>
                        <p className="font-semibold text-foreground line-clamp-1">{upd.title}</p>
                        <p className="text-muted-foreground text-xs mt-0.5 line-clamp-1 max-w-xs">{upd.excerpt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[upd.category] || 'bg-muted text-muted-foreground'}`}>
                      {upd.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground hidden md:table-cell text-xs">
                    {upd.published_date ? format(new Date(upd.published_date), 'dd MMM yyyy') : '—'}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <Switch
                      checked={upd.is_published !== false}
                      onCheckedChange={(val) => toggleMutation.mutate({ id: upd.id, val })}
                    />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingItem(upd)}
                        className="h-8 px-3 text-xs gap-1"
                      >
                        <Pencil className="w-3 h-3" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setDeletingId(upd.id)}
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

      {editingItem !== null && (
        <UpdateForm
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSaved={() => {
            qc.invalidateQueries({ queryKey: ['admin-updates'] });
            qc.invalidateQueries({ queryKey: ['updates'] });
            setEditingItem(null);
          }}
        />
      )}

      {deletingId && (
        <DeleteConfirm
          message="Delete this update? It will be removed from the public site immediately."
          onConfirm={() => deleteMutation.mutate(deletingId)}
          onCancel={() => setDeletingId(null)}
          loading={deleteMutation.isPending}
        />
      )}
    </div>
  );
}