import { useState } from "react";

const SUPABASE_URL = "https://xilhocbidbspezlndvqq.supabase.co";
const SUPABASE_KEY = "sb_publishable_s9zD1-ovvbdYtk7z5Pzrkw_QbMvV4RI";

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://xilhocbidbspezlndvqq.supabase.co",
  "sb_publishable_s9zD1-ovvbdYtk7z5Pzrkw_QbMvV4RI"
);
async function saveToSupabase(role, answers) {
  try {
    const { error } = await supabase.from("responses").insert({ role, answers });
    if (error) console.error("Supabase error:", error);
    return !error;
  } catch (e) {
    console.error("Supabase save failed:", e);
    return false;
  }
}




const P = "#7C3AED";
const PL = "#EDE9FE";

// ── STORY SCREENS (vor jeder Phase) ──────────────────────────────────────────
const STORY = {
  bewerber: {
    search: {
      emoji: "🎓",
      title: "Herzlichen Glückwunsch!",
      text: "Du hast dein Studium bzw. deine Ausbildung erfolgreich abgeschlossen! Jetzt ist es Zeit, in die Berufswelt zu starten. Du möchtest dich bewerben und deinen ersten richtigen Job finden.",
      cta: "Los geht's — was ist dir bei der Jobsuche wichtig?",
      btn: "Zur Jobsuche →",
    },
    apply: {
      emoji: "🏢",
      title: "Du hast ein Unternehmen gefunden!",
      text: "Nach einiger Recherche hast du ein Unternehmen entdeckt, das dich wirklich begeistert. Die Stelle klingt perfekt. Jetzt geht es darum, deine Bewerbungsunterlagen einzureichen.",
      cta: "Wie wichtig ist dir dabei der Bewerbungsprozess?",
      btn: "Weiter zur Bewerbung →",
    },
    wait: {
      emoji: "📬",
      title: "Bewerbung abgeschickt!",
      text: "Deine Unterlagen sind raus! Jetzt liegt der Ball beim Unternehmen. Du wartest auf eine Rückmeldung. Diese Phase kann sich manchmal ziehen...",
      cta: "Was erwartest du in dieser Wartezeit von einem Unternehmen?",
      btn: "Weiter →",
    },
    interview: {
      emoji: "🎉",
      title: "Du wirst eingeladen!",
      text: "Deine Bewerbung hat überzeugt! Du erhältst eine Einladung zum Vorstellungsgespräch. Das ist ein großer Schritt — das Unternehmen ist an dir interessiert!",
      cta: "Was ist dir bei diesem Gespräch besonders wichtig?",
      btn: "Zum Gespräch →",
    },
    offer: {
      emoji: "💼",
      title: "Das Gespräch lief super!",
      text: "Das Vorstellungsgespräch war ein Erfolg. Das Unternehmen ist von dir begeistert und du erhältst kurz darauf ein konkretes Jobangebot.",
      cta: "Was entscheidet jetzt, ob du zusagst?",
      btn: "Zum Angebot →",
    },
  },
  unternehmen: {
    search: {
      emoji: "🏢",
      title: "Ihr sucht Nachwuchstalente!",
      text: "Euer Unternehmen möchte qualifizierte Gen-Z-Talente gewinnen. Der Arbeitsmarkt ist hart umkämpft — junge Menschen haben die Wahl und vergleichen Arbeitgeber sorgfältig.",
      cta: "Wie macht ihr euch als attraktiver Arbeitgeber bekannt?",
      btn: "Los geht's →",
    },
    apply: {
      emoji: "📢",
      title: "Eure Stelle ist ausgeschrieben!",
      text: "Ihr habt eine Stelle veröffentlicht und hofft auf Bewerbungen von Gen-Z-Talenten. Doch wie gestaltet ihr den Bewerbungsprozess? Zu kompliziert und ihr verliert sie sofort.",
      cta: "Wie ist euer Bewerbungsprozess gestaltet?",
      btn: "Weiter →",
    },
    wait: {
      emoji: "📥",
      title: "Bewerbungen trudeln ein!",
      text: "Die ersten Bewerbungen sind da! Jetzt entscheidet sich, ob eine Kandidatin das Interesse behält — oder parallel woanders zusagt. Schnelligkeit und Wertschätzung zählen.",
      cta: "Wie reagiert ihr auf eingegangene Bewerbungen?",
      btn: "Weiter →",
    },
    interview: {
      emoji: "📅",
      title: "Ihr ladet ein!",
      text: "Eine vielversprechende Kandidatin hat einen Gesprächstermin bekommen. Jetzt habt ihr die Chance, sie von eurem Unternehmen zu überzeugen — aber auch sie bewertet euch!",
      cta: "Wie gestaltet ihr das Vorstellungsgespräch?",
      btn: "Zum Gespräch →",
    },
    offer: {
      emoji: "🌟",
      title: "Das Gespräch war ein Erfolg!",
      text: "Das Interview lief hervorragend — beide Seiten sind begeistert. Jetzt kommt es darauf an, ein überzeugendes Angebot zu machen und die Kandidatin langfristig zu gewinnen.",
      cta: "Was bietet euer Unternehmen?",
      btn: "Zum Angebot →",
    },
  },
};


// ── DEMOGRAFIE ────────────────────────────────────────────────────────────────
const DEMO_B = [
  { id:"d_age", label:"Wie alt bist du?",
    options:["Unter 18","18–21","22–25","26–28","Über 28"] },
  { id:"d_status", label:"Was trifft auf dich zu?",
    options:["Noch im Studium","Noch in Ausbildung","Gerade abgeschlossen","Bereits berufstätig","Auf Jobsuche"] },
  { id:"d_exp", label:"Wie viel Bewerbungserfahrung hast du?",
    options:["Keine","1–2 Bewerbungen","3–5 Bewerbungen","Mehr als 5 Bewerbungen"] },
];

const DEMO_U = [
  { id:"d_size", label:"Wie groß ist euer Unternehmen?",
    options:["1–10 Mitarbeitende","11–50","51–250","251–1000","Über 1000"] },
  { id:"d_sector", label:"In welcher Branche seid ihr tätig?",
    options:["Industrie / Produktion","IT / Tech","Dienstleistung","Handel","Gesundheit / Soziales","Sonstiges"] },
  { id:"d_recruit", label:"Wie viele Gen-Z-Bewerber:innen habt ihr pro Jahr ca.?",
    options:["Weniger als 10","10–50","51–100","Mehr als 100"] },
];

// ── STAGES ────────────────────────────────────────────────────────────────────
const STAGES = [
  { id: "search",    emoji: "🔍", title: "Jobsuche & Recherche" },
  { id: "apply",     emoji: "📝", title: "Bewerbung einreichen" },
  { id: "wait",      emoji: "⏳", title: "Warten & Kommunikation" },
  { id: "interview", emoji: "🎤", title: "Vorstellungsgespräch" },
  { id: "offer",     emoji: "🤝", title: "Angebot & Onboarding" },
];

// ── QUESTIONS ─────────────────────────────────────────────────────────────────
const QUESTIONS = [
  { id:"s1", stage:"search", type:"rating",
    b:"Wie wichtig ist dir ein ansprechender Social-Media-Auftritt (LinkedIn, Instagram) des Arbeitgebers bei der Jobsuche?",
    u:"Wie aktiv ist euer Unternehmen auf Social Media um Gen-Z-Talente anzusprechen?" },
  { id:"s2", stage:"search", type:"mc",
    b:"Wo suchst du hauptsächlich nach Stellenangeboten?",
    u:"Über welche Kanäle erreicht ihr die meisten Bewerber:innen?",
    options:["LinkedIn / Xing","Instagram / TikTok","Unternehmenswebsite","Jobportale (Indeed, Stepstone)","Empfehlungen / Netzwerk"] },
  { id:"s3", stage:"search", type:"rating",
    b:"Wie wichtig sind dir Bewertungen auf Kununu oder Glassdoor bei der Wahl eines Arbeitgebers?",
    u:"Wie aktiv pflegt euer Unternehmen seinen Auftritt auf Bewertungsplattformen wie Kununu?" },
  { id:"s4", stage:"search", type:"rating",
    b:"Wie wichtig ist es dir, dass Gehaltsinformationen bereits in der Stellenausschreibung angegeben werden?",
    u:"Wie transparent kommuniziert euer Unternehmen Gehaltsinformationen in Stellenausschreibungen?" },

  { id:"a1", stage:"apply", type:"rating",
    b:"Wie wichtig ist dir ein kurzer, unkomplizierter Bewerbungsprozess (unter 15 Minuten)?",
    u:"Wie stark habt ihr euren Bewerbungsprozess auf Kürze und Einfachheit für Gen Z optimiert?" },
  { id:"a2", stage:"apply", type:"mc",
    b:"Was schreckt dich bei einer Bewerbung am meisten ab?",
    u:"Was ist eurer Meinung nach das größte Hindernis im Bewerbungsprozess für Gen Z?",
    options:["Langes Anschreiben erforderlich","Kein mobiles Bewerbungsformular","Zu viele Pflichtfelder","Keine klaren Stelleninfos","Veraltete Bewerbungsplattform"] },
  { id:"a3", stage:"apply", type:"rating",
    b:"Wie wichtig ist es dir, dass eine Bewerbung problemlos per Smartphone möglich ist?",
    u:"Wie gut ist euer Bewerbungsformular für die mobile Nutzung via Smartphone optimiert?" },

  { id:"w1", stage:"wait", type:"mc",
    b:"Wie lange bist du maximal bereit auf eine erste Rückmeldung nach der Bewerbung zu warten?",
    u:"Wie lange dauert bei euch durchschnittlich die erste Rückmeldung nach Eingang einer Bewerbung?",
    options:["Bis 3 Tage","Bis 1 Woche","Bis 2 Wochen","Bis 1 Monat","Länger ist ok"] },
  { id:"w2", stage:"wait", type:"rating",
    b:"Wie wichtig ist dir ein regelmäßiges Update über den aktuellen Stand deiner Bewerbung?",
    u:"Wie proaktiv informiert euer Unternehmen Kandidat:innen über den Status ihrer Bewerbung?" },
  { id:"w3", stage:"wait", type:"rating",
    b:"Wie wichtig wäre dir eine persönliche, individuelle Absage mit kurzem Feedback gegenüber einer Standard-Absage?",
    u:"Wie individuell und wertschätzend gestaltet euer Unternehmen Absagen an Bewerber:innen?" },

  { id:"i1", stage:"interview", type:"mc",
    b:"Welches Format bevorzugst du für ein erstes Vorstellungsgespräch?",
    u:"Welches Format nutzt euer Unternehmen für erste Vorstellungsgespräche am häufigsten?",
    options:["Video-Call","Telefonat","Persönlich vor Ort","Hybrid (Video + vor Ort)","Je nach Situation"] },
  { id:"i2", stage:"interview", type:"rating",
    b:"Wie wichtig ist dir eine entspannte, wertschätzende Atmosphäre im Vorstellungsgespräch?",
    u:"Wie bewusst gestaltet euer Unternehmen eine entspannte und wertschätzende Gesprächsatmosphäre?" },
  { id:"i3", stage:"interview", type:"rating",
    b:"Wie wichtig ist es dir, im Interview auch echte Einblicke in die Unternehmenskultur zu bekommen?",
    u:"Wie authentisch und transparent vermittelt euer Unternehmen im Gespräch Einblicke in die Kultur?" },
  { id:"i4", stage:"interview", type:"rating",
    b:"Wie wichtig ist dir, dass Diversität und Inklusion im Unternehmen spürbar und gelebt werden?",
    u:"Wie stark sind Diversität und Inklusion in eurem Unternehmen tatsächlich verankert und sichtbar?" },

  { id:"o1", stage:"offer", type:"rating",
    b:"Wie wichtig ist dir neben dem Gehalt ein attraktives Benefit-Paket (Homeoffice, Weiterbildung)?",
    u:"Wie attraktiv und auf die Bedürfnisse von Gen Z zugeschnitten ist euer aktuelles Benefit-Paket?" },
  { id:"o2", stage:"offer", type:"rating",
    b:"Wie wichtig ist dir ein strukturiertes Onboarding-Programm in den ersten Wochen im neuen Job?",
    u:"Wie strukturiert, persönlich und professionell ist euer Onboarding für neue Mitarbeitende gestaltet?" },
  { id:"o3", stage:"offer", type:"mc",
    b:"Was wäre für dich ein klarer Dealbreaker bei einem Jobangebot?",
    u:"Was ist eurer Erfahrung nach der häufigste Grund, warum Gen Z ein Angebot ablehnt?",
    options:["Zu geringes Gehalt","Kein Homeoffice möglich","Schlechte Unternehmenskultur","Keine Entwicklungsperspektive","Zu langer Arbeitsweg"] },
  { id:"o4", stage:"offer", type:"rating",
    b:"Wie wichtig ist es dir, dass dein Arbeitgeber einen echten gesellschaftlichen Mehrwert schafft?",
    u:"Wie glaubwürdig und klar kommuniziert euer Unternehmen seinen Purpose und gesellschaftlichen Beitrag?" },
];

const stageQs = (id) => QUESTIONS.filter(q => q.stage === id);
const stageIdx = (id) => STAGES.findIndex(s => s.id === id);

// ── COMPONENTS ────────────────────────────────────────────────────────────────
function Progress({ stageId, qStep }) {
  const si = stageIdx(stageId);
  const done = STAGES.slice(0,si).reduce((a,s)=>a+stageQs(s.id).length,0) + qStep;
  const total = QUESTIONS.length;
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
        <div style={{display:"flex",gap:6}}>
          {STAGES.map((s,i) => (
            <div key={s.id} style={{display:"flex",alignItems:"center",gap:4}}>
              <span style={{fontSize:14}}>{s.emoji}</span>
              {i < STAGES.length-1 && <span style={{color:"#E5E7EB",fontSize:12}}>›</span>}
            </div>
          ))}
        </div>
        <span style={{fontSize:12,color:"#9CA3AF"}}>{done}/{total}</span>
      </div>
      <div style={{height:4,background:"#F3F4F6",borderRadius:99}}>
        <div style={{height:"100%",width:`${(done/total)*100}%`,background:P,borderRadius:99,transition:"width 0.3s"}}/>
      </div>
    </div>
  );
}

function RatingInput({ value, onChange, role }) {
  const labels = role==="bewerber"
    ? ["Unwichtig","Eher unwichtig","Neutral","Wichtig","Sehr wichtig"]
    : ["Gar nicht","Kaum","Teils","Gut","Sehr gut"];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
        {[1,2,3,4,5].map(n => (
          <button key={n} onClick={()=>onChange(n)} style={{
            width:54,height:54,borderRadius:12,
            border:value===n?`2.5px solid ${P}`:"2px solid #E5E7EB",
            background:value===n?PL:"#fff",
            color:value===n?P:"#6B7280",
            fontSize:19,fontWeight:700,cursor:"pointer",transition:"all 0.15s"
          }}>{n}</button>
        ))}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",padding:"0 4px"}}>
        <span style={{fontSize:11,color:"#9CA3AF"}}>{labels[0]}</span>
        <span style={{fontSize:11,color:"#9CA3AF"}}>{labels[4]}</span>
      </div>
    </div>
  );
}

function MCInput({ options, value, onChange }) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {options.map(opt => (
        <button key={opt} onClick={()=>onChange(opt)} style={{
          padding:"13px 16px",borderRadius:12,textAlign:"left",
          border:value===opt?`2px solid ${P}`:"2px solid #E5E7EB",
          background:value===opt?PL:"#fff",
          color:value===opt?P:"#374151",
          fontSize:14,fontWeight:value===opt?600:400,
          cursor:"pointer",transition:"all 0.15s"
        }}>{opt}</button>
      ))}
    </div>
  );
}

function GapBar({ label, b, u }) {
  if(b===null||u===null) return null;
  const gap = Math.abs(b-u);
  const gc = gap>=1.5?"#EF4444":gap>=0.8?"#F59E0B":"#10B981";
  return (
    <div style={{marginBottom:20}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
        <span style={{fontSize:13,fontWeight:600,color:"#374151"}}>{label}</span>
        <span style={{fontSize:12,fontWeight:700,color:gc}}>Lücke: {gap.toFixed(1)}</span>
      </div>
      <div style={{position:"relative",height:10,background:"#F3F4F6",borderRadius:99}}>
        <div style={{position:"absolute",left:`${((Math.min(b,u)-1)/4)*100}%`,width:`${(gap/4)*100}%`,height:"100%",background:gc,borderRadius:99,opacity:0.25}}/>
        {[{v:b,c:P},{v:u,c:"#F59E0B"}].map(({v,c},i)=>(
          <div key={i} style={{position:"absolute",left:`${((v-1)/4)*100}%`,transform:"translateX(-50%)",top:-3,width:16,height:16,borderRadius:"50%",background:c,border:"2px solid #fff",boxShadow:"0 1px 4px rgba(0,0,0,0.2)"}}/>
        ))}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
        <span style={{fontSize:11,color:P}}>● Bewerber: {b.toFixed(1)}</span>
        <span style={{fontSize:11,color:"#F59E0B"}}>● Unternehmen: {u.toFixed(1)}</span>
      </div>
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("intro"); // start|story|survey|done|results
  const [role, setRole] = useState(null);
  const [stageId, setStageId] = useState("search");
  const [qStep, setQStep] = useState(0);
  const [demoStep, setDemoStep] = useState(0);
  const [demoAnswers, setDemoAnswers] = useState({});
  const [consented, setConsented] = useState(false);
  const [answers, setAnswers] = useState({});
  const [allResponses, setAllResponses] = useState({bewerber:[],unternehmen:[]});



  async function saveAll(role,ans){
    // Save to Supabase
    await saveToSupabase(role, ans);
    // Update local state for this session
    const d={...allResponses};
    d[role]=[...d[role],ans];
    setAllResponses(d);
  }

  function begin(r){
    setRole(r);setStageId("search");setQStep(0);setAnswers({});
    setDemoStep(0);setDemoAnswers({});
    setScreen("demo");
  }

  const qs = stageQs(stageId);
  const curQ = qs[qStep];
  const curAns = curQ ? answers[curQ.id] : null;

  function handleAnswer(val){
    const newAns = {...answers,[curQ.id]:val};
    setAnswers(newAns);
    if(curQ.type==="rating"){
      advance(newAns);
    }
  }

  function advance(ans){
    const next = qStep+1;
    if(next < qs.length){
      setQStep(next);
    } else {
      const ni = stageIdx(stageId)+1;
      if(ni < STAGES.length){
        setStageId(STAGES[ni].id);
        setQStep(0);
        setScreen("story");
      } else {
        saveAll(role,{...ans,...demoAnswers});
        setScreen("done");
      }
    }
  }

  function getAvg(sid,r){
    const qs2=stageQs(sid).filter(q=>q.type==="rating");
    const vals=allResponses[r].flatMap(resp=>qs2.map(q=>resp[q.id]).filter(v=>typeof v==="number"));
    return vals.length?vals.reduce((a,b)=>a+b,0)/vals.length:null;
  }

  const story = role ? STORY[role][stageId] : null;
  const st = STAGES.find(s=>s.id===stageId);

  // ── START ──────────────────────────────────────────────────────────────────
  if(screen==="start") return(
    <div style={{minHeight:"100vh",background:"#FAFAFA",display:"flex",alignItems:"center",justifyContent:"center",padding:20,fontFamily:"system-ui,sans-serif"}}>
      <div style={{maxWidth:480,width:"100%"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{fontSize:52,marginBottom:16}}>🎯</div>
          <div style={{display:"inline-block",background:PL,color:P,fontSize:11,fontWeight:700,letterSpacing:1.5,padding:"5px 14px",borderRadius:99,marginBottom:16}}>BACHELORARBEIT · DHBW RAVENSBURG</div>
          <h1 style={{fontSize:30,fontWeight:800,color:"#111827",margin:"0 0 12px",lineHeight:1.2}}>GenZ Recruiting <span style={{color:P}}>Gap</span></h1>
          <p style={{color:"#6B7280",fontSize:14,lineHeight:1.7,margin:0}}>Erlebe einen vollständigen Bewerbungsprozess aus deiner Perspektive — und hilf dabei, die Lücke zwischen Erwartungen und Realität sichtbar zu machen.</p>
          <div style={{display:"flex",justifyContent:"center",gap:16,marginTop:16,fontSize:13,color:"#9CA3AF"}}>
            {STAGES.map(s=><span key={s.id}>{s.emoji} {s.title.split(" ")[0]}</span>)}
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:20}}>
          <button onClick={()=>begin("bewerber")} style={{padding:"18px 24px",borderRadius:16,border:"none",background:P,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div><div>Ich bin Bewerber:in</div><div style={{fontSize:12,opacity:.8,fontWeight:400,marginTop:2}}>Gen Z · Student:in · Berufseinsteiger:in</div></div>
            <span style={{fontSize:22}}>→</span>
          </button>
          <button onClick={()=>begin("unternehmen")} style={{padding:"18px 24px",borderRadius:16,border:`2px solid ${P}`,background:"#fff",color:P,fontSize:15,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div><div>Ich bin Arbeitgeber:in</div><div style={{fontSize:12,opacity:.7,fontWeight:400,marginTop:2}}>HR · Recruiting · Unternehmensseite</div></div>
            <span style={{fontSize:22}}>→</span>
          </button>
        </div>

        <p style={{textAlign:"center",color:"#D1D5DB",fontSize:11,marginTop:16}}>Anonym · ca. 5 Minuten · 17 Fragen · 5 Phasen</p>

      </div>
    </div>
  );



  // ── INTRO & DATENSCHUTZ ────────────────────────────────────────────────────
  if(screen==="intro") return(
    <div style={{minHeight:"100vh",background:"#FAFAFA",display:"flex",alignItems:"center",justifyContent:"center",padding:20,fontFamily:"system-ui,sans-serif"}}>
      <div style={{maxWidth:500,width:"100%"}}>
        <div style={{background:"#fff",borderRadius:20,padding:28,boxShadow:"0 2px 12px rgba(0,0,0,0.07)",marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
            <div style={{width:48,height:48,borderRadius:12,background:PL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>👩‍🎓</div>
            <div>
              <div style={{fontWeight:700,color:"#111827",fontSize:15}}>Emily</div>
              <div style={{fontSize:13,color:"#6B7280"}}>BWL International Business · DHBW Ravensburg</div>
            </div>
          </div>
          <h2 style={{fontSize:18,fontWeight:700,color:"#111827",marginBottom:10}}>Hallo! 👋</h2>
          <p style={{fontSize:14,color:"#374151",lineHeight:1.8,margin:"0 0 12px"}}>
            Ich schreibe meine Bachelorarbeit zum Thema <strong>„Recruiting im Wandel: Anforderungen der Generation Z an Arbeitgeber und moderne Recruiting-Prozesse"</strong> an der Dualen Hochschule Baden-Württemberg Ravensburg.
          </p>
          <p style={{fontSize:14,color:"#374151",lineHeight:1.8,margin:"0 0 12px"}}>
            Für meine empirische Forschung führe ich diese interaktive Umfrage durch. Du durchläufst dabei einen kompletten Bewerbungsprozess aus deiner Perspektive — entweder als Bewerber:in oder als Arbeitgeber:in.
          </p>
          <p style={{fontSize:14,color:"#374151",lineHeight:1.8,margin:0}}>
            Die Teilnahme dauert ca. <strong>5 Minuten</strong> und hilft mir dabei, die Lücke zwischen Erwartungen und Realität im Recruiting sichtbar zu machen. Vielen Dank! 🙏
          </p>
        </div>

        <div style={{background:"#fff",borderRadius:20,padding:24,boxShadow:"0 2px 12px rgba(0,0,0,0.07)",marginBottom:16,borderLeft:`4px solid ${P}`}}>
          <h3 style={{fontSize:14,fontWeight:700,color:P,margin:"0 0 10px",display:"flex",alignItems:"center",gap:6}}>
            🔒 Datenschutz & Anonymität
          </h3>
          <ul style={{fontSize:13,color:"#374151",lineHeight:1.9,margin:0,paddingLeft:16}}>
            <li>Die Umfrage ist vollständig <strong>anonym</strong> — es werden keine Namen, E-Mail-Adressen oder personenbezogenen Daten erhoben.</li>
            <li>Die Daten werden ausschließlich für die Bachelorarbeit verwendet und nicht an Dritte weitergegeben.</li>
            <li>Die Speicherung und Verarbeitung erfolgt gemäß der <strong>DSGVO</strong>.</li>
            <li>Eine Zuordnung einzelner Antworten zu Personen ist nicht möglich.</li>
          </ul>
        </div>

        <div style={{background:"#fff",borderRadius:20,padding:20,boxShadow:"0 2px 12px rgba(0,0,0,0.07)",marginBottom:20}}>
          <label style={{display:"flex",alignItems:"flex-start",gap:12,cursor:"pointer"}} onClick={()=>setConsented(c=>!c)}>
            <div style={{
              marginTop:2,width:18,height:18,borderRadius:4,flexShrink:0,
              border:consented?"none":"2px solid #D1D5DB",
              background:consented?P:"#fff",
              display:"flex",alignItems:"center",justifyContent:"center",
              transition:"all 0.15s"
            }}>
              {consented && <span style={{color:"#fff",fontSize:12,fontWeight:900,lineHeight:1}}>✓</span>}
            </div>
            <span style={{fontSize:13,color:"#374151",lineHeight:1.7,userSelect:"none"}}>
              Ich habe die Datenschutzhinweise gelesen und bin damit einverstanden, dass meine anonymen Antworten im Rahmen der Bachelorarbeit ausgewertet werden.
            </span>
          </label>
        </div>

        <button onClick={()=>{ if(consented) setScreen("start"); }} style={{
          width:"100%",padding:"16px",borderRadius:14,border:"none",
          background:consented?P:"#D1D5DB",
          color:"#fff",fontSize:15,fontWeight:700,
          cursor:consented?"pointer":"not-allowed",
          transition:"background 0.2s"
        }}>
          Ich stimme zu — Los geht's! →
        </button>

        <p style={{textAlign:"center",color:"#D1D5DB",fontSize:11,marginTop:12}}>
          
        </p>
      </div>
    </div>
  );

  // ── DEMO ───────────────────────────────────────────────────────────────────
  if(screen==="demo"){
    const demoQs = role==="bewerber" ? DEMO_B : DEMO_U;
    const dq = demoQs[demoStep];
    const dAns = demoAnswers[dq.id];
    return(
      <div style={{minHeight:"100vh",background:"#FAFAFA",display:"flex",flexDirection:"column",fontFamily:"system-ui,sans-serif"}}>
        <div style={{padding:"14px 20px",borderBottom:"1px solid #F3F4F6",background:"#fff"}}>
          <div style={{maxWidth:540,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:13,fontWeight:600,color:P}}>Kurz über dich...</span>
            <span style={{fontSize:12,color:"#9CA3AF"}}>{demoStep+1}/{demoQs.length}</span>
          </div>
          <div style={{maxWidth:540,margin:"8px auto 0",height:4,background:"#F3F4F6",borderRadius:99}}>
            <div style={{height:"100%",width:`${((demoStep)/demoQs.length)*100}%`,background:P,borderRadius:99,transition:"width 0.3s"}}/>
          </div>
        </div>
        <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"24px 20px"}}>
          <div style={{maxWidth:540,width:"100%"}}>
            <div style={{display:"inline-block",background:PL,color:P,fontSize:11,fontWeight:700,letterSpacing:1,padding:"4px 12px",borderRadius:99,marginBottom:16}}>
              DEMOGRAPHICS
            </div>
            <h2 style={{fontSize:20,fontWeight:700,color:"#111827",lineHeight:1.5,marginBottom:24}}>{dq.label}</h2>
            <MCInput options={dq.options} value={dAns} onChange={v=>{
              const nd={...demoAnswers,[dq.id]:v};
              setDemoAnswers(nd);
              setTimeout(()=>{
                if(demoStep<demoQs.length-1){
                  setDemoStep(demoStep+1);
                } else {
                  setScreen("story");
                }
              },300);
            }}/>
          </div>
        </div>
      </div>
    );
  }

  // ── STORY (Narrative vor jeder Phase) ─────────────────────────────────────
  if(screen==="story" && story) return(
    <div style={{minHeight:"100vh",background:P,display:"flex",alignItems:"center",justifyContent:"center",padding:24,fontFamily:"system-ui,sans-serif"}}>
      <div style={{maxWidth:480,width:"100%",textAlign:"center",color:"#fff"}}>
        <div style={{fontSize:72,marginBottom:20}}>{story.emoji}</div>
        <div style={{display:"inline-block",background:"rgba(255,255,255,0.15)",fontSize:12,fontWeight:700,letterSpacing:1,padding:"5px 14px",borderRadius:99,marginBottom:16}}>
          {st.emoji} {st.title.toUpperCase()}
        </div>
        <h2 style={{fontSize:28,fontWeight:800,margin:"0 0 16px",lineHeight:1.3}}>{story.title}</h2>
        <p style={{fontSize:15,opacity:.9,lineHeight:1.8,margin:"0 0 20px"}}>{story.text}</p>
        <div style={{background:"rgba(255,255,255,0.12)",borderRadius:12,padding:"14px 20px",marginBottom:32,fontSize:14,fontWeight:600,fontStyle:"italic",opacity:.95}}>
          {story.cta}
        </div>
        <button onClick={()=>setScreen("survey")} style={{padding:"16px 40px",borderRadius:14,border:"none",background:"#fff",color:P,fontSize:16,fontWeight:800,cursor:"pointer",boxShadow:"0 4px 16px rgba(0,0,0,0.15)"}}>
          {story.btn}
        </button>
      </div>
    </div>
  );

  // ── SURVEY ─────────────────────────────────────────────────────────────────
  if(screen==="survey" && curQ) return(
    <div style={{minHeight:"100vh",background:"#FAFAFA",display:"flex",flexDirection:"column",fontFamily:"system-ui,sans-serif"}}>
      <div style={{padding:"14px 20px",borderBottom:"1px solid #F3F4F6",background:"#fff"}}>
        <div style={{maxWidth:540,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:16}}>{st.emoji}</span>
              <span style={{fontSize:13,fontWeight:600,color:P}}>{st.title}</span>
            </div>
            <span style={{fontSize:12,color:P,background:PL,padding:"3px 10px",borderRadius:99,fontWeight:600}}>
              {role==="bewerber"?"Bewerber:in":"Arbeitgeber:in"}
            </span>
          </div>
          <Progress stageId={stageId} qStep={qStep}/>
        </div>
      </div>

      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"24px 20px"}}>
        <div style={{maxWidth:540,width:"100%"}}>
          <h2 style={{fontSize:20,fontWeight:700,color:"#111827",lineHeight:1.5,marginBottom:28}}>
            {role==="bewerber"?curQ.b:curQ.u}
          </h2>
          {curQ.type==="rating"?(
            <RatingInput value={curAns} onChange={handleAnswer} role={role}/>
          ):(
            <div>
              <MCInput options={curQ.options} value={curAns} onChange={v=>setAnswers({...answers,[curQ.id]:v})}/>
              {curAns&&(
                <button onClick={()=>advance({...answers,[curQ.id]:curAns})} style={{marginTop:16,width:"100%",padding:"14px",borderRadius:12,border:"none",background:P,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer"}}>
                  Weiter →
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // ── DONE ───────────────────────────────────────────────────────────────────
  if(screen==="done") return(
    <div style={{minHeight:"100vh",background:"#FAFAFA",display:"flex",alignItems:"center",justifyContent:"center",padding:20,fontFamily:"system-ui,sans-serif"}}>
      <div style={{maxWidth:440,width:"100%",textAlign:"center"}}>
        <div style={{fontSize:60,marginBottom:16}}>{role==="bewerber"?"🎊":"🏆"}</div>
        <h2 style={{fontSize:24,fontWeight:800,color:"#111827",marginBottom:12}}>
          {role==="bewerber"?"Du hast deinen Job!":"Recruiting abgeschlossen!"}
        </h2>
        <p style={{color:"#6B7280",fontSize:14,lineHeight:1.7,marginBottom:28}}>
          {role==="bewerber"
            ?"Herzlichen Glückwunsch! Du hast den kompletten Bewerbungsprozess durchlaufen. Deine Antworten helfen dabei, die Recruiting-Lücke sichtbar zu machen."
            :"Ihr habt eine neue Mitarbeiterin gewonnen! Eure Antworten helfen dabei, die Recruiting-Lücke aus Unternehmenssicht zu verstehen."}
        </p>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <button onClick={()=>setScreen("start")} style={{padding:"15px",borderRadius:14,border:"none",background:P,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer"}}>
            Zur Startseite
          </button>
        </div>
      </div>
    </div>
  );

  // ── RESULTS ────────────────────────────────────────────────────────────────
  if(screen==="results"){
    const has=allResponses.bewerber.length>0||allResponses.unternehmen.length>0;
    return(
      <div style={{minHeight:"100vh",background:"#FAFAFA",fontFamily:"system-ui,sans-serif",padding:20}}>
        <div style={{maxWidth:600,margin:"0 auto"}}>
          <div style={{paddingTop:8,marginBottom:20}}>
            <button onClick={()=>setScreen("start")} style={{background:"none",border:"none",color:P,fontSize:14,cursor:"pointer",fontWeight:600}}>← Zurück</button>
          </div>
          <h1 style={{fontSize:24,fontWeight:800,color:"#111827",marginBottom:6}}>Recruiting Gap — Ergebnisse</h1>
          <p style={{color:"#6B7280",fontSize:13,marginBottom:16}}>Durchschnittliche Bewertung der Rating-Fragen pro Phase (Skala 1–5)</p>
          <div style={{display:"flex",gap:12,marginBottom:24}}>
            {[["bewerber",P,PL,"Bewerber:innen"],["unternehmen","#D97706","#FEF3C7","Unternehmen"]].map(([r,c,bg,lbl])=>(
              <div key={r} style={{background:bg,borderRadius:12,padding:"10px 16px",flex:1,textAlign:"center"}}>
                <div style={{fontSize:22,fontWeight:800,color:c}}>{allResponses[r].length}</div>
                <div style={{fontSize:12,color:c,fontWeight:600}}>{lbl}</div>
              </div>
            ))}
          </div>
          {!has?(
            <div style={{textAlign:"center",padding:40,color:"#9CA3AF"}}>
              <div style={{fontSize:40,marginBottom:12}}>📊</div>
              <p>Noch keine Antworten. Sei die Erste!</p>
            </div>
          ):STAGES.map(s=>{
            const b=getAvg(s.id,"bewerber"),u=getAvg(s.id,"unternehmen");
            return(
              <div key={s.id} style={{background:"#fff",borderRadius:16,padding:20,marginBottom:14,boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
                  <span style={{fontSize:20}}>{s.emoji}</span>
                  <h3 style={{fontSize:15,fontWeight:700,color:"#111827",margin:0}}>{s.title}</h3>
                </div>
                {b!==null&&u!==null?<GapBar label={s.title} b={b} u={u}/>:<p style={{color:"#9CA3AF",fontSize:13,margin:0}}>Noch nicht genug Daten für beide Seiten.</p>}
              </div>
            );
          })}
          {has&&(
            <div style={{background:"#fff",borderRadius:16,padding:16,marginBottom:16,boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
              <div style={{display:"flex",gap:20,fontSize:13,marginBottom:6}}>
                <span><span style={{color:P,fontWeight:700}}>●</span> Lila = Bewerber:innen</span>
                <span><span style={{color:"#F59E0B",fontWeight:700}}>●</span> Gelb = Unternehmen</span>
              </div>
              <div style={{fontSize:12,color:"#9CA3AF"}}>
                <span style={{color:"#EF4444",fontWeight:600}}>Rot</span> ≥ 1,5 · <span style={{color:"#F59E0B",fontWeight:600}}>Gelb</span> ≥ 0,8 · <span style={{color:"#10B981",fontWeight:600}}>Grün</span> &lt; 0,8
              </div>
            </div>
          )}
          <button onClick={()=>setScreen("start")} style={{width:"100%",padding:15,borderRadius:14,border:"none",background:P,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",marginBottom:20}}>
            Selbst teilnehmen
          </button>
        </div>
      </div>
    );
  }
  return null;
}
