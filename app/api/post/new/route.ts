import { connectToDB } from '@/utils/database'
import Post from '@/models/post'

export const POST = async (req: any) => {
  const {
    userId,
    type,
    title,
    location,
    date,
    description,
    datePosted,
    category,
  } = await req.json()
  try {
    await connectToDB()
    const newPost = new Post({
      creator: userId,
      type,
      title,
      location,
      date,
      description,
      datePosted,
      category,
    })
    await newPost.save()

    return new Response(JSON.stringify(newPost), {
      status: 201,
    })
  } catch (error) {
    return new Response('Failed to create a new post', { status: 500 })
  }
}
