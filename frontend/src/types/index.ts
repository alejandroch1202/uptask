import { z } from 'zod'

export const projectSchema = z.object({
  _id: z.string(),
  name: z.string(),
  client: z.string(),
  description: z.string()
})

export type Project = z.infer<typeof projectSchema>

export type DraftProject = Pick<Project, 'name' | 'client' | 'description'>

export const dashboardProjectSchema = z.array(
  projectSchema.pick({
    _id: true,
    name: true,
    client: true,
    description: true
  })
)

const taskStatusSchema = z.enum([
  'pending',
  'onHold',
  'inProgress',
  'underReview',
  'completed'
])

export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema
})

export type Task = z.infer<typeof taskSchema>

export type DraftTask = Pick<Project, 'name' | 'description'>
