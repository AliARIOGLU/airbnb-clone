import getReservations from "./getReservations";

export default async function getReservLength(id: string) {
  const reservations = await getReservations({ authorId: id });
  return reservations.length;
}
