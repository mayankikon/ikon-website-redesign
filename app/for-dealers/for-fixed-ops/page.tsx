import { DepartmentTemplate } from "@/components/DepartmentTemplate";
import { getDepartment } from "@/content/departments";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Ikon for Fixed Ops" };

export default function ForFixedOpsPage() {
  return <DepartmentTemplate department={getDepartment("/for-dealers/for-fixed-ops")} />;
}
