export type Competitor = {
  slug: string;
  href: string;
  name: string;
  title: string;
  lede: string;
  points: { title: string; body: string }[];
  rows: { label: string; ikon: string; them: string }[];
};

export const competitors: Competitor[] = [
  {
    slug: "lojack",
    href: "/why-dealers-choose-ikon-over-lojack",
    name: "LoJack",
    title: "Why dealers choose Ikon over LoJack",
    lede: "No upfront costs. Account management that shows up. Service retention marketing that delivers. Your brand in the customer’s pocket.",
    points: [
      { title: "Zero upfront device costs", body: "Pay when the customer buys. Unused hardware can be bought out instead of sitting as dead inventory." },
      { title: "Account management that shows up", body: "A partner after the sale, not a gadget vendor that ghosts the store." },
      { title: "Managed retention marketing", body: "Mileage-triggered campaigns LoJack does not run for you." },
      { title: "Customer theft benefit", body: "A $10,000 benefit the desk can actually present." },
    ],
    rows: [
      { label: "Upfront cost", ikon: "Consignment, $0 preload", them: "Capital tied up in devices" },
      { label: "Account management", ikon: "Named support after install", them: "Hardware-first relationship" },
      { label: "Customer theft benefit", ikon: "$10,000 program benefit", them: "Recovery brand, thinner F&I story" },
      { label: "Service retention marketing", ikon: "Included Smart Marketing", them: "Not a retention engine" },
    ],
  },
  {
    slug: "recovr",
    href: "/why-dealers-choose-ikon-over-recovr",
    name: "RecovR",
    title: "Why dealers choose Ikon over RecovR",
    lede: "A true connected-car program, not a one-time gadget. Hardwired reliability, after-sales support, and retention marketing.",
    points: [
      { title: "Device reliability", body: "Hardwired vehicle power instead of a battery-only accessory that dies in the lot or after delivery." },
      { title: "Account management that shows up", body: "Training, recovery desk, and F&I support after the box is in the car." },
      { title: "Managed retention marketing", body: "The same device books service ROs. RecovR is a transaction; Ikon is a loop." },
      { title: "Your brand in their pocket", body: "Dealer-branded app, not a one-time recovery sticker." },
    ],
    rows: [
      { label: "Device choice", ikon: "Hardwired telematics", them: "Often battery / one-time unit" },
      { label: "Account management", ikon: "Ongoing partner", them: "Install-and-done" },
      { label: "Customer theft benefit", ikon: "$10,000 benefit + app", them: "Recovery event only" },
      { label: "Service retention marketing", ikon: "Included", them: "Not in the box" },
    ],
  },
  {
    slug: "karr-security",
    href: "/why-dealers-choose-ikon-over-karr-security",
    name: "KARR Security",
    title: "Why dealers choose Ikon over KARR Security",
    lede: "No upfront costs. Zero wire-splicing risk. Modern telematics built to protect dealer gross.",
    points: [
      { title: "Zero upfront and 100% buyout", body: "Do not tie working capital in static preload. Pay for devices after the customer buys." },
      { title: "Fast, clean installs", body: "No spliced harnesses that create warranty and liability arguments in the shop." },
      { title: "100% dealer-branded mobile experience", body: "Your store on the home screen, not a security vendor’s." },
      { title: "Factory-warranty-aware install", body: "A cleaner conversation with fixed ops than cut-and-splice aftermarket." },
    ],
    rows: [
      { label: "Upfront cost", ikon: "$0 consignment", them: "Preload inventory" },
      { label: "Installation method", ikon: "Clean, no spliced harnesses", them: "Higher splice / warranty risk" },
      { label: "Factory warranty impact", ikon: "Designed to stay out of the fight", them: "Harness work creates questions" },
      { label: "Service retention marketing", ikon: "Included", them: "Security-first, not RO-first" },
    ],
  },
  {
    slug: "passtime-gps",
    href: "/why-dealers-choose-ikon-over-passtime-gps",
    name: "PassTime GPS",
    title: "Why dealers choose Ikon over PassTime GPS",
    lede: "No upfront costs. Built for franchise stores, not BHPH repo. Competitor buy-out and retention marketing included.",
    points: [
      { title: "Zero-upfront consignment", body: "Franchise working capital stays in vehicles, not GPS inventory." },
      { title: "Built for franchise growth", body: "A connected-car and retention program, not a buy-here-pay-here starter interruptor heritage.", },
      { title: "Competitor inventory buyout", body: "A path off the last vendor without eating a trailer of dead devices." },
      { title: "Dealer-branded mobile experience", body: "Your CSI and your next sale, not a payment-enforcement brand in the customer’s pocket." },
    ],
    rows: [
      { label: "Upfront cost", ikon: "Consignment", them: "Often financed preload" },
      { label: "Platform heritage", ikon: "Franchise dealerships", them: "BHPH / repo roots" },
      { label: "Competitor buyout", ikon: "Yes", them: "You own the leftover stock" },
      { label: "Service retention marketing", ikon: "Included", them: "Not the core product" },
    ],
  },
];

export function getCompetitor(slug: string) {
  const match = competitors.find((item) => item.slug === slug);
  if (!match) {
    throw new Error(`Unknown competitor: ${slug}`);
  }
  return match;
}
