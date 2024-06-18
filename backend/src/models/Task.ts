import { Schema, model, Types, type Document } from 'mongoose'

enum taskStatus {
  PENDING = 'pending',
  ON_HOLD = 'onHold',
  IN_PROGRESS = 'inProgress',
  UNDER_REVIEW = 'underReview',
  COMPLETED = 'completed'
}

export type TaskStatus = `${taskStatus}`

export interface ITask extends Document {
  name: string
  description: string
  project: Types.ObjectId
  status: TaskStatus
}

const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    project: {
      type: Types.ObjectId,
      ref: 'Projects',
      required: true
    },
    status: {
      type: String,
      enum: taskStatus,
      default: taskStatus.PENDING
    }
  },
  {
    timestamps: true
  }
)

export default model<ITask>('Tasks', taskSchema)
