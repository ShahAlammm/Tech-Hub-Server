import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';
import { ItemRoutes } from '../modules/Item/item.route';
import { ItemCategoryRoutes } from '../modules/ItemCategory/itemCategory.route';
import { ProfileRoutes } from '../modules/Profile/profile.route';
import { CommentRoutes } from '../modules/CommentRequest/comment.route';
import { MeilisearchRoutes } from '../modules/Meilisearch/meilisearch.routes';
import { ImageUploadRoutes } from '../modules/ImageUpload/imageUpload.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/item-categories',
    route: ItemCategoryRoutes,
  },
  {
    path: '/items',
    route: ItemRoutes,
  },
  {
    path: '/comment-request',
    route: CommentRoutes,
  },
  {
    path: '/search-items',
    route: MeilisearchRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
  {
    path: '/image-upload',
    route: ImageUploadRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
