export const zListInput = z.object({
  offset: z.number().optional(),
  limit: z.number().optional(),
})

export const zIdInput = z.object({
  id: z.string().uuid(),
})
