import { MouseEventHandler } from 'react'

export interface CustomButtonProps {
  title: string
  containerStyles?: string
  handleClick?: () => void
  btnType?: 'button' | 'submit'
  textStyles?: string
  rightIcon?: string
  isDisabled?: boolean
}

export interface FilterProps {
  manufacturer: string
  year: number
  fuel: string
  limit: number
  model: string
}

export interface OptionProps {
  title: string
  value: string
}

export interface CustomFilterProps {
  title: string
  options: OptionProps[]
}

export interface ShowMoreProps {
  pageNumber: number
  isNext: boolean
}

export interface FormProps {
  type: string
  post: PostProps
  setPost: (post: PostProps) => void
  submitting: boolean
  handleSubmit: (event: any, photoData: any) => void
}

export interface PostListProps {
  data: PostProps[]
  handleCategoryClick: () => void
}

export interface CreatorProps {
  email: string
  image: string
  username: string
  __v: number
  _id: string
}

export interface PostCardProps {
  post: PostProps
  url: string
  handleCategoryClick: () => void
  handleEdit: () => void
  handleDelete: () => void
}

export interface PostDetailsProps {
  isOpen: boolean
  closeModal: () => void
  post: PostProps
  handleCategoryClick?: (category: string) => void
}

export interface PostProps {
  _id?: string
  creator?: CreatorProps
  type: string
  title: string
  location: string
  date: string
  description: string
  datePosted?: number
  category: string
  public_id: string
  secure_url: string
}

export interface ProfileProps {
  name: string
  desc: string
  data: PostProps[]
  handleEdit: (post: object) => void
  handleDelete: (post: object) => void
}
