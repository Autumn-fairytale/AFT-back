import { roles } from '#constants/roles.js';
import {
  BaseCourierSchema,
  createErrorResponse,
  createSuccessResponse,
  idSchema,
  serverError,
} from '../swaggerCouriersComponents.js';

export const updateCourierSwagger = {
  '/couriers/{courierId}': {
    patch: {
      tags: ['Couriers'],
      summary: 'Update a courier',
      description: 'Update the status of order by ID for chef by their ID.',
      parameters: [
        {
          name: 'courierId',
          in: 'path',
          required: true,
          description: 'The unique identifier of the courier',
          schema: idSchema,
        },
        {
          name: 'orderId',
          in: 'path',
          required: true,
          description: 'The unique identifier of the order to be updated',
          schema: idSchema,
        },
      ],
      requestBody: {
        description: 'Data for updating the status of the order',
        required: true,
        content: {
          'application/json': {
            schema: BaseCourierSchema,
          },
        },
      },
      security: [{ bearerAuth: [roles.CHEF, roles.ADMIN] }],
      responses: {
        200: createSuccessResponse('Status updated successfully'),
        400: createErrorResponse('Format of this ID is not correct'),
        404: createErrorResponse('Order not found'),
        500: serverError,
      },
    },
  },
};
