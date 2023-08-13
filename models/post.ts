import { Schema, model, models } from 'mongoose'

const PostSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  location: {
    type: String,
    required: [true, 'Tag is required'],
  },
  date: {
    type: String,
    required: [true, 'Date is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  datePosted: {
    type: Number,
    required: [true, 'Date posted is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  public_id: String,
  secure_url: String,
})

const Post = models.Post || model('Post', PostSchema)

export default Post
