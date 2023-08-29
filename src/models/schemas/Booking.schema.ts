import { ObjectId } from 'mongodb'
import { VerhicleType } from '~/constants/enum'
interface BookingType {
  _id?: ObjectId
  phone: string
  name: string
  pickupLocation: string
  destination: string
  typeVerhicle?: VerhicleType
}

export default class Booking {
  _id?: ObjectId
  phone: string
  name: string
  pickupLocation: string
  destination: string
  typeVerhicle: VerhicleType
  constructor(Booking: BookingType) {
    this._id = Booking._id
    this.phone = Booking.phone
    this.name = Booking.name
    this.pickupLocation = Booking.pickupLocation
    this.destination = Booking.destination
    this.typeVerhicle = Booking.typeVerhicle || VerhicleType.None
    console.log(Booking.typeVerhicle)
    console.log(Booking.destination)
  }
}
