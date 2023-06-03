import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";
import getTripsLength from "./actions/getTripsLength";
import getFavsLength from "./actions/getFavsLength";
import getReservLength from "./actions/getReservLength";
import getPropLength from "./actions/getPropLength";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <html lang="en">
        <body className={font.className}>
          <ClientOnly>
            <ToasterProvider />
            <SearchModal />
            <RentModal />
            <LoginModal />
            <RegisterModal />
            <Navbar currentUser={currentUser} />
          </ClientOnly>
          <div className="pb-20 pt-28">{children}</div>
        </body>
      </html>
    );
  }

  let tripsLength = await getTripsLength(currentUser.id);
  let favsLength = await getFavsLength();
  let reservLength = await getReservLength(currentUser.id);
  let propLength = await getPropLength(currentUser.id);

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModal />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar
            currentUser={currentUser}
            tripsLength={tripsLength}
            favsLength={favsLength}
            reservLength={reservLength}
            propLength={propLength}
          />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
