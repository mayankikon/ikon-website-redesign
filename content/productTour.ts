// Product tour: every screen Ikon ships, grouped by surface. `screen` is the
// screenshot shown inside the device mockup; leave it out and the device shows
// a blank screen until the asset exists in /public/assets/tour/.

export type TourItem = {
  title: string;
  product: "Toolbox" | "Connect";
  body: string;
  href: string;
  /** Name of the page `href` opens, for the card's link. */
  linkLabel: string;
  icon: string;
  screen?: string;
  screenAlt: string;
};

export const tourHero = {
  display: { screen: undefined as string | undefined, screenAlt: "Toolbox dashboard" },
  toolboxPhone: { screen: undefined as string | undefined, screenAlt: "Toolbox mobile app" },
  connectPhone: { screen: undefined as string | undefined, screenAlt: "Dealer-branded Connect app" },
};

export const webTour: TourItem[] = [
  {
    title: "Lot Management",
    product: "Toolbox",
    body: "A live map of every unit on the lot, inventory status and aging, and alerts when a unit leaves the perimeter.",
    href: "/lot-management",
    linkLabel: "Lot Management",
    icon: "layers",
    screenAlt: "Lot management dashboard with live vehicle map",
  },
  {
    title: "Smart Marketing",
    product: "Toolbox",
    body: "Mileage-triggered, dealer-branded service campaigns, and the ROs they bring back to the drive.",
    href: "/smart-marketing",
    linkLabel: "Smart Marketing",
    icon: "handshake",
    screenAlt: "Smart Marketing campaigns dashboard",
  },
  {
    title: "Key Finder",
    product: "Toolbox",
    body: "Bluetooth key tracking shows where every key is, so the next appointment never waits on a hunt.",
    href: "/lot-management",
    linkLabel: "Lot Management",
    icon: "key",
    screenAlt: "Key Finder view locating a vehicle's keys",
  },
  {
    title: "Lot Audit",
    product: "Toolbox",
    body: "One-touch floorplan audits from 24/7 asset visibility: no clipboard walk, and reporting that stays accurate.",
    href: "/lot-management",
    linkLabel: "Lot Management",
    icon: "clipboard-check",
    screenAlt: "Lot Audit view with floorplan audit report",
  },
];

export const mobileTour: TourItem[] = [
  {
    title: "Run the lot from your phone",
    product: "Toolbox",
    body: "Your team’s Toolbox on the lot: find cars and keys, check battery health and run audits from a phone.",
    href: "/lot-management",
    linkLabel: "Lot Management",
    icon: "wrench",
    screenAlt: "Toolbox mobile app for dealership staff",
  },
  {
    title: "Your store’s app for customers",
    product: "Connect",
    body: "Your store’s app on your customers’ phones: find the car, Stolen Mode, service reminders and booking.",
    href: "/connected-car",
    linkLabel: "Connected Car",
    icon: "smartphone",
    screenAlt: "Dealer-branded Connect app home screen",
  },
];
