import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { EmailHelper } from '../../utils/emailSender';
import { Item } from '../Item/item.model';
import { COMMENT_STATUS } from './comment.constant';
import { IItem, IUser, TComment } from './comment.interface';
import { Comment } from './comment.model';

import mongoose from 'mongoose';

const createComment = async (payload: TComment, user: JwtPayload) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const item = await Item.findById(payload.item).session(session);

    if (!item) {
      throw new AppError(httpStatus.NOT_FOUND, 'Item not found!');
    }

    if (item.user.toString() === user._id) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Since you found the item, you are not able to claim it'
      );
    }

    const isCommentExists = await Comment.findOne({
      item: item._id,
      claimant: user._id,
    }).session(session); // Query with session

    if (isCommentExists) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'You have already created a claim request!'
      );
    }

    const commentRequest = await Comment.create(
      [
        {
          item: payload.item,
          claimant: user._id,
          description: payload.description,
        },
      ],
      { session }
    );

    await Item.findByIdAndUpdate(
      item._id,
      {
        $push: { claimRequests: commentRequest[0]._id },
      },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return commentRequest;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const updateStatusWithFeedback = async (
  id: string,
  payload: { status: string; feedback: string },
  user: JwtPayload
) => {
  const commentRequest = await Comment.findById(id).populate('item');
  if (!commentRequest) {
    throw new AppError(httpStatus.NOT_FOUND, 'Comment not found!');
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (commentRequest?.item.user != user._id) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You have no permission to update!'
    );
  }

  const result = await Comment.findByIdAndUpdate(id, payload, {
    new: true,
  })
    .populate('item')
    .populate('claimant');

  const populatedItem = result?.item as IItem;
  const populatedClaimant = result?.claimant as IUser;

  const emailData = {
    recipient_name: populatedClaimant.name,
    item_name: populatedItem.title,
    feedback: result?.feedback,
    isApproved: result?.status === COMMENT_STATUS.APPROVED,
  };

  const emailTemplate = await EmailHelper.createEmailContent(
    emailData,
    'claimNotification'
  );
  await EmailHelper.sendEmail(
    populatedClaimant.email,
    emailTemplate,
    `Your claim request is ${result?.status}!`
  );

  return result;
};

export const CommentRequestServices = {
  createComment,
  updateStatusWithFeedback,
};
