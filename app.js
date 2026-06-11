/* ============================================================
   Grad Planner - app logic (vanilla JS)
   Colors: BLUE = registered (already taken) ; GREEN = planned
   ============================================================ */

const STORE_KEY = "byui_gradplanner_v5";
const TERM_LETTER = { Winter:"W", Spring:"S", Fall:"F" };
const SEM_ORDER = ["Winter","Spring","Fall"];

let plan = load();
let ui = { openYear: 2026, reqTab:"General Ed", subtab:null, modalQuery:"", modalLimit:12, modalFilters:{}, detailsOpen:false, myplansOpen:false };

function load(){
  try{ const raw = localStorage.getItem(STORE_KEY); if(raw) return JSON.parse(raw); }catch(e){}
  return structuredClone(INITIAL_PLAN);
}
function save(){ try{ localStorage.setItem(STORE_KEY, JSON.stringify(plan)); }catch(e){} }

const $ = s => document.querySelector(s);
const el = (t,c) => { const e=document.createElement(t); if(c) e.className=c; return e; };

function allItems(){
  const out=[];
  plan.years.forEach(y => SEM_ORDER.forEach(s => (y.semesters[s]||[]).forEach(it => out.push({...it, year:y.year, sem:s}))));
  return out;
}
function plannedCodes(){ return new Set(allItems().map(i=>i.code)); }
function hasCode(code){ return allItems().some(i=>i.code===code); }
function courseNum(code){ const m=code.match(/(\d+)/); return m? parseInt(m[1],10):0; }

function toast(msg, kind){
  const t = $("#toast");
  t.textContent = msg;
  t.className = "toast show" + (kind?(" "+kind):"");
  clearTimeout(toast._t);
  toast._t = setTimeout(()=>{ t.className="toast"; }, 2800);
}

/* ---------- STATS ---------- */
function renderStats(){
  let registered=0, planned=0;
  allItems().forEach(i=>{
    if(i.status==="planned") planned += i.cr;
    else registered += i.cr;               // registered = already taken (blue)
  });
  $("#st-completed").textContent = registered;
  $("#st-inprogress").textContent = 0;
  $("#st-planned").textContent = planned;
  $("#st-unplanned").textContent = 0;
  $("#st-total").textContent = registered + planned;
}

/* ---------- MY PLAN ---------- */
function renderPlan(){
  const body = $("#plan-body");
  body.innerHTML = "";
  const tr = el("div","year-row");
  tr.innerHTML = `<span class="yr">Transferred Credits (0 Credits)</span><span class="chev">&#8964;</span>`;
  body.appendChild(tr);

  plan.years.forEach(y=>{
    if(ui.openYear === y.year){
      const head = el("div","year-row open");
      head.innerHTML = `<span class="yr">Year ${y.year}${y.current?" (Current)":""}</span><a class="vss">View Single Semester</a><span class="chev">&#8964;</span>`;
      head.querySelector(".yr").onclick = ()=>{ ui.openYear=null; renderPlan(); };
      head.querySelector(".chev").onclick = ()=>{ ui.openYear=null; renderPlan(); };
      body.appendChild(head);
      body.appendChild(renderSemesters(y));
    } else {
      const row = el("div","year-row");
      row.innerHTML = `<span class="yr">Year ${y.year}${y.current?" (Current)":""}</span><a class="vss">View Single Semester</a><span class="chev">&#8964;</span>`;
      row.onclick = ()=>{ ui.openYear=y.year; renderPlan(); };
      body.appendChild(row);
    }
  });
}

function renderSemesters(y){
  const wrap = el("div","semesters");
  const tracks = { Winter:["ON-TRACK","on"], Spring:["FLEX TRACK","flex"], Fall:["ON-TRACK","on"] };
  SEM_ORDER.forEach(sem=>{
    const col = el("div","sem");
    col.dataset.year = y.year; col.dataset.sem = sem;
    const head = el("div","sem-head");
    head.innerHTML = `<span class="name">${sem} ${y.year}</span><span class="track ${tracks[sem][1]}">${tracks[sem][0]}</span>`;
    col.appendChild(head);
    const bodyEl = el("div","sem-body");
    const items = y.semesters[sem] || [];
    if(items.length===0){ const e = el("div","sem-empty"); e.textContent="Drop courses here"; bodyEl.appendChild(e); }
    items.forEach(it => bodyEl.appendChild(courseCard(it, y.year, sem)));
    col.appendChild(bodyEl);
    const total = items.reduce((s,i)=>s+(i.cr||0),0);
    const tot = el("div","sem-total"); tot.innerHTML = `Total<br>Credits: <b>${total}</b>`;
    col.appendChild(tot);
    col.addEventListener("dragover", e=>{ e.preventDefault(); col.classList.add("dragover"); });
    col.addEventListener("dragleave", ()=> col.classList.remove("dragover"));
    col.addEventListener("drop", e=>{ e.preventDefault(); col.classList.remove("dragover"); handleDrop(e, y.year, sem); });
    wrap.appendChild(col);
  });
  return wrap;
}

function courseCard(it, year, sem){
  const c = byCode(it.code) || {};
  const card = el("div","course-card"+(it.status==="planned"?" planned":""));
  card.draggable = true;
  card.dataset.id = it.id;
  const variable = c.variable ? `<span class="vc">VARIABLE CREDIT</span>` : "";
  card.innerHTML = `
    <span class="pen">&#9998;</span>
    <span class="rm" title="Remove">&#10005;</span>
    <div class="title">${c.title||it.code}</div>
    <div class="code">${it.code}</div>
    ${variable}
    <span class="cr">${it.cr}</span>`;
  card.querySelector(".rm").onclick = (e)=>{ e.stopPropagation(); removeItem(it.id); };
  card.addEventListener("dragstart", e=>{
    e.dataTransfer.setData("text/plain", JSON.stringify({ kind:"move", id:it.id }));
    e.dataTransfer.effectAllowed="move";
  });
  // double-click toggles registered <-> planned (blue <-> green)
  card.addEventListener("dblclick", ()=>{
    it.status = (it.status==="planned") ? "registered" : "planned";
    save(); renderAll();
    toast(`${it.code} marked ${it.status==="planned"?"Planned":"Registered"}.`,"ok");
  });
  return card;
}

function findItem(id){
  for(const y of plan.years) for(const s of SEM_ORDER){
    const arr=y.semesters[s]; const idx=arr.findIndex(i=>i.id===id);
    if(idx>-1) return {arr, idx, item:arr[idx], year:y.year, sem:s};
  }
  return null;
}
function offeredIn(code, sem){
  const c = byCode(code);
  if(!c || !c.terms) return true;
  return c.terms.includes(TERM_LETTER[sem]);
}
function targetSemArray(year, sem){
  const y = plan.years.find(y=>y.year===year);
  return y ? (y.semesters[sem]) : null;
}

function handleDrop(e, year, sem){
  let payload;
  try{ payload = JSON.parse(e.dataTransfer.getData("text/plain")); }catch(_){ return; }
  if(payload.kind==="move"){
    const found = findItem(payload.id);
    if(!found) return;
    if(found.year===year && found.sem===sem) return;       // dropped where it already is
    if(!offeredIn(found.item.code, sem)){ toast(`${found.item.code} is not offered in ${sem}.`,"warn"); return; }
    found.arr.splice(found.idx,1);
    targetSemArray(year,sem).push(found.item);              // keep its status (blue/green)
    save(); renderAll();
  } else if(payload.kind==="add"){
    addCourseToSem(payload.code, year, sem);
  }
}

// New courses come in PLANNED (green). Warns on double counting.
function addCourseToSem(code, year, sem){
  const c = byCode(code);
  if(hasCode(code)){
    toast(`Double counting: ${code} is already in your plan. No double counting of courses.`,"warn");
    return false;
  }
  if(!offeredIn(code, sem)){ toast(`${code} is not offered in ${sem}. Try another semester.`,"warn"); return false; }
  const arr = targetSemArray(year,sem);
  if(!arr){ toast("Pick a semester first.","warn"); return false; }
  arr.push(mk(code,"planned",c?c.cr:0));                    // planned = green
  save(); renderAll();
  toast(`Added ${code} to ${sem} ${year} (Planned).`,"ok");
  return true;
}

function removeItem(id){
  const f = findItem(id);
  if(f){ f.arr.splice(f.idx,1); save(); renderAll(); toast(`Removed ${f.item.code}.`); }
}

/* ---------- REQUIREMENTS ---------- */
function renderReqTabs(){
  const tabsEl = $("#req-tabs"); tabsEl.innerHTML="";
  Object.keys(REQUIREMENTS).forEach(name=>{
    const t = el("div","req-tab"+(ui.reqTab===name?" active":""));
    t.textContent = name;
    t.onclick = ()=>{ ui.reqTab=name; ui.subtab=null; renderReq(); };
    tabsEl.appendChild(t);
  });
}

function renderReq(){
  renderReqTabs();
  const group = REQUIREMENTS[ui.reqTab];
  const subKeys = Object.keys(group.subtabs);
  if(!ui.subtab || !group.subtabs[ui.subtab]) ui.subtab = subKeys[0];
  const sub = $("#subtabs"); sub.innerHTML="";
  subKeys.forEach(k=>{
    const s = el("div","subtab"+(ui.subtab===k?" active":""));
    s.textContent = k;
    s.onclick = ()=>{ ui.subtab=k; renderReq(); };
    sub.appendChild(s);
  });
  const content = $("#req-content"); content.innerHTML="";
  const block = group.subtabs[ui.subtab];
  const planned = plannedCodes();
  const regCodes = new Set(allItems().filter(i=>i.status!=="planned").map(i=>i.code)); // registered (blue)

  let doneCr=0, planCr=0;
  Object.values(group.subtabs).forEach(b=> b.courses.forEach(code=>{
    const c=byCode(code); if(!c) return;
    if(regCodes.has(code)) doneCr+=c.cr;
    else if(planned.has(code)) planCr+=c.cr;
  }));
  const total = group.total;
  const donePct = Math.min(100, doneCr/total*100);
  const planPct = Math.min(100-donePct, planCr/total*100);

  const wrap = el("div","req-block");
  wrap.innerHTML = `
    <div class="rb-head"><h3>${block.title}</h3><div class="total"><b>${total}</b>Total</div></div>
    <div class="progress"><div class="done" style="width:${donePct}%"></div><div class="plan" style="width:${planPct}%"></div></div>
    <div class="legend">
      <span><i class="l-done"></i>Registered</span>
      <span><i class="l-plan"></i>Planned</span>
      <span><i class="l-un"></i>Unplanned</span>
    </div>
    <div class="take-note">${block.note}</div>`;
  content.appendChild(wrap);

  block.courses.forEach(code=>{
    const c = byCode(code); if(!c) return;
    const inPlan = planned.has(code);
    const isReg = regCodes.has(code);
    const row = el("div","req-course"+(inPlan?" satisfied":""));
    row.draggable = true;
    row.addEventListener("dragstart", e=>{
      e.dataTransfer.setData("text/plain", JSON.stringify({kind:"add", code}));
      e.dataTransfer.effectAllowed="copy";
    });
    const dotClass = isReg?"":(inPlan?"plan":"un");
    const crLabel = c.variable ? `${c.variable[0]} - ${c.variable[1]}` : c.cr;
    row.innerHTML = `
      <button class="add" title="Add to plan">+</button>
      <div class="info"><div class="t">${c.title}</div><div class="c">${code}</div></div>
      <a class="vd">View Details</a>
      <span class="cr">${crLabel}</span>
      <span class="dot ${dotClass}"></span>`;
    row.querySelector(".add").onclick = (e)=>{ e.stopPropagation(); openTermPicker(e.currentTarget, code); };
    row.querySelector(".vd").onclick = (e)=>{ e.stopPropagation(); showDetails(code); };
    content.appendChild(row);
  });
}

function showDetails(code){
  const c = byCode(code); if(!c) return;
  const terms = (c.terms||[]).map(t=>({W:"Winter",S:"Spring",F:"Fall"}[t])).join(", ");
  toast(`${code} - ${c.title} - ${c.cr} cr - Offered: ${terms||"-"}`);
}

function openTermPicker(anchor, code){
  if(hasCode(code)){ toast(`Double counting: ${code} is already in your plan.`,"warn"); return; }
  const cur = plan.years.find(y=>y.current) || plan.years[plan.years.length-1];
  const pick = $("#picker");
  pick.innerHTML = `<div class="ph">Add ${code} to ${cur.year} (Planned)</div>`;
  SEM_ORDER.forEach(sem=>{
    const ok = offeredIn(code, sem);
    const item = el("div","pi"+(ok?"":" dis"));
    item.textContent = sem + (ok?"":" (not offered)");
    if(ok) item.onclick = ()=>{ addCourseToSem(code, cur.year, sem); closePicker(); };
    pick.appendChild(item);
  });
  const r = anchor.getBoundingClientRect();
  pick.style.left = Math.min(r.left, window.innerWidth-190)+"px";
  pick.style.top = (r.bottom+6)+"px";
  pick.classList.add("open");
  setTimeout(()=>document.addEventListener("click", closePicker,{once:true}),0);
}
function closePicker(){ $("#picker").classList.remove("open"); }

/* ---------- SEARCH MODAL ---------- */
function openModal(){ $("#modal").classList.add("open"); ui.modalLimit=12; renderModalRows(); }
function closeModal(){ $("#modal").classList.remove("open"); }

function buildDeptFilter(){
  const sel = $("#f-dept");
  const depts = [...new Set(CATALOG.map(c=>DEPT[c.dept]||c.dept))].sort();
  depts.forEach(d=>{ const o=el("option"); o.value=d; o.textContent=d; sel.appendChild(o); });
}

function matchesFilters(c){
  const f = ui.modalFilters;
  if(f.dept && (DEPT[c.dept]||c.dept)!==f.dept) return false;
  if(f.method && c.method!==f.method) return false;
  if(f.type){
    const map={"General Education":"ge","Major":"major","Elective":"elective","Religion":"religion"};
    if(c.type!==map[f.type]) return false;
  }
  if(f.credits && String(c.cr)!==String(f.credits)) return false;
  const q = ui.modalQuery.trim().toLowerCase();
  if(q && !(c.code.toLowerCase().includes(q) || c.title.toLowerCase().includes(q))) return false;
  return true;
}

function renderModalRows(){
  const tbody = $("#modal-rows"); tbody.innerHTML="";
  const rows = CATALOG.filter(matchesFilters);
  const shown = rows.slice(0, ui.modalLimit);
  shown.forEach(c=>{
    const tr = el("tr");
    const crLabel = c.variable ? `${c.variable[0]} - ${c.variable[1]}` : c.cr;
    const already = hasCode(c.code);
    tr.innerHTML = `
      <td class="cc">${c.code}</td>
      <td>${crLabel}</td>
      <td>${c.title}</td>
      <td>${DEPT[c.dept]||c.dept}</td>
      <td>${already?'<span class="inplan">In plan</span>':'<button class="addbtn">Add</button>'}</td>`;
    tr.querySelector(".cc").onclick = ()=>{ showDetails(c.code); };
    const btn = tr.querySelector(".addbtn");
    if(btn) btn.onclick = (e)=> openTermPicker(e.currentTarget, c.code);
    tbody.appendChild(tr);
  });
  if(rows.length===0){
    const tr=el("tr"); tr.innerHTML=`<td colspan="5" style="text-align:center;padding:24px">No courses match.</td>`;
    tbody.appendChild(tr);
  }
  $("#load-more").style.display = ui.modalLimit < rows.length ? "" : "none";
}

/* ---------- VALIDATE / RESET / ADD YEAR ---------- */
// Collects errors + warnings for the Errors/Warnings panel and the Alerts badge.
function computeIssues(){
  const errors=[], warnings=[]; let total=0; const seen={};
  plan.years.forEach(y=>{
    SEM_ORDER.forEach(sem=>{
      (y.semesters[sem]||[]).forEach(it=>{
        total += it.cr; seen[it.code]=(seen[it.code]||0)+1;
        if(!offeredIn(it.code, sem)) errors.push(`${it.code} is not offered in ${sem} ${y.year}.`);
      });
      const t=(y.semesters[sem]||[]).reduce((s,i)=>s+(i.cr||0),0);
      if(t>18) warnings.push(`${sem} ${y.year} is overloaded with ${t} credits.`);
    });
  });
  Object.keys(seen).forEach(c=>{ if(seen[c]>1) errors.push(`${c} is double-counted (appears ${seen[c]} times).`); });
  if(total>140) errors.push("Your total credits are more than 140. Please plan accordingly.");
  let grad="-"; plan.years.forEach(y=>SEM_ORDER.forEach(s=>{ if((y.semesters[s]||[]).length) grad=`${s} ${y.year}`; }));
  warnings.push(`Your final semester is marked as ${grad}. Don't forget to apply for graduation.`);
  return { errors, warnings, count: errors.length+warnings.length };
}
function renderBadge(){
  const b=$("#alerts-badge"); if(!b) return;
  const n=computeIssues().count;
  b.textContent=n; b.style.display = n? "" : "none";
}
function openEW(){
  const {errors, warnings} = computeIssues();
  const errHtml = errors.length ? errors.map(e=>`<div class="ew-item err">${e}</div>`).join("")
                                : `<div class="ew-none">No errors. Your plan looks good.</div>`;
  const warnHtml = warnings.length ? warnings.map(w=>`<div class="ew-item warn">${w}</div>`).join("")
                                   : `<div class="ew-none">No warnings.</div>`;
  $("#ew-body").innerHTML = `<h4 class="err">Errors</h4><hr>${errHtml}<h4 class="warn">Warnings</h4><hr>${warnHtml}`;
  $("#ew-modal").classList.add("open");
}
function closeEW(){ $("#ew-modal").classList.remove("open"); }
function validate(){ openEW(); }

/* ---------- MY PLANS page ---------- */
function showMyPlans(on){
  ui.myplansOpen = on;
  if(on){
    ui.detailsOpen=false; $("#details-page").classList.remove("open");
    $("#see-details-btn").innerHTML="SEE DETAILS &#9662;";
    renderMyPlans();
  }
  $("#myplans-page").classList.toggle("open", on);
  $("#main-page").classList.toggle("hidden", on);
  window.scrollTo(0,0);
}
function renderMyPlans(){
  if(ui.mp1open===undefined) ui.mp1open=true;
  if(ui.mp2open===undefined) ui.mp2open=true;
  const card = (open, tagClass, tag, name, viewId, chevId, bodyHtml) => `
    <div class="mp-card ${open?'':'collapsed'}">
      <div class="mp-cardhead">
        <span class="mp-chev" id="${chevId}">&#9662;</span>
        <div class="mp-headtitle">
          <span class="mp-tag ${tagClass}">${tag}</span>
          <span class="mp-name">${name}</span>
        </div>
        <div class="mp-head-right">
          <span class="mp-status">Plan Status : <b>In-Progress</b></span>
          <button class="mp-viewplan" id="${viewId}">View Plan</button>
        </div>
      </div>
      <div class="mp-cardbody">${bodyHtml}</div>
    </div>`;
  const body1 = `
    <div class="mp-field"><div class="k">DEGREE</div><div class="v">BACHELOR OF SCIENCE IN SOFTWARE ENGINEERING - UG24</div><a>Change Major</a></div>
    <div class="mp-field"><div class="k">CERTIFICATE</div><div class="v">C165 SOFTWARE DESIGN CERTIFICATE - UG24</div><a>Change Certificate</a></div>
    <div class="mp-field"><div class="k">CERTIFICATE</div><div class="v">C145 COMPUTER PROGRAMMING CERTIFICATE - UG24</div><a>Change Certificate</a></div>
    <div class="mp-grad">
      <span style="font-size:18px;">&#127891;</span>
      <div><b>Time to apply for graduation</b><br>You can apply after registering for your final semester classes.</div>
      <button class="gbtn" id="mp-applygrad">Apply For Graduation</button>
    </div>
    <div class="mp-actions"><button class="ghost" id="mp-dup">DUPLICATE</button></div>`;
  const body2 = `
    <div class="mp-field"><div class="k">DEGREE</div><div class="v">BACHELOR OF SCIENCE IN SOFTWARE ENGINEERING - UG25</div><a>Change Major</a></div>
    <div class="mp-field"><div class="k">CERTIFICATE</div><div class="v">C165 SOFTWARE DESIGN CERTIFICATE - UG25</div><a>Change Certificate</a></div>
    <div class="mp-actions"><button class="ghost" id="mp-declare">Make This My Declared Plan</button></div>`;
  $("#myplans-page").innerHTML = `
    <div class="mp-head">
      <h2>My Plans</h2>
      <div class="btns"><button id="mp-compare">Compare Plans</button><button id="mp-hist">All Plan Histories</button></div>
    </div>
    ${card(ui.mp1open,'declared','Declared Plan','Plan 1','mp-view1','mp-chev1',body1)}
    ${card(ui.mp2open,'alt','Alternate Plan','Private','mp-view2','mp-chev2',body2)}`;
  $("#mp-chev1").onclick = ()=>{ ui.mp1open=!ui.mp1open; renderMyPlans(); };
  $("#mp-chev2").onclick = ()=>{ ui.mp2open=!ui.mp2open; renderMyPlans(); };
  $("#mp-view1").onclick = ()=> showMyPlans(false);   // declared plan -> the planner we built
  $("#mp-view2").onclick = ()=> toast("This alternate plan is a demo placeholder (under construction).");
  ["mp-compare","mp-hist","mp-applygrad","mp-dup","mp-declare"].forEach(id=>{
    const e=$("#"+id); if(e) e.onclick=()=>toast("Demo placeholder - this action isn't wired up.");
  });
}

function resetPlan(){
  if(confirm("Reset your plan to the starting state? This clears your changes.")){
    plan = structuredClone(INITIAL_PLAN);
    save(); ui.openYear=2026; renderAll();
    toast("Plan reset.","ok");
  }
}

function addYear(){
  const maxY = Math.max(...plan.years.map(y=>y.year));
  plan.years.push({ year:maxY+1, semesters:{Winter:[],Spring:[],Fall:[]} });
  save(); ui.openYear=maxY+1; renderAll();
  toast(`Added Year ${maxY+1}.`,"ok");
}

/* ---------- SEE DETAILS PAGE ---------- */
function computeDetails(){
  const items = allItems();
  let reg=0, plan_=0, upper=0;
  items.forEach(i=>{
    if(i.status==="planned") plan_+=i.cr; else reg+=i.cr;
    if(courseNum(i.code)>=300) upper+=i.cr;
  });
  // graduation term = last semester (chronological) that has courses
  let grad="-";
  plan.years.forEach(y=>SEM_ORDER.forEach(s=>{ if((y.semesters[s]||[]).length) grad=`${s} ${y.year}`; }));
  // requirement summary
  const regCodes = new Set(items.filter(i=>i.status!=="planned").map(i=>i.code));
  const planned = plannedCodes();
  const summary = Object.entries(REQUIREMENTS).map(([name,g])=>{
    let d=0,p=0;
    Object.values(g.subtabs).forEach(b=>b.courses.forEach(code=>{
      const c=byCode(code); if(!c)return;
      if(regCodes.has(code)) d+=c.cr; else if(planned.has(code)) p+=c.cr;
    }));
    return {name, total:g.total, done:d, plan:p};
  });
  return { reg, plan:plan_, total:reg+plan_, upper, grad, summary };
}

function renderDetails(){
  const d = computeDetails();
  const bar = (done,plan,total)=>{
    const dp=Math.min(100,done/total*100), pp=Math.min(100-dp,plan/total*100);
    return `<div class="bar"><div class="done" style="width:${dp}%"></div><div class="plan" style="width:${pp}%"></div></div>`;
  };
  const reqRows = d.summary.map(s=>`
    <div class="progress-row">
      <div class="lab">${s.name}</div>
      ${bar(s.done,s.plan,s.total)}
      <div class="tot"><b>${s.total}</b><span>Total</span></div>
    </div>`).join("");

  const upperTarget=30, totalTarget=120;
  const circle = (label, have, need)=>`
    <div><div class="ttl">${label}</div><div class="circle"></div><div class="frac"><b>${have}</b> of ${need}</div></div>`;

  $("#details-page").innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <h2 class="det-h">Plan Details</h2>
      <a id="hide-details" style="font-weight:700;">HIDE DETAILS &#9652;</a>
    </div>
    <div class="details-grid">
      <div>
        <div class="det-sub">My Info</div>
        <div class="det-sub" style="margin-top:8px;">Major</div>
        <div class="det-val">443 Software Engineering - Bachelor of Science</div>
        <div class="det-sub">Certificate</div>
        <div class="det-val">C165 Software Design Certificate</div>

        <h3 class="det-h" style="margin-top:22px;">My Progress <span style="font-size:11px;color:var(--gray-500);font-weight:400;">(based on current plan)</span></h3>
        <div class="prog-cards">
          <div class="pc ok"><div class="pch">PACE TO GRADUATION</div><div class="pcb"><div class="big">~14</div>Avg credits/semester. On pace to graduate ${d.grad}.</div></div>
          <div class="pc warn"><div class="pch">CREDIT RATIO</div><div class="pcb"><div class="big">${d.reg} / ${d.total}</div>Registered vs total planned credits.</div></div>
          <div class="pc bad"><div class="pch">EXCESS CREDITS</div><div class="pcb"><div class="big">${Math.max(0,d.total-totalTarget)}</div>Credits beyond the 120 required.</div></div>
        </div>
        <div class="grad-row">
          <div class="g"><div class="k">Initial Estimated Graduation</div><div class="v">${d.grad}</div></div>
          <div class="g"><div class="k">Current Projected Graduation</div><div class="v">${d.grad}</div></div>
        </div>
      </div>

      <div>
        <div class="det-sub">University Requirements</div>
        <div class="det-card">
          <div class="uni-req">
            ${circle("Total Credits", d.total, totalTarget)}
            ${circle("Residency Credits", d.reg, 30)}
            ${circle("Upper Division", d.upper, upperTarget)}
          </div>
        </div>

        <div class="det-sub">GPA Requirement</div>
        <div class="det-card">
          <div class="gpa-bar"><div class="pin" style="left:87.5%;">YOUR GPA 3.50</div></div>
          <div class="gpa-scale"><span>0.0</span><span>1.0</span><span>2.0</span><span>3.0</span><span>4.0</span></div>
          <div style="font-size:11px;color:var(--gray-500);margin-top:6px;">Minimum 2.0 to graduate. (GPA is a demo value - no real grades used.)</div>
        </div>

        <div class="det-sub">Plan Requirement Summary</div>
        <div class="det-card">
          ${reqRows}
          <div class="legend" style="margin-top:6px;">
            <span><i class="l-done"></i>Registered</span>
            <span><i class="l-plan"></i>Planned</span>
            <span><i class="l-un"></i>Unplanned</span>
          </div>
        </div>
      </div>
    </div>`;
  $("#hide-details").onclick = toggleDetails;
}

function toggleDetails(){
  ui.detailsOpen = !ui.detailsOpen;
  if(ui.detailsOpen){ ui.myplansOpen=false; $("#myplans-page").classList.remove("open"); }
  $("#main-page").classList.toggle("hidden", ui.detailsOpen);
  $("#details-page").classList.toggle("open", ui.detailsOpen);
  $("#see-details-btn").innerHTML = ui.detailsOpen ? "HIDE DETAILS &#9652;" : "SEE DETAILS &#9662;";
  if(ui.detailsOpen) renderDetails();
  window.scrollTo(0,0);
}

/* ---------- WIRE UP ---------- */
function renderAll(){ renderStats(); renderPlan(); renderReq(); renderBadge(); if(ui.detailsOpen) renderDetails(); if(ui.myplansOpen) renderMyPlans(); }

function init(){
  buildDeptFilter();
  renderAll();
  $("#open-search").onclick = openModal;
  $("#modal-close").onclick = closeModal;
  $("#modal").addEventListener("click", e=>{ if(e.target.id==="modal") closeModal(); });
  $("#modal-search").addEventListener("input", e=>{ ui.modalQuery=e.target.value; ui.modalLimit=12; renderModalRows(); });
  $("#modal-search-btn").onclick = ()=>{ ui.modalQuery=$("#modal-search").value; renderModalRows(); };
  $("#load-more").onclick = ()=>{ ui.modalLimit+=12; renderModalRows(); };
  $("#f-apply").onclick = ()=>{
    ui.modalFilters = { dept:$("#f-dept").value, method:$("#f-method").value, type:$("#f-type").value, credits:$("#f-credits").value };
    ui.modalLimit=12; renderModalRows();
  };
  $("#f-clear").onclick = ()=>{
    ui.modalFilters={}; ["f-dept","f-method","f-type","f-credits"].forEach(id=>$("#"+id).value="");
    ui.modalQuery=""; $("#modal-search").value=""; ui.modalLimit=12; renderModalRows();
  };
  $("#req-search").addEventListener("focus", ()=> openModal());
  $("#validate-btn").onclick = validate;
  $("#reset-link").onclick = resetPlan;
  $("#add-year").onclick = addYear;
  $("#history-link").onclick = ()=> toast("Plan history is a demo placeholder.");
  $("#view-avail").onclick = (e)=>{ e.preventDefault(); openModal(); };
  $("#see-details-btn").onclick = toggleDetails;

  // Drag a course card onto the Requirements panel ("the pile") to remove it from the plan
  const pile = document.querySelector(".req-panel");
  pile.addEventListener("dragover", e=>{
    const t = e.dataTransfer.types || [];
    e.preventDefault();
    pile.classList.add("dropzone");
  });
  pile.addEventListener("dragleave", e=>{
    if(!pile.contains(e.relatedTarget)) pile.classList.remove("dropzone");
  });
  pile.addEventListener("drop", e=>{
    pile.classList.remove("dropzone");
    let p; try{ p = JSON.parse(e.dataTransfer.getData("text/plain")); }catch(_){ return; }
    if(p.kind==="move"){
      e.preventDefault();
      const f = findItem(p.id);
      if(f){ removeItem(p.id); toast(`Removed ${f.item.code} - back in the course list.`); }
    }
  });

  $("#myplans-btn").onclick = ()=> showMyPlans(!ui.myplansOpen);
  $("#alerts-link").onclick = (e)=>{ e.preventDefault(); openEW(); };
  $("#ew-close").onclick = closeEW;
  $("#ew-modal").addEventListener("click", e=>{ if(e.target.id==="ew-modal") closeEW(); });
}

document.addEventListener("DOMContentLoaded", init);
