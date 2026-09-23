import { DepartmentTemplate } from "@/components/DepartmentTemplate";
import { getDepartment } from "@/content/departments";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Ikon for Owners & GMs" };

export default function ForOwnersPage() {
  return <DepartmentTemplate department={getDepartment("/for-dealers/for-owners-gm")} />;
}
