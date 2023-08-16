import { connectToDB } from '@/utils/database'
import Post from '@/models/post'

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB()

    const post = await Post.findById(params.id)
      .populate('creator')
      .sort({ createdAt: -1 })
    if (!post) return new Response('Post not found', { status: 404 })

    return new Response(JSON.stringify(post), {
      status: 200,
    })
  } catch (error) {
    return new Response('Failed to fetch post', {
      status: 500,
    })
  }
}

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { type, title, location, date, description, datePosted, category } =
    await req.json()

  try {
    await connectToDB()

    const existingPost = await Post.findById(params.id)
    if (!existingPost) return new Response('Post not found', { status: 404 })

    existingPost.title = title
    existingPost.type = type
    existingPost.location = location
    existingPost.date = date
    existingPost.description = description
    existingPost.datePosted = datePosted
    existingPost.category = category

    await existingPost.save()

    return new Response(JSON.stringify(existingPost), { status: 200 })
  } catch (error) {
    return new Response('Failed to update post', {
      status: 500,
    })
  }
}

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB()

    await Post.findByIdAndRemove(params.id)

    return new Response('Post deleted successully', { status: 200 })
  } catch (error) {
    return new Response('Failed to delete post', {
      status: 500,
    })
  }
}
