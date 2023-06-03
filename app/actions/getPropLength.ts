import getListings from "./getListings";

export default async function getPropLength(id: string) {
  const properties = await getListings({ userId: id });
  return properties.length;
}
