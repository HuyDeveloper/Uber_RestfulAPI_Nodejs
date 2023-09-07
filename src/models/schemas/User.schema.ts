import { ObjectId } from 'mongodb'
import { UserVerifyStatus, VerhicleType } from '~/constants/enum'
interface UserType {
  _id?: ObjectId
  phone: string
  name: string
  date_of_birth?: Date
  password: string
  created_at?: Date
  updated_at?: Date
  email_veriry_token?: string
  forgot_password_token?: string
  verify?: UserVerifyStatus
  typeVerhicle?: VerhicleType

  bio?: string
  location?: string
  website?: string
  username?: string
  avatar?: string
  cover_photo?: string
}

export default class User {
  _id?: ObjectId
  name: string
  phone: string
  date_of_birth?: Date
  password: string
  created_at: Date
  updated_at: Date
  email_veriry_token: string
  forgot_password_token: string
  verify: UserVerifyStatus
  typeVerhicle: VerhicleType

  bio:string
  location:string
  website: string
  username: string
  avatar: string
  cover_photo: string
  constructor(user: UserType){
    const date = new Date()
    this._id = user._id
    this.name = user.name || ''
    this.phone = user.phone
    this.date_of_birth = user.date_of_birth || new Date()
    this.password = user.password
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
    this.email_veriry_token = user.email_veriry_token ||''
    this.forgot_password_token = user.forgot_password_token||''

    this.verify = user.verify || UserVerifyStatus.Unverified
    this.typeVerhicle = user.typeVerhicle || VerhicleType.None
    this.bio = user.bio || ''
    this.location = user.location|| ''
    this.website = user.website|| ''
    this.username =user.username|| ''
    this.avatar = user.avatar|| ''
    this.cover_photo = user.cover_photo|| ''
  }
}