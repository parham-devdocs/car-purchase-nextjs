import { PrismaClient } from "@prisma/client";


export async function seedDatabase() {
    const prisma=new PrismaClient()
    // await prisma.reservation.deleteMany();
    // await prisma.pickupData.deleteMany();
    // await prisma.returnData.deleteMany();
    // await prisma.vehicle.deleteMany();
    // await prisma.options.deleteMany();
    // await prisma.user.deleteMany();
      try {
  
    const user = await prisma.reservation.create({
        data:{
         returnDate:"2024/12/2",
         returnTime:"00:38:00",
         pickupDate:"2024/5/2",
         pickupTime:"00:20:00",
         pickupLocation:{connect:{id:2}},
         returnLocation:{connect:{id:1}},
         vehicle:{connect:{id:1}},
         user:{connect:{id:1}}
        }
      });
    // Create Options
    // const option1 = await prisma.options.create({
    //   data: {
    //     CruiseControl: true,
    //     AirConditioner: true,
    //     RWD: false,
    //     BlueTooth: true,
    //     Sunroof: true,
    //     LeatherSeats: true,
    //     GasolineVehicle: true
    //   }
    // });

    // const option2 = await prisma.options.create({
    //   data: {
    //     CruiseControl: false,
    //     AirConditioner: true,
    //     RWD: true,
    //     BlueTooth: true,
    //     Sunroof: false,
    //     LeatherSeats: false,
    //     GasolineVehicle: false
    //   }
    // });

    // // Create Vehicles
    // const car = await prisma.vehicle.create({
    //   data: {
    //     model: 'Tesla Model 7',
    //     type: 'Car',
    //     automaticTransmission: true,
    //     pricePerDay: 89.99,
    //     quantity: 5,
    //     available: true,
    //     maxPassengers: 4,
    //     numberOfDoors: 4,
    //     luggageCapacity: 2,
    //     image: 'tesla.jpg',
        
    //   }
    // });

    // const suv = await prisma.vehicle.create({
    //   data: {
    //     model: 'Jeep Wrangler 9',
    //     type: 'SUV',
    //     automaticTransmission: false,
    //     pricePerDay: 69.99,
    //     quantity: 3,
    //     available: true,
    //     maxPassengers: 5,
    //     numberOfDoors: 4,
    //     luggageCapacity: 4,
    //     image: 'jeep.jpg',
    //     optionsId: option2.id
    //   }
    // });

    // // Create User
   
    // const reservation = await prisma.reservation.create({
    //     data: {
    //       user:{connect:{id:1}}  ,
    //       vehicle:{connect:{id:1}}  ,
    //       pickupData:{connect:{id:1}}  ,
    //       returnData:{connect:{id:1}}  ,
          
          
    //     },
    //     include: {
    //       vehicle: true,
    //       user: true,
    //       pickupData: true,
    //       returnData: true
    //     }
    //   });
  
    // // Create Pickup and Return Data
    // const pickup = await prisma.pickupData.create({
    //   data: {
    //     date: '2024-10-01',
    //     time: '10:00 AM',
    //     reservation:{connect:{id:1}}
    //   }
    // });

    // const returnData = await prisma.returnData.create({
    //   data: {
       
    //     date: '2024-10-05',
    //     time: '02:00 PM',
    //     reservation:{connect:{id:1}}
    //   }
    // });

    // Create Reservation
  
    console.log('✅ Database seeded successfully');
   
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
}
