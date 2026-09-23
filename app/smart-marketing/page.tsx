import { SolutionTemplate } from "@/components/SolutionTemplate";
import { getSolution } from "@/content/solutions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smart Marketing",
  description: "Mileage-triggered, dealer-branded service campaigns that fill the drive.",
};

export default function SmartMarketingPage() {
  return <SolutionTemplate solution={getSolution("/smart-marketing")} />;
}
