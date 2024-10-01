import mongoose from 'mongoose';
import { z } from 'zod';
import { ITEM_STATUS } from './item.constant';

const createItemValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    image: z.string().optional(),
    status: z.nativeEnum(ITEM_STATUS).default(ITEM_STATUS.APPROVED),
    user: z
      .string({
        required_error: 'User is required',
      })
      .refine((val) => {
        return mongoose.Types.ObjectId.isValid(val);
      }),
    category: z
      .string({
        required_error: 'Category is required',
      })
      .optional(),
  }),
});

const updateItemValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    status: z.nativeEnum(ITEM_STATUS).optional(),
    user: z
      .string()
      .refine((val) => {
        return mongoose.Types.ObjectId.isValid(val);
      })
      .optional(),
    category: z.string().optional(),
    questions: z.array(z.string()).optional(),
  }),
});

export const ItemValidation = {
  createItemValidationSchema,
  updateItemValidationSchema,
};
