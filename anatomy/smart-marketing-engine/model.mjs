// The truth behind the figure: a deterministic set of customers, the questions
// the console can ask, and the timing of one card through the machine.
// Everything the page shows (which cards drop, which bin they land in, the
// counts in the readout) is computed from this module.

export const CHANNELS = ["Connect app", "Google & Meta ads", "Email", "SMS", "AI voice call"];

// The three questions the console's selector steps through. The first is the
// one from the slide: not serviced in 6 months or 5,000 miles since purchase.
export const QUERIES = [
  { days: 182, miles: 5000, lines: ["> not serviced in", "  6 months or", "  5,000 miles"] },
  { days: 91, miles: 3000, lines: ["> not serviced in", "  3 months or", "  3,000 miles"] },
  { days: 365, miles: 10000, lines: ["> not serviced in", "  12 months or", "  10,000 miles"] },
];

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Each card is one customer, with fields that come from the three sources:
// days since last service (DMS), miles since that service (telematics) and
// the channel the customer answers on (CRM / Connect app).
export function customers(count = 60, seed = 3) {
  const rand = mulberry32(seed);
  const weights = [0.24, 0.18, 0.22, 0.24, 0.12];
  return Array.from({ length: count }, (_, id) => {
    // Most customers came in recently; a long tail hasn't been back for a year.
    const days = Math.round(15 + 420 * Math.pow(rand(), 1.7));
    const miles = Math.round((days * (8 + rand() * 22)) / 10) * 10;
    let pick = rand();
    let channel = 0;
    while (channel < weights.length - 1 && pick > weights[channel]) pick -= weights[channel++];
    return { id: id + 1, days, miles, channel };
  });
}

export const matches = (customer, query) => customer.days > query.days || customer.miles > query.miles;

// Seconds spent in each stage. A new card leaves the magazine every SPACING
// seconds; every shared station (reader, gate, press, shuttle) finishes its
// cycle well inside that, so cards never wait on each other.
export const SPACING = 1.8;
export const STAGES = {
  exit: 0.5,
  toReader: 0.6,
  read: 0.5,
  toGate: 0.6,
  gate: 0.25,
  sink: 0.5,
  toPress: 0.7,
  press: 0.7,
  toShuttle: 0.8,
  shuttle: 0.6,
  push: 0.45,
  drop: 0.2,
  back: 0.6,
};
