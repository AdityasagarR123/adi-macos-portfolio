/* =========================================================
   macOS-style portfolio — window manager + apps
   ========================================================= */

const $ = (sel, root = document) => root.querySelector(sel);
const h = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const isPhone = () => matchMedia("(max-width: 760px)").matches;
const ago = (iso) => {
  const s = (Date.now() - new Date(iso)) / 1000;
  if (s < 60) return "just now";
  if (s < 3600) return Math.floor(s / 60) + "m ago";
  if (s < 86400) return Math.floor(s / 3600) + "h ago";
  if (s < 86400 * 30) return Math.floor(s / 86400) + "d ago";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

/* ---------------- icons ---------------- */
const SVG = {
  notes: `<svg viewBox="0 0 64 64"><rect x="8" y="6" width="48" height="52" rx="6" fill="#fff"/><rect x="8" y="6" width="48" height="14" rx="6" fill="#f7c948"/><rect x="8" y="14" width="48" height="6" fill="#f7c948"/><g stroke="#cfcfcf" stroke-width="2"><path d="M14 30h36M14 38h36M14 46h28"/></g></svg>`,
  claude: `<svg viewBox="0 0 24 24" style="width:64%;height:64%"><path fill="#fff" d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"/></svg>`,
  x: `<svg viewBox="0 0 24 24" style="width:50%;height:50%"><path fill="#fff" d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" style="width:56%;height:56%;margin:2px 0 0 2px"><path fill="#fff" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>`,
  github: `<svg viewBox="0 0 24 24"><path fill="#fff" d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/></svg>`,
  terminal: `<svg viewBox="0 0 64 64"><path d="M14 20l12 10-12 10" stroke="#5be37f" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 44h18" stroke="#fff" stroke-width="5" stroke-linecap="round"/></svg>`,
  messages: `<svg viewBox="0 0 64 64"><path fill="#fff" d="M32 10C17 10 6 19.6 6 31.5c0 6.6 3.4 12.4 8.8 16.4-.4 3.2-2 6.2-4.8 8.6 5.4-.2 9.6-2.2 12.6-4.8 2.9.8 6.1 1.3 9.4 1.3 15 0 26-9.6 26-21.5S47 10 32 10z"/></svg>`,
  photos: `<svg viewBox="0 0 64 64">${["#f9a12e", "#f6d04d", "#9bd05e", "#35c5b5", "#4a90e2", "#8e6bd8", "#e05ab0", "#f05a4f"].map((c, i) => `<ellipse cx="32" cy="18" rx="8" ry="13" fill="${c}" opacity=".9" transform="rotate(${i * 45} 32 32)" style="mix-blend-mode:multiply"/>`).join("")}</svg>`,
  music: `<svg viewBox="0 0 24 24"><path fill="#fff" d="M9 18.5a3 3 0 1 1-2-2.83V5.6l12-2.6v12.5a3 3 0 1 1-2-2.83V7.4l-8 1.75V18.5z"/></svg>`,
  preview: `<svg viewBox="0 0 64 64"><rect x="14" y="8" width="36" height="48" rx="3" fill="#fff"/><path d="M20 18h24M20 25h24M20 32h18M20 39h22M20 46h14" stroke="#9aa6b2" stroke-width="2.6" stroke-linecap="round"/><circle cx="44" cy="44" r="9" fill="none" stroke="#2f7cf6" stroke-width="4"/><path d="M50.5 50.5l6 6" stroke="#2f7cf6" stroke-width="5" stroke-linecap="round"/></svg>`,
  finder: `<svg viewBox="0 0 64 64"><rect width="64" height="64" fill="#e9eef5"/><path d="M30 0h34v64H24c4-10 6-20 6-32S32 8 30 0z" fill="#2f8cf6"/><path d="M0 0h32c-3 9-4 20-4 32s2 22 6 32H0z" fill="#9fd0ff"/><circle cx="18" cy="24" r="2.8" fill="#123"/><circle cx="44" cy="24" r="2.8" fill="#123"/><path d="M16 42c10 7 22 7 32 0" stroke="#123" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`,
  settings: `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="22" fill="#8e8e93"/><g fill="#5a5a5e" transform="translate(32 32)">${Array.from({ length: 12 }, (_, i) => `<rect x="-3" y="-26" width="6" height="8" rx="1.5" transform="rotate(${i * 30})"/>`).join("")}</g><circle cx="32" cy="32" r="14" fill="#d1d1d6"/><circle cx="32" cy="32" r="6" fill="#636366"/></svg>`,
  trash: `<svg viewBox="0 0 64 64"><path d="M16 18h32l-3 38H19z" fill="rgba(255,255,255,.75)"/><rect x="12" y="12" width="40" height="6" rx="2" fill="rgba(255,255,255,.9)"/><path d="M24 24v26M32 24v26M40 24v26" stroke="rgba(0,0,0,.25)" stroke-width="2"/></svg>`,
};
const ICON_BG = {
  notes: "linear-gradient(#fdfdfd,#e8e8e8)", claude: "radial-gradient(circle at 30% 20%,#e89070,#d97757 55%,#c4623f)", x: "radial-gradient(circle at 30% 15%,#2a2a2a,#000 70%)", linkedin: "linear-gradient(160deg,#1a7ad6,#0a66c2 55%,#0856a6)",
  github: "#24292f", terminal: "#1b1b1d", messages: "linear-gradient(#5df273,#18c33a)", photos: "#fff",
  music: "linear-gradient(#fb5c74,#fa233b)", preview: "linear-gradient(#f4f6f9,#d6dde6)", finder: "#e9eef5",
  settings: "linear-gradient(#bfbfc4,#8e8e93)", trash: "rgba(255,255,255,.15)",
};
const icon = (id) => `<div class="ico" style="background:${ICON_BG[id]}">${SVG[id]}</div>`;

/* ---------------- GitHub (live, cached 10 min per visitor) ---------------- */
async function gh(path) {
  const key = "gh:" + path;
  try {
    const hit = JSON.parse(localStorage.getItem(key) || "null");
    if (hit && Date.now() - hit.t < 10 * 60 * 1000) return hit.d;
  } catch {}
  const r = await fetch("https://api.github.com" + path, { headers: { Accept: "application/vnd.github+json" } });
  if (!r.ok) throw new Error("GitHub " + r.status);
  const d = await r.json();
  try { localStorage.setItem(key, JSON.stringify({ t: Date.now(), d })); } catch {}
  return d;
}
const GH = {
  user: () => gh(`/users/${PROFILE.github}`),
  prs: () => gh(`/search/issues?q=author:${PROFILE.github}+type:pr+-user:${PROFILE.github}&sort=updated&order=desc&per_page=30`),
  events: () => gh(`/users/${PROFILE.github}/events/public?per_page=40`).then((ev) => ev.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))),
};
const prState = (it) => it.pull_request && it.pull_request.merged_at ? "merged" : it.state;
const repoOf = (url) => url.replace("https://api.github.com/repos/", "").replace("https://github.com/", "").split("/").slice(0, 2).join("/");

function describeEvent(e) {
  const repo = `<a href="https://github.com/${e.repo.name}" target="_blank" rel="noopener">${esc(e.repo.name)}</a>`;
  const p = e.payload || {};
  switch (e.type) {
    case "PushEvent": {
      const n = p.size ?? (p.commits || []).length ?? 1;
      const msg = p.commits && p.commits.length ? ` — “${esc(p.commits[p.commits.length - 1].message.split("\n")[0].slice(0, 80))}”` : "";
      return `pushed ${n || ""} commit${n === 1 ? "" : "s"} to ${repo}${msg}`;
    }
    case "PullRequestEvent": return `${p.action} PR <a href="${p.pull_request.html_url}" target="_blank" rel="noopener">#${p.number}</a> in ${repo}${p.pull_request.title ? ` — “${esc(p.pull_request.title.slice(0, 80))}”` : ""}`;
    case "IssuesEvent": return `${p.action} issue <a href="${p.issue.html_url}" target="_blank" rel="noopener">#${p.issue.number}</a> in ${repo}`;
    case "IssueCommentEvent": return `commented on <a href="${p.issue.html_url}" target="_blank" rel="noopener">#${p.issue.number}</a> in ${repo}`;
    case "PullRequestReviewEvent": return `reviewed a PR in ${repo}`;
    case "PullRequestReviewCommentEvent": return `left review comments in ${repo}`;
    case "CreateEvent": return `created ${p.ref_type}${p.ref ? " " + esc(p.ref) : ""} in ${repo}`;
    case "DeleteEvent": return `deleted ${p.ref_type} ${esc(p.ref || "")} in ${repo}`;
    case "ForkEvent": return `forked ${repo}`;
    case "WatchEvent": return `starred ${repo}`;
    case "PublicEvent": return `made ${repo} public`;
    default: return `${e.type.replace("Event", "").toLowerCase()} in ${repo}`;
  }
}

/* ---------------- window manager ---------------- */
let zTop = 10;
const wins = {};          // appId -> element
const desktop = $("#desktop");

function openApp(id, arg) {
  const app = APPS[id];
  if (!app) return;
  if (app.link) { window.open(app.link, "_blank", "noopener"); return; }
  let w = wins[id];
  if (w) {
    w.classList.remove("min", "closing");
    w.style.display = "";
    focusWin(w);
    if (app.onArg && arg !== undefined) app.onArg(w, arg);
    return w;
  }
  const n = Object.keys(wins).length;
  const vw = desktop.clientWidth, vh = desktop.clientHeight;
  const [dw, dh] = app.size || [820, 560];
  // keepClear: leave the desktop icons (Resume.pdf etc.) in the top-right corner uncovered
  const W = Math.min(dw, vw - (app.keepClear ? 150 : 40)), H = Math.min(dh, vh - 120);
  w = h(`<section class="window ${app.cls || ""}" data-app="${id}" role="dialog" aria-label="${app.name}">
      <div class="titlebar">
        <div class="lights"><span class="l-close" title="Close"></span><span class="l-min" title="Minimize"></span><span class="l-max" title="Zoom"></span></div>
        <div class="title">${app.title || ""}</div>
        <div class="tb-right"></div>
      </div>
      <div class="win-body"></div>
      ${["n", "s", "e", "w", "ne", "nw", "se", "sw"].map((d) => `<div class="resizer rz-${d}" data-dir="${d}"></div>`).join("")}
    </section>`);
  const pos = app.pos ? app.pos(vw, vh, W, H) : [Math.max(10, (vw - W) / 2 + (n % 5) * 26 - 60), Math.max(8, (vh - H) / 2 - 40 + (n % 5) * 22)];
  pos[1] = Math.max(8, Math.min(pos[1], vh - 100 - H));
  Object.assign(w.style, { left: pos[0] + "px", top: pos[1] + "px", width: W + "px", height: H + "px" });
  desktop.appendChild(w);
  wins[id] = w;
  app.render(w, $(".win-body", w), arg);
  wireWindow(w, id);
  focusWin(w);
  dockState();
  return w;
}

function closeApp(id) {
  const w = wins[id];
  if (!w) return;
  w.classList.add("closing");
  setTimeout(() => { w.remove(); delete wins[id]; dockState(); focusTopmost(); if (APPS[id].onClose) APPS[id].onClose(); }, 150);
}

function focusWin(w) {
  document.querySelectorAll(".window").forEach((x) => x.classList.add("inactive"));
  w.classList.remove("inactive");
  w.style.zIndex = ++zTop;
  $("#mb-app").textContent = APPS[w.dataset.app].name;
}
function focusTopmost() {
  const vis = [...document.querySelectorAll(".window")].filter((x) => x.style.display !== "none" && !x.classList.contains("min"));
  vis.sort((a, b) => b.style.zIndex - a.style.zIndex);
  // on phones only one app is shown at a time, so bring back the last one used
  if (!vis[0] && isPhone()) {
    const prev = [...document.querySelectorAll(".window:not(.closing)")].sort((a, b) => b.style.zIndex - a.style.zIndex)[0];
    if (prev) { prev.classList.remove("min"); prev.style.display = ""; vis.push(prev); }
  }
  if (vis[0]) focusWin(vis[0]); else $("#mb-app").textContent = "Finder";
}

function wireWindow(w, id) {
  w.addEventListener("pointerdown", () => focusWin(w));
  $(".l-close", w).onclick = (e) => { e.stopPropagation(); closeApp(id); };
  $(".l-min", w).onclick = (e) => {
    e.stopPropagation();
    w.classList.add("min");
    setTimeout(() => { w.style.display = "none"; focusTopmost(); }, 280);
  };
  $(".l-max", w).onclick = (e) => { e.stopPropagation(); w.classList.toggle("maxed"); };
  const bar = $(".titlebar", w);
  bar.addEventListener("dblclick", (e) => { if (!e.target.closest(".lights")) w.classList.toggle("maxed"); });

  // drag
  bar.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".lights, button, a, input") || isPhone() || w.classList.contains("maxed")) return;
    const sx = e.clientX, sy = e.clientY, ox = w.offsetLeft, oy = w.offsetTop;
    bar.setPointerCapture(e.pointerId);
    document.body.classList.add("resizing");
    const move = (ev) => {
      w.style.left = Math.min(desktop.clientWidth - 80, Math.max(-w.offsetWidth + 120, ox + ev.clientX - sx)) + "px";
      w.style.top = Math.min(desktop.clientHeight - 60, Math.max(0, oy + ev.clientY - sy)) + "px";
    };
    const up = () => { bar.removeEventListener("pointermove", move); bar.removeEventListener("pointerup", up); document.body.classList.remove("resizing"); };
    bar.addEventListener("pointermove", move);
    bar.addEventListener("pointerup", up);
  });

  // resize from any edge or corner
  const MIN_W = 360, MIN_H = 260;
  w.querySelectorAll(".resizer").forEach((rz) => rz.addEventListener("pointerdown", (e) => {
    if (isPhone()) return;
    e.stopPropagation(); e.preventDefault();
    if (w.classList.contains("maxed")) {
      const r = w.getBoundingClientRect(), d = desktop.getBoundingClientRect();
      Object.assign(w.style, { left: r.left - d.left + "px", top: r.top - d.top + "px", width: r.width + "px", height: r.height + "px" });
      w.classList.remove("maxed");
    }
    const dir = rz.dataset.dir;
    const sx = e.clientX, sy = e.clientY, ox = w.offsetLeft, oy = w.offsetTop, ow = w.offsetWidth, oh = w.offsetHeight;
    rz.setPointerCapture(e.pointerId);
    document.body.classList.add("resizing");
    document.body.style.cursor = getComputedStyle(rz).cursor;
    const move = (ev) => {
      const dx = ev.clientX - sx, dy = ev.clientY - sy;
      if (dir.includes("e")) w.style.width = Math.max(MIN_W, ow + dx) + "px";
      if (dir.includes("s")) w.style.height = Math.max(MIN_H, oh + dy) + "px";
      if (dir.includes("w")) { const nw = Math.max(MIN_W, ow - dx); w.style.width = nw + "px"; w.style.left = ox + ow - nw + "px"; }
      if (dir.includes("n")) { const nh = Math.max(MIN_H, Math.min(oh - dy, oy + oh)); w.style.height = nh + "px"; w.style.top = oy + oh - nh + "px"; }
    };
    const up = () => {
      rz.removeEventListener("pointermove", move); rz.removeEventListener("pointerup", up);
      document.body.classList.remove("resizing"); document.body.style.cursor = "";
    };
    rz.addEventListener("pointermove", move);
    rz.addEventListener("pointerup", up);
  }));
}

/* sidebar apps on phones: list view ⇄ detail view */
const showDetail = (body, on) => body.classList.toggle("detail", on);

/* ---------------- lightbox ---------------- */
function lightbox(src, cap = "", video = false) {
  const lb = h(`<div class="lightbox"><div>${video ? `<video src="${src}" controls autoplay playsinline></video>` : `<img src="${src}" alt="">`}<p>${esc(cap)}</p></div></div>`);
  lb.onclick = (e) => { if (e.target.tagName !== "VIDEO") lb.remove(); };
  document.addEventListener("keydown", function k(e) { if (e.key === "Escape") { lb.remove(); document.removeEventListener("keydown", k); } });
  document.body.appendChild(lb);
}

/* =========================================================
   NOTES
   ========================================================= */
const NOTES = [
  {
    id: "about-me", group: "Pinned", emoji: "👋", title: "About Me", date: "7/1/26",
    preview: "Hey, I'm Aditya — a 5th-semester CSE student at MSIT…",
    html: () => `
      <img class="banner" src="assets/wallpaper.jpg" alt="Aditya sitting on a rock above the Kangra valley">
      <p>Hey, I'm Aditya — a 5th-semester Computer Science Engineering student at <b>Maharaja Surajmal Institute of Technology (MSIT)</b>, passionate about Artificial Intelligence, Machine Learning, and building impactful software.</p>
      <p>I enjoy exploring challenging problems, turning ideas into working products, and experimenting with emerging technologies. My work spans AI/ML research, LLM security, cyber threat detection, and full-stack development. Beyond personal projects, I actively contribute to open-source initiatives and participate in technical communities to learn, collaborate, and build better solutions.</p>
      <p>I'm always curious, always building, and constantly pushing myself to grow as an engineer and researcher — one project at a time.</p>`,
  },
  {
    id: "experience", group: "Today", emoji: "💼", title: "Experience", date: "10/24/26",
    preview: "DomAIyn Labs · DRDO · Geek Room",
    html: () => `
      <p class="muted">First-year Adi would not believe this summer. Two internships at once — one side was “build a working system,” the other was “figure out what we're even trying to measure.”</p>
      ${EXPERIENCE.map((x) => `<div class="card"><h3>${x.org}<span class="muted" style="font-weight:500;font-size:12.5px">${x.when}</span></h3>
        <div class="meta">${x.role}</div><ul>${x.points.map((p) => `<li>${p}</li>`).join("")}</ul></div>`).join("")}`,
  },
  {
    id: "projects", group: "Today", emoji: "🛠️", title: "Projects", date: "10/24/26",
    preview: "AI Bouncer, Sentra, TrustProof, Brave Custom Tab…",
    html: () => PROJECTS.map((p) => `<div class="card">
        <h3>${p.name}<span>${p.live ? `<a href="${p.live}" target="_blank" rel="noopener">live ↗</a> &nbsp;` : ""}<a href="https://github.com/${PROFILE.github}/${p.repo}" target="_blank" rel="noopener">code ↗</a></span></h3>
        <div class="chips">${p.stack.map((s) => `<span class="chip">${s}</span>`).join("")}</div>
        <ul>${p.points.map((x) => `<li>${x}</li>`).join("")}</ul></div>`).join("") +
      `<p class="muted">More on <a href="https://github.com/${PROFILE.github}?tab=repositories" target="_blank" rel="noopener">GitHub</a>.</p>`,
  },
  {
    id: "open-source", group: "Today", emoji: "🌱", title: "Open Source", date: "live",
    preview: "Live from GitHub — PRs, commits, activity",
    html: () => `
      <p><span class="live">Live from GitHub</span> <span class="muted" style="font-size:12px">· Refreshes every 10 minutes</span></p>
      <div class="stats" id="os-stats">${["PRs to other repos", "merged", "orgs", "public repos"].map((l) => `<div class="stat"><b>…</b><span>${l}</span></div>`).join("")}</div>
      <div class="contrib" id="os-contrib"><span class="muted" style="font-size:12.5px">Loading contributions…</span></div>
      <h2>Pull Requests</h2>
      <p class="muted">Contributions to AOSSIE, RISC-V, OpenMS, Project HAMi, Open Healthcare Network (CARE), RUXAILAB and ScamCity.</p>
      <div id="os-prs"><p class="muted">Loading…</p></div>
      <h2>Recent Activity</h2>
      <div id="os-events"><p class="muted">Loading…</p></div>`,
    after: loadOpenSource,
  },
  {
    id: "achievements", group: "Previous 7 Days", emoji: "🏆", title: "Hackathons & Wins", date: "10/20/26",
    preview: "Ctrl+Alt+Idea 2nd · HackHatch top 100 · brAInwave 2.0",
    html: () => `<div class="timeline">${ACHIEVEMENTS.map((a, i) => `<div class="stop">
        <div class="meta">stop 0${i + 1} / ${ACHIEVEMENTS.length} · ${a.when} · ${a.where}</div>
        <h3 style="margin-top:0">${a.title}</h3><p>${a.text}</p>
        <img class="cert" src="${a.img}" alt="${a.title} certificate" data-cap="${esc(a.title)}"></div>`).join("")}</div>
      <h2>Certifications</h2><ul>${CERTIFICATIONS.map((c) => `<li>${c}</li>`).join("")}</ul>`,
    after: (el) => el.querySelectorAll(".cert").forEach((img) => (img.onclick = () => lightbox(img.src, img.dataset.cap))),
  },
  {
    id: "tech-stack", group: "Previous 7 Days", emoji: "🧰", title: "Tech Stack", date: "10/19/26",
    preview: "C++, Python, JS · React, Node · TensorFlow…",
    html: () => SKILLS.map(([g, items], i) => `<h3>0${i + 1} · ${g}</h3><div class="chips">${items.map((s) => `<span class="chip">${s}</span>`).join("")}</div>`).join(""),
  },
  {
    id: "treks", group: "Previous 30 Days", emoji: "🏔️", title: "Trek Checklist", date: "9/28/26",
    preview: "2 done, 2 to go — EBC and ABC next",
    html: () => `
      <p>Mountains I have walked up, and the ones still waiting.</p>
      ${TREKS.map((t, i) => `<label class="check"><input type="checkbox" data-i="${i}" ${t.done ? "checked" : ""}><span>${t.name}</span><small>${t.note}</small></label>`).join("")}
      <p class="muted" style="margin-top:14px;font-size:12.5px">${TREKS.filter((t) => t.done).length} / ${TREKS.length} done</p>
      <div class="ph-grid" style="margin-top:16px">${PHOTOS.filter((p) => p.album === "Treks").map((p) => `<figure data-src="${p.src}" data-cap="${esc(p.cap)}"><img src="${p.src}" alt="${esc(p.cap)}" loading="lazy"><figcaption>${p.cap}</figcaption></figure>`).join("")}</div>`,
    after: (el) => el.querySelectorAll("figure").forEach((f) => (f.onclick = () => lightbox(f.dataset.src, f.dataset.cap))),
  },
  {
    id: "resume", group: "Older", emoji: "📄", title: "Resume", date: "7/3/26",
    preview: "The one-page version",
    html: () => `<p>The one-page version. <a href="${PROFILE.resume}" target="_blank" rel="noopener">Open in a new tab ↗</a> · <a href="${PROFILE.resume}" download>Download</a></p>
      <iframe src="${PROFILE.resume}#view=FitH" title="Resume" style="width:100%;height:78vh;border:1px solid var(--line);border-radius:10px;background:#fff"></iframe>`,
  },
  {
    id: "hit-me-up", group: "Older", emoji: "💬", title: "Hit Me Up", date: "7/1/26",
    preview: "Email, GitHub, X, LinkedIn",
    html: () => `
      <p>Open to internships, research collabs, open-source mentoring, and trek buddies.</p>
      <ul>
        <li>Email — <a href="mailto:${PROFILE.email}">${PROFILE.email}</a></li>
        <li>GitHub — <a href="https://github.com/${PROFILE.github}" target="_blank" rel="noopener">@${PROFILE.github}</a></li>
        <li>X — <a href="https://x.com/${PROFILE.x}" target="_blank" rel="noopener">@${PROFILE.x}</a></li>
        <li>LinkedIn — <a href="${PROFILE.linkedin}" target="_blank" rel="noopener">Aditya Sagar</a></li>
      </ul>`,
  },
];

function loadOpenSource(el) {
  // contribution heatmap (last 12 months)
  fetch(`https://github-contributions-api.jogruber.de/v4/${PROFILE.github}?y=last`).then((r) => r.json()).then((d) => {
    const days = d.contributions;
    const pad = new Date(days[0].date).getDay();
    const cells = Array(pad).fill(null).concat(days);
    const shades = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
    const weeks = [];
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
    $("#os-contrib", el).innerHTML = `<div class="meta" style="margin:0 0 8px">${d.total.lastYear} contributions in the last year</div>
      <div style="display:flex;gap:3px">${weeks.map((wk) => `<div style="display:flex;flex-direction:column;gap:3px">${wk.map((c) => c ? `<i title="${c.count} on ${c.date}" style="width:10px;height:10px;border-radius:2px;background:${shades[c.level]}"></i>` : `<i style="width:10px;height:10px"></i>`).join("")}</div>`).join("")}</div>`;
  }).catch(() => { $("#os-contrib", el).innerHTML = `<a href="https://github.com/${PROFILE.github}" target="_blank" rel="noopener">see contributions on GitHub ↗</a>`; });

  GH.user().then((u) => {
    const s = el.querySelectorAll("#os-stats .stat b");
    if (s[3]) s[3].textContent = u.public_repos;
  }).catch(() => {});

  GH.prs().then((d) => {
    const items = d.items || [];
    const merged = items.filter((i) => prState(i) === "merged").length;
    const orgs = new Set(items.map((i) => repoOf(i.repository_url).split("/")[0]));
    const s = el.querySelectorAll("#os-stats .stat b");
    s[0].textContent = d.total_count; s[1].textContent = merged; s[2].textContent = orgs.size;
    $("#os-prs", el).innerHTML = items.map((i) => prRow(i.title, i.html_url, repoOf(i.repository_url), prState(i), i.updated_at)).join("");
  }).catch(() => {
    const s = el.querySelectorAll("#os-stats .stat b");
    s[0].textContent = PR_FALLBACK.length + "+"; s[1].textContent = PR_FALLBACK.filter((p) => p.state === "merged").length + "+"; s[2].textContent = new Set(PR_FALLBACK.map((p) => p.repo.split("/")[0])).size;
    $("#os-prs", el).innerHTML = PR_FALLBACK.map((p) => prRow(p.title, p.url, p.repo, p.state)).join("") + `<p class="muted" style="font-size:12px">GitHub is rate-limiting right now — showing a saved list.</p>`;
  });

  GH.events().then((evs) => {
    $("#os-events", el).innerHTML = evs.slice(0, 15).map((e) => `<div class="pr"><span class="muted" style="flex:0 0 70px;font-size:12px">${ago(e.created_at)}</span><span>${describeEvent(e)}</span></div>`).join("") || `<p class="muted">Quiet week.</p>`;
  }).catch(() => { $("#os-events", el).innerHTML = `<p class="muted">Couldn't reach GitHub — <a href="https://github.com/${PROFILE.github}" target="_blank" rel="noopener">see it there</a>.</p>`; });
}
const prRow = (title, url, repo, state, updated) => `<div class="pr"><span class="st ${state}">${state}</span><div><a href="${url}" target="_blank" rel="noopener">${esc(title)}</a><div class="repo">${esc(repo)}${updated ? " · " + ago(updated) : ""}</div></div></div>`;

function renderNotes(w, body, noteId) {
  body.classList.add("has-side");
  $(".tb-right", w).innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e2b33c" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>`;
  body.innerHTML = `
    <aside class="side">
      <label class="search">⌕ <input placeholder="Search" aria-label="Search notes"></label>
      <div class="scroll list" style="flex:1"></div>
    </aside>
    <div class="note-pane scroll"></div>`;
  const list = $(".list", body), pane = $(".note-pane", body), q = $(".search input", body);
  let current = noteId || "about-me";

  const drawList = () => {
    const term = q.value.trim().toLowerCase();
    let html = "", last = "";
    NOTES.filter((n) => !term || (n.title + n.preview).toLowerCase().includes(term)).forEach((n) => {
      if (n.group !== last) { html += `<div class="group-h">${n.group}</div>`; last = n.group; }
      html += `<button class="row ${n.id === current ? "active" : ""}" data-id="${n.id}"><div class="r-title">${n.emoji} ${n.title}</div><div class="r-sub"><b>${n.date}</b>${n.preview}</div></button>`;
    });
    list.innerHTML = html || `<p class="muted" style="padding:16px">No notes match.</p>`;
  };
  const open = (id, fromUser) => {
    const n = NOTES.find((x) => x.id === id) || NOTES[0];
    current = n.id;
    pane.innerHTML = `<article class="note"><button class="back">‹ Notes</button><div class="stamp">${n.date === "live" ? new Date().toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }) : n.date}</div><h1>${n.emoji} ${n.title}</h1>${n.html()}</article>`;
    pane.scrollTop = 0;
    $(".back", pane).onclick = () => showDetail(body, false);
    if (n.after) n.after(pane);
    drawList();
    $("title").textContent = `${n.title} — Aditya Sagar`;
    if (fromUser) { history.replaceState(null, "", "#notes/" + n.id); showDetail(body, true); }
  };
  list.onclick = (e) => { const b = e.target.closest(".row"); if (b) open(b.dataset.id, true); };
  q.oninput = drawList;
  open(current);
  if (noteId) showDetail(body, true);
  w._open = open;
}

/* =========================================================
   MESSAGES
   ========================================================= */
function renderMessages(w, body) {
  body.classList.add("has-side");
  $(".tb-right", w).innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9a9a9a" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>`;
  body.innerHTML = `
    <aside class="side"><label class="search">⌕ <input placeholder="Search" aria-label="Search conversations"></label><div class="scroll list" style="flex:1"></div></aside>
    <div class="msgs"><div class="msgs-head"></div><div class="thread scroll"></div>
      <form class="compose"><input placeholder="iMessage" aria-label="Message"></form></div>`;
  const list = $(".list", body), head = $(".msgs-head", body), thread = $(".thread", body), form = $(".compose", body), input = $("input", form);
  let cur = CHATS[0];
  const av = (c) => `<div class="avatar" style="background:${c.color}">${c.pic ? `<img src="${c.pic}" alt="" referrerpolicy="no-referrer" onerror="this.remove()">` : ""}${c.init}</div>`;
  // profile photos: Wikipedia's page image for each person (cached per visitor)
  CHATS.forEach((c) => {
    if (c.pic) return;
    if (c.img) { c.pic = c.img; return; }
    if (!c.wiki) return;
    let hit = null;
    try { hit = localStorage.getItem("wiki:" + c.wiki); } catch {}
    if (hit) { c.pic = hit; return; }
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${c.wiki}`).then((r) => r.json()).then((d) => {
      if (!d.thumbnail) return;
      c.pic = d.thumbnail.source;
      try { localStorage.setItem("wiki:" + c.wiki, c.pic); } catch {}
      drawList(); drawThread();
    }).catch(() => {});
  });
  const drawList = () => {
    const term = $(".search input", body).value.toLowerCase();
    list.innerHTML = CHATS.filter((c) => c.name.toLowerCase().includes(term)).map((c) => `<button class="row msg-row ${c === cur ? "active" : ""}" data-id="${c.id}" style="${c === cur ? "background:rgba(10,132,255,.55)" : ""}">${av(c)}<div><div class="r-title" style="display:flex;justify-content:space-between"><span>${c.name}</span><small style="font-weight:400;color:var(--muted)">${c.time}</small></div><div class="r-sub">${esc(c.msgs[c.msgs.length - 1][1])}</div></div></button>`).join("");
  };
  const drawThread = () => {
    head.innerHTML = `<button class="m-back" style="float:left">‹</button><div style="display:flex;flex-direction:column;align-items:center;gap:2px">${av(cur)}<span class="who">${cur.name}</span><span class="parody">Parody · not a real conversation</span></div>`;
    $(".m-back", head).onclick = () => showDetail(body, false);
    thread.innerHTML = `<div class="ts">iMessage · ${cur.time}</div>` + cur.msgs.map(([who, t]) => `<div class="bubble ${who}">${esc(t)}</div>`).join("");
    thread.scrollTop = thread.scrollHeight;
  };
  list.onclick = (e) => { const b = e.target.closest(".row"); if (!b) return; cur = CHATS.find((c) => c.id === b.dataset.id); drawList(); drawThread(); showDetail(body, true); };
  $(".search input", body).oninput = drawList;
  form.onsubmit = (e) => {
    e.preventDefault();
    const t = input.value.trim();
    if (!t) return;
    const chat = cur;
    chat.msgs.push(["me", t]);
    input.value = "";
    drawThread(); drawList();
    const typing = h(`<div class="bubble them"><span class="typing"><i></i><i></i><i></i></span></div>`);
    setTimeout(() => { if (chat === cur) { thread.appendChild(typing); thread.scrollTop = thread.scrollHeight; } }, 400);
    setTimeout(() => {
      typing.remove();
      chat.msgs.push(["them", chat.replies[Math.floor(Math.random() * chat.replies.length)]]);
      if (chat === cur) drawThread();
      drawList();
    }, 1600 + Math.random() * 900);
  };
  drawList(); drawThread();
}

/* =========================================================
   CLAUDE
   ========================================================= */
function renderClaude(w, body) {
  body.classList.add("has-side");
  body.innerHTML = `
    <aside class="side"><button class="new-chat"><span style="width:22px;height:22px;border-radius:50%;background:#d97757;display:grid;place-items:center">+</span> New chat</button>
      <div class="group-h" style="padding-left:16px">Recents</div><div class="scroll list" style="flex:1"></div></aside>
    <div class="claude-main"><div class="claude-thread scroll"><div class="inner"></div></div>
      <div class="claude-input"><span>Reply to Claude…</span><span class="send">↑</span></div></div>`;
  const list = $(".list", body), inner = $(".inner", body);
  let cur = 0;
  const draw = () => {
    list.innerHTML = CLAUDE_CHATS.map((c, i) => `<button class="row ${i === cur ? "active" : ""}" data-i="${i}" style="border:0"><div class="r-title" style="font-weight:500">${esc(c.title)}</div><div class="r-sub">${c.when}</div></button>`).join("");
    const c = CLAUDE_CHATS[cur];
    inner.innerHTML = `<button class="m-back" style="margin-bottom:10px">‹ Chats</button><h2 style="font-size:16px;margin:0 0 18px;color:#e8e6e3;font-weight:600">${esc(c.title)}</h2>` +
      c.turns.map(([who, t]) => (who === "u" ? `<div class="c-user">${esc(t)}</div>` : `<div class="c-ai">${t}</div>`)).join("");
    $(".m-back", inner).onclick = () => showDetail(body, false);
    $(".claude-thread", body).scrollTop = 0;
  };
  list.onclick = (e) => { const b = e.target.closest(".row"); if (!b) return; cur = +b.dataset.i; draw(); showDetail(body, true); };
  draw();
}

/* =========================================================
   X
   ========================================================= */
// X's own icon paths (24×24)
const XI = {
  back: "M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z",
  search: "M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z",
  link: "M18.36 5.64c-1.95-1.96-5.11-1.96-7.07 0L9.88 7.05 8.46 5.64l1.42-1.42c2.73-2.73 7.16-2.73 9.9 0 2.73 2.74 2.73 7.17 0 9.9l-1.42 1.42-1.41-1.42 1.41-1.41c1.96-1.96 1.96-5.12 0-7.07zm-2.12 3.53l-7.07 7.07-1.41-1.41 7.07-7.07 1.41 1.41zm-12.02.71l1.42-1.42 1.41 1.42-1.41 1.41c-1.96 1.96-1.96 5.12 0 7.07 1.95 1.96 5.11 1.96 7.07 0l1.41-1.41 1.42 1.41-1.42 1.42c-2.73 2.73-7.16 2.73-9.9 0-2.73-2.74-2.73-7.17 0-9.9z",
  calendar: "M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2z",
  more: "M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z",
  reply: "M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z",
  repost: "M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z",
  like: "M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z",
  views: "M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z",
  share: "M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z",
};
const xi = (k, size = 18.75) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true"><path fill="currentColor" d="${XI[k]}"/></svg>`;

function renderX(w, body) {
  const link = (t) => t.replace(/@(\w+)/g, '<a href="https://x.com/$1" target="_blank" rel="noopener">@$1</a>');
  // static copy of a post, used only if X's embed script is blocked (e.g. by an ad blocker)
  const tweet = (t) => `<article class="tweet"><img class="pic" src="${PROFILE.xAvatar}" alt="" referrerpolicy="no-referrer">
      <div class="body"><div class="hd"><b>${PROFILE.short}</b> <span class="x-muted">@${PROFILE.x} · ${t.time}</span></div>
      <div class="txt">${link(t.text)}</div>
      ${t.card ? `<a class="link-card" href="${t.card.url}" target="_blank" rel="noopener"><div class="lc-img">SENTRA</div><div><div class="lc-d">${t.card.domain}</div><div class="lc-t">${t.card.title}</div></div></a>` : ""}
      <div class="acts"><span>${xi("reply")}</span><span>${xi("repost")}</span><span>${xi("like")}</span><span>${xi("views")}${t.views ? " " + t.views : ""}</span><span>${xi("share")}</span></div></div></article>`;
  body.innerHTML = `<div class="social xapp scroll"><div class="col">
      <div class="x-bar">
        <a class="x-ic" href="https://x.com/${PROFILE.x}" target="_blank" rel="noopener" aria-label="Open on X">${xi("back", 20)}</a>
        <div><div class="x-bar-name">${PROFILE.short}</div><div class="x-muted" style="font-size:13px">${PROFILE.xPosts} posts</div></div>
        <span class="x-ic" style="margin-left:auto">${xi("search", 20)}</span>
      </div>
      <div class="x-cover" style="background-image:url('${PROFILE.xBanner}')"></div>
      <div class="x-prof">
        <div class="top"><img class="pic" src="${PROFILE.xAvatar}" alt="${PROFILE.short}" referrerpolicy="no-referrer">
          <div class="x-actions"><span class="x-circle">${xi("more", 20)}</span><a class="x-btn" href="https://x.com/intent/follow?screen_name=${PROFILE.x}" target="_blank" rel="noopener">Follow</a></div></div>
        <div class="name">${PROFILE.short}</div><div class="handle">@${PROFILE.x}</div>
        <div class="bio">${link(esc(PROFILE.xBio)).replace(/\n/g, "<br>")}</div>
        <div class="x-meta"><span>${xi("link")}<a href="https://adi-portfolio-puce.vercel.app" target="_blank" rel="noopener">adi-portfolio-puce.vercel.app</a></span><span>${xi("calendar")}${PROFILE.xJoined}</span></div>
        <div class="follow"><a href="https://x.com/${PROFILE.x}/following" target="_blank" rel="noopener"><b>${PROFILE.xFollowing}</b> <span class="x-muted">Following</span></a><a href="https://x.com/${PROFILE.x}/verified_followers" target="_blank" rel="noopener"><b>${PROFILE.xFollowers}</b> <span class="x-muted">Followers</span></a></div>
      </div>
      <nav class="x-tabs"><span class="on"><i>Posts</i></span><span><i>Replies</i></span><span><i>Highlights</i></span><span><i>Media</i></span></nav>
      <div class="x-feed">${X_POST_IDS.map((id) => `<div class="x-embed"><blockquote class="twitter-tweet" data-theme="dark" data-dnt="true" data-conversation="none"><a href="https://twitter.com/${PROFILE.x}/status/${id}"></a></blockquote></div>`).join("")}</div>
      <div style="padding:20px;text-align:center"><a class="x-btn" style="display:inline-block" href="https://x.com/${PROFILE.x}" target="_blank" rel="noopener">See all posts on X</a></div>
    </div></div>`;
  const feed = $(".x-feed", body);
  const fallback = () => { feed.innerHTML = [...X_LATEST, ...X_THREAD].map(tweet).join(""); };
  const load = () => window.twttr.widgets.load(feed);
  if (window.twttr && window.twttr.widgets) load();
  else {
    const s = document.createElement("script");
    s.src = "https://platform.twitter.com/widgets.js"; s.async = true; s.charset = "utf-8";
    s.onload = () => window.twttr && window.twttr.ready(load);
    s.onerror = fallback;
    document.head.appendChild(s);
  }
  // if nothing rendered after a while, show the saved copies instead
  setTimeout(() => { if (!feed.querySelector("iframe[id^='twitter-widget']")) fallback(); }, 9000);
}

/* =========================================================
   LINKEDIN
   ========================================================= */
// LinkedIn's own icon shapes (24×24 unless noted)
const LI = {
  home: "M23 9v2h-2v7a3 3 0 01-3 3h-4v-6h-4v6H6a3 3 0 01-3-3v-7H1V9l11-7 5 3.18V2h3v5.09z",
  network: "M12 16v6H3v-6a3 3 0 013-3h3a3 3 0 013 3zm5.5-3A3.5 3.5 0 1014 9.5a3.5 3.5 0 003.5 3.5zm1 2h-2a2.5 2.5 0 00-2.5 2.5V22h7v-4.5a2.5 2.5 0 00-2.5-2.5zM7.5 2A4.5 4.5 0 1012 6.5 4.49 4.49 0 007.5 2z",
  jobs: "M17 6V5a3 3 0 00-3-3h-4a3 3 0 00-3 3v1H2v4a3 3 0 003 3h14a3 3 0 003-3V6zM9 5a1 1 0 011-1h4a1 1 0 011 1v1H9zm10 9a4 4 0 003-1.38V17a3 3 0 01-3 3H5a3 3 0 01-3-3v-4.38A4 4 0 005 14z",
  messaging: "M16 4H8a7 7 0 000 14h4v4l8.16-5.39A6.78 6.78 0 0023 11a7 7 0 00-7-7zm-8 8.25A1.25 1.25 0 119.25 11 1.25 1.25 0 018 12.25zm4 0A1.25 1.25 0 1113.25 11 1.25 1.25 0 0112 12.25zm4 0A1.25 1.25 0 1117.25 11 1.25 1.25 0 0116 12.25z",
  bell: "M22 19h-8.28a2 2 0 11-3.44 0H2v-1a4.52 4.52 0 011.17-2.83l1-1.17h15.7l1 1.17A4.42 4.42 0 0122 18zM18.21 7.44A6.27 6.27 0 0012 2a6.27 6.27 0 00-6.21 5.44L5 13h14z",
  search: "M21.41 18.59l-5.27-5.28A6.83 6.83 0 0017 10a7 7 0 10-7 7 6.83 6.83 0 003.31-.86l5.28 5.27a2 2 0 002.82-2.82zM5 10a5 5 0 115 5 5 5 0 01-5-5z",
  grid: "M3 3h4v4H3zm7 4h4V3h-4zm7-4v4h4V3zM3 14h4v-4H3zm7 0h4v-4h-4zm7 0h4v-4h-4zM3 21h4v-4H3zm7 0h4v-4h-4zm7 0h4v-4h-4z",
  verified: "M12 1.5l8.5 3.2v6.1c0 5.4-3.6 10.2-8.5 11.7-4.9-1.5-8.5-6.3-8.5-11.7V4.7zm0 2.1L5.5 6.1v4.7c0 4.3 2.7 8.1 6.5 9.5 3.8-1.4 6.5-5.2 6.5-9.5V6.1zm-1.1 11.7l-3.6-3.6 1.4-1.4 2.2 2.2 4.9-4.9 1.4 1.4z",
  globe: "M8 1a7 7 0 107 7 7 7 0 00-7-7zM3 8a5 5 0 011-3l.55.55A1.5 1.5 0 015 6.62v1.07a.75.75 0 00.22.53l.56.56a.75.75 0 00.53.22H7v.69a.75.75 0 00.22.53l.56.56a.75.75 0 01.22.53V13a5 5 0 01-5-5zm6.24 4.83l2-2.46a.75.75 0 00.09-.8l-.58-1.16A.76.76 0 0010 8H7v-.19a.51.51 0 01.28-.45l.38-.19a.74.74 0 01.68 0L9 7.5l.38-.7a1 1 0 00.12-.48v-.85a.78.78 0 01.21-.53l1.07-1.09a5 5 0 01-1.54 9z",
  like: "M19.46 11l-3.91-3.91a7 7 0 01-1.69-2.74l-.49-1.47A2.76 2.76 0 0010.76 1 2.75 2.75 0 008 3.74v1.12a9.19 9.19 0 00.46 2.85L8.89 9H4.12A2.12 2.12 0 002 11.12a2.16 2.16 0 00.92 1.76A2.11 2.11 0 002 14.62a2.14 2.14 0 001.28 2 2 2 0 00-.28 1 2.12 2.12 0 002 2.12v.14A2.12 2.12 0 007.12 22h7.49a8.08 8.08 0 003.58-.84l.31-.16H21V11zM19 19h-1l-.73.37a6.14 6.14 0 01-2.69.63H7.72a1 1 0 01-1-.72l-.25-.87-.85-.41A1 1 0 015 17l.17-1-.76-.74A1 1 0 014.27 14l.66-1.09-.73-1.1a.49.49 0 01.08-.7.48.48 0 01.34-.11h7.05l-1.31-3.92A7 7 0 0110 4.86V3.75a.77.77 0 01.75-.75.75.75 0 01.71.51L12 5a9 9 0 002.13 3.5l4.5 4.5H19z",
  comment: "M7 9h10v1H7zm0 4h7v-1H7zm16-2a6.78 6.78 0 01-2.84 5.61L12 22v-4H8A7 7 0 018 4h8a7 7 0 017 7zm-2 0a5 5 0 00-5-5H8a5 5 0 000 10h6v2.28L19 15a4.79 4.79 0 002-4z",
  repost: "M13.96 5H6c-.55 0-1 .45-1 1v10H3V6c0-1.66 1.34-3 3-3h7.96L12 0h2.37L17 4l-2.63 4H12l1.96-3zm5.04 3v10c0 .55-.45 1-1 1h-7.96L12 16H9.63L7 20l2.63 4H12l-1.96-3H18c1.66 0 3-1.34 3-3V8h-2z",
  send: "M21 3L0 10l7.66 4.26L16 8l-6.26 8.34L14 24l7-21z",
  more: "M14 12a2 2 0 11-2-2 2 2 0 012 2zM4 10a2 2 0 102 2 2 2 0 00-2-2zm16 0a2 2 0 102 2 2 2 0 00-2-2z",
  external: "M15 1v2h4.59l-8.3 8.29 1.42 1.42L21 4.41V9h2V1zm4 20H3V5h8V3H3a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2v-8h-2z",
  diamond: "M18.5 3h-13L1 9l11 12L23 9zM6.5 5h3.2L8.3 8H3.9zm5.5 0l1.6 3h-3.2zm0 12.2L7.3 10h9.4zM15.7 8l-1.4-3h3.2l2.6 3z",
  arrow: "M11.45 3L15 8l-3.55 5H9l2.84-4H2V7h9.84L9 3z",
};
const li = (k, size = 24, vb = 24) => `<svg viewBox="0 0 ${vb} ${vb}" width="${size}" height="${size}" aria-hidden="true"><path fill="currentColor" d="${LI[k]}"/></svg>`;

function renderLinkedIn(w, body) {
  const L = LINKEDIN, P = L.url;
  const mention = (t) => t.replace(/<a>/g, `<a class="li-mention" href="${P}" target="_blank" rel="noopener">`);
  const reacts = (x) => `<div class="li-reacts"><img src="${x.reacts}" alt=""><span>${x.count}</span><span>·</span><span>${x.comments}</span></div>`;
  const postHead = (name, avatar, headline, when) => `<div class="li-ph"><img src="${avatar}" alt=""><div><b>${name} <span class="li-vf">${li("verified", 16)}</span></b><span class="li-1l">${headline}</span><span>${when} • ${li("globe", 14, 16)}</span></div></div>`;
  const section = (title, inner, footer) => `<section class="li-card li-sec"><h2>${title}</h2>${inner}${footer ? `<a class="li-foot" href="${P}${footer[1]}" target="_blank" rel="noopener">${footer[0]} ${li("arrow", 16, 16)}</a>` : ""}</section>`;
  const NAV = [["home", "Home"], ["network", "My Network"], ["jobs", "Jobs"], ["messaging", "Messaging"], ["bell", "Notifications"]];

  body.innerHTML = `<div class="li2 scroll">
    <header class="li-nav"><div class="li-nav-in">
      <a class="li-logo" href="https://www.linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn">${SVG.linkedin}</a>
      <label class="li-search">${li("search", 16)}<input placeholder="Search" aria-label="Search"></label>
      <nav>${NAV.map(([k, t]) => `<a href="https://www.linkedin.com" target="_blank" rel="noopener">${li(k)}<span>${t}</span></a>`).join("")}
        <a href="${P}" target="_blank" rel="noopener"><img class="li-me" src="${L.avatar}" alt=""><span>Me ▾</span></a>
        <a class="li-biz" href="https://www.linkedin.com" target="_blank" rel="noopener">${li("grid")}<span>For Business ▾</span></a></nav>
    </div></header>
    <main class="li-main">
      <section class="li-card li-top">
        <div class="li-banner"><img src="${L.banner}" alt=""><img class="li-av" src="${L.avatar}" alt="${L.name}"></div>
        <div class="li-top-body">
          <div class="li-top-l">
            <h1>${L.name} <span class="li-vf">${li("verified", 24)}</span></h1>
            <p class="li-head">${L.headline}</p>
            <p class="li-loc">${L.location} <span>·</span> <a href="mailto:${PROFILE.email}">Contact info</a></p>
            <a class="li-conn" href="${P}" target="_blank" rel="noopener">${L.connections} connections</a>
            <div class="li-btns2">
              <a class="li-b primary" href="${P}" target="_blank" rel="noopener">Connect</a>
              <a class="li-b" href="${P}" target="_blank" rel="noopener">Message</a>
              <a class="li-b round" href="${P}" target="_blank" rel="noopener" aria-label="More">${li("more", 20)}</a>
            </div>
          </div>
          <ul class="li-orgs">${L.topOrgs.map((o) => `<li><img src="${o.logo}" alt=""><span>${o.name}</span></li>`).join("")}</ul>
        </div>
      </section>

      ${section("Featured", `<div class="li-hscroll">${L.featured.map((f) => `<a class="li-feat" href="${f.href || P}" target="_blank" rel="noopener"><div class="li-feat-type">${f.type}</div>${f.title
        ? `<img src="${f.img}" alt=""><div class="li-feat-b"><b>${f.title}</b><small>${f.sub}</small>${f.text ? `<p>${f.text}</p>` : ""}</div>`
        : `<div class="li-feat-b"><p class="li-feat-text">${f.text}</p></div><img class="li-feat-post" src="${f.img}" alt="">${reacts(f)}`}</a>`).join("")}</div>`)}

      <section class="li-card li-sec">
        <div class="li-act-h"><div><h2>Activity</h2><a class="li-conn" href="${P}recent-activity/all/" target="_blank" rel="noopener">${L.followers} followers</a></div><a class="li-b blue" href="${P}" target="_blank" rel="noopener">+ Follow</a></div>
        <div class="li-pills"><span class="on">Posts</span><span>Comments</span><span>Images</span></div>
        <div class="li-hscroll">${L.posts.map((p) => `<article class="li-post">${postHead(L.name, L.avatar, L.headline, p.when)}
          <p class="li-ptext">${mention(p.text)} <a class="li-more" href="${P}recent-activity/all/" target="_blank" rel="noopener">…more</a></p>
          ${p.reshare ? `<div class="li-reshare">${postHead(p.reshare.name, p.reshare.avatar, p.reshare.headline, p.reshare.when)}<p class="li-ptext">${mention(p.reshare.text)} <span class="li-more">…more</span></p><img src="${p.reshare.img}" alt=""></div>` : ""}
          ${p.imgs ? `<div class="li-carousel">${p.imgs.map((s) => `<img src="${s}" alt="">`).join("")}<span class="li-count">1/3</span></div>` : ""}
          <div class="li-pfoot">${reacts(p)}</div>
          <div class="li-pacts"><span>${li("like", 18)} Like</span><span>${li("comment", 18)} Comment</span><span>${li("repost", 18)} Repost</span><span>${li("send", 18)} Send</span></div></article>`).join("")}</div>
        <a class="li-foot" href="${P}recent-activity/all/" target="_blank" rel="noopener">Show all posts ${li("arrow", 16, 16)}</a>
      </section>

      ${section("Experience", L.experience.map((x) => `<div class="li-item"><img class="li-logo2" src="${x.logo}" alt=""><div><b>${x.title}</b><span>${x.org}</span><span class="muted2">${x.when}</span><span class="muted2">${x.where}</span>
        ${x.text ? `<p>${x.text} <a class="li-more" href="${P}details/experience/" target="_blank" rel="noopener">…more</a></p>` : ""}
        ${x.media ? `<div class="li-media"><img src="${x.media.img}" alt=""><b>${x.media.name}</b></div>` : ""}</div></div>`).join(""))}

      ${section("Education", L.education.map((e) => `<div class="li-item"><img class="li-logo2" src="${e.logo}" alt=""><div><b>${e.school}</b><span>${e.degree}</span><span class="muted2">${e.when}</span></div></div>`).join(""))}

      ${section(`Licenses &amp; certifications (${L.licenseCount})`, L.licenses.map((c) => `<div class="li-item"><img class="li-logo2" src="${c.logo}" alt=""><div><b>${c.name}</b><span>${c.org}</span><span class="muted2">${c.issued}</span>${c.id ? `<span class="muted2">${c.id}</span>` : ""}
        <a class="li-b li-cred" href="${P}details/certifications/" target="_blank" rel="noopener">Show credential ${li("external", 14)}</a>${c.skills ? `<span class="li-skill">${li("diamond", 16)} ${c.skills}</span>` : ""}</div></div>`).join(""),
        [`Show all ${L.licenseCount} licenses`, "details/certifications/"])}
    </main>
  </div>`;
}

/* =========================================================
   TERMINAL (live GitHub)
   ========================================================= */
function renderTerminal(w, body) {
  body.innerHTML = `<div class="term scroll"><div class="out"></div><div class="term-in"><span class="p">adi@macbook</span>&nbsp;<span class="p2">~</span>&nbsp;%<input aria-label="Terminal input" autocomplete="off" spellcheck="false"></div></div>`;
  const term = $(".term", body), out = $(".out", body), input = $("input", body);
  const hist = []; let hi = 0;
  const print = (html, cls = "") => { out.insertAdjacentHTML("beforeend", `<div class="ln ${cls}">${html}</div>`); term.scrollTop = term.scrollHeight; };
  const link = (u, t) => `<a href="${u}" target="_blank" rel="noopener">${esc(t || u)}</a>`;
  const CMDS = {
    help: () => print(`<span class="c-y">commands</span>
  whoami        who is this
  gh            live GitHub summary
  prs           my open-source pull requests (live)
  activity      what I've been pushing lately (live)
  projects      things I've built
  socials       where to find me
  resume        open my resume
  open &lt;app&gt;    notes · x · linkedin · music · photos · messages · claude
  neofetch      flex
  clear         clear the screen`),
    whoami: () => print(`aditya sagar — cse @ msit (5th sem). full-stack + ml, ai safety, open source, trekking.`),
    neofetch: () => print(`<span class="c-g">        .:'</span>      <span class="c-g">adi</span>@<span class="c-g">macbook</span>
<span class="c-g">    __ :'__</span>       ----------------
<span class="c-y"> .'\`  \`-'  \`\`.</span>    <span class="c-y">OS</span>: adiOS 26 (Himalaya)
<span class="c-r">:          .-'</span>    <span class="c-y">Host</span>: MSIT, New Delhi
<span class="c-r">:         :</span>       <span class="c-y">Uptime</span>: 5 semesters
<span class="c-m"> :         \`-;</span>    <span class="c-y">Shell</span>: python, c++, js
<span class="c-b">  \`.__.-.__.'</span>     <span class="c-y">Packages</span>: react, fastapi, tensorflow, faiss
                  <span class="c-y">Treks</span>: 2/4 (EBC, ABC pending)`),
    socials: () => print(`github    ${link("https://github.com/" + PROFILE.github)}
x         ${link("https://x.com/" + PROFILE.x)}
linkedin  ${link(PROFILE.linkedin)}
email     ${link("mailto:" + PROFILE.email, PROFILE.email)}`),
    resume: () => { print("opening resume in Preview…", "c-d"); openApp("preview"); },
    projects: () => PROJECTS.forEach((p) => print(`<span class="c-y">${p.name}</span>  <span class="c-d">${p.stack.join(", ")}</span>\n  ${p.live ? link(p.live) : link(`https://github.com/${PROFILE.github}/${p.repo}`)}`)),
    open: (a) => { const map = { notes: "notes", x: "x", twitter: "x", linkedin: "linkedin", music: "music", spotify: "music", photos: "photos", messages: "messages", claude: "claude", resume: "preview", finder: "finder", github: "github" }; if (map[a]) { openApp(map[a]); print(`opened ${a}`, "c-d"); } else print(`open: no such app: ${esc(a || "")}`, "c-r"); },
    clear: () => (out.innerHTML = ""),
    gh: async () => {
      print("fetching github.com/" + PROFILE.github + " …", "c-d");
      try {
        const [u, prs] = await Promise.all([GH.user(), GH.prs()]);
        const merged = prs.items.filter((i) => prState(i) === "merged").length;
        print(`<span class="c-g">●</span> ${link(u.html_url, u.login)}
  repos      ${u.public_repos}
  followers  ${u.followers} · following ${u.following}
  PRs out    ${prs.total_count} (${merged} merged in the latest ${prs.items.length})
  since      ${new Date(u.created_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}`);
      } catch (e) { print("github is rate-limiting this IP — try again in a bit.", "c-r"); }
    },
    prs: async () => {
      print("gh search prs --author " + PROFILE.github + " …", "c-d");
      try {
        const d = await GH.prs();
        d.items.slice(0, 15).forEach((i) => { const s = prState(i); print(`<span class="${s === "merged" ? "c-m" : s === "open" ? "c-g" : "c-r"}">${s.padEnd(6)}</span> ${link(i.html_url, repoOf(i.repository_url) + "#" + i.number)}  ${esc(i.title.slice(0, 70))}`); });
      } catch { PR_FALLBACK.forEach((p) => print(`<span class="c-m">${p.state.padEnd(6)}</span> ${link(p.url, p.repo)}  ${esc(p.title.slice(0, 70))}`)); }
    },
    activity: async () => {
      print("gh api users/" + PROFILE.github + "/events …", "c-d");
      try { (await GH.events()).slice(0, 12).forEach((e) => print(`<span class="c-d">${ago(e.created_at).padEnd(9)}</span> ${describeEvent(e)}`)); }
      catch { print("couldn't reach github right now.", "c-r"); }
    },
    sudo: (a) => print(a && a.startsWith("hire") ? `<span class="c-g">✓ permission granted.</span> email: ${link("mailto:" + PROFILE.email, PROFILE.email)}` : "nice try.", a && a.startsWith("hire") ? "" : "c-r"),
    ls: () => print(`about-me.md  experience.md  projects/  open-source/  treks.md  resume.pdf`),
    cat: (a) => { const n = NOTES.find((x) => a && a.replace(".md", "") === x.id); if (n) { openApp("notes", n.id); print("opened in Notes", "c-d"); } else print(`cat: ${esc(a || "")}: No such file`, "c-r"); },
  };
  const run = (line) => {
    print(`<span class="p">adi@macbook</span> <span class="p2">~</span> % ${esc(line)}`);
    const [cmd, ...rest] = line.trim().split(/\s+/);
    if (!cmd) return;
    (CMDS[cmd.toLowerCase()] || (() => print(`zsh: command not found: ${esc(cmd)} — try <span class="c-y">help</span>`, "c-r")))(rest.join(" "));
  };
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { const v = input.value; input.value = ""; if (v.trim()) hist.push(v); hi = hist.length; run(v); }
    else if (e.key === "ArrowUp") { if (hi > 0) input.value = hist[--hi]; e.preventDefault(); }
    else if (e.key === "ArrowDown") { input.value = hi < hist.length - 1 ? hist[++hi] : ((hi = hist.length), ""); }
    else if (e.key === "l" && e.ctrlKey) { e.preventDefault(); out.innerHTML = ""; }
  });
  term.onclick = () => { if (!getSelection().toString()) input.focus(); };
  print(`Last login: ${new Date().toDateString()} on ttys001`, "c-d");
  print(`welcome to adi's terminal. type <span class="c-y">help</span>, or try <span class="c-y">gh</span>, <span class="c-y">prs</span>, <span class="c-y">activity</span>.`);
  run("gh");
  setTimeout(() => input.focus({ preventScroll: true }), 50);
}

/* =========================================================
   PHOTOS / MUSIC / PREVIEW / FINDER / SETTINGS / TRASH
   ========================================================= */
function renderPhotos(w, body) {
  const albums = ["All Photos", ...new Set(PHOTOS.map((p) => p.album))];
  body.innerHTML = `<aside class="side" style="padding-top:8px">${albums.map((a, i) => `<button class="f-side ${i ? "" : "on"}" data-a="${a}" style="width:calc(100% - 16px);text-align:left">${a === "All Photos" ? "🖼️" : a === "Treks" ? "🏔️" : a === "Wins" ? "🏆" : "🙂"} ${a}</button>`).join("")}</aside>
    <div class="photos-main scroll"><div class="ph-h">All Photos</div><div class="ph-grid"></div></div>`;
  const grid = $(".ph-grid", body);
  const draw = (album) => {
    $(".ph-h", body).textContent = album;
    grid.innerHTML = PHOTOS.filter((p) => album === "All Photos" || p.album === album).map((p) => `<figure data-src="${p.src}" data-cap="${esc(p.cap)}" ${p.video ? "data-video" : ""}>${p.video
      ? `<video src="${p.src}#t=1" poster="${p.poster || ""}" muted playsinline preload="metadata"></video><span class="play">▶</span>`
      : `<img src="${p.src}" alt="${esc(p.cap)}" loading="lazy">`}<figcaption>${esc(p.cap)}</figcaption></figure>`).join("");
  };
  body.querySelector("aside").onclick = (e) => { const b = e.target.closest("[data-a]"); if (!b) return; body.querySelectorAll(".f-side").forEach((x) => x.classList.toggle("on", x === b)); draw(b.dataset.a); };
  grid.onclick = (e) => { const f = e.target.closest("figure"); if (f) lightbox(f.dataset.src, f.dataset.cap, f.hasAttribute("data-video")); };
  draw("All Photos");
}

function renderMusic(w, body) {
  body.innerHTML = `<div class="music scroll" style="display:flex;flex-direction:column">
    <div class="now"><div class="art">${SVG.music}</div><div><small>Playlist</small><h2>Adis fridge</h2><div class="muted" style="font-size:13px">what i'm listening to · hit play — streams from Spotify</div></div></div>
    <iframe src="https://open.spotify.com/embed/playlist/${PROFILE.spotifyPlaylist}?utm_source=generator&theme=0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="Spotify playlist"></iframe>
  </div>`;
}

function renderPreview(w, body) {
  body.innerHTML = `<div class="preview"><div class="bar">Aditya_Sagar_Resume.pdf — 1 page<a href="${PROFILE.resume}" download>Download</a></div>
    <iframe src="${PROFILE.resume}#view=FitH&toolbar=0" title="Resume"></iframe></div>`;
}

function renderFinder(w, body) {
  const items = [
    ...PROJECTS.map((p) => ({ name: p.name.split(" — ")[0], href: p.live || `https://github.com/${PROFILE.github}/${p.repo}`, ico: "📁", bg: "#3b82f6" })),
    { name: "Aditya_Sagar_Resume.pdf", app: "preview", ico: "📄", bg: "#e5e7eb" },
    { name: "open-source", note: "open-source", ico: "🌱", bg: "#16a34a" },
    { name: "treks", note: "treks", ico: "🏔️", bg: "#0ea5e9" },
  ];
  body.innerHTML = `<aside class="side"><div class="group-h">Favorites</div><div class="f-side on">📁 Projects</div><div class="f-side">🏠 adi</div><div class="f-side">⬇️ Downloads</div><div class="group-h">Tags</div><div class="f-side">🔴 shipped</div><div class="f-side">🟡 in progress</div></aside>
    <div class="finder-main scroll"><div class="ph-h" style="font-size:16px">Projects</div><div class="f-grid">${items.map((it, i) => `<a class="f-item" data-i="${i}" ${it.href ? `href="${it.href}" target="_blank" rel="noopener"` : `href="#"`}><span class="fi" style="background:${it.bg}">${it.ico}</span>${esc(it.name)}</a>`).join("")}</div></div>`;
  $(".f-grid", body).onclick = (e) => {
    const a = e.target.closest(".f-item"); if (!a) return;
    const it = items[+a.dataset.i];
    if (it.app) { e.preventDefault(); openApp(it.app); }
    if (it.note) { e.preventDefault(); openApp("notes", it.note); }
  };
}

function renderSettings(w, body) {
  const walls = PHOTOS.filter((p) => p.album === "Treks" && !p.video).map((p) => p.src);
  const cur = localStorage.getItem("wallpaper") || walls[0];
  body.innerHTML = `<div class="settings-main scroll"><div class="ph-h" style="font-size:18px">Wallpaper</div>
    <div class="set-card"><div class="walls">${walls.map((s) => `<button data-s="${s}" class="${s === cur ? "on" : ""}" style="background-image:url('${s}')" aria-label="Use this wallpaper"></button>`).join("")}</div></div>
    <div class="ph-h" style="font-size:18px">About this Mac</div>
    <div class="set-card" style="line-height:1.8">
      <b>adiOS 26 Himalaya</b><br><span class="muted">Chip:</span> caffeine + curiosity<br><span class="muted">Memory:</span> every trek, uncompressed<br><span class="muted">Built with:</span> plain HTML, CSS and JavaScript — no frameworks</div></div>`;
  $(".walls", body).onclick = (e) => {
    const b = e.target.closest("button"); if (!b) return;
    setWall(b.dataset.s);
    body.querySelectorAll(".walls button").forEach((x) => x.classList.toggle("on", x === b));
  };
}
function setWall(src) { $("#wallpaper").style.backgroundImage = `url("${src}")`; try { localStorage.setItem("wallpaper", src); } catch {} }

function renderTrash(w, body) {
  body.innerHTML = `<div class="finder-main scroll"><div class="f-grid">${["resume_final_FINAL_v7.pdf", "todo_learn_rust.txt", "sleep_schedule.ics", "procrastination.app"].map((n) => `<div class="f-item"><span class="fi" style="background:#444">🗑️</span>${n}</div>`).join("")}</div></div>`;
}

/* =========================================================
   GITHUB (live profile built from the GitHub API)
   ========================================================= */
// GitHub octicons (16×16)
const OCT = {
  people: "M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56 3.012.749.749 0 0 1-.885.954.752.752 0 0 1-.549-.514 3.507 3.507 0 0 0-2.522-2.372.75.75 0 0 1-.574-.73v-.352a.75.75 0 0 1 .416-.672A1.5 1.5 0 0 0 11 5.5.75.75 0 0 1 11 4Zm-5.5-.5a2 2 0 1 0-.001 3.999A2 2 0 0 0 5.5 3.5Z",
  mail: "M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2ZM1.5 12.251c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V5.809L8.38 9.397a.75.75 0 0 1-.76 0L1.5 5.809v6.442Zm13-8.181v-.32a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v.32L8 7.88Z",
  repo: "M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z",
};
const oi = (k) => `<svg viewBox="0 0 16 16" width="16" height="16" class="oi" aria-hidden="true"><path fill="currentColor" d="${OCT[k]}"/></svg>`;
const brand = (k) => `<svg viewBox="0 0 24 24" width="16" height="16" class="oi" aria-hidden="true"><path fill="currentColor" d="${(SVG[k].match(/ d="([^"]+)"/) || [])[1]}"/></svg>`;

function renderGitHub(w, body) {
  const login = PROFILE.github;
  body.innerHTML = `<div class="ghp scroll">
    <div class="gh-top"><span class="gh-logo">${SVG.github}</span><b>${login}</b><a class="gh-open" href="https://github.com/${login}" target="_blank" rel="noopener">Open on GitHub ↗</a></div>
    <div class="gh-wrap">
      <aside class="gh-side">
        <img class="gh-av" src="${PROFILE.githubAvatar}" alt="${login}">
        <h2 class="gh-name">${PROFILE.name}</h2><div class="gh-login">${login}</div>
        <a class="gh-follow" href="https://github.com/${login}" target="_blank" rel="noopener">Follow</a>
        <div class="gh-meta" id="gh-meta">…</div>
        <div class="gh-meta">${oi("mail")} <a href="mailto:${PROFILE.email}">${PROFILE.email}</a><br>${brand("x")} <a href="https://x.com/${PROFILE.x}" target="_blank" rel="noopener">@${PROFILE.x}</a><br>${brand("linkedin")} <a href="${PROFILE.linkedin}" target="_blank" rel="noopener">in/aditya-sagar-1b35b2323</a></div>
      </aside>
      <main class="gh-main">
        <div class="gh-tabs"><span class="on">Overview</span><span>Repositories <i id="gh-rc"></i></span><span>Pull requests</span><span class="live" style="margin-left:auto">Live</span></div>
        <h3>Popular repositories</h3><div class="gh-repos" id="gh-repos"><p class="muted">Loading…</p></div>
        <h3 id="gh-ctitle">Contributions</h3><div class="contrib" id="gh-contrib"><span class="muted">Loading…</span></div>
        <h3>Recent activity</h3><div id="gh-events"><p class="muted">Loading…</p></div>
      </main>
    </div></div>`;
  const LANG = { Python: "#3572A5", TypeScript: "#3178c6", JavaScript: "#f1e05a", "C++": "#f34b7d", HTML: "#e34c26", CSS: "#563d7c", "Jupyter Notebook": "#DA5B0B", Solidity: "#AA6746" };
  GH.user().then((u) => {
    $("#gh-meta", body).innerHTML = `${oi("people")} <b>${u.followers}</b> followers · <b>${u.following}</b> following<br>${oi("repo")} ${u.public_repos} public repositories<br>${xi("calendar", 16)} Joined ${new Date(u.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })}`;
    $("#gh-rc", body).textContent = u.public_repos;
  }).catch(() => { $("#gh-meta", body).textContent = ""; });
  gh(`/users/${login}/repos?per_page=100&sort=pushed`).then((repos) => {
    const own = repos.filter((r) => !r.fork && r.name !== login);
    const order = PROJECTS.map((p) => p.repo);
    own.sort((a, b) => ((order.indexOf(a.name) + 1 || 99) - (order.indexOf(b.name) + 1 || 99)) || new Date(b.pushed_at) - new Date(a.pushed_at));
    $("#gh-repos", body).innerHTML = own.slice(0, 6).map((r) => `<a class="gh-repo" href="${r.html_url}" target="_blank" rel="noopener">
      <b>${esc(r.name)}</b> <span class="gh-pub">Public</span>
      <p>${esc((r.description || "").slice(0, 110))}</p>
      <small>${r.language ? `<i style="background:${LANG[r.language] || "#8b949e"}"></i>${r.language}` : ""}${r.stargazers_count ? ` · ★ ${r.stargazers_count}` : ""} · updated ${ago(r.pushed_at)}</small></a>`).join("");
  }).catch(() => { $("#gh-repos", body).innerHTML = `<p class="muted">GitHub is rate-limiting right now — <a href="https://github.com/${login}" target="_blank" rel="noopener">see the repos there</a>.</p>`; });
  fetch(`https://github-contributions-api.jogruber.de/v4/${login}?y=last`).then((r) => r.json()).then((d) => {
    $("#gh-ctitle", body).textContent = `${d.total.lastYear} contributions in the last year`;
    $("#gh-contrib", body).innerHTML = heatmap(d.contributions);
  }).catch(() => { $("#gh-contrib", body).innerHTML = ""; });
  GH.events().then((evs) => {
    $("#gh-events", body).innerHTML = evs.slice(0, 10).map((e) => `<div class="pr"><span class="muted" style="flex:0 0 70px;font-size:12px">${ago(e.created_at)}</span><span>${describeEvent(e)}</span></div>`).join("");
  }).catch(() => { $("#gh-events", body).innerHTML = ""; });
}
function heatmap(days) {
  const cells = Array(new Date(days[0].date).getDay()).fill(null).concat(days);
  const shades = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return `<div style="display:flex;gap:3px">${weeks.map((wk) => `<div style="display:flex;flex-direction:column;gap:3px">${wk.map((c) => c ? `<i title="${c.count} on ${c.date}" style="width:10px;height:10px;border-radius:2px;background:${shades[c.level]}"></i>` : `<i style="width:10px;height:10px"></i>`).join("")}</div>`).join("")}</div>`;
}

/* ---------------- desktop icons ---------------- */
function buildDesktopIcons() {
  const icons = [
    { name: "Resume.pdf", app: "preview", html: `<div class="d-file"><span>PDF</span></div>` },
    { name: "Hampta Pass.mp4", video: "assets/hampta-day1.mp4", html: `<div class="d-thumb" style="background-image:url('assets/trek-hampta-valley.jpg')"><span>▶</span></div>` },
  ];
  const wrap = h(`<div class="desk-icons">${icons.map((ic, i) => `<button class="d-icon" data-i="${i}">${ic.html}<span class="d-label">${ic.name}</span></button>`).join("")}</div>`);
  wrap.addEventListener("click", (e) => {
    const b = e.target.closest(".d-icon"); if (!b) return;
    wrap.querySelectorAll(".d-icon").forEach((x) => x.classList.toggle("sel", x === b));
    // single tap opens on phones, double-click on desktop (like Finder)
    if (isPhone() || e.detail >= 2) {
      const ic = icons[+b.dataset.i];
      if (ic.app) openApp(ic.app); else lightbox(ic.video, "Hampta Pass, day 1", true);
    }
  });
  desktop.appendChild(wrap);
}

/* ---------------- app registry ---------------- */
const APPS = {
  finder:   { name: "Finder", title: "Projects", render: renderFinder, size: [760, 460], cls: "finder" },
  notes:    { name: "Notes", render: renderNotes, size: [1000, 640], keepClear: true, pos: (vw, vh, W, H) => [Math.max(10, Math.min((vw - W) / 2 - 60, vw - 140 - W)), Math.max(8, (vh - H) / 2 - 36)], onArg: (w, id) => { w._open(id, true); } },
  claude:   { name: "Claude", title: "Claude", render: renderClaude, size: [920, 600], cls: "claude" },
  x:        { name: "X", title: "@" + PROFILE.x, render: renderX, size: [640, 640] },
  linkedin: { name: "LinkedIn", title: "linkedin.com/in/aditya-sagar-1b35b2323", render: renderLinkedIn, size: [980, 680] },
  github:   { name: "GitHub", title: "github.com/" + PROFILE.github, render: renderGitHub, size: [980, 660] },
  terminal: { name: "Terminal", title: "adi — zsh", render: renderTerminal, size: [760, 460] },
  messages: { name: "Messages", title: "", render: renderMessages, size: [820, 560] },
  photos:   { name: "Photos", title: "Photos", render: renderPhotos, size: [900, 600], cls: "photos" },
  music:    { name: "Music", title: "Music", render: renderMusic, size: [520, 640] },
  preview:  { name: "Preview", title: "Aditya_Sagar_Resume.pdf", render: renderPreview, size: [700, 720] },
  settings: { name: "System Settings", title: "System Settings", render: renderSettings, size: [640, 520] },
  trash:    { name: "Trash", title: "Trash", render: renderTrash, size: [560, 340] },
};
const DOCK = [
  ["finder", "Finder"], ["notes", "Notes"], ["claude", "Claude"], ["x", "X"], ["linkedin", "LinkedIn"],
  ["github", "GitHub"], ["terminal", "Terminal"], ["messages", "Messages", null, CHATS.length], ["photos", "Photos"], ["music", "Music"],
  ["preview", "Resume"], ["settings", "System Settings"], "|", ["trash", "Trash"],
];

function buildDock() {
  const dock = $("#dock");
  dock.innerHTML = DOCK.map((d) => d === "|" ? `<span class="dock-sep"></span>` :
    `<button class="dock-item" data-app="${d[0]}" aria-label="${d[1]}"><span class="tip">${d[1]}</span>${icon(d[2] || d[0])}${d[3] ? `<span class="badge">${d[3]}</span>` : ""}<span class="dot"></span></button>`).join("");
  dock.onclick = (e) => {
    const b = e.target.closest(".dock-item"); if (!b) return;
    const id = b.dataset.app;
    if (!wins[id]) { b.classList.add("bounce"); setTimeout(() => b.classList.remove("bounce"), 1200); }
    if (id === "messages") { const bd = $(".badge", b); if (bd) bd.remove(); }
    // a second click on the focused window minimizes it, like macOS
    const w = wins[id];
    if (w && w.style.display !== "none" && !w.classList.contains("inactive") && !isPhone()) { $(".l-min", w).click(); return; }
    if (isPhone()) Object.keys(wins).forEach((k) => k !== id && wins[k].style.display !== "none" && (wins[k].style.display = "none"));
    openApp(id);
  };

  // magnification: icons near the pointer grow, falling off with distance
  const BASE = 52, MAX = 88, REACH = 140;
  const items = [...dock.querySelectorAll(".dock-item")];
  const size = (x) => items.forEach((it) => {
    const r = it.getBoundingClientRect();
    const d = Math.abs(x - (r.left + r.width / 2));
    const s = x == null ? BASE : BASE + (MAX - BASE) * Math.max(0, Math.cos(Math.min(d / REACH, 1) * Math.PI / 2));
    it.style.width = it.style.height = s + "px";
  });
  dock.addEventListener("mousemove", (e) => { if (isPhone()) return; dock.classList.add("magnifying"); size(e.clientX); });
  dock.addEventListener("mouseleave", () => { dock.classList.remove("magnifying"); items.forEach((it) => (it.style.width = it.style.height = "")); });
}
function dockState() { document.querySelectorAll(".dock-item").forEach((b) => b.classList.toggle("running", !!wins[b.dataset.app])); }

/* ---------------- menu bar: clock, weather, battery ---------------- */
function tick() {
  const d = new Date();
  $("#mb-clock").textContent = d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }) + "  " + d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: isPhone() ? undefined : "2-digit" });
}
async function weather() {
  try {
    const r = await fetch("https://api.open-meteo.com/v1/forecast?latitude=28.61&longitude=77.21&current=temperature_2m,weather_code");
    const c = (await r.json()).current;
    const code = c.weather_code;
    const sym = code === 0 ? "☀︎" : code < 4 ? "⛅︎" : code < 50 ? "🌫" : code < 70 ? "🌧" : code < 80 ? "❄︎" : "⛈";
    $("#mb-weather").textContent = `${sym} ${Math.round(c.temperature_2m)}°C`;
  } catch {}
}
async function battery() {
  if (!navigator.getBattery) return;
  try {
    const b = await navigator.getBattery();
    const upd = () => { const p = Math.round(b.level * 100); $("#mb-batt-pct").textContent = p + "%"; $("#mb-batt-fill").setAttribute("width", Math.max(2, 20 * b.level)); };
    upd(); b.onlevelchange = upd;
  } catch {}
}

/* ---------------- boot ---------------- */
(function boot() {
  try { const wall = localStorage.getItem("wallpaper"); if (wall) setWall(wall); } catch {}
  buildDock();
  buildDesktopIcons();
  tick(); setInterval(tick, 1000);
  weather(); setInterval(weather, 15 * 60 * 1000);
  battery();
  const m = location.hash.match(/^#notes\/([\w-]+)/);
  openApp("notes", m ? m[1] : undefined);
  if (m && isPhone()) showDetail($(".win-body", wins.notes), true);
  $("#mb-app").parentElement.querySelector(".apple").onclick = () => openApp("settings");
})();
