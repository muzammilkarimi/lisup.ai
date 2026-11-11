import { FiMic } from "react-icons/fi";
import Navbar from "../../Navbar";
import SiteFooter from "../../SiteFooter";
import DownloadButton from "./DownloadButton";
import s from "./shared.module.css";
import c from "./accessibility.module.css";

export default function AccessibilityPage() {
  return (
    <div className={`${s.page} ${c.page}`}>
      <Navbar />

      <section className={c.hero}>
        <div className={`${s.container} ${c.heroInner}`}>
          <div className={`${s.mono} ${c.badge}`}>VOICE FIRST · KEYBOARD OPTIONAL</div>
          <h1 className={`${s.bricolage} ${c.h1}`}>
            Your voice is
            <br />
            the <span>whole</span> interface.
          </h1>
          <p className={c.lead}>
            Write emails, messages and documents entirely by voice. Lisup strips filler words, fixes punctuation and
            formats your text so you can communicate on your terms.
          </p>

          <div className={c.micWrap}>
            <div className={c.mic} role="img" aria-label="Microphone">
              <FiMic size={56} />
            </div>
            <div className={`${s.mono} ${c.keys}`}>
              Press <kbd>Ctrl</kbd> + <kbd>Win</kbd> once. Speak. Done.
            </div>
          </div>

          <div className={`${s.ctaRow} ${c.heroCta}`}>
            <DownloadButton location="role_accessibility_hero" className={`${s.btn} ${c.btnBig} ${c.btnInk}`} />
            <a href="#day" className={`${s.btn} ${c.btnBig} ${c.btnOutline}`} data-cursor>
              How James works
            </a>
          </div>
        </div>
      </section>

      <section className={c.filler}>
        <div className={s.container}>
          <div className={`${s.mono} ${c.fillerKicker}`}>10:30 · WHAT JAMES SAID</div>
          <p className={`${s.bricolage} ${c.spoken}`}>
            <span className={c.um}>um</span> <span className={c.um}>so like</span> i can&apos;t make it to the office
            today <span className={c.um}>uh</span> because my leg hurts
          </p>
          <div className={c.gotRow}>
            <div className={`${s.mono} ${c.fillerKicker}`}>WHAT GMAIL GOT</div>
            <div className={c.got}>
              I won&apos;t be able to make it to the office today due to a leg injury. I&apos;ll be working remotely.
            </div>
          </div>
        </div>
      </section>

      <section className={c.benefits}>
        <div className={s.container}>
          <div className={c.rule}>
            <span className={`${s.mono} ${c.num}`}>01</span>
            <h3 className={s.bricolage}>Filler words, gone.</h3>
            <p>Ums, likes and false starts are cleaned out automatically. Say it once, naturally.</p>
          </div>
          <div className={c.rule}>
            <span className={`${s.mono} ${c.num}`}>02</span>
            <h3 className={s.bricolage}>Structure without typing.</h3>
            <p>&ldquo;Format as bullet points.&rdquo; Lists, paragraphs and punctuation from one spoken instruction.</p>
          </div>
          <div className={c.rule}>
            <span className={`${s.mono} ${c.num}`}>03</span>
            <h3 className={s.bricolage}>Every app, one shortcut.</h3>
            <p>Gmail, Slack, Word, Teams: any text field. No special setup per app.</p>
          </div>
        </div>
      </section>

      <section id="day" className={c.day}>
        <div className={s.container}>
          <h2 className={s.h2}>
            A day with James,
            <br />
            product designer.
          </h2>
          <div className={c.dayGrid}>
            <article className={c.dayCard}>
              <div className={`${s.mono} ${c.dayTime}`}>10:30 · Gmail</div>
              <h3 className={s.bricolage}>Email, hands-free</h3>
              <p>Natural speech, fillers and all, becomes a clean, ready-to-send message.</p>
            </article>
            <article className={c.dayCard}>
              <div className={`${s.mono} ${c.dayTime}`}>13:00 · Slack</div>
              <h3 className={s.bricolage}>Standup update</h3>
              <p>A stream of thought becomes a tidy standup post. No bullets typed by hand.</p>
            </article>
            <article className={`${c.dayCard} ${c.dayCardOrange}`}>
              <div className={`${s.mono} ${c.dayTime}`}>16:15 · Gmail</div>
              <h3 className={s.bricolage}>Meeting reply</h3>
              <p>&ldquo;next tuesday afternoon around two&rdquo; → a polite confirmation with the time spelled out.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={c.cta}>
        <div className={s.container}>
          <div className={c.ctaBox}>
            <h2 className={s.bricolage}>
              Break free
              <br />
              from the keyboard.
            </h2>
            <DownloadButton location="role_accessibility_final_cta" className={`${s.btn} ${c.btnCta}`} />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
