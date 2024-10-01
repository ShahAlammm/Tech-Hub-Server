import { ObjectId } from 'mongoose';
import { ITEM_STATUS } from './item.constant';
import { TComment } from '../CommentRequest/comment.interface';

export type TItem = {
  title: string;
  description: string;
  images?: string[];
  status: keyof typeof ITEM_STATUS;
  user: ObjectId;
  category: ObjectId; //*
  claimRequests?: TComment[]; //*
  premium: boolean;
  upVotes: [];
  downVotes: [];
  createdAt?: Date;
  updatedAt?: Date;
};
