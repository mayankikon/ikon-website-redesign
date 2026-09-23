import { TermsCopy } from "@/components/LegalCopy";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Consignment Terms and Conditions" };

export default function ConsignmentTermsPage() {
  return <TermsCopy title="Consignment — Terms and Conditions" />;
}
