import type { OrderStatus } from "@/types";

export const ACTIVE_STATUSES: OrderStatus[] = [
  "PLACED",
  "CONFIRMED",
  "PREPARING",
  "READY_FOR_PICKUP",
  "PICKED_UP",
  "OUT_FOR_DELIVERY",
];

export const TRACKING_STAGES: { status: OrderStatus; label: string }[] = [
  { status: "PLACED", label: "Placed" },
  { status: "CONFIRMED", label: "Confirmed" },
  { status: "PREPARING", label: "Preparing" },
  { status: "READY_FOR_PICKUP", label: "Ready" },
  { status: "PICKED_UP", label: "Picked up" },
  { status: "OUT_FOR_DELIVERY", label: "On the way" },
  { status: "DELIVERED", label: "Delivered" },
];

export function statusIndex(status: OrderStatus) {
  if (status === "CANCELLED") return -1;
  return TRACKING_STAGES.findIndex((s) => s.status === status);
}

export function statusLabel(status: OrderStatus) {
  if (status === "CANCELLED") return "Cancelled";
  return TRACKING_STAGES.find((s) => s.status === status)?.label ?? status;
}
