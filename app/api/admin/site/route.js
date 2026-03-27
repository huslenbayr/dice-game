import { NextResponse } from "next/server";
import { requireAdminApiUser } from "@/lib/auth/guards";
import { getRepository } from "@/lib/repositories/content-repository";

export const runtime = "nodejs";

export async function PUT(request) {
  try {
    const adminUser = await requireAdminApiUser();
    if (adminUser instanceof NextResponse) {
      return adminUser;
    }

    const payload = await request.json();
    const repository = await getRepository();
    const site = await repository.updateSiteContent(payload);
    return NextResponse.json({ site });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to update site content." }, { status: 400 });
  }
}
