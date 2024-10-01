import { Schema, model } from 'mongoose';
import { ItemCategory } from '../ItemCategory/itemCategory.model';
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
      type: Schema.Types.ObjectId,
      ref: 'ItemCategory',
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
    claimRequests: {
      type: [Schema.Types.ObjectId],
      ref: 'ClaimRequest',
      default: [],
      select: 0,
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

// Middleware to increment item count in associated category
itemSchema.post('save', async function (doc) {
  try {
    await ItemCategory.findByIdAndUpdate(doc.category, {
      $inc: { postCount: 1 },
    });
  } catch (error) {
    throw new Error(
      `Failed to increment item count for category ${doc.category}: ${error}`
    );
  }
});

export const Item = model<TItem>('Item', itemSchema);
