import z from "zod"
const TEXT_VALIDATION_LENGTH = 10;

export const zCreateIdeaTrpcInput =  z.object({
        name: z.string().min(1),
        nick: z
          .string()
          .min(1)
          .regex(/^[a-z0-9-]+$/, 'Nick may contain only lowercase letters, numbers and dashes'),
        description: z.string().min(1),
        text: z.string().min(TEXT_VALIDATION_LENGTH, `Text should be at least ${TEXT_VALIDATION_LENGTH} characters long`),
      })