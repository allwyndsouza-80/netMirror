export default function ChevronIcon({ direction }: { direction: "left" | "right" }) {
    return (
      <svg className="w-6 h-6 stroke-current fill-none" strokeWidth={2.5} viewBox="0 0 24 24">
        {direction === "left" ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        )}
      </svg>
    );
  }