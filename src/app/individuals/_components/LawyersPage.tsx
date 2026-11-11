import Navbar from "../../Navbar";
import SiteFooter from "../../SiteFooter";
import DownloadButton from "./DownloadButton";
import s from "./shared.module.css";
import c from "./lawyers.module.css";

const DOCS = [
  {
    file: "Employment_Agreement.docx",
    time: "11:00",
    title: "Clause drafting",
    said: "don't take our workers for a year after you leave",
    out: "For twelve (12) months following termination, the Contractor shall not solicit, recruit or hire any employee of the Company.",
  },
  {
    file: "Client_Update.docx",
    time: "15:00",
    title: "Client memo",
    said: "judge said we need mediation before trial lets talk monday",
    out: "The court has ordered both parties to attend mediation before a trial date is set. Let's schedule a call on Monday to discuss strategy.",
  },
  {
    file: "Research_Brief.docx",
    time: "17:30",
    title: "Case brief takeaway",
    said: "smith lost because contract had no signatures case dismissed",
    out: "The claim was dismissed because the agreement lacked valid signatures, rendering it unenforceable under the Statute of Frauds.",
  },
];

export default function LawyersPage() {
  return (
    <div className={`${s.page} ${c.page}`}>
      <Navbar />

      <section className={c.hero}>
        <div className={`${s.container} ${c.heroGrid}`}>
          <div className={c.heroText}>
            <div className={s.kicker}>LISUP FOR LAWYERS</div>
            <h1 className={`${s.bricolage} ${c.h1}`}>
              Speak plainly.
              <br />
              <span>Draft precisely.</span>
            </h1>
            <p className={c.lead}>
              Say what you mean in plain language. Lisup drafts the clause, memo or case summary in precise,
              professional prose, right inside Word.
            </p>
            <div className={s.ctaRow}>
              <DownloadButton location="role_lawyers_hero" className={`${s.btn} ${s.btnDark}`} />
              <a href="#day" className={`${s.btn} ${s.btnGhost}`} data-cursor>
                See Robert&apos;s day
              </a>
            </div>
            <p className={c.fine}>Every rewrite lands in your document for review. Nothing is sent for you.</p>
          </div>

          <div className={c.doc} aria-label="Example: plain words become a formal clause, shown as tracked changes">
            <div className={`${s.mono} ${c.stamp}`} aria-hidden>
              REWRITTEN BY LISUP
            </div>
            <div className={`${s.mono} ${c.docMeta}`}>EMPLOYMENT AGREEMENT · §7.2</div>
            <h3>7.2 Non-Solicitation of Employees</h3>
            <p className={c.clause}>
              <span className={c.del}>don&apos;t take our workers for a year after you leave</span>{" "}
              <span className={c.ins}>
                For a period of twelve (12) months following the termination of this Agreement, the Contractor shall
                not, directly or indirectly, solicit, recruit or hire any employee of the Company.
              </span>
            </p>
            <div className={c.comment}>
              <b>Robert K. · 11:02 AM</b>
              <span>Said: &ldquo;rewrite as a formal non-solicitation clause&rdquo;</span>
            </div>
          </div>
        </div>
      </section>

      <section id="day" className={c.docs}>
        <div className={s.container}>
          <div className={c.docsHead}>
            <div className={s.kicker}>A DAY WITH ROBERT, ASSOCIATE ATTORNEY</div>
            <h2 className={s.h2}>
              Three documents.
              <br />
              One plain-spoken voice.
            </h2>
          </div>
          <div className={c.docGrid}>
            {DOCS.map((d) => (
              <article key={d.file} className={c.docCard}>
                <div className={`${s.mono} ${c.docTab}`}>
                  <span>{d.file}</span>
                  <span>{d.time}</span>
                </div>
                <div className={c.docBody}>
                  <h3 className={s.bricolage}>{d.title}</h3>
                  <p className={c.docSaid}>&ldquo;{d.said}&rdquo;</p>
                  <p className={c.docOut}>{d.out}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={c.terms}>
        <div className={`${s.container} ${c.termsGrid}`}>
          <div className={c.termsTitle}>
            <h2 className={s.h2}>
              Terms of use.
              <br />
              <span>The good kind.</span>
            </h2>
          </div>
          <div className={c.termsList}>
            <div className={c.term}>
              <span className={`${s.mono} ${c.sec}`}>§1</span>
              <div>
                <h3>Plain speech, formal prose.</h3>
                <p>Describe the intent; get language in the register your documents require.</p>
              </div>
            </div>
            <div className={c.term}>
              <span className={`${s.mono} ${c.sec}`}>§2</span>
              <div>
                <h3>Client updates in minutes.</h3>
                <p>Clear, reassuring correspondence without the drafting overhead.</p>
              </div>
            </div>
            <div className={c.term}>
              <span className={`${s.mono} ${c.sec}`}>§3</span>
              <div>
                <h3>You remain in control.</h3>
                <p>Every rewrite lands in your document for review. Works in Word, Outlook, Google Docs and Clio.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={c.cta}>
        <div className={s.container}>
          <div className={`${s.ctaBand} ${c.ctaBand}`}>
            <h2 className={s.ctaTitle}>
              Dictate the draft.
              <br />
              <span>Keep the judgment.</span>
            </h2>
            <DownloadButton location="role_lawyers_final_cta" className={`${s.btn} ${s.btnOrange}`} />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
