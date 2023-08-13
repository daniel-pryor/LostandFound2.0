import { connectToDB } from '@/utils/database'
import Post from '@/models/post'

export const GET = async (req: any) => {
  try {
    await connectToDB()

    const posts = await Post.find({}).populate('creator').sort('-createdAt')

    return new Response(JSON.stringify(posts), {
      status: 200,
    })
  } catch (error) {
    return new Response('Failed to fetch all posts', {
      status: 500,
    })
  }
}
