import Navbar from "../../Navbar";
import SiteFooter from "../../SiteFooter";
import DownloadButton from "./DownloadButton";
import s from "./shared.module.css";
import c from "./leaders.module.css";

export default function LeadersPage() {
  return (
    <div className={s.page}>
      <Navbar />

      <section className={c.hero}>
        <div className={`${s.container} ${c.heroGrid}`}>
          <div>
            <div className={`${s.mono} ${c.eyebrow}`}>LISUP FOR LEADERS</div>
            <h1 className={`${s.bricolage} ${c.h1}`}>
              Say it blunt.
              <br />
              <span>Send it kind.</span>
            </h1>
            <p className={c.lead}>
              You think fast and talk straight. Lisup keeps the speed and turns it into messages your team
              actually wants to read, right inside Slack, email and docs.
            </p>
            <div className={s.ctaRow}>
              <DownloadButton location="role_leaders_hero" className={`${s.btn} ${s.btnOrange}`} />
              <a href="#day" className={`${s.btn} ${s.btnGhostOnDark}`} data-cursor>
                See a leader&apos;s day
              </a>
            </div>
          </div>

          <div className={c.dial} aria-label="Example: the same message at three tones">
            <div className={`${s.mono} ${c.channel}`}>
              <i aria-hidden /># engineering
            </div>
            <div className={c.said}>
              <div className={`${s.mono} ${c.tag}`}>WHAT YOU SAID</div>
              <p>guys project alpha is dead focus on beta starting now</p>
            </div>
            <div>
              <div className={`${s.mono} ${c.scale}`}>
                <span>BLUNT</span>
                <span>CLEAR</span>
                <span>CONSIDERATE</span>
              </div>
              <div className={c.track} aria-hidden>
                <div className={c.fill} />
                <div className={c.knob} />
              </div>
            </div>
            <div className={c.read}>
              <div className={`${s.mono} ${c.tag}`}>
                <span>WHAT THEY READ</span>
                <span>✓ REPLACED IN PLACE</span>
              </div>
              <p>
                Hi team, we&apos;re shifting focus from Project Alpha to Project Beta, effective today. Let&apos;s put
                our energy into the next milestones. Thanks for staying agile!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="day" className={c.day}>
        <div className={s.container}>
          <header className={s.sectionHead}>
            <div>
              <div className={s.kicker}>A DAY WITH SARAH, VP ENGINEERING</div>
              <h2 className={s.h2} style={{ marginTop: 14 }}>
                Three moments.
                <br />
                Zero rewrites.
              </h2>
            </div>
            <p>The same raw voice, tuned for whoever is reading: the team, the product crew, the board.</p>
          </header>

          <div className={`${s.mono} ${c.ruler}`} aria-hidden>
            <span>9 AM</span>
            <span>11</span>
            <span>1 PM</span>
            <span>3</span>
            <span>5 PM</span>
          </div>

          <div className={c.cards}>
            <article className={c.card}>
              <div className={c.cardTop}>
                <span className={`${s.mono} ${c.time}`}>09:00</span>
                <span className={c.pill}>To the team</span>
              </div>
              <h3 className={s.bricolage}>Morning triage</h3>
              <p className={c.raw}>we need the pipeline reports by 5pm</p>
              <p className={c.out}>
                Hi team, please make sure all deployment pipeline reports are in by 5:00 PM today. Thank you!
              </p>
            </article>
            <article className={c.card}>
              <div className={c.cardTop}>
                <span className={`${s.mono} ${c.time}`}>13:00</span>
                <span className={c.pill}>To product</span>
              </div>
              <h3 className={s.bricolage}>The pivot</h3>
              <p className={c.raw}>alpha is dead focus on beta</p>
              <p className={c.out}>
                We&apos;re moving our focus from Alpha to Beta, effective today. Here&apos;s why, and what it means
                for the next sprint.
              </p>
            </article>
            <article className={`${c.card} ${c.cardDark}`}>
              <div className={c.cardTop}>
                <span className={`${s.mono} ${c.time}`}>16:30</span>
                <span className={c.pill}>To the board</span>
              </div>
              <h3 className={s.bricolage}>Exec briefing</h3>
              <p className={c.raw}>revenue fine, launch good, next steps tomorrow</p>
              <ul>
                <li>Q3 revenue on track</li>
                <li>Launch completed successfully</li>
                <li>Roadmap review tomorrow, 9 AM</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className={`${s.container} ${c.statement}`}>
          <p className={s.bricolage}>
            Leadership is mostly writing. Lisup lets you do it at the <span>speed you think</span>, without
            sounding like it.
          </p>
          <div className={c.benefits}>
            <div>
              <div className={`${s.mono} ${c.num}`}>01</div>
              <h3 className={s.bricolage}>Tone, handled</h3>
              <p>Say it the way you think it. Lisup rewrites it the way your team needs to hear it.</p>
            </div>
            <div>
              <div className={`${s.mono} ${c.num}`}>02</div>
              <h3 className={s.bricolage}>Updates up the chain</h3>
              <p>Scattered notes become crisp exec summaries.</p>
            </div>
            <div>
              <div className={`${s.mono} ${c.num}`}>03</div>
              <h3 className={s.bricolage}>More time for decisions</h3>
              <p>Clear threads at the speed of speech.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={c.cta}>
        <div className={s.container}>
          <div className={`${s.ctaBand} ${c.ctaBand}`}>
            <h2 className={s.ctaTitle}>
              Lead out loud.
              <br />
              Press Ctrl + Win.
            </h2>
            <DownloadButton location="role_leaders_final_cta" className={`${s.btn} ${s.btnDark}`} />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
