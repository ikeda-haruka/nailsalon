// src/types/reservation.ts

export type ReservationStatus = "confirmed" | "completed" | "cancelled";
export type SalonType = "ladies" | "mens";

export interface SalonMenuItem {
  id: string;
  name: string;
  category: "paragel_basic" | "magnet" | "art" | "care" | "mens_care" | "mens_paragel";
  categoryLabel: string;
  salonType: "ladies" | "mens" | "both";
  price: number;
  priceFormatted: string;
  durationMinutes: number;
  timeFormatted: string;
  description: string;
  paragelIncluded: boolean;
  popular?: boolean;
}

export interface SalonReservation {
  id: string;
  userId: string;
  userName: string;
  userKana?: string;
  userEmail: string;
  userPhone: string;
  salonType: SalonType;
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:mm (例: "11:00")
  menuId: string;
  menuName: string;
  price: number;
  durationMinutes: number;
  staffId: string;
  staffName: string;
  designId?: string;
  designTitle?: string;
  designImage?: string;
  couponId?: string;
  couponTitle?: string;
  couponDiscount?: number;
  usedPoints?: number;
  finalPrice: number;
  status: ReservationStatus;
  note?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface TimeSlotAvailability {
  time: string; // HH:mm (例: "10:00")
  available: boolean;
  remainingSeats: number;
  reason?: string;
}

export function calculateEndTime(startTime: string, durationMinutes: number): string {
  if (!startTime || !startTime.includes(":")) return startTime || "";
  const [h, m] = startTime.split(":").map(Number);
  const total = h * 60 + m + durationMinutes;
  const endH = Math.floor(total / 60) % 24;
  const endM = total % 60;
  return `${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`;
}
