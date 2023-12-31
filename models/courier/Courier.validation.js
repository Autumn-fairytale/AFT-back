import Joi from 'joi';
import { vehicleType } from '../../constants/vehicleType.js';
import {
  addressValidationSchema,
  isObjectId,
  phoneNumberPattern,
} from '../../helpers/validation.js';
import { accountStatus } from '../../constants/accountStatus.js';
import { workStatus } from '#constants/workStatus.js';

const idValidationSchema = Joi.string().custom(isObjectId, 'Invalid id');

const CourierValidationSchema = Joi.object({
  userId: idValidationSchema.required(),
  avatar: Joi.string().required(),
  phoneNumber: Joi.string().pattern(phoneNumberPattern).required(),
  address: addressValidationSchema.required(),
  vehicleType: Joi.string()
    .valid(...Object.values(vehicleType))
    .default(vehicleType.NONE)
    .required(),
  accountStatus: Joi.string()
    .valid(...Object.values(accountStatus))
    .default(accountStatus.PENDING),
  liqpayKey: Joi.string().required(),
  isAvailable: Joi.string()
    .valid(...Object.values(workStatus))
    .default(workStatus.NON_ACTIVE)
    .required(),
});

export default CourierValidationSchema;
