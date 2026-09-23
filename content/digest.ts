export type DigestPost = {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: "Sales" | "F&I" | "Service" | "GM";
  excerpt: string;
  paragraphs: string[];
};

export const digestPosts: DigestPost[] = [
  {
    slug: "the-30-day-blind-spot-how-bust-out-fraud-leaves-dealerships-exposed-and-how-to-recover-fast",
    title: "The 30-Day Blind Spot: How Bust-Out Fraud Leaves Dealerships Exposed, and How to Recover Fast",
    date: "2026-09-23",
    author: "Christopher Schouten",
    category: "GM",
    excerpt:
      "Organized rings use bureau lag to steal inventory that still looks financed. Recovery speed is the control that paperwork is not.",
    paragraphs: [
      "Bust-out fraud exploits the gap between delivery and when credit files actually update. On paper the deal is clean. On the street the unit is already gone.",
      "Front-end verification still matters, but it will not close a 30-day window by itself. Stores that recover fast treat location as an operations control, not a gadget they remember after the police report.",
      "Ikon’s active recovery is built for that race: Stolen Mode, a live link for law enforcement, and a desk that does not leave the GSM to ping a map at 2am.",
    ],
  },
  {
    slug: "the-5000-mile-cliff-how-mileage-triggered-service-retention-delivers-a-32-7-response-rate",
    title: "The 5,000-Mile Cliff: How Mileage-Triggered Service Retention Delivers a 32.7% Response Rate",
    date: "2026-09-20",
    author: "Christopher Schouten",
    category: "Service",
    excerpt:
      "Postcards miss the moment. Mileage-true texts hit when the oil is actually due and send the customer into your scheduler.",
    paragraphs: [
      "Most service marketing is a calendar guess. Half the list is early, half is already at the quick lube.",
      "Mileage-triggered campaigns fire when the vehicle crosses the interval. That is why stores on the program see response rates north of 32% and 50-plus incremental ROs a month.",
      "The message is dealer-branded. The destination is your scheduler. The OEM app does not get the handoff.",
    ],
  },
  {
    slug: "zero-damage-zero-pursuit-how-henkel-auto-intercepted-a-test-drive-wagoneer-theft",
    title: "Zero Damage, Zero Pursuit: How Henkel Auto Intercepted a Test-Drive Wagoneer Theft in Real Time",
    date: "2026-09-12",
    author: "Ikon Technologies",
    category: "Sales",
    excerpt:
      "A test-drive that was never coming back. Geofence plus live location brought the unit home without a chase.",
    paragraphs: [
      "The oldest lot story in the book is still the one that works: take it for a spin and do not return.",
      "Henkel’s recovery stayed clean because the store knew the second the Wagoneer left the fence, and law enforcement had a link instead of a description.",
      "That is the difference between a recovery program and a sticker in the window.",
    ],
  },
];

export const newsPosts = [
  {
    slug: "ikon-technologies-appoints-michael-wymard-as-president-to-drive-strategic-expansion",
    title: "Ikon Technologies Names Michael Wymard President to Lead AI-Driven Expansion in Automotive Retail",
    date: "2025-05-22",
    excerpt:
      "Wymard oversees strategic direction, product innovation, and national expansion.",
  },
  {
    slug: "why-investing-in-higher-education-is-good-for-the-community-and-business",
    title: "Why Investing in Higher Education is Good for the Community and Business",
    date: "2024-10-02",
    excerpt:
      "Ikon sponsored The State of Higher Education luncheon with the Greater Arlington Chamber at UT Arlington.",
  },
  {
    slug: "ikon-technologies-redefining-automotive-telematics-through-dealer-centric-innovation",
    title: "Ikon Technologies — Redefining Automotive Telematics through Dealer-Centric Innovation",
    date: "2024-09-01",
    excerpt: "A dealer-built telematics program for lot ops, protection, and retention.",
  },
  {
    slug: "ikon-technologies-unveils-renovated-arlington-headquarters",
    title: "Ikon Technologies Unveils Renovated Arlington Headquarters — Mayor Jim Ross Celebrates Local Tech Growth",
    date: "2024-08-01",
    excerpt: "Arlington HQ renovation marking local growth.",
  },
  {
    slug: "college-of-business-celebrates-completion-opening-of-sam-mahrouq-financial-markets-lab",
    title: "College of Business celebrates completion, opening of Sam Mahrouq Financial Markets Lab",
    date: "2024-06-01",
    excerpt: "UTA College of Business lab opening.",
  },
  {
    slug: "university-of-texas-at-arlingtons-financial-markets-lab-named-for-philanthropist-sam-mahrouq",
    title: "University of Texas at Arlington’s financial markets lab named for philanthropist Sam Mahrouq",
    date: "2024-05-01",
    excerpt: "Naming of the UTA financial markets lab.",
  },
];

export function getDigestPost(slug: string) {
  return digestPosts.find((post) => post.slug === slug);
}

export function getNewsPost(slug: string) {
  return newsPosts.find((post) => post.slug === slug);
}
