import { ObjectId } from 'mongoose';
import { TClaimRequest } from '../ClaimRequest/claimRequest.interface';
import { ITEM_STATUS } from './item.constant';

export type TItem = {
  title: string;
  description: string;
  images?: string[];
  status: keyof typeof ITEM_STATUS;
  isReported?: boolean;
  reportCount?: number;
  user: ObjectId;
  category: ObjectId;
  questions?: string[]; //*
  createdAt?: Date;
  updatedAt?: Date;
  claimRequests?: TClaimRequest[]; //*
};
