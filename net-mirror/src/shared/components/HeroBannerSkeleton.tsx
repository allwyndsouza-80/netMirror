export default function HeroBannerSkeleton() {
    return (
      <div className="relative w-full h-[85vh] min-h-[520px] max-h-[900px] overflow-hidden bg-[#1a1a1a] animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/95 via-[#141414]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
        <div className="absolute bottom-24 left-4 md:left-12 flex flex-col gap-3.5">
          <div className="h-5 w-20 bg-[#2a2a2a] rounded" />
          <div className="h-16 w-80 bg-[#2a2a2a] rounded" />
          <div className="h-10 w-52 bg-[#2a2a2a] rounded" />
          <div className="flex gap-2.5">
            {[64, 36, 44, 52].map((w, i) => (
              <div key={i} className="h-4 bg-[#2a2a2a] rounded" style={{ width: w }} />
            ))}
          </div>
          <div className="flex gap-2">
            {[60, 72, 54].map((w, i) => (
              <div key={i} className="h-3.5 bg-[#2a2a2a] rounded" style={{ width: w }} />
            ))}
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="h-3.5 w-[480px] max-w-[80vw] bg-[#2a2a2a] rounded" />
            <div className="h-3.5 w-[420px] max-w-[75vw] bg-[#2a2a2a] rounded" />
            <div className="h-3.5 w-[300px] max-w-[60vw] bg-[#2a2a2a] rounded" />
          </div>
          <div className="flex gap-3 mt-1">
            <div className="h-11 w-28 bg-[#2a2a2a] rounded-md" />
            <div className="h-11 w-36 bg-[#2a2a2a] rounded-md" />
          </div>
        </div>
      </div>
    );
  }