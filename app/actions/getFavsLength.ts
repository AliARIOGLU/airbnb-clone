import getFavoriteListings from "./getFavoriteListings";

export default async function getFavsLength() {
  const favs = await getFavoriteListings();
  return favs.length;
}
