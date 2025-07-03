import CarRentalDeals from "./CarRentalDeals";
import Reservation from "../Reservation";
import ReservationLookupAndCheckIn from "./ReservationLookUpAnd Check";
import SignInSignUpSection from "./SignInSignUpSection";
import StandardOfCare from "./StandardOfCare";

export default function Index() {
  return (
    <div className=" dark:bg-black transition-all duration-500">
      <Reservation />
      <SignInSignUpSection />
      <StandardOfCare />
      <ReservationLookupAndCheckIn />
      <CarRentalDeals />
    </div>
  );
}
