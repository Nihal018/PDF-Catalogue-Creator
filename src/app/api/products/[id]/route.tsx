import { NextResponse } from "next/server";
import { openDb } from "../../../../../lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const db = await openDb();
  const product = await db.get(
    "SELECT id, name, description, price FROM products WHERE id = ?",
    [params.id]
  );

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const imageFile = formData.get("image") as File | null;

  const db = await openDb();

  let query = "UPDATE products SET name = ?, description = ?, price = ?";
  let queryParams: (string | number | ArrayBuffer)[] = [
    name,
    description,
    price,
  ];

  if (imageFile) {
    const imageBuffer = await imageFile.arrayBuffer();
    query += ", image = ?";
    queryParams.push(imageBuffer);
  }

  query += " WHERE id = ?";
  queryParams.push(params.id);

  await db.run(query, queryParams);

  const updatedProduct = await db.get(
    "SELECT id, name, description, price FROM products WHERE id = ?",
    [params.id]
  );

  return NextResponse.json(updatedProduct);
}
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const db = await openDb();
  await db.run("DELETE FROM products WHERE id = ?", [params.id]);
  return NextResponse.json({ success: true });
}
