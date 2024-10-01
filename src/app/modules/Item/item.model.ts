import { Schema, model } from 'mongoose';
import { ITEM_STATUS } from './item.constant';
import { TItem } from './item.interface';

const itemSchema = new Schema<TItem>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: Object.keys(ITEM_STATUS),
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    premium: {
      type: Boolean,
      default: false,
    },
    upVotes: {
      type: [String],
      default: [],
    },
    downVotes: {
      type: [String],
      default: [],
    },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: 'Comment',
      default: [],
      select: 0,
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

export const Item = model<TItem>('Item', itemSchema);
