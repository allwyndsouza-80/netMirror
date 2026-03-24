export default function NotFound() {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-lg mb-6">Page not found</p>
        <a href="/home" className="text-red-500 underline">
          Go back home
        </a>
      </div>
    );
  }