import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { CommentControllers } from './comment.controller';
import { CommentValidation } from './comment.validation';

const router = express.Router();

// router.get(
//   '/received-claim-request',
//   auth(USER_ROLE.USER),
//   ClaimRequestControllers.viewReceivedClaimRequests
// );

// router.get(
//   '/my-claim-request',
//   auth(USER_ROLE.USER),
//   ClaimRequestControllers.viewMyClaimRequests
// );

// router.get(
//   '/:id',
//   auth(USER_ROLE.USER),
//   ClaimRequestControllers.getClaimRequestById
// );

router.post(
  '/',
  auth(USER_ROLE.USER),
  validateRequest(CommentValidation.createCommentValidationSchema),
  CommentControllers.createComment
);

router.put(
  '/:id',
  auth(USER_ROLE.USER),
  validateRequest(CommentValidation.updateCommentStatusWithFeedbackSchema),
  CommentControllers.updateStatusWithFeedback
);

export const CommentRoutes = router;
