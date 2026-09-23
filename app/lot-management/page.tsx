import { SolutionTemplate } from "@/components/SolutionTemplate";
import { getSolution } from "@/content/solutions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lot Management",
  description:
    "Map and locate vehicles and keys, set geofences, and run audits with no upfront device cost.",
};

export default function LotManagementPage() {
  return <SolutionTemplate solution={getSolution("/lot-management")} />;
}
