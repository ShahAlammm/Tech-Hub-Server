import { Schema, model } from 'mongoose';
import { TComment } from './comment.interface';
import { COMMENT_STATUS } from './comment.constant';

const commentSchema = new Schema<TComment>(
  {
    item: {
      type: Schema.Types.ObjectId,
      ref: 'Item',
      required: true,
    },
    claimant: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: Object.keys(COMMENT_STATUS),
      default: 'APPROVED',
    },
    description: {
      type: String,
      required: true,
    },
    feedback: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

export const Comment = model<TComment>('comment', commentSchema);
