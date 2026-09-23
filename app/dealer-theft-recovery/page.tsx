import { SolutionTemplate } from "@/components/SolutionTemplate";
import { getSolution } from "@/content/solutions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dealer Theft Recovery",
  description: "Active stolen vehicle recovery for dealership inventory and customers.",
};

export default function TheftRecoveryPage() {
  return <SolutionTemplate solution={getSolution("/dealer-theft-recovery")} />;
}
