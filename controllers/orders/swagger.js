import { AddressSchema } from '#controllers/swagger.common.js';
import { createOrderSwagger } from './create/swagger.js';
import { getAllOrdersSwagger } from './get-all/swagger.js';

import {
  CreateOrderResponse,
  GetAllOrdersResponse,
  GetOrderByIdResponse,
  OrderItemSchema,
  OrderSchema,
  ShortDishSchema,
} from './swagger.common.js';

export const ordersSwagger = {
  paths: {
    '/orders': {
      ...getAllOrdersSwagger.paths['/orders'],
      ...createOrderSwagger.paths['/orders'],
    },
  },
  components: {
    schemas: {
      AddressSchema,
      ShortDishSchema,
      OrderItemSchema,
      OrderSchema,
      GetAllOrdersResponse,
      GetOrderByIdResponse,
      CreateOrderResponse,
    },
  },
};
