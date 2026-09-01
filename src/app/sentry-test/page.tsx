"use client"; // Client component ke liye zaroori hai

export default function TestPage() {
  return (
    <div style={{ padding: "50px" }}>
      <h1>Sentry Test Page</h1>
      <button
        onClick={() => {
          throw new Error("Sentry Verification Test Error!");
        }}
        style={{ padding: "10px 20px", background: "red", color: "white", cursor: "pointer" }}
      >
        Trigger Test Error
      </button>
    </div>
  );
}