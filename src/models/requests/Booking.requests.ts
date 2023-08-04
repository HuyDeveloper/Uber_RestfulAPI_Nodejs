import { VerhicleType } from '~/constants/enum'
export interface BookingReqBody {
  phone: string
  name: string
  pickupLocation: string
  destination: string
  typeVehicle: VerhicleType
}