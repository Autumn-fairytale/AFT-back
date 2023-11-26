import { Router } from 'express';
import { orderControllers as ctrl } from '#controllers/index.js';
import { validate } from '#middlewares/validation.middleware.js';
import { orderValidationSchema } from '#models/order/order.validation.js';
// import verifyToken from '#middlewares/auth.middleware.js';
// import { roles } from '#constants/roles.js';

const ordersRouter = Router();

ordersRouter.get(
  '/',
  //verifyToken([roles.ADMIN]),
  ctrl.getAllOrders
);
ordersRouter.post(
  '/',
  //verifyToken([roles.USER]),
  validate(orderValidationSchema),
  ctrl.createOrder
);
export default ordersRouter;
