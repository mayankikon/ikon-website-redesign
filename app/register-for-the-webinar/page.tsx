import { ConvertPage } from "@/components/ConvertPage";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Register for the Webinar" };

export default function WebinarPage() {
  return (
    <ConvertPage
      intent="webinar"
      title="Sign up to unlock the full webinar"
      lede="Same program walkthrough as a live demo: four solutions, department impact, and the numbers stores actually run."
    />
  );
}
