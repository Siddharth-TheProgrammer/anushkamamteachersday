import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Petals } from "@/components/Petals";
import { Reveal } from "@/components/Reveal";
import { ReportCardSection } from "@/components/ReportCardSection";
import { ComplaintBoxSection } from "@/components/ComplaintBoxSection";
import { Button } from "@/components/ui/button";
import floralFrame from "@/assets/floral-frame.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Teachers' Day, Anushka Ma'am 🌸" },
      {
        name: "description",
        content:
          "A warm digital Teachers' Day card for Anushka Ma'am, Maths & Science teacher, with a report card and complaint box she can fill in herself.",
      },
      { property: "og:title", content: "Happy Teachers' Day, Anushka Ma'am 🌸" },
      {
        property: "og:description",
        content: "A little digital surprise from her student, Siddharth Yadav.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TeachersDayPage,
});

const APPRECIATION = [
  {
    title: "You teach beautifully",
    text: "Your classes never feel like something to get through — they feel like something to understand.",
  },
  {
    title: "You explain patiently",
    text: "Whether it's a Maths problem or a Science concept, you keep explaining until it actually clicks.",
  },
  {
    title: "You make hard things simple",
    text: "Difficult chapters stop looking scary once you break them down.",
  },
  {
    title: "You are genuinely kind",
    text: "Your kindness isn't an act for the classroom. It's just who you are.",
  },
  {
    title: "You are warm and approachable",
    text: "Nobody hesitates before walking up to your desk with a doubt.",
  },
  {
    title: "You make us comfortable",
    text: "Sharing a thought in your class never feels like a risk.",
  },
  {
    title: "You trust your students",
    text: "That trust quietly makes us want to deserve it.",
  },
  {
    title: "You listen before judging",
    text: "You hear the whole thing first. That matters more than you know.",
  },
  {
    title: "You encourage us",
    text: "One line of encouragement from you can fix an entire bad day.",
  },
  {
    title: "You create a positive classroom",
    text: "Your room feels calm, and calm is where learning actually happens.",
  },
  {
    title: "You are never unnecessarily strict",
    text: "You keep discipline without making anyone feel small.",
  },
  {
    title: "You care about our growth",
    text: "You notice progress, not just marks — and we can feel that.",
  },
];

const LESSONS = [
  {
    num: "01",
    title: "Confidence",
    text: "Before your classes, I used to keep half my questions to myself in case they sounded silly. You never once made a question feel silly, and slowly I started raising my hand, saying what I actually thought, and trusting that my own reasoning was worth hearing. That confidence didn't come from a chapter — it came from the way you responded.",
  },
  {
    num: "02",
    title: "Responsibility",
    text: "You have a way of expecting the best from us without pressuring us, and that made me want to own my work instead of making excuses for it. Because of your guidance, I've learnt that being responsible isn't about being scared of consequences — it's about respecting the effort someone else is putting into you.",
  },
  {
    num: "03",
    title: "Being a Better Person",
    text: "The biggest lesson wasn't in Maths or Science. Watching how patiently and kindly you treat every student taught me that kindness is a habit you choose, again and again. I've genuinely tried to be gentler and more understanding with people around me because of the example you set.",
  },
];

function TeachersDayPage() {
  const [opened, setOpened] = useState(false);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Petals />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-5 py-16">
        <div className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-border/50 bg-card shadow-[var(--shadow-card)]">
          <img
            src={floralFrame}
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-95"
          />
          <div className="relative px-7 py-16 text-center md:px-20 md:py-24">
            <p className="font-display text-xl text-primary md:text-2xl">5th September</p>
            <h1 className="mt-3 text-4xl leading-tight md:text-6xl">
              Happy Teachers' Day,
              <br />
              <span className="bg-gradient-to-r from-[oklch(0.68_0.12_12)] via-[oklch(0.65_0.1_320)] to-[oklch(0.72_0.11_45)] bg-clip-text text-transparent">
                Anushka Ma'am!
              </span>{" "}
              🌸
            </h1>
            <p className="mt-6 text-lg text-foreground/80">
              A little digital surprise from your student.
            </p>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              For the teacher who takes me through Maths and Science — and somehow makes both of
              them feel a lot less frightening.
            </p>
            {!opened ? (
              <Button
                size="lg"
                className="mt-8 rounded-full px-8 text-base"
                onClick={() => {
                  setOpened(true);
                  requestAnimationFrame(() =>
                    document.getElementById("thank-you")?.scrollIntoView({ behavior: "smooth" }),
                  );
                }}
              >
                Open Your Card ✨
              </Button>
            ) : (
              <p className="mt-8 text-sm text-muted-foreground">
                Scroll down, Ma'am — there's a little more waiting. ↓
              </p>
            )}
          </div>
        </div>
      </section>

      {opened && (
        <div className="relative z-10">
          <section id="thank-you" className="mx-auto w-full max-w-3xl px-5 py-20">
            <Reveal>
              <div className="paper-card p-7 md:p-12">
                <h2 className="text-4xl md:text-5xl">Thank You, Anushka Ma'am.</h2>
                <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
                  <p>
                    I think a lot of people assume teaching is only about chapters, homework,
                    exams, marks, Maths problems and Science concepts. Watching you teach, I've
                    realised it's far more than that.
                  </p>
                  <p>
                    It's the smaller things — listening properly when a student speaks,
                    encouraging someone who has just got an answer wrong, explaining the same step
                    a third time without a hint of irritation, trusting us, and quietly building a
                    classroom where nobody feels awkward. Those things don't appear in any
                    syllabus, but they stay with a student for a very long time.
                  </p>
                  <p>
                    Your kindness and your willingness to listen are the reasons I feel
                    comfortable sharing my thoughts and asking questions instead of keeping them
                    to myself. Thank you for that, Ma'am. It has made learning feel much lighter.
                  </p>
                </div>
              </div>
            </Reveal>
          </section>

          <section className="mx-auto w-full max-w-6xl px-5 py-20">
            <Reveal>
              <h2 className="text-center text-4xl md:text-5xl">What I Appreciate About You</h2>
              <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
                A few things I notice, in no particular order.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {APPRECIATION.map((item, i) => (
                <Reveal key={item.title} delay={i * 50}>
                  <div className="paper-card h-full p-6">
                    <span className="block size-2 rounded-full bg-primary/70" />
                    <h3 className="mt-4 text-2xl">{item.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="mx-auto w-full max-w-6xl px-5 py-20">
            <Reveal>
              <h2 className="text-center text-4xl md:text-5xl">Things I've Learned From You</h2>
              <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
                Beyond the classroom, beyond the syllabus.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {LESSONS.map((lesson, i) => (
                <Reveal key={lesson.title} delay={i * 100}>
                  <div className="paper-card h-full bg-gradient-to-br from-secondary/40 to-transparent p-7">
                    <p className="font-display text-3xl text-primary">{lesson.num}</p>
                    <h3 className="mt-2 text-2xl">{lesson.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{lesson.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <ReportCardSection />
          <ComplaintBoxSection />

          <section className="mx-auto w-full max-w-3xl px-5 py-20">
            <Reveal>
              <div className="paper-card p-7 md:p-12">
                <h2 className="text-center text-4xl md:text-5xl">A Message From Your Student</h2>
                <div className="mt-8 space-y-4 text-lg leading-relaxed text-muted-foreground">
                  <p>Dear Anushka Ma'am,</p>
                  <p>
                    I've thought about this a lot, and I don't think a teacher becomes memorable
                    because of one particular lesson. I think it's the way they make a student
                    feel — heard, encouraged, trusted, and comfortable enough to speak up. That is
                    exactly what you've given me.
                  </p>
                  <p>
                    I'm genuinely grateful that you're the one teaching me Maths and Science.
                    You've made two subjects that many people are anxious about feel approachable,
                    and more than that, you've made the classroom a place where I can admit I
                    didn't understand something without feeling embarrassed about it.
                  </p>
                  <p>
                    Your kindness does not go unnoticed, Ma'am. The trust you place in your
                    students means a great deal to me — you give me space to share what I think,
                    and you listen before forming an opinion. That is rarer than you probably
                    realise, and it has helped me in ways that go well beyond academics.
                  </p>
                  <p>
                    I respect you deeply, and I hope that as I keep learning and growing, my work
                    and my behaviour show you that your guidance was never taken for granted. Your
                    encouragement genuinely matters to me, and I'd like to make you proud through
                    what I actually do, not just what I say here.
                  </p>
                  <p>
                    Thank you for every patient explanation, every encouraging word, every time
                    you listened, and every bit of trust you placed in me. I may forget a few
                    chapters along the way, but I know I'll remember the kind of teacher you were
                    to me.
                  </p>
                  <p className="font-display text-2xl text-foreground">
                    Happy Teachers' Day, Anushka Ma'am.
                  </p>
                </div>
              </div>
            </Reveal>
          </section>

          <section className="mx-auto w-full max-w-3xl px-5 pb-16 pt-10">
            <Reveal>
              <div className="relative overflow-hidden rounded-[2rem] border border-border/50 bg-card shadow-[var(--shadow-card)]">
                <img
                  src={floralFrame}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-95"
                />
                <div className="relative px-7 py-14 text-center md:px-16">
                  <div className="text-4xl">🌷</div>
                  <h2 className="mt-4 text-3xl md:text-4xl">
                    Thank You For Everything, Anushka Ma'am.
                  </h2>
                  <div className="mt-6 space-y-3 leading-relaxed text-muted-foreground">
                    <p>Some teachers teach lessons.</p>
                    <p>
                      Some teachers leave lessons behind that stay with their students for years.
                    </p>
                    <p>
                      Thank you for being a teacher whose kindness, trust, and guidance I will
                      always remember.
                    </p>
                  </div>
                  <p className="mt-6 font-display text-2xl text-foreground">
                    Happy Teachers' Day! ❤️
                  </p>
                  <p className="script-accent mt-6 text-3xl">
                    — From your student, Siddharth Yadav
                  </p>
                </div>
              </div>
            </Reveal>
          </section>

          <footer className="pb-16 text-center text-sm text-muted-foreground">
            Made with care for Anushka Ma'am — Maths &amp; Science teacher.
          </footer>
        </div>
      )}
    </main>
  );
}
