import { PrivacyCopy } from "@/components/LegalCopy";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return <PrivacyCopy />;
}
