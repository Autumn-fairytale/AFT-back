import express from 'express';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { joiValidation } from '#middlewares/joiValidation.js';
import ChefValidationSchema from '#models/chef/Chef.validation.js';
import { chefControllers } from '#controllers/index.js';
import { verifyToken } from '#middlewares/auth.middleware.js';
import { roles } from '#constants/roles.js';

const router = express.Router();

router.get(
  '/:chefId/statistic',
  isValidId('chefId'),
  verifyToken([roles.CHEF]),
  ctrlWrapper(chefControllers.chefControllers.getChefStatistic)
);

router.get(
  '/',
  // verifyToken([roles.ADMIN, roles.USER, roles.CHEF]),
  ctrlWrapper(chefControllers.chefControllers.getChefs)
);
router.get(
  '/popular',
  ctrlWrapper(chefControllers.chefControllers.getPopularChefs)
);

router.get(
  '/orders',
  verifyToken([roles.CHEF]),
  ctrlWrapper(chefControllers.chefControllers.getOwnChefOrders)
);

router.patch(
  '/orders/:orderId',
  verifyToken([roles.CHEF]),
  ctrlWrapper(chefControllers.chefControllers.updateChefOwnOrderStatus)
);

router.get(
  '/:chefId',
  isValidId('chefId'),
  ctrlWrapper(chefControllers.chefControllers.getChef)
);

router.patch(
  '/:chefId',
  isValidId('chefId'),
  verifyToken([roles.CHEF]),
  ctrlWrapper(chefControllers.chefControllers.updateChef)
);

router.patch(
  '/:chefId/account-status',
  isValidId('chefId'),
  verifyToken([roles.ADMIN]),
  ctrlWrapper(chefControllers.chefControllers.updateChefAvailableStatus)
);

router.delete(
  '/:chefId',
  isValidId('chefId'),
  verifyToken([roles.ADMIN, roles.CHEF]),
  ctrlWrapper(chefControllers.chefControllers.deleteChef)
);

router.post(
  '/',
  joiValidation(ChefValidationSchema),
  verifyToken([roles.USER]),
  ctrlWrapper(chefControllers.chefControllers.createChef)
);

router.patch(
  '/:chefId/orders/:orderId',
  isValidId(['chefId', 'orderId']),
  verifyToken([roles.CHEF]),
  ctrlWrapper(chefControllers.chefControllers.updateChefOrderStatus)
);

router.get(
  '/orders/:status',
  verifyToken([roles.ADMIN, roles.CHEF]),
  ctrlWrapper(chefControllers.chefControllers.getChefOrdersByStatus)
);

export default router;
