import { 
  useListCaseStudies, 
  useCreateCaseStudy, 
  useUpdateCaseStudy, 
  useDeleteCaseStudy,
  CaseStudy
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Plus, MoreHorizontal, Pencil, Trash, Star, StarOff, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CaseStudies() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: caseStudies = [], isLoading } = useListCaseStudies();
  
  const toggleFeatured = useUpdateCaseStudy();
  const deleteCaseStudy = useDeleteCaseStudy();

  const handleToggleFeatured = (cs: CaseStudy) => {
    toggleFeatured.mutate(
      { id: cs.id, data: { featured: !cs.featured } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["/api/case-studies"] });
          toast({ title: "Case study updated" });
        }
      }
    );
  };

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this case study?")) return;
    
    deleteCaseStudy.mutate(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["/api/case-studies"] });
          toast({ title: "Case study deleted" });
        }
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Case Studies</h1>
          <p className="text-muted-foreground mt-2">Manage detailed client stories.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Case Study
        </Button>
      </div>

      <div className="border rounded-md bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : caseStudies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No case studies found.
                </TableCell>
              </TableRow>
            ) : (
              caseStudies.map((cs) => (
                <TableRow key={cs.id}>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleToggleFeatured(cs)}
                      className={cs.featured ? "text-yellow-500 hover:text-yellow-600" : "text-muted-foreground"}
                    >
                      {cs.featured ? <Star className="h-4 w-4 fill-current" /> : <StarOff className="h-4 w-4" />}
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium">{cs.title}</TableCell>
                  <TableCell>{cs.client || "—"}</TableCell>
                  <TableCell>{cs.industry || "—"}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDelete(cs.id)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
