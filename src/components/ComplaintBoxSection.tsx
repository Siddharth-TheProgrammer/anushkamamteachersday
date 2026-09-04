import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  addComplaint,
  deleteComplaint,
  fetchComplaints,
  formatDateTime,
  updateComplaint,
} from "@/lib/teacher-data";

export function ComplaintBoxSection() {
  const queryClient = useQueryClient();
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: complaints, isLoading } = useQuery({
    queryKey: ["complaints"],
    queryFn: fetchComplaints,
  });

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["complaints"] });

  const create = useMutation({
    mutationFn: () => addComplaint(text),
    onSuccess: () => {
      setText("");
      toast.success(
        "Complaint successfully recorded. 😭 I will definitely read it… and probably pretend I wasn't warned.",
      );
      refresh();
    },
    onError: () =>
      toast.error("Something went wrong while saving your complaint. Please try again."),
  });

  const edit = useMutation({
    mutationFn: (id: string) => updateComplaint(id, editingText),
    onSuccess: () => {
      setEditingId(null);
      setEditingText("");
      toast.success("Complaint updated.");
      refresh();
    },
    onError: () =>
      toast.error("Something went wrong while updating your complaint. Please try again."),
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteComplaint(id),
    onSuccess: () => {
      setDeleteId(null);
      toast.success("Complaint deleted.");
      refresh();
    },
    onError: () =>
      toast.error("Something went wrong while deleting your complaint. Please try again."),
  });

  return (
    <section id="complaint-box" className="mx-auto w-full max-w-3xl px-5 py-20">
      <Reveal>
        <h2 className="text-center text-4xl md:text-5xl">Anushka Ma'am's Complaint Box 📮</h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
          Ma'am, you finally have an official place to complain about your student, Siddharth
          Yadav. 😭
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div className="paper-card mt-10 p-6 md:p-9">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            placeholder="Write anything you would like to tell your student…"
            className="rounded-2xl bg-background/70 text-base"
          />
          <Button
            size="lg"
            className="mt-5 w-full rounded-full"
            disabled={create.isPending || text.trim().length === 0}
            onClick={() => create.mutate()}
          >
            {create.isPending ? "Sending…" : "Submit Complaint 📮"}
          </Button>
          {text.trim().length === 0 && (
            <p className="mt-3 text-center text-sm text-muted-foreground">
              Please write something before submitting.
            </p>
          )}
        </div>
      </Reveal>

      <Reveal delay={150}>
        <div className="mt-14">
          <h3 className="text-center text-3xl">Complaints From Your Teacher 📮</h3>
          {isLoading ? (
            <p className="mt-6 text-center text-muted-foreground">Loading…</p>
          ) : !complaints || complaints.length === 0 ? (
            <p className="mt-6 text-center text-muted-foreground">
              No complaints have been filed yet. I'm suspicious. 👀
            </p>
          ) : (
            <div className="mt-8 space-y-5">
              {complaints.map((c) => {
                const { date, time } = formatDateTime(c.updated_at);
                const isEditing = editingId === c.id;
                return (
                  <article key={c.id} className="paper-card p-5 md:p-6">
                    {isEditing ? (
                      <>
                        <Textarea
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          rows={4}
                          className="rounded-2xl bg-background/70"
                        />
                        <div className="mt-4 flex flex-wrap gap-3">
                          <Button
                            className="rounded-full"
                            disabled={edit.isPending || editingText.trim().length === 0}
                            onClick={() => edit.mutate(c.id)}
                          >
                            Save changes
                          </Button>
                          <Button
                            variant="outline"
                            className="rounded-full"
                            onClick={() => setEditingId(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="whitespace-pre-wrap leading-relaxed">{c.complaint_text}</p>
                        <p className="mt-3 text-sm text-muted-foreground">
                          {date} · {time}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-3">
                          <Button
                            variant="secondary"
                            className="rounded-full"
                            onClick={() => {
                              setEditingId(c.id);
                              setEditingText(c.complaint_text);
                            }}
                          >
                            Edit ✏️
                          </Button>
                          <Button
                            variant="outline"
                            className="rounded-full"
                            onClick={() => setDeleteId(c.id)}
                          >
                            Delete 🗑️
                          </Button>
                        </div>
                      </>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </Reveal>

      <AlertDialog open={deleteId !== null} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this complaint?</AlertDialogTitle>
            <AlertDialogDescription>
              Only this complaint will be removed. Everything else stays saved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="rounded-full"
              onClick={(e) => {
                e.preventDefault();
                if (deleteId) remove.mutate(deleteId);
              }}
            >
              Delete Complaint
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
