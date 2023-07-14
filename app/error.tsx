"use client"

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void;
}) {
  return (
    <div className="mt-[40px]">
      <h2>Something went wrong</h2>
      <button onClick={() => reset()}>
        Try again
      </button>
      <pre>
        { JSON.stringify(error, null, 2)}
      </pre>
    </div>
  )
}