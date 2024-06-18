import {
  Schema,
  model,
  Types,
  type Document,
  type PopulatedDoc
} from 'mongoose'
import type { ITask } from './Task'

export interface IProject extends Document {
  name: string
  client: string
  description: string
  tasks: Array<PopulatedDoc<ITask & Document>>
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
    ]
  },
  {
    timestamps: true
  }
)

export default model<IProject>('Projects', projectSchema)
