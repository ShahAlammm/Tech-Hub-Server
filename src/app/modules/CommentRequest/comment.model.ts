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
    commenter: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

export const Comment = model<TComment>('comment', commentSchema);
