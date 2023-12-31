import { accountStatus, roles } from '#constants/index.js';
import {
  errorMessage,
  errorName,
  errorResponse,
  pagePaginationParameters,
} from '#controllers/swagger.common.js';
import { DefaultErrorResponse } from '../swaggerCommon.js';

export const getAllUsersSwagger = {
  paths: {
    '/users': {
      get: {
        tags: ['Users'],
        summary: 'Get all users',
        description: 'Returns a list of users',
        security: [{ cookieAuth: [roles.ADMIN], refreshToken: [] }],
        operationId: 'getAllUsers',
        parameters: [
          ...pagePaginationParameters,
          {
            name: 'status',
            in: 'query',
            description: 'Filter users by account status',
            schema: {
              type: 'string',
              enum: [accountStatus.ACTIVE, accountStatus.BLOCKED],
            },
          },
          {
            name: 'city',
            in: 'query',
            description: 'Filter users by city',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'lastName',
            in: 'query',
            description: 'Filter users by last name',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'sortBy',
            in: 'query',
            description: 'Sort users by creation date',
            schema: {
              type: 'string',
              enum: ['newest', 'oldest'],
              default: 'newest',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful response with a list of users',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/GetAllUsersResponse',
                },
              },
            },
          },
          401: {
            ...errorResponse(errorName[401], errorMessage[401]),
          },
          403: DefaultErrorResponse[403],
          404: {
            ...errorResponse(
              errorName[404],
              'Invalid token: no user found from the token'
            ),
          },
          500: {
            ...errorResponse(errorName[500], errorMessage[500]),
          },
        },
      },
    },
  },
};
