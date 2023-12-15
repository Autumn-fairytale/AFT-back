// import { orderStatus } from '#constants/orderStatus.js';
// import { ForbiddenError, NotFoundError } from '../../../helpers/index.js';
// import Order from '../../../models/order/Order.model.js';

// export const updateCourierOrderStatus = async (req, res) => {
//   const { orderId } = req.params;
//   const { status: updateStatus } = req.body;

//   if (
//     !Object.prototype.hasOwnProperty.call(
//       orderStatus,
//       updateStatus.toUpperCase()
//     )
//   ) {
//     throw new ForbiddenError('Invalid order status');
//   }

//   const newCourierOrderStatus = await Order.findByIdAndUpdate(
//     orderId,
//     { status: updateStatus },
//     {
//       new: true,
//     }
//   );

//   if (!newCourierOrderStatus) {
//     throw new NotFoundError('Courier not found');
//   }

//   res.status(200).json(newCourierOrderStatus);
// };

import { orderStatus } from '#constants/orderStatus.js';
import { ForbiddenError, NotFoundError } from '../../../helpers/index.js';
import Order from '../../../models/order/Order.model.js';

export const updateCourierOrderStatus = async (req, res) => {
  const courierId = '6571051b4bf4c4bafef01361';
  // req.roleIds.courier;
  const { orderId } = req.params;
  const { status: updateStatus } = req.body;

  if (
    !updateStatus ||
    !Object.prototype.hasOwnProperty.call(
      orderStatus,
      updateStatus.toUpperCase()
    )
  ) {
    throw new ForbiddenError('Invalid order status');
  }
  let newCourierOrderStatus;
  const order = await Order.findById(orderId);

  if (!order) {
    throw new NotFoundError('Order not found');
  }
  if (updateStatus === orderStatus.DELIVERING) {
    newCourierOrderStatus = await Order.findByIdAndUpdate(
      orderId,
      { courierId: courierId, status: updateStatus },
      { new: true }
    );
  } else if (order.courierId && order.courierId.toString() !== courierId) {
    throw new ForbiddenError('Access denied: Courier IDs do not match');
  } else {
    newCourierOrderStatus = await Order.findByIdAndUpdate(
      orderId,
      { status: updateStatus },
      { new: true }
    );
  }

  res.status(200).json(newCourierOrderStatus);
};