import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Petals } from "@/components/Petals";
import { Reveal } from "@/components/Reveal";
import { ReportCardSection } from "@/components/ReportCardSection";
import { ComplaintBoxSection } from "@/components/ComplaintBoxSection";
import { Button } from "@/components/ui/button";

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
  { title: "You teach beautifully", text: "Your classes never feel like something to get through. You teach with care, and it shows in the way we learn." },
  { title: "Patience with every doubt", text: "You explain Maths and Science patiently, even when the same doubt comes back for the third time." },
  { title: "Difficult made simple", text: "Somehow the concepts that looked impossible in the book become clear once you explain them your way." },
  { title: "Genuine kindness", text: "Your kindness isn't something you switch on for a class. It's just how you are with your students." },
  { title: "Warm and approachable", text: "Nobody hesitates before walking up to you with a question, and that says a lot." },
  { title: "A safe place to speak", text: "You make students comfortable sharing what they're thinking, even when they aren't sure it's right." },
  { title: "You trust your students", text: "That trust makes us want to be worth it." },
  { title: "You listen first", text: "You hear the whole thing before deciding anything. That's rarer than it sounds." },
  { title: "Always encouraging", text: "A small line of encouragement from you can change how an entire week feels." },
  { title: "A positive classroom", text: "The atmosphere in your class is calm and easy, and learning happens naturally in it." },
  { title: "Never unnecessarily strict", text: "You keep discipline without making anyone feel small." },
  { title: "You genuinely care", text: "We can tell that our learning and growth actually matter to you." },
];

const LESSONS = [
  {
    emoji: "🌱",
    title: "Confidence",
    text: "Before, I used to hold my questions back in case they sounded silly. The way you respond — calmly, without making anyone feel foolish — slowly changed that. Now I ask, I speak up, and I believe a little more in what I'm capable of.",
  },
  {
    emoji: "📘",
    title: "Responsibility",
    text: "You never had to lecture me about being responsible. Watching how seriously you take your own work, and how you expect us to own our learning, taught me to take responsibility for my actions and my studies instead of finding excuses.",
  },
  {
    emoji: "💗",
    title: "Being a Better Person",
    text: "Some of the most important things I've learned from you were never part of any chapter. Your patience and kindness showed me the kind of person I'd like to be — someone who listens properly and treats people gently.",
  },
];

function TeachersDayPage() {
  const [opened, setOpened] = useState(false);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Petals />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-5 py-16">
        <div className="paper-card float-slow w-full max-w-2xl p-8 text-center md:p-14">
          <p className="script-accent text-3xl md:text-4xl">For my teacher</p>
          <h1 className="mt-3 text-4xl leading-tight md:text-6xl">
            Happy Teachers' Day, Anushka Ma'am! 🌸
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            A little digital surprise from your student.
          </p>
          <p className="mx-auto mt-5 max-w-md leading-relaxed">
            Ma'am, you teach me Maths and Science — two subjects that could easily feel heavy,
            but never do in your class. So instead of a card on paper, I made you this one.
          </p>
          {!opened && (
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
          )}
          {opened && (
            <p className="mt-8 text-sm text-muted-foreground">
              Scroll down, Ma'am — there's a little more waiting. ↓
            </p>
          )}
        </div>
      </section>

      {opened && (
        <div className="relative z-10">
          <section id="thank-you" className="mx-auto w-full max-w-3xl px-5 py-20">
            <Reveal>
              <div className="paper-card p-7 md:p-12">
                <h2 className="text-4xl md:text-5xl">Thank You, Anushka Ma'am.</h2>
                <div className="mt-6 space-y-4 text-lg leading-relaxed">
                  <p>
                    Teaching, I've realised, is not only about chapters, homework, exams, marks,
                    Maths problems and Science concepts. Those are the visible parts. The parts
                    that actually stay with a student are much quieter.
                  </p>
                  <p>
                    The way you listen before answering. The way you explain something a second
                    and third time without a trace of irritation. The way you encourage instead
                    of correcting harshly. The way you trust us. Those small things build a
                    classroom where a student can breathe, and they stay with us far longer than
                    any formula.
                  </p>
                  <p>
                    Because of your kindness and your willingness to listen, I've never felt
                    hesitant about asking you a question or sharing what I think. That comfort is
                    not something every student gets, and I don't take it lightly.
                  </p>
                  <p>Thank you, Ma'am. Genuinely.</p>
                </div>
              </div>
            </Reveal>
          </section>

          <section className="mx-auto w-full max-w-5xl px-5 py-20">
            <Reveal>
              <h2 className="text-center text-4xl md:text-5xl">What I Appreciate About You</h2>
              <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
                A few of the things I notice, in no particular order.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {APPRECIATION.map((item, i) => (
                <Reveal key={item.title} delay={i * 60}>
                  <div className="paper-card h-full p-6">
                    <h3 className="text-2xl">{item.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="mx-auto w-full max-w-4xl px-5 py-20">
            <Reveal>
              <h2 className="text-center text-4xl md:text-5xl">Things I've Learned From You</h2>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {LESSONS.map((lesson, i) => (
                <Reveal key={lesson.title} delay={i * 100}>
                  <div className="paper-card h-full p-7 text-center">
                    <div className="text-4xl">{lesson.emoji}</div>
                    <h3 className="mt-3 text-2xl">{lesson.title}</h3>
                    <p className="mt-3 text-left leading-relaxed text-muted-foreground">
                      {lesson.text}
                    </p>
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
                <h2 className="text-4xl md:text-5xl">A Message From Your Student</h2>
                <div className="mt-6 space-y-4 text-lg leading-relaxed">
                  <p>Dear Anushka Ma'am,</p>
                  <p>
                    I think a teacher becomes memorable less because of one particular lesson and
                    more because of how they make a student feel — heard, encouraged, trusted,
                    and comfortable enough to speak honestly. That is exactly what you've given
                    me, and it's the thing I appreciate most about you.
                  </p>
                  <p>
                    I'm grateful that you are the one teaching me Maths and Science. You notice
                    when something hasn't clicked, you slow down instead of moving on, and you
                    never make a question feel like a bother. Your kindness is noticed, Ma'am —
                    much more than you probably realise.
                  </p>
                  <p>
                    Your trust means a great deal to me. You give me space to share my thoughts,
                    you listen before forming an opinion, and you've made asking questions feel
                    normal rather than embarrassing. Because of that, your guidance has mattered
                    to me well beyond marks and syllabus.
                  </p>
                  <p>
                    I respect you deeply, and I'd like my work and the way I behave to show that
                    your effort was never taken for granted. As I keep learning and growing, I
                    hope I can make you proud — not with one good result, but with the kind of
                    student and person I turn out to be.
                  </p>
                  <p>
                    I may forget a few chapters over the years. I won't forget the kind of teacher
                    you were to me.
                  </p>
                  <p>Happy Teachers' Day, Anushka Ma'am. Thank you for everything.</p>
                  <p className="script-accent text-3xl">— Siddharth Yadav</p>
                </div>
              </div>
            </Reveal>
          </section>

          <section className="mx-auto w-full max-w-2xl px-5 pb-28 pt-10">
            <Reveal>
              <div className="paper-card float-slow p-8 text-center md:p-12">
                <div className="text-4xl">🌷</div>
                <h2 className="mt-4 text-3xl md:text-4xl">
                  Thank You For Everything, Anushka Ma'am. 🌷
                </h2>
                <div className="mt-6 space-y-3 text-lg leading-relaxed">
                  <p>Some teachers teach lessons.</p>
                  <p>
                    Some teachers leave lessons behind that stay with their students for years.
                  </p>
                  <p>
                    Thank you for being a teacher whose kindness, trust, and guidance I will
                    always remember.
                  </p>
                  <p>Happy Teachers' Day! ❤️</p>
                </div>
                <p className="script-accent mt-8 text-3xl">
                  — From your student, Siddharth Yadav
                </p>
              </div>
            </Reveal>
          </section>
        </div>
      )}
    </main>
  );
}
