import mongoose from 'mongoose';
import { z } from 'zod';
import { COMMENT_STATUS } from './comment.constant';

const createCommentValidationSchema = z.object({
  body: z.object({
    item: z
      .string({
        required_error: 'Item is required',
      })
      .refine((val) => {
        return mongoose.Types.ObjectId.isValid(val);
      }),
    description: z.string({
      required_error: 'Description is required',
    }),
    status: z.nativeEnum(COMMENT_STATUS).default(COMMENT_STATUS.APPROVED),
  }),
});

const updateCommentValidationSchema = z.object({
  body: z.object({
    description: z
      .string({
        required_error: 'Description is required',
      })
      .optional(),
    status: z.nativeEnum(COMMENT_STATUS).optional(),
  }),
});

const updateCommentStatusWithFeedbackSchema = z.object({
  body: z.object({
    feedback: z
      .string({
        required_error: 'Feedback is required',
      })
      .optional(),
    status: z.nativeEnum(COMMENT_STATUS),
  }),
});

export const CommentValidation = {
  createCommentValidationSchema,
  updateCommentValidationSchema,
  updateCommentStatusWithFeedbackSchema,
};
