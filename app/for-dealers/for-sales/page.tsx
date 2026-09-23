import { DepartmentTemplate } from "@/components/DepartmentTemplate";
import { getDepartment } from "@/content/departments";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Ikon for Sales" };

export default function ForSalesPage() {
  return <DepartmentTemplate department={getDepartment("/for-dealers/for-sales")} />;
}
