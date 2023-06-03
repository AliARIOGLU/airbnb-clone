import getReservations from "./getReservations";

export default async function getTripsLength(id: string) {
  const trips = await getReservations({ userId: id });
  return trips.length;
}
