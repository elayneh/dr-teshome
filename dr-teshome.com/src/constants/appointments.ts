export interface AppointmentSlot {
  day: string;
  time: string;
  available: boolean;
}

export const appointmentSlots: AppointmentSlot[] = [
  {
    day: "Monday",
    time: "9:00 AM - 10:00 AM",
    available: true
  },
  {
    day: "Tuesday",
    time: "11:00 AM - 12:00 PM",
    available: true
  },
  {
    day: "Wednesday",
    time: "2:00 PM - 3:00 PM",
    available: true
  },
  {
    day: "Thursday",
    time: "9:00 AM - 10:00 AM",
    available: true
  },
  {
    day: "Friday",
    time: "11:00 AM - 12:00 PM",
    available: true
  }
] 