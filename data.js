/* =========================================================
   Everything you'd want to edit lives in this file.
   ========================================================= */

const PROFILE = {
  name: "Aditya Sagar",
  short: "adi sagar",
  email: "adisagar450@gmail.com",
  github: "AdityasagarR123",
  x: "sagar_adi45242",
  linkedin: "https://www.linkedin.com/in/aditya-sagar-1b35b2323/",
  resume: "assets/Aditya_Sagar_Resume.pdf",
  avatar: "assets/avatar.png",
  // Real profile pictures, loaded straight from each site.
  xAvatar: "https://pbs.twimg.com/profile_images/2097596242377469952/zw6gmwzm_400x400.jpg",
  xBanner: "https://pbs.twimg.com/profile_banners/2000114959326531584/1767031340/1500x500",
  githubAvatar: "https://avatars.githubusercontent.com/u/178429428?v=4",
  // LinkedIn hides profile photos from logged-out visitors. Save yours as
  // assets/linkedin.jpg and set this to "assets/linkedin.jpg".
  linkedinAvatar: "https://pbs.twimg.com/profile_images/2097596242377469952/zw6gmwzm_400x400.jpg",
  spotifyPlaylist: "6jMLR7NNaZynTNU0BM36XJ",

  // X and LinkedIn don't offer a free public API for follower counts,
  // so update these numbers by hand whenever they change.
  xFollowers: 47,      // as of 24 Oct 2026
  xFollowing: 46,
  xPosts: 162,
  xBio: "Ex-AI/ML Intern @domAIynlabs | Ex- Research Intern @DRDO_india\nFull stack developer (ig I am)\nLearning Dsa and ML (tracking them side by side lol)",
  xJoined: "Joined December 2025",
  linkedinFollowers: null,     // e.g. 512 (hidden while null)
  linkedinConnections: null,   // e.g. "500+" (hidden while null)

  // Paste LinkedIn post embed URLs here (on a post: ··· → Embed this post → copy the src).
  // e.g. "https://www.linkedin.com/embed/feed/update/urn:li:share:1234567890"
  linkedinPosts: [],
};

const SKILLS = [
  ["Programming Languages", ["C++", "Python", "JavaScript"]],
  ["Full-Stack Web Dev", ["React.js", "Node.js", "Express.js", "MongoDB", "Firebase", "REST APIs"]],
  ["ML & Data Science", ["Pandas", "NumPy", "Scikit-learn", "TensorFlow", "Keras", "NLTK", "Matplotlib", "SymPy"]],
  ["Core CS", ["DSA", "OOP", "DBMS", "Operating Systems"]],
  ["Dev Tools & Platforms", ["GitHub", "Kaggle", "Postman", "Jupyter", "Google Colab", "Streamlit", "VS Code"]],
  ["Frontend Tech", ["HTML", "CSS", "Tailwind", "Bootstrap", "GSAP", "Three.js"]],
  ["Soft Skills", ["Leadership", "Teamwork", "Communication", "Time Management", "Quick Learner"]],
];

const PROJECTS = [
  {
    name: "AI Bouncer", live: "https://ai-bouncer.vercel.app", repo: "AI-BOUNCER",
    stack: ["FastAPI", "XGBoost", "DeBERTa-v3", "FAISS", "PyTorch", "Next.js"],
    points: [
      "An AI prompt firewall that catches jailbreaks, prompt injections and adversarial prompts with a cascading ML pipeline.",
      "Low-latency moderation: cheap XGBoost screen first, then semantic retrieval over known attacks (FAISS), then transformer verification with DeBERTa-v3.",
    ],
  },
  {
    name: "Sentra — AI Cyber Threat Detection", live: "https://cyber-threat-detection-backend.vercel.app", repo: "Sentra",
    stack: ["TensorFlow", "Random Forest", "FastAPI", "React", "NSL-KDD"],
    points: [
      "Built at DRDO. Two independent ML pipelines — network intrusion detection and PE-file malware classification — joined into one analyst dashboard.",
      "DNNs benchmarked against Random Forest, served through separate prediction APIs with consistent preprocessing.",
    ],
  },
  {
    name: "TrustProof", repo: "Trust-proof",
    stack: ["React", "Vite", "TailwindCSS", "Firebase", "Gemini API"],
    points: [
      "AI-powered review platform with bill verification and OTP-based review authentication.",
      "Trust analysis: review weighting, collusion detection and AI-generated business insights.",
    ],
  },
  {
    name: "Brave Custom Tab — Dynamic New Tab Extension", repo: "Brave-Extension",
    stack: ["JavaScript", "GSAP", "Chrome Extension APIs", "HTML/CSS"],
    points: [
      "A customizable Brave/Chrome new tab with video wallpapers, animated search UI and pinned favourite sites.",
      "GSAP animations and local persistence through the Chrome Storage APIs.",
    ],
  },
  {
    name: "LIFELINE — Index Offload", live: "https://index-offload.vercel.app", repo: "index-offload",
    stack: ["Python", "Vector search"],
    points: ["Distributed vector index offloading and an autonomous edge memory engine."],
  },
  {
    name: "InterScout Web Scraper", live: "https://interscout-webscrapper.vercel.app", repo: "INTERSCOUT_WEBSCRAPPER",
    stack: ["TypeScript"],
    points: ["A web scraper with a clean web front end."],
  },
];

const EXPERIENCE = [
  {
    org: "DomAIyn Labs", role: "AI/ML Intern · Remote (County Dublin, Ireland)", when: "Apr 2026 – Jul 2026", color: "#7c5cff", logo: "dL",
    points: [
      "Developed and curated datasets for AI blue-teaming and safety evaluations, around Bayora, their open-source red teaming platform.",
      "Contributed to early-stage red-teaming efforts to identify model vulnerabilities and risks.",
      "Trained, fine-tuned, and evaluated ML/LLM models for performance and robustness.",
      "Performed research and analysis on AI safety, reliability, and alignment challenges.",
    ],
  },
  {
    org: "DRDO, Ministry of Defence", role: "Research Intern · On-site", when: "Jun 2026 – Jul 2026", color: "#ff8a3d", logo: "DR",
    points: [
      "Designed and built Sentra, an AI-based framework for network intrusion and malware detection.",
      "Trained and benchmarked MLP and Random Forest models on NSL-KDD and malware datasets.",
      "Deployed the models via a FastAPI backend and React frontend for real-time threat prediction.",
    ],
  },
  {
    org: "Geek Room", role: "Web Developer · Apprenticeship", when: "Oct 2024 – Dec 2025", color: "#2ea043", logo: "GR",
    points: [
      "Built responsive and interactive web applications using modern frontend technologies.",
      "Delivered multiple client and campus-initiative websites end-to-end, from design to deployment.",
      "Collaborated with designers and peer developers to ship polished, interactive user interfaces.",
    ],
  },
];

const EDUCATION = [
  { school: "Maharaja Surajmal Institute of Technology", degree: "B.Tech in Computer Science and Engineering · GGSIPU", when: "Aug 2024 – Sep 2028", note: "SGPA 8.2 · CGPA 7.66" },
  { school: "Kamal Model Sr. Sec. School", degree: "Class XII", when: "Completed 2024" },
];

const CERTIFICATIONS = [
  "Supervised Machine Learning: Regression and Classification",
  "AWS Educate — Introduction to Generative AI (Training Badge)",
  "Google Gemini for Google Workspace",
];

const ACHIEVEMENTS = [
  { when: "Feb 2026", where: "MSIT", title: "Ctrl+Alt+Idea Ideathon — 2nd Position", img: "assets/cert-ctrlaltidea.png",
    text: "Runners-up at Microsoft Student Chapter MSIT's flagship ideathon — recognised for innovation, teamwork and problem-solving under a tight sprint." },
  { when: "Jan 2026", where: "DTU", title: "brAInwave 2.0 — Participation", img: "assets/cert-brainwave.png",
    text: "Participated in brAInwave 2.0 at Delhi Technological University — an AI-focused contest hosted by AIMS-DTU across two days of building and pitching." },
  { when: "Nov 2025", where: "IIIT Delhi", title: "HackHatch Finals — Top 100", img: "assets/cert-hackhatch.png",
    text: "Selected among the Top 100 out of 1000+ teams for the HackHatch Finals at IIIT-Delhi — a 24-hour finale with mentors, an investor jury and a ₹75,000 prize pool." },
];

const TREKS = [
  { name: "Laka Glacier", done: true, note: "via Triund, Dharamshala" },
  { name: "Hampta Pass", done: true, note: "Kullu → Lahaul, 4,270 m" },
  { name: "Everest Base Camp", done: false, note: "5,364 m · Nepal" },
  { name: "Annapurna Base Camp", done: false, note: "4,130 m · Nepal" },
];

const PHOTOS = [
  { src: "assets/wallpaper.jpg", cap: "Above the Kangra valley, Dharamshala", album: "Treks" },
  { src: "assets/hampta-day1.mp4", cap: "Hampta Pass, day 1", album: "Treks", video: true, poster: "assets/trek-hampta-valley.jpg" },
  { src: "assets/trek-hampta-valley.jpg", cap: "Hampta Pass, 27 Jun 2026", album: "Treks" },
  { src: "assets/trek-hampta-camp.jpg", cap: "Hampta Pass, resting at camp", album: "Treks" },
  { src: "assets/trek-hampta.jpg", cap: "Hampta Pass, snow and crampons", album: "Treks" },
  { src: "assets/trek-boulder.jpg", cap: "King of the boulder field", album: "Treks" },
  { src: "assets/trek-triund.jpg", cap: "Laka Glacier trail, above the Kangra valley", album: "Treks" },
  { src: "assets/avatar.png", cap: "Me, without a mountain", album: "Me" },
  { src: "assets/cert-ctrlaltidea.png", cap: "Ctrl+Alt+Idea — 2nd position", album: "Wins" },
  { src: "assets/cert-hackhatch.png", cap: "HackHatch finals — top 100", album: "Wins" },
  { src: "assets/cert-brainwave.png", cap: "brAInwave 2.0 @ DTU", album: "Wins" },
];

/* Your real X posts, shown with X's official embed (live counts, photos, X's own design).
   To add a post: open it on X, copy the number at the end of its URL, and put it at the top. */
const X_POST_IDS = [
  "2113273862809112750",
  "2105308406311739824",
  "2105300734195679503",
  "2104134499999285489",
  "2103936322595660193",
];

/* Fallback text for the posts above, used only if a visitor's browser blocks X's embed. */
const X_LATEST = [
  { text: "NEW POV -\nGarba is just debugging with your legs.\nSpin in circles for 3hrs sweat a lot no idea whats going on,somehow it works at the end\nAnyway did both this week 3 PR + 2 issues\n\ncheck my work- <a href=\"https://github.com/AdityasagarR123\" target=\"_blank\" rel=\"noopener\">github.com/AdityasagarR123</a>\n\nAND LETS CONNECT \n(<a>#BuildInPublic</a> <a>#OpenSource</a> <a>#Navratri</a>)", time: "Oct 22", views: "213" },
  { text: "Spend my whole day on this PR of mine and submited it with all the honesty but yeah i think this worth my day the design is so sick and it pased all 48 checks lesgo ig  (I DONT KNOW HOW TO COMPREHENED 2 WEEKS BACK I WAS JUST UPDATING DOCS)   ps - m HONEST abt AI usage", time: "Sep 30", views: "106" },
  { text: "Built and submitted the static Evidence Explorer frontend for @aossie_org's OpenVerifiableLLM\n\nFeatures 6 responsive views, cryptographic digest auditing, honest release gating, and 48 passing tests (WCAG 2.2 AA compliant)  \n\nCheck out the PR: <a href=\"https://github.com/AOSSIE-Org/OpenVerifiableLLM/pull/178\" target=\"_blank\" rel=\"noopener\">github.com/AOSSIE-Org/Ope…</a>", time: "Sep 30", views: "119" },
];

const X_THREAD = [
  { text: "First year Adi would not believe this summer. (got 2 internships)\n\nSplit my time between @DRDO_India and @domAIynLabs this summer — one side was \"build a working system,\" the other was \"figure out what we're even trying to measure.\"", time: "Sep 9", views: "574" },
  { text: "DRDO\nWorked on Sentra, an AI-based cyber threat detection framework. Built two independent ML pipelines: one to detect malicious network activity, and another to classify executable files as malicious or benign. Then connected them into a single deployed web app.", time: "Sep 9", views: "" },
  { text: "For the network side, I used NSL-KDD for intrusion detection, handling preprocessing, categorical features, normalization, and class imbalance. For malware detection, I extracted structural and header features directly from PE files.", time: "Sep 9", views: "" },
  { text: "I trained DNNs for both pipelines and compared them with Random Forest. The biggest learning came after modeling turning notebooks into an app with FastAPI, React, consistent preprocessing, and separate prediction APIs.\n\nLink- <a href=\"https://cyber-threat-detection-backend.vercel.app\" target=\"_blank\" rel=\"noopener\">cyber-threat-detection-backend.vercel.app</a>", time: "Sep 9", views: "",
    card: { url: "https://cyber-threat-detection-backend.vercel.app", domain: "cyber-threat-detection-backend.vercel.app", title: "SENTRA — AI-Based Cyber Threat Detection Framework" } },
  { text: "Domaiyn Labs - AI safety / red teaming\n\nA completely different headspace.\n\nWorked around Bayora, their open-source red teaming platform. A major part of my work involved collecting and curating datasets for AI blue-teaming and safety evaluations.", time: "Sep 9", views: "" },
  { text: "I also contributed to early-stage red teaming, testing models for vulnerabilities and safety risks. I trained and evaluated models using XGBoost and transformer fine-tuning, and worked with a FastAPI inference backend to serve predictions.", time: "Sep 9", views: "" },
];

/* Messages — these are parody chats, labelled as such in the UI. */
const CHATS = [
  { id: "modi", name: "Narendra Modi", color: "#ff9933", init: "NM", time: "9:41 AM", wiki: "Narendra_Modi",
    msgs: [
      ["them", "Aditya ji, namaste 🙏"],
      ["them", "saw Sentra. DRDO people are very impressed. AI se cyber threat detection, that too in 2nd year?"],
      ["me", "thank you sir 🙏 just doing my bit"],
      ["them", "honestly… should I resign? you can run Digital India from your hostel room"],
      ["me", "sir please, I still have DBMS end-sems"],
      ["them", "theek hai. after end-sems then 😄"],
    ],
    replies: ["mann ki baat mein aapka zikr karunga 🙏", "proud of our yuva shakti 🇮🇳", "ISRO also wants to know your availability"] },
  { id: "elon", name: "Elon Musk", color: "#3a3a3c", init: "EM", time: "9:02 AM", wiki: "Elon_Musk",
    msgs: [
      ["them", "up for a walk?"],
      ["me", "where to"],
      ["them", "mars. eventually. today just the parking lot"],
      ["them", "also heard you red team models at domAIyn. come break grok, it's fine"],
      ["me", "only if I can bring my trekking poles"],
      ["them", "deal 🚀"],
    ],
    replies: ["interesting", "concerning", "💯", "we should talk about the open source thing"] },
  { id: "mrbeast", name: "MrBeast", color: "#2aa4f4", init: "MB", time: "Yesterday", wiki: "MrBeast",
    msgs: [
      ["them", "yo aditya!! I'll give you $10,000 if you finish Everest Base Camp"],
      ["me", "bet. annapurna too?"],
      ["them", "LAST TO LEAVE BASE CAMP WINS $500,000"],
    ],
    replies: ["subscribe 😂", "chandler is coming too", "we're filming this"] },
  { id: "mkbhd", name: "Marques Brownlee", color: "#e53935", init: "MK", time: "Tue", wiki: "Marques_Brownlee",
    msgs: [
      ["them", "the macOS portfolio is clean. matte finish, nice haptics"],
      ["me", "it's a website marques"],
      ["them", "and it still feels better than most phones I review"],
    ],
    replies: ["dope.", "10/10 would review again", "the dock animation? chef's kiss"] },
  { id: "fireship", name: "Fireship", color: "#ff6d00", init: "🔥", time: "Mon", img: "https://unavatar.io/youtube/Fireship",
    msgs: [
      ["them", "AI Bouncer — prompt firewall in 100 seconds?"],
      ["me", "XGBoost → FAISS → DeBERTa-v3, low latency cascade"],
      ["them", "that's actually 12 seconds. respect"],
    ],
    replies: ["this has been AI Bouncer in 100 seconds", "thanks for watching, I will see you in the next one"] },
  { id: "zuck", name: "Mark Zuckerberg", color: "#1877f2", init: "MZ", time: "8:12 AM", wiki: "Mark_Zuckerberg",
    msgs: [
      ["them", "hey aditya. saw your open source PRs. 20 of them?"],
      ["me", "yeah, mostly AOSSIE and RISC-V"],
      ["them", "we're open sourcing everything at Meta now. want to help red team the next Llama?"],
      ["me", "only if I don't have to wear the metaverse headset"],
      ["them", "fair. it's mostly glasses now anyway 🕶️"],
    ],
    replies: ["let's do a jiu-jitsu session after", "move fast and fix things", "I'll have my team reach out"] },
  { id: "altman", name: "Sam Altman", color: "#10a37f", init: "SA", time: "Yesterday", wiki: "Sam_Altman",
    msgs: [
      ["them", "AI Bouncer is a cool idea. prompt injection is a real problem"],
      ["me", "cascading classifier, cheap first, DeBERTa last"],
      ["them", "we should talk. also please don't jailbreak our models on twitter"],
    ],
    replies: ["feel the AGI", "this is the year of agents", "ok actually that's pretty smart"] },
  { id: "pichai", name: "Sundar Pichai", color: "#4285f4", init: "SP", time: "Yesterday", wiki: "Sundar_Pichai",
    msgs: [
      ["them", "namaste Aditya! from one IIT-aspirant-turned-engineer to another 🙂"],
      ["me", "sir you went to IIT, I went to MSIT"],
      ["them", "the trekking photos say you're doing just fine. Gemini liked them too"],
    ],
    replies: ["AI, AI, AI 😄", "Google I/O pass is on the way", "keep building"] },
  { id: "nadella", name: "Satya Nadella", color: "#00a4ef", init: "SN", time: "Thu", wiki: "Satya_Nadella",
    msgs: [
      ["them", "heard you came 2nd at the Microsoft Student Chapter ideathon"],
      ["me", "Ctrl+Alt+Idea! runners-up"],
      ["them", "growth mindset. next year, first. and try Copilot for the DBMS assignment"],
    ],
    replies: ["empower every student on the planet", "hit refresh", "proud of MSC MSIT"] },
  { id: "jensen", name: "Jensen Huang", color: "#76b900", init: "JH", time: "Thu", wiki: "Jensen_Huang",
    msgs: [
      ["them", "how many GPUs did you train Sentra on"],
      ["me", "one colab T4 and a lot of prayers"],
      ["them", "the more you buy, the more you save. sending a leather jacket"],
    ],
    replies: ["CUDA is all you need", "the jacket is non-negotiable", "accelerated computing 🟩"] },
  { id: "karpathy", name: "Andrej Karpathy", color: "#6e56cf", init: "AK", time: "Wed", wiki: "Andrej_Karpathy",
    msgs: [
      ["them", "nice NSL-KDD class imbalance fix. did you look at your data before training?"],
      ["me", "spent two days just staring at it"],
      ["them", "correct. most people skip that. the rest is just vibe coding 😄"],
    ],
    replies: ["become one with the data", "build it from scratch once", "nanoGPT next?"] },
  { id: "linus", name: "Linus Torvalds", color: "#333", init: "LT", time: "Wed", wiki: "Linus_Torvalds",
    msgs: [
      ["them", "saw your HAMi PR about cache directory permissions"],
      ["me", "was it okay?"],
      ["them", "it restricted permissions and handled errors. I have nothing rude to say. enjoy it, that's rare."],
    ],
    replies: ["talk is cheap. show me the code.", "fine.", "don't break userspace"] },
  { id: "kohli", name: "Virat Kohli", color: "#004ba0", init: "VK", time: "Tue", wiki: "Virat_Kohli",
    msgs: [
      ["them", "bhai Hampta Pass with that fitness? respect 🙌"],
      ["me", "EBC next, then you and me run a marathon"],
      ["them", "pakka. but no chole bhature on the trek"],
    ],
    replies: ["fitness first 💪", "chase your goals like a 350 target", "RCB fan?"] },
];

/* Claude chat history */
const CLAUDE_CHATS = [
  { title: "RAG: chunking strategies that actually work", when: "Today", turns: [
    ["u", "for a RAG pipeline over long technical PDFs, what chunk size should I use? fixed 512 tokens isn't working well"],
    ["a", `<p>Fixed-size chunks break mid-thought, which hurts retrieval more than the size itself. A few things that usually help, roughly in order of payoff:</p>
<ul><li><b>Structure-aware splitting</b> — split on headings/sections first, then fall back to paragraphs, then sentences. Keep each chunk self-contained.</li>
<li><b>Size by content type</b> — ~200–400 tokens for dense reference text, ~500–800 for narrative explanations.</li>
<li><b>Overlap 10–15%</b> so definitions that straddle a boundary appear in both chunks.</li>
<li><b>Prepend context</b> — add the document title and section path to every chunk before embedding (“Paper › 3.2 Loss function › …”). This alone often lifts recall noticeably.</li>
<li><b>Small-to-big retrieval</b> — embed small chunks for precise matching, but pass the parent section to the LLM.</li></ul>
<p>Measure it: build 30–50 question/answer pairs from your PDFs and compare recall@5 across strategies before tuning anything else.</p>`],
  ]},
  { title: "Hybrid search: BM25 + dense embeddings", when: "Today", turns: [
    ["u", "is hybrid search worth it or is pure vector search enough?"],
    ["a", `<p>For most real corpora, hybrid is worth it. Dense embeddings are great at paraphrase but weak on exact tokens — error codes, function names, CVE IDs, product SKUs. BM25 is the opposite.</p>
<p>A simple, robust way to combine them is <b>Reciprocal Rank Fusion</b>:</p>
<pre>score(d) = Σ 1 / (k + rank_i(d))   # k ≈ 60</pre>
<p>It needs no score normalization, which is why it holds up well. Then add a cross-encoder reranker on the top ~30 if latency allows — that's usually the biggest single quality jump after hybrid.</p>`],
  ]},
  { title: "Evaluating RAG — faithfulness vs relevance", when: "Yesterday", turns: [
    ["u", "how do I evaluate my RAG system properly"],
    ["a", `<p>Evaluate retrieval and generation separately, otherwise you can't tell which half failed.</p>
<ul><li><b>Retrieval:</b> recall@k and MRR against a labelled set of (question → relevant chunk ids).</li>
<li><b>Faithfulness:</b> is every claim in the answer supported by the retrieved context? Check claim-by-claim with an LLM judge.</li>
<li><b>Answer relevance:</b> does it actually answer the question asked?</li>
<li><b>Context precision:</b> how much of what you retrieved was useful — noisy context drags faithfulness down.</li></ul>
<p>Keep a small human-checked set to calibrate the LLM judge; judges drift and over-reward long answers.</p>`],
  ]},
  { title: "FAISS index choice for AI Bouncer", when: "Previous 7 Days", turns: [
    ["u", "I have ~200k known jailbreak prompts embedded. which FAISS index for low latency?"],
    ["a", `<p>At 200k vectors you have options. <code>IndexFlatIP</code> (exact, on normalized vectors) is still only a few ms per query on CPU and gives you perfect recall — start there.</p>
<p>If you need lower latency or expect growth, <code>IndexHNSWFlat</code> with M=32, efSearch≈64 gets you sub-millisecond queries with recall in the high 90s. IVF-PQ only becomes worth it at millions of vectors or when memory is tight.</p>`],
  ]},
  { title: "DeBERTa-v3 for prompt-injection classification", when: "Previous 7 Days", turns: [
    ["u", "fine-tuning deberta-v3-base for injection detection, my false positive rate is high on normal coding questions"],
    ["a", `<p>Classic sign the negatives in your training set are too easy. Add hard negatives: benign prompts that <i>look</i> adversarial — “ignore the previous error and retry”, system-prompt questions from developers, roleplay requests that are harmless.</p>
<p>Then tune the decision threshold on a validation set for the FPR you can tolerate rather than using 0.5, and since your cascade already has an XGBoost pre-filter, let DeBERTa only see what passes it.</p>`],
  ]},
  { title: "NSL-KDD class imbalance", when: "Previous 30 Days", turns: [
    ["u", "U2R and R2L classes are tiny in NSL-KDD, my DNN ignores them"],
    ["a", `<p>Use class weights in the loss first (cheapest), then try SMOTE on the training split only — never before splitting. Report macro-F1 and per-class recall rather than accuracy; accuracy will look great while U2R recall is near zero.</p>`],
  ]},
  { title: "EBC trek: budget + acclimatization plan", when: "Older", turns: [
    ["u", "planning everest base camp next year, how many days and rough budget from delhi"],
    ["a", `<p>Plan for 12–14 days on the trail from Lukla, with acclimatization days at Namche Bazaar and Dingboche — the “climb high, sleep low” rule matters more than fitness.</p>
<p>Budget depends heavily on whether you hire a guide/porter and how you fly into Lukla, so get two or three current quotes from Kathmandu operators. Don't skip travel insurance that covers helicopter evacuation above 5,000 m.</p>`],
  ]},
];

/* Fallback open-source list (used when GitHub's API is unreachable or rate-limited). */
const PR_FALLBACK = [
  { title: "feat(integration): assemble detective track, wire live call, and polish UX", url: "https://github.com/7gtz/ScamCity/pull/21", repo: "7gtz/ScamCity", state: "merged" },
  { title: "fix: reuse marchUtils' canonical single-letter order in exportUtils", url: "https://github.com/riscv/riscv-isa-explorer/pull/468", repo: "riscv/riscv-isa-explorer", state: "open" },
  { title: "Add model comparison experiment and README", url: "https://github.com/ruxailab/eye-tracker-api/pull/105", repo: "ruxailab/eye-tracker-api", state: "open" },
  { title: "fix(simple): fail closed when zero verification checks are executed", url: "https://github.com/AOSSIE-Org/OpenVerifiableLLM/pull/207", repo: "AOSSIE-Org/OpenVerifiableLLM", state: "open" },
  { title: "feat(frontend): add static evidence explorer and model release interface", url: "https://github.com/AOSSIE-Org/OpenVerifiableLLM/pull/178", repo: "AOSSIE-Org/OpenVerifiableLLM", state: "open" },
  { title: "[FEATURE,TEST] Benchmark ModifiedSincSmoother against Savitzky-Golay on chromatograms", url: "https://github.com/OpenMS/OpenMS/pull/10426", repo: "OpenMS/OpenMS", state: "closed" },
  { title: "fix(security): restrict permissions and handle errors for cache directory in Allocate()", url: "https://github.com/Project-HAMi/HAMi/pull/3122", repo: "Project-HAMi/HAMi", state: "closed" },
  { title: "Fix broken links, outdated translation paths, and discrepancies across documentation", url: "https://github.com/ohcnetwork/care_fe/pull/16833", repo: "ohcnetwork/care_fe", state: "open" },
];

/* LinkedIn profile, copied from your profile screenshots (24 Oct 2026).
   LinkedIn has no public API, so update this by hand when your profile changes. */
const LINKEDIN = {
  url: "https://www.linkedin.com/in/aditya-sagar-1b35b2323/",
  banner: "assets/li/banner.png",
  avatar: "assets/li/avatar.png",
  name: "Aditya Sagar",
  headline: "EX - AI/ML Intern @DomAiyn Labs | Research Intern @DRDO | MERN stack | Machine Learning | DSA | C++ | Python | 1x Ideathon Win | CSE @MSIT'28",
  location: "Greater Delhi Area",
  connections: "500+",
  followers: "1,813",
  topOrgs: [
    { name: "DRDO, Ministry of Defence, Govt. of India", logo: "assets/li/drdo.png" },
    { name: "Maharaja Surajmal Institute Of Technology", logo: "assets/li/msit.png" },
  ],
  featured: [
    { type: "Link", img: "assets/li/feat-github.png", title: "GitHub - AdityasagarR123", sub: "GitHub", text: "My GITHUB Profile.", href: "https://github.com/AdityasagarR123" },
    { type: "Link", img: "assets/li/feat-portfolio.png", title: "Aditya Sagar — ADI's …", sub: "https://adi-portfolio-puce.vercel.app", href: "https://adi-portfolio-puce.vercel.app" },
    { type: "Reshared by Aditya Sagar", text: "IT WAS NICE HAVING YOU IN MY TEAM Congratulations TO US 🙌🏽🫶🏽", img: "assets/li/feat-ctrlaltidea.png", reacts: "assets/li/react-like.png", count: "34", comments: "6 comments" },
    { type: "Post", text: "🦁 Brave Custom Tab — Because Brave Deserved Better...", img: "assets/li/feat-brave.png", reacts: "assets/li/react-3.png", count: "85", comments: "19 comments" },
  ],
  posts: [
    { when: "Aug 23", text: "Super excited to have shipped Hacker News Virality Forensics with <a>Jiya Jain</a> for the ScrapeVerse hackathon by <a>WeMakeDevs</a>.",
      reshare: { name: "Jiya Jain", avatar: "assets/li/jiya.png", headline: "Machine Learning Engineer | LinkedIn CoachIn '26 Hackathon Winner | ex-…", when: "Aug 23 • Edited",
        text: "Shipped something for the Into the Scrape-Verse hackathon by <a>WeMakeDevs</a> with <a>Aditya Sagar</a> this week.", img: "assets/li/post-jiya.png" },
      reacts: "assets/li/react-3.png", count: "11", comments: "2 comments" },
    { when: "Jul 31", text: "Wrapped up my two internships this summer!<br><br>- At <a>DomAiynLabs</a>, I worked as an AI/ML Intern & Evaluation…",
      imgs: ["assets/li/post-intern-1.png", "assets/li/post-intern-2.png"], reacts: "assets/li/react-celebrate.png", count: "86", comments: "24 comments" },
  ],
  experience: [
    { title: "Research Intern", org: "DRDO, Ministry of Defence, Govt. of India · Internship", logo: "assets/li/drdo.png", when: "Jun 2026 - Present · 5 mos", where: "On-site",
      text: "- Developed an AI-Based Cyber Threat Detection Framework integrating Network Intrusion Detection and Malware Classification using supervised machine learning techniques." },
    { title: "AI/ML Intern", org: "DomAIyn Labs · Internship", logo: "assets/li/domaiyn.png", when: "Apr 2026 - Jul 2026 · 4 mos", where: "County Dublin, Ireland · Remote",
      text: "-Developed and curated datasets for AI Blue Teaming and safety evaluations.", media: { img: "assets/li/media-domaiyn.png", name: "1000253977.jpg" } },
    { title: "Web Developer", org: "Geek Room · Apprenticeship", logo: "assets/li/geekroom.png", when: "Oct 2024 - Dec 2025 · 1 yr 3 mos", where: "Delhi, India",
      media: { img: "assets/li/media-geekroom.png", name: "1000200259.png" } },
  ],
  education: [
    { school: "Maharaja Surajmal Institute Of Technology", logo: "assets/li/msit.png", degree: "B.Tech, Computer Science and Engineering", when: "Aug 2024 - Sep 2028" },
  ],
  licenses: [
    { name: "Inclusive Open Source Community Orientation (LFC102)", org: "The Linux Foundation", logo: "assets/li/linuxfoundation.png", issued: "Issued Aug 2026", id: "Credential ID uh5vrwpto8", skills: "Machine Learning" },
    { name: "Advanced Learning Algorithms", org: "DeepLearning.AI", logo: "assets/li/deeplearning.png", issued: "Issued Aug 2026", id: "Credential ID OX8MGJS866GP", skills: "Decision Trees, Neural Networks and +2 skills" },
    { name: "Supervised Machine Learning: Regression and Classification", org: "DeepLearning.AI", logo: "assets/li/deeplearning.png", issued: "Issued Jul 2026" },
  ],
  licenseCount: 7,
};
