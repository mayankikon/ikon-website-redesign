import { ConvertPage } from "@/components/ConvertPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Demo",
  description: "See how Ikon can boost PVR by $323 and drive 32% more ROs.",
};

export default function RequestDemoPage() {
  return (
    <ConvertPage
      intent="demo"
      title="See how Ikon can boost PVR by $323 and drive 32% more ROs"
      lede="Twenty minutes with someone who has run a dealership. During the demo we will cover locate time, active recovery, zero upfront cost, and mileage-true service marketing."
    />
  );
}
