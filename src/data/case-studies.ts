/**
 * Case-study content. Technical facts come from the code and docs of each repository
 * (portfolio-private/redesign/AUDIT.md); reasons, challenges and context come from
 * Pa Alieu's answers (QUESTIONS.md). Nothing here may claim more than the code does.
 */
import type { Link, ProjectSlug, StatusKind } from "./site";

/** A screenshot or video. It is only shown once the file exists under public/. */
export type Screen = { file: string; alt: string; caption: string; frame: "phone" | "desktop"; video?: boolean };

export type Section = {
  id: string;
  /** Short label for the "On this page" list. */
  nav: string;
  eyebrow: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  /** Diagram ids from diagrams.ts. */
  figures?: string[];
  /** Show the figures in a full-width dark panel. */
  band?: boolean;
  decisions?: { name: string; why: string }[];
  credits?: { who: string; did: string[] }[];
  status?: { works: string[]; building?: string[]; notBuilt?: string[] };
  screens?: Screen[];
};

export type CaseStudy = {
  slug: ProjectSlug;
  name: string;
  kind: string;
  lede: string;
  seoDescription: string;
  status: StatusKind;
  statusText?: string;
  facts: { label: string; value: string }[];
  sections: Section[];
  links: Link[];
  note?: string;
  next: ProjectSlug;
};

const fleetops: CaseStudy = {
  slug: "fleetops",
  name: "FleetOps",
  kind: "Professional experience · NICK TC-SCAN (Gambia) Ltd",
  lede: "The fleet system I built for NICK TC-SCAN during my internship: a driver app that records trips by GPS even with mobile data off, and a web admin where HR, Finance and management run trips, fuel and maintenance.",
  seoDescription: "FleetOps: the fleet-management system Pa Alieu Njie designed and built on his own during his internship at NICK TC-SCAN in The Gambia. Offline-first Expo driver app, Laravel and Filament admin, MySQL.",
  status: "rollout",
  facts: [
    { label: "Role", value: "Software Development Intern; designed and built it on my own" },
    { label: "Timeline", value: "Sep–Oct 2026; maintaining it part-time since" },
    { label: "Worked with", value: "My supervisor, HR, Finance, IT and drivers" },
    { label: "Stack", value: "Laravel 12, Filament 4, Expo, MySQL 8.4, SQLite" },
  ],
  sections: [
    {
      id: "problem", nav: "The problem", eyebrow: "The problem", title: "Operational requirements",
      paragraphs: [
        "The company wanted one place to see who had which vehicle and where it went, whether the fuel it paid for actually went into that vehicle, when each vehicle was due for service, insurance or road tax, and which drivers had an expired licence.",
        "It had to use MySQL and run on the company’s own server. Vehicle tracking devices are planned for later, so the phone had to do the tracking.",
      ],
    },
    {
      id: "brief", nav: "The brief", eyebrow: "Responsibilities", title: "Internship responsibilities",
      paragraphs: [
  "During my internship, I developed driver sign-in, trip tracking, fuel requests with Finance approval and cash/coupon payouts, vehicle registration, and maintenance reminders by date or mileage."
],
    },
    {
      id: "role", nav: "My role", eyebrow: "My role", title: "My contribution",
      paragraphs: [
  "I independently developed FleetOps, working with HR, Finance, IT and drivers and observing their workflows to understand operational requirements.",
  "Weekly reviews shaped requirements for motorbike tracking, HR notifications, route approvals and picture menus for drivers with limited English. Drivers choose a vehicle per trip, and the Fleet Manager role was merged into HR.",
  "The IT team provided access to the company’s SMS gateway and is handling server rollout."
],
    },
    {
      id: "architecture", nav: "Architecture", eyebrow: "Architecture", title: "Architecture", band: true,
      paragraphs: ["A JSON API for the phones and a Filament admin for the office share the same services, so a rule like “the odometer can never go down” lives in one place and applies to both."],
      figures: ["fleetops-architecture"],
    },
    {
      id: "data", nav: "Data model", eyebrow: "Data model", title: "Mileage and vehicle data",
      paragraphs: [
        "Every odometer reading, from a trip, a fuel fill, a service or a manual entry, goes through one service and one table, and it can never go down. Each new reading re-checks the vehicle’s maintenance rules, which are due by kilometres or by date, whichever comes first.",
        "A vehicle’s usual driver is optional and never exclusive: drivers choose a vehicle for each trip, and their licence type decides which vehicles they may choose.",
      ],
      figures: ["fleetops-data"],
    },
    {
      id: "offline", nav: "Offline trips", eyebrow: "Key workflow", title: "Offline trip tracking", band: true,
      paragraphs: [
  "The Expo app records GPS in the background and stores trips and GPS points in a SQLite upload queue. Data syncs when a connection is available."
],
      figures: ["fleetops-trip-sync"],
    },
    {
      id: "fuel", nav: "Fuel approvals", eyebrow: "Key workflow", title: "Fuel approvals",
      paragraphs: [
        "The rules are enforced on the server: one open request per vehicle, the person who asked can never approve or hand out their own fuel, and the price per litre is saved with each request. Fuel requests only work online; they are never queued on the phone.",
      ],
      figures: ["fleetops-fuel"],
    },
    {
      id: "decisions", nav: "Decisions", eyebrow: "Decisions", title: "Technical decisions",
      decisions: [
        { name: "Laravel and MySQL", why: "The company wanted MySQL on its own server, and its IT team works with PHP, JavaScript and React Native. I picked tools they could keep running after I left. Laravel is stable and well documented." },
        { name: "Filament for the admin", why: "It let me build the admin panel, with roles, policies and reports, in days." },
        { name: "Expo for the driver app", why: "One TypeScript codebase for the Android app, built in the cloud, without Android Studio." },
        { name: "SQLite on the phone", why: "Trips and GPS points are saved on the phone first and uploaded later, so a trip upcountry with no signal is never lost." },
        { name: "Private files and signed links", why: "Odometer photos and receipts are evidence. They are stored off the public web and served only to people allowed to see the record, through links that expire after 30 minutes." },
        { name: "The group’s own email and SMS gateways", why: "Alerts go out through the GNSW email and SMS gateways (sender name NICKTC). I tested both live during development; switching to the production keys is part of IT’s deployment." },
      ],
    },
    {
      id: "challenge", nav: "Hardest problem", eyebrow: "Hardest problem", title: "Offline sync handling",
      paragraphs: [
  "Drivers often keep mobile data off. Late trip uploads could violate odometer ordering, and one rejected upload could block later trips.",
  "Locally generated trip IDs prevent duplicate uploads. Late data is accepted and flagged for HR review, while failed trips retry independently. Sync checks whether HR has closed a trip so background recording stops."
],
    },
    {
      id: "screens", nav: "Screens", eyebrow: "Screens", title: "Driver app and admin",
      screens: [
        { file: "work/fleetops/driver-start-trip", alt: "Driver app: choosing a vehicle and starting a trip", caption: "Start a trip", frame: "phone" },
        { file: "work/fleetops/driver-destination", alt: "Driver app: destination picture buttons", caption: "Destination picture menu", frame: "phone" },
        { file: "work/fleetops/driver-active-trip", alt: "Driver app: active trip with the route drawn on a map", caption: "Active trip", frame: "phone" },
        { file: "work/fleetops/driver-sync", alt: "Driver app: trips waiting to upload while offline", caption: "Waiting to upload", frame: "phone" },
        { file: "work/fleetops/driver-fuel", alt: "Driver app: fuel request", caption: "Fuel request", frame: "phone" },
        { file: "work/fleetops/admin-dashboard", alt: "Web admin dashboard with pending fuel and maintenance alerts", caption: "Admin dashboard", frame: "desktop" },
        { file: "work/fleetops/admin-trip", alt: "Web admin: a trip with its GPS route and odometer check", caption: "Trip with GPS route", frame: "desktop" },
        { file: "work/fleetops/admin-fuel", alt: "Web admin: Finance approving a fuel request", caption: "Fuel approval", frame: "desktop" },
        { file: "work/fleetops/admin-maintenance", alt: "Web admin: maintenance due by date or mileage", caption: "Maintenance due", frame: "desktop" },
        { file: "work/fleetops/admin-reports", alt: "Web admin: reports page", caption: "Reports", frame: "desktop" },
      ],
    },
    {
      id: "status", nav: "Where it stands", eyebrow: "Status", title: "Current status",
      paragraphs: [
  "I continue maintaining FleetOps and adding features part-time and remotely. Server testing was approved in November 2026; rollout on the company server is ongoing."
],
      status: {
        works: [
          "Trips with background GPS that work offline",
          "Fuel requests, approvals and cash or coupon payouts",
          "Maintenance and garage reminders by date or mileage",
          "Reports with PDF and Excel export",
          "Email, SMS and phone push alerts",
          "Roles for Admin, HR, Finance and drivers, with two-step sign-in available for office staff",
        ],
        building: ["Rollout on the company server, with the IT team"],
        notBuilt: [
          "Approved routes for each destination, and alerts when a driver changes route. Designed; the company still has to decide which routes are approved.",
          "Vehicle tracking devices (eTracking), planned by the company for later.",
        ],
      },
    },
  ],
  links: [],
  note: "FleetOps belongs to the company, so its code isn’t public. Screenshots are shown with my supervisor’s approval, with personal data blurred or replaced.",
  next: "classmate",
};

const classmate: CaseStudy = {
  slug: "classmate",
  name: "KNUST ClassMate",
  kind: "Group project · KNUST",
  lede: "A mobile app for KNUST students and course reps: timetables, announcements, assignments with documents, exam-venue search by index number, midsem scores and class reminders. Data you have loaded stays available offline.",
  seoDescription: "KNUST ClassMate: a group-built academic coordination app. Pa Alieu Njie built most of the React Native app and co-built the Spring Boot backend with Maxwell (GitHub: Kobimcs): JWT roles, offline cache, bulk score uploads and push notifications.",
  status: "completed",
  statusText: "Completed · payments demo only",
  facts: [
    { label: "Role", value: "Built most of the app; co-built the backend" },
    { label: "Team", value: "Group project" },
    { label: "Timeline", value: "Jun–Jul 2026" },
    { label: "Stack", value: "React Native, Expo, TypeScript, Spring Boot, PostgreSQL" },
  ],
  sections: [
    {
      id: "problem", nav: "The problem", eyebrow: "The problem", title: "Student coordination",
      paragraphs: ["Students and course reps need to coordinate timetables, assignments, announcements, exam venues and scores, often on unreliable connections. ClassMate puts them in one app and keeps what you have loaded readable offline."],
    },
    {
      id: "role", nav: "My role", eyebrow: "My role", title: "My contribution",
      paragraphs: [
  "Built most of KNUST ClassMate's React Native app and co-built its Spring Boot backend with Maxwell (GitHub: Kobimcs). My responsibilities included app data/offline services and backend permissions, bulk uploads, notifications and audit logging."
],
      credits: [
        { who: "My part", did: [
          "Most of the app’s screens, and all of its data and offline services",
          "Hardened sign-in and permissions: registration is always STUDENT, decided on the server",
          "Admins promote course reps; reps manage only their own posts",
          "Midsem scores with CSV, XLS and XLSX bulk upload, and CSV upload of exam venues",
          "Class cancellations with student alerts, push notifications through Expo, deep links",
          "Assignment and timetable documents (upload and download)",
          "Login rate limiting and an audit log of admin actions",
        ] },
        { who: "Maxwell (GitHub: Kobimcs)", did: [
          "Set up the Spring Boot project and the first JWT register and login",
          "The first announcement, timetable, assignment and exam-venue APIs",
          "The Dockerfile for deployment and some early screens",
        ] },
      ],
    },
    {
      id: "architecture", nav: "Architecture", eyebrow: "Architecture", title: "Architecture", band: true,
      paragraphs: ["The app calls a Spring Boot API under /api with a JWT. The server checks the token and the user’s role on every request; the app only decides what to show."],
      figures: ["classmate-architecture"],
    },
    {
      id: "auth", nav: "Sign-in and roles", eyebrow: "Authentication", title: "Authentication and roles",
      paragraphs: [
        "Anyone can register, but only as a student: the registration request has no role field, so it can’t be edited to ask for more. An admin is created directly in the database, and only an admin can promote a student to course rep, by index number or email.",
      ],
      figures: ["classmate-auth"],
    },
    {
      id: "offline", nav: "Offline", eyebrow: "Offline", title: "Offline access",
      paragraphs: [
        "Timetables, announcements, assignments and exam venues are fetched fresh when possible and saved on the phone. When the request fails, the app shows the last saved copy with an offline banner.",
        "Exam venues are downloaded once and searched by index range on the phone, so the search works with no connection at all. Signing out clears the cache, so a shared phone doesn’t show one student’s data to the next.",
      ],
      figures: ["classmate-offline"],
    },
    {
      id: "data", nav: "Data model", eyebrow: "Data model", title: "Data model",
      paragraphs: ["Hibernate manages the schema. Posts store the ID of the user who posted them, and scores are matched to students by index number, which is also how course reps upload them in bulk."],
      figures: ["classmate-data"],
    },
    {
      id: "screens", nav: "Screens", eyebrow: "Screens", title: "App screens",
      screens: [
        { file: "work/classmate/student-dashboard", alt: "Student dashboard with today’s classes and exam countdown", caption: "Student dashboard", frame: "phone" },
        { file: "work/classmate/timetable", alt: "Timetable screen", caption: "Timetable", frame: "phone" },
        { file: "work/classmate/exam-search", alt: "Exam venue search by index number, offline", caption: "Exam venue search", frame: "phone" },
        { file: "work/classmate/assignments", alt: "Assignments with an attached document", caption: "Assignments", frame: "phone" },
        { file: "work/classmate/upload-scores", alt: "Course rep uploading scores from a spreadsheet", caption: "Bulk score upload", frame: "phone" },
        { file: "work/classmate/admin-panel", alt: "Admin panel for promoting course reps", caption: "Admin panel", frame: "phone" },
      ],
    },
    {
      id: "status", nav: "Where it stands", eyebrow: "Status", title: "Current status",
      status: {
  "works": [
    "Timetables with class cancellations and reminders",
    "Announcements and assignments with documents",
    "Exam-venue search by index number, offline",
    "Midsem scores with bulk upload",
    "Push notifications with deep links",
    "Student, course rep and admin roles with an audit log",
    "Payment demonstration in Paystack test mode; no live payment service is connected. Demo Pro access is stored on the phone."
  ],
  "notBuilt": [
    "Live payment integration",
    "Password reset: the screen is a placeholder"
  ]
},
    },
  ],
  links: [{ label: "Source on GitHub", href: "https://github.com/Pa-Alieu25/mobile-project", external: true }],
  next: "reportit",
};

const reportit: CaseStudy = {
  slug: "reportit",
  name: "ReportIt Gambia",
  kind: "Working prototype · started as a two-person student project",
  lede: "A working prototype for photo-and-location reports of local infrastructure problems. I built the original ReportIt Ghana app and am adapting it for The Gambia.",
  seoDescription: "ReportIt Gambia: a mobile app for reporting local infrastructure problems with a photo and location. Built by Pa Alieu Njie with Expo, Firebase Auth and Firestore security rules, Cloudinary and Leaflet.",
  status: "prototype",
  facts: [
    { label: "Role", value: "Built the app; now owner" },
    { label: "Team", value: "Two people at first; now solo" },
    { label: "Timeline", value: "Aug 2026 (Ghana version) · Nov 2026–now" },
    { label: "Stack", value: "Expo, TypeScript, Firebase Auth, Firestore, Cloudinary, Leaflet" },
  ],
  sections: [
    {
      id: "problem", nav: "The problem", eyebrow: "The problem", title: "Purpose",
      paragraphs: [
  "The app lets residents report potholes, rubbish, broken streetlights, leaks and flooding with a photo and GPS location, then view status updates. It is a working prototype and has not launched publicly."
],
    },
    {
      id: "origin", nav: "How it started", eyebrow: "How it started", title: "My contribution",
      paragraphs: [
  "I built the app for the two-person ReportIt Ghana student project at KNUST, then took ownership with its Git history intact. I’m adapting categories, areas, the map and screens for The Gambia."
],
    },
    {
      id: "architecture", nav: "Architecture", eyebrow: "Architecture", title: "Architecture", band: true,
      paragraphs: ["Firebase handles sign-in and the database, Cloudinary the photos, and OpenStreetMap the map. The security rules in Firestore are what keep users apart, so they run on the server, not in the app."],
      figures: ["reportit-architecture"],
    },
    {
      id: "decisions", nav: "Decisions", eyebrow: "Decisions", title: "Technical decisions",
      decisions: [
        { name: "Firebase", why: "For a small team it was the fastest and cheapest option. It gives login, a live database, so reports and status changes update straight away, and security rules on the server, without me running a server." },
        { name: "Cloudinary", why: "It handles photo uploads and resizing on the free plan, which helps people with little data." },
        { name: "Leaflet with OpenStreetMap", why: "No API key or billing, unlike Google Maps, and it works in Expo Go." },
        { name: "A real backend later", why: "A proper backend for a council dashboard can come once the idea is proven." },
      ],
    },
    {
      id: "rules", nav: "Status and rules", eyebrow: "Security", title: "Permissions and status updates",
      paragraphs: [
        "The Firestore rules deny everything by default. A user can only create their own profile, only as a citizen, and can’t change their own role. Only an admin can change a report’s status, and every change must carry the server’s time.",
      ],
      figures: ["reportit-lifecycle"],
    },
    {
      id: "next", nav: "Next", eyebrow: "Next", title: "Planned authority routing",
      paragraphs: [
  "Planned authority routing will match report categories and areas to the National Roads Authority, NAWEC, NDMA or local councils such as KMC and BCC. Authority staff will only access their assigned reports, with a dated status history. This is designed, not implemented."
],
      figures: ["reportit-routing"],
    },
    {
      id: "screens", nav: "Screens", eyebrow: "Screens", title: "App screens",
      screens: [
        { file: "work/reportit/demo", alt: "Short demo: reporting a problem and following its status", caption: "Demo", frame: "phone", video: true },
        { file: "work/reportit/home", alt: "Home screen with recent reports", caption: "Home", frame: "phone" },
        { file: "work/reportit/new-report", alt: "New report with photo, category and area", caption: "New report", frame: "phone" },
        { file: "work/reportit/map", alt: "Map of reports framed on The Gambia", caption: "Map", frame: "phone" },
        { file: "work/reportit/report-detail", alt: "Report detail with its status timeline", caption: "Status timeline", frame: "phone" },
        { file: "work/reportit/admin", alt: "Admin view with summary and quick status changes", caption: "Admin", frame: "phone" },
      ],
    },
    {
      id: "status", nav: "Where it stands", eyebrow: "Status", title: "Current status",
      status: {
        works: [
          "Email sign-in with a citizen or admin role",
          "Reports with photo, category, area and GPS location",
          "Live lists of my reports and a public map",
          "Status timeline and admin notes; rejected reports show the reason",
          "Admin dashboard with filters and quick status changes",
          "A notification on my phone when my report’s status changes",
        ],
        building: ["The Gambia version: categories, areas, map and redesign (on the feat/gambia-localization branch)"],
        notBuilt: ["Routing reports to authorities and the authority staff role", "A dated status history", "A public launch"],
      },
    },
  ],
  links: [{ label: "Source on GitHub", href: "https://github.com/Pa-Alieu25/ReportIt", external: true }],
  next: "taksigambia",
};

const taksigambia: CaseStudy = {
  slug: "taksigambia",
  name: "TaksiGambia",
  kind: "Solo project · in development",
  lede: "Ride-hailing for The Gambia, in development. App and API foundations are implemented; sign-in is being built. Landmark booking, cash commission and live ride features are planned.",
  seoDescription: "TaksiGambia: a ride-hailing platform for The Gambia in development by Pa Alieu Njie. Passenger and driver Expo apps, a React admin and a server-authoritative Spring Boot API with PostgreSQL and PostGIS.",
  status: "development",
  statusText: "In development · foundations built",
  facts: [
    { label: "Role", value: "Solo: product, design and code" },
    { label: "Timeline", value: "Jul 2026–now" },
    { label: "Stage", value: "First gate signed off 23 Nov 2026; now building sign-in" },
    { label: "Stack", value: "Expo, React, Spring Boot (Java 21), PostgreSQL + PostGIS" },
  ],
  sections: [
    {
      id: "problem", nav: "The problem", eyebrow: "The problem", title: "Local requirements",
      paragraphs: [
  "The design supports landmark-based destinations, cash payments, mobile money and visible driver commission to reflect local transport needs. These ride features are planned."
],
    },
    {
      id: "role", nav: "My role", eyebrow: "My role", title: "My role and validation",
      paragraphs: [
  "I’m the solo developer. Driver interviews are planned to validate commission rates, unpaid-balance limits and online/offline behaviour."
],
    },
    {
      id: "architecture", nav: "Architecture", eyebrow: "Architecture", title: "Architecture", band: true,
      paragraphs: [
  "Passenger, driver and admin app shells connect to a Spring Boot health endpoint through a generated typed API client. Booking, matching and live ride features are not implemented."
],
      figures: ["taksigambia-system"],
    },
    {
      id: "decisions", nav: "Decisions", eyebrow: "Decisions", title: "Technical decisions",
      decisions: [
        { name: "The server decides", why: "By design, fares, commission, ride status and whether a driver is allowed to work are decided on the server. If the app decided them, a modified app could set its own fare or ignore a suspension." },
        { name: "PostgreSQL with PostGIS", why: "Finding the nearest available driver is a location query, and PostGIS is built for that. It is already enabled by the first database migration." },
        { name: "Spring Boot", why: "It handles transactions well, which matters once money is involved, and I’ve used Java in my courses." },
        { name: "Firebase for live locations (designed)", why: "It can send live driver locations to riders without me running my own real-time server. The apps will only read it; the server writes." },
        { name: "Money as whole numbers", why: "Amounts are stored in the smallest unit of the dalasi as integers, never decimals, and commission uses whole-number basis points. This is already in the shared code, with tests." },
      ],
    },
    {
      id: "ride", nav: "Ride status", eyebrow: "Ride lifecycle", title: "Ride lifecycle",
      paragraphs: ["The list of ride statuses and the legal moves between them already exist as shared, tested code for the apps. The server will enforce them and add its own checks, such as an approved driver and vehicle before a trip starts."],
      figures: ["taksigambia-ride"],
    },
    {
      id: "cash", nav: "Cash payments", eyebrow: "Hardest decision", title: "Cash commission (planned)",
      paragraphs: [
  "The planned cash flow has riders pay drivers directly, leaving the driver owing commission to the platform. The design includes a driver balance, settlement and a limit on unpaid commission before a driver can go online. This flow is not implemented."
],
      figures: ["taksigambia-cash"],
    },
    {
      id: "checks", nav: "Checks first", eyebrow: "Process", title: "Build and security checks",
      paragraphs: [
        "I set up checks and sign-offs before writing features, and they’ve already caught real problems:",
      ],
      bullets: [
        "An app that built fine but crashed on the phone",
        "API docs that looked protected but weren’t",
        "A duplicate package that showed a blank page",
        "A setting that would have left the server open to any website",
        "A deploy that would have quietly used the development database",
      ],
    },
    {
      id: "screens", nav: "Screens", eyebrow: "Screens", title: "App foundations",
      screens: [
        { file: "work/taksigambia/passenger", alt: "Passenger app home screen (foundation)", caption: "Passenger app", frame: "phone" },
        { file: "work/taksigambia/driver", alt: "Driver app with the online status banner (foundation)", caption: "Driver app", frame: "phone" },
        { file: "work/taksigambia/admin", alt: "Admin web home (foundation)", caption: "Admin web", frame: "desktop" },
      ],
    },
    {
      id: "status", nav: "Where it stands", eyebrow: "Status", title: "Implemented, in development and planned",
      status: {
        works: [
          "Passenger and driver app shells and an admin shell with role guards",
          "Spring Boot API with startup config checks and a health check",
          "PostgreSQL with PostGIS enabled through migrations",
          "A typed API client generated for all three apps",
          "Shared money, phone-number and ride-status code with tests",
          "CI for the apps, the API and secret scanning",
        ],
        building: ["Real sign-in (the admin uses a stub role today)"],
        notBuilt: ["Booking, matching and dispatch", "Fares, cash commission and payments", "Live rides, safety features and notifications"],
      },
    },
  ],
  links: [],
  note: "The code is in a private repository for now; the detailed specs, database design and threat model stay private.",
  next: "fleetops",
};

export const caseStudies: Record<ProjectSlug, CaseStudy> = { fleetops, classmate, reportit, taksigambia };
export const caseStudyOrder: ProjectSlug[] = ["fleetops", "classmate", "reportit", "taksigambia"];
