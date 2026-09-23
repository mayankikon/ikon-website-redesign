import { TermsCopy } from "@/components/LegalCopy";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return <TermsCopy title="Terms & Conditions" />;
}
