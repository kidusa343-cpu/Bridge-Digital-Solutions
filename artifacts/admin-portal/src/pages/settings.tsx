import { useState } from "react";
import { 
  useListSettings, 
  useUpsertSetting,
  Setting
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Loader2, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

export default function Settings() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: settings = [], isLoading } = useListSettings();
  const upsertSetting = useUpsertSetting();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const handleEdit = (setting: Setting) => {
    setEditingKey(setting.key);
    setEditValue(setting.value);
    setEditDesc(setting.description || "");
    setDialogOpen(true);
  };

  const handleNew = () => {
    setEditingKey("");
    setEditValue("");
    setEditDesc("");
    setDialogOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingKey || !editValue) return;

    upsertSetting.mutate(
      { key: editingKey, data: { value: editValue, description: editDesc } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["/api/settings"] });
          toast({ title: "Setting saved" });
          setDialogOpen(false);
        }
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Platform Settings</h1>
          <p className="text-muted-foreground mt-2">Manage global key-value configuration.</p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleNew}>
              <Plus className="h-4 w-4 mr-2" />
              New Setting
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingKey ? "Edit Setting" : "New Setting"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Key</Label>
                <Input 
                  value={editingKey} 
                  onChange={(e) => setEditingKey(e.target.value)} 
                  disabled={!!settings.find(s => s.key === editingKey)}
                  required 
                  placeholder="e.g., site.maintenance"
                />
              </div>
              <div className="space-y-2">
                <Label>Value</Label>
                <Input 
                  value={editValue} 
                  onChange={(e) => setEditValue(e.target.value)} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input 
                  value={editDesc} 
                  onChange={(e) => setEditDesc(e.target.value)} 
                />
              </div>
              <div className="flex justify-end pt-2">
                <Button type="submit" disabled={upsertSetting.isPending}>
                  {upsertSetting.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/4">Key</TableHead>
              <TableHead className="w-1/3">Value</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : settings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  No settings configured.
                </TableCell>
              </TableRow>
            ) : (
              settings.map((setting) => (
                <TableRow key={setting.id}>
                  <TableCell className="font-mono text-sm font-medium">{setting.key}</TableCell>
                  <TableCell className="font-mono text-sm truncate max-w-[200px]">{setting.value}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{setting.description}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(setting)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
