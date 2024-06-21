import { Schema, model, type Document, Types } from 'mongoose'

export interface IToken extends Document {
  token: string
  user: Types.ObjectId
  createdAt: Date
}

const tokenSchema = new Schema({
  token: {
    type: String,
    required: true
  },
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: '15m'
  }
})

export default model<IToken>('Tokens', tokenSchema)
