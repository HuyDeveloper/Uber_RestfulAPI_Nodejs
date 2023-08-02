import { ObjectId } from 'mongodb'
interface BookingType {
  _id?: ObjectId
  phone: string
  name: string
  pickupLocation: string
  destination: string
  typeVehicle: string
}
export default class Booking {
  _id?: ObjectId
  phone: string
  name: string
  pickupLocation: string
  destinationL: string
  typeVehicle: string
  constructor(Booking: BookingType) {
    this._id = Booking._id
    this.phone = Booking.phone
    this.name = Booking.name
    this.pickupLocation = Booking.pickupLocation
    this.destinationL = Booking.destination
    this.typeVehicle = Booking.typeVehicle
  }
}