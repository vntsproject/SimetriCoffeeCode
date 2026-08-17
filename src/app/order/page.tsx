import { Suspense } from "react";
import { Metadata } from "next";
import { OrderFlow } from "@/components/order/OrderFlow";

export const metadata: Metadata = { title: "Order Menu" };

export default function OrderPage() {
  return <Suspense fallback={<div className="container-premium min-h-screen pt-32">Loading order...</div>}><OrderFlow /></Suspense>;
}
