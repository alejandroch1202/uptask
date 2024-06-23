import {
  Schema,
  model,
  Types,
  type Document,
  type PopulatedDoc
} from 'mongoose'
import type { ITask } from './Task'
import type { IUser } from './User'

export interface IProject extends Document {
  name: string
  client: string
  description: string
  tasks: Array<PopulatedDoc<ITask & Document>>
  manager: PopulatedDoc<IUser & Document>
  team: Array<PopulatedDoc<IUser & Document>>
}

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    client: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    tasks: [
      {
        type: Types.ObjectId,
        ref: 'Tasks'
      }
    ],
    manager: {
      type: Types.ObjectId,
      ref: 'Users',
      required: true
    },
    team: [
      {
        type: Types.ObjectId,
        ref: 'Users'
      }
    ]
  },
  {
    timestamps: true
  }
)

export default model<IProject>('Projects', projectSchema)
