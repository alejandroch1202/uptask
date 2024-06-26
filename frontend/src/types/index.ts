import { z } from 'zod'

const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  oldPassword: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
  token: z.string()
})

export type Auth = z.infer<typeof authSchema>

export const userSchema = authSchema
  .pick({
    name: true,
    email: true
  })
  .extend({
    _id: z.string()
  })

export type User = z.infer<typeof userSchema>

export type UserProfileForm = Pick<User, 'email' | 'name'>

const noteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  createdBy: userSchema,
  task: z.string(),
  createdAt: z.string()
})

export type Note = z.infer<typeof noteSchema>

export type NoteFormData = Pick<Note, 'content'>
const taskStatusSchema = z.enum([
  'pending',
  'onHold',
  'inProgress',
  'underReview',
  'completed'
])

export type TaskStatus = z.infer<typeof taskStatusSchema>

export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema,
  updatedBy: z.array(
    z.object({
      _id: z.string(),
      user: userSchema,
      status: taskStatusSchema
    })
  ),
  notes: z.array(
    noteSchema.extend({
      createdBy: userSchema
    })
  ),
  createdAt: z.string(),
  updatedAt: z.string()
})

export type Task = z.infer<typeof taskSchema>
export type DraftTask = Pick<Project, 'name' | 'description'>

export const taskProjectSchema = taskSchema.pick({
  _id: true,
  name: true,
  description: true,
  status: true
})

export type TaskProject = z.infer<typeof taskProjectSchema>

export const projectSchema = z.object({
  _id: z.string(),
  name: z.string(),
  client: z.string(),
  description: z.string(),
  manager: z.string(userSchema.pick({ _id: true })),
  tasks: z.array(taskProjectSchema),
  team: z.array(z.string(userSchema.pick({ _id: true }))),
  createdAt: z.string(),
  updatedAt: z.string()
})

export type Project = z.infer<typeof projectSchema>
export type DraftProject = Pick<Project, 'name' | 'client' | 'description'>

export const dashboardProjectSchema = z.array(
  projectSchema.pick({
    _id: true,
    name: true,
    client: true,
    description: true,
    manager: true
  })
)

export const editProjectSchema = projectSchema.pick({
  name: true,
  client: true,
  description: true
})

export type LoginForm = Pick<Auth, 'email' | 'password'>
export type SignupForm = Pick<
  Auth,
  'name' | 'email' | 'password' | 'confirmPassword'
>
export type RequestConfirmTokenForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type ResetPasswordForm = Pick<Auth, 'password' | 'confirmPassword'>
export type UpdatePasswordForm = Pick<
  Auth,
  'password' | 'confirmPassword' | 'token'
>
export type UpdateCurrentPasswordForm = Pick<
  Auth,
  'oldPassword' | 'password' | 'confirmPassword'
>

export type DeleteProjectForm = Pick<Auth, 'password'>

export const teamMemberSchema = userSchema.pick({
  _id: true,
  name: true,
  email: true
})

export const teamMembersSchema = z.array(teamMemberSchema)

export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberForm = Pick<TeamMember, 'email'>
export type TeamMembers = z.infer<typeof teamMembersSchema>
