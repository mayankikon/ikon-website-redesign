// Fig: the Smart Marketing AI-Engine as a punch-card sorting machine.
// node anatomy/smart-marketing-engine/build.mjs [--light|--dark]
// writes public/smart-marketing-engine.html (light) or -dark.html.
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "../kit/iso-kit.mjs";
import { kitScript } from "../kit/inline-kit.mjs";
import { CHANNELS, QUERIES, SPACING, STAGES, customers, matches } from "./model.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const theme = process.argv.includes("--dark") ? "dark" : "light";
const OUT = join(HERE, "..", "..", "public", theme === "light" ? "smart-marketing-engine.html" : "smart-marketing-engine-dark.html");

const WIDTH = 1000;
const HEIGHT = 520;

// ---- world plan (x along the line, y toward the viewer, z up) ----
const PLATE = { x: -314, y: -124, w: 488, d: 248, r: 10 };
const PLATE_H = 12;
const FOOT_H = 5;

const DECK = 14;
const CARD_H = 1.2;
const CARD_RING = [[-8, -18], [11, -18], [11, 18], [-11, 18], [-11, -15]];

const HOPPER_YS = [-64, 0, 64];
const HOPPER_X = -300;
const HOPPER_H = 34;
const TROUGH = { x: -250, y: -100, w: 30, d: 200, r: 2 };
const TROUGH_H = 4;
const MAG = { x: -216, y: -28, w: 40, d: 56, r: 2 };
const MAG_H = 94;

const BED = { x: -174, y: -22, w: 234, d: 44, r: 2 };
const READ_X = -110;
const GATE_X = -62;
const PRESS_X = 0;
const SHUT_X = 78;
const BIN_X = 119;
const OPEN = { x0: GATE_X - 13, x1: GATE_X + 13, y0: -20, y1: 20 };
const POST_Y = 34;

const LANES = [-80, -40, 0, 40, 80];
const DIVIDERS = [-100, -60, -20, 20, 60, 100];
const RACK = { x: 100, y: -104, w: 40, d: 208, r: 2 };
const RACK_H = 12;
const STACK_MAX = 12;

const CONSOLE = { x: -178, y: -104, w: 56, d: 46, r: 3 };
const CONSOLE_H = 12;
const MONITOR = { x: -176, y: -101, w: 52, d: 15, r: 2 };
const MONITOR_TOP = 52;
const SCREEN = { x0: -172, x1: -128, z0: 20, z1: 46, r: 2.5 };
const KNOB = [-168, -68];

const START_X = -170;
const ENTRY_X = -148;
const PLATEN_REST = 28;
const PLATEN_STROKE = PLATEN_REST - (DECK + CARD_H) - 0.1;

const P = k.fitProjection(
  [...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0), [MAG.x, MAG.y, MAG_H + 4], [PRESS_X, 0, 90], [HOPPER_X + 8, -82, 66], [RACK.x + RACK.w, RACK.y, 40]],
  WIDTH,
  HEIGHT,
  { pad: 26, azimuth: 58 },
);

const at = (point) => k.iso(point, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const byDepth = (points) => [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));
const slab = (plan, z, h, style = { tone: "mid" }, steps = 4, bevel = 0) => S(k.slabOf(plan, z, h, P, steps, bevel), style);
const path = (points, closed = false) => k.pathOf(points.map(at), closed);
// A closed rounded slot drawn in the plane of the face at constant y.
const yPlane = (y) => k.sideMatrix([0, y], 0, P, "left");
const flat = (x0, z0, x1, z1, r, steps = 5) => k.pathOf(k.roundedPlan({ x: x0, y: z0, w: x1 - x0, d: z1 - z0, r }, steps).map(([u, z]) => [u, -z]), true);
const ySlot = (y, x0, z0, x1, z1, r, tone = "lo") => `<g transform="${yPlane(y)}">${L(flat(x0, z0, x1, z1, r), { tone })}</g>`;
// The same on a face at constant x, in world points.
const xSlot = (x, y0, z0, y1, z1, r) => k.pathOf(k.roundedPlan({ x: y0, y: z0, w: y1 - y0, d: z1 - z0, r }, 4).map(([y, z]) => at([x, y, z])), true);

// ---------------------------------------------------------------- base
function plate() {
  const out = [`<path class="iso-halo" d="${k.haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(PLATE, 26))) {
    out.push(S(k.cylinder(x, y, 8, -PLATE_H - FOOT_H, 1.6, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 6.2, -PLATE_H - FOOT_H + 1.6, FOOT_H - 1.6, P, 28), { tone: "mid" }));
  }
  out.push(S(k.slabOf(PLATE, -PLATE_H, PLATE_H, P, 8, 1.6), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(PLATE, 6), 0, P), { tone: "lo" }));
  const screws = k.corners(PLATE, 12);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.4, 0, P, 16)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));
  // Ruler strip along the front edge: the line's length in machine units.
  const strip = { x: -290, y: 104, w: 300, d: 7, r: 1 };
  out.push(S(k.slabOf(strip, 0, 0.6, P, 3), { tone: "lo", crease: "none" }));
  const ticks = k.topTicks(strip.x + 4, strip.x + strip.w - 4, 5, 5, strip.y + 0.8, 0.6, [2, 3.8], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(D([at([strip.x + 2, strip.y + 3.5, 0.6]), at([strip.x + strip.w - 2, strip.y + 3.5, 0.6])], { size: 0.45 }));
  // Maker's plate.
  const label = { x: 30, y: 100, w: 58, d: 14, r: 1.4 };
  out.push(S(k.slabOf(label, 0, 0.8, P, 3), { tone: "lo", crease: "none" }));
  out.push(L(k.planOutline(k.insetPlan(label, 1.6), 0.8, P, 3), { tone: "faint" }));
  out.push(L([40, 30, 20].map((w, i) => k.lineOnTop([label.x + 5, label.y + 4 + i * 3], [label.x + 5 + w, label.y + 4 + i * 3], 0.8, P)).join(""), { tone: "lo", free: true }));
  out.push(D([at([label.x + label.w - 3.5, label.y + 3.5, 0.8]), at([label.x + label.w - 3.5, label.y + label.d - 3.5, 0.8])], { size: 0.45 }));
  return out.join("");
}

// ---------------------------------------------------------------- the three sources
function cardStack(cx, cy, z, count, tone = "hi") {
  const out = [];
  for (let i = 0; i < count; i++) {
    const ring = CARD_RING.map(([x, y]) => [cx + x, cy + y]);
    out.push(S(k.extrude(ring, z + i * CARD_H, CARD_H, P), { tone, crease: i === count - 1 ? "faint" : "none" }));
  }
  return out.join("");
}

function hopper(index) {
  const cy = HOPPER_YS[index];
  const plan = { x: HOPPER_X, y: cy - 23, w: 40, d: 46, r: 2 };
  const out = [`<path class="iso-halo" d="${k.haloOf(plan, 0, 4, P)}" style="filter:blur(5px)"/>`];
  out.push(slab(k.insetPlan(plan, -1.5), 0, 3, { tone: "lo" }, 4, 0.4));
  const seam = k.sideSeam(plan, 18, P, 4);
  out.push(S(k.slabOf(plan, 3, HOPPER_H - 3, P, 4, 0.8), { tone: "mid", inner: L(seam, { tone: "faint" }) }));
  // Open top: a well the stack sits in, with its rim.
  out.push(L(k.planOutline(k.insetPlan(plan, 3), HOPPER_H, P, 4), { tone: "lo" }));
  out.push(cardStack(HOPPER_X + 20, cy, HOPPER_H - 2.4, 5));
  // Mouth on the +x face, where cards leave for the trough.
  out.push(L(xSlot(HOPPER_X + 40, cy - 13, 4, cy + 13, 7, 1), { tone: "lo" }));
  out.push(D([at([HOPPER_X + 40, cy - 17, 26]), at([HOPPER_X + 40, cy + 17, 26])], { size: 0.45 }));
  // Front face screws and a source-specific fitting.
  out.push(D([at([HOPPER_X + 5, plan.y + plan.d, 26]), at([HOPPER_X + 35, plan.y + plan.d, 26])], { size: 0.45 }));
  if (index === 0) {
    // Telematics: a GPS puck and an aerial mast on the hopper top.
    out.push(S(k.cylinder(HOPPER_X + 6, cy - 17, 3.2, HOPPER_H, 2, P, 20), { tone: "mid" }));
    out.push(S(k.cylinder(HOPPER_X + 6, cy - 17, 1.1, HOPPER_H + 2, 28, P, 14), { tone: "mid", crease: "none" }));
    out.push(L([46, 54].map((z) => k.sideArc(HOPPER_X + 6, cy - 17, 1.1, z, P, 8)).join(""), { tone: "faint" }));
    out.push(S(k.cylinder(HOPPER_X + 6, cy - 17, 2.2, HOPPER_H + 30, 2.2, P, 16), { tone: "hi" }));
  }
  if (index === 1) {
    // CRM: index tabs standing behind the stack.
    for (const dy of [-12, 0, 12]) out.push(slab({ x: HOPPER_X + 4, y: cy + dy - 4, w: 2, d: 8, r: 0.5 }, HOPPER_H, 6, { tone: "mid" }, 2));
  }
  if (index === 2) {
    // DMS: a drive bay with a vent grille on the front face.
    out.push(`<g transform="${yPlane(plan.y + plan.d)}">${L(Array.from({ length: 7 }, (_, i) => flat(HOPPER_X + 6 + i * 4, 8, HOPPER_X + 7.4 + i * 4, 15, 0.7, 3)).join(""), { tone: "lo" })}</g>`);
    out.push(ySlot(plan.y + plan.d, HOPPER_X + 6, 19, HOPPER_X + 34, 23, 1));
  }
  return out.join("");
}

function feedLip(index) {
  const cy = HOPPER_YS[index];
  return slab({ x: HOPPER_X + 40, y: cy - 13, w: TROUGH.x + 3 - (HOPPER_X + 40), d: 26, r: 0.6 }, TROUGH_H, 1, { tone: "lo" }, 2);
}

function trough() {
  const out = [];
  out.push(S(k.slabOf(TROUGH, 0, TROUGH_H, P, 4, 0.6), { tone: "lo" }));
  // Guide strips: the far one is broken at each hopper mouth, the near one runs whole.
  const gaps = HOPPER_YS.map((y) => [y - 14, y + 14]);
  let from = TROUGH.y + 1;
  for (const [g0, g1] of [...gaps, [TROUGH.y + TROUGH.d - 1, TROUGH.y + TROUGH.d]]) {
    if (g0 - from > 2) out.push(slab({ x: TROUGH.x + 0.6, y: from, w: 2.4, d: g0 - from, r: 0.5 }, TROUGH_H, 2, { tone: "mid" }, 2));
    from = g1;
  }
  out.push(L(k.lineOnTop([TROUGH.x + 15, TROUGH.y], [TROUGH.x + 15, TROUGH.y + TROUGH.d], TROUGH_H, P), { tone: "faint" }));
  return out.join("");
}

function troughNear() {
  return slab({ x: TROUGH.x + TROUGH.w - 3, y: TROUGH.y + 1, w: 2.4, d: TROUGH.d - 2, r: 0.5 }, TROUGH_H, 2, { tone: "mid" }, 2);
}

function magazine() {
  const out = [`<path class="iso-halo" d="${k.haloOf(MAG, 0, 6, P)}" style="filter:blur(6px)"/>`];
  out.push(slab(k.insetPlan(MAG, -3), 0, 4, { tone: "lo" }, 4, 0.5));
  out.push(D(k.corners(k.insetPlan(MAG, -3), 2.2).map(([x, y]) => at([x, y, 4])), { size: 0.45 }));
  const seams = [30, 62].map((z) => k.sideSeam(MAG, z, P, 4)).join("");
  out.push(S(k.slabOf(MAG, 4, MAG_H - 4, P, 4, 1), { tone: "mid", inner: L(seams, { tone: "faint" }) }));
  // Window on the +y face: the stored cards seen edge-on, ruled every card.
  const FRONT = MAG.y + MAG.d;
  const win = { x0: MAG.x + 7, x1: MAG.x + 27, z0: 12, z1: 84 };
  const lines = [];
  for (let z = win.z0 + 2; z < win.z1 - 1; z += 2.4) lines.push(`M${win.x0} ${(-z).toFixed(1)}H${win.x1}`);
  out.push(`<g transform="${yPlane(FRONT)}"><path class="mag-glass" d="${flat(win.x0, win.z0, win.x1, win.z1, 1.6)}"/><path class="iso-line" data-tone="faint" d="${lines.join("")}"/>${L(flat(win.x0, win.z0, win.x1, win.z1, 1.6), { tone: "lo" })}${L(flat(win.x0 - 2, win.z0 - 2, win.x1 + 2, win.z1 + 2, 2.6), { tone: "faint" })}</g>`);
  // Level ruler beside the window.
  const RX = MAG.x + 33;
  out.push(slab({ x: RX - 1.5, y: FRONT, w: 3, d: 0.8, r: 0.3 }, 12, 72, { tone: "lo", crease: "none" }, 2));
  const ticks = [];
  for (let z = 14, i = 0; z <= 82; z += 4, i++) ticks.push(k.segment([RX - 1.5, FRONT + 0.8, z], [RX - 1.5 + (i % 5 === 0 ? 2.6 : 1.4), FRONT + 0.8, z], P));
  out.push(L(ticks.join(""), { tone: "mid", free: "end" }));
  // Exit slot on the +x face, at deck height, where each card leaves.
  out.push(L(xSlot(MAG.x + MAG.w, -19.5, DECK - 0.4, 19.5, DECK + 2.2, 0.8), { tone: "hi" }));
  // Cap with a lid line and a lift handle.
  const cap = k.insetPlan(MAG, -1);
  out.push(S(k.slabOf(cap, MAG_H, 4, P, 4, 0.6), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(cap, 4), MAG_H + 4, P, 4), { tone: "faint" }));
  out.push(slab({ x: MAG.x + 12, y: -3, w: 3, d: 6, r: 0.8 }, MAG_H + 4, 4, { tone: "mid" }, 2));
  out.push(slab({ x: MAG.x + 25, y: -3, w: 3, d: 6, r: 0.8 }, MAG_H + 4, 4, { tone: "mid" }, 2));
  out.push(slab({ x: MAG.x + 11, y: -2, w: 18, d: 4, r: 1.4 }, MAG_H + 8, 2.2, { tone: "mid" }, 3, 0.3));
  out.push(D(k.corners(cap, 3).map(([x, y]) => at([x, y, MAG_H + 4])), { size: 0.45 }));
  return out.join("");
}

// ---------------------------------------------------------------- stations behind the bed
function gantryPost(x, y) {
  const out = [];
  out.push(slab({ x: x - 6, y: y - 6, w: 12, d: 12, r: 1.2 }, 0, 2, { tone: "lo" }, 3, 0.4));
  out.push(D(k.corners({ x: x - 6, y: y - 6, w: 12, d: 12, r: 1 }, 1.8).map(([px, py]) => at([px, py, 2])), { size: 0.4 }));
  out.push(slab({ x: x - 3.5, y: y - 3.5, w: 7, d: 7, r: 1 }, 2, 46, { tone: "mid" }, 3, 0.4));
  return out.join("");
}

function pressColumn(y) {
  const out = [];
  out.push(slab({ x: PRESS_X - 7, y: y - 7, w: 14, d: 14, r: 1.6 }, 0, 2.4, { tone: "lo" }, 3, 0.5));
  out.push(D(k.corners({ x: PRESS_X - 7, y: y - 7, w: 14, d: 14, r: 1 }, 2).map(([px, py]) => at([px, py, 2.4])), { size: 0.4 }));
  out.push(S(k.cylinder(PRESS_X, y, 5.6, 2.4, 4, P, 28), { tone: "mid" }));
  out.push(S(k.cylinder(PRESS_X, y, 3.8, 6.4, 54 - 6.4, P, 28), { tone: "mid", crease: "none", inner: L([20, 40].map((z) => k.sideArc(PRESS_X, y, 3.8, z, P, 16)).join(""), { tone: "faint" }) }));
  return out.join("");
}

function gateBox() {
  // The solenoid that pulls the trap door, behind the bed at the gate.
  const plan = { x: GATE_X - 10, y: -34, w: 20, d: 10, r: 1.2 };
  const out = [slab(plan, 0, 20, { tone: "mid" }, 3, 0.5)];
  out.push(L(k.planOutline(k.insetPlan(plan, 2), 20, P, 3), { tone: "faint" }));
  out.push(D([at([plan.x + 3, plan.y + 3, 20]), at([plan.x + plan.w - 3, plan.y + 3, 20])], { size: 0.4 }));
  out.push(S(k.cylinder(GATE_X, -29, 2.6, 20, 3, P, 18), { tone: "mid" }));
  return out.join("");
}

// ---------------------------------------------------------------- the bed (conveyor)
function bed() {
  const out = [`<path class="iso-halo" d="${k.haloOf(BED, 0, 6, P)}" style="filter:blur(6px)"/>`];
  out.push(slab(k.insetPlan(BED, -2), 0, 3, { tone: "lo" }, 3, 0.5));
  const seam = k.sideSeam(BED, 8, P, 3);
  out.push(S(k.slabOf(BED, 3, DECK - 3, P, 3, 0.8), { tone: "mid", inner: L(seam, { tone: "faint" }) }));
  // Belt slats across the deck, edge to edge, broken by the trap door.
  const slats = [];
  for (let x = BED.x + 5; x < BED.x + BED.w - 2; x += 7) {
    if (x > OPEN.x0 - 2 && x < OPEN.x1 + 2) continue;
    slats.push(k.lineOnTop([x, BED.y], [x, BED.y + BED.d], DECK, P));
  }
  out.push(L(slats.join(""), { tone: "faint" }));
  // Guide lines along the belt edges, stopping on the trap door rim.
  const guides = [-19, 19].map((y) => k.lineOnTop([BED.x, y], [OPEN.x0, y], DECK, P) + k.lineOnTop([OPEN.x1, y], [BED.x + BED.w, y], DECK, P));
  out.push(L(guides.join(""), { tone: "lo" }));
  // Drive drum hub on the +x end.
  out.push(L(k.sideRing([BED.x + BED.w, 0, 8], 3.2, "x", P), { tone: "lo" }));
  out.push(D([at([BED.x + BED.w, 0, 8])], { size: 0.6, tone: "mid" }));
  // Reject drawer on the +y face under the gate, with its pull.
  const FRONT = BED.y + BED.d;
  out.push(ySlot(FRONT, OPEN.x0 - 2, 4, OPEN.x1 + 2, 11.5, 1, "lo"));
  out.push(slab({ x: GATE_X - 5, y: FRONT, w: 10, d: 2.4, r: 0.8 }, 6.6, 2.2, { tone: "mid" }, 2));
  out.push(D([at([OPEN.x0, FRONT, 7.75]), at([OPEN.x1, FRONT, 7.75])], { size: 0.4 }));
  return out.join("");
}

const openQuad = () => [at([OPEN.x0, OPEN.y0, DECK]), at([OPEN.x1, OPEN.y0, DECK]), at([OPEN.x1, OPEN.y1, DECK]), at([OPEN.x0, OPEN.y1, DECK])];

function trapDoor() {
  const q = openQuad();
  const quad = k.pathOf(q, true);
  const out = [`<clipPath id="sm-open"><path d="${quad}"/></clipPath>`];
  // The well under the door: floor, far wall and -x wall, darker for depth.
  const floorZ = 3;
  const far = path([[OPEN.x0, OPEN.y0, DECK], [OPEN.x1, OPEN.y0, DECK], [OPEN.x1, OPEN.y0, floorZ], [OPEN.x0, OPEN.y0, floorZ]], true);
  const side = path([[OPEN.x0, OPEN.y0, DECK], [OPEN.x0, OPEN.y1, DECK], [OPEN.x0, OPEN.y1, floorZ], [OPEN.x0, OPEN.y0, floorZ]], true);
  out.push(`<g clip-path="url(#sm-open)"><path class="sm-well" d="${quad}"/><path class="iso-shade" data-shade="1" d="${far}"/><path class="iso-shade" data-shade="0" d="${side}"/>`);
  // Two door leaves that slide apart under the deck.
  for (const [dir, x] of [[-1, OPEN.x0], [1, GATE_X]]) {
    const leaf = { x: x + 0.3, y: OPEN.y0 + 0.3, w: 12.4, d: 39.4, r: 0.6 };
    out.push(`<g data-part="leaf" data-dir="${dir}">${S(k.slabOf(leaf, DECK - 1.2, 1, P, 2), { tone: "mid", crease: "none" })}${L(k.lineOnTop([leaf.x + 3, leaf.y], [leaf.x + 3, leaf.y + leaf.d], DECK - 0.2, P) + k.lineOnTop([leaf.x + 9.4, leaf.y], [leaf.x + 9.4, leaf.y + leaf.d], DECK - 0.2, P), { tone: "faint" })}</g>`);
  }
  out.push(`</g>`);
  out.push(L(quad, { tone: "lo" }));
  return out.join("");
}

// The clip a card sinks through: the opening, and everything on screen above it.
function sinkClip() {
  const [farL, farR, nearR, nearL] = openQuad();
  const up = 400;
  return `<clipPath id="sm-sink"><path d="${k.pathOf([nearL, nearR, farR, [farR[0], farR[1] - up], [farL[0], farL[1] - up], farL], true)}"/></clipPath>`;
}

// ---------------------------------------------------------------- the card
const HOLE_ROWS = [-14, -10.5, -7, -3.5];
function cardArt(seed, { lit = true, holes = true, print = true } = {}) {
  const out = [];
  out.push(S(k.extrude(CARD_RING, 0, CARD_H, P), { tone: "hi", crease: "lo", lit }));
  const top = CARD_H;
  // Header rule across the card, edge to edge.
  out.push(L(k.lineOnTop([-11, -1], [11, -1], top, P), { tone: "lo" }));
  if (holes) {
    const pts = [];
    let s = seed * 9301 + 49297;
    HOLE_ROWS.forEach((y) => {
      for (let x = -8.5; x <= 8.6; x += 2.4) {
        s = (s * 9301 + 49297) % 233280;
        if (s / 233280 < 0.42) pts.push(at([x, y, top]));
      }
    });
    out.push(D(pts, { size: 0.42, tone: "hi" }));
  }
  if (print) {
    // The message the press prints: rule lines standing for text, hidden until stamped.
    const rules = [[3, 15], [6.4, 12], [9.8, 16], [13.2, 9]].map(([y, w]) => k.lineOnTop([-8.5, y], [-8.5 + w, y], top, P)).join("");
    out.push(`<g data-part="print" style="opacity:0">${L(rules, { tone: "hi", free: true })}</g>`);
  }
  return out.join("");
}

// ---------------------------------------------------------------- heads over the line
function readerHead() {
  const out = [];
  const head = { x: READ_X - 8, y: -11, w: 16, d: 22, r: 1.6 };
  out.push(S(k.cylinder(READ_X, 0, 5, 22, 4, P, 28), { tone: "mid" }));
  out.push(L(k.ring(READ_X, 0, 3.2, 22, P, 24), { tone: "lo" }));
  const seam = k.sideSeam(head, 34, P, 3);
  out.push(S(k.slabOf(head, 26, 22, P, 3, 0.5), { tone: "mid", inner: L(seam, { tone: "faint" }) }));
  // Lamp on the +y face that lights when a card matches the question.
  const lamp = { x: READ_X - 3.5, y: head.y + head.d, w: 7, d: 1.6, r: 0.6 };
  out.push(slab(lamp, 38, 5, { tone: "mid" }, 2));
  out.push(`<g data-part="read-lamp" class="sm-lamp" style="opacity:0">${S(k.slabOf(lamp, 38, 5, P, 2), { tone: "hi", lit: true })}</g>`);
  out.push(D([at([head.x + 2.5, head.y + head.d, 30]), at([head.x + head.w - 2.5, head.y + head.d, 30])], { size: 0.4 }));
  return out.join("");
}

function bridge(x, z, h = 7) {
  const plan = { x: x - 5, y: -POST_Y - 6, w: 10, d: POST_Y * 2 + 12, r: 1.5 };
  const out = [S(k.slabOf(plan, z, h, P, 3, 0.6), { tone: "mid" })];
  out.push(L(k.lineOnTop([x, plan.y], [x, plan.y + plan.d], z + h, P), { tone: "faint" }));
  out.push(D([-POST_Y, POST_Y].flatMap((y) => [at([x - 2.4, y, z + h]), at([x + 2.4, y, z + h])]), { size: 0.45 }));
  return out.join("");
}

function pressRod() {
  return S(k.cylinder(PRESS_X, 0, 2.2, PLATEN_REST + 8, 54 - PLATEN_REST - 8 + PLATEN_STROKE + 2, P, 18), { tone: "mid", crease: "none" });
}

function platen() {
  const out = [];
  const body = { x: PRESS_X - 12, y: -20, w: 24, d: 40, r: 1.6 };
  out.push(S(k.slabOf(body, PLATEN_REST + 2, 6, P, 3, 0.6), { tone: "mid" }));
  out.push(D(k.corners(body, 2.4).map(([x, y]) => at([x, y, PLATEN_REST + 8])), { size: 0.4 }));
  out.push(S(k.slabOf({ x: PRESS_X - 10.5, y: -18, w: 21, d: 36, r: 1 }, PLATEN_REST, 2, P, 2), { tone: "hi", crease: "lo" }));
  return out.join("");
}

function crosshead() {
  const out = [];
  const plan = { x: PRESS_X - 11, y: -POST_Y - 8, w: 22, d: POST_Y * 2 + 16, r: 2 };
  const seam = k.sideSeam(plan, 58, P, 4);
  out.push(S(k.slabOf(plan, 54, 10, P, 4, 0.8), { tone: "mid", inner: L(seam, { tone: "faint" }) }));
  for (const y of [-POST_Y, POST_Y]) {
    out.push(S(k.cylinder(PRESS_X, y, 4.8, 64, 3, P, 6), { tone: "mid" }));
    out.push(S(k.cylinder(PRESS_X, y, 2.4, 67, 1.4, P, 16), { tone: "mid" }));
  }
  // Actuator on top.
  out.push(S(k.cylinder(PRESS_X, 0, 9, 64, 2, P, 40), { tone: "mid" }));
  out.push(S(k.cylinder(PRESS_X, 0, 7.6, 66, 18, P, 40, 0.5), { tone: "mid", inner: L([72, 78].map((z) => k.sideArc(PRESS_X, 0, 7.6, z, P, 32)).join(""), { tone: "faint" }) }));
  out.push(S(k.cylinder(PRESS_X, 0, 9, 84, 3, P, 40, 0.5), { tone: "mid" }));
  out.push(D(Array.from({ length: 6 }, (_, i) => at([PRESS_X + Math.cos((i / 6) * Math.PI * 2) * 6.6, Math.sin((i / 6) * Math.PI * 2) * 6.6, 87])), { size: 0.4 }));
  // Air fitting on the actuator's +x side.
  out.push(slab({ x: PRESS_X + 7, y: -2, w: 4, d: 4, r: 0.8 }, 78, 3.4, { tone: "mid" }, 2));
  return out.join("");
}

// ---------------------------------------------------------------- shuttle (the API) and bins
function shuttleRails() {
  const out = [];
  for (const x of [63, 88]) {
    out.push(slab({ x, y: -106, w: 5, d: 212, r: 1 }, 0, 6, { tone: "mid" }, 3, 0.4));
    out.push(D([-96, -48, 0, 48, 96].map((y) => at([x + 2.5, y, 6])), { size: 0.4 }));
  }
  for (const y of [-112, 106]) {
    out.push(slab({ x: 60, y, w: 36, d: 6, r: 1.2 }, 0, 10, { tone: "mid" }, 3, 0.5));
    out.push(D([at([64, y + 3, 10]), at([92, y + 3, 10])], { size: 0.45 }));
  }
  // Index marks: one per lane, on a strip beside the near rail.
  const strip = { x: 70, y: -100, w: 5, d: 200, r: 0.8 };
  out.push(S(k.slabOf(strip, 0, 0.6, P, 2), { tone: "lo", crease: "none" }));
  out.push(L(LANES.map((y) => k.lineOnTop([strip.x, y], [strip.x + 3.6, y], 0.6, P)).join(""), { tone: "mid", free: "end" }));
  return out.join("");
}

function carriage() {
  const plan = { x: 60, y: -21, w: 36, d: 42, r: 2 };
  const out = [S(k.slabOf(plan, 6, DECK - 6, P, 3, 0.6), { tone: "mid", inner: L(k.sideSeam(plan, 9, P, 3), { tone: "faint" }) })];
  out.push(L([-12, 0, 12].map((y) => k.lineOnTop([plan.x, y], [plan.x + plan.w, y], DECK, P)).join(""), { tone: "faint" }));
  out.push(D(k.corners(plan, 3).map(([x, y]) => at([x, y, DECK])), { size: 0.45 }));
  return out.join("");
}

function paddle() {
  const plan = { x: 59.5, y: -13, w: 3, d: 26, r: 0.8 };
  return S(k.slabOf(plan, DECK, 6, P, 2, 0.3), { tone: "mid" }) + D([at([61, -8, DECK + 6]), at([61, 8, DECK + 6])], { size: 0.35 });
}

function rackBase() {
  const out = [`<path class="iso-halo" d="${k.haloOf(RACK, 0, 6, P)}" style="filter:blur(6px)"/>`];
  out.push(S(k.slabOf(RACK, 0, RACK_H, P, 4, 0.8), { tone: "mid", inner: L(k.sideSeam(RACK, 4, P, 4), { tone: "faint" }) }));
  // Lane floors: a groove outline under each stack.
  out.push(L(LANES.map((y) => k.planOutline({ x: BIN_X - 12.5, y: y - 19, w: 25, d: 38, r: 1 }, RACK_H, P, 2)).join(""), { tone: "faint" }));
  return out.join("");
}

function divider(y) {
  const plan = { x: 101, y: y - 1, w: 35, d: 2, r: 0.5 };
  return S(k.slabOf(plan, RACK_H, 19, P, 2, 0.3), { tone: "mid" }) + D([at([103, y, RACK_H + 19]), at([134, y, RACK_H + 19])], { size: 0.35 });
}

function stack(lane) {
  const y = LANES[lane];
  const out = [];
  for (let i = 0; i < STACK_MAX; i++) {
    const ring = CARD_RING.map(([px, py]) => [BIN_X + px, y + py]);
    out.push(`<g data-stack="${lane}" data-level="${i}" class="sm-stacked">${S(k.extrude(ring, RACK_H + i * CARD_H, CARD_H, P), { tone: "hi", crease: "lo" })}</g>`);
  }
  return out.join("");
}

function lip() {
  const plan = { x: 136, y: -101, w: 4, d: 202, r: 0.8 };
  const out = [S(k.slabOf(plan, RACK_H, 6, P, 2, 0.3), { tone: "mid" })];
  LANES.forEach((y, lane) => {
    out.push(S(k.cylinder(138, y, 1.6, RACK_H + 6, 1.6, P, 16), { tone: "mid" }));
    out.push(L(xSlot(140, y - 9, RACK_H + 1.4, y + 9, RACK_H + 4.6, 0.6), { tone: "lo" }));
    out.push(`<g data-part="lane-lamp" data-lane="${lane}" class="sm-lamp" style="opacity:0">${S(k.cylinder(138, y, 1.6, RACK_H + 6, 1.6, P, 16), { tone: "hi", lit: true })}</g>`);
  });
  return out.join("");
}

// ---------------------------------------------------------------- the console (the prompt)
function consoleUnit() {
  const out = [`<path class="iso-halo" d="${k.haloOf(CONSOLE, 0, 6, P)}" style="filter:blur(6px)"/>`];
  out.push(S(k.slabOf(CONSOLE, 0, CONSOLE_H, P, 4, 0.8), { tone: "mid", inner: L(k.sideSeam(CONSOLE, 4, P, 4), { tone: "faint" }) }));
  // Keyboard: key caps as closed outlines on the deck.
  const keys = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 8; col++) keys.push(k.planOutline({ x: CONSOLE.x + 16 + col * 4.2 + (row % 2) * 1.6, y: CONSOLE.y + 22 + row * 5, w: 3.6, d: 3.8, r: 0.6 }, CONSOLE_H, P, 2));
  }
  keys.push(k.planOutline({ x: CONSOLE.x + 21, y: CONSOLE.y + 37.5, w: 24, d: 3.8, r: 0.6 }, CONSOLE_H, P, 2));
  out.push(L(keys.join(""), { tone: "lo" }));
  // Selector: three detents, one per question.
  const [kx, ky] = KNOB;
  out.push(L(k.ring(kx, ky, 7.4, CONSOLE_H, P, 32), { tone: "faint" }));
  out.push(L(QUERIES.map((_, i) => {
    const a = knobAngle(i);
    return k.lineOnTop([kx + Math.sin(a) * 7.4, ky - Math.cos(a) * 7.4], [kx + Math.sin(a) * 9.4, ky - Math.cos(a) * 9.4], CONSOLE_H, P);
  }).join(""), { tone: "mid", free: "end" }));
  out.push(S(k.cylinder(kx, ky, 5, CONSOLE_H, 4, P, 32), { tone: "mid" }));
  out.push(L(k.knurl(kx, ky, 5, CONSOLE_H, CONSOLE_H + 4, 30, P), { tone: "lo" }));
  // Monitor with the question on its screen.
  out.push(S(k.slabOf(MONITOR, CONSOLE_H, MONITOR_TOP - CONSOLE_H, P, 3, 0.8), { tone: "mid" }));
  out.push(L(Array.from({ length: 6 }, (_, i) => k.planOutline({ x: MONITOR.x + 16 + i * 4, y: MONITOR.y + 3, w: 1.4, d: 8, r: 0.7 }, MONITOR_TOP, P, 3)).join(""), { tone: "faint" }));
  const FRONT = MONITOR.y + MONITOR.d;
  const { x0, x1, z0, z1, r } = SCREEN;
  const shape = flat(x0, z0, x1, z1, r);
  out.push(`<clipPath id="sm-screen"><path transform="${yPlane(FRONT)}" d="${shape}"/></clipPath>`);
  out.push(`<g transform="${yPlane(FRONT)}"><path class="sm-screen" d="${shape}"/></g>`);
  out.push(`<g clip-path="url(#sm-screen)"><g transform="${yPlane(FRONT)}">`);
  const lines = [];
  for (let z = z0 + 1; z < z1; z += 1.5) lines.push(`M${x0} ${(-z).toFixed(1)}H${x1}`);
  out.push(`<path class="sm-scan" d="${lines.join("")}"/>`);
  QUERIES[0].lines.forEach((text, i) => out.push(`<text class="sm-text" data-line="${i}" x="${x0 + 2.6}" y="${-(z1 - 6.4 - i * 5.6)}" font-size="3.4">${text}</text>`));
  out.push(`<rect class="sm-cursor" x="${x0 + 2.6}" y="${-(z1 - 6.4 - 3 * 5.6) - 2.8}" width="1.9" height="3.2"/>`);
  out.push(`</g></g>`);
  out.push(`<g transform="${yPlane(FRONT)}">${L(shape, { tone: "lo" })}${L(flat(x0 - 2.4, z0 - 2.4, x1 + 2.4, z1 + 2.4, r + 1.6), { tone: "faint" })}</g>`);
  out.push(D([at([x1 + 4.5, FRONT, z0 + 1])], { size: 0.7, tone: "hi" }));
  out.push(ySlot(FRONT, x0 + 6, 13.5, x1 - 6, 15.5, 1));
  return out.join("");
}

const knobAngle = (i) => (-0.55 + i * 0.55);
const knobPointer = (i) => {
  const [kx, ky] = KNOB;
  const a = knobAngle(i);
  return k.lineOnTop([kx - Math.sin(a) * 1.6, ky + Math.cos(a) * 1.6], [kx + Math.sin(a) * 4.4, ky - Math.cos(a) * 4.4], CONSOLE_H + 4, P);
};

function consoleCable() {
  // From the console's +x face along the floor to the reader's far post, up its +x face.
  const px = READ_X + 3.5 + 0.6;
  const pts = [[CONSOLE.x + CONSOLE.w, -72, 4], [CONSOLE.x + CONSOLE.w + 5, -72, 0.6], [px, -72, 0.6], [px, -POST_Y, 0.6], [px, -POST_Y, 32]];
  const d = path(pts);
  return `<g class="sm-cable"><path class="sm-cable-o" d="${d}"/><path class="sm-cable-i" d="${d}"/></g>` + k.wireSvg(at(pts[0]), at(pts[pts.length - 1]), { via: pts.slice(1, -1).map(at), tone: "mid", size: 1.6 });
}


// ---------------------------------------------------------------- counter bank (what was sent)
const COUNTER = { x: -74, y: 54, w: 118, d: 22, r: 3 };
const COUNTER_H = 22;
const WINDOW = (i) => ({ x0: COUNTER.x + 8 + i * 21.4, x1: COUNTER.x + 24 + i * 21.4, z0: 6, z1: 15 });
function counterBank() {
  const out = [`<path class="iso-halo" d="${k.haloOf(COUNTER, 0, 6, P)}" style="filter:blur(6px)"/>`];
  out.push(slab(k.insetPlan(COUNTER, -1.6), 0, 2.4, { tone: "lo" }, 4, 0.4));
  out.push(D(k.corners(k.insetPlan(COUNTER, -1.6), 2).map(([x, y]) => at([x, y, 2.4])), { size: 0.4 }));
  out.push(S(k.slabOf(COUNTER, 2.4, COUNTER_H - 2.4, P, 4, 0.8), { tone: "mid", inner: L(k.sideSeam(COUNTER, 18, P, 4), { tone: "faint" }) }));
  const FRONT = COUNTER.y + COUNTER.d;
  LANES.forEach((_, i) => {
    const { x0, x1, z0, z1 } = WINDOW(i);
    const id = `sm-count-${i}`;
    const shape = flat(x0, z0, x1, z1, 1);
    out.push(`<clipPath id="${id}"><path transform="${yPlane(FRONT)}" d="${shape}"/></clipPath>`);
    out.push(`<g clip-path="url(#${id})"><g transform="${yPlane(FRONT)}"><path class="sm-screen" d="${shape}"/><path class="iso-line" data-tone="faint" d="M${x0} ${-(z0 + z1) / 2}H${x1}"/><text class="sm-count" data-count="${i}" x="${(x0 + x1) / 2}" y="${-(z0 + 2)}" font-size="6.4" text-anchor="middle">00</text></g></g>`);
    out.push(`<g transform="${yPlane(FRONT)}">${L(shape, { tone: "lo" })}</g>`);
    // A plate under each window and a lamp above it, like the bins.
    out.push(ySlot(FRONT, x0 + 2, 2.8, x1 - 2, 4.4, 0.6));
    out.push(D([at([(x0 + x1) / 2, FRONT, 18])], { size: 0.6, tone: "mid" }));
  });
  // Reset key and a grille on the top.
  out.push(S(k.cylinder(COUNTER.x + COUNTER.w - 7, COUNTER.y + 11, 3, COUNTER_H, 2, P, 20), { tone: "mid" }));
  out.push(L(Array.from({ length: 10 }, (_, i) => k.planOutline({ x: COUNTER.x + 8 + i * 8.6, y: COUNTER.y + 6, w: 4.4, d: 10, r: 1.2 }, COUNTER_H, P, 3)).join(""), { tone: "faint" }));
  return out.join("");
}

// ---------------------------------------------------------------- assemble
const pool = 5;
const feeders = HOPPER_YS.length;

const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label:
    "A punch-card sorting machine standing for Ikon's Smart Marketing AI-Engine. Three hoppers on the left hold telematics, CRM and DMS records, which feed a tall card magazine, the datalake. One card per customer leaves the magazine onto a belt. A console with a screen holds the question, and a reader head on a gantry checks each card against it. Cards that don't match drop through a trap door; cards that do go under a press that prints a personal message on them, then a shuttle on a cross rail, the API, carries each card to one of five bins: the Connect app, Google and Meta ads, email, SMS and an AI voice call.",
  body: [
    `<defs>${sinkClip()}</defs>`,
    plate(),
    hopper(0),
    feedLip(0),
    hopper(1),
    feedLip(1),
    hopper(2),
    feedLip(2),
    trough(),
    `<g data-layer="feed">${Array.from({ length: feeders }, (_, i) => `<g data-feed="${i}" style="opacity:0"><g data-move>${cardArt(40 + i, { lit: false, print: false })}</g></g>`).join("")}</g>`,
    troughNear(),
    magazine(),
    consoleUnit(),
    `<path data-part="knob" class="iso-line" data-tone="hi" d="${knobPointer(0)}" style="stroke-width:1"/>`,
    gantryPost(READ_X, -POST_Y),
    consoleCable(),
    gateBox(),
    pressColumn(-POST_Y),
    bed(),
    trapDoor(),
    `<g data-layer="belt"></g>`,
    readerHead(),
    gantryPost(READ_X, POST_Y),
    bridge(READ_X, 48),
    `<g data-part="rod">${pressRod()}</g>`,
    `<g data-part="platen">${platen()}</g>`,
    pressColumn(POST_Y),
    crosshead(),
    shuttleRails(),
    `<g data-part="carriage">${carriage()}<g data-part="paddle">${paddle()}</g></g>`,
    `<g data-layer="shuttle"></g>`,
    rackBase(),
    ...DIVIDERS.flatMap((y, i) => (i < LANES.length ? [divider(y), `<g data-lane-stack="${i}">${stack(i)}</g>`, `<g data-layer="lane-${i}"></g>`] : [divider(y)])),
    lip(),
    counterBank(),
    `<g data-layer="pool" style="display:none">${Array.from({ length: pool }, (_, i) => `<g data-card="${i}" style="opacity:0"><g data-clip><g data-move>${cardArt(i + 1)}</g></g></g>`).join("")}</g>`,
  ],
});

const CUSTOMERS = customers(60, 3);
const live = `
const P = ${JSON.stringify(P)};
const CUSTOMERS = ${JSON.stringify(CUSTOMERS)};
const QUERIES = ${JSON.stringify(QUERIES.map(({ days, miles, lines }) => ({ days, miles, lines })))};
const CHANNELS = ${JSON.stringify(CHANNELS)};
const LANES = ${JSON.stringify(LANES)};
const ST = ${JSON.stringify(STAGES)};
const SPACING = ${SPACING};
const X = { start: ${START_X}, entry: ${ENTRY_X}, read: ${READ_X}, gate: ${GATE_X}, press: ${PRESS_X}, shuttle: ${SHUT_X}, bin: ${BIN_X} };
const DECK = ${DECK}, CARD_H = ${CARD_H}, RACK_H = ${RACK_H}, STACK_MAX = ${STACK_MAX}, STROKE = ${PLATEN_STROKE};
const HOPPER_YS = ${JSON.stringify(HOPPER_YS)}, HOPPER_X = ${HOPPER_X}, TROUGH_X = ${TROUGH.x + TROUGH.w / 2}, MAG_X = ${MAG.x + MAG.w / 2}, TROUGH_Z = ${TROUGH_H};
const KNOB = ${JSON.stringify(KNOB)}, CONSOLE_H = ${CONSOLE_H};
const matches = ${matches.toString()};
const knobAngle = ${knobAngle.toString()};
const knobPointer = (i) => { const [kx, ky] = KNOB; const a = knobAngle(i); return lineOnTop([kx - Math.sin(a) * 1.6, ky + Math.cos(a) * 1.6], [kx + Math.sin(a) * 4.4, ky - Math.cos(a) * 4.4], CONSOLE_H + 4, P); };

const stage = document.querySelector(".iso-stage");
const svg = stage.querySelector("svg");
const readout = document.querySelector("[data-readout]");
const status = document.querySelector("[data-status]");
const still = matchMedia("(prefers-reduced-motion: reduce)");
const $ = (s) => svg.querySelector(s);
const layers = { belt: $('[data-layer="belt"]'), shuttle: $('[data-layer="shuttle"]'), lanes: LANES.map((_, i) => $('[data-layer="lane-' + i + '"]')), pool: $('[data-layer="pool"]') };
const cards = [...svg.querySelectorAll("[data-card]")].map((el) => ({ el, clip: el.querySelector("[data-clip]"), move: el.querySelector("[data-move]"), print: el.querySelector('[data-part="print"]'), slot: -1, layer: null, clipped: false }));
const feeds = [...svg.querySelectorAll("[data-feed]")].map((el) => ({ el, move: el.querySelector("[data-move]") }));
const leaves = [...svg.querySelectorAll('[data-part="leaf"]')];
const rod = $('[data-part="rod"]'), platen = $('[data-part="platen"]');
const carriage = $('[data-part="carriage"]'), paddle = $('[data-part="paddle"]');
const readLamp = $('[data-part="read-lamp"]');
const laneLamps = [...svg.querySelectorAll('[data-part="lane-lamp"]')];
const countEls = [...svg.querySelectorAll("[data-count]")];
const stackEls = LANES.map((_, lane) => [...svg.querySelectorAll('[data-stack="' + lane + '"]')]);
const knob = $('[data-part="knob"]');
const screenLines = [...svg.querySelectorAll(".sm-text")];
const cursor = svg.querySelector(".sm-cursor");

const ease = (u) => (u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u));
const clamp01 = (u) => Math.max(0, Math.min(1, u));
const lerp = (a, b, u) => a + (b - a) * u;

// Stage boundaries, in seconds after a card leaves the magazine.
const T = {};
{
  let t = 0;
  for (const name of ["exit", "toReader", "read", "toGate", "gate"]) { T[name] = [t, t + ST[name]]; t += ST[name]; }
  const fork = t;
  T.sink = [fork, fork + ST.sink];
  for (const name of ["toPress", "press", "toShuttle", "shuttle", "push", "drop"]) { T[name] = [t, t + ST[name]]; t += ST[name]; }
  T.back = [T.push[1], T.push[1] + ST.back];
}
const within = (u, [a, b]) => u >= a && u < b;
const share = (u, [a, b]) => clamp01((u - a) / (b - a));

let query = 0;
let lastRead = -1;
const decided = new Map();
function decisionOf(j) {
  if (!decided.has(j)) {
    const c = CUSTOMERS[j % CUSTOMERS.length];
    decided.set(j, { c, match: matches(c, QUERIES[query]) });
    for (const key of decided.keys()) if (key < j - 8) decided.delete(key);
  }
  return decided.get(j);
}

// Where card j is, u seconds after it left the magazine.
function poseOf(j, u) {
  const { c, match } = decisionOf(j);
  const lane = c.channel;
  const p = { x: X.start, y: 0, z: DECK, alpha: 1, layer: "belt", sink: false, printed: false, done: false };
  if (u < T.exit[1]) { const s = share(u, T.exit); p.x = lerp(X.start, X.entry, ease(s)); p.alpha = clamp01(s / 0.6); return p; }
  if (u < T.toReader[1]) { p.x = lerp(X.entry, X.read, ease(share(u, T.toReader))); return p; }
  if (u < T.read[1]) { p.x = X.read; return p; }
  if (u < T.toGate[1]) { p.x = lerp(X.read, X.gate, ease(share(u, T.toGate))); return p; }
  if (u < T.gate[1]) { p.x = X.gate; return p; }
  if (!match) {
    const s = share(u, T.sink);
    p.x = X.gate; p.z = DECK - 12 * s * s; p.alpha = 1 - ease(clamp01((s - 0.35) / 0.65)); p.sink = true; p.done = s >= 1;
    return p;
  }
  if (u < T.toPress[1]) { p.x = lerp(X.gate, X.press, ease(share(u, T.toPress))); return p; }
  if (u < T.press[1]) { p.x = X.press; p.printed = share(u, T.press) > 0.38; return p; }
  p.printed = true;
  if (u < T.toShuttle[1]) { p.x = lerp(X.press, X.shuttle, ease(share(u, T.toShuttle))); if (p.x > 50) p.layer = "shuttle"; return p; }
  p.layer = "shuttle";
  if (u < T.shuttle[1]) { p.x = X.shuttle; p.y = LANES[lane] * ease(share(u, T.shuttle)); return p; }
  p.y = LANES[lane];
  p.layer = lane;
  if (u < T.push[1]) { p.x = lerp(X.shuttle, X.bin, ease(share(u, T.push))); p.z = DECK + 0.02; return p; }
  const level = Math.min(stackCount[lane], STACK_MAX - 1);
  const floor = RACK_H + level * CARD_H;
  const s = share(u, T.drop);
  p.x = X.bin; p.z = lerp(DECK, floor, s * s); p.done = s >= 1;
  return p;
}

const stackCount = LANES.map(() => 0);
const sent = LANES.map(() => 0);
const showCounts = () => countEls.forEach((el, i) => { const v = String(sent[i]).padStart(2, "0"); if (el.textContent !== v) el.textContent = v; });
const landed = new Set();
let pass = -1;
function showStacks() {
  stackEls.forEach((els, lane) => els.forEach((el, level) => el.classList.toggle("is-on", level < stackCount[lane])));
}

function setQuery(next) {
  query = (next + QUERIES.length) % QUERIES.length;
  screenLines.forEach((el, i) => { el.textContent = QUERIES[query].lines[i]; });
  knob.setAttribute("d", knobPointer(query));
  const hits = CUSTOMERS.filter((c) => matches(c, QUERIES[query])).length;
 lastRead = -1;
  readout.textContent = hits + " of " + CUSTOMERS.length + " match: " + QUERIES[query].lines.slice(1).map((l) => l.trim()).join(" ");
  status.textContent = "Question " + (query + 1) + " of 3: " + QUERIES[query].lines.map((l) => l.replace(">", "").trim()).join(" ") + ". " + hits + " of " + CUSTOMERS.length + " customers match.";
}

let clock = 9.2, last = 0, frame = 0, visible = false;
function sayRead(j) {
  if (j === lastRead) return;
  lastRead = j;
  const { c, match } = decisionOf(j);
  const hits = CUSTOMERS.filter((x) => matches(x, QUERIES[query])).length;
  const text = "card " + c.id + "/60 · " + c.days + " d · " + c.miles.toLocaleString("en-US") + " mi → " + (match ? CHANNELS[c.channel] : "no match") + " · " + hits + " match";
  if (readout.textContent !== text) readout.textContent = text;
}

function draw(t) {
  const newest = Math.floor(t / SPACING);
  const thisPass = Math.floor(Math.max(0, newest) / CUSTOMERS.length);
  if (thisPass !== pass) { pass = thisPass; stackCount.fill(0); sent.fill(0); landed.clear(); showStacks(); showCounts(); }
  let shuttleY = 0, paddleX = 0, platenZ = 0, leafOpen = 0, reading = 0;
  const live = new Map();
  for (let j = newest; j >= Math.max(0, newest - 6); j--) {
    const u = t - j * SPACING;
    if (u < 0) continue;
    const { c, match } = decisionOf(j);
    const lane = c.channel;
    if (within(u, T.read)) { sayRead(j); if (match) reading = Math.max(reading, Math.sin(Math.PI * share(u, T.read))); }
    if (!match && u >= T.gate[0]) {
      leafOpen = Math.max(leafOpen, ease(share(u, T.gate)) * (1 - ease(clamp01((u - T.sink[1]) / 0.35))));
    }
    if (match) {
      if (within(u, T.press)) { const s = share(u, T.press); platenZ = s < 0.35 ? ease(s / 0.35) : s < 0.55 ? 1 : 1 - ease((s - 0.55) / 0.45); }
      if (within(u, T.shuttle)) shuttleY = LANES[lane] * ease(share(u, T.shuttle));
      if (u >= T.push[0] && u < T.back[1]) {
        const s = share(u, T.back);
        shuttleY = u < T.push[1] ? LANES[lane] : LANES[lane] * (1 - ease(s));
        paddleX = u < T.push[1] ? (X.bin - X.shuttle) * ease(share(u, T.push)) : (X.bin - X.shuttle) * (1 - ease(clamp01(s * 1.6)));
      }
      if (u >= T.drop[1] && !landed.has(j) && Math.floor(j / CUSTOMERS.length) === pass) {
        landed.add(j);
        stackCount[lane] = Math.min(STACK_MAX, stackCount[lane] + 1);
        sent[lane] += 1;
        showStacks();
        showCounts();
      }
      const lamp = laneLamps[lane];
      const glow = u >= T.push[1] ? 1 - clamp01((u - T.drop[1]) / 0.6) : 0;
      if (glow > 0) lamp.style.opacity = glow.toFixed(3);
    }
    const p = poseOf(j, u);
    if (!p.done) live.set(j, p);
  }
  laneLamps.forEach((lamp) => { const v = parseFloat(lamp.style.opacity || "0"); if (v > 0 && !lamp.dataset.keep) lamp.style.opacity = Math.max(0, v - 0.02).toFixed(3); });
  readLamp.style.opacity = reading.toFixed(3);
  // Cards: give each live card a pool slot and move it into the layer it sits in.
  const used = new Set();
  for (const card of cards) { if (card.slot >= 0 && live.has(card.slot)) used.add(card.slot); else card.slot = -1; }
  for (const [j] of live) {
    if (used.has(j)) continue;
    const free = cards.find((card) => card.slot < 0);
    if (!free) break;
    free.slot = j; used.add(j);
  }
  for (const card of cards) {
    if (card.slot < 0) { if (card.layer !== layers.pool) { layers.pool.appendChild(card.el); card.layer = layers.pool; } card.el.style.opacity = "0"; continue; }
    const p = live.get(card.slot);
    const layer = p.layer === "belt" ? layers.belt : p.layer === "shuttle" ? layers.shuttle : layers.lanes[p.layer];
    if (card.layer !== layer) { layer.appendChild(card.el); card.layer = layer; }
    if (card.clipped !== p.sink) { if (p.sink) card.clip.setAttribute("clip-path", "url(#sm-sink)"); else card.clip.removeAttribute("clip-path"); card.clipped = p.sink; }
    card.move.setAttribute("transform", translateAlong(P, [p.x, p.y, p.z]));
    card.el.style.opacity = p.alpha.toFixed(3);
    card.print.style.opacity = p.printed ? "1" : "0";
  }
  platen.setAttribute("transform", translateAlong(P, [0, 0, -STROKE * platenZ]));
  rod.setAttribute("transform", translateAlong(P, [0, 0, -STROKE * platenZ]));
  carriage.setAttribute("transform", translateAlong(P, [0, shuttleY, 0]));
  paddle.setAttribute("transform", translateAlong(P, [paddleX, 0, 0]));
  leaves.forEach((leaf) => leaf.setAttribute("transform", translateAlong(P, [Number(leaf.dataset.dir) * 13 * leafOpen, 0, 0])));
  // Records sliding from each hopper along the trough into the magazine.
  feeds.forEach((feed, i) => {
    const s = ((t / (SPACING * 1.5)) + i / feeds.length) % 1;
    const y0 = HOPPER_YS[i];
    let x, y;
    if (s < 0.3) { x = lerp(TROUGH_X - 11, TROUGH_X, ease(s / 0.3)); y = y0; }
    else if (s < 0.75) { x = TROUGH_X; y = lerp(y0, 0, ease((s - 0.3) / 0.45)); }
    else { x = lerp(TROUGH_X, MAG_X, ease((s - 0.75) / 0.25)); y = 0; }
    feed.move.setAttribute("transform", translateAlong(P, [x, y, TROUGH_Z - CARD_H * 0]));
    feed.el.style.opacity = (Math.min(clamp01(s / 0.12), 1 - clamp01((s - 0.82) / 0.12))).toFixed(3);
  });
  cursor.style.opacity = (Math.floor(t * 1.6) % 2) ? "0" : "1";
}

function tick(now) {
  const dt = last ? Math.min((now - last) / 1000, 1 / 20) : 1 / 60;
  last = now;
  clock += dt;
  draw(clock);
  frame = visible && !still.matches ? requestAnimationFrame(tick) : 0;
}
const run = () => { if (!frame && visible && !still.matches) { last = 0; frame = requestAnimationFrame(tick); } };
new IntersectionObserver((entries) => { visible = entries[entries.length - 1].isIntersecting; if (visible) run(); }, { rootMargin: "120px 0px" }).observe(stage);
const step = (by) => { setQuery(query + by); if (still.matches) draw(clock); };
stage.addEventListener("click", () => step(1));
stage.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " " || event.key === "ArrowRight" || event.key === "ArrowUp") { event.preventDefault(); step(1); }
  if (event.key === "ArrowLeft" || event.key === "ArrowDown") { event.preventDefault(); step(-1); }
});
still.addEventListener?.("change", run);
setQuery(0);
draw(clock);
`;

const hits = CUSTOMERS.filter((c) => matches(c, QUERIES[0])).length;
const figure = k.plateHtml({
  fig: "Fig 1",
  title: "Smart Marketing AI-Engine",
  hint: "Click to ask another question",
  readout: `${hits} of 60 customers match`,
  keys: [
    { mark: "raised", label: "Hoppers, back to front: Ikon telematics, CRM, DMS" },
    { mark: "raised", label: "Magazine: the datalake, every record filed per customer" },
    { mark: "edge", label: "Console and reader: the Ikon LLM asked a question in plain words" },
    { mark: "dim", label: "Trap door: customers who don't fit the audience" },
    { mark: "raised", label: "Press: AI-written message for each customer" },
    { mark: "lit", label: "Cards: one customer each" },
    { mark: "raised", label: "Counter bank: messages sent per channel, in bin order" },
    { mark: "raised", label: "Shuttle and bins, back to front: Connect app, Google & Meta ads, email, SMS, AI voice call" },
  ],
  caption:
    "Telematics, CRM and DMS records are filed together, one card per customer. The question on the console sets what the reader looks for; every card that fits drops onto the press and gets its own message, and the shuttle files it into the channel that customer answers on. Click the figure to try another question: the count of matching customers is computed from the 60 cards in the machine.",
  body: `<div class="iso-stage" tabindex="0" role="group" aria-label="Smart Marketing AI-Engine as a card sorter. Press Enter or click to change the question.">${svg}<span class="sm-sr" role="status" aria-live="polite" data-status></span></div>`,
});

const intro = `
<header class="sm-head">
  <a class="sm-back" href="/smart-marketing">← Smart Marketing</a>
  <h1>How the Smart Marketing AI-Engine works</h1>
  <p>Ikon's engine pulls what we know about every customer into one place, lets a dealer ask for an audience in plain words, writes a message for each person in it and sends it on the channel they actually use. Below, the same pipeline built as a machine.</p>
</header>`;

const steps = `
<ol class="sm-steps">
  <li><b>Data in.</b> Ikon telematics (location, battery, diagnostic codes), CRM (name, email, mailing address) and DMS (inventory, sales, product and service history) feed one datalake.</li>
  <li><b>Ask.</b> A dealer types a question, like “customers who haven't been in for service in 6 months or 5,000 miles”. The Ikon LLM turns it into a query over the datalake.</li>
  <li><b>Audience.</b> Only the customers that fit go forward; everyone else is left out of this campaign.</li>
  <li><b>Content.</b> AI writes a message for each customer, based on their own vehicle and history.</li>
  <li><b>Send.</b> The API delivers each message on that customer's channel: an offer in the Connect app, a targeted Google or Meta ad, an email, an SMS or a personal AI voice call.</li>
</ol>`;

const PAGE_EXTRA = `
.iso-page{width:min(1100px,100% - 32px)}
.sm-head{max-width:720px;margin:0 0 8px}
.sm-head h1{margin:14px 0 10px;color:var(--anatomy-strong);font-size:clamp(26px,4vw,36px);line-height:1.15;font-weight:600;letter-spacing:-.02em}
.sm-head p{margin:0;font-size:15px}
.sm-back{color:var(--anatomy-muted);text-decoration:none;font-size:13px}
.sm-back:hover{color:var(--anatomy-strong)}
.sm-steps{max-width:760px;margin:8px 0 0;padding-left:20px;display:grid;gap:8px}
.sm-steps b{color:var(--anatomy-strong);font-weight:600}
.iso-stage{outline:none;cursor:pointer}
.iso-stage:focus-visible{box-shadow:0 0 0 2px var(--anatomy-mid)}
.sm-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
.sm-cable path{fill:none;stroke-linecap:round;stroke-linejoin:round}
.sm-cable-o{stroke:var(--anatomy-mid);stroke-width:2.6px}
.sm-cable-i{stroke:var(--anatomy-paper);stroke-width:1.2px}
.sm-cable + .iso-wire .iso-line{stroke:none}
.sm-well{fill:var(--anatomy-shade-0)}
.mag-glass{fill:var(--anatomy-shade-1)}
.sm-screen{fill:#11161c}
.sm-scan{fill:none;stroke:#ffffff;stroke-opacity:.04;stroke-width:.5}
.sm-text{fill:#7cf0a8;font-family:var(--anatomy-mono);white-space:pre}
.sm-cursor{fill:#7cf0a8}
.iso[data-theme="dark"] .sm-screen{fill:#070a0d}
.sm-count{fill:#e9efe9;font-family:var(--anatomy-mono);font-variant-numeric:tabular-nums}
.sm-stacked{opacity:0;transition:opacity .45s var(--anatomy-ease)}
.sm-stacked.is-on{opacity:1}
@media (prefers-reduced-motion:reduce){.sm-count{fill:#e9efe9;font-family:var(--anatomy-mono);font-variant-numeric:tabular-nums}
.sm-stacked{transition:none}}
`;

const page = k
  .pageHtml({ title: "Smart Marketing AI-Engine · Ikon Technologies", theme, body: intro + figure + steps, script: kitScript() + live, width: 1100 })
  .replace("</style>", PAGE_EXTRA + "</style>");
writeFileSync(OUT, page);
console.log("wrote", OUT, `(${hits}/60 match the first question)`);
