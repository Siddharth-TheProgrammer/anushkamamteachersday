import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Reveal } from "@/components/Reveal";
import { StarRating } from "@/components/StarRating";
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
  RATING_FIELDS,
  deleteReportCard,
  fetchLatestReportCard,
  formatDateTime,
  submitReportCard,
  type RatingKey,
} from "@/lib/teacher-data";

const EMPTY: Record<RatingKey, number | null> = RATING_FIELDS.reduce(
  (acc, f) => ({ ...acc, [f.key]: null }),
  {} as Record<RatingKey, number | null>,
);

export function ReportCardSection() {
  const queryClient = useQueryClient();
  const [ratings, setRatings] = useState<Record<RatingKey, number | null>>(EMPTY);
  const [comment, setComment] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { data: saved, isLoading } = useQuery({
    queryKey: ["report-card"],
    queryFn: fetchLatestReportCard,
  });

  const submit = useMutation({
    mutationFn: () => submitReportCard({ ratings, comment }),
    onSuccess: () => {
      setRatings(EMPTY);
      setComment("");
      toast.success("Report card saved. Thank you, Anushka Ma'am 🌸");
      queryClient.invalidateQueries({ queryKey: ["report-card"] });
    },
    onError: () => toast.error("Something went wrong while saving your report. Please try again."),
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteReportCard(id),
    onSuccess: () => {
      setConfirmDelete(false);
      queryClient.setQueryData(["report-card"], null);
      toast.success("Ratings deleted. You can fill the report card again.");
      queryClient.invalidateQueries({ queryKey: ["report-card"] });
    },
    onError: () =>
      toast.error("Something went wrong while deleting the ratings. Please try again."),
  });

  const filledCount = RATING_FIELDS.filter((f) => ratings[f.key] !== null).length;

  return (
    <section id="report-card" className="mx-auto w-full max-w-3xl px-5 py-20">
      <Reveal>
        <h2 className="text-center text-4xl md:text-5xl">Anushka Ma'am's Student Report Card 📋</h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
          Ma'am, this part of the page belongs to you. Please rate your student, Siddharth Yadav,
          honestly — every star starts empty.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div className="paper-card mt-10 p-6 md:p-9">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:gap-12">
            <div className="min-w-0">
              <h3 className="text-3xl">Fill in the report card</h3>
              <div className="mt-6 space-y-5">
                {RATING_FIELDS.map((field) => (
                  <div
                    key={field.key}
                    className="flex flex-col gap-2 border-b border-border/60 pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="text-base font-medium">{field.label}</span>
                    <StarRating
                      label={field.label}
                      value={ratings[field.key]}
                      onChange={(v) => setRatings((prev) => ({ ...prev, [field.key]: v }))}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-7">
                <label htmlFor="teacher-comment" className="mb-2 block text-base font-medium">
                  Anything you would like to say about your student?
                </label>
                <Textarea
                  id="teacher-comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  placeholder="Optional — a few words from you would mean a lot."
                  className="rounded-2xl bg-background/70"
                />
              </div>

              <Button
                size="lg"
                className="mt-6 w-full rounded-full"
                disabled={submit.isPending || filledCount === 0}
                onClick={() => submit.mutate()}
              >
                {submit.isPending ? "Saving…" : "Submit My Report Card ✨"}
              </Button>
              {filledCount === 0 && (
                <p className="mt-3 text-center text-sm text-muted-foreground">
                  Please give at least one rating before submitting.
                </p>
              )}
            </div>

            <div className="min-w-0 border-t border-border/60 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <h3 className="text-3xl">Your Teacher's Rating ⭐</h3>
              {isLoading ? (
                <p className="mt-4 text-muted-foreground">Loading…</p>
              ) : !saved ? (
                <p className="mt-4 text-muted-foreground">
                  Your report card is waiting for Anushka Ma'am's verdict. 👀
                </p>
              ) : (
                <>
                  <div className="mt-5 space-y-3">
                    {RATING_FIELDS.map((field) => (
                      <div
                        key={field.key}
                        className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <span className="text-muted-foreground">{field.label}</span>
                        {saved[field.key] === null ? (
                          <span className="text-sm text-muted-foreground">Not rated</span>
                        ) : (
                          <StarRating readOnly label={field.label} value={saved[field.key]} />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-2xl bg-secondary/50 p-5">
                    <h4 className="font-display text-2xl">Your Teacher's Note 💌</h4>
                    <p className="mt-2 whitespace-pre-wrap leading-relaxed">
                      {saved.teacher_comment ?? "Ma'am chose to let the stars speak this time."}
                    </p>
                  </div>

                  <p className="mt-4 text-sm text-muted-foreground">
                    Submitted on {formatDateTime(saved.created_at).date} at{" "}
                    {formatDateTime(saved.created_at).time}
                  </p>

                  <Button
                    variant="outline"
                    className="mt-5 rounded-full"
                    onClick={() => setConfirmDelete(true)}
                  >
                    🗑️ Delete these ratings
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </Reveal>

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete these ratings?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes the saved report card only. Your complaints will stay exactly where they
              are.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="rounded-full"
              onClick={(e) => {
                e.preventDefault();
                if (saved) remove.mutate(saved.id);
              }}
            >
              Delete Ratings
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
