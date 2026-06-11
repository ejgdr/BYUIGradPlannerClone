/* ============================================================
   Grad Planner - seed data
   Software Engineering BS (BYU-Idaho real program structure).
   Generic full-time student. No real personal data.
   terms: which terms a course is offered. W=Winter, S=Spring, F=Fall
   ============================================================ */

const DEPT = {
  CSE: "Computer Science & Engineering",
  CIT: "Computer Information Technology",
  CS:  "Computer Science",
  ITM: "Computer Information Technology",
  ECEN:"Electrical & Computer Engineering",
  WDD: "Web Design & Development",
  DS:  "Data Science",
  CYBER:"Cybersecurity",
  GESCI:"General Science",
  REL: "Religious Education",
  ENG: "English",
  BUS: "Business",
  MATH:"Mathematics",
  ECON:"Economics",
  HUM: "Humanities",
  ART: "Art",
  COMM:"Communication",
  PSYCH:"Psychology",
  SOC: "Sociology",
  BYUI:"University Foundations",
  GE:  "General Education",
  GS:  "General Studies",
};

// type: ge | major | elective | religion
const CATALOG = [
  /* ---------- University foundations / first semester ---------- */
  { code:"BYUI 101", title:"Experience BYU-Idaho",            cr:1, dept:"BYUI", type:"ge", terms:["W","S","F"], method:"Online" },
  { code:"GE 101",  title:"Growth and Grit",                  cr:1, dept:"GE",  type:"ge", terms:["W","S","F"], method:"Online" },
  { code:"GE 102",  title:"Academic and Emotional Well-Being",cr:1, dept:"GE",  type:"ge", terms:["W","S","F"], method:"Online" },
  { code:"GE 103",  title:"Online University Skills",          cr:1, dept:"GE",  type:"ge", terms:["W","S","F"], method:"Online" },
  { code:"GE 105",  title:"Study and Life Skills",            cr:2, dept:"GE",  type:"ge", terms:["W","S","F"], method:"Online" },
  { code:"GS 100",  title:"Career and Self Discovery",        cr:1, dept:"GS",  type:"ge", terms:["W","S","F"], method:"Online" },

  /* ---------- Religion (Cornerstone) ---------- */
  { code:"REL 200C",title:"The Eternal Family",               cr:2, dept:"REL", type:"religion", terms:["W","S","F"], method:"Online" },
  { code:"REL 225C",title:"Foundations of the Restoration",   cr:2, dept:"REL", type:"religion", terms:["W","S","F"], method:"Online" },
  { code:"REL 250C",title:"Jesus Christ & His Everlasting Gospel",cr:2,dept:"REL",type:"religion",terms:["W","S","F"], method:"Online" },
  { code:"REL 275C",title:"Teachings & Doctrine of the Book of Mormon",cr:2,dept:"REL",type:"religion",terms:["W","S","F"], method:"Online" },
  { code:"REL 121", title:"Book of Mormon I",                 cr:2, dept:"REL", type:"religion", terms:["W","S","F"], method:"Online" },
  { code:"REL 122", title:"Book of Mormon II",                cr:2, dept:"REL", type:"religion", terms:["W","S","F"], method:"Online" },
  { code:"REL 301", title:"The Old Testament",                cr:2, dept:"REL", type:"religion", terms:["W","S","F"], method:"Online" },
  { code:"REL 211", title:"The New Testament I",              cr:2, dept:"REL", type:"religion", terms:["W","S","F"], method:"Online" },
  { code:"REL 324", title:"Doctrine and Covenants I",         cr:2, dept:"REL", type:"religion", terms:["W","S","F"], method:"Online" },

  /* ---------- Quantitative Reasoning ---------- */
  { code:"MATH 108X",title:"Math for the Real World",         cr:3, dept:"MATH",type:"ge", terms:["W","S","F"], method:"Online" },
  { code:"MATH 110X",title:"College Algebra",                 cr:3, dept:"MATH",type:"ge", terms:["W","S","F"], method:"Online" },
  { code:"MATH 112X",title:"Calculus I",                      cr:4, dept:"MATH",type:"ge", terms:["W","S","F"], method:"Online" },
  { code:"MATH 119", title:"Applied Calculus for Data Analysis",cr:4,dept:"MATH",type:"ge", terms:["W","F"],     method:"Online" },
  { code:"MATH 221A",title:"Business Statistics",             cr:3, dept:"MATH",type:"ge", terms:["W","S","F"], method:"Online" },

  /* ---------- Writing ---------- */
  { code:"ENG 150", title:"Writing and Reasoning Foundations",cr:3, dept:"ENG", type:"ge", terms:["W","S","F"], method:"Online" },
  { code:"ENG 301", title:"Advanced Writing and Research",    cr:3, dept:"ENG", type:"ge", terms:["W","S","F"], method:"Online" },
  { code:"BUS 301", title:"Advanced Writing in Professional Contexts",cr:3,dept:"BUS",type:"ge", terms:["W","S","F"], method:"Online" },

  /* ---------- Breadth: Natural Science ---------- */
  { code:"GESCI 201",title:"Natural Disasters",               cr:3, dept:"GESCI",type:"ge", terms:["W","S","F"], method:"Online" },
  { code:"GESCI 203",title:"Environmental Stewardship",       cr:3, dept:"GESCI",type:"ge", terms:["W","S","F"], method:"Online" },
  { code:"GESCI 208",title:"Introduction to Robotics",        cr:3, dept:"GESCI",type:"ge", terms:["W","F"],     method:"Campus" },
  { code:"PH 121",  title:"Principles of Physics I",          cr:3, dept:"GESCI",type:"ge", terms:["W","F"],     method:"Campus" },
  { code:"NUTR 150",title:"Essentials of Human Nutrition",    cr:3, dept:"GESCI",type:"ge", terms:["W","S","F"], method:"Online" },

  /* ---------- Breadth: Arts & Humanities ---------- */
  { code:"HUM 110", title:"Discovery & Discernment Through the Arts",cr:3,dept:"HUM",type:"ge", terms:["W","S","F"], method:"Online" },
  { code:"ART 101", title:"Introduction to the Visual Arts",  cr:3, dept:"ART", type:"ge", terms:["W","S","F"], method:"Online" },
  { code:"ENG 151", title:"Introduction to Literature",       cr:3, dept:"ENG", type:"ge", terms:["W","S","F"], method:"Online" },
  { code:"MUSIC 101",title:"Music and the Humanities",        cr:3, dept:"HUM", type:"ge", terms:["W","S","F"], method:"Online" },
  { code:"PHIL 110",title:"The Search for Wisdom",            cr:3, dept:"HUM", type:"ge", terms:["W","S","F"], method:"Online" },

  /* ---------- Breadth: Social Science ---------- */
  { code:"ECON 150",title:"Economic Principles & Problems-Micro",cr:3,dept:"ECON",type:"ge", terms:["W","S","F"], method:"Online" },
  { code:"PSYCH 111",title:"General Psychology",              cr:3, dept:"PSYCH",type:"ge", terms:["W","S","F"], method:"Online" },
  { code:"SOC 111", title:"Introduction to Sociology",        cr:3, dept:"SOC", type:"ge", terms:["W","S","F"], method:"Online" },
  { code:"GECIV 100",title:"American Heritage",               cr:3, dept:"GE",  type:"ge", terms:["W","S","F"], method:"Online" },
  { code:"HIST 121",title:"U.S. History Since 1877",          cr:3, dept:"GE",  type:"ge", terms:["W","S","F"], method:"Online" },

  /* ---------- First Year Core (major) ---------- */
  { code:"CSE 110", title:"Introduction to Programming",      cr:2, dept:"CSE", type:"major", terms:["W","S","F"], method:"Online" },
  { code:"CSE 111", title:"Programming with Functions",       cr:2, dept:"CSE", type:"major", terms:["W","S","F"], method:"Online" },
  { code:"ECEN 106",title:"Computer Systems",                 cr:2, dept:"ECEN",type:"major", terms:["W","S","F"], method:"Online" },
  { code:"WDD 130", title:"Web Fundamentals",                 cr:2, dept:"WDD", type:"major", terms:["W","S","F"], method:"Online" },
  { code:"WDD 131", title:"Dynamic Web Fundamentals",         cr:2, dept:"WDD", type:"major", terms:["W","S","F"], method:"Online" },
  { code:"CSE 170", title:"Introduction to Technical Teamwork",cr:2,dept:"CSE", type:"major", terms:["W","S","F"], method:"Online" },
  { code:"CSE 199R",title:"Freshman Discovery Project",       cr:2, dept:"CSE", type:"major", terms:["W","S","F"], method:"Online" },

  /* ---------- Core (major) ---------- */
  { code:"CSE 210", title:"Programming with Classes",         cr:2, dept:"CSE", type:"major", terms:["W","S","F"], method:"Online" },
  { code:"CSE 212", title:"Programming with Data Structures", cr:2, dept:"CSE", type:"major", terms:["W","S","F"], method:"Online" },
  { code:"CSE 300", title:"Professional Readiness",           cr:1, dept:"CSE", type:"major", terms:["W","S","F"], method:"Online" },
  { code:"CSE 310", title:"Applied Programming",              cr:3, dept:"CSE", type:"major", terms:["W","S","F"], method:"Online" },
  { code:"CSE 370", title:"Software Engineering Principles",  cr:2, dept:"CSE", type:"major", terms:["W","S","F"], method:"Online" },
  { code:"ITM 220", title:"SQL",                              cr:3, dept:"ITM", type:"major", terms:["W","S","F"], method:"Online" },
  { code:"ITM 350", title:"DevOps",                           cr:3, dept:"ITM", type:"major", terms:["W","S","F"], method:"Online" },

  /* ---------- Specialty: Option 1 Embedded Systems ---------- */
  { code:"CSE 121C",title:"C Language",                       cr:1, dept:"CSE", type:"major", terms:["W","F"],     method:"Online" },
  { code:"ECEN 240",title:"Fundamentals of Digital Systems",  cr:3, dept:"ECEN",type:"major", terms:["W","F"],     method:"Campus" },
  { code:"ECEN 260",title:"Microprocessor Based-System Design",cr:3,dept:"ECEN",type:"major", terms:["W","F"],     method:"Campus" },
  { code:"ECEN 324",title:"Computer Architecture",            cr:3, dept:"ECEN",type:"major", terms:["W","F"],     method:"Campus" },
  { code:"ECEN 361",title:"Embedded Systems",                 cr:3, dept:"ECEN",type:"major", terms:["W","F"],     method:"Campus" },

  /* ---------- Specialty: Option 2 Full Stack Web (chosen path) ---------- */
  { code:"CSE 340", title:"Web Backend Development",          cr:3, dept:"CSE", type:"major", terms:["W","S","F"], method:"Online" },
  { code:"WDD 231", title:"Web Frontend Development I",       cr:2, dept:"WDD", type:"major", terms:["W","S","F"], method:"Online" },
  { code:"WDD 331R",title:"Advanced CSS",                     cr:2, dept:"WDD", type:"major", terms:["W","S","F"], method:"Online" },
  { code:"WDD 360", title:"Full Stack Foundations",           cr:4, dept:"WDD", type:"major", terms:["W","S"],     method:"Online" },
  { code:"WDD 430", title:"Web Full-Stack Development",       cr:3, dept:"WDD", type:"major", terms:["S","F"],     method:"Online" },

  /* ---------- Specialty: Option 3 Software Design ---------- */
  { code:"CSE 130", title:"Algorithm Design",                 cr:2, dept:"CSE", type:"major", terms:["W","S","F"], method:"Online" },
  { code:"CSE 131", title:"Modularization Design",            cr:2, dept:"CSE", type:"major", terms:["W","S","F"], method:"Online" },
  { code:"CSE 230", title:"Encapsulation Design",             cr:3, dept:"CSE", type:"major", terms:["W","S","F"], method:"Online" },
  { code:"CSE 231", title:"Inheritance Design",               cr:2, dept:"CSE", type:"major", terms:["W","F"],     method:"Online" },
  { code:"CSE 232", title:"Designing Data Structures",        cr:2, dept:"CSE", type:"major", terms:["W","F"],     method:"Online" },
  { code:"CSE 331", title:"Design Patterns",                  cr:2, dept:"CSE", type:"major", terms:["S","F"],     method:"Online" },
  { code:"CSE 430", title:"Architectural Design",             cr:2, dept:"CSE", type:"major", terms:["W","F"],     method:"Online" },

  /* ---------- Specialty: Option 4 Software QA ---------- */
  { code:"BUS 309", title:"Project Management",               cr:3, dept:"BUS", type:"major", terms:["W","S","F"], method:"Online" },
  { code:"CSE 270", title:"Software Testing",                 cr:3, dept:"CSE", type:"major", terms:["S","F"],     method:"Online" },
  { code:"CSE 372", title:"Requirements Elicitation",         cr:2, dept:"CSE", type:"major", terms:["W","F"],     method:"Online" },
  { code:"CSE 453", title:"Computer Security",                cr:3, dept:"CSE", type:"major", terms:["W","F"],     method:"Online" },
  { code:"CSE 471", title:"UX Research",                      cr:3, dept:"CSE", type:"major", terms:["W","F"],     method:"Online" },

  /* ---------- Experiential Learning ---------- */
  { code:"CSE 399R",title:"Product Development Project",      cr:2, dept:"CSE", type:"major", terms:["W","S","F"], method:"Online" },
  { code:"CSE 397", title:"Professional Career Project",      cr:3, dept:"CSE", type:"major", terms:["W","S","F"], method:"Online" },
  { code:"CSE 398", title:"Internship",                       cr:1, dept:"CSE", type:"major", terms:["W","S","F"], variable:[1,3], method:"Campus" },

  /* ---------- Senior Project ---------- */
  { code:"CSE 499", title:"Senior Project",                   cr:3, dept:"CSE", type:"major", terms:["W","F"],     method:"Blended" },
  { code:"CSE 499A",title:"Senior Project, Part A",           cr:2, dept:"CSE", type:"major", terms:["W","F"],     method:"Blended" },
  { code:"CSE 499B",title:"Senior Project, Part B",           cr:1, dept:"CSE", type:"major", terms:["S","F"],     method:"Blended" },

  /* ---------- Elective Major / Unspecified Electives ---------- */
  { code:"CSE 341", title:"Web Backend Development II",        cr:3, dept:"CSE", type:"elective", terms:["S","F"],     method:"Online" },
  { code:"CSE 325", title:".NET Software Development",         cr:3, dept:"CSE", type:"elective", terms:["S"],         method:"Online" },
  { code:"CSE 222B",title:"Kotlin Language",                  cr:1, dept:"CSE", type:"elective", terms:["W"],         method:"Online" },
  { code:"CSE 220C",title:"C++ Language",                     cr:1, dept:"CSE", type:"elective", terms:["F"],         method:"Online" },
  { code:"CSE 290R",title:"Special Topics",                   cr:1, dept:"CSE", type:"elective", terms:["W","S","F"], variable:[1,3], method:"Online" },
  { code:"CIT 160", title:"Introduction to Programming",      cr:3, dept:"CIT", type:"elective", terms:["W","S","F"], method:"Online" },
  { code:"CIT 225", title:"Database Design & Development",     cr:3, dept:"CIT", type:"elective", terms:["W","S","F"], method:"Online" },
  { code:"CS 213",  title:"Web Engineering I",                cr:3, dept:"CS",  type:"elective", terms:["W","F"],     method:"Online" },
  { code:"COMM 130",title:"Visual Media",                     cr:3, dept:"COMM",type:"elective", terms:["W","S","F"], method:"Online" },
  { code:"ENG 106L",title:"English Lang & Basic Writing",     cr:5, dept:"ENG", type:"elective", terms:["W","S","F"], method:"Online" },
  { code:"DS 150",  title:"Data Intuition & Insight",         cr:2, dept:"DS",  type:"elective", terms:["W","F"],     method:"Online" },
  { code:"CYBER 201",title:"Foundations of Cybersecurity",    cr:3, dept:"CYBER",type:"elective",terms:["W","F"],     method:"Online" },
];

const byCode = c => CATALOG.find(x => x.code === c);

/* ============================================================
   REQUIREMENTS - mirrors the real BYU-I SE program structure.
   ============================================================ */
const REQUIREMENTS = {
  "General Ed": {
    total: 39,
    subtabs: {
      "First Semester":        { title:"First Semester - College Success", note:"Take 1 of the following:", courses:["BYUI 101","GE 101","GE 102","GE 103","GE 105","GS 100"] },
      "Cornerstone":           { title:"Cornerstone (14 cr)", note:"Take all four, plus 6 more credits of any REL:", courses:["REL 200C","REL 225C","REL 250C","REL 275C","REL 121","REL 122","REL 301","REL 211","REL 324"] },
      "Quantitative Reasoning":{ title:"Quantitative Reasoning", note:"Take 1 of the following:", courses:["MATH 108X","MATH 110X","MATH 112X","MATH 119","MATH 221A"] },
      "Writing":               { title:"Writing", note:"Take ENG 150, plus 1 advanced writing course:", courses:["ENG 150","ENG 301","BUS 301"] },
      "Natural Science":       { title:"Breadth - Natural Science", note:"Take 1 of the following:", courses:["GESCI 201","GESCI 203","GESCI 208","PH 121","NUTR 150"] },
      "Arts & Humanities":     { title:"Breadth - Arts & Humanities", note:"Take 1 of the following:", courses:["HUM 110","ART 101","ENG 151","MUSIC 101","PHIL 110"] },
      "Social Science":        { title:"Breadth - Social Science", note:"Take 1+ of the following (15 cr total breadth):", courses:["ECON 150","PSYCH 111","SOC 111","GECIV 100","HIST 121"] },
    },
  },
  "Degree": {
    total: 58,
    subtabs: {
      "First Year Core":   { title:"First Year Core (14 cr)", note:"Take the following courses:", courses:["CSE 110","CSE 111","ECEN 106","WDD 130","WDD 131","CSE 170","CSE 199R"] },
      "Core":              { title:"Core (16 cr)", note:"Take the following courses:", courses:["CSE 210","CSE 212","CSE 300","CSE 310","CSE 370","ITM 220","ITM 350"] },
      "Specialty":         { title:"Specialty - Full Stack Web Dev (14 cr)", note:"Chosen module (1 of 4 options). Take these courses:", courses:["CSE 340","WDD 231","WDD 331R","WDD 360","WDD 430"] },
      "Experiential":      { title:"Experiential Learning (5 cr)", note:"Take CSE 399R, plus a career project or internship:", courses:["CSE 399R","CSE 397","CSE 398"] },
      "Senior Project":    { title:"Senior Project (3 cr)", note:"Take CSE 499 (or 499A + 499B):", courses:["CSE 499","CSE 499A","CSE 499B"] },
      "Elective Major":    { title:"Elective Major Credits (6 cr)", note:"6 cr from any 300/400-level CSE, CYBER, DS, ECEN, ITM, or WDD course:", courses:["CSE 341","CSE 471","CSE 453","CSE 331","CSE 430","CYBER 201"] },
    },
  },
  "Electives": {
    total: 23,
    subtabs: {
      "Unspecified Electives": { title:"Unspecified Electives (21+ cr)", note:"Any eligible university credits to reach 120 total:", courses:["CIT 160","COMM 130","CSE 270","CSE 131","CSE 230","CIT 225","CS 213","DS 150","CSE 222B","CSE 290R","CSE 220C","ENG 106L"] },
    },
  },
};

/* ============================================================
   INITIAL PLAN - generic full-time student, Fall 2023 start,
   about 12-14 credits per semester (Fall/Winter/Spring year-round).
   Final semester is a full-time internship (3 cr, the SE max).
   120 credits total -> graduates end of Fall 2026.
   ============================================================ */
const INITIAL_PLAN = {
  creditsPerSemester: "12 - 14 credit(s)",
  years: [
    { year:2023, semesters:{ Winter:[], Spring:[], Fall:[
      mk("BYUI 101","registered"), mk("CSE 110","registered"), mk("CSE 170","registered"),
      mk("WDD 130","registered"), mk("MATH 110X","registered"), mk("ENG 150","registered"),
    ] } },                                                       // 13 cr
    { year:2024, semesters:{
      Winter:[ mk("CSE 111","registered"), mk("WDD 131","registered"), mk("ECEN 106","registered"),
        mk("CIT 160","registered"), mk("REL 200C","registered"), mk("REL 225C","registered") ], // 13
      Spring:[ mk("ITM 220","registered"), mk("GESCI 203","registered"), mk("HUM 110","registered"),
        mk("COMM 130","registered") ],                              // 12
      Fall:[ mk("CSE 199R","registered"), mk("ITM 350","registered"), mk("CSE 230","registered"),
        mk("CIT 225","registered"), mk("REL 250C","registered") ],     // 13
    } },
    { year:2025, semesters:{
      Winter:[ mk("CSE 210","registered"), mk("CSE 131","registered"), mk("WDD 231","registered"),
        mk("ECON 150","registered"), mk("REL 122","registered"), mk("REL 275C","registered") ], // 13
      Spring:[ mk("CSE 212","registered"), mk("CSE 340","registered"), mk("WDD 360","registered"),
        mk("GESCI 201","registered"), mk("REL 121","registered") ],    // 14
      Fall:[ mk("CSE 310","registered"), mk("CSE 370","registered"), mk("CSE 300","registered"),
        mk("ENG 301","registered"), mk("DS 150","registered"), mk("PSYCH 111","registered") ], // 14
    } },
    { year:2026, current:true, semesters:{
      Winter:[ mk("CSE 499","registered"), mk("CSE 471","registered"), mk("WDD 331R","registered"),
        mk("CS 213","registered"), mk("CSE 222B","registered") ],      // 12
      Spring:[ mk("CSE 341","registered"), mk("CSE 270","registered"), mk("WDD 430","registered"),
        mk("CSE 399R","registered"), mk("REL 301","registered") ],     // 13
      Fall:[ mk("CSE 398","planned",3) ],   // internship - full-time enrollment, 3 cr (SE max)
    } },
  ],
};

// make a plan-item instance (course code + status + chosen credits)
function mk(code, status, cr){
  const c = byCode(code) || {};
  return { code, status, cr: cr != null ? cr : (c.cr||0), id: code+"-"+Math.random().toString(36).slice(2,7) };
}
