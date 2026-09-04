CREATE TABLE public.report_card_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  teacher_name TEXT NOT NULL DEFAULT 'Anushka Ma''am',
  curiosity_rating SMALLINT CHECK (curiosity_rating BETWEEN 1 AND 5),
  asking_questions_rating SMALLINT CHECK (asking_questions_rating BETWEEN 1 AND 5),
  classroom_participation_rating SMALLINT CHECK (classroom_participation_rating BETWEEN 1 AND 5),
  responsibility_rating SMALLINT CHECK (responsibility_rating BETWEEN 1 AND 5),
  attention_rating SMALLINT CHECK (attention_rating BETWEEN 1 AND 5),
  listening_rating SMALLINT CHECK (listening_rating BETWEEN 1 AND 5),
  confidence_rating SMALLINT CHECK (confidence_rating BETWEEN 1 AND 5),
  behaviour_rating SMALLINT CHECK (behaviour_rating BETWEEN 1 AND 5),
  overall_rating SMALLINT CHECK (overall_rating BETWEEN 1 AND 5),
  teacher_comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.teacher_complaints (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  teacher_name TEXT NOT NULL DEFAULT 'Anushka Ma''am',
  complaint_text TEXT NOT NULL CHECK (length(btrim(complaint_text)) > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.report_card_submissions TO anon, authenticated;
GRANT ALL ON public.report_card_submissions TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.teacher_complaints TO anon, authenticated;
GRANT ALL ON public.teacher_complaints TO service_role;

ALTER TABLE public.report_card_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_complaints ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read report cards" ON public.report_card_submissions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can add a report card" ON public.report_card_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can update a report card" ON public.report_card_submissions FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can delete a report card" ON public.report_card_submissions FOR DELETE TO anon, authenticated USING (true);

CREATE POLICY "Anyone can read complaints" ON public.teacher_complaints FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can add complaints" ON public.teacher_complaints FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can update complaints" ON public.teacher_complaints FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can delete complaints" ON public.teacher_complaints FOR DELETE TO anon, authenticated USING (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_report_card_updated_at BEFORE UPDATE ON public.report_card_submissions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_complaints_updated_at BEFORE UPDATE ON public.teacher_complaints FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();