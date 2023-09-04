import { validate } from '~/utils/validation'
import { checkSchema } from 'express-validator'
import { BOOKING_MESSAGE, USERS_MESSAGES } from '~/constants/messages'

export const bookingValidator = validate(
  checkSchema({
    pickupLocation: {
      isString: {
        errorMessage: BOOKING_MESSAGE.PICKUPLOCATION_IS_INVALID
      },
      notEmpty: {
        errorMessage: BOOKING_MESSAGE.PICKUPLOCATION_IS_REQUIRED
      },
      trim: true
    },
    destination: {
      isString: {
        errorMessage: BOOKING_MESSAGE.DESTINATION_IS_INVALID
      },
      notEmpty: {
        errorMessage: BOOKING_MESSAGE.DESTINATION_IS_REQUIRED
      },
      trim: true
    },
    name: {
      isString: {
        errorMessage: USERS_MESSAGES.NAME_MUST_BE_A_STRING
      },
      notEmpty: {
        errorMessage: USERS_MESSAGES.NAME_IS_REQUIRED
      },
      isLength: {
        options: {
          min: 1,
          max: 1000
        },
        errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
      },
      trim: true
    },
    phone: {
      isMobilePhone: {
        errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID
      },
      notEmpty: {
        errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED
      },
      trim: true
    },
    typeVerhicle: {
      notEmpty: {
        errorMessage: 'You must choose type of verhicle'
      }
    }
  })
)
