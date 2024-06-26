import { Schema, Types, model, type Document } from 'mongoose'

export interface INote extends Document {
  content: string
  createdBy: Types.ObjectId
  task: Types.ObjectId
}

const noteSchema = new Schema(
  {
    content: {
      type: String,
      required: true
    },
    createdBy: {
      type: Types.ObjectId,
      ref: 'Users',
      required: true
    },
    task: {
      type: Types.ObjectId,
      ref: 'Tasks',
      required: true
    }
  },
  {
    timestamps: true
  }
)

export default model<INote>('Notes', noteSchema)
