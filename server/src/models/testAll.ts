import { CarModel } from "./carModel";
import { ReservationModel } from "./reservationModel";
import { UserModel } from "./userModel";

// Sync DB and run tests
async function runTests() {
 
  try {
    console.log('✅ Database synced.');

    // Step 1: Create a user
    const user = await UserModel.create({
      username: 'john_doe1',
      email: 'johnDo87e@example.com',
      password: 'secret',
      drivers_age: 25,
      licence_number: 1456789,
      first_name: 'John',
      last_name: 'Doe',
      phone_number: '+1234567890'
    });
    console.log('👤 Created User:', user.toJSON());

    // Step 2: Create a car
    const car = await CarModel.create({
      type: 'SUV',
      bags: 4,
      passengers: 5,
      automatic_transmission: true,
      doors: 4,
      model: 'Toyota RAV4'
    })
    console.log('🚗 Created Car:', car.toJSON());

    // Step 3: Create a reservation for that user and car
    const reservation = await ReservationModel.create({
      car_id: car.dataValues.car_id,
      user_id: user.dataValues.user_id,
      pickupLocation: 'Airport',
      returnLocation: 'Airport',
      pickupDate: new Date(),
      returnDate: new Date(Date.now() + 86400000), // tomorrow
      pickupTime: '10:00:00'
    });
    console.log('📅 Created Reservation:', reservation.toJSON());

    // Step 4: Try creating another reservation for same user → should fail due to unique constraint
    console.log('\n🔁 Trying to create another reservation for the same user...');
    try {
      await ReservationModel.create({
        car_id: 1, // fake ID
        user_id: user.dataValues.user_id,
        pickupLocation: 'Hotel',
        returnLocation: 'Hotel',
        pickupDate: new Date(),
        returnDate: new Date(Date.now() + 86400000),
        pickupTime: '12:00:00'
      });
    } catch (err) {
      console.log('❌ Failed as expected:', err);
    }

    // Step 5: Fetch user with reservation and car
    const userWithReservation = await UserModel.findByPk(user.dataValues.user_id, {
      include: {
        model: ReservationModel,
        as: 'reservation',
        include: [{ model: CarModel, as: 'car' }]
      }
    });

    console.log('\n🔍 Fetched User with Reservation and Car:');
    console.log(JSON.stringify(userWithReservation, null, 2));

    // Step 6: Fetch car with reservation and user
    const carWithReservation = await CarModel.findByPk(car.dataValues.car_id, {
      include: {
        model: ReservationModel,
        as: 'reservation',
        include: [{ model: UserModel, as: 'user' }]
      }
    });

    console.log('\n🔍 Fetched Car with Reservation and User:');
    console.log(JSON.stringify(carWithReservation, null, 2));

  } catch (err) {
    console.error('🚨 Error during test:', err);
  } finally {
    console.log('\n🔌 Database connection closed.');
  }
}

export default runTests