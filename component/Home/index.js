import CarRentalDeals from "./CarRentalDeals";
import Reservation from "./Reservation";
import ReservationLookupAndCheckIn from "./ReservationLookUpAnd Check";
import SignInSignUpSection from "./SignInSignUpSection";
import StandardOfCare from "./StandardOfCare";

export default function Index() {
    return <div>
        <Reservation/>
        <SignInSignUpSection/>
        <StandardOfCare/>
        <ReservationLookupAndCheckIn/>
        <CarRentalDeals/>
    </div>
}