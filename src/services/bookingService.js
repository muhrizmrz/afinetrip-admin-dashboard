import { bookingClient } from "../lib/axiosClient";

export const getAllBookings = async () => {
  const { data } = await bookingClient.get("/bookings");
  return data;
};

export const createBooking = async (payload) => {
  const { data } = await bookingClient.post("/bookings", payload);
  return data;
};
