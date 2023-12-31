import { roles } from '#constants/roles.js';

export const updateIngredient = {
  paths: {
    '/ingredients/{ingredientId}': {
      put: {
        summary: 'Update ingredient',
        description: 'Update ingredient',
        operationId: 'updateIngredient',
        tags: ['Ingredients'],
        security: [{ bearerAuth: [roles.ADMIN] }],
        parameters: [
          {
            in: 'path',
            name: 'ingredientId',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'ID of the ingredient to delete',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Ingredient',
              },
              examples: {
                example1: {
                  value: {
                    name: 'Example Ingredient',
                  },
                  summary: 'Example of adding an ingredient',
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'The ingredient was successfully updated.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      description: 'Ingredient updated successfully',
                    },
                  },
                },
              },
            },
          },
          401: {
            description: 'Unauthorized - Missing or invalid token',
          },
          403: {
            description:
              "Forbidden - User doesn't have permission to edit this ingredient",
          },
          404: {
            description: 'Not found',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
  },
};
