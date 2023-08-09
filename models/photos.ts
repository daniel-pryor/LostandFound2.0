import { Schema, model, models } from 'mongoose'

const photoSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    public_id: String,
    secure_url: String,
    type: String,
    title: String,
    location: String,
    date: String,
    description: String,
    category: String,
    datePosted: Number,
  },
  { timestamps: true }
)

const Photo = models.photos || model('photos', photoSchema)

export default Photo
