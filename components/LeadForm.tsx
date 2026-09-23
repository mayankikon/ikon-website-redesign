"use client";

import { useState, type FormEvent } from "react";

type LeadFormProps = {
  intent: "demo" | "webinar";
};

const roles = ["Owner / GM", "Sales", "F&I", "Fixed Ops", "Other"];

export function LeadForm({ intent }: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    const name = String(payload.name ?? "").trim();
    const email = String(payload.email ?? "").trim();
    const dealership = String(payload.dealership ?? "").trim();
    if (!name || !email || !dealership) {
      setStatus("error");
      setErrorMessage("Name, dealership, and email are required.");
      return;
    }
    if (!email.includes("@")) {
      setStatus("error");
      setErrorMessage("Enter a valid work email.");
      return;
    }
    setStatus("submitting");
    setErrorMessage("");
    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, intent }),
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Call new dealer sales or try again.");
    }
  }

  if (status === "success") {
    return (
      <p className="form-success" role="status">
        Thanks. A dealer who has run a store will follow up. If it is urgent, call (817) 857-8430.
      </p>
    );
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit} noValidate data-testid="lead-form">
      <div className="form-grid">
        <label>
          Name
          <input name="name" autoComplete="name" />
        </label>
        <label>
          Dealership
          <input name="dealership" autoComplete="organization" />
        </label>
        <label>
          Role
          <select name="role" defaultValue="Owner / GM">
            {roles.map((role) => (
              <option key={role}>{role}</option>
            ))}
          </select>
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" />
        </label>
        <label>
          Phone
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        <label>
          Rooftops
          <input name="rooftops" inputMode="numeric" />
        </label>
      </div>
      <label className="form-full">
        What should we walk first?
        <textarea name="notes" rows={4} />
      </label>
      {status === "error" ? (
        <p className="form-error" role="alert">
          {errorMessage}
        </p>
      ) : null}
      <button className="btn btn-primary" type="submit" disabled={status === "submitting"}>
        <span>{status === "submitting" ? "Sending" : intent === "webinar" ? "Register" : "Request a demo"}</span>
      </button>
    </form>
  );
}
