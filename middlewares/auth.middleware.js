import { UnAuthorizedError, ForbiddenError } from '#helpers/errors.js';
import User from '#models/user/index.js';
import {
  refresh_token_401_error,
  roles,
  tokenType,
  tokens_failed_401_error,
} from '#constants/index.js';
import { decodeToken } from '#controllers/users/auth/helpers.js';
import Token from '#models/token/tokenModel.js';

export const checkTokensValidity = async (accessToken, refreshToken) => {
  if (!refreshToken) throw new UnAuthorizedError(tokens_failed_401_error);

  if (!accessToken) throw new UnAuthorizedError(refresh_token_401_error);

  const accessPayload = await decodeToken(accessToken, tokenType.ACCESS);

  if (accessPayload.expired)
    throw new UnAuthorizedError(refresh_token_401_error);

  const userId = accessPayload.id;
  const isActualTokens = await Token.findOne({
    userId,
    accessToken,
    refreshToken,
  });

  if (!isActualTokens) throw new UnAuthorizedError(tokens_failed_401_error);

  return accessPayload;
};

/**
 * Middleware for role-based JWT token verification.
 *
 * @param {Object} options - Middleware options.
 * @param {string[]} options.requiredRoles - Array of required user roles (e.g., ['chef', 'courier', 'admin']).
 *
 * @example
 * // Protect a route by specifying required roles, for instance, ['chef', 'admin']
 * router.get('/orders/by-chef/:chefId', verifyToken(['chef', 'admin']), async (req, res) => {}
 *
 * @returns {Object} - Object containing role IDs associated with the requiredRoles for the current user.
 * Example: { 'user': 'userId', 'chef': 'chefId', 'admin': 'adminId' }
 */

export const verifyToken = (requiredRoles) => {
  const checkUserRole = (userRoles, requiredRoles) => {
    return userRoles.some((userRole) => requiredRoles.includes(userRole.name));
  };

  const mapUserRoles = (userRoles, requiredRoles) => {
    const roleIds = {};
    userRoles.forEach((userRole) => {
      if (
        requiredRoles.includes(userRole.name) ||
        userRole.name === roles.USER
      ) {
        roleIds[userRole.name] = userRole.id.toString();
      }
    });

    return roleIds;
  };

  return async (req, res, next) => {
    try {
      const { accessToken, refreshToken } = req.cookies;

      const accessPayload = await checkTokensValidity(
        accessToken,
        refreshToken
      );

      const { id: userId } = accessPayload;

      const user = await User.findById(userId).exec();
      if (!user)
        throw new UnAuthorizedError(
          'Invalid token: no user found from the token'
        );

      const hasRequiredRole = checkUserRole(user.roles, requiredRoles);

      if (!hasRequiredRole) {
        throw new ForbiddenError(
          'You are not authorized to view/modify this resource'
        );
      }

      req.roleIds = mapUserRoles(user.roles, requiredRoles);

      next();
    } catch (error) {
      next(error);
    }
  };
};
