import Joi from 'joi';
import { vehicleType } from '../../constants/vehicleType';
import { addressValidationSchema, phoneNumberPattern } from '../../helpers/validation';
import { accountStatus } from '../../constants/accountStatus';

const CourierValidationSchema = Joi.object({
  userId: Joi.required(),
  avatar: Joi.string().required(),
  phoneNumber: Joi.string().pattern(phoneNumberPattern).required(),
  address: addressValidationSchema.required(),
  vechicleType: Joi.string(0)
    .valid(...vehicleType)
    .default(vehicleType.NONE).required,
  accountStatus: Joi.string()
    .valid(...accountStatus)
    .default(accountStatus.PENDING)
    .required(),
  isAvailable: Joi.boolean().default(false),
});

export default CourierValidationSchema;
