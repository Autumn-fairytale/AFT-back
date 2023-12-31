import { orderStatus } from '#constants/orderStatus.js';
import { changeOrderStatus } from '#controllers/orders/helpers.js';
import { ctrlWrapper } from '#middlewares/index.js';
import Order from '#models/order/index.js';

const controller = async (req, res) => {
  const { orderId } = req.params;

  // mock
  const chefId = '6557219bccbbbbc3695bc8b2';

  const order = await Order.findOne({ _id: orderId }).exec();

  // Change order status
  order.status = changeOrderStatus(order, {
    allowedStatuses: [orderStatus.COOKING],
    nextStatus: orderStatus.READY_TO_DELIVERY,
    accessKey: 'chefId',
    id: chefId,
  });
  await order.save();

  return res.json({ success: true, data: 'Order ready to delivery' });
};

export const readyToDelivery = ctrlWrapper(controller);
