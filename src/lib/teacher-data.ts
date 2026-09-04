import { supabase } from "@/integrations/supabase/client";

export const TEACHER_NAME = "Anushka Ma'am";

export type ReportCard = {
  id: string;
  teacher_name: string;
  curiosity_rating: number | null;
  asking_questions_rating: number | null;
  classroom_participation_rating: number | null;
  responsibility_rating: number | null;
  attention_rating: number | null;
  listening_rating: number | null;
  confidence_rating: number | null;
  behaviour_rating: number | null;
  overall_rating: number | null;
  teacher_comment: string | null;
  created_at: string;
  updated_at: string;
};

export type Complaint = {
  id: string;
  teacher_name: string;
  complaint_text: string;
  created_at: string;
  updated_at: string;
};

export const RATING_FIELDS = [
  { key: "curiosity_rating", label: "Curiosity" },
  { key: "asking_questions_rating", label: "Asking Questions" },
  { key: "classroom_participation_rating", label: "Classroom Participation" },
  { key: "responsibility_rating", label: "Responsibility" },
  { key: "attention_rating", label: "Attention" },
  { key: "listening_rating", label: "Listening" },
  { key: "confidence_rating", label: "Confidence" },
  { key: "behaviour_rating", label: "Behaviour" },
  { key: "overall_rating", label: "Overall Student Rating" },
] as const;

export type RatingKey = (typeof RATING_FIELDS)[number]["key"];

export async function fetchLatestReportCard(): Promise<ReportCard | null> {
  const { data, error } = await supabase
    .from("report_card_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);
  if (error) throw error;
  return (data?.[0] as ReportCard) ?? null;
}

export async function submitReportCard(input: {
  ratings: Record<RatingKey, number | null>;
  comment: string;
}) {
  const { data, error } = await supabase
    .from("report_card_submissions")
    .insert({
      teacher_name: TEACHER_NAME,
      ...input.ratings,
      teacher_comment: input.comment.trim() || null,
    })
    .select()
    .single();
  if (error) throw error;
  return data as ReportCard;
}

export async function deleteReportCard(id: string) {
  const { error } = await supabase.from("report_card_submissions").delete().eq("id", id);
  if (error) throw error;
}

export async function fetchComplaints(): Promise<Complaint[]> {
  const { data, error } = await supabase
    .from("teacher_complaints")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Complaint[];
}

export async function addComplaint(text: string) {
  const { error } = await supabase
    .from("teacher_complaints")
    .insert({ teacher_name: TEACHER_NAME, complaint_text: text.trim() });
  if (error) throw error;
}

export async function updateComplaint(id: string, text: string) {
  const { error } = await supabase
    .from("teacher_complaints")
    .update({ complaint_text: text.trim() })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteComplaint(id: string) {
  const { error } = await supabase.from("teacher_complaints").delete().eq("id", id);
  if (error) throw error;
}

export function formatDateTime(iso: string) {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" }),
    time: d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }),
  };
}
