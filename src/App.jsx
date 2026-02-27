import { useState, useEffect, useCallback } from "react";

// ─── REAL 2025 DATA ────────────────────────────────────────────────────────────
const CHAPTERS = [
  {
    id: 1, num: 1,
    title: "Getting Started with SwiftUI",
    subtitle: "Xcode, Views, the basics",
    youtubeUrl: "https://www.youtube.com/watch?v=kCjDulwChRQ",
    readingPdf: "https://cs193p.stanford.edu/sites/g/files/sbiybj16636/files/media/file/2025r1.pdf",
    assignmentPdf: null, assignmentNum: null, zipUrl: null,
    isBoss: false, watchXp: 100, practiceXp: 120,
    syllabus: ["What is SwiftUI and why it matters","Xcode workspace layout","struct View and the body property","Text, Image, Button basics","VStack, HStack, ZStack layout containers","Previews with #Preview macro","View composition — views inside views"],
    flutterKeys: ["VStack→Column","HStack→Row","ZStack→Stack","Text→Text widget","Button→ElevatedButton","struct View→StatelessWidget","body→build()"]
  },
  {
    id: 2, num: 2,
    title: "More SwiftUI Basics",
    subtitle: "View modifiers — start building CodeBreaker",
    youtubeUrl: "https://www.youtube.com/watch?v=63UHypFKRRM",
    readingPdf: null,
    assignmentPdf: "https://cs193p.stanford.edu/sites/g/files/sbiybj16636/files/media/file/2025a1.pdf",
    assignmentNum: 1, zipUrl: null,
    isBoss: true, watchXp: 100, practiceXp: 200,
    syllabus: ["View modifiers — .padding(), .font(), .foregroundColor()","Modifier order matters (important gotcha)","Custom view modifiers","ForEach — iterating over data to build views","LazyVGrid for grid layouts","SF Symbols","First look at CodeBreaker app structure"],
    flutterKeys: [".padding()→Padding widget",".foregroundColor()→TextStyle color","ForEach→ListView.builder / .map()","LazyVGrid→GridView.builder","SF Symbols→Icons class"]
  },
  {
    id: 3, num: 3,
    title: "Model and UI; Swift Type System",
    subtitle: "Separating logic from UI. Swift types deep dive.",
    youtubeUrl: "https://www.youtube.com/watch?v=B42CuI0RO7Y",
    readingPdf: "https://cs193p.stanford.edu/sites/g/files/sbiybj16636/files/media/file/2025r2.pdf",
    assignmentPdf: null, assignmentNum: null, zipUrl: null,
    isBoss: false, watchXp: 100, practiceXp: 120,
    syllabus: ["MVVM — Model / View / ViewModel separation","struct vs class — value vs reference types","enum with associated values","Optionals — the ? and ! operators","Protocols — Swift's version of interfaces","Generics — writing code that works for any type","Swift closures syntax"],
    flutterKeys: ["MVVM→same concept, different wrappers","struct→immutable class / const","enum→enum (Dart has same!)","Optional<T>→T? nullable (Dart same!)","Protocol→abstract class","Generics→Generics (same concept!)","Closure→anonymous function / lambda"]
  },
  {
    id: 4, num: 4,
    title: "Building CodeBreaker's Model",
    subtitle: "@State, Optionals, onTapGesture — the app becomes playable",
    youtubeUrl: "https://www.youtube.com/watch?v=IvOF3Bmk-94",
    readingPdf: null,
    assignmentPdf: "https://cs193p.stanford.edu/sites/g/files/sbiybj16636/files/media/file/2025a2.pdf",
    assignmentNum: 2, zipUrl: null,
    isBoss: true, watchXp: 100, practiceXp: 200,
    syllabus: ["@State — local mutable state in a View","@ObservableObject / @Observable macro","Connecting Model to View via ViewModel","onTapGesture and user interaction","Optionals in practice — guard, if let","Building CodeBreaker's game logic","Making the app actually playable 🎉"],
    flutterKeys: ["@State→setState() / useState","@Observable→ChangeNotifier","ViewModel→ChangeNotifier + notifyListeners()","onTapGesture→GestureDetector.onTap","guard let→early return pattern","if let→null-safety checks in Dart"]
  },
  {
    id: 5, num: 5,
    title: "Layout & Data Flow",
    subtitle: "How SwiftUI sizes views. Data flowing through your app.",
    youtubeUrl: "https://www.youtube.com/watch?v=u6cgk1W6EXE",
    readingPdf: null, assignmentPdf: null, assignmentNum: null, zipUrl: null,
    isBoss: false, watchXp: 100, practiceXp: 120,
    syllabus: ["The layout algorithm — offer, size, place","GeometryReader for custom sizing",".frame() modifier in depth","Spacer — flexible spacing","@Binding — two-way data connection","Data flow: @State → @Binding → @ObservedObject","Functional programming basics in Swift","map, filter, reduce on collections"],
    flutterKeys: [".frame()→SizedBox / Container","GeometryReader→LayoutBuilder","Spacer→Spacer / Expanded","@Binding→passing callbacks / ValueNotifier","map/filter/reduce→same in Dart!","@ObservedObject→Consumer (Provider) / ref.watch (Riverpod)"]
  },
  {
    id: 6, num: 6,
    title: "Data Flow Demonstration",
    subtitle: "Watch data travel from Model → ViewModel → View → View",
    youtubeUrl: "https://www.youtube.com/watch?v=tvVj6MSBhBA",
    readingPdf: null,
    assignmentPdf: "https://cs193p.stanford.edu/sites/g/files/sbiybj16636/files/media/file/2025a3.pdf",
    assignmentNum: 3,
    zipUrl: "https://web.stanford.edu/class/cs193p/Spring2025/CodeBreakerL6.zip",
    isBoss: true, watchXp: 100, practiceXp: 200,
    syllabus: ["Full data flow walkthrough with CodeBreaker","How @Binding passes state into child views","Single source of truth principle","Passing data between sibling views","EnvironmentObject for app-wide state","Debugging state issues","Code review: CodeBreaker at lecture 6"],
    flutterKeys: ["Single source of truth→same principle!","@EnvironmentObject→Provider / InheritedWidget","Sibling data sharing→lifting state up (same!)","Debugging state→Flutter DevTools equivalent"]
  },
  {
    id: 7, num: 7,
    title: "Generics & Views; Animation",
    subtitle: "@ViewBuilder, @Binding in init, Animation theory",
    youtubeUrl: "https://www.youtube.com/watch?v=RYemrq0e7KM",
    readingPdf: "https://cs193p.stanford.edu/sites/g/files/sbiybj16636/files/media/file/2025r3.pdf",
    assignmentPdf: null, assignmentNum: null,
    zipUrl: "https://web.stanford.edu/class/cs193p/Spring2025/CodeBreakerL7.zip",
    isBoss: false, watchXp: 100, practiceXp: 120,
    syllabus: ["@ViewBuilder — how VStack/HStack accept content","Writing your own @ViewBuilder functions","Passing @Binding into a View's init","Generic Views — View that works with any type","Animation fundamentals — what SwiftUI animates","implicit vs explicit animation","withAnimation { } block","Animation curves and durations"],
    flutterKeys: ["@ViewBuilder→builder pattern in Flutter","Generic View→Generic Widget","withAnimation→AnimationController / AnimatedBuilder","Implicit animation→AnimatedContainer / TweenAnimationBuilder","Explicit animation→AnimationController","Animation curves→Curves class in Flutter"]
  },
  {
    id: 8, num: 8,
    title: "Animation Demonstration",
    subtitle: "Actually animating CodeBreaker — see it in practice",
    youtubeUrl: "https://www.youtube.com/watch?v=OZK7_p1G8Pw",
    readingPdf: null, assignmentPdf: null, assignmentNum: null,
    zipUrl: "https://web.stanford.edu/class/cs193p/Spring2025/CodeBreakerL8.zip",
    isBoss: false, watchXp: 100, practiceXp: 120,
    syllabus: ["Applying withAnimation to CodeBreaker","Card flip animation using rotation3DEffect","Animating color transitions",".transition() — views appearing and disappearing","matchedGeometryEffect for hero animations","Animation debugging tips","Building satisfying micro-interactions"],
    flutterKeys: ["rotation3DEffect→Transform.rotate","Card flip→AnimatedSwitcher trick","Hero animation→Hero widget","transition→AnimatedSwitcher / PageRouteBuilder",".opacity animation→FadeTransition","matchedGeometryEffect→Hero widget (similar concept)"]
  },
  {
    id: 9, num: 9,
    title: "Elapsed Time & Protocols",
    subtitle: "Real-time UI. Protocols as a design pattern.",
    youtubeUrl: "https://www.youtube.com/watch?v=o3D3rqh-IVA",
    readingPdf: null, assignmentPdf: null, assignmentNum: null,
    zipUrl: "https://web.stanford.edu/class/cs193p/Spring2025/CodeBreakerL9.zip",
    isBoss: false, watchXp: 100, practiceXp: 120,
    syllabus: ["TimelineView — views that update over time","Displaying elapsed time cleanly","Protocol deep dive — Equatable, Hashable, Identifiable","Protocol conformance — how and why","Protocol as a type (existentials)","Writing your own protocols","Extensions — adding functionality without subclassing"],
    flutterKeys: ["TimelineView→Stream / Timer.periodic","Equatable→== operator override in Dart","Hashable→hashCode override","Identifiable→using key in ListView","Protocol→abstract class / interface","Extensions→Dart extension methods (same concept!)"]
  },
  {
    id: 10, num: 10,
    title: "List and Navigation",
    subtitle: "Multiple games. NavigationStack. ForEach with Identifiable.",
    youtubeUrl: "https://www.youtube.com/watch?v=NnJ91M9PRYo",
    readingPdf: null,
    assignmentPdf: "https://cs193p.stanford.edu/sites/g/files/sbiybj16636/files/media/file/2025a4.pdf",
    assignmentNum: 4,
    zipUrl: "https://web.stanford.edu/class/cs193p/Spring2025/CodeBreakerL10.zip",
    isBoss: true, watchXp: 100, practiceXp: 200,
    syllabus: ["List view — SwiftUI's table/list","NavigationStack — push/pop navigation","NavigationLink — tappable navigation triggers","Swipe to delete in List","ForEach with Identifiable protocol","@Environment for system values","Toolbar and navigation bar buttons","Multiple screen app architecture"],
    flutterKeys: ["List→ListView","NavigationStack→Navigator / GoRouter","NavigationLink→ListTile + Navigator.push","Swipe to delete→Dismissible widget","Toolbar→AppBar actions","@Environment→MediaQuery / Theme.of(context)","Multi-screen→same Navigator concept!"]
  },
  {
    id: 11, num: 11,
    title: "iPad & Sheets",
    subtitle: "Adaptive layouts. Modal sheets. Editing UI.",
    youtubeUrl: "https://www.youtube.com/watch?v=PXcl5cjVNT0",
    readingPdf: "https://cs193p.stanford.edu/sites/g/files/sbiybj16636/files/media/file/2025r4_0.pdf",
    assignmentPdf: null, assignmentNum: null,
    zipUrl: "https://web.stanford.edu/class/cs193p/Spring2025/CodeBreakerL11.zip",
    isBoss: false, watchXp: 100, practiceXp: 120,
    syllabus: ["NavigationSplitView — sidebar + detail (iPad)","Adaptive layouts for iPhone and iPad","sheet() modifier — modal presentation","@Environment(\.dismiss) — dismissing views","Form and Section for settings UI","ColorPicker built-in SwiftUI view","TextField for text input","Designing for multiple screen sizes"],
    flutterKeys: ["NavigationSplitView→adaptive_layout package","sheet()→showModalBottomSheet","dismiss→Navigator.pop()","Form→Form widget in Flutter","ColorPicker→flutter_colorpicker package","TextField→TextField widget (same name!)","Adaptive layout→LayoutBuilder + breakpoints"]
  },
  {
    id: 12, num: 12,
    title: "CodeBreaker Editor",
    subtitle: "Full edit flow. Sheets talking back to parent views.",
    youtubeUrl: "https://www.youtube.com/watch?v=gNok5P7HLCw",
    readingPdf: null, assignmentPdf: null, assignmentNum: null,
    zipUrl: "https://web.stanford.edu/class/cs193p/Spring2025/CodeBreakerL12.zip",
    isBoss: false, watchXp: 100, practiceXp: 120,
    syllabus: ["Building a full edit UI for CodeBreaker games","Editing existing vs creating new — same view","Passing data into a sheet and getting it back","Cancel vs save patterns","@Binding in complex editing flows","Confirmation dialogs","Clean MVVM with editing","UX patterns for edit screens"],
    flutterKeys: ["Edit sheet pattern→showDialog / showModalBottomSheet","Cancel/save→AlertDialog with actions","@Binding in edit forms→same callback pattern","Confirmation dialog→showDialog + AlertDialog"]
  },
  {
    id: 13, num: 13,
    title: "SwiftData",
    subtitle: "Persist your games to a real database. @Model.",
    youtubeUrl: "https://www.youtube.com/watch?v=k9wjAdgUY0A",
    readingPdf: null, assignmentPdf: null, assignmentNum: null,
    zipUrl: "https://web.stanford.edu/class/cs193p/Spring2025/CodeBreakerL13.zip",
    isBoss: false, watchXp: 100, practiceXp: 120,
    syllabus: ["SwiftData — Apple's ORM framework","@Model macro — making a class persistable","@Relationship — foreign keys / relationships","ModelContainer setup","ModelContext — your DB connection","FetchDescriptor — querying data","#Predicate — type-safe query filters","Migrations — evolving your schema"],
    flutterKeys: ["SwiftData→Isar / Drift / sqflite","@Model→@collection (Isar) / @DataClassName (Drift)","ModelContainer→IsarCollection / Database","ModelContext→Isar instance","FetchDescriptor→QueryBuilder","#Predicate→.filter() in Isar","Migrations→Isar schema versions / Drift migrations"]
  },
  {
    id: 14, num: 14,
    title: "More SwiftData",
    subtitle: "Complex queries. Persistence between launches. #Preview with DB.",
    youtubeUrl: "https://www.youtube.com/watch?v=1PDZl0LPryw",
    readingPdf: null,
    assignmentPdf: "https://cs193p.stanford.edu/sites/g/files/sbiybj16636/files/media/file/2025a5.pdf",
    assignmentNum: 5,
    zipUrl: "https://web.stanford.edu/class/cs193p/Spring2025/CodeBreakerL14.zip",
    isBoss: true, watchXp: 100, practiceXp: 200,
    syllabus: ["Complex #Predicates — searching and filtering","Sorting query results","Persistence between app launches","@Query — live updating views from DB","Searching through SwiftData models","How to #Preview views that need a DB","Reactivity — views updating when DB changes","Performance considerations"],
    flutterKeys: ["@Query→StreamBuilder with Isar watch()","Live DB updates→Isar .watch() / Drift streams","Search/filter→same .filter() builder","Testing with DB→using in-memory DB in tests","Reactive DB views→StreamBuilder pattern"]
  },
  {
    id: 15, num: 15,
    title: "More SwiftData & Multithreading",
    subtitle: "Complex predicates. async/await. Background work.",
    youtubeUrl: "https://www.youtube.com/watch?v=F0nefFT2Uik",
    readingPdf: null, assignmentPdf: null, assignmentNum: null,
    zipUrl: "https://web.stanford.edu/class/cs193p/Spring2025/CodeBreakerL15.zip",
    isBoss: false, watchXp: 100, practiceXp: 120,
    syllabus: ["Advanced #Predicates with relationships","Reacting to database saves with NotificationCenter","Multithreading fundamentals","async / await in Swift","@MainActor — running on the main thread","Task { } — creating async work","Structured concurrency basics","Why UI must stay on main thread"],
    flutterKeys: ["async/await→async/await in Dart (identical!)","@MainActor→runOnUiThread / main isolate","Task { }→Future / compute() / Isolate","Background work→Isolate.run()","NotificationCenter→EventBus / Stream","Main thread UI rule→same in Flutter!"]
  },
  {
    id: 16, num: 16,
    title: "Final Project Miscellany",
    subtitle: "Custom shapes. GeometryReader. Multitouch. Alternative persistence.",
    youtubeUrl: "https://www.youtube.com/watch?v=skECWIKpBVY",
    readingPdf: null, assignmentPdf: null, assignmentNum: null,
    zipUrl: "https://web.stanford.edu/class/cs193p/Spring2025/CodeBreakerL16.zip",
    isBoss: false, watchXp: 100, practiceXp: 150,
    syllabus: ["Custom Shape protocol — draw anything","Path — bezier curves in SwiftUI","GeometryReader — size-aware layouts","DragGesture and MagnifyGesture","Multitouch handling","UserDefaults — simple key-value persistence","FileManager — file-based persistence","Codable — JSON encoding/decoding"],
    flutterKeys: ["Custom Shape→CustomPainter","Path→Path class in Flutter (identical concept!)","GeometryReader→LayoutBuilder","DragGesture→GestureDetector.onPanUpdate","Pinch/zoom→GestureDetector.onScaleUpdate","UserDefaults→SharedPreferences","FileManager→path_provider + dart:io","Codable→json_serializable / freezed"]
  }
];

// ─── FLUTTER REFERENCE (full map) ─────────────────────────────────────────────
const FLUTTER_MAP = [
  { category: "Layout", items: [
    { swift: "VStack", flutter: "Column", note: "vertical arrangement" },
    { swift: "HStack", flutter: "Row", note: "horizontal arrangement" },
    { swift: "ZStack", flutter: "Stack", note: "overlapping children" },
    { swift: "Spacer", flutter: "Spacer / Expanded", note: "fills available space" },
    { swift: ".frame(width:height:)", flutter: "SizedBox / Container", note: "fixed dimensions" },
    { swift: "GeometryReader", flutter: "LayoutBuilder", note: "know your size at build time" },
    { swift: "LazyVGrid", flutter: "GridView.builder", note: "lazy grid of items" },
    { swift: "LazyVStack", flutter: "ListView.builder", note: "lazy vertical list" },
    { swift: ".padding()", flutter: "Padding widget", note: "exact same concept" },
  ]},
  { category: "Views & Widgets", items: [
    { swift: "struct View", flutter: "StatelessWidget", note: "your basic building block" },
    { swift: "body: some View", flutter: "build() → Widget", note: "return your UI here" },
    { swift: "Text", flutter: "Text", note: "identical name, similar API" },
    { swift: "Image", flutter: "Image", note: "similar, different asset loading" },
    { swift: "Button", flutter: "ElevatedButton / TextButton / IconButton", note: "Flutter splits by style" },
    { swift: "List", flutter: "ListView", note: "scrollable list of items" },
    { swift: "ForEach", flutter: ".map().toList() / ListView.builder", note: "iterate over data → views" },
    { swift: "TextField", flutter: "TextField", note: "same name!" },
    { swift: "Toggle", flutter: "Switch", note: "on/off boolean" },
    { swift: "Slider", flutter: "Slider", note: "same name!" },
    { swift: "TabView", flutter: "BottomNavigationBar / TabBar", note: "Flutter separates bar from body" },
    { swift: "Form + Section", flutter: "Form + Column of inputs", note: "Flutter Form is more manual" },
    { swift: "#Preview", flutter: "Flutter widget tests / Storybook", note: "no direct equivalent" },
  ]},
  { category: "State Management", items: [
    { swift: "@State", flutter: "setState() / useState()", note: "local mutable state" },
    { swift: "@Binding", flutter: "passing callbacks / ValueNotifier", note: "two-way data connection" },
    { swift: "@StateObject", flutter: "Provider / Riverpod StateNotifier", note: "own your ViewModel" },
    { swift: "@ObservedObject", flutter: "Consumer / ref.watch()", note: "observe someone else's VM" },
    { swift: "@EnvironmentObject", flutter: "Provider.of(context) / ref.read()", note: "app-wide shared state" },
    { swift: "@Observable macro", flutter: "ChangeNotifier", note: "reactive objects" },
    { swift: "notifyListeners()", flutter: "notifyListeners()", note: "literally identical!" },
    { swift: "@AppStorage", flutter: "SharedPreferences", note: "simple key-value storage" },
  ]},
  { category: "Navigation", items: [
    { swift: "NavigationStack", flutter: "Navigator / GoRouter", note: "push/pop stack" },
    { swift: "NavigationLink", flutter: "GestureDetector + Navigator.push()", note: "Flutter is more explicit" },
    { swift: "NavigationSplitView", flutter: "adaptive_layout / NavigationRail", note: "sidebar layouts" },
    { swift: ".sheet()", flutter: "showModalBottomSheet()", note: "modal overlay" },
    { swift: ".alert()", flutter: "showDialog()", note: "system alert" },
    { swift: "@Environment(\\.dismiss)", flutter: "Navigator.pop()", note: "go back" },
    { swift: ".toolbar { }", flutter: "AppBar actions: []", note: "nav bar buttons" },
  ]},
  { category: "Animation", items: [
    { swift: "withAnimation { }", flutter: "setState() inside AnimationController", note: "trigger implicit animation" },
    { swift: "AnimatedContainer / implicit", flutter: "AnimatedContainer", note: "same name, same idea!" },
    { swift: ".animation(.easeIn)", flutter: "TweenAnimationBuilder / CurvedAnimation", note: "Flutter more explicit" },
    { swift: ".transition(.slide)", flutter: "SlideTransition / AnimatedSwitcher", note: "enter/exit animations" },
    { swift: "rotation3DEffect", flutter: "Transform.rotate / Matrix4", note: "3D transforms" },
    { swift: "matchedGeometryEffect", flutter: "Hero widget", note: "shared element transition" },
    { swift: "Animation curves", flutter: "Curves class", note: "easeIn, easeOut — same names!" },
  ]},
  { category: "Swift Language vs Dart", items: [
    { swift: "Optional (T?)", flutter: "Nullable type (T?)", note: "same syntax! both use ?" },
    { swift: "async / await", flutter: "async / await", note: "IDENTICAL — Dart copied Swift here" },
    { swift: "enum with associated values", flutter: "sealed class / freezed union", note: "Dart enums are simpler, use sealed for this" },
    { swift: "Protocol", flutter: "abstract class / interface", note: "same concept, different keyword" },
    { swift: "Generics <T>", flutter: "Generics <T>", note: "identical syntax!" },
    { swift: "Extension", flutter: "Extension method (Dart same!)", note: "add methods to existing types" },
    { swift: "struct (value type)", flutter: "class (Dart has no structs)", note: "use const constructors for immutability" },
    { swift: "Closure { }", flutter: "Anonymous function () { }", note: "same concept, slightly different syntax" },
    { swift: "guard let / if let", flutter: "null check / if (x != null)", note: "Swift's syntax is cleaner tbh" },
    { swift: "Codable", flutter: "json_serializable / jsonDecode()", note: "JSON serialization" },
  ]},
  { category: "Persistence", items: [
    { swift: "SwiftData @Model", flutter: "Isar @collection / Drift @DataClassName", note: "ORM / local database" },
    { swift: "UserDefaults", flutter: "SharedPreferences", note: "key-value storage" },
    { swift: "FileManager", flutter: "path_provider + dart:io File", note: "file system access" },
    { swift: "Codable (JSON)", flutter: "json_serializable", note: "encoding/decoding objects" },
    { swift: "#Predicate query filter", flutter: ".filter() in Isar / WHERE in Drift", note: "query your database" },
  ]},
];

// ─── CONSTANTS ─────────────────────────────────────────────────────────────────
const CAMPAIGN_START = new Date(2026, 1, 27); // Feb 27 2026
const WEEKS_PER_CHAPTER = 2;
const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

function chapterStartDate(chapterId) {
  const d = new Date(CAMPAIGN_START);
  d.setTime(d.getTime() + (chapterId - 1) * WEEKS_PER_CHAPTER * MS_PER_WEEK);
  return d;
}
function chapterEndDate(chapterId) {
  const d = chapterStartDate(chapterId);
  d.setTime(d.getTime() + WEEKS_PER_CHAPTER * MS_PER_WEEK - 1);
  return d;
}
function fmt(date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
function currentChapterId() {
  const now = new Date();
  for (let i = 1; i <= 16; i++) {
    if (now <= chapterEndDate(i)) return i;
  }
  return 16;
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [gs, setGs] = useState(null); // gameState
  const [tab, setTab] = useState("chapters");
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [flutterFilter, setFlutterFilter] = useState("All");
  const [justPopped, setJustPopped] = useState(null);
  const [loading, setLoading] = useState(true);
  const activeChapterId = currentChapterId();

  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get("cs193p-v2");
        if (r) setGs(JSON.parse(r.value));
        else setGs({ phases: {}, xp: 0, journal: [] });
      } catch { setGs({ phases: {}, xp: 0, journal: [] }); }
      setLoading(false);
    })();
  }, []);

  const save = useCallback(async (state) => {
    await window.storage.set("cs193p-v2", JSON.stringify(state));
  }, []);

  const completePhase = useCallback(async (chapterId, phase) => {
    const key = `${chapterId}-${phase}`;
    if (gs.phases[key]) return;
    const ch = CHAPTERS[chapterId - 1];
    const xpGain = phase === "watch" ? ch.watchXp : ch.practiceXp;
    const newPhases = { ...gs.phases, [key]: new Date().toISOString() };
    const bothDone = newPhases[`${chapterId}-watch`] && newPhases[`${chapterId}-practice`];
    let newJournal = gs.journal;
    if (bothDone && !gs.journal.find(j => j.chapterId === chapterId)) {
      newJournal = [...gs.journal, {
        chapterId,
        date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        title: ch.title,
        isBoss: ch.isBoss,
        assignmentNum: ch.assignmentNum,
      }];
    }
    const newGs = { ...gs, phases: newPhases, xp: gs.xp + xpGain, journal: newJournal };
    setGs(newGs);
    await save(newGs);
    setJustPopped({ xp: xpGain, boss: phase === "practice" && ch.isBoss });
    setTimeout(() => setJustPopped(null), 2200);
  }, [gs, save]);

  if (loading) return (
    <div style={{ background: "#08090f", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", color: "#4af", fontSize: 13, letterSpacing: "0.3em" }}>
      LOADING...
    </div>
  );

  const level = Math.floor(gs.xp / 400);
  const levelTitles = ["iOS Newbie", "Swift Dabbler", "View Builder", "State Wrangler", "Data Architect", "Animation Wizard", "SwiftData Sage", "iOS Engineer", "Apple Dev", "Stanford Graduate"];
  const levelTitle = levelTitles[Math.min(level, levelTitles.length - 1)];
  const xpInLevel = gs.xp % 400;
  const completedChapters = CHAPTERS.filter(ch => gs.phases[`${ch.id}-watch`] && gs.phases[`${ch.id}-practice`]).length;
  const endDate = chapterEndDate(16);
  const flutterCategories = ["All", ...FLUTTER_MAP.map(g => g.category)];
  const filteredMap = flutterFilter === "All" ? FLUTTER_MAP : FLUTTER_MAP.filter(g => g.category === flutterFilter);

  const S = styles();

  return (
    <>
      <style>{S}</style>
      <div className="app">
        <div className="noise" />

        {justPopped && (
          <div className={`xp-pop ${justPopped.boss ? "boss-pop" : ""}`}>
            {justPopped.boss ? "⚔ BOSS CLEARED" : `+${justPopped.xp} XP`}
          </div>
        )}

        {/* HEADER */}
        <div className="header">
          <div>
            <div className="logo">CS193P / 2025</div>
            <div className="logo-sub">Stanford iOS — CodeBreaker Campaign</div>
          </div>
          <div className="hud">
            <div className="hud-stat">
              <div className="hud-val cyan">{level}</div>
              <div className="hud-lbl">{levelTitle}</div>
            </div>
            <div className="xp-mini">
              <div className="xp-mini-top">
                <span className="hud-lbl">XP</span>
                <span className="hud-lbl cyan">{gs.xp}</span>
              </div>
              <div className="bar-track sm"><div className="bar-fill" style={{ width: `${(xpInLevel / 400) * 100}%` }} /></div>
            </div>
            <div className="hud-stat">
              <div className="hud-val green">{completedChapters}/16</div>
              <div className="hud-lbl">chapters</div>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="tabs">
          {[["chapters","CHAPTERS"],["timeline","TIMELINE"],["flutter","FLUTTER MAP"],["journal","JOURNAL"]].map(([k,l]) => (
            <button key={k} className={`tab ${tab===k?"active":""}`} onClick={() => { setTab(k); setSelectedChapter(null); }}>{l}</button>
          ))}
        </div>

        <div className="content">

          {/* ── CHAPTERS TAB ─────────────────────────────────────────────────── */}
          {tab === "chapters" && !selectedChapter && (
            <div>
              <div className="section-header">
                <span>16 LECTURES · 2 WEEKS EACH · ENDS {fmt(endDate).toUpperCase()}, 2026</span>
              </div>
              <div className="chapter-grid">
                {CHAPTERS.map(ch => {
                  const watchDone = !!gs.phases[`${ch.id}-watch`];
                  const pracDone = !!gs.phases[`${ch.id}-practice`];
                  const bothDone = watchDone && pracDone;
                  const isActive = ch.id === activeChapterId;
                  const isLocked = ch.id > activeChapterId + 1;
                  return (
                    <div
                      key={ch.id}
                      className={`chapter-card ${bothDone?"done":""} ${isActive?"active":""} ${ch.isBoss?"boss":""}`}
                      onClick={() => setSelectedChapter(ch)}
                    >
                      {ch.isBoss && <div className="boss-tag">⚔ ASSIGNMENT {ch.assignmentNum}</div>}
                      {isActive && !bothDone && <div className="active-tag">◄ NOW</div>}
                      <div className="ch-num">L{ch.num}</div>
                      <div className="ch-title">{ch.title}</div>
                      <div className="ch-sub">{ch.subtitle}</div>
                      <div className="ch-phases">
                        <div className={`phase-dot ${watchDone?"filled":""}`}>▶ WATCH</div>
                        <div className={`phase-dot ${pracDone?"filled":""}`}>{ch.isBoss?"⚔":"⚡"} {ch.isBoss?"ASSIGNMENT":"PRACTICE"}</div>
                      </div>
                      <div className="ch-dates">{fmt(chapterStartDate(ch.id))} → {fmt(chapterEndDate(ch.id))}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── CHAPTER DETAIL ────────────────────────────────────────────────── */}
          {tab === "chapters" && selectedChapter && (() => {
            const ch = selectedChapter;
            const watchDone = !!gs.phases[`${ch.id}-watch`];
            const pracDone = !!gs.phases[`${ch.id}-practice`];
            const relevantMaps = FLUTTER_MAP.flatMap(g => g.items.filter(item => ch.flutterKeys.some(k => k.startsWith(item.swift))));
            return (
              <div>
                <button className="back-btn" onClick={() => setSelectedChapter(null)}>← back to chapters</button>
                {ch.isBoss && <div className="boss-banner">⚔ BOSS CHAPTER — PROGRAMMING ASSIGNMENT {ch.assignmentNum}</div>}
                <div className="detail-header">
                  <div className="detail-num">L{ch.num}</div>
                  <div>
                    <div className="detail-title">{ch.title}</div>
                    <div className="detail-sub">{ch.subtitle}</div>
                    <div className="detail-dates">{fmt(chapterStartDate(ch.id))} → {fmt(chapterEndDate(ch.id))}</div>
                  </div>
                </div>

                {/* WEEK 1 */}
                <div className="phase-panel">
                  <div className="phase-header">
                    <span className="phase-label cyan">WEEK 1 — WATCH</span>
                    <span className="phase-xp">+{ch.watchXp} XP</span>
                  </div>
                  <p className="phase-desc">Watch the lecture. Build alongside Paul Hegarty. Take notes.</p>
                  <div className="link-row">
                    <a href={ch.youtubeUrl} target="_blank" rel="noreferrer" className="link-btn red">▶ WATCH ON YOUTUBE</a>
                    {ch.readingPdf && <a href={ch.readingPdf} target="_blank" rel="noreferrer" className="link-btn dim">📄 READING PDF</a>}
                  </div>
                  <button className={`complete-btn ${watchDone?"done":""}`} onClick={() => completePhase(ch.id, "watch")} disabled={watchDone}>
                    {watchDone ? "✓ LECTURE WATCHED" : "MARK LECTURE WATCHED →"}
                  </button>
                </div>

                {/* WEEK 2 */}
                <div className="phase-panel">
                  <div className="phase-header">
                    <span className={`phase-label ${ch.isBoss?"orange":"green"}`}>WEEK 2 — {ch.isBoss?"BOSS FIGHT":"PRACTICE"}</span>
                    <span className="phase-xp">+{ch.practiceXp} XP</span>
                  </div>
                  <p className="phase-desc">{ch.isBoss ? `Complete Programming Assignment ${ch.assignmentNum}. This is a real deliverable — don't skip it.` : "Code along with the demo. Try the concepts yourself. Compare with the starter code."}</p>
                  <div className="link-row">
                    {ch.assignmentPdf && <a href={ch.assignmentPdf} target="_blank" rel="noreferrer" className="link-btn orange">⚔ ASSIGNMENT PDF</a>}
                    {ch.zipUrl && <a href={ch.zipUrl} target="_blank" rel="noreferrer" className="link-btn dim">💾 STARTER CODE</a>}
                  </div>
                  <button className={`complete-btn ${ch.isBoss?"boss-btn":""} ${pracDone?"done":""}`} onClick={() => completePhase(ch.id, "practice")} disabled={pracDone}>
                    {pracDone ? (ch.isBoss ? "⚔ BOSS DEFEATED" : "✓ PRACTICE DONE") : (ch.isBoss ? `⚔ SUBMIT ASSIGNMENT ${ch.assignmentNum} →` : "MARK PRACTICE DONE →")}
                  </button>
                </div>

                {/* SYLLABUS */}
                <div className="phase-panel">
                  <div className="phase-label cyan" style={{marginBottom:14}}>WHAT YOU'LL LEARN</div>
                  {ch.syllabus.map((s,i) => (
                    <div key={i} className="syllabus-item">
                      <span className="syllabus-dot">◆</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>

                {/* FLUTTER MAPPER */}
                <div className="phase-panel">
                  <div className="phase-label orange" style={{marginBottom:14}}>FLUTTER MAPPER — THIS CHAPTER</div>
                  {relevantMaps.length ? relevantMaps.map((item,i) => (
                    <div key={i} className="map-row">
                      <span className="map-swift">{item.swift}</span>
                      <span className="map-arrow">→</span>
                      <span className="map-flutter">{item.flutter}</span>
                      <span className="map-note">{item.note}</span>
                    </div>
                  )) : <p className="dim-text">general concepts — check the Flutter Map tab for full reference</p>}
                </div>
              </div>
            );
          })()}

          {/* ── TIMELINE TAB ─────────────────────────────────────────────────── */}
          {tab === "timeline" && (
            <div>
              <div className="section-header">
                <span>START: FEB 27, 2026 · END: {fmt(endDate).toUpperCase()}, 2026 · 32 WEEKS</span>
              </div>
              <div className="timeline-wrap">
                {CHAPTERS.map(ch => {
                  const watchDone = !!gs.phases[`${ch.id}-watch`];
                  const pracDone = !!gs.phases[`${ch.id}-practice`];
                  const bothDone = watchDone && pracDone;
                  const isActive = ch.id === activeChapterId;
                  return (
                    <div key={ch.id} className={`timeline-row ${isActive?"tl-active":""} ${bothDone?"tl-done":""}`}>
                      <div className="tl-indicator">
                        <div className={`tl-dot ${bothDone?"tl-dot-done":isActive?"tl-dot-active":""}`} />
                        {ch.id < 16 && <div className="tl-line" />}
                      </div>
                      <div className="tl-content" onClick={() => { setTab("chapters"); setSelectedChapter(ch); }}>
                        <div className="tl-top">
                          <span className="tl-num">L{ch.num}</span>
                          {ch.isBoss && <span className="tl-boss-tag">⚔ A{ch.assignmentNum}</span>}
                          {isActive && <span className="tl-now">← YOU ARE HERE</span>}
                          <span className="tl-dates">{fmt(chapterStartDate(ch.id))} – {fmt(chapterEndDate(ch.id))}</span>
                        </div>
                        <div className="tl-title">{ch.title}</div>
                        <div className="tl-phases">
                          <div className="tl-week">
                            <div className={`tl-phase-bar ${watchDone?"bar-watch-done":isActive?"bar-active":""}`} />
                            <span className="tl-week-label">wk1 watch</span>
                          </div>
                          <div className="tl-week">
                            <div className={`tl-phase-bar ${pracDone?"bar-prac-done":""}`} />
                            <span className="tl-week-label">wk2 {ch.isBoss?"assignment":"practice"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── FLUTTER MAP TAB ───────────────────────────────────────────────── */}
          {tab === "flutter" && (
            <div>
              <div className="section-header">SWIFTUI → FLUTTER FULL REFERENCE</div>
              <div className="filter-row">
                {flutterCategories.map(c => (
                  <button key={c} className={`filter-btn ${flutterFilter===c?"active":""}`} onClick={() => setFlutterFilter(c)}>{c}</button>
                ))}
              </div>
              {filteredMap.map(group => (
                <div key={group.category} className="map-group">
                  <div className="map-group-title">{group.category}</div>
                  {group.items.map((item,i) => (
                    <div key={i} className="map-row-full">
                      <div className="map-row-top">
                        <span className="map-swift">{item.swift}</span>
                        <span className="map-arrow-big">→</span>
                        <span className="map-flutter">{item.flutter}</span>
                      </div>
                      <div className="map-note-full">{item.note}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* ── JOURNAL TAB ──────────────────────────────────────────────────── */}
          {tab === "journal" && (
            <div>
              <div className="section-header">YOUR iOS LEARNING JOURNEY</div>
              {gs.journal.length === 0 ? (
                <div className="empty-journal">
                  <div className="empty-icon">◇</div>
                  <div className="empty-title">no entries yet</div>
                  <div className="empty-sub">complete your first chapter to create your first journal entry. it'll document what you learned, when you did it, and how it maps to your Flutter knowledge.</div>
                </div>
              ) : (
                <>
                  <div className="journal-stats">
                    <div className="j-stat">
                      <span className="j-stat-val cyan">{gs.journal.length}</span>
                      <span className="j-stat-lbl">chapters cleared</span>
                    </div>
                    <div className="j-stat">
                      <span className="j-stat-val orange">{gs.journal.filter(j => j.isBoss).length}</span>
                      <span className="j-stat-lbl">boss fights won</span>
                    </div>
                    <div className="j-stat">
                      <span className="j-stat-val green">{gs.xp}</span>
                      <span className="j-stat-lbl">total xp</span>
                    </div>
                  </div>
                  {[...gs.journal].reverse().map(entry => {
                    const ch = CHAPTERS[entry.chapterId - 1];
                    return (
                      <div key={entry.chapterId} className={`journal-entry ${entry.isBoss?"journal-boss":""}`}>
                        <div className="journal-entry-header">
                          <div>
                            {entry.isBoss && <span className="je-boss-tag">⚔ BOSS CLEARED — ASSIGNMENT {entry.assignmentNum}</span>}
                            <div className="je-title">L{entry.chapterId}: {entry.title}</div>
                            <div className="je-date">{entry.date}</div>
                          </div>
                          <div className="je-xp">+{ch.watchXp + ch.practiceXp} XP</div>
                        </div>
                        <div className="je-section-label">WHAT YOU LEARNED</div>
                        <div className="je-syllabus">
                          {ch.syllabus.slice(0,4).map((s,i) => <div key={i} className="je-item">◆ {s}</div>)}
                          {ch.syllabus.length > 4 && <div className="je-item dim-text">+{ch.syllabus.length-4} more concepts</div>}
                        </div>
                        <div className="je-section-label" style={{marginTop:12}}>FLUTTER EQUIVALENTS YOU NOW KNOW</div>
                        <div className="je-flutter">
                          {ch.flutterKeys.slice(0,3).map((k,i) => {
                            const [sw, fl] = k.split("→");
                            return <span key={i} className="je-flutter-chip"><span className="orange">{sw}</span> → <span className="cyan">{fl}</span></span>;
                          })}
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          )}

        </div>
      </div>
    </>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
function styles() { return `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Syne:wght@600;700;800&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#08090f;--panel:#0e1018;--border:#1c2130;--cyan:#3dd9ff;--green:#39ffb0;--orange:#ff9940;--red:#ff4d4d;--dim:#3a4a62;--text:#b8cce0;--mono:'JetBrains Mono',monospace;--disp:'Syne',sans-serif}
body{background:var(--bg)}
.app{min-height:100vh;background:var(--bg);color:var(--text);font-family:var(--mono);position:relative}
.noise{position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");pointer-events:none;z-index:100}
.cyan{color:var(--cyan)}.green{color:var(--green)}.orange{color:var(--orange)}.dim-text{color:var(--dim)}
.header{display:flex;align-items:center;justify-content:space-between;padding:14px 20px;border-bottom:1px solid var(--border);background:rgba(14,16,24,0.98);position:sticky;top:0;z-index:20;gap:12px;flex-wrap:wrap}
.logo{font-family:var(--disp);font-size:15px;font-weight:800;color:#fff;letter-spacing:0.05em}
.logo-sub{font-size:10px;color:var(--dim);letter-spacing:0.15em;margin-top:2px}
.hud{display:flex;align-items:center;gap:18px}
.hud-stat{text-align:right}
.hud-val{font-family:var(--disp);font-size:20px;font-weight:800;line-height:1}
.hud-lbl{font-size:9px;letter-spacing:0.2em;color:var(--dim);text-transform:uppercase}
.xp-mini{min-width:100px}
.xp-mini-top{display:flex;justify-content:space-between;margin-bottom:5px}
.bar-track{background:var(--border);height:4px;border-radius:0;overflow:hidden}
.bar-track.sm{height:3px}
.bar-fill{height:100%;background:linear-gradient(90deg,var(--cyan),var(--green));transition:width .6s ease}
.tabs{display:flex;border-bottom:1px solid var(--border);background:rgba(14,16,24,0.9);position:sticky;top:57px;z-index:19}
.tab{flex:1;padding:11px 4px;font-family:var(--mono);font-size:10px;letter-spacing:0.15em;color:var(--dim);border:none;background:none;cursor:pointer;transition:all .2s;border-bottom:2px solid transparent;text-transform:uppercase}
.tab.active{color:var(--cyan);border-bottom-color:var(--cyan)}
.tab:hover:not(.active){color:var(--text)}
.content{padding:16px 16px 40px;max-width:740px;margin:0 auto}
.section-header{font-size:9px;letter-spacing:0.25em;color:var(--dim);padding:0 0 14px;text-transform:uppercase}
.xp-pop{position:fixed;top:45%;left:50%;transform:translate(-50%,-50%);font-family:var(--disp);font-size:32px;font-weight:800;color:var(--green);z-index:999;pointer-events:none;animation:pop 2.2s ease forwards;white-space:nowrap}
.boss-pop{color:var(--orange);font-size:26px}
@keyframes pop{0%{opacity:0;transform:translate(-50%,-40%)}15%{opacity:1;transform:translate(-50%,-55%)}80%{opacity:1;transform:translate(-50%,-60%)}100%{opacity:0;transform:translate(-50%,-70%)}}
.chapter-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px}
.chapter-card{background:var(--panel);border:1px solid var(--border);border-radius:4px;padding:14px;cursor:pointer;transition:all .2s;position:relative;overflow:hidden}
.chapter-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--border),transparent)}
.chapter-card:hover{border-color:var(--cyan);transform:translateY(-1px)}
.chapter-card.active{border-color:rgba(61,217,255,.5)}
.chapter-card.active::before{background:linear-gradient(90deg,transparent,var(--cyan),transparent)}
.chapter-card.done{border-color:rgba(57,255,176,.25)}
.chapter-card.done::before{background:linear-gradient(90deg,transparent,var(--green),transparent)}
.chapter-card.boss{border-color:rgba(255,153,64,.2)}
.boss-tag{font-size:8px;letter-spacing:0.2em;color:var(--orange);margin-bottom:6px;text-transform:uppercase}
.active-tag{position:absolute;top:10px;right:10px;font-size:9px;color:var(--cyan);letter-spacing:0.1em}
.ch-num{font-size:9px;color:var(--dim);letter-spacing:0.2em;margin-bottom:4px}
.ch-title{font-family:var(--disp);font-size:13px;font-weight:700;color:#fff;line-height:1.3;margin-bottom:4px}
.ch-sub{font-size:10px;color:var(--dim);line-height:1.4;margin-bottom:10px}
.ch-phases{display:flex;flex-direction:column;gap:4px;margin-bottom:8px}
.phase-dot{font-size:9px;color:var(--dim);letter-spacing:0.1em}
.phase-dot.filled{color:var(--green)}
.ch-dates{font-size:9px;color:var(--dim);letter-spacing:0.05em}
.back-btn{background:none;border:1px solid var(--border);color:var(--dim);padding:7px 14px;font-family:var(--mono);font-size:11px;border-radius:2px;cursor:pointer;margin-bottom:16px;transition:all .2s;display:block}
.back-btn:hover{border-color:var(--cyan);color:var(--cyan)}
.boss-banner{background:rgba(255,153,64,.08);border:1px solid rgba(255,153,64,.3);border-radius:2px;padding:10px 14px;font-size:11px;color:var(--orange);letter-spacing:0.2em;margin-bottom:14px;text-align:center;text-transform:uppercase}
.detail-header{display:flex;gap:16px;align-items:flex-start;margin-bottom:16px}
.detail-num{font-family:var(--disp);font-size:36px;font-weight:800;color:var(--dim);line-height:1;min-width:52px}
.detail-title{font-family:var(--disp);font-size:20px;font-weight:800;color:#fff}
.detail-sub{font-size:12px;color:var(--dim);margin-top:4px}
.detail-dates{font-size:10px;color:var(--cyan);margin-top:6px;letter-spacing:0.1em}
.phase-panel{background:var(--panel);border:1px solid var(--border);border-radius:4px;padding:16px;margin-bottom:12px}
.phase-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
.phase-label{font-size:10px;letter-spacing:0.25em;text-transform:uppercase;font-weight:600}
.phase-xp{font-size:11px;color:var(--green);letter-spacing:0.1em}
.phase-desc{font-size:12px;color:var(--dim);line-height:1.6;margin-bottom:12px}
.link-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}
.link-btn{padding:7px 14px;font-family:var(--mono);font-size:10px;letter-spacing:0.15em;border-radius:2px;text-decoration:none;border:1px solid;transition:all .2s;text-transform:uppercase}
.link-btn.red{color:var(--red);border-color:rgba(255,77,77,.4)}.link-btn.red:hover{background:rgba(255,77,77,.1)}
.link-btn.orange{color:var(--orange);border-color:rgba(255,153,64,.4)}.link-btn.orange:hover{background:rgba(255,153,64,.1)}
.link-btn.dim{color:var(--dim);border-color:var(--border)}.link-btn.dim:hover{border-color:var(--text);color:var(--text)}
.complete-btn{width:100%;padding:13px;font-family:var(--mono);font-size:11px;letter-spacing:0.25em;border:1px solid var(--green);border-radius:2px;color:var(--green);background:transparent;cursor:pointer;transition:all .2s;text-transform:uppercase}
.complete-btn:hover:not(.done){background:rgba(57,255,176,.07);box-shadow:0 0 20px rgba(57,255,176,.15)}
.complete-btn.done{border-color:var(--dim);color:var(--dim);cursor:default}
.complete-btn.boss-btn{border-color:var(--orange);color:var(--orange)}
.complete-btn.boss-btn:hover:not(.done){background:rgba(255,153,64,.07)}
.syllabus-item{display:flex;gap:10px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.03);font-size:12px;line-height:1.5}
.syllabus-item:last-child{border-bottom:none}
.syllabus-dot{color:var(--cyan);flex-shrink:0;margin-top:1px}
.map-row{display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid rgba(255,255,255,.03);flex-wrap:wrap}
.map-row:last-child{border-bottom:none}
.map-swift{font-size:12px;color:var(--orange);min-width:140px;font-weight:600}
.map-arrow{color:var(--dim)}
.map-flutter{font-size:12px;color:var(--cyan);flex:1}
.map-note{font-size:10px;color:var(--dim);flex-basis:100%;padding-left:0;margin-top:2px}
.timeline-wrap{position:relative}
.timeline-row{display:flex;gap:14px;padding-bottom:0}
.tl-indicator{display:flex;flex-direction:column;align-items:center;flex-shrink:0;width:16px}
.tl-dot{width:12px;height:12px;border-radius:50%;border:2px solid var(--border);background:var(--bg);margin-top:4px;flex-shrink:0;transition:all .3s}
.tl-dot-active{border-color:var(--cyan);background:var(--cyan);box-shadow:0 0 8px var(--cyan)}
.tl-dot-done{border-color:var(--green);background:var(--green)}
.tl-line{flex:1;width:1px;background:var(--border);margin:4px 0}
.tl-content{flex:1;background:var(--panel);border:1px solid var(--border);border-radius:4px;padding:12px;margin-bottom:8px;cursor:pointer;transition:all .2s}
.tl-content:hover{border-color:var(--cyan)}
.tl-active .tl-content{border-color:rgba(61,217,255,.4)}
.tl-done .tl-content{border-color:rgba(57,255,176,.2)}
.tl-top{display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap}
.tl-num{font-size:9px;color:var(--dim);letter-spacing:0.2em}
.tl-boss-tag{font-size:9px;color:var(--orange);letter-spacing:0.1em}
.tl-now{font-size:9px;color:var(--cyan);letter-spacing:0.15em}
.tl-dates{font-size:9px;color:var(--dim);margin-left:auto}
.tl-title{font-family:var(--disp);font-size:13px;font-weight:700;color:#fff;margin-bottom:8px}
.tl-phases{display:flex;gap:8px}
.tl-week{flex:1}
.tl-phase-bar{height:3px;background:var(--border);border-radius:0;margin-bottom:3px;transition:background .3s}
.bar-watch-done{background:var(--cyan)}.bar-prac-done{background:var(--green)}.bar-active{background:rgba(61,217,255,.4)}
.tl-week-label{font-size:9px;color:var(--dim);letter-spacing:0.1em}
.filter-row{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px}
.filter-btn{padding:5px 12px;font-family:var(--mono);font-size:9px;letter-spacing:0.15em;border:1px solid var(--border);border-radius:2px;background:none;color:var(--dim);cursor:pointer;transition:all .2s;text-transform:uppercase}
.filter-btn.active{border-color:var(--cyan);color:var(--cyan)}
.filter-btn:hover:not(.active){color:var(--text);border-color:var(--text)}
.map-group{background:var(--panel);border:1px solid var(--border);border-radius:4px;padding:16px;margin-bottom:12px}
.map-group-title{font-family:var(--disp);font-size:13px;font-weight:700;color:#fff;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid var(--border)}
.map-row-full{padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04)}
.map-row-full:last-child{border-bottom:none;padding-bottom:0}
.map-row-top{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:3px}
.map-arrow-big{color:var(--dim);font-size:14px}
.map-note-full{font-size:10px;color:var(--dim);padding-left:2px}
.empty-journal{text-align:center;padding:60px 20px}
.empty-icon{font-size:40px;color:var(--dim);margin-bottom:14px}
.empty-title{font-family:var(--disp);font-size:18px;color:var(--dim);margin-bottom:10px}
.empty-sub{font-size:12px;color:var(--dim);line-height:1.7;max-width:340px;margin:0 auto}
.journal-stats{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:16px}
.j-stat{background:var(--panel);border:1px solid var(--border);border-radius:4px;padding:14px;text-align:center}
.j-stat-val{display:block;font-family:var(--disp);font-size:28px;font-weight:800;line-height:1;margin-bottom:4px}
.j-stat-lbl{font-size:9px;color:var(--dim);letter-spacing:0.2em;text-transform:uppercase}
.journal-entry{background:var(--panel);border:1px solid var(--border);border-radius:4px;padding:16px;margin-bottom:12px}
.journal-boss{border-color:rgba(255,153,64,.3)}
.journal-entry-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;gap:10px}
.je-boss-tag{display:block;font-size:9px;color:var(--orange);letter-spacing:0.2em;margin-bottom:4px;text-transform:uppercase}
.je-title{font-family:var(--disp);font-size:15px;font-weight:700;color:#fff}
.je-date{font-size:10px;color:var(--dim);margin-top:3px;letter-spacing:0.05em}
.je-xp{font-family:var(--disp);font-size:18px;font-weight:700;color:var(--green);white-space:nowrap}
.je-section-label{font-size:9px;color:var(--dim);letter-spacing:0.2em;text-transform:uppercase;margin-bottom:8px}
.je-syllabus{}
.je-item{font-size:11px;color:var(--text);padding:3px 0;line-height:1.5}
.je-flutter{display:flex;flex-wrap:wrap;gap:6px}
.je-flutter-chip{font-size:10px;background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:2px;padding:3px 9px}
`; }
