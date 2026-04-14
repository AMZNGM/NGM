export default function WorkSkeleton({ count = 8, className }: { count?: number; className?: string }) {
  return (
    <div className={`relative flex flex-col gap-8 size-full ${className}`}>
      {/* <div className="flex justify-center items-center gap-2 px-6.5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-full h-6 bg-text/15 rounded-full animate-pulse" />
        ))}
      </div> */}

      <div className="gap-[3dvw] md:gap-[0.8dvw] grid grid-cols-1 md:grid-cols-2 bg-text/5 border border-text/10 rounded-2xl p-[2.7dvw] md:p-[0.8dvw]">
        {[...Array(count)].map((_, i) => {
          const isLarge = i === 0 || i === 5
          return (
            <div
              key={i}
              className={`bg-text/5 rounded-xl animate-pulse ${isLarge ? 'md:col-span-2 aspect-video md:aspect-21/9' : 'aspect-square'}`}
            />
          )
        })}
      </div>
    </div>
  )
}
