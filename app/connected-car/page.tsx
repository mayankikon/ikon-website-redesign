import { SolutionTemplate } from "@/components/SolutionTemplate";
import { getSolution } from "@/content/solutions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connected Car",
  description: "Dealer-branded app, $10,000 theft benefit, and F&I gross that stays on the books.",
};

export default function ConnectedCarPage() {
  return <SolutionTemplate solution={getSolution("/connected-car")} />;
}
