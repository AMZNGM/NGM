import Image from 'next/image'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import { WorkItem } from '@/types/work'

type CardVariant = 'featured' | 'standard' | 'list'

export default function WorkCard({ item, index, variant = 'standard' }: { item: WorkItem; index: number; variant?: CardVariant }) {
  if (variant === 'featured') {
    return (
      <AnimIn
        center
        blur
        delay={index * 0.005}
        className="group relative flex flex-col size-full overflow-hidden bg-text/22 hover:bg-text/16 rounded-lg cursor-pointer"
      >
        <a href={item.link} target="_blank" rel="noopener noreferrer" className="z-10 absolute inset-0" />

        {item.image && (
          <div className="relative size-full aspect-video md:aspect-21/9">
            <Image src={item.image} alt={item.title} fill className="object-cover group-hover:invert" />
            <span className="top-2 left-2 absolute flex size-[clamp(0.375rem,0.5dvw,0.75rem)] bg-main rounded-full animate-pulse" />
          </div>
        )}

        <span className="top-0 right-0 absolute bg-text rounded-full font-sec font-bold text-[clamp(0.5rem,0.4dvw+0.3rem,0.625rem)] text-bg m-[clamp(0.25rem,0.5dvw,0.5rem)] px-[clamp(0.25rem,0.5dvw,0.5rem)] py-[clamp(0.125rem,0.2dvw,0.25rem)] mix-blend-difference">
          {item.date}
        </span>

        <div className="flex flex-col gap-[clamp(0.25rem,0.5dvw,0.75rem)] group-hover:underline underline-offset-1 p-[clamp(0.25rem,0.5dvw,0.75rem)]">
          <h4 dir="auto" className="font-arab font-semibold text-[3dvw] md:text-[1dvw] uppercase tracking-wide">
            {item.title}
          </h4>

          <p className="max-w-[clamp(20rem,30dvw,36rem)] border-main/20 border-l-2 font-sec text-[clamp(0.5rem,0.5dvw+0.3rem,0.75rem)] text-text/40 line-clamp-2 text-balance leading-relaxed mb-[clamp(0.25rem,0.3dvw,0.5rem)] pl-[clamp(0.25rem,0.5dvw,0.5rem)]">
            {item.description.split('YouTube Upload (@amzngm)')[0]}
          </p>
        </div>
      </AnimIn>
    )
  }

  if (variant === 'list') {
    return (
      <AnimIn
        center
        blur
        delay={index * 0.005}
        className="group relative flex items-center gap-1 h-full overflow-hidden bg-text/22 hover:bg-text/16 border border-text/5 rounded-lg p-px cursor-pointer"
      >
        <a href={item.link} target="_blank" rel="noopener noreferrer" className="z-10 absolute inset-0" />

        {item.image && (
          <div className="relative w-[clamp(3rem,8dvw,8rem)] aspect-4/3 overflow-hidden border border-text/5 rounded-lg shrink-0">
            <Image src={item.image} alt={item.title} fill className="object-cover group-hover:invert" />
          </div>
        )}

        <div className="flex flex-col flex-1 gap-1 overflow-hidden me-1">
          <div className="flex h-px bg-text/20" />

          <h4
            dir="auto"
            className="flex justify-between font-arab font-medium text-[2.5dvw] md:text-[0.8dvw] group-hover:underline underline-offset-1 truncate uppercase"
          >
            {item.title}

            <span className="font-sec text-[clamp(0.5rem,0.4dvw+0.3rem,0.625rem)] text-end mix-blend-difference">
              {item.date.split('-')[0]}
            </span>
          </h4>

          <p className="font-sec text-[clamp(0.5rem,0.5dvw+0.3rem,0.75rem)] text-text/40 group-hover:underline underline-offset-1 line-clamp-1 tracking-tight me-[clamp(2rem,8dvw,4rem)]">
            {item.description.split('YouTube Upload (@amzngm)')[0]}
          </p>
        </div>
      </AnimIn>
    )
  }

  // Standard
  return (
    <AnimIn
      center
      blur
      delay={index * 0.005}
      className="group relative flex flex-col justify-between overflow-hidden bg-text/18 rounded-lg cursor-pointer"
    >
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="z-10 absolute inset-0" />

      {item.image && (
        <div className="relative size-full aspect-video">
          <Image src={item.image} alt={item.title} fill className="object-cover group-hover:invert" />
        </div>
      )}

      <span className="top-0 right-0 absolute font-sec text-[clamp(0.5rem,0.4dvw+0.3rem,0.625rem)] m-[clamp(0.25rem,0.5dvw,0.5rem)] mix-blend-difference">
        {item.date.split('-')[0]}
      </span>

      <div className="flex flex-col gap-[clamp(0.25rem,0.4dvw,0.75rem)] group-hover:underline underline-offset-1 p-[clamp(0.25rem,0.5dvw,0.75rem)] pb-0">
        <h4 dir="auto" className="font-arab text-[2.5dvw] md:text-[0.8dvw] truncate uppercase line-clamp-1">
          {item.title}
        </h4>

        <p className="opacity-40 font-sec text-[clamp(0.625rem,0.5dvw+0.3rem,0.75rem)] line-clamp-3 text-balance leading-relaxed mb-[clamp(0.25rem,0.4dvw,0.75rem)]">
          {item.description.split('YouTube Upload (@amzngm)')[0]}
        </p>
      </div>
    </AnimIn>
  )
}
