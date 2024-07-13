import { NextResponse } from "next/server";
import { openDb } from "../../../../../../lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const db = await openDb();
  const result = await db.get("SELECT image FROM products WHERE id = ?", [
    params.id,
  ]);

  if (!result || !result.image) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }

  const imageBuffer = Buffer.from(result.image);

  console.log("image retrievd successfully");

  return new NextResponse(imageBuffer, {
    headers: {
      "Content-Type": "image/jpeg", // Adjust based on your image type
      "Content-Length": imageBuffer.length.toString(),
    },
  });
}
