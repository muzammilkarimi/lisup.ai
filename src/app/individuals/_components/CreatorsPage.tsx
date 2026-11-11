import Navbar from "../../Navbar";
import SiteFooter from "../../SiteFooter";
import DownloadButton from "./DownloadButton";
import s from "./shared.module.css";
import c from "./creators.module.css";

export default function CreatorsPage() {
  return (
    <div className={`${s.page} ${c.page}`}>
      <Navbar />

      <section className={c.hero}>
        <div className={s.container}>
          <div className={`${s.caveat} ${c.scribble}`}>for creators who think out loud ↓</div>
          <h1 className={`${s.bricolage} ${c.h1}`}>
            Ramble in.
            <br />
            <span className={c.hl}>Publish out.</span>
          </h1>
          <p className={c.lead}>
            Talk through scripts, hooks and newsletters the way you&apos;d say them on camera. Lisup shapes the
            rambling into publish-ready copy wherever you write.
          </p>
          <div className={`${s.ctaRow} ${c.heroCta}`}>
            <DownloadButton location="role_creators_hero" className={`${s.btn} ${s.btnOrange}`} />
            <a href="#day" className={`${s.btn} ${s.btnGhost}`} data-cursor style={{ background: "#fff" }}>
              Watch Leo&apos;s day
            </a>
          </div>

          <div className={c.wall} aria-label="Example: messy ideas become a polished hook">
            <div className={`${s.caveat} ${c.note} ${c.noteYellow}`}>AI + coding in 2026?? in place rewriting!!</div>
            <div className={`${s.caveat} ${c.note} ${c.notePeach}`}>hook: typing is slow, why not just speak</div>
            <div className={c.polished}>
              <div className={`${s.caveat} ${c.cmd}`}>&ldquo;make this a YouTube hook, sound excited&rdquo; ⟶</div>
              <div className={c.polishedCard}>
                <div className={`${s.mono} ${c.meta}`}>
                  <span>NOTION · INTRO SCRIPTS</span>
                  <span>HOOK v1</span>
                </div>
                <p className={s.bricolage}>
                  What if your thoughts could write themselves, with no keyboard and no typos, just polished ideas
                  appearing exactly where you need them?
                </p>
              </div>
            </div>
            <div className={`${s.caveat} ${c.note} ${c.noteGreen}`}>newsletter: tell subs about lisup</div>
          </div>
        </div>
      </section>

      <section id="day" className={c.strip}>
        <div className={s.container}>
          <header className={s.sectionHead}>
            <h2 className={`${s.h2} ${c.h2}`}>
              One messy thought.
              <br />
              <span>Three finished pieces.</span>
            </h2>
            <p>A day with Leo, YouTube creator. Every frame started as a voice note.</p>
          </header>
          <div className={c.film}>
            <div className={c.frames}>
              <article className={c.frame}>
                <div className={`${s.mono} ${c.frameMeta}`}>
                  <span>11:00 · FRAME 01</span>
                  <span>Concept</span>
                </div>
                <p className={`${s.caveat} ${c.frameRaw}`}>video idea AI changing coding focus on in place rewriting</p>
                <div className={c.frameOut}>
                  <strong>Video concept: AI coding in 2026</strong>
                  <br />• Focus: in-place voice dictation
                  <br />• Goal: zero context-switching
                  <br />• Angle: natural-language editing
                </div>
              </article>
              <article className={c.frame}>
                <div className={`${s.mono} ${c.frameMeta}`}>
                  <span>14:30 · FRAME 02</span>
                  <span>Hook</span>
                </div>
                <p className={`${s.caveat} ${c.frameRaw}`}>typing is slow why not speak and edit directly</p>
                <div className={c.frameOut}>What if your thoughts could write themselves, with no keyboard and no typos?</div>
              </article>
              <article className={c.frame}>
                <div className={`${s.mono} ${c.frameMeta}`}>
                  <span>17:00 · FRAME 03</span>
                  <span>Newsletter</span>
                </div>
                <p className={`${s.caveat} ${c.frameRaw}`}>hey subscribers check out lisup</p>
                <div className={c.frameOut}>
                  Hey writers! This week we&apos;re trying Lisup, a voice tool that turns messy dictation into polished
                  copy right where your cursor is.
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className={c.benefits}>
        <div className={s.container}>
          <div className={c.benefitGrid}>
            <div>
              <div className={`${s.caveat} ${c.benefitTitle}`}>idea → outline</div>
              <p>Ramble freely. Lisup structures concepts, beats and bullets for you.</p>
            </div>
            <div>
              <div className={`${s.caveat} ${c.benefitTitle}`}>hooks that land</div>
              <p>Ask for a tone (excited, punchy, curious) and get copy that matches.</p>
            </div>
            <div>
              <div className={`${s.caveat} ${c.benefitTitle}`}>every platform</div>
              <p>Scripts, captions, threads and newsletters, written where you publish.</p>
            </div>
          </div>
          <div className={c.platforms}>
            <span>Notion</span>
            <span className={c.y}>YouTube Studio</span>
            <span>Google Docs</span>
            <span className={c.p}>Substack</span>
            <span>LinkedIn</span>
            <span className={c.g}>X</span>
          </div>
        </div>
      </section>

      <section className={c.cta}>
        <div className={s.container}>
          <div className={c.ctaBand}>
            <div className={`${s.caveat} ${c.ctaScribble}`}>next idea&apos;s already on its way...</div>
            <h2 className={s.bricolage}>Catch it before it&apos;s gone.</h2>
            <DownloadButton location="role_creators_final_cta" className={`${s.btn} ${s.btnDark}`} />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
