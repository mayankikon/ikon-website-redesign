import { NextResponse } from "next/server";

type LeadBody = {
  intent?: string;
  name?: string;
  email?: string;
  dealership?: string;
  role?: string;
  rooftops?: string;
};

export async function POST(request: Request) {
  let body: LeadBody = {};
  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const dealership = String(body.dealership ?? "").trim();
  if (!name || !email || !dealership || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 422 });
  }

  console.info(
    JSON.stringify({
      level: "info",
      operation: "captureLead",
      intent: body.intent ?? "demo",
      rooftops: body.rooftops ?? null,
      role: body.role ?? null,
    }),
  );

  return NextResponse.json({ ok: true });
}
