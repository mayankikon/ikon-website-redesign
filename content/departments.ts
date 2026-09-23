export type Department = {
  href: string;
  role: string;
  title: string;
  homeBody: string;
  avatar: string;
  sceneImage: string;
  sceneImageAlt: string;
  lede: string;
  promise: string;
  stats: { value: string; caption: string }[];
  features: { title: string; body: string }[];
};

export const departments: Department[] = [
  {
    href: "/for-dealers/for-sales",
    role: "Sales Manager",
    title: "Sales velocity",
    homeBody:
      "Cars and keys found in seconds instead of minutes. Roughly 15 minutes saved per deal, and a lot that's always ready for the next appointment.",
    avatar: "/assets/illustrations/avatar-sales.svg",
    sceneImage: "/assets/illustrations/scene-sales.svg",
    sceneImageAlt: "Sales floor scene with appointment-ready inventory",
    lede: "Command the front. Accelerate your sales. The team belongs on the floor closing, not playing hide and seek with keys and cars.",
    promise: "Spend more time with customers. Close faster. Look smarter on the lot.",
    stats: [
      { value: "15 min", caption: "Average time saved per sale" },
      { value: "+23", caption: "CSI points from cutting wait times" },
      { value: "$323", caption: "Average front-end PVR from Connected Car" },
    ],
    features: [
      { title: "Appointment readiness", body: "Battery health and unit location before the customer arrives." },
      { title: "Test-drive success", body: "Keys and cars pinned so the lead stays hot." },
      { title: "Floorplan control", body: "Know what is on the lot without a clipboard walk." },
      { title: "A product customers like", body: "Pitch the app and $10,000 theft benefit instead of a forgettable hard-add." },
    ],
  },
  {
    href: "/for-dealers/for-finance",
    role: "F&I Director",
    title: "Protected gross",
    homeBody:
      "A product with real, tangible value behind it, an app the customer opens and a theft benefit they understand, so it presents clean and stays on the contract.",
    avatar: "/assets/illustrations/avatar-fi.svg",
    sceneImage: "/assets/illustrations/scene-fi.svg",
    sceneImageAlt: "F&I desk scene with a customer-ready connected product",
    lede: "Secure the backend. Lock in gross. A useful app and a $10,000 theft warranty customers keep — not GAP/VSC they cancel.",
    promise: "Non-cancellable product, wrap opportunity, and reinsurance that does not hold your money hostage.",
    stats: [
      { value: "$10,000", caption: "Customer theft benefit" },
      { value: "30%", caption: "Average term wrap rate" },
      { value: "90 days", caption: "Reinsurance payout window" },
    ],
    features: [
      { title: "Zero chargeback risk", body: "Sticky gross that stays on the books after they drive off." },
      { title: "Instant income realization", body: "A hard-add the desk can explain in one sitting." },
      { title: "Great wrap opportunity", body: "Match the term to the note instead of leaving money on the table." },
      { title: "Tangible consumer product", body: "Find-your-car plus theft protection is easier than etching or a gadget." },
    ],
  },
  {
    href: "/for-dealers/for-fixed-ops",
    role: "Fixed Ops",
    title: "Service loyalty",
    homeBody:
      "Outreach lands when the vehicle is actually due, not on a generic calendar. More ROs written, fewer customers lost to the shop down the road.",
    avatar: "/assets/illustrations/avatar-service.svg",
    sceneImage: "/assets/illustrations/scene-service.svg",
    sceneImageAlt: "Service drive scene with mileage-true outreach",
    lede: "Fill the drive with customers who are actually due. Mileage-true texts beat postcards and the quick lube down the street.",
    promise: "Automated, dealer-branded service marketing and loaner control off the same device.",
    stats: [
      { value: "50+", caption: "Incremental ROs per month" },
      { value: "32.7%", caption: "Campaign response rate" },
      { value: "100%", caption: "Dealer-branded messages" },
    ],
    features: [
      { title: "Mileage-triggered outreach", body: "Hit the 5,000-mile cliff when it actually happens." },
      { title: "One-tap scheduling", body: "Route the customer into your scheduler, not a generic landing page." },
      { title: "Loaner compliance", body: "Speed alerts and recovery tools for the service fleet." },
      { title: "Win the loyalty war", body: "Keep ROs in your bays instead of independent shops and OEM apps." },
    ],
  },
  {
    href: "/for-dealers/for-owners-gm",
    role: "General Manager / Owner",
    title: "Dealer sovereignty",
    homeBody:
      "Stay connected to your inventory and your customers long after delivery, instead of handing that relationship to the OEM's app.",
    avatar: "/assets/illustrations/avatar-owner.svg",
    sceneImage: "/assets/illustrations/the-loop.svg",
    sceneImageAlt: "Full dealer loop from lot through delivery, app, and service",
    lede: "Own the relationship after the sale. Velocity, gross, service capacity, and customer lifetime value on one program.",
    promise: "One device, every department, no upfront capital, and the database stays yours.",
    stats: [
      { value: "99.8%", caption: "Theft / fraud recovery rate" },
      { value: "74%", caption: "Higher next-car rate for loyal service customers" },
      { value: "$0", caption: "Upfront device cost" },
    ],
    features: [
      { title: "One program, not four vendors", body: "Lot, recovery, F&I, and retention on the same data." },
      { title: "Insurance and audit relief", body: "Faster recoveries, cleaner floorplan, minutes instead of hours." },
      { title: "Reinsurance that pays", body: "Lowest fees in the conversation, payouts as soon as 90 days." },
      { title: "Your brand on the home screen", body: "The OEM does not get to hijack the customer after delivery." },
    ],
  },
];

export function getDepartment(href: string) {
  const match = departments.find((item) => item.href === href);
  if (!match) {
    throw new Error(`Unknown department route: ${href}`);
  }
  return match;
}
