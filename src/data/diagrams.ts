/**
 * Static diagram definitions, drawn as inline SVG at build time (no scripts).
 * Every box and arrow is taken from the code or docs of each project (see AUDIT.md).
 * kind "planned" = designed but not built; drawn dashed.
 *
 * Two diagram types:
 * - graph: explicit desktop coordinates + a phone layout made of rows.
 * - steps: a numbered message sequence between lanes; desktop draws lanes,
 *   phones get the same steps as a readable list.
 */
export type NodeKind = "box" | "hot" | "planned";
export type DiagramNode = {
  id: string; x: number; y: number; w: number; h: number;
  title: string; sub?: string; lines?: string[]; kind?: NodeKind;
  /** Shorter text for the phone layout. */
  phone?: { title?: string; sub?: string };
};
export type DiagramGroup = { x: number; y: number; w: number; h: number; label: string; planned?: boolean };
export type DiagramEdge = { d: string; kind?: "data" | "planned" | "relation"; label?: { x: number; y: number; lines: string[] } };
export type PhoneLayout = { rows: { ids: string[]; label?: string }[]; links: [string, string, ("data" | "planned")?][]; note?: string };

export type GraphDiagram = {
  type: "graph"; id: string; caption: string; alt: string; theme: "dark" | "light";
  width: number; height: number; groups?: DiagramGroup[]; nodes: DiagramNode[]; edges: DiagramEdge[];
  phone: PhoneLayout; legend?: string;
};
export type StepsDiagram = {
  type: "steps"; id: string; caption: string; alt: string; theme: "dark" | "light";
  lanes: string[]; steps: { from: number; to: number; text: string; kind?: "data" | "planned" }[]; legend?: string;
};
export type Diagram = GraphDiagram | StepsDiagram;

/* ------------------------------------------------------------------ FleetOps */

const fleetopsArchitecture: GraphDiagram = {
  type: "graph", id: "fleetops-architecture", theme: "dark", width: 950, height: 380,
  caption: "System architecture. One Laravel backend serves the drivers’ phones and the office admin.",
  alt: "The driver app saves trips and GPS points in a SQLite queue on the phone and uploads them in batches to the Laravel REST API. Office staff use the Filament admin in a browser. Both go through the same services, which use MySQL, private file storage, and email, SMS and push alerts.",
  legend: "Orange: the path trip data takes from the phone to the database.",
  groups: [
    { x: 10, y: 20, w: 220, h: 220, label: "DRIVER’S PHONE" },
    { x: 310, y: 20, w: 340, h: 344, label: "LARAVEL 12 · COMPANY SERVER" },
  ],
  nodes: [
    { id: "app", x: 28, y: 56, w: 184, h: 64, title: "FleetOps app", sub: "Expo · React Native", phone: { title: "Driver app", sub: "Expo · offline" } },
    { id: "queue", x: 28, y: 150, w: 184, h: 64, title: "SQLite queue", sub: "GPS points · trip ends", kind: "hot", phone: { sub: "points · trip ends" } },
    { id: "office", x: 28, y: 290, w: 184, h: 58, title: "Office browser", sub: "Admin · HR · Finance", phone: { title: "Office staff", sub: "Admin · HR · Finance" } },
    { id: "api", x: 328, y: 56, w: 304, h: 56, title: "REST API  /api/v1", sub: "Sanctum tokens · rate limited", phone: { title: "REST API", sub: "phones" } },
    { id: "services", x: 328, y: 140, w: 304, h: 112, title: "Services", lines: ["TripService · FuelRequestService", "OdometerService · MaintenanceService", "Queue worker · scheduler"], kind: "hot", phone: { sub: "trips · fuel · odometer · maintenance" } },
    { id: "filament", x: 328, y: 280, w: 304, h: 56, title: "Filament admin  /admin", sub: "sessions · policies · two-step sign-in", phone: { title: "Filament admin", sub: "office" } },
    { id: "mysql", x: 730, y: 56, w: 200, h: 56, title: "MySQL 8.4", sub: "single source of truth", phone: { title: "MySQL", sub: "8.4" } },
    { id: "files", x: 730, y: 140, w: 200, h: 56, title: "Private files", sub: "signed URLs only", phone: { title: "Files", sub: "signed URLs" } },
    { id: "alerts", x: 730, y: 224, w: 200, h: 56, title: "Alerts", sub: "email · SMS · push", phone: { sub: "email · SMS" } },
  ],
  edges: [
    { d: "M120 120 V148", kind: "data" },
    { d: "M212 182 H262 V84 H326", kind: "data", label: { x: 218, y: 232, lines: ["batch upload", "every ~60 s"] } },
    { d: "M212 319 H326" },
    { d: "M480 112 V138", kind: "data" },
    { d: "M480 280 V254" },
    { d: "M632 170 H676 V84 H728", kind: "data" },
    { d: "M632 170 H728" },
    { d: "M632 220 H676 V252 H728" },
  ],
  phone: {
    rows: [{ ids: ["app", "queue"], label: "Driver’s phone" }, { ids: ["api", "filament"], label: "Laravel 12" }, { ids: ["services"] }, { ids: ["mysql", "files", "alerts"] }, { ids: ["office"] }],
    links: [["app", "queue", "data"], ["queue", "api", "data"], ["api", "services", "data"], ["filament", "services"], ["services", "mysql", "data"], ["services", "files"], ["services", "alerts"]],
    note: "Office staff use the Filament admin in a browser; it calls the same services as the phone API.",
  },
};

const fleetopsData: GraphDiagram = {
  type: "graph", id: "fleetops-data", theme: "light", width: 950, height: 320,
  caption: "Main tables. Every mileage reading goes through one table that can never go down.",
  alt: "Main FleetOps tables: users with driver profiles; vehicles with optional usual-driver assignments; trips with GPS trip points; odometer readings; fuel requests; maintenance rules and records; trip purposes and destinations; and an activity log.",
  nodes: [
    { id: "profiles", x: 20, y: 30, w: 200, h: 54, title: "driver_profiles", sub: "licence, expiry, licence types", phone: { sub: "licence, expiry" } },
    { id: "users", x: 260, y: 30, w: 200, h: 54, title: "users", sub: "role · employee ID · status" },
    { id: "assign", x: 500, y: 30, w: 200, h: 54, title: "vehicle_assignments", sub: "usual driver, history kept", phone: { title: "assignments", sub: "usual driver" } },
    { id: "vehicles", x: 740, y: 30, w: 200, h: 54, title: "vehicles", sub: "type · fuel · status" },
    { id: "log", x: 20, y: 140, w: 200, h: 54, title: "activity_log", sub: "audit trail" },
    { id: "trips", x: 260, y: 140, w: 200, h: 54, title: "trips", sub: "purpose · destination · flag", kind: "hot", phone: { sub: "purpose · flag" } },
    { id: "odo", x: 500, y: 140, w: 200, h: 54, title: "odometer_readings", sub: "can never go down", kind: "hot", phone: { title: "odometer_readings", sub: "never goes down" } },
    { id: "fuel", x: 740, y: 140, w: 200, h: 54, title: "fuel_requests", sub: "request → approve → pay", phone: { sub: "approve → pay" } },
    { id: "menus", x: 20, y: 250, w: 200, h: 54, title: "purposes, destinations", sub: "picture menus (admin)", phone: { title: "purposes", sub: "picture menus" } },
    { id: "points", x: 260, y: 250, w: 200, h: 54, title: "trip_points", sub: "point ID unique per phone", kind: "hot", phone: { sub: "unique point ID" } },
    { id: "rules", x: 500, y: 250, w: 200, h: 54, title: "maintenance_rules", sub: "due by km or by date", phone: { title: "maintenance rules", sub: "km or date" } },
    { id: "records", x: 740, y: 250, w: 200, h: 54, title: "maintenance_records", sub: "service done, rule reset", phone: { title: "maint. records", sub: "resets the rule" } },
  ],
  edges: [
    { d: "M220 57 H258", kind: "relation" },
    { d: "M460 57 H498", kind: "relation" },
    { d: "M700 57 H738", kind: "relation" },
    { d: "M360 84 V138", kind: "relation" },
    { d: "M840 84 V138", kind: "relation" },
    { d: "M800 84 V112 H600 V138", kind: "relation" },
    { d: "M360 194 V248", kind: "relation" },
    { d: "M220 277 H240 V167 H258", kind: "relation" },
    { d: "M460 167 H498", kind: "relation" },
    { d: "M600 194 V248", kind: "relation", label: { x: 608, y: 226, lines: ["each reading re-checks"] } },
    { d: "M700 277 H738", kind: "relation" },
  ],
  phone: {
    rows: [{ ids: ["users", "profiles"] }, { ids: ["vehicles", "assign"] }, { ids: ["trips", "points"] }, { ids: ["odo", "fuel"] }, { ids: ["rules", "records"] }, { ids: ["menus", "log"] }],
    links: [],
    note: "Lines on the desktop version show which tables point to which.",
  },
};

const fleetopsTripSync: StepsDiagram = {
  type: "steps", id: "fleetops-trip-sync", theme: "dark",
  caption: "A trip with no signal. Nothing is lost, and nothing is saved twice.",
  alt: "Sequence of an offline trip between the driver app, the SQLite queue on the phone, the API and the trip service.",
  lanes: ["Driver app", "SQLite queue", "API", "TripService"],
  steps: [
    { from: 0, to: 1, text: "Start trip: vehicle, picture menus, odometer photo. Saved on the phone first.", kind: "data" },
    { from: 1, to: 2, text: "When online: POST /trips/start", kind: "data" },
    { from: 2, to: 3, text: "Check the vehicle; odometer can’t be lower than the last reading" },
    { from: 0, to: 1, text: "Save every GPS point with an ID made on the phone", kind: "data" },
    { from: 1, to: 2, text: "Upload points in batches, about every 60 s", kind: "data" },
    { from: 2, to: 1, text: "Per point: accepted, duplicate or rejected" },
    { from: 1, to: 2, text: "Each sync: check the trip’s status (stops if HR closed it)" },
    { from: 0, to: 1, text: "End trip: end odometer and photo", kind: "data" },
    { from: 1, to: 2, text: "POST /trips/{id}/end, only after every point is on the server", kind: "data" },
    { from: 2, to: 3, text: "GPS distance vs odometer: flag for HR if over 25% apart" },
  ],
};

const fleetopsFuel: GraphDiagram = {
  type: "graph", id: "fleetops-fuel", theme: "light", width: 740, height: 180,
  caption: "Fuel request lifecycle, enforced on the server.",
  alt: "A driver requests fuel. Finance approves or rejects it with a reason; the driver can cancel. Approved fuel is disbursed as cash or a coupon, and the request is completed when the driver uploads the receipt and actual litres.",
  nodes: [
    { id: "req", x: 10, y: 30, w: 160, h: 56, title: "Requested", sub: "by the driver" },
    { id: "app", x: 200, y: 30, w: 160, h: 56, title: "Approved", sub: "by Finance" },
    { id: "dis", x: 390, y: 30, w: 160, h: 56, title: "Disbursed", sub: "cash or coupon" },
    { id: "done", x: 580, y: 30, w: 150, h: 56, title: "Completed", sub: "receipt + litres", kind: "hot" },
    { id: "can", x: 10, y: 120, w: 160, h: 46, title: "Cancelled", sub: "by the driver" },
    { id: "rej", x: 200, y: 120, w: 160, h: 46, title: "Rejected", sub: "reason required" },
  ],
  edges: [
    { d: "M170 58 H198" }, { d: "M360 58 H388" }, { d: "M550 58 H578" },
    { d: "M90 86 V118" }, { d: "M150 86 V100 H280 V118" },
  ],
  phone: {
    rows: [{ ids: ["req", "can"] }, { ids: ["app", "rej"] }, { ids: ["dis"] }, { ids: ["done"] }],
    links: [["req", "can"], ["req", "app"], ["req", "rej"], ["app", "dis"], ["dis", "done"]],
  },
};

/* ----------------------------------------------------------------- ClassMate */

const classmateArchitecture: GraphDiagram = {
  type: "graph", id: "classmate-architecture", theme: "dark", width: 950, height: 340,
  caption: "System architecture. The app talks to one Spring Boot API; loaded data is kept on the phone.",
  alt: "The ClassMate app keeps a JWT in secure storage and an offline cache in AsyncStorage. It calls the Spring Boot API with a Bearer token. A JWT filter checks the token and role, then controllers and services handle timetables, assignments, scores, exam venues and admin work. Data is in PostgreSQL; notifications go through the Expo push service.",
  legend: "Orange: data the student can still read with no connection.",
  groups: [
    { x: 10, y: 20, w: 250, h: 304, label: "STUDENT’S PHONE" },
    { x: 330, y: 20, w: 340, h: 304, label: "SPRING BOOT 3 · /api" },
  ],
  nodes: [
    { id: "app", x: 28, y: 56, w: 214, h: 60, title: "ClassMate app", sub: "Expo Router · TypeScript", phone: { title: "ClassMate app", sub: "Expo" } },
    { id: "cache", x: 28, y: 148, w: 214, h: 60, title: "Offline cache", sub: "AsyncStorage · last synced", kind: "hot", phone: { sub: "last synced data" } },
    { id: "token", x: 28, y: 240, w: 214, h: 60, title: "Secure storage", sub: "JWT after sign-in", phone: { sub: "JWT" } },
    { id: "filter", x: 348, y: 56, w: 304, h: 56, title: "JWT filter", sub: "checks the token on every call", phone: { sub: "every call" } },
    { id: "ctrl", x: 348, y: 136, w: 304, h: 84, title: "Controllers + services", lines: ["auth · timetable · assignments", "scores · exam venues · admin"], phone: { title: "Controllers", sub: "role checks per endpoint" } },
    { id: "audit", x: 348, y: 244, w: 304, h: 56, title: "Audit log · login limits", sub: "admin actions recorded", phone: { title: "Audit log", sub: "admin actions" } },
    { id: "db", x: 730, y: 56, w: 210, h: 60, title: "PostgreSQL", sub: "hosted on Neon", phone: { sub: "Neon" } },
    { id: "push", x: 730, y: 148, w: 210, h: 60, title: "Expo push service", sub: "class and score alerts", phone: { title: "Expo push", sub: "alerts" } },
    { id: "pay", x: 730, y: 240, w: 210, h: 60, title: "Paystack", sub: "test mode only (demo)", kind: "planned", phone: { sub: "test mode" } },
  ],
  edges: [
    { d: "M135 116 V146", kind: "data" },
    { d: "M242 86 H346", label: { x: 252, y: 76, lines: ["HTTPS · Bearer"] } },
    { d: "M500 112 V134" },
    { d: "M500 220 V242" },
    { d: "M652 178 H690 V86 H728" },
    { d: "M652 178 H728" },
  ],
  phone: {
    rows: [{ ids: ["app", "cache"], label: "Student’s phone" }, { ids: ["filter"], label: "Spring Boot API" }, { ids: ["ctrl"] }, { ids: ["db", "push"] }],
    links: [["app", "cache", "data"], ["app", "filter"], ["filter", "ctrl"], ["ctrl", "db"], ["ctrl", "push"]],
    note: "The token sits in secure storage on the phone. Paystack runs in test mode only.",
  },
};

const classmateAuth: StepsDiagram = {
  type: "steps", id: "classmate-auth", theme: "light",
  caption: "Sign-up, sign-in and roles. The server decides the role, never the app.",
  alt: "Sequence of registration, login with a JWT, authenticated requests and an admin promoting a course rep.",
  lanes: ["User", "App", "API", "Database"],
  steps: [
    { from: 0, to: 1, text: "Register: name, index number, email, programme, password" },
    { from: 1, to: 2, text: "POST /auth/register (the request has no role field)" },
    { from: 2, to: 3, text: "Save the user as STUDENT, always" },
    { from: 1, to: 2, text: "POST /auth/login" },
    { from: 2, to: 2, text: "Too many failed logins in 15 minutes: blocked" },
    { from: 2, to: 1, text: "JWT, valid 24 hours" },
    { from: 1, to: 1, text: "Keep the token in secure storage" },
    { from: 1, to: 2, text: "Every request: Authorization: Bearer <token>" },
    { from: 2, to: 2, text: "JWT filter loads the user; the endpoint checks the role" },
    { from: 0, to: 2, text: "Admin promotes a student to course rep (written to the audit log)" },
  ],
};

const classmateOffline: GraphDiagram = {
  type: "graph", id: "classmate-offline", theme: "light", width: 950, height: 310,
  caption: "Offline access. Network first, then the last copy saved on the phone.",
  alt: "When a screen opens, the app tries the network first. If it works, the data is saved to the cache and shown. If not, the last cached copy is shown with an offline banner, or an error if nothing was cached. Exam venues are downloaded once and searched by index range on the phone. Signing out clears the cache.",
  nodes: [
    { id: "open", x: 10, y: 50, w: 170, h: 56, title: "Screen opens", sub: "timetable, venues…" },
    { id: "fetch", x: 220, y: 50, w: 190, h: 56, title: "fetchWithCache", sub: "network first" },
    { id: "api", x: 450, y: 50, w: 160, h: 56, title: "API request", sub: "with the token" },
    { id: "ok", x: 670, y: 10, w: 270, h: 50, title: "Works: save to cache", sub: "show fresh data", kind: "hot", phone: { title: "Online", sub: "save + show fresh" } },
    { id: "fail", x: 670, y: 80, w: 270, h: 50, title: "Fails: read the cache", sub: "show last copy + offline banner", phone: { title: "Offline", sub: "last copy + banner" } },
    { id: "none", x: 670, y: 150, w: 270, h: 50, title: "Nothing cached", sub: "show the error state", phone: { sub: "error state" } },
    { id: "venues", x: 10, y: 240, w: 260, h: 56, title: "Exam venues", sub: "downloaded once" },
    { id: "search", x: 310, y: 240, w: 300, h: 56, title: "Search by index range", sub: "on the phone, no network needed", kind: "hot", phone: { title: "Search by index", sub: "works offline" } },
    { id: "signout", x: 670, y: 240, w: 270, h: 56, title: "Sign out", sub: "clears cache and private data", phone: { sub: "clears the cache" } },
  ],
  edges: [
    { d: "M180 78 H218" }, { d: "M410 78 H448" },
    { d: "M610 78 H640 V35 H668", kind: "data" }, { d: "M610 78 H640 V105 H668" }, { d: "M805 130 V148" },
    { d: "M270 268 H308", kind: "data" },
  ],
  phone: {
    rows: [{ ids: ["open", "fetch"] }, { ids: ["api"] }, { ids: ["ok", "fail"] }, { ids: ["none"] }, { ids: ["venues", "search"] }, { ids: ["signout"] }],
    links: [["open", "fetch"], ["fetch", "api"], ["api", "ok", "data"], ["api", "fail"], ["fail", "none"], ["venues", "search", "data"]],
  },
};

const classmateData: GraphDiagram = {
  type: "graph", id: "classmate-data", theme: "light", width: 950, height: 320,
  caption: "Main tables. Rows point to each other by ID; scores and exam venues match students by index number.",
  alt: "ClassMate tables: users with a role; announcements, assignments and timetable documents store the ID of the user who posted them; assignment documents store file bytes; midsem scores match students by index number; exam venues hold index ranges; device tokens and audit logs.",
  nodes: [
    { id: "users", x: 375, y: 20, w: 200, h: 58, title: "users", sub: "STUDENT · COURSE_REP · ADMIN", phone: { sub: "role" } },
    { id: "ann", x: 10, y: 130, w: 175, h: 54, title: "announcements", sub: "posted by user ID" },
    { id: "asg", x: 197, y: 130, w: 175, h: 54, title: "assignments", sub: "posted by user ID" },
    { id: "tt", x: 384, y: 130, w: 175, h: 54, title: "timetable_records", sub: "class status", phone: { title: "timetable", sub: "class status" } },
    { id: "venues", x: 571, y: 130, w: 175, h: 54, title: "exam_venues", sub: "start–end index" },
    { id: "scores", x: 758, y: 130, w: 182, h: 54, title: "midsem_scores", sub: "by index number" },
    { id: "tokens", x: 10, y: 240, w: 175, h: 54, title: "device_tokens", sub: "push, per user" },
    { id: "docs", x: 197, y: 240, w: 175, h: 54, title: "assignment_documents", sub: "file bytes in the DB", phone: { title: "assignment docs", sub: "file bytes" } },
    { id: "ttdocs", x: 384, y: 240, w: 175, h: 54, title: "timetable_documents", sub: "uploaded files", phone: { title: "timetable docs", sub: "files" } },
    { id: "audit", x: 758, y: 240, w: 182, h: 54, title: "audit_logs", sub: "admin actions" },
  ],
  edges: [
    { d: "M475 78 V104 H97 V128", kind: "relation" }, { d: "M475 104 H284 V128", kind: "relation" },
    { d: "M475 78 V128", kind: "relation" }, { d: "M475 104 H658 V128", kind: "relation", label: { x: 600, y: 98, lines: ["index number"] } },
    { d: "M658 104 H849 V128", kind: "relation" },
    { d: "M284 184 V238", kind: "relation" },
    { d: "M375 49 H3 V267 H10", kind: "relation" }, { d: "M565 104 V267 H561", kind: "relation" }, { d: "M575 49 H946 V267 H940", kind: "relation" },
  ],
  phone: {
    rows: [{ ids: ["users"] }, { ids: ["ann", "asg"] }, { ids: ["tt", "venues"] }, { ids: ["scores", "tokens"] }, { ids: ["docs", "ttdocs"] }, { ids: ["audit"] }],
    links: [],
    note: "No JPA relations: tables store the IDs they need.",
  },
};

/* ------------------------------------------------------------------ ReportIt */

const reportitArchitecture: GraphDiagram = {
  type: "graph", id: "reportit-architecture", theme: "dark", width: 950, height: 320,
  caption: "System architecture. No server of my own: Firebase, Cloudinary and OpenStreetMap.",
  alt: "The ReportIt app signs in with Firebase Auth, reads and writes reports in Firestore through security rules with real-time listeners, uploads photos to Cloudinary, and shows a Leaflet map with OpenStreetMap tiles inside a WebView. Status changes trigger a local notification on the reporter’s phone.",
  legend: "Orange: the security rules every read and write passes through.",
  groups: [{ x: 10, y: 20, w: 270, h: 284, label: "CITIZEN’S PHONE" }, { x: 350, y: 20, w: 300, h: 284, label: "FIREBASE" }],
  nodes: [
    { id: "app", x: 28, y: 56, w: 234, h: 60, title: "ReportIt app", sub: "Expo Router · Zustand · NativeWind", phone: { sub: "Expo · Zustand" } },
    { id: "map", x: 28, y: 140, w: 234, h: 60, title: "Map", sub: "Leaflet in a WebView", phone: { sub: "Leaflet" } },
    { id: "notify", x: 28, y: 224, w: 234, h: 60, title: "Local notifications", sub: "when my report’s status changes", phone: { title: "Notifications", sub: "status changes" } },
    { id: "auth", x: 368, y: 56, w: 264, h: 56, title: "Firebase Auth", sub: "email and password", phone: { title: "Auth", sub: "email" } },
    { id: "rules", x: 368, y: 136, w: 264, h: 56, title: "Security rules", sub: "deny by default · role checks", kind: "hot", phone: { title: "Rules", sub: "role checks" } },
    { id: "store", x: 368, y: 216, w: 264, h: 68, title: "Firestore", lines: ["users · reports", "real-time listeners"], phone: { sub: "users · reports" } },
    { id: "cloud", x: 720, y: 56, w: 220, h: 60, title: "Cloudinary", sub: "photo uploads, resized", phone: { sub: "photos" } },
    { id: "osm", x: 720, y: 140, w: 220, h: 60, title: "OpenStreetMap tiles", sub: "no API key, no billing", phone: { title: "OSM tiles", sub: "no key" } },
  ],
  edges: [
    { d: "M262 86 H366" }, { d: "M262 96 H310 V164 H366", kind: "data" }, { d: "M500 192 V214" },
    { d: "M262 70 H296 V10 H690 V86 H718" }, { d: "M262 170 H290 V210 H700 V170 H718" },
    { d: "M366 260 H300 V254 H264" },
  ],
  phone: {
    rows: [{ ids: ["app", "map"], label: "Citizen’s phone" }, { ids: ["auth", "rules"], label: "Firebase" }, { ids: ["store"] }, { ids: ["cloud", "osm"] }, { ids: ["notify"] }],
    links: [["app", "auth"], ["app", "rules", "data"], ["rules", "store", "data"], ["map", "osm"]],
    note: "Photos go straight to Cloudinary. A status change in Firestore reaches the reporter as a local notification.",
  },
};

const reportitLifecycle: GraphDiagram = {
  type: "graph", id: "reportit-lifecycle", theme: "light", width: 940, height: 190,
  caption: "Report status. Only admins can change it, and the rules check that on the server.",
  alt: "A report moves from Pending to Under Review to In Progress to Resolved. An admin can also reject it with a reason. Each change is stamped with the server time and the reporter is notified.",
  nodes: [
    { id: "p", x: 10, y: 30, w: 190, h: 56, title: "Pending", sub: "photo + location sent" },
    { id: "r", x: 245, y: 30, w: 190, h: 56, title: "Under Review", sub: "admin" },
    { id: "i", x: 480, y: 30, w: 190, h: 56, title: "In Progress", sub: "admin + note" },
    { id: "d", x: 715, y: 30, w: 215, h: 56, title: "Resolved", sub: "reporter notified", kind: "hot" },
    { id: "x", x: 245, y: 124, w: 425, h: 50, title: "Rejected", sub: "admin gives a reason the reporter can read" },
  ],
  edges: [{ d: "M200 58 H243" }, { d: "M435 58 H478" }, { d: "M670 58 H713" }, { d: "M105 86 V149 H243" }, { d: "M340 86 V122" }, { d: "M575 86 V122" }],
  phone: { rows: [{ ids: ["p"] }, { ids: ["r"] }, { ids: ["i"] }, { ids: ["d", "x"] }], links: [["p", "r"], ["r", "i"], ["i", "d"], ["i", "x"]], note: "Any open report can also be rejected with a reason." },
};

const reportitRouting: GraphDiagram = {
  type: "graph", id: "reportit-routing", theme: "light", width: 940, height: 200,
  caption: "Next, not built yet: sending each report to the authority that can fix it.",
  alt: "Planned design: a new report's category and area are matched against a list of authorities, each with the categories and areas it handles. The report is assigned to that authority, whose staff can only see and update their own reports. Every status change is kept in a dated history.",
  legend: "Dashed: designed, not built.",
  nodes: [
    { id: "report", x: 10, y: 40, w: 200, h: 60, title: "New report", sub: "category + area", kind: "planned" },
    { id: "match", x: 250, y: 40, w: 220, h: 60, title: "Match an authority", sub: "categories and areas it handles", kind: "planned", phone: { sub: "category + area" } },
    { id: "assign", x: 510, y: 40, w: 200, h: 60, title: "Assigned", sub: "NAWEC, NRA, NDMA, KMC…", kind: "planned", phone: { sub: "NAWEC, NRA…" } },
    { id: "staff", x: 750, y: 40, w: 180, h: 60, title: "Authority staff", sub: "see only their reports", kind: "planned", phone: { title: "Staff", sub: "own reports only" } },
    { id: "history", x: 510, y: 130, w: 420, h: 50, title: "Status history", sub: "every change with a date, visible to the reporter", kind: "planned", phone: { sub: "dated, visible" } },
  ],
  edges: [{ d: "M210 70 H248", kind: "planned" }, { d: "M470 70 H508", kind: "planned" }, { d: "M710 70 H748", kind: "planned" }, { d: "M840 100 V128", kind: "planned" }],
  phone: { rows: [{ ids: ["report", "match"] }, { ids: ["assign", "staff"] }, { ids: ["history"] }], links: [["report", "match", "planned"], ["match", "assign", "planned"], ["assign", "staff", "planned"], ["staff", "history", "planned"]] },
};

/* --------------------------------------------------------------- TaksiGambia */

const taksiSystem: GraphDiagram = {
  type: "graph", id: "taksigambia-system", theme: "dark", width: 950, height: 400,
  caption: "How the apps and the backend communicate. Solid: built today. Dashed: designed, not built.",
  alt: "Built today: passenger app, driver app and admin web share a typed client generated from the API's OpenAPI description and call the Spring Boot API, which runs on PostgreSQL with PostGIS enabled. Designed but not built: Firebase sign-in tokens, a Firestore live-ride document the apps only read, push notifications, Redis for matching, and Wave payments on the server.",
  legend: "Solid lines and boxes are in the code today. Dashed ones are in the design documents only.",
  groups: [{ x: 10, y: 20, w: 250, h: 360, label: "CLIENTS" }, { x: 340, y: 20, w: 290, h: 360, label: "SERVER (SOURCE OF TRUTH)" }],
  nodes: [
    { id: "pass", x: 28, y: 56, w: 214, h: 58, title: "Passenger app", sub: "Expo · tab shell built", phone: { sub: "Expo shell" } },
    { id: "drv", x: 28, y: 136, w: 214, h: 58, title: "Driver app", sub: "Expo · tab shell built", phone: { sub: "Expo shell" } },
    { id: "adm", x: 28, y: 216, w: 214, h: 58, title: "Admin web", sub: "React + Vite · roles stubbed", phone: { sub: "React · stub auth" } },
    { id: "client", x: 28, y: 300, w: 214, h: 60, title: "Typed API client", sub: "generated from OpenAPI", kind: "hot", phone: { title: "Typed client", sub: "from OpenAPI" } },
    { id: "api", x: 358, y: 56, w: 254, h: 76, title: "Spring Boot API", lines: ["Java 21 · /api/v1", "config checked at startup"], kind: "hot", phone: { sub: "Java 21 · /api/v1" } },
    { id: "rules", x: 358, y: 156, w: 254, h: 76, title: "Rides, fares, commission", lines: ["status rules · matching", "decided on the server"], kind: "planned", phone: { title: "Ride logic", sub: "designed" } },
    { id: "pg", x: 358, y: 260, w: 254, h: 60, title: "PostgreSQL + PostGIS", sub: "Flyway migrations", phone: { title: "PostgreSQL", sub: "PostGIS on" } },
    { id: "fb", x: 700, y: 56, w: 240, h: 60, title: "Firebase Auth + FCM", sub: "sign-in tokens · push", kind: "planned", phone: { title: "Firebase", sub: "designed" } },
    { id: "live", x: 700, y: 140, w: 240, h: 60, title: "Firestore live rides", sub: "apps read, server writes", kind: "planned", phone: { title: "Live rides", sub: "designed" } },
    { id: "redis", x: 700, y: 224, w: 240, h: 60, title: "Redis", sub: "matching · rate limits", kind: "planned", phone: { sub: "designed" } },
    { id: "wave", x: 700, y: 308, w: 240, h: 60, title: "Wave payments", sub: "server only, after cash", kind: "planned", phone: { title: "Wave", sub: "designed" } },
  ],
  edges: [
    { d: "M242 85 H262 V330 H244" }, { d: "M242 165 H262", kind: "relation" }, { d: "M242 245 H262", kind: "relation" },
    { d: "M242 318 H300 V94 H356", kind: "data", label: { x: 268, y: 352, lines: ["HTTPS /api/v1"] } },
    { d: "M485 132 V154", kind: "planned" }, { d: "M485 232 V258" },
    { d: "M612 90 H698", kind: "planned" }, { d: "M612 180 H656 V170 H698", kind: "planned" },
    { d: "M612 200 H676 V254 H698", kind: "planned" }, { d: "M612 220 H660 V338 H698", kind: "planned" },
  ],
  phone: {
    rows: [{ ids: ["pass", "drv"], label: "Clients" }, { ids: ["adm", "client"] }, { ids: ["api"], label: "Server" }, { ids: ["rules", "pg"] }, { ids: ["fb", "live"], label: "Designed services" }, { ids: ["redis", "wave"] }],
    links: [["client", "api", "data"], ["api", "rules", "planned"], ["api", "pg"]],
    note: "All three apps use the generated client. Dashed boxes are designed, not built.",
  },
};

const taksiRide: GraphDiagram = {
  type: "graph", id: "taksigambia-ride", theme: "light", width: 950, height: 250,
  caption: "Ride status. The legal moves are shared code for the apps today; enforcing them on the server is designed.",
  alt: "Ride statuses in order: draft, quoted, requested, searching, driver assigned, driver en route, driver arrived, ready to start, in progress, completed. A ride can also end as cancelled by the passenger, driver or system, no driver found, expired, or disputed.",
  legend: "Solid: the status list and legal moves exist in shared code. Starting a trip will also need an approved driver, vehicle and PIN (designed).",
  nodes: [
    { id: "s1", x: 10, y: 20, w: 170, h: 46, title: "Draft → Quoted", phone: { title: "Draft → Quoted" } },
    { id: "s2", x: 200, y: 20, w: 170, h: 46, title: "Requested" },
    { id: "s3", x: 390, y: 20, w: 170, h: 46, title: "Searching" },
    { id: "s4", x: 580, y: 20, w: 170, h: 46, title: "Driver assigned" },
    { id: "s5", x: 770, y: 20, w: 170, h: 46, title: "Driver en route" },
    { id: "s6", x: 770, y: 96, w: 170, h: 46, title: "Driver arrived" },
    { id: "s7", x: 580, y: 96, w: 170, h: 46, title: "Ready to start" },
    { id: "s8", x: 390, y: 96, w: 170, h: 46, title: "In progress" },
    { id: "s9", x: 200, y: 96, w: 170, h: 46, title: "Completed", kind: "hot" },
    { id: "end", x: 10, y: 180, w: 930, h: 54, title: "Other endings", sub: "cancelled by passenger, driver or system · no driver found · expired · disputed", phone: { sub: "cancelled · no driver · expired · disputed" } },
  ],
  edges: [
    { d: "M180 43 H198" }, { d: "M370 43 H388" }, { d: "M560 43 H578" }, { d: "M750 43 H768" },
    { d: "M855 66 V94" }, { d: "M770 119 H752" }, { d: "M580 119 H562" }, { d: "M390 119 H372" },
  ],
  phone: {
    rows: [{ ids: ["s1", "s2"] }, { ids: ["s3", "s4"] }, { ids: ["s5", "s6"] }, { ids: ["s7", "s8"] }, { ids: ["s9"] }, { ids: ["end"] }],
    links: [["s1", "s2"], ["s2", "s3"], ["s3", "s4"], ["s4", "s5"], ["s5", "s6"], ["s6", "s7"], ["s7", "s8"], ["s8", "s9"]],
  },
};

const taksiCash: GraphDiagram = {
  type: "graph", id: "taksigambia-cash", theme: "light", width: 950, height: 200,
  caption: "Designed, not built: with cash, the driver owes the platform its commission.",
  alt: "Planned design: the rider pays the driver in cash. The server saves the fare and commission on the trip and lowers the driver's balance by the commission, which can go negative. The driver settles the balance. If unpaid commission passes a limit, the driver cannot go online.",
  legend: "Dashed: designed, not built.",
  nodes: [
    { id: "pay", x: 10, y: 30, w: 200, h: 60, title: "Rider pays cash", sub: "straight to the driver", kind: "planned" },
    { id: "save", x: 250, y: 30, w: 210, h: 60, title: "Server saves the trip", sub: "fare and commission fixed", kind: "planned", phone: { title: "Trip saved", sub: "fare + commission" } },
    { id: "bal", x: 500, y: 30, w: 200, h: 60, title: "Driver balance", sub: "minus commission, can go < 0", kind: "planned", phone: { sub: "can go negative" } },
    { id: "settle", x: 740, y: 30, w: 200, h: 60, title: "Driver settles", sub: "balance back to zero", kind: "planned", phone: { sub: "back to zero" } },
    { id: "block", x: 500, y: 126, w: 440, h: 56, title: "Over the limit: can’t go online", sub: "until unpaid commission is settled", kind: "planned", phone: { title: "Over the limit", sub: "can’t go online" } },
  ],
  edges: [{ d: "M210 60 H248", kind: "planned" }, { d: "M460 60 H498", kind: "planned" }, { d: "M700 60 H738", kind: "planned" }, { d: "M600 90 V124", kind: "planned" }],
  phone: { rows: [{ ids: ["pay", "save"] }, { ids: ["bal", "settle"] }, { ids: ["block"] }], links: [["pay", "save", "planned"], ["save", "bal", "planned"], ["bal", "settle", "planned"], ["bal", "block", "planned"]] },
};

export const diagrams = Object.fromEntries([
  fleetopsArchitecture, fleetopsData, fleetopsTripSync, fleetopsFuel,
  classmateArchitecture, classmateAuth, classmateOffline, classmateData,
  reportitArchitecture, reportitLifecycle, reportitRouting,
  taksiSystem, taksiRide, taksiCash,
].map(diagram => [diagram.id, diagram])) as Record<string, Diagram>;
