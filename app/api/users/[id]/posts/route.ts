import { connectToDB } from '@/utils/database'
import Post from '@/models/post'

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB()

    const posts = await Post.find({ creator: params.id }).populate('creator')

    return new Response(JSON.stringify(posts), {
      status: 200,
    })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to fetch all posts' }),
      {
        status: 500,
      }
    )
  }
}
