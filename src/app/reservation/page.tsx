import { Metadata } from "next";
import { ReservationFlow } from "@/components/reservation/ReservationFlow";

export const metadata: Metadata = { title: "Reservation" };

export default function ReservationPage() {
  return <ReservationFlow />;
}
