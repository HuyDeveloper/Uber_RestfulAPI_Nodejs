import { BookingReqBody } from '~/models/requests/Booking.requests'
import databaseService from '~/services/database.services'
import Booking from '~/models/schemas/Booking.schema'
class BookingService {
  async booking(payload: BookingReqBody){
    const result = await databaseService.booking.insertOne(new Booking({ ...payload }))
  }
}

const bookingService = new BookingService()
export default bookingService