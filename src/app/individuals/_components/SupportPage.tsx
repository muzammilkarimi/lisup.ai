import Navbar from "../../Navbar";
import SiteFooter from "../../SiteFooter";
import DownloadButton from "./DownloadButton";
import s from "./shared.module.css";
import c from "./support.module.css";

const STUBS = [
  { time: "10:00", id: "#4012", title: "Refund request", said: "sorry delay refunded hit card in 3 days", state: "✓ Solved" },
  { time: "13:30", id: "#4029", title: "Outage follow-up", said: "server crashed database restored log back in", state: "✓ Solved" },
  { time: "16:00", id: "#4041", title: "Escalation to Tier 2", said: "transferring to tier two, they'll email you", state: "→ Handed off", hand: true },
];

export default function SupportPage() {
  return (
    <div className={`${s.page} ${c.page}`}>
      <Navbar />

      <section className={c.hero}>
        <div className={`${s.container} ${c.heroGrid}`}>
          <div className={c.heroText}>
            <div className={c.status}>
              <i aria-hidden />
              Queue: 0 open
            </div>
            <h1 className={`${s.bricolage} ${c.h1}`}>
              Kind replies.
              <br />
              Empty queue.
              <br />
              <span>Every shift.</span>
            </h1>
            <p className={c.lead}>
              Speak your shorthand and send a polished, empathetic reply. Lisup writes on-brand responses straight
              into your help desk.
            </p>
            <div className={s.ctaRow}>
              <DownloadButton location="role_customer_support_hero" className={`${s.btn} ${s.btnDark}`} />
              <a href="#day" className={`${s.btn} ${s.btnGhost}`} data-cursor>
                See Mia&apos;s shift
              </a>
            </div>
          </div>

          <div className={c.desk} aria-label="Example: a shorthand note becomes a customer reply">
            <div className={c.queue}>
              <div className={`${s.mono} ${c.queueLabel}`}>TODAY</div>
              <div className={`${c.ticket} ${c.ticketActive}`}>
                <b>#4029 · Can&apos;t log in</b>
                <small>Replying…</small>
              </div>
              <div className={c.ticket}>
                <b>#4012 · Refund status</b>
                <small className={c.solved}>✓ Solved</small>
              </div>
              <div className={c.ticket}>
                <b>#4008 · Invoice copy</b>
                <small className={c.solved}>✓ Solved</small>
              </div>
              <div className={c.ticket}>
                <b>#4003 · Change plan</b>
                <small className={c.solved}>✓ Solved</small>
              </div>
            </div>
            <div className={c.thread}>
              <div className={c.inbound}>Your site was down this morning and now I can&apos;t log in. What&apos;s going on?</div>
              <div className={`${s.mono} ${c.said}`}>
                Mia said: &ldquo;server crashed, restored, ask them to log back in, apologize&rdquo;
              </div>
              <div className={c.reply}>
                We had a temporary database outage this morning, and it&apos;s now fully resolved. Please try logging
                back in, and let us know if anything still looks off. We&apos;re sorry for the interruption.
              </div>
              <div className={c.by}>
                <i aria-hidden />
                Written by Lisup · ready to send
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={c.tones}>
        <div className={s.container}>
          <div className={c.tonesHead}>
            <div className={s.kicker}>SAME NOTE, ANY TONE</div>
            <h2 className={s.h2}>Tell Lisup how it should feel.</h2>
          </div>
          <div className={c.noteWrap}>
            <div className={`${s.mono} ${c.note}`}>&ldquo;sorry delay refunded hit card in 3 days&rdquo;</div>
          </div>
          <div className={c.toneGrid}>
            <article className={`${c.tone} ${c.toneActive}`}>
              <div className={c.toneTop}>
                <span className={c.toneName}>Empathetic</span>
                <span className={c.sel}>SELECTED</span>
              </div>
              <p>
                Thank you so much for your patience, and sorry for the wait. Your refund is on its way and should
                reach your card within 3 business days.
              </p>
            </article>
            <article className={c.tone}>
              <span className={c.toneName}>Formal</span>
              <p>
                Thank you for your patience. We have processed your refund, and the funds will appear in your
                account within 3 business days.
              </p>
            </article>
            <article className={c.tone}>
              <span className={c.toneName}>Concise</span>
              <p>Sorry for the delay! Your refund is processed and will land on your card in 3 business days.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="day" className={c.shift}>
        <div className={s.container}>
          <header className={s.sectionHead}>
            <h2 className={s.h2}>
              Mia&apos;s shift,
              <br />
              ticket by ticket.
            </h2>
            <p>Refunds, outages and escalations: the hard replies, written in the time it takes to say them.</p>
          </header>
          <div className={c.stubs}>
            {STUBS.map((t) => (
              <div key={t.id} className={c.stub}>
                <div className={c.stubTime}>
                  <b className={s.mono}>{t.time}</b>
                  <span>{t.id}</span>
                </div>
                <div className={c.stubBody}>
                  <h3 className={s.bricolage}>{t.title}</h3>
                  <p className={s.mono}>&ldquo;{t.said}&rdquo;</p>
                </div>
                <div className={c.stubState}>
                  <span className={`${c.badge} ${t.hand ? c.badgeHand : ""}`}>{t.state}</span>
                </div>
              </div>
            ))}
          </div>
          <div className={`${s.chips} ${c.chips}`}>
            <span className={s.chipsLabel}>WORKS IN</span>
            {["Zendesk", "Intercom", "Freshdesk", "HubSpot", "Gmail"].map((a) => (
              <span key={a} className={s.chip}>
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className={c.cta}>
        <div className={s.container}>
          <div className={`${s.ctaBand} ${c.ctaBand}`}>
            <div>
              <div className={`${s.mono} ${c.ctaKicker}`}>QUEUE: 0 OPEN</div>
              <h2 className={s.ctaTitle}>Go home on time.</h2>
            </div>
            <DownloadButton location="role_customer_support_final_cta" className={`${s.btn} ${s.btnOrange}`} />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
