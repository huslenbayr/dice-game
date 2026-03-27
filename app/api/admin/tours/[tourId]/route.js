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
    const tour = await repository.upsertTour(payload);
    return NextResponse.json({ tour });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to update tour." }, { status: 400 });
  }
}

export async function DELETE(_request, { params }) {
  try {
    const adminUser = await requireAdminApiUser();
    if (adminUser instanceof NextResponse) {
      return adminUser;
    }

    const { tourId } = await params;
    const repository = await getRepository();
    await repository.deleteTour(tourId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to delete tour." }, { status: 400 });
  }
}
