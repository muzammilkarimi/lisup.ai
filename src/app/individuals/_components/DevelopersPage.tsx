import Navbar from "../../Navbar";
import SiteFooter from "../../SiteFooter";
import DownloadButton from "./DownloadButton";
import s from "./shared.module.css";
import c from "./developers.module.css";

const SAID = [
  { text: "generate a flask route with a one hour cache", meta: "10:00 · routes.py", active: true },
  { text: "add a google style docstring", meta: "13:30 · geometry.py" },
  { text: "create a typescript interface named Product", meta: "15:00 · types.ts" },
  { text: "write the PR description from these notes", meta: "17:10 · GitHub" },
  { text: "explain this bug to the team, keep it short", meta: "17:40 · Slack" },
];

export default function DevelopersPage() {
  return (
    <div className={`${s.page} ${c.page}`}>
      <Navbar />

      <section className={c.hero}>
        <div className={s.container}>
          <div className={`${s.mono} ${c.path}`}>{"// lisup/for/developers.md"}</div>
          <h1 className={`${s.bricolage} ${c.h1}`}>
            Speak the context.
            <br />
            <span>Commit the code.</span>
          </h1>
          <div className={c.heroRow}>
            <p className={c.lead}>
              Dictate TODOs, docstrings, types and PR descriptions. Lisup turns spoken intent into clean,
              formatted code right at your cursor, in any editor.
            </p>
            <div className={`${s.mono} ${c.keys}`}>
              <kbd>Ctrl</kbd>+<kbd>Win</kbd>
              <span style={{ marginLeft: 8 }}>then just talk</span>
            </div>
          </div>
          <div className={s.ctaRow}>
            <DownloadButton location="role_developers_hero" className={`${s.btn} ${s.btnOrange} ${c.btnDl}`} />
          </div>

          <div className={c.editor} aria-label="Example: a spoken command becomes a TypeScript interface">
            <div className={`${s.mono} ${c.tabs}`}>
              <span className={c.dots} aria-hidden>
                <i />
                <i />
                <i />
              </span>
              <span className={c.tabActive}>types.ts</span>
              <span>routes.py</span>
              <span>geometry.py</span>
            </div>
            <div className={c.panes}>
              <div className={`${s.mono} ${c.pane}`}>
                <div>
                  <span className={c.lineNo}>1</span>
                  <span className={c.selected}>{'// { "id": 104, "name": "Mouse", "price": 49.99 }'}</span>
                </div>
                <div className={c.voice}>
                  <span className={c.wave} aria-hidden>
                    <i style={{ height: 10 }} />
                    <i style={{ height: 18 }} />
                    <i style={{ height: 12 }} />
                    <i style={{ height: 20 }} />
                    <i style={{ height: 8 }} />
                  </span>
                  <span>&ldquo;create a typescript interface named Product&rdquo;</span>
                </div>
              </div>
              <div className={`${s.mono} ${c.pane}`}>
                <div className={c.del}>{'- // { "id": 104, "name": "Mouse", ... }'}</div>
                <div className={c.add}>
                  <span className={c.plus}>+ </span>
                  <span className={c.kw}>interface</span> <span className={c.name}>Product</span> {"{"}
                </div>
                <div className={c.add}>
                  <span className={c.plus}>+ </span>
                  {"  id: "}
                  <span className={c.type}>number</span>;
                </div>
                <div className={c.add}>
                  <span className={c.plus}>+ </span>
                  {"  name: "}
                  <span className={c.type}>string</span>;
                </div>
                <div className={c.add}>
                  <span className={c.plus}>+ </span>
                  {"  price: "}
                  <span className={c.type}>number</span>;
                </div>
                <div className={c.add}>
                  <span className={c.plus}>+ </span>
                  {"}"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={c.palette}>
        <div className={`${s.container} ${c.paletteGrid}`}>
          <div className={c.paletteIntro}>
            <div className={`${s.mono} ${c.kicker}`}>&gt; THINGS ALEX SAID TODAY</div>
            <h2 className={`${s.h2} ${c.h2}`}>Your voice is the command palette.</h2>
            <p>
              Speaking is faster than typing, so you give your code and your AI tools the full context instead
              of a terse one-liner.
            </p>
          </div>
          <div className={c.list}>
            <div className={`${s.mono} ${c.listHead}`}>
              <i>●</i> Listening…
            </div>
            {SAID.map((r) => (
              <div key={r.text} className={`${c.row} ${r.active ? c.rowActive : ""}`}>
                <span>&ldquo;{r.text}&rdquo;</span>
                <span className={`${s.mono} ${c.rowMeta}`}>{r.meta}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={c.benefits}>
        <div className={s.container}>
          <div className={c.files}>
            <article className={c.file}>
              <div className={`${s.mono} ${c.fileName}`}>context.md</div>
              <h3 className={s.bricolage}>Richer prompts, less typing</h3>
              <p>Explain the whole problem out loud. Better input, better output.</p>
            </article>
            <article className={c.file}>
              <div className={`${s.mono} ${c.fileName}`}>docs.py</div>
              <h3 className={s.bricolage}>Docs that get written</h3>
              <p>Docstrings, comments and PR notes in seconds, in your team&apos;s style.</p>
            </article>
            <article className={c.file}>
              <div className={`${s.mono} ${c.fileName}`}>flow.ts</div>
              <h3 className={s.bricolage}>Never leave the editor</h3>
              <p>No window switching. Lisup writes wherever your cursor is.</p>
            </article>
          </div>
          <div className={`${s.mono} ${c.works}`}>
            <span>works_in =</span>
            {["VS Code", "Cursor", "JetBrains", "GitHub", "Linear"].map((a) => (
              <span key={a} className={c.tagChip}>
                {a}
              </span>
            ))}
            <span className={`${c.tagChip} ${c.tagMore}`}>...any text field</span>
          </div>
        </div>
      </section>

      <section className={c.cta}>
        <div className={s.container}>
          <div className={`${s.ctaBand} ${c.ctaBand}`}>
            <div>
              <div className={`${s.mono} ${c.commit}`}>$ git commit -m &quot;stopped typing boilerplate&quot;</div>
              <h2 className={s.ctaTitle}>Ship more. Type less.</h2>
            </div>
            <DownloadButton location="role_developers_final_cta" className={`${s.btn} ${c.btnInk}`} />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
