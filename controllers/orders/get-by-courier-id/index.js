import { withPagination } from '../../../helpers/withPagination.js';
import { ctrlWrapper, isValidParameterId } from '../../../middlewares/index.js';
import Order from '../../../models/order/index.js';

const controller = async (req, res) => {
  const { courierId } = req.params;

  const [orders, pagination] = await withPagination(
    Order.find(
      { courierId },
      { createdAt: false, updatedAt: false, __v: false }
    ).populate('items.dish', 'image'),
    req.query
  );

  const data = { orders, ...pagination };

  return res.send({ success: true, data });
};

export const getAllOrdersByCourierId = (router) => {
  // TODO: add auth validation (access: courier, admin)
  router.get(
    '/by-courier/:courierId',
    isValidParameterId,
    ctrlWrapper(controller)
  );
};
