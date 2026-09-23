import { DepartmentTemplate } from "@/components/DepartmentTemplate";
import { getDepartment } from "@/content/departments";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Ikon for F&I" };

export default function ForFinancePage() {
  return <DepartmentTemplate department={getDepartment("/for-dealers/for-finance")} />;
}
