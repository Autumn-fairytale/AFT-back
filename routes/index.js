import ordersRouter from './orders.js';
import reviewsRouter from './reviews.js';
import ingredientsRoutes from './ingredients.js';
import dishesRoutes from './dishes.js';
import chefsRoutes from './chefs.js';
import userRoutes from './users.js';
import courierRoutes from './couriers.js';
import s3Router from './files.js';
import sseRoutes from './sse.js';
import notificationsRoutes from './notifications.js';
import adminRoutes from './admin.js';

export const routes = (app) => {
  app.use('/api/orders', ordersRouter);
  app.use('/api/reviews', reviewsRouter);
  app.use('/api/ingredients', ingredientsRoutes);
  app.use('/api/dishes', dishesRoutes);
  app.use('/api/chefs', chefsRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/couriers', courierRoutes);
  app.use('/api/files', s3Router);
  app.use('/api/sse', sseRoutes); //stream
  app.use('/api/notifications', notificationsRoutes);
  app.use('/api/admin', adminRoutes);
};
