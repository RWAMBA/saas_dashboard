export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 400,
    public field?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function handleApiError(error: unknown) {
  if (error instanceof ApiError) {
    return new Response(
      JSON.stringify({
        error: error.message,
        field: error.field,
      }),
      { status: error.statusCode }
    );
  }

  console.error("Unhandled error:", error);
  return new Response(
    JSON.stringify({ error: "Internal server error" }),
    { status: 500 }
  );
} 