import { NextResponse } from "next/server";
import { openDb } from "../../../../lib/db";

export async function GET() {
  const db = await openDb();
  const products = await db.all(
    "SELECT id, name, description, price FROM products"
  );
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const imageFile = formData.get("image") as File;

  if (!imageFile) {
    return NextResponse.json(
      { error: "No image file provided" },
      { status: 400 }
    );
  }

  const imageBuffer = await imageFile.arrayBuffer();

  const db = await openDb();
  const result = await db.run(
    "INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)",
    [name, description, price, imageBuffer]
  );

  return NextResponse.json({
    id: result.lastID,
    name,
    description,
    price,
  });
}
