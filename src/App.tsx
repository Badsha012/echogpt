import { useState, type FormEvent, type KeyboardEvent } from 'react'
import {
  ArrowDown, ArrowRight, ArrowUp, AudioLines, Check, ChevronDown, Command,
  FileText, Globe2, Layers3, Menu, Mic, Moon, MoreHorizontal, Plus,
  Search, Settings2, Sparkles, Sun, WandSparkles, X,
} from 'lucide-react'

type Model = { name: string; company: string; color: string }
type Message = { role: 'user' | 'assistant'; text: string; model?: string }

const models: Model[] = [
  { name: 'GPT-4o', company: 'OpenAI', color: '#2da77b' },
  { name: 'Claude 3.5 Sonnet', company: 'Anthropic', color: '#d27b55' },
  { name: 'Gemini 2.0 Flash', company: 'Google', color: '#517bd9' },
  { name: 'Llama 3.3', company: 'Meta', color: '#7356bb' },
]

const starterMessages: Message[] = [
  { role: 'user', text: 'Help me plan a calmer, more focused Monday.' },
  { role: 'assistant', model: 'GPT-4o', text: 'Let’s make space for what matters. Start with a 10-minute reset: write down everything competing for your attention, then circle the one thing that would make today feel meaningful.\n\nWant me to turn that into a gentle, time-blocked plan?' },
]

const historyItems = ['A calmer Monday, planned', 'Notes from the design review', 'Weekend in Copenhagen']
const quickActions = [
  { label: 'Summarize', icon: FileText, prompt: 'Summarize the key ideas from my last conversation.' },
  { label: 'Help me write', icon: WandSparkles, prompt: 'Help me write a thoughtful note to my team.' },
  { label: 'Research', icon: Globe2, prompt: 'Give me a useful starting point for researching sustainable design.' },
]

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeModel, setActiveModel] = useState(models[0])
  const [messages, setMessages] = useState<Message[]>(starterMessages)
  const [prompt, setPrompt] = useState('')
  const [activeHistory, setActiveHistory] = useState(historyItems[0])
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [extensionTab, setExtensionTab] = useState<'Ask' | 'History' | 'Settings'>('Ask')
  const [extensionPrompt, setExtensionPrompt] = useState('')

  function sendPrompt(value = prompt) {
    const cleanPrompt = value.trim()
    if (!cleanPrompt || isThinking) return
    setMessages((current) => [...current, { role: 'user', text: cleanPrompt }])
    setPrompt('')
    setIsThinking(true)
    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          model: activeModel.name,
          text: `Here’s a thoughtful place to start: ${cleanPrompt.replace(/[?.!]+$/, '').toLowerCase()}.\n\nI’d break it into one clear next step, a little room to explore, and a moment to check what’s working. Want to go deeper on any part?`,
        },
      ])
      setIsThinking(false)
    }, 750)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    sendPrompt()
  }

  function handlePromptKey(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendPrompt()
    }
  }

  function startNewChat() {
    setMessages([])
    setActiveHistory('New conversation')
    setPrompt('')
  }

  function handleExtensionSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!extensionPrompt.trim()) return
    sendPrompt(extensionPrompt)
    setExtensionPrompt('')
    document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={darkMode ? 'site dark' : 'site'}>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="EchoGPT home">
          <span className="brand-mark"><AudioLines size={21} strokeWidth={2.4} /></span>
          <span>echo<span className="brand-light">gpt</span></span>
        </a>
        <button className="mobile-menu icon-button" aria-label={mobileNavOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMobileNavOpen(!mobileNavOpen)}>
          {mobileNavOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
        <nav className={mobileNavOpen ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">
          <a href="#workspace" onClick={() => setMobileNavOpen(false)}>Workspace</a>
          <a href="#extension" onClick={() => setMobileNavOpen(false)}>Extension</a>
          <a href="#models" onClick={() => setMobileNavOpen(false)}>Models</a>
          <a href="#why" onClick={() => setMobileNavOpen(false)}>Why Echo</a>
          <a href="#faq" onClick={() => setMobileNavOpen(false)}>FAQ</a>
        </nav>
        <div className="top-actions">
          <button className="theme-button" onClick={() => setDarkMode(!darkMode)} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a className="button button-small button-dark" href="#workspace">Open workspace <ArrowRight size={15} /></a>
        </div>
      </header>

      <main id="top">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <div className="eyebrow"><span className="live-dot" /> YOUR AI, IN GOOD COMPANY</div>
            <h1>Make room for<br /><span>better thinking.</span></h1>
            <p className="hero-description">All your favorite AI minds, one beautifully clear space. Find your flow, follow your curiosity, and get to the good stuff faster.</p>
            <div className="hero-buttons">
              <a className="button button-coral" href="#workspace">Try EchoGPT <ArrowRight size={16} /></a>
              <a className="text-link" href="#workspace">Take a look around <ArrowDown size={15} /></a>
            </div>
            <div className="hero-footnote"><span className="avatar-stack"><i>G</i><i>C</i><i>M</i><i>+</i></span><span>One workspace. Many ways to think.</span></div>
          </div>
          <div className="hero-art" aria-label="Illustration of several connected AI model windows">
            <div className="art-sunburst" />
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="floating-note note-back"><span className="note-dot green" />Claude <small>good with nuance</small></div>
            <div className="floating-note note-front"><span className="note-dot coral" />GPT-4o <small>ready when you are</small></div>
            <div className="hero-orb"><AudioLines size={66} strokeWidth={1.5} /><span className="orb-spark">✳</span></div>
            <div className="art-caption"><span>01 /</span> A little more room to think</div>
          </div>
        </section>

        <section className="ticker" aria-label="Supported AI models">
          <span>GOOD COMPANY, GREAT IDEAS</span><i /> <span>OPENAI</span><i /> <span>ANTHROPIC</span><i /> <span>GOOGLE</span><i /> <span>META</span><i /> <span>AND MORE</span>
        </section>

        <section id="workspace" className="workspace-section section-wrap">
          <div className="section-heading workspace-heading">
            <div><div className="eyebrow">A SPACE THAT GETS OUT OF YOUR WAY</div><h2>Come in. Get curious.</h2></div>
            <p>One calm home for the conversations, ideas, and little sparks you don’t want to lose.</p>
          </div>
          <div className="product-window">
            <aside className="app-sidebar">
              <div className="sidebar-top"><div className="mini-brand"><span className="mini-brand-mark"><AudioLines size={15} /></span> echo<span>gpt</span></div><button className="subtle-icon" aria-label="Collapse sidebar"><MoreHorizontal size={18} /></button></div>
              <button className="new-chat" onClick={startNewChat}><Plus size={15} /> New conversation <span>⌘ K</span></button>
              <div className="sidebar-search"><Search size={14} /><span>Search conversations</span><kbd>⌘ /</kbd></div>
              <div className="history-label">YOUR RECENT THOUGHTS</div>
              <div className="history-list">
                {historyItems.map((item, index) => <button key={item} className={activeHistory === item ? 'history-item selected' : 'history-item'} onClick={() => { setActiveHistory(item); setMessages(index === 0 ? starterMessages : [{ role: 'user', text: item }, { role: 'assistant', model: 'Claude 3.5 Sonnet', text: 'A few notes are ready to pick up where you left off. What would you like to explore next?' }]) }}><span className="history-glyph">{index === 0 ? <Sparkles size={14} /> : index === 1 ? <FileText size={14} /> : <Globe2 size={14} />}</span>{item}</button>)}
              </div>
              <div className="sidebar-bottom"><div className="user-chip"><div className="user-avatar">J</div><span>Jamie Parker<small>Personal workspace</small></span><MoreHorizontal size={17} /></div></div>
            </aside>

            <section className="chat-panel" aria-label="Interactive EchoGPT chat preview">
              <div className="chat-topbar">
                <div className="current-model-wrap">
                  <span className="model-swatch" style={{ backgroundColor: activeModel.color }} />
                  <select aria-label="Choose AI model" value={activeModel.name} onChange={(event) => setActiveModel(models.find((model) => model.name === event.target.value) ?? models[0])}>
                    {models.map((model) => <option key={model.name} value={model.name}>{model.name}</option>)}
                  </select>
                  <ChevronDown size={13} className="select-caret" />
                  <span className="model-company">{activeModel.company}</span>
                </div>
                <div className="chat-tools"><span className="save-status"><Check size={12} /> Saved</span><button className="subtle-icon" aria-label="Workspace settings" onClick={() => setSettingsOpen(!settingsOpen)}><Settings2 size={17} /></button><button className="subtle-icon" aria-label="More actions"><MoreHorizontal size={18} /></button></div>
              </div>
              {settingsOpen && <div className="settings-popover"><strong>Workspace settings</strong><label><input type="checkbox" defaultChecked /> Save conversations</label><label><input type="checkbox" /> Send on Enter</label><div className="settings-note">Your conversations stay yours.</div></div>}
              <div className="chat-scroll">
                {messages.length === 0 ? <div className="welcome-state"><span className="welcome-mark"><AudioLines size={27} /></span><div className="eyebrow">A FRESH PAGE</div><h3>What’s on your mind?</h3><p>Start with a question, a half-formed thought, or a blank page.</p></div> : <div className="message-list">
                  {messages.map((message, index) => <div className={`message-row ${message.role}`} key={`${index}-${message.role}`}>
                    {message.role === 'assistant' && <div className="assistant-avatar"><AudioLines size={15} /></div>}
                    <div className="message-content">{message.role === 'assistant' && <div className="message-meta">{message.model ?? 'EchoGPT'} <span>·</span> just now</div>}<div className="message-bubble">{message.text.split('\n').map((line, lineIndex) => <p key={lineIndex}>{line || '\u00a0'}</p>)}</div>{message.role === 'assistant' && <div className="message-actions"><button aria-label="Copy response" onClick={() => navigator.clipboard?.writeText(message.text)}><Layers3 size={13} /> Copy</button><button aria-label="Regenerate response" onClick={() => sendPrompt('Can you give me another version?')}><WandSparkles size={13} /> Try another</button></div>}</div>
                  </div>)}
                  {isThinking && <div className="thinking"><span /><span /><span /> <small>{activeModel.name} is thinking</small></div>}
                </div>}
                {messages.length < 3 && <div className="quick-actions">{quickActions.map(({ label, icon: Icon, prompt: actionPrompt }) => <button key={label} onClick={() => sendPrompt(actionPrompt)}><Icon size={14} />{label}<ArrowRight size={12} /></button>)}</div>}
              </div>
              <form className="composer" onSubmit={handleSubmit}>
                <textarea aria-label="Write a message" placeholder="Ask anything, or just start somewhere…" value={prompt} onChange={(event) => setPrompt(event.target.value)} onKeyDown={handlePromptKey} rows={2} />
                <div className="composer-bottom"><div className="composer-tools"><button type="button" aria-label="Add attachment"><Plus size={17} /></button><button type="button" aria-label="Use voice input"><Mic size={16} /></button><span className="composer-hint"><Command size={11} /> Enter to send</span></div><button className="send-button" aria-label="Send message" type="submit" disabled={!prompt.trim() || isThinking}><ArrowUp size={17} /></button></div>
              </form>
              <div className="chat-disclaimer">EchoGPT can make mistakes. Take a breath, then double-check important details.</div>
            </section>
          </div>
          <div className="product-caption"><span>THE ECHOGPT WORKSPACE</span><span>Thoughtful by design <i>✳</i></span></div>
        </section>

        <section id="models" className="models-section">
          <div className="section-wrap models-inner">
            <div className="models-copy"><div className="eyebrow">DIFFERENT BRAINS, DIFFERENT MAGIC</div><h2>Find the right<br />voice for the moment.</h2><p>Switch between leading AI models without switching tabs, tools, or the way you work.</p><a className="text-link" href="#workspace">Meet your models <ArrowRight size={15} /></a></div>
            <div className="model-cards">{models.map((model, index) => <button className="model-card" key={model.name} onClick={() => { setActiveModel(model); document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth' }) }}><span className="model-number">0{index + 1}</span><span className="model-icon" style={{ '--model-color': model.color } as React.CSSProperties}>{model.name.slice(0, 1)}</span><span className="model-card-name">{model.name}</span><span className="model-card-company">{model.company}</span><ArrowRight size={16} className="model-arrow" /></button>)}</div>
          </div>
        </section>

        <section id="extension" className="extension-section section-wrap">
          <div className="extension-copy">
            <div className="eyebrow">A GOOD IDEA, ONE CLICK AWAY</div>
            <h2>A little Echo,<br />wherever you are.</h2>
            <p>A compact companion for your browser. Bring a question, pick a model, and get back to what you were doing.</p>
            <div className="extension-points"><span><Check size={14} /> Ask from any tab</span><span><Check size={14} /> Pick up recent chats</span><span><Check size={14} /> Keep your focus in view</span></div>
          </div>
          <div className="extension-stage">
            <div className="extension-window">
              <div className="extension-top"><div className="extension-brand"><span className="mini-brand-mark"><AudioLines size={14} /></span> echo<span>gpt</span></div><button className="subtle-icon" aria-label="Start a new extension conversation" onClick={() => { startNewChat(); setExtensionTab('Ask') }}><Plus size={17} /></button></div>
              <div className="extension-tabs" role="tablist" aria-label="Extension views">
                {(['Ask', 'History', 'Settings'] as const).map((tab) => <button key={tab} role="tab" aria-selected={extensionTab === tab} className={extensionTab === tab ? 'active' : ''} onClick={() => setExtensionTab(tab)}>{tab === 'Ask' ? <Sparkles size={13} /> : tab === 'History' ? <FileText size={13} /> : <Settings2 size={13} />}{tab}</button>)}
              </div>
              {extensionTab === 'Ask' && <div className="extension-ask"><label htmlFor="extension-model">YOUR AI PARTNER</label><div className="extension-model-select"><span className="model-swatch" style={{ backgroundColor: activeModel.color }} /><select id="extension-model" aria-label="Choose extension AI model" value={activeModel.name} onChange={(event) => setActiveModel(models.find((model) => model.name === event.target.value) ?? models[0])}>{models.map((model) => <option key={model.name} value={model.name}>{model.name}</option>)}</select><ChevronDown size={13} /></div><form className="extension-prompt-form" onSubmit={handleExtensionSubmit}><textarea aria-label="Extension prompt" placeholder="What are you thinking about?" rows={4} value={extensionPrompt} onChange={(event) => setExtensionPrompt(event.target.value)} /><div><span><Command size={11} /> Enter to ask</span><button type="submit" aria-label="Send extension prompt" disabled={!extensionPrompt.trim()}><ArrowUp size={15} /></button></div></form><div className="extension-quick"><button onClick={() => { setExtensionPrompt('Summarize this page in three useful points.'); }}>Summarize page <ArrowRight size={11} /></button><button onClick={() => { setExtensionPrompt('Help me understand this.'); }}>Explain this <ArrowRight size={11} /></button></div></div>}
              {extensionTab === 'History' && <div className="extension-history"><div className="extension-view-label">RECENT CONVERSATIONS</div>{historyItems.map((item, index) => <button key={item} onClick={() => { setActiveHistory(item); setMessages(index === 0 ? starterMessages : [{ role: 'user', text: item }, { role: 'assistant', model: activeModel.name, text: 'A few notes are ready to pick up where you left off. What would you like to explore next?' }]); setExtensionTab('Ask'); document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth' }) }}><span className="history-glyph"><FileText size={14} /></span><span>{item}<small>{index === 0 ? 'Today · 10:42 am' : 'Yesterday'}</small></span><ArrowRight size={13} /></button>)}</div>}
              {extensionTab === 'Settings' && <div className="extension-settings"><div className="extension-view-label">YOUR PREFERENCES</div><label><span>Save conversations<small>Keep chats in your workspace</small></span><input type="checkbox" defaultChecked /></label><label><span>Open links in new tab<small>Stay right where you are</small></span><input type="checkbox" /></label><div className="extension-account"><div className="user-avatar">J</div><span>Jamie Parker<small>Personal workspace</small></span><MoreHorizontal size={16} /></div></div>}
              <div className="extension-foot"><span><span className="live-dot" /> All systems ready</span><button aria-label="Open full workspace" onClick={() => document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth' })}>Open full workspace <ArrowRight size={12} /></button></div>
            </div>
            <div className="extension-stage-note"><span>ECHOGPT FOR CHROME</span><span>RIGHT HERE, RIGHT NOW <i>✳</i></span></div>
          </div>
        </section>

        <section id="why" className="why-section section-wrap">
          <div className="section-heading"><div><div className="eyebrow">LESS TOOL-HOPPING, MORE LIGHTBULBS</div><h2>Space for the good stuff.</h2></div><p>Useful tools should make your work feel lighter. EchoGPT keeps the busywork in the background.</p></div>
          <div className="feature-grid">
            <article className="feature feature-main"><div className="feature-art feature-art-orbit"><span className="feature-core"><AudioLines size={30} /></span><span className="feature-node node-a">G</span><span className="feature-node node-b">C</span><span className="feature-node node-c">M</span><span className="orbit-line" /></div><div className="feature-index">01 / ONE HOME</div><h3>Your AI life,<br />beautifully together.</h3><p>Keep every model and conversation in one focused, searchable workspace.</p></article>
            <article className="feature feature-lime"><div className="feature-art feature-stacks"><span>IDEAS</span><span>QUESTIONS</span><span>WHAT IF</span><Sparkles size={22} /></div><div className="feature-index">02 / KEEP YOUR FLOW</div><h3>Less switching.<br />More making.</h3><p>Move from thought to thought without losing your train of thought.</p></article>
            <article className="feature feature-dark"><div className="feature-art feature-privacy"><div className="privacy-ring"><span><Check size={20} /></span></div><span className="privacy-label">YOUR SPACE<br />YOUR RULES</span></div><div className="feature-index">03 / YOURS TO KEEP</div><h3>Thoughtful by<br />default.</h3><p>Your work stays organized, your settings stay yours, and your attention stays on the work.</p></article>
          </div>
        </section>

        <section className="quote-band"><div className="quote-mark">“</div><blockquote>It feels less like using a tool, and more like <em>making space for a thought.</em></blockquote><div className="quote-credit"><span className="quote-line" /> A BETTER WAY TO THINK WITH AI <span className="quote-line" /></div></section>

        <section id="faq" className="faq-section section-wrap"><div className="faq-heading"><div className="eyebrow">A FEW THINGS YOU MIGHT BE WONDERING</div><h2>Good questions.</h2><p>A little clarity before you dive in.</p></div><div className="faq-list">
          <details><summary>What is EchoGPT? <span><Plus size={17} /></span></summary><p>EchoGPT brings multiple AI models into one calm, organized workspace. Choose the model that fits your task and keep your conversations together.</p></details>
          <details><summary>Which AI models can I use? <span><Plus size={17} /></span></summary><p>The concept includes leading models from OpenAI, Anthropic, Google, and Meta. Availability depends on your connected accounts and plan.</p></details>
          <details><summary>Can I use EchoGPT as a browser extension? <span><Plus size={17} /></span></summary><p>Yes. The extension concept puts your recent chats, model switcher, and prompt composer in a compact popup, ready from any tab.</p></details>
          <details><summary>Are my conversations private? <span><Plus size={17} /></span></summary><p>Your conversations belong to you. In a production version, model providers’ data policies and your workspace settings would determine how prompts are processed and stored.</p></details>
        </div></section>

        <section className="final-cta"><div className="cta-spark spark-left">✳</div><div className="eyebrow">YOUR NEXT GOOD IDEA IS RIGHT THERE</div><h2>Let’s see where<br />your mind goes.</h2><a className="button button-dark" href="#workspace">Step inside <ArrowRight size={16} /></a><div className="cta-spark spark-right">✳</div></section>
      </main>

      <footer className="footer"><a className="brand footer-brand" href="#top"><span className="brand-mark"><AudioLines size={20} strokeWidth={2.4} /></span><span>echo<span className="brand-light">gpt</span></span></a><span className="footer-note">A little more room to think.</span><div className="footer-links"><a href="#models">Models</a><a href="#why">About</a><a href="#faq">FAQ</a><a href="#top">Back to top ↑</a></div><span className="copyright">© 2026 EchoGPT concept</span></footer>
    </div>
  )
}

export default App
