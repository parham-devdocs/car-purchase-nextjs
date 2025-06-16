import Reservation from "@/component/Home/Reservation"

const page = ({ params }: { params: { vehicle: string }, children: React.ReactNode }) => {
  return (
    <div >
     <Reservation title={params.vehicle}/>
    </div>
  )
}

export default page