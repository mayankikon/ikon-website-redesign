import { CompetitivePage } from "@/components/CompetitivePage";
import { getCompetitor } from "@/content/competitors";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Why Dealers Choose Ikon Over KARR Security" };

export default function Page() {
  return <CompetitivePage competitor={getCompetitor("karr-security")} />;
}
