import { Schema, model, type Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  confirmed: boolean
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    confirmed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

export default model<IUser>('Users', userSchema)
