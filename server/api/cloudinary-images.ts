// /server/api/cloudinary-images.ts

import { v2 as cloudinary } from 'cloudinary'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  cloudinary.config({
    cloud_name: config.public.cloudinaryCloudName,
    api_key: config.public.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret,
  })

  const query = getQuery(event)
  const folder = query.folder as string

  if (!folder) return []

  const result = await cloudinary.search
    .expression(`folder:${folder}`)
    .sort_by('created_at', 'desc')
    .max_results(50)
    .execute()

  type GalleryImage = {
    id: string
    url: string
    alt: string
    folder: string
  }

  return result.resources.map((img: any): GalleryImage => ({
    id: img.public_id,
    url: img.secure_url,
    alt: img.public_id.split('/').pop() || '',
    folder: img.folder,
  }))
})