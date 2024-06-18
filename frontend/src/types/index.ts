import { z } from 'zod'

export const projectSchema = z.object({
  _id: z.string(),
  name: z.string(),
  client: z.string(),
  description: z.string()
})

export type Project = z.infer<typeof projectSchema>

export type DraftProject = Pick<Project, 'name' | 'client' | 'description'>
