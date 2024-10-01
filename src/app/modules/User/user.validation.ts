import { z } from 'zod';
import { USER_ROLE, USER_STATUS } from './user.constant';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    role: z.nativeEnum(USER_ROLE),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({
        message: 'Invalid email',
      }),
    password: z.string({
      required_error: 'Password is required',
    }),
    status: z.nativeEnum(USER_STATUS).default(USER_STATUS.ACTIVE),
    profilePhoto: z.string().optional(),
    followers: z.array(z.string()).optional(),
    following: z.array(z.string()).optional(),
    subscriptions: z
      .object({
        isSubscribed: z.boolean().optional(),
        subscriptionDate: z.string().optional(),
        expiryDate: z.string().optional(),
      })
      .optional(),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    role: z.nativeEnum(USER_ROLE).optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    status: z.nativeEnum(USER_STATUS).optional(),
    profilePhoto: z.string().optional(),
    followers: z.array(z.string()).optional(),
    following: z.array(z.string()).optional(),
    subscriptions: z
      .object({
        isSubscribed: z.boolean().optional(),
        subscriptionDate: z.string().optional(),
        expiryDate: z.string().optional(),
      })
      .optional(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
