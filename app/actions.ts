'use server'

import { client } from "../lib/db";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// --- INIT & UPGRADE DB ---
// Fungsi ini yang tadi error "not exported member"
export async function upgradeDB() {
  try {
    // Menambahkan kolom imageUrl jika belum ada
    await client.execute("ALTER TABLE projects ADD COLUMN imageUrl TEXT");
    console.log("✅ Kolom imageUrl berhasil ditambahkan!");
  } catch (e) {
    console.log("⚠️ Kolom mungkin sudah ada, skip.");
  }
  revalidatePath("/admin");
}

export async function initializeDatabase() {
  // Setup awal (opsional jika sudah pakai upgradeDB)
  await client.execute(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      link TEXT NOT NULL,
      imageUrl TEXT,
      tags TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

// --- LOGIN ---
export async function login(prevState: any, formData: FormData) {
  const password = formData.get("password") as string;
  const cookieStore = await cookies();

  if (password === process.env.ADMIN_PASSWORD) {
    cookieStore.set("admin_session", "true", { 
      httpOnly: true, secure: true, path: "/" 
    });
  } else {
    return { error: "Password salah! Coba lagi." };
  }
  redirect("/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/login");
}

// --- CRUD PROJECTS ---

export async function getProjects() {
  const res = await client.execute("SELECT * FROM projects ORDER BY createdAt DESC");
  return res.rows;
}

export async function addProject(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const link = formData.get("link") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const tags = formData.get("tags") as string;

  await client.execute({
    sql: "INSERT INTO projects (title, description, link, imageUrl, tags) VALUES (?, ?, ?, ?, ?)",
    args: [title, description, link, imageUrl, tags],
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteProject(id: number) {
  await client.execute({
    sql: "DELETE FROM projects WHERE id = ?",
    args: [id],
  });
  revalidatePath("/");
  revalidatePath("/admin");
}