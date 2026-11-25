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
  seoDescription: "FleetOps: the fleet-management system Pa Alieu Njie built as the only developer during his internship at NICK TC-SCAN in The Gambia. Offline-first Expo driver app, Laravel and Filament admin, MySQL.",
  status: "rollout",
  facts: [
    { label: "Role", value: "Software Development Intern, only developer" },
    { label: "Timeline", value: "Sep–Oct 2026; maintaining it part-time since" },
    { label: "Worked with", value: "My supervisor, HR, Finance, IT and drivers" },
    { label: "Stack", value: "Laravel 12, Filament 4, Expo, MySQL 8.4, SQLite" },
  ],
  sections: [
    {
      id: "problem", nav: "The problem", eyebrow: "The problem", title: "One place for every vehicle.",
      paragraphs: [
        "The company wanted one place to see who had which vehicle and where it went, whether the fuel it paid for actually went into that vehicle, when each vehicle was due for service, insurance or road tax, and which drivers had an expired licence.",
        "It had to use MySQL and run on the company’s own server. Vehicle tracking devices are planned for later, so the phone had to do the tracking.",
      ],
    },
    {
      id: "brief", nav: "The brief", eyebrow: "How it started", title: "A system to build in my first week.",
      paragraphs: [
        "A classmate from senior school works at NICK TC-SCAN. He spoke to the manager for me and I sent my CV. A few days after I started, I was given a fleet management system to build: driver login, trip tracking, fuel requests that Finance approves and pays as cash or a coupon, vehicle registration, and maintenance reminders by date or mileage.",
      ],
    },
    {
      id: "role", nav: "My role", eyebrow: "My role", title: "Only developer, close to the people using it.",
      paragraphs: [
        "I was the only developer. My supervisor let me talk directly to anyone I needed, so I worked closely with HR, Finance, the IT team and the drivers. On 30 September I rode along with a driver to see how trips really happen.",
        "I showed my progress to management every Friday, about five times. After the 25 September review they asked for motorbike tracking, HR notifications, approved routes and a picture menu for drivers who can’t read English well. They gave me the company logo and colours. Later we agreed to let drivers pick a vehicle for each trip and to merge the Fleet Manager role into HR.",
        "The IT team gave me access to the group’s SMS gateway and is now putting the system live on the company server.",
      ],
    },
    {
      id: "architecture", nav: "Architecture", eyebrow: "Architecture", title: "One backend, two doors.", band: true,
      paragraphs: ["A JSON API for the phones and a Filament admin for the office share the same services, so a rule like “the odometer can never go down” lives in one place and applies to both."],
      figures: ["fleetops-architecture"],
    },
    {
      id: "data", nav: "Data model", eyebrow: "Data model", title: "Mileage has one source of truth.",
      paragraphs: [
        "Every odometer reading, from a trip, a fuel fill, a service or a manual entry, goes through one service and one table, and it can never go down. Each new reading re-checks the vehicle’s maintenance rules, which are due by kilometres or by date, whichever comes first.",
        "A vehicle’s usual driver is optional and never exclusive: drivers choose a vehicle for each trip, and their licence type decides which vehicles they may choose.",
      ],
      figures: ["fleetops-data"],
    },
    {
      id: "offline", nav: "Offline trips", eyebrow: "Key workflow", title: "A trip with no signal.", band: true,
      paragraphs: ["Drivers switch off mobile data and keep the phone in a pocket. The app records GPS in the background, saves everything on the phone, and uploads it when it can."],
      figures: ["fleetops-trip-sync"],
    },
    {
      id: "fuel", nav: "Fuel approvals", eyebrow: "Key workflow", title: "Fuel, from request to receipt.",
      paragraphs: [
        "The rules are enforced on the server: one open request per vehicle, the person who asked can never approve or hand out their own fuel, and the price per litre is saved with each request. Fuel requests only work online; they are never queued on the phone.",
      ],
      figures: ["fleetops-fuel"],
    },
    {
      id: "decisions", nav: "Decisions", eyebrow: "Decisions", title: "Why these tools.",
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
      id: "challenge", nav: "Hardest problem", eyebrow: "Hardest problem", title: "Making trips work offline.",
      paragraphs: [
        "When I went out with a driver, I saw that drivers switch off mobile data, keep the phone in their pocket and drive long trips upcountry. My first version expected the phone to be online, and the server rejected any upload that broke its rules. So a trip that synced late, for example with the odometer reading out of order, got rejected, and one bad trip could block the ones after it.",
        "I rebuilt it to work offline first. Everything is saved on the phone with an ID made on the phone, so if the same trip uploads twice it is only saved once. Late data is accepted and flagged for HR to check instead of being rejected. If one trip fails, it waits on its own and the rest keep uploading.",
        "Testing also showed that when HR closed a trip, the phone kept recording. Now the phone checks the trip’s status every time it syncs.",
      ],
    },
    {
      id: "screens", nav: "Screens", eyebrow: "Screens", title: "Driver app and admin.",
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
      id: "status", nav: "Where it stands", eyebrow: "Status", title: "Where it stands.",
      paragraphs: ["Management was happy with what I delivered at the weekly reviews and asked me to keep maintaining FleetOps and adding features after deployment. Server testing was approved in November 2026, and the rollout is still going on."],
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
  seoDescription: "KNUST ClassMate: a group-built academic coordination app. Pa Alieu Njie built most of the React Native app and co-built the Spring Boot backend: JWT roles, offline cache, bulk score uploads and push notifications.",
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
      id: "problem", nav: "The problem", eyebrow: "The problem", title: "Class updates scattered everywhere.",
      paragraphs: ["Students and course reps need to coordinate timetables, assignments, announcements, exam venues and scores, often on unreliable connections. ClassMate puts them in one app and keeps what you have loaded readable offline."],
    },
    {
      id: "role", nav: "My role", eyebrow: "My role", title: "Most of the app, half of the backend.",
      paragraphs: ["I built most of the app’s screens and logic and co-built the Spring Boot backend with a teammate. This is what each of us did, from the commit history."],
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
        { who: "My teammate’s part", did: [
          "Set up the Spring Boot project and the first JWT register and login",
          "The first announcement, timetable, assignment and exam-venue APIs",
          "The Dockerfile for deployment and some early screens",
        ] },
      ],
    },
    {
      id: "architecture", nav: "Architecture", eyebrow: "Architecture", title: "One API, data kept on the phone.", band: true,
      paragraphs: ["The app calls a Spring Boot API under /api with a JWT. The server checks the token and the user’s role on every request; the app only decides what to show."],
      figures: ["classmate-architecture"],
    },
    {
      id: "auth", nav: "Sign-in and roles", eyebrow: "Authentication", title: "The server decides the role.",
      paragraphs: [
        "Anyone can register, but only as a student: the registration request has no role field, so it can’t be edited to ask for more. An admin is created directly in the database, and only an admin can promote a student to course rep, by index number or email.",
      ],
      figures: ["classmate-auth"],
    },
    {
      id: "offline", nav: "Offline", eyebrow: "Offline", title: "Network first, then the last copy.",
      paragraphs: [
        "Timetables, announcements, assignments and exam venues are fetched fresh when possible and saved on the phone. When the request fails, the app shows the last saved copy with an offline banner.",
        "Exam venues are downloaded once and searched by index range on the phone, so the search works with no connection at all. Signing out clears the cache, so a shared phone doesn’t show one student’s data to the next.",
      ],
      figures: ["classmate-offline"],
    },
    {
      id: "data", nav: "Data model", eyebrow: "Data model", title: "Simple tables, linked by IDs.",
      paragraphs: ["Hibernate manages the schema. Posts store the ID of the user who posted them, and scores are matched to students by index number, which is also how course reps upload them in bulk."],
      figures: ["classmate-data"],
    },
    {
      id: "screens", nav: "Screens", eyebrow: "Screens", title: "The app.",
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
      id: "status", nav: "Where it stands", eyebrow: "Status", title: "Where it stands.",
      status: {
        works: [
          "Timetables with class cancellations and reminders",
          "Announcements and assignments with documents",
          "Exam-venue search by index number, offline",
          "Midsem scores with bulk upload",
          "Push notifications with deep links",
          "Student, course rep and admin roles with an audit log",
        ],
        building: ["Payments: a Paystack paywall in test mode only; the Pro tier is stored on the phone for the demo"],
        notBuilt: ["Password reset: the screen is a placeholder"],
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
  lede: "Report a pothole, uncollected rubbish, a broken streetlight, a water leak or flooding in under a minute, with a photo and location, then follow it until it’s fixed.",
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
      id: "problem", nav: "The problem", eyebrow: "The problem", title: "Problems at home go unreported.",
      paragraphs: [
        "I’m Gambian, and problems at home like potholes, rubbish not being collected, broken streetlights, water leaks and flooding often don’t get reported, or the report never reaches anyone who can fix it.",
        "ReportIt Gambia lets anyone report a problem in under a minute with a photo and location, and follow it until it’s fixed. It’s a working prototype that I’m pitching to possible backers and local authorities; it isn’t launched to the public yet.",
      ],
    },
    {
      id: "origin", nav: "How it started", eyebrow: "How it started", title: "From ReportIt Ghana to ReportIt Gambia.",
      paragraphs: [
        "It started as a two-person project. A senior student had the idea and brought me in to build it with her for her third-year mini-project at KNUST. That version was ReportIt Ghana, and I was in my second year. I built the app.",
        "She later handed the project over to me. I moved it to my own GitHub with its full history, and I’m rebuilding and extending it as ReportIt Gambia: local categories like flooding and power outages, the Gambia’s local government areas, a map framed on the country, and a redesign of every screen.",
      ],
    },
    {
      id: "architecture", nav: "Architecture", eyebrow: "Architecture", title: "No server to run.", band: true,
      paragraphs: ["Firebase handles sign-in and the database, Cloudinary the photos, and OpenStreetMap the map. The security rules in Firestore are what keep users apart, so they run on the server, not in the app."],
      figures: ["reportit-architecture"],
    },
    {
      id: "decisions", nav: "Decisions", eyebrow: "Decisions", title: "Why these tools.",
      decisions: [
        { name: "Firebase", why: "For a small team it was the fastest and cheapest option. It gives login, a live database, so reports and status changes update straight away, and security rules on the server, without me running a server." },
        { name: "Cloudinary", why: "It handles photo uploads and resizing on the free plan, which helps people with little data." },
        { name: "Leaflet with OpenStreetMap", why: "No API key or billing, unlike Google Maps, and it works in Expo Go." },
        { name: "A real backend later", why: "A proper backend for a council dashboard can come once the idea is proven." },
      ],
    },
    {
      id: "rules", nav: "Status and rules", eyebrow: "Security", title: "Only admins change a report’s status.",
      paragraphs: [
        "The Firestore rules deny everything by default. A user can only create their own profile, only as a citizen, and can’t change their own role. Only an admin can change a report’s status, and every change must carry the server’s time.",
      ],
      figures: ["reportit-lifecycle"],
    },
    {
      id: "next", nav: "Next", eyebrow: "Next", title: "Sending each report to the right authority.",
      paragraphs: [
        "This is designed, not built. A pothole should go to the National Roads Authority, a water leak to NAWEC, flooding to NDMA, and rubbish to whichever council covers that area, like KMC or BCC.",
        "I don’t want to hardcode that. Each authority will have a list of the categories and areas it handles, and a new report will be assigned to the one that matches. A third role, authority staff, will only see and update their own authority’s reports, enforced in the Firestore rules. Every status change will be kept with a date so the reporter can follow it.",
      ],
      figures: ["reportit-routing"],
    },
    {
      id: "screens", nav: "Screens", eyebrow: "Screens", title: "The app.",
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
      id: "status", nav: "Where it stands", eyebrow: "Status", title: "Where it stands.",
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
  lede: "A ride-hailing platform built around how people in The Gambia move: booking by landmark, cash first, safety built into the system, and a commission the driver can clearly see.",
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
      id: "problem", nav: "The problem", eyebrow: "The problem", title: "No meters, every fare a negotiation.",
      paragraphs: [
        "There’s no Uber or Bolt in The Gambia. People use street taxis, drivers arranged by hotels, or WhatsApp numbers. There are no meters, so every fare is a negotiation. There is one local app, but people don’t really trust it yet.",
        "Apps built for other countries also don’t fit how we move. Bolt asks you to drop a pin, but here people give directions by landmarks like Westfield, Turntable or “opposite GTBank”. Most people pay cash, and mobile money like Wave and Afrimoney is common, while cards are not.",
      ],
    },
    {
      id: "role", nav: "My role", eyebrow: "My role", title: "A solo project, and drivers next.",
      paragraphs: [
        "It’s a solo project. I haven’t spoken to drivers yet, and that’s my next step. The commission rate, how much unpaid commission a driver can owe before they’re blocked, and how drivers go online and offline are still my own guesses. Talking to drivers at Westfield will tell me more than another week of coding.",
      ],
    },
    {
      id: "architecture", nav: "Architecture", eyebrow: "Architecture", title: "Three apps, one source of truth.", band: true,
      paragraphs: [
        "The passenger app, driver app and admin all talk to one Spring Boot API through a client generated from the API’s description, so the types can’t drift. Today that connection works end to end with a health check; the ride features behind it are designed but not built.",
      ],
      figures: ["taksigambia-system"],
    },
    {
      id: "decisions", nav: "Decisions", eyebrow: "Decisions", title: "Why these choices.",
      decisions: [
        { name: "The server decides", why: "By design, fares, commission, ride status and whether a driver is allowed to work are decided on the server. If the app decided them, a modified app could set its own fare or ignore a suspension." },
        { name: "PostgreSQL with PostGIS", why: "Finding the nearest available driver is a location query, and PostGIS is built for that. It is already enabled by the first database migration." },
        { name: "Spring Boot", why: "It handles transactions well, which matters once money is involved, and I’ve used Java in my courses." },
        { name: "Firebase for live locations (designed)", why: "It can send live driver locations to riders without me running my own real-time server. The apps will only read it; the server writes." },
        { name: "Money as whole numbers", why: "Amounts are stored in the smallest unit of the dalasi as integers, never decimals, and commission uses whole-number basis points. This is already in the shared code, with tests." },
      ],
    },
    {
      id: "ride", nav: "Ride status", eyebrow: "Ride lifecycle", title: "Every ride follows one list of states.",
      paragraphs: ["The list of ride statuses and the legal moves between them already exist as shared, tested code for the apps. The server will enforce them and add its own checks, such as an approved driver and vehicle before a trip starts."],
      figures: ["taksigambia-ride"],
    },
    {
      id: "cash", nav: "Cash payments", eyebrow: "Hardest decision", title: "Cash flips the money flow.",
      paragraphs: [
        "I first planned it like Bolt: the platform collects the fare and pays the driver. With cash it’s the opposite. The rider pays the driver directly, so the driver owes the platform its commission.",
        "I had to add a driver balance that can go negative, a way to settle it, and a limit where unpaid commission stops a driver from going online. I found this while planning, before building the database, so it was a change to the plan and not a rewrite.",
      ],
      figures: ["taksigambia-cash"],
    },
    {
      id: "checks", nav: "Checks first", eyebrow: "Process", title: "Checks and sign-offs before features.",
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
      id: "screens", nav: "Screens", eyebrow: "Screens", title: "The three apps today.",
      screens: [
        { file: "work/taksigambia/passenger", alt: "Passenger app home screen (foundation)", caption: "Passenger app", frame: "phone" },
        { file: "work/taksigambia/driver", alt: "Driver app with the online status banner (foundation)", caption: "Driver app", frame: "phone" },
        { file: "work/taksigambia/admin", alt: "Admin web home (foundation)", caption: "Admin web", frame: "desktop" },
      ],
    },
    {
      id: "status", nav: "Where it stands", eyebrow: "Status", title: "Where it stands.",
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
