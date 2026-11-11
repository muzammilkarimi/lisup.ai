import Navbar from "../../Navbar";
import SiteFooter from "../../SiteFooter";
import DownloadButton from "./DownloadButton";
import s from "./shared.module.css";
import c from "./students.module.css";

export default function StudentsPage() {
  return (
    <div className={`${s.page} ${c.page}`}>
      <Navbar />

      <section className={c.hero}>
        <div className={s.container}>
          <div className={c.paper}>
            <div className={c.holes} aria-hidden>
              <i />
              <i />
              <i />
            </div>
            <div className={c.paperGrid}>
              <div className={c.heroText}>
                <div className={`${s.caveat} ${c.date}`}>Mon · Week 7 · for students</div>
                <h1 className={`${s.bricolage} ${c.h1}`}>
                  Write faster.
                  <br />
                  <span className={c.hl}>Study smarter.</span>
                </h1>
                <p className={c.lead}>
                  Turn lecture fragments into organized notes, rough ideas into clear paragraphs, and textbook pages
                  into flashcards, just by speaking.
                </p>
                <div className={s.ctaRow}>
                  <DownloadButton location="role_students_hero" className={`${s.btn} ${s.btnDark}`} />
                  <a href="#day" className={`${s.btn} ${s.btnGhost}`} data-cursor style={{ background: "#fff" }}>
                    Follow Ethan&apos;s day
                  </a>
                </div>
              </div>

              <div className={c.notes} aria-label="Example: lecture fragments become structured notes">
                <div className={`${s.caveat} ${c.rawNote}`}>
                  photosynthesis splits water... release oxygen... CO2 turns to sugar??
                </div>
                <div className={`${s.caveat} ${c.cmd}`}>↓ &ldquo;format as bulleted lecture notes&rdquo;</div>
                <div className={c.noteCard}>
                  <div className={`${s.mono} ${c.noteMeta}`}>GOOGLE DOCS · BIOLOGY 101</div>
                  <h3 className={s.bricolage}>Photosynthesis</h3>
                  <ul>
                    <li>
                      <strong className={c.m1}>Light reactions:</strong> water splits, releasing oxygen
                    </li>
                    <li>
                      <strong className={c.m2}>Calvin cycle:</strong> CO₂ is fixed into sugars
                    </li>
                    <li>
                      <strong className={c.m3}>Net result:</strong> light stored as chemical energy
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="day" className={c.timetable}>
        <div className={s.container}>
          <header className={s.sectionHead}>
            <h2 className={s.h2}>
              Ethan&apos;s timetable,
              <br />
              with Lisup.
            </h2>
            <p>Biology undergrad. Three blocks of the day where speaking beats typing.</p>
          </header>
          <div className={c.blocks}>
            <article className={`${c.block} ${c.blue}`}>
              <div className={`${s.mono} ${c.blockTop}`}>
                <span>09:30</span>
                <span>LECTURE</span>
              </div>
              <h3 className={s.bricolage}>Lecture capture</h3>
              <p>Fragments in class become structured notes with one spoken command.</p>
            </article>
            <article className={`${c.block} ${c.peach}`}>
              <div className={`${s.mono} ${c.blockTop}`}>
                <span>14:00</span>
                <span>ESSAY</span>
              </div>
              <h3 className={s.bricolage}>Beat the blank page</h3>
              <p>Think out loud and get a first draft to refine in your own words.</p>
            </article>
            <article className={`${c.block} ${c.green}`}>
              <div className={`${s.mono} ${c.blockTop}`}>
                <span>20:30</span>
                <span>REVISION</span>
              </div>
              <h3 className={s.bricolage}>Flashcards on demand</h3>
              <p>Messy textbook facts become clean Q&amp;A cards in seconds.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={c.flash}>
        <div className={`${s.container} ${c.flashGrid}`}>
          <div className={c.flashText}>
            <div className={`${s.mono} ${c.flashKicker}`}>20:30 · EXAM PREP</div>
            <h2 className={s.h2}>
              Say the facts.
              <br />
              Get the flashcards.
            </h2>
            <p className={`${s.mono} ${c.flashSaid}`}>
              &ldquo;mitochondria power house of cell ATP production double membrane&rdquo;
              <br />
              <span>→ &ldquo;create a concise Q&amp;A flashcard&rdquo;</span>
            </p>
          </div>
          <div className={c.stack} aria-label="Example flashcard">
            <div className={c.back} aria-hidden />
            <div className={c.mid} aria-hidden />
            <div className={c.front}>
              <div>
                <div className={`${s.mono} ${c.q}`}>Q · CARD 14 OF 40</div>
                <p className={s.bricolage}>What does the mitochondrion do, and how is it structured?</p>
              </div>
              <p className={c.a}>It produces ATP (cellular energy) and has a double membrane.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={c.cta}>
        <div className={s.container}>
          <div className={`${s.caveat} ${c.ctaScribble}`}>works in Google Docs, Word, Notion, Canvas &amp; more</div>
          <h2 className={s.bricolage}>
            Less typing. <span className={c.hl}>More learning.</span>
          </h2>
          <DownloadButton location="role_students_final_cta" className={`${s.btn} ${s.btnOrange}`} />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
