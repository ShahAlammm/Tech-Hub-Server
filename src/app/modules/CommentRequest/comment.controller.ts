import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CommentRequestServices } from './comment.service';

const createComment = catchAsync(async (req, res) => {
  const result = await CommentRequestServices.createComment(req.body, req.user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment posted Successfully!',
    data: result,
  });
});

// const getClaimRequestById = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await CommentRequestServices.getClaimRequestById(id);

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Claim request retrieved successfully',
//     data: result,
//   });
// });

const updateStatusWithFeedback = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CommentRequestServices.updateStatusWithFeedback(
    id,
    req.body,
    req.user
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Claim request updated successfully',
    data: result,
  });
});

export const CommentControllers = {
  createComment,
  updateStatusWithFeedback,
};
