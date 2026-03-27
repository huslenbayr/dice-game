import { NextResponse } from "next/server";
import { requireAdminApiUser } from "@/lib/auth/guards";
import { getRepository } from "@/lib/repositories/content-repository";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const adminUser = await requireAdminApiUser();
    if (adminUser instanceof NextResponse) {
      return adminUser;
    }

    const payload = await request.json();
    const repository = await getRepository();
    const tour = await repository.upsertTour(payload);
    return NextResponse.json({ tour });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to create tour." }, { status: 400 });
  }
}
