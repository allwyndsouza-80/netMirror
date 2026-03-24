export default function VideoRowSkeleton() {
    return (
      <section className="mb-8">
        <div className="px-4 md:px-12 mb-3">
          <div className="h-5 w-40 bg-[#2a2a2a] rounded animate-pulse" />
        </div>
        <div className="flex gap-2 md:gap-3 px-4 md:px-12 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-[200px] animate-pulse">
              <div className="w-full h-[112px] bg-[#2a2a2a] rounded-md mb-2" />
              <div className="h-3 w-4/5 bg-[#2a2a2a] rounded mb-1.5" />
              <div className="h-3 w-1/2 bg-[#2a2a2a] rounded" />
            </div>
          ))}
        </div>
      </section>
    );
  }