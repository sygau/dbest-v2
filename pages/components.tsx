import React, { useState } from 'react';
import Head from 'next/head';
import NavigationLink from '../components/NavigationLink';
import FAQSection from '../components/FAQSection';
import LastUpdatedAlert from '../components/LastUpdatedAlert';
import { BiBook, BiCalculator, BiTestTube, BiLeaf, BiLaptop, BiGlobe, BiMoney, BiBriefcase, BiChevronDown, BiChevronUp, BiSearch, BiCog, BiHome, BiStar, BiHeart, BiCheck, BiX, BiInfoCircle, BiError, BiCheckCircle } from 'react-icons/bi';

const SAMPLE_FAQS = [
  { id: 'f1', question: '這是第一個常見問題？', answer: '這是第一個常見問題的回答。用來測試 FAQ 元件在不同主題下的顯示效果。' },
  { id: 'f2', question: '第二個問題怎麼辦？', answer: '第二個問題的答案在這裡。確保文字顏色和背景在所有主題中都可讀。' },
  { id: 'f3', question: 'How does this look in English?', answer: 'This is an English FAQ answer to test mixed-language rendering across all themes.' },
];

export default function ComponentsShowcase() {
  const [inputVal, setInputVal] = useState('');
  const [selectVal, setSelectVal] = useState('option1');
  const [checkVal, setCheckVal] = useState(false);
  const [radioVal, setRadioVal] = useState('a');
  const [rangeVal, setRangeVal] = useState(50);

  return (
    <>
      <Head>
        <title>Component Showcase | dse.best Dev</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {/* Breadcrumb */}
      <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div className="breadcrumb-title pe-3">開發</div>
        <div className="ps-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 p-0">
              <li className="breadcrumb-item">
                <NavigationLink href="/"><i className="bx bx-home-alt"></i></NavigationLink>
              </li>
              <li className="breadcrumb-item active" aria-current="page">Component Showcase</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="card rounded-4" style={{ height: 'auto' }}>
        <div className="card-body p-4">
          <h1 className="mb-1">Component Showcase</h1>
          <p className="text-muted mb-4">All site components rendered with theme-aware styling. Switch themes to verify compatibility.</p>

          {/* ═══════════════════════════════════════════════ */}
          {/* SECTION: Typography */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="mb-5">
            <h2 className="border-bottom pb-2 mb-3">Typography</h2>
            <h1>Heading 1 — 標題一</h1>
            <h2>Heading 2 — 標題二</h2>
            <h3>Heading 3 — 標題三</h3>
            <h4>Heading 4 — 標題四</h4>
            <h5>Heading 5 — 標題五</h5>
            <h6>Heading 6 — 標題六</h6>
            <p>Regular paragraph text. 這是普通段落文字。The quick brown fox jumps over the lazy dog. 測試中英文混排效果。</p>
            <p className="lead">Lead paragraph — larger introductory text. 引言段落。</p>
            <p><small className="text-muted">Small muted text — 小字灰色文字</small></p>
            <p><strong>Bold text — 粗體</strong> | <em>Italic text — 斜體</em> | <mark>Highlighted text</mark></p>
            <p><code>Inline code</code> | <kbd>Ctrl + C</kbd></p>
            <blockquote className="blockquote">
              <p>Blockquote — 引用區塊。先天下之憂而憂，後天下之樂而樂。</p>
              <footer className="blockquote-footer">范仲淹 <cite title="岳陽樓記">岳陽樓記</cite></footer>
            </blockquote>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* SECTION: Buttons */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="mb-5">
            <h2 className="border-bottom pb-2 mb-3">Buttons</h2>
            <h5>Solid Buttons</h5>
            <div className="d-flex flex-wrap gap-2 mb-3">
              <button className="btn btn-primary">Primary</button>
              <button className="btn btn-secondary">Secondary</button>
              <button className="btn btn-success">Success</button>
              <button className="btn btn-danger">Danger</button>
              <button className="btn btn-warning">Warning</button>
              <button className="btn btn-info">Info</button>
              <button className="btn btn-light">Light</button>
              <button className="btn btn-dark">Dark</button>
            </div>
            <h5>Outline Buttons</h5>
            <div className="d-flex flex-wrap gap-2 mb-3">
              <button className="btn btn-outline-primary">Primary</button>
              <button className="btn btn-outline-secondary">Secondary</button>
              <button className="btn btn-outline-success">Success</button>
              <button className="btn btn-outline-danger">Danger</button>
              <button className="btn btn-outline-warning">Warning</button>
              <button className="btn btn-outline-info">Info</button>
            </div>
            <h5>Button Sizes</h5>
            <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
              <button className="btn btn-primary btn-lg">Large</button>
              <button className="btn btn-primary">Default</button>
              <button className="btn btn-primary btn-sm">Small</button>
              <button className="btn btn-primary" disabled>Disabled</button>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* SECTION: Alerts */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="mb-5">
            <h2 className="border-bottom pb-2 mb-3">Alerts</h2>
            <div className="alert alert-primary" role="alert">Primary alert — 主要提示</div>
            <div className="alert alert-secondary" role="alert">Secondary alert — 次要提示</div>
            <div className="alert alert-success" role="alert">Success alert — 成功提示</div>
            <div className="alert alert-danger" role="alert">Danger alert — 危險提示</div>
            <div className="alert alert-warning" role="alert">Warning alert — 警告提示。This tests the globals.css theme override.</div>
            <div className="alert alert-info" role="alert">Info alert — 資訊提示。This tests the globals.css theme override.</div>
            <div className="alert alert-light" role="alert">Light alert — 淺色提示</div>
            <div className="alert alert-dark" role="alert">Dark alert — 深色提示</div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* SECTION: Badges */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="mb-5">
            <h2 className="border-bottom pb-2 mb-3">Badges</h2>
            <div className="d-flex flex-wrap gap-2 mb-3">
              <span className="badge bg-primary">Primary</span>
              <span className="badge bg-secondary">Secondary</span>
              <span className="badge bg-success">Success</span>
              <span className="badge bg-danger">Danger</span>
              <span className="badge bg-warning text-dark">Warning</span>
              <span className="badge bg-info text-dark">Info</span>
              <span className="badge rounded-pill bg-primary">Pill Badge</span>
              <span className="badge rounded-pill bg-success">99+</span>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* SECTION: Cards */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="mb-5">
            <h2 className="border-bottom pb-2 mb-3">Cards</h2>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Basic Card</h5>
                    <p className="card-text">Basic card with default theme styling. 基本卡片。</p>
                    <button className="btn btn-primary btn-sm">Action</button>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100" style={{ border: '1px solid var(--bs-border-color)' }}>
                  <div className="card-header">Card Header</div>
                  <div className="card-body">
                    <h5 className="card-title">Card with Header</h5>
                    <p className="card-text">Testing header/body separation across themes.</p>
                  </div>
                  <div className="card-footer text-muted">Card Footer</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm" style={{ border: '1px solid var(--bs-border-color)' }}>
                  <div className="card-body">
                    <h5 className="card-title">Shadow Card</h5>
                    <p className="card-text">Card with shadow and border — tests bg differentiation.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* SECTION: Forms */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="mb-5">
            <h2 className="border-bottom pb-2 mb-3">Form Elements</h2>
            <div className="row g-3">
              <div className="col-md-6">
                <h5>Bootstrap .form-control / .form-select</h5>
                <div className="mb-3">
                  <label className="form-label">Text Input</label>
                  <input type="text" className="form-control" placeholder="Type something..." />
                </div>
                <div className="mb-3">
                  <label className="form-label">Select</label>
                  <select className="form-select">
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Textarea</label>
                  <textarea className="form-control" rows={3} placeholder="Write something..."></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Disabled Input</label>
                  <input type="text" className="form-control" disabled value="Disabled input" />
                </div>
              </div>
              <div className="col-md-6">
                <h5>Non-Bootstrap (Custom) Inputs</h5>
                <p className="text-muted small">These should inherit theme colors from globals.css global rules.</p>
                <div className="mb-3">
                  <label className="form-label">Custom Input</label>
                  <input
                    type="text"
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    placeholder="Custom styled input"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--bs-border-color)' }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Custom Select</label>
                  <select
                    value={selectVal}
                    onChange={e => setSelectVal(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--bs-border-color)' }}
                  >
                    <option value="option1">Option A</option>
                    <option value="option2">Option B</option>
                    <option value="option3">Option C</option>
                  </select>
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="chk1" checked={checkVal} onChange={e => setCheckVal(e.target.checked)} />
                    <label className="form-check-label" htmlFor="chk1">Checkbox</label>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="radioGroup" id="radioA" checked={radioVal === 'a'} onChange={() => setRadioVal('a')} />
                    <label className="form-check-label" htmlFor="radioA">Radio A</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="radioGroup" id="radioB" checked={radioVal === 'b'} onChange={() => setRadioVal('b')} />
                    <label className="form-check-label" htmlFor="radioB">Radio B</label>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Range: {rangeVal}</label>
                  <input type="range" className="form-range" min="0" max="100" value={rangeVal} onChange={e => setRangeVal(Number(e.target.value))} />
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* SECTION: Tables */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="mb-5">
            <h2 className="border-bottom pb-2 mb-3">Tables</h2>
            <h5>Default Table</h5>
            <div className="table-responsive mb-4">
              <table className="table">
                <thead>
                  <tr><th>#</th><th>科目</th><th>Subject</th><th>Year</th><th>Score</th></tr>
                </thead>
                <tbody>
                  <tr><td>1</td><td>英文</td><td>English</td><td>2025</td><td>562</td></tr>
                  <tr><td>2</td><td>中文</td><td>Chinese</td><td>2025</td><td>480</td></tr>
                  <tr><td>3</td><td>數學</td><td>Mathematics</td><td>2025</td><td>390</td></tr>
                </tbody>
              </table>
            </div>
            <h5>Striped + Bordered + Hover Table</h5>
            <div className="table-responsive mb-4">
              <table className="table table-striped table-bordered table-hover">
                <thead className="table-dark">
                  <tr><th>Grade</th><th>2023</th><th>2024</th><th>2025</th></tr>
                </thead>
                <tbody>
                  <tr><td>5**</td><td>596</td><td>562</td><td>562</td></tr>
                  <tr><td>5*</td><td>562</td><td>533</td><td>533</td></tr>
                  <tr><td>5</td><td>507</td><td>487</td><td>487</td></tr>
                  <tr><td>4</td><td>438</td><td>395</td><td>395</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* SECTION: Progress & Spinners */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="mb-5">
            <h2 className="border-bottom pb-2 mb-3">Progress Bars & Spinners</h2>
            <div className="row g-3">
              <div className="col-md-6">
                <h5>Progress Bars</h5>
                <div className="progress mb-2"><div className="progress-bar" style={{ width: '25%' }}>25%</div></div>
                <div className="progress mb-2"><div className="progress-bar bg-success" style={{ width: '50%' }}>50%</div></div>
                <div className="progress mb-2"><div className="progress-bar bg-warning" style={{ width: '75%' }}>75%</div></div>
                <div className="progress mb-2"><div className="progress-bar bg-danger progress-bar-striped progress-bar-animated" style={{ width: '100%' }}>100%</div></div>
              </div>
              <div className="col-md-6">
                <h5>Spinners</h5>
                <div className="d-flex gap-3 align-items-center">
                  <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
                  <div className="spinner-border text-success" role="status"><span className="visually-hidden">Loading...</span></div>
                  <div className="spinner-grow text-warning" role="status"><span className="visually-hidden">Loading...</span></div>
                  <div className="spinner-grow text-danger" role="status"><span className="visually-hidden">Loading...</span></div>
                  <div className="spinner-border spinner-border-sm text-info" role="status"><span className="visually-hidden">Loading...</span></div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* SECTION: List Groups */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="mb-5">
            <h2 className="border-bottom pb-2 mb-3">List Groups</h2>
            <div className="row g-3">
              <div className="col-md-6">
                <h5>Default List Group</h5>
                <ul className="list-group">
                  <li className="list-group-item">Item 1 — 項目一</li>
                  <li className="list-group-item active">Active Item — 活動項目</li>
                  <li className="list-group-item">Item 3 — 項目三</li>
                  <li className="list-group-item disabled">Disabled — 禁用</li>
                </ul>
              </div>
              <div className="col-md-6">
                <h5>Flush List Group</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Notifications <span className="badge bg-primary rounded-pill">14</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Messages <span className="badge bg-success rounded-pill">3</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Alerts <span className="badge bg-danger rounded-pill">99+</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* SECTION: Breadcrumbs & Pagination */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="mb-5">
            <h2 className="border-bottom pb-2 mb-3">Navigation Components</h2>
            <h5>Breadcrumb</h5>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item"><a href="#">Library</a></li>
                <li className="breadcrumb-item active" aria-current="page">Data</li>
              </ol>
            </nav>
            <h5>Pagination</h5>
            <nav>
              <ul className="pagination">
                <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item active"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">Next</a></li>
              </ul>
            </nav>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* SECTION: Accordion */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="mb-5">
            <h2 className="border-bottom pb-2 mb-3">Accordion</h2>
            <div className="accordion" id="sampleAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header"><button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">Accordion Item #1 — 手風琴項目一</button></h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#sampleAccordion">
                  <div className="accordion-body">This is the content of the first accordion item. 第一個手風琴項目的內容。</div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header"><button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">Accordion Item #2</button></h2>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#sampleAccordion">
                  <div className="accordion-body">Second item content. 第二項內容。</div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* SECTION: Tooltips / Popovers text */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="mb-5">
            <h2 className="border-bottom pb-2 mb-3">Text Utilities</h2>
            <div className="d-flex flex-wrap gap-3 mb-3">
              <span className="text-primary">text-primary</span>
              <span className="text-secondary">text-secondary</span>
              <span className="text-success">text-success</span>
              <span className="text-danger">text-danger</span>
              <span className="text-warning">text-warning</span>
              <span className="text-info">text-info</span>
              <span className="text-muted">text-muted</span>
              <span className="text-body">text-body</span>
              <span className="text-body-secondary">text-body-secondary</span>
            </div>
            <div className="d-flex flex-wrap gap-3">
              <span className="p-2 rounded" style={{ background: 'var(--bs-body-bg)', border: '1px solid var(--bs-border-color)' }}>--bs-body-bg</span>
              <span className="p-2 rounded" style={{ background: 'var(--bs-card-bg)', border: '1px solid var(--bs-border-color)' }}>--bs-card-bg</span>
              <span className="p-2 rounded" style={{ background: 'var(--bs-secondary-bg)', border: '1px solid var(--bs-border-color)' }}>--bs-secondary-bg</span>
              <span className="p-2 rounded" style={{ background: 'var(--bs-tertiary-bg)', border: '1px solid var(--bs-border-color)' }}>--bs-tertiary-bg</span>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* SECTION: Icons (react-icons/bi) */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="mb-5">
            <h2 className="border-bottom pb-2 mb-3">Icons (react-icons/bi)</h2>
            <div className="d-flex flex-wrap gap-3 align-items-center">
              <BiBook size={24} /> <BiCalculator size={24} /> <BiTestTube size={24} /> <BiLeaf size={24} />
              <BiLaptop size={24} /> <BiGlobe size={24} /> <BiMoney size={24} /> <BiBriefcase size={24} />
              <BiSearch size={24} /> <BiCog size={24} /> <BiHome size={24} /> <BiStar size={24} />
              <BiHeart size={24} /> <BiCheck size={24} /> <BiX size={24} /> <BiInfoCircle size={24} />
              <BiError size={24} /> <BiCheckCircle size={24} /> <BiChevronDown size={24} /> <BiChevronUp size={24} />
            </div>
            <p className="text-muted small mt-2">Icons should inherit the current text color from the theme.</p>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* SECTION: Custom Components */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="mb-5">
            <h2 className="border-bottom pb-2 mb-3">Custom Site Components</h2>

            <h5 className="mt-4 mb-3">NavigationLink</h5>
            <div className="d-flex flex-wrap gap-3 mb-4">
              <NavigationLink href="/" className="btn btn-outline-primary btn-sm">Home (NavigationLink)</NavigationLink>
              <NavigationLink href="/cutoff" className="btn btn-outline-secondary btn-sm">Cutoff (NavigationLink)</NavigationLink>
              <NavigationLink href="/timer" className="btn btn-outline-success btn-sm">Timer (NavigationLink)</NavigationLink>
            </div>

            <h5 className="mt-4 mb-3">LastUpdatedAlert</h5>
            <LastUpdatedAlert date="2025-01-15" />

            <h5 className="mt-4 mb-3">FAQSection</h5>
            <FAQSection faqs={SAMPLE_FAQS} title="Sample FAQ — 示範常見問題" />
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* SECTION: Grid System */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="mb-5">
            <h2 className="border-bottom pb-2 mb-3">Grid System</h2>
            <div className="row g-2 mb-3">
              {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => (
                <div key={n} className="col-1">
                  <div className="p-2 text-center rounded" style={{ background: 'var(--bs-secondary-bg)', border: '1px solid var(--bs-border-color)', fontSize: '0.75rem' }}>{n}</div>
                </div>
              ))}
            </div>
            <div className="row g-2 mb-3">
              <div className="col-md-4"><div className="p-3 rounded" style={{ background: 'var(--bs-tertiary-bg)', border: '1px solid var(--bs-border-color)' }}>col-md-4</div></div>
              <div className="col-md-4"><div className="p-3 rounded" style={{ background: 'var(--bs-tertiary-bg)', border: '1px solid var(--bs-border-color)' }}>col-md-4</div></div>
              <div className="col-md-4"><div className="p-3 rounded" style={{ background: 'var(--bs-tertiary-bg)', border: '1px solid var(--bs-border-color)' }}>col-md-4</div></div>
            </div>
            <div className="row g-2">
              <div className="col-md-3"><div className="p-3 rounded" style={{ background: 'var(--bs-secondary-bg)', border: '1px solid var(--bs-border-color)' }}>col-md-3</div></div>
              <div className="col-md-6"><div className="p-3 rounded" style={{ background: 'var(--bs-secondary-bg)', border: '1px solid var(--bs-border-color)' }}>col-md-6</div></div>
              <div className="col-md-3"><div className="p-3 rounded" style={{ background: 'var(--bs-secondary-bg)', border: '1px solid var(--bs-border-color)' }}>col-md-3</div></div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* SECTION: CSS Variable Swatches */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="mb-5">
            <h2 className="border-bottom pb-2 mb-3">CSS Variable Swatches</h2>
            <p className="text-muted small">Visual reference showing each CSS variable's resolved value in the current theme.</p>
            <div className="row g-2">
              {[
                { name: '--bs-body-bg', css: 'var(--bs-body-bg)' },
                { name: '--bs-body-color', css: 'var(--bs-body-color)' },
                { name: '--bs-heading-color', css: 'var(--bs-heading-color)' },
                { name: '--bs-card-bg', css: 'var(--bs-card-bg)' },
                { name: '--bs-secondary-color', css: 'var(--bs-secondary-color)' },
                { name: '--bs-emphasis-color', css: 'var(--bs-emphasis-color)' },
                { name: '--bs-secondary-bg', css: 'var(--bs-secondary-bg)' },
                { name: '--bs-tertiary-bg', css: 'var(--bs-tertiary-bg)' },
                { name: '--bs-border-color', css: 'var(--bs-border-color)' },
              ].map(v => (
                <div key={v.name} className="col-md-4 col-6">
                  <div className="d-flex align-items-center gap-2 p-2 rounded" style={{ border: '1px solid var(--bs-border-color)' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 6, background: v.css, border: '1px solid var(--bs-border-color)', flexShrink: 0 }} />
                    <code style={{ fontSize: '0.72rem' }}>{v.name}</code>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* SECTION: Misc Bootstrap Utilities */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="mb-4">
            <h2 className="border-bottom pb-2 mb-3">Miscellaneous</h2>
            <h5>Close Button</h5>
            <button type="button" className="btn-close mb-3" aria-label="Close"></button>
            <h5>Horizontal Rule</h5>
            <hr />
            <h5>Figures</h5>
            <figure className="figure">
              <div style={{ width: 200, height: 100, background: 'var(--bs-secondary-bg)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--bs-border-color)' }}>
                <span className="text-muted">200×100</span>
              </div>
              <figcaption className="figure-caption">A caption for the above placeholder.</figcaption>
            </figure>
          </section>

        </div>
      </div>
    </>
  );
}
