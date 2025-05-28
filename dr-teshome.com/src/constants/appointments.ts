export const appointmentSlots = [
  { day: "Monday", time: "9:00 AM - 10:00 AM" },
  { day: "Tuesday", time: "11:00 AM - 12:00 PM" },
  { day: "Wednesday", time: "2:00 PM - 3:00 PM" },
  { day: "Thursday", time: "9:00 AM - 10:00 AM" },
  { day: "Friday", time: "11:00 AM - 12:00 PM" },
];

export type AppointmentSlot = typeof appointmentSlots[number]; 