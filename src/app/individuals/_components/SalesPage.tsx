import Navbar from "../../Navbar";
import SiteFooter from "../../SiteFooter";
import DownloadButton from "./DownloadButton";
import s from "./shared.module.css";
import c from "./sales.module.css";

export default function SalesPage() {
  return (
    <div className={s.page}>
      <Navbar />

      <section className={c.hero}>
        <div className={s.container}>
          <div className={c.heroRow}>
            <div className={c.heroTitle}>
              <div className={s.kicker}>LISUP FOR SALES</div>
              <h1 className={`${s.bricolage} ${c.h1}`}>
                Hang up.
                <br />
                Speak.
                <br />
                <span>Move the deal.</span>
              </h1>
            </div>
            <div className={c.heroSide}>
              <p className={c.lead}>
                Log calls, write outreach and send proposals the moment the conversation ends. Lisup turns quick
                voice notes into structured CRM updates and polished emails.
              </p>
              <div className={`${s.ctaRow} ${c.ctaRow}`}>
                <DownloadButton location="role_sales_hero" className={`${s.btn} ${s.btnDark}`} />
                <a href="#day" className={`${s.btn} ${s.btnGhost}`} data-cursor>
                  Follow Mark&apos;s deal
                </a>
              </div>
            </div>
          </div>

          <div id="day" className={c.boardWrap} aria-label="Example: one deal moving through the pipeline by voice">
            <div className={c.board}>
              <div className={c.col}>
                <div className={`${s.mono} ${c.colHead}`}>
                  <span>LEAD</span>
                  <span>09:00</span>
                </div>
                <div className={c.deal}>
                  <b>John Doe · Acme</b>
                  <span className={`${s.mono} ${c.dealSaid}`}>&ldquo;john wants 50 seats demo next week budget 5k&rdquo;</span>
                  <strong>Seats:</strong> 50
                  <br />
                  <strong>Budget:</strong> $5,000
                  <br />
                  <strong>Next:</strong> demo next week
                </div>
              </div>
              <div className={c.col}>
                <div className={`${s.mono} ${c.colHead}`}>
                  <span>DEMO</span>
                  <span>13:00</span>
                </div>
                <div className={c.deal}>
                  <b>Follow-up email</b>
                  <span className={`${s.mono} ${c.dealSaid}`}>&ldquo;saw your linkedin post let&apos;s chat&rdquo;</span>
                  Hi John, I enjoyed your post on sales efficiency. Open to a 10-minute demo of how Lisup fits your
                  team?
                </div>
              </div>
              <div className={c.col}>
                <div className={`${s.mono} ${c.colHead}`}>
                  <span>PROPOSAL</span>
                  <span>16:30</span>
                </div>
                <div className={c.deal}>
                  <b>Quote notes</b>
                  <span className={`${s.mono} ${c.dealSaid}`}>&ldquo;15 percent off if you sign by friday&rdquo;</span>
                  We&apos;re pleased to offer a 15% discount, contingent on signing by this Friday.
                </div>
              </div>
              <div className={`${c.col} ${c.colWon}`}>
                <div className={`${s.mono} ${c.colHead}`}>
                  <span>CLOSED WON</span>
                  <span>FRI</span>
                </div>
                <div className={c.deal}>
                  <b>John Doe · Acme</b>
                  <span className={c.dealSaid}>50 seats · $4,250</span>
                  <span className={`${s.mono} ${c.signed}`} aria-hidden>
                    SIGNED
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={c.crm}>
        <div className={`${s.container} ${c.crmGrid}`}>
          <div className={c.crmText}>
            <div className={s.kicker}>09:00 · STRAIGHT AFTER THE CALL</div>
            <h2 className={s.h2}>
              Your CRM,
              <br />
              filled by talking.
            </h2>
            <p>
              Say what you learned while it&apos;s fresh. Lisup turns it into structured fields and a clean deal note,
              right in Salesforce or HubSpot.
            </p>
          </div>
          <div className={c.form} aria-label="Example: CRM fields filled from a voice note">
            <div className={`${s.mono} ${c.formHead}`}>
              <span>Salesforce · Lead: John Doe</span>
              <span>● Lisup listening</span>
            </div>
            <div className={c.fields}>
              <div>
                <div className={c.label}>Contact</div>
                <div className={c.value}>John Doe</div>
              </div>
              <div>
                <div className={c.label}>Seats</div>
                <div className={c.value}>50</div>
              </div>
              <div>
                <div className={c.label}>Budget</div>
                <div className={c.value}>$5,000</div>
              </div>
              <div>
                <div className={c.label}>Next step</div>
                <div className={c.value}>Demo next week</div>
              </div>
              <div className={c.fieldWide}>
                <div className={c.label}>Notes</div>
                <div className={c.value}>
                  Discovery call went well. John is evaluating for the whole sales team and wants a demo focused on
                  CRM logging before Friday.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={c.benefits}>
        <div className={s.container}>
          <div className={c.strip}>
            <div className={c.cell}>
              <div className={`${s.bricolage} ${c.verb}`}>Log</div>
              <h3 className={s.bricolage}>A CRM that stays current</h3>
              <p>Every call logged in seconds, while the details are still fresh.</p>
            </div>
            <div className={c.cell}>
              <div className={`${s.bricolage} ${c.verb}`}>Reach</div>
              <h3 className={s.bricolage}>Personal outreach, fast</h3>
              <p>Speak the angle, get an email that sounds like you on a good day.</p>
            </div>
            <div className={c.cell}>
              <div className={`${s.bricolage} ${c.verb}`}>Close</div>
              <h3 className={s.bricolage}>Momentum to the close</h3>
              <p>Proposals and follow-ups out the door before the deal cools.</p>
            </div>
          </div>
          <div className={`${s.chips} ${c.chips}`}>
            <span className={s.chipsLabel}>WORKS IN</span>
            {["Salesforce", "HubSpot", "Gmail", "LinkedIn", "Outlook"].map((a) => (
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
            <h2 className={s.ctaTitle}>
              The next deal starts
              <br />
              the second you hang up.
            </h2>
            <DownloadButton location="role_sales_final_cta" className={`${s.btn} ${s.btnDark}`} />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
