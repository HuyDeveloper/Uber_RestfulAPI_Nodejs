import { ObjectId } from 'mongodb'
import { VerhicleType } from '~/constants/enum'
interface BookingType {
  _id?: ObjectId
  phone: string
  name: string
  pickupLocation: string
  destination: string
  typeVehicle?: VerhicleType
}
export default class Booking {
  _id?: ObjectId
  phone: string
  name: string
  pickupLocation: string
  destinationL: string
  typeVehicle: VerhicleType
  constructor(Booking: BookingType) {
    this._id = Booking._id
    this.phone = Booking.phone
    this.name = Booking.name
    this.pickupLocation = Booking.pickupLocation
    this.destinationL = Booking.destination
    this.typeVehicle = Booking.typeVehicle || VerhicleType.None
  }
}