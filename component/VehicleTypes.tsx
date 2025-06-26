import Image from 'next/image';
import TruckImage from '@/public/1702938420277.avif';
import VansImage from '@/public/1706555483738.avif';
import CarImage from '@/public/1567006637480.avif';
import SUVImage from '@/public/1702938491304.avif';
import Link from 'next/link';

type VehicleType = {
  image: any;
  type: string;
  link:string
};

const cardsInfo: VehicleType[] = [
  { image: TruckImage, type: 'Truck',link:"/vehicles/trucks" },
  { image: VansImage, type: 'Vans',link:"/vehicles/vans" },
  { image: CarImage, type: 'Car',link:"/vehicles/cars" },
  { image: SUVImage, type: 'SUV',link:"/vehicles/suv" },
];

export default function VehicleTypes() {
  return (
    <section className="w-full py-12 bg-blue-500 dark:bg-gray-800 transition-all duration-500 dark:bg rounded-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-stone-300">Choose Your Vehicle Type</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {cardsInfo.map((vehicle, index) => (
            <VehicleTypeCard key={index} image={vehicle.image} type={vehicle.type} link={vehicle.link} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VehicleTypeCard({image,type,link}:VehicleType) {
  return (
    <Link href={link} passHref>
      <div className="group w-[250px] h-[320px] bg-gray-100 dark:bg-neutral-900  rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={image}
            alt={type}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-6 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-stone-400">{type}</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-stone-200">Select this vehicle type</p>
        </div>
      </div>
    </Link>
  );
}