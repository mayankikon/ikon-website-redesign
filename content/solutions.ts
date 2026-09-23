export type SolutionId = "lot-management" | "theft-recovery" | "connected-car" | "smart-marketing";

export type Solution = {
  id: SolutionId;
  href: string;
  label: string;
  title: string;
  summary: string;
  homeImage: string;
  homeImageAlt: string;
  pageImage: string;
  pageImageAlt: string;
  eyebrow: string;
  lede: string;
  stats: { value: string; caption: string }[];
  benefits: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
};

export const solutions: Solution[] = [
  {
    id: "lot-management",
    href: "/lot-management",
    label: "Lot Management",
    title: "Full visibility of cars and keys",
    summary:
      "Locate any unit and its keys instantly, check battery health before a test drive, pull audit and lot-aging reports, and stay appointment-ready. No upfront device cost.",
    homeImage: "/assets/generated/lot-management.webp",
    homeImageAlt: "Stylized dealership lot with one vehicle highlighted by a GPS pin",
    pageImage: "/assets/generated/lot-management.webp",
    pageImageAlt: "Stylized dealership lot with one vehicle highlighted by a GPS pin",
    eyebrow: "Solution",
    lede: "Map and locate vehicles and keys, set geofences, find dead batteries, track inventory aging, protect the lot, and run floor audits.",
    stats: [
      { value: "15 min", caption: "Saved per sale locating cars and keys" },
      { value: "$0", caption: "Upfront device cost" },
      { value: "56%", caption: "Faster inventory audits" },
    ],
    benefits: [
      {
        title: "Find cars and keys in seconds",
        body: "GPS vehicle location and Bluetooth key tracking mean the next appointment is never waiting on a hunt across the lot.",
      },
      {
        title: "Always appointment ready",
        body: "Daily battery reports keep units showable. No more dead-battery test drives.",
      },
      {
        title: "One-touch floorplan audits",
        body: "Stop walking the lot with a clipboard. 24/7 asset visibility cuts audit time and keeps floorplan reporting accurate.",
      },
      {
        title: "Boundary enforcement",
        body: "Geofences and after-hours movement alerts tell you the moment a unit leaves the perimeter.",
      },
    ],
    faqs: [
      {
        question: "Is there an upfront cost for Lot Management?",
        answer:
          "No. Hardware and install run on consignment. You pay when the program sells, not when devices hit the lot.",
      },
      {
        question: "What security features does Lot Management include?",
        answer:
          "Live vehicle and key location, geofencing, after-hours alerts, lot-aging views, and audit reports on every VIN.",
      },
      {
        question: "How does it improve efficiency?",
        answer:
          "Stores save about 15 minutes per deal on locate time, keep appointments ready, and shrink audit walks from hours to minutes.",
      },
    ],
  },
  {
    id: "theft-recovery",
    href: "/dealer-theft-recovery",
    label: "Theft Recovery",
    title: "Get stolen inventory back fast",
    summary:
      "Near-real-time GPS tracking built for rapid recovery, with active recovery support. Secures the lot and gives you leverage on insurance premiums and deductibles.",
    homeImage: "/assets/generated/theft-recovery.webp",
    homeImageAlt: "Night map with a green tracking path following a stolen vehicle",
    pageImage: "/assets/generated/theft-recovery.webp",
    pageImageAlt: "Night map with a green tracking path following a stolen vehicle",
    eyebrow: "Solution",
    lede: "Professional inventory protection that gets cars back without waiting on a paper trail, and pays for itself on the lot and after delivery.",
    stats: [
      { value: "99.8%", caption: "Recovery rate" },
      { value: "18 min", caption: "Average recovery time" },
      { value: "$10,000", caption: "Max dealer and consumer benefit" },
    ],
    benefits: [
      {
        title: "Active recovery, not a dashboard",
        body: "Stolen Mode shares a tracking link with law enforcement. Recovery is a coordinated service, not a pin you work alone at 2am.",
      },
      {
        title: "Lot and customer coverage",
        body: "The same device protects inventory on the pad and becomes the customer product in F&I — with a $10,000 theft benefit.",
      },
      {
        title: "Evidence that closes cases",
        body: "Historical location data supports investigations and court, from insider theft to bust-out fraud.",
      },
      {
        title: "Insurance leverage",
        body: "Fast recoveries and clean records give stores a path to lower premiums and deductibles.",
      },
    ],
    faqs: [
      {
        question: "Does the theft recovery limited warranty cover the dealer or the customer?",
        answer:
          "Both. A cash benefit goes to the consumer, with $8,000 of that benefit structured to come back to the store on the replacement unit.",
      },
      {
        question: "How do I stop after-hours lot theft?",
        answer:
          "Geofences and unauthorized-use alerts fire when a unit leaves the perimeter. Stolen Mode then hands law enforcement a live tracking link.",
      },
      {
        question: "Does the system work if the battery is disconnected?",
        answer:
          "Hardwired power plus backup behavior is designed for real theft events, not only parked inventory with a healthy 12-volt.",
      },
    ],
  },
  {
    id: "connected-car",
    href: "/connected-car",
    label: "Connected Car",
    title: "An F&I product customers actually use",
    summary:
      "A dealer-branded app plus a $10,000 theft benefit that is easy to present, easy to wrap, and non-cancellable. Dealers see an average PVR uplift of $323.",
    homeImage: "/assets/generated/connected-car.webp",
    homeImageAlt: "Car and phone exchanging phosphor-green signal arcs",
    pageImage: "/assets/generated/connected-car.webp",
    pageImageAlt: "Car and phone exchanging phosphor-green signal arcs",
    eyebrow: "Solution",
    lede: "A dealer-branded app that lets customers protect the vehicle, look after the people in it, and stay on top of car care — with your name on the home screen, not the OEM's.",
    stats: [
      { value: "$323", caption: "Average PVR uplift" },
      { value: "$10,000", caption: "Driver theft warranty" },
      { value: "15%", caption: "Potential driver insurance discount" },
    ],
    benefits: [
      {
        title: "Sticky, non-cancellable gross",
        body: "Customers keep an app and a theft benefit they understand. The product is a hard-add that is not GAP or VSC they cancel in 18 months.",
      },
      {
        title: "Dealer-branded every day",
        body: "Find-your-car, service scheduling, and safety features sit in your store's app, not a factory Trojan horse.",
      },
      {
        title: "Wrap the term to the note",
        body: "Stores see wrap opportunity around 30%, with reinsurance that can pay as soon as 90 days.",
      },
      {
        title: "No monthly fee to the customer",
        body: "A simpler desk conversation. Hardware is compatible across makes and models on the franchise lot.",
      },
    ],
    faqs: [
      {
        question: 'How does a "no monthly fee" model help the desk close?',
        answer:
          "There is no subscription objection. The customer buys protection and an app they will actually open.",
      },
      {
        question: "Is the hardware compatible with all makes and models?",
        answer:
          "Ikon Connect is built for mixed franchise inventory, not a single OEM stack.",
      },
      {
        question: "How does Connected Car increase dealership revenue?",
        answer:
          "Average $323 PVR, wrap income, service ROs from the same device, and 74% higher next-vehicle purchase among loyal service customers.",
      },
    ],
  },
  {
    id: "smart-marketing",
    href: "/smart-marketing",
    label: "Smart Marketing",
    title: "Service retention on autopilot",
    summary:
      "Mileage-triggered text campaigns reach customers at the exact moment service is due and route them straight to your scheduler. Response rates north of 32%.",
    homeImage: "/assets/generated/smart-marketing.webp",
    homeImageAlt: "Service bay, mileage gauge, and phone linked by green telemetry accents",
    pageImage: "/assets/generated/smart-marketing.webp",
    pageImageAlt: "Service bay, mileage gauge, and phone linked by green telemetry accents",
    eyebrow: "Solution",
    lede: "Take the guesswork out of retention. Boost customer-pay ROs, lifetime value, and the next vehicle purchase with mileage-true outreach in your brand.",
    stats: [
      { value: "50+", caption: "Incremental ROs per month" },
      { value: "32.7%", caption: "Campaign response rate" },
      { value: "74%", caption: "Higher next-car purchase among loyal service customers" },
    ],
    benefits: [
      {
        title: "Timing is everything",
        body: "Mileage GPS triggers the text when the vehicle is actually due — not months early or late like a postcard.",
      },
      {
        title: "100% dealer-branded messages",
        body: "The customer hears from your store, then taps into your scheduler. The OEM app stays out of the handoff.",
      },
      {
        title: "Fills the drive without extra headcount",
        body: "Automated campaigns book incremental customer-pay work. Stores running the program see 50+ ROs a month from the channel.",
      },
      {
        title: "Closes the loop to the next sale",
        body: "Customers who stay in your bays are 74% more likely to buy the next unit from you.",
      },
    ],
    faqs: [
      {
        question: "How does Smart Marketing differ from my CRM?",
        answer:
          "CRMs fire on calendars. Smart Marketing fires on actual miles. The message is dealer-branded and lands in a text the customer already reads.",
      },
      {
        question: "What does patented Smart Marketing mean?",
        answer:
          "Mileage-triggered, automated campaigns that route the customer into your scheduler — not a generic drip from a third-party marketing vendor.",
      },
      {
        question: "What is the benefit of retention to me as a dealer?",
        answer:
          "More customer-pay ROs now, and a warmer database when they are in-market for the next car.",
      },
    ],
  },
];

export function getSolution(href: string) {
  const match = solutions.find((item) => item.href === href);
  if (!match) {
    throw new Error(`Unknown solution route: ${href}`);
  }
  return match;
}
