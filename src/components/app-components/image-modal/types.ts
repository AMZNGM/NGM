import { StaticImageData } from 'next/image'

export type ImageSrc = string | StaticImageData

export type ImageItem = { src: ImageSrc; alt: string }

export type ImageModalContextType = {
  openModal: (images: ImageItem[], initialIndex: number) => void
  closeModal: () => void
}
