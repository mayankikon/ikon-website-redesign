import { TermsCopy } from "@/components/LegalCopy";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Pre-Paid Terms and Conditions" };

export default function PrepaidTermsPage() {
  return <TermsCopy title="Pre-Paid — Terms and Conditions" />;
}
