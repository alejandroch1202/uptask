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

projectSchema.pre(
  'deleteOne',
  {
    document: true
  },
  async function (next) {
    const projectId = this._id

    const tasks = await this.model('Tasks').find({ project: projectId })

    tasks.forEach(async (task) => {
      await this.model('Notes').deleteMany({ task: task.id })
    })

    await this.model('Tasks').deleteMany({ project: projectId })
    next()
  }
)

export default model<IProject>('Projects', projectSchema)
