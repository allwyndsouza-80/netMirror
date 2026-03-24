export default function BackgroundParticles() {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Ambient gradient blobs */}
        <div
          className="absolute rounded-full opacity-20"
          style={{
            width: 600,
            height: 600,
            top: "-20%",
            left: "-10%",
            background: "radial-gradient(circle, #e50914 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "drift1 18s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full opacity-10"
          style={{
            width: 400,
            height: 400,
            bottom: "-10%",
            right: "-5%",
            background: "radial-gradient(circle, #e50914 0%, transparent 70%)",
            filter: "blur(60px)",
            animation: "drift2 22s ease-in-out infinite",
          }}
        />
        {/* Fine grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />
        <style>{`
          @keyframes drift1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(40px, 30px) scale(1.05); }
            66% { transform: translate(-20px, 50px) scale(0.97); }
          }
          @keyframes drift2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-30px, -40px) scale(1.08); }
          }
        `}</style>
      </div>
    );
  }