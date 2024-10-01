import { ObjectId } from 'mongoose';
import { COMMENT_STATUS } from './comment.constant';

export interface IItem {
  _id: ObjectId;
  title: string;
  user: ObjectId;
}

export interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
}

export type TComment = {
  item: IItem | ObjectId;
  commenter: IUser | ObjectId;
  status: keyof typeof COMMENT_STATUS;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
};
