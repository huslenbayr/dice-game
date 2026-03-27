"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

function toCsv(values) {
  return values.join(", ");
}

function toLines(values) {
  return values.join("\n");
}

function itineraryToLines(itinerary, language) {
  return itinerary
    .map((item) => `${item.day}|${item.title[language] || item.title.en}|${item.description[language] || item.description.en}`)
    .join("\n");
}

function parseCsv(value) {
  return String(value || "")
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseLines(value) {
  return String(value || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseItinerary(englishLines, mongolianLines) {
  const en = parseLines(englishLines);
  const mn = parseLines(mongolianLines);
  const count = Math.max(en.length, mn.length);

  return Array.from({ length: count }).map((_, index) => {
    const enParts = (en[index] || "").split("|").map((item) => item.trim());
    const mnParts = (mn[index] || "").split("|").map((item) => item.trim());

    return {
      day: Number(enParts[0] || mnParts[0] || index + 1),
      title: {
        en: enParts[1] || "",
        mn: mnParts[1] || ""
      },
      description: {
        en: enParts[2] || "",
        mn: mnParts[2] || ""
      }
    };
  });
}

function TourEditor({ tour, onSave, onDelete, ui, language }) {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      id: formData.get("id"),
      slug: formData.get("slug"),
      title: {
        en: formData.get("titleEn"),
        mn: formData.get("titleMn")
      },
      intro: {
        en: formData.get("introEn"),
        mn: formData.get("introMn")
      },
      destination: {
        en: formData.get("destinationEn"),
        mn: formData.get("destinationMn")
      },
      durationDays: Number(formData.get("durationDays") || 1),
      durationLabel: {
        en: formData.get("durationLabelEn"),
        mn: formData.get("durationLabelMn")
      },
      price: Number(formData.get("price") || 0),
      dates: parseCsv(formData.get("datesCsv")),
      guideNames: parseCsv(formData.get("guideNamesCsv")),
      gallery: parseCsv(formData.get("galleryCsv")),
      highlights: {
        en: parseLines(formData.get("highlightsEn")),
        mn: parseLines(formData.get("highlightsMn"))
      },
      included: {
        en: parseLines(formData.get("includedEn")),
        mn: parseLines(formData.get("includedMn"))
      },
      excluded: {
        en: parseLines(formData.get("excludedEn")),
        mn: parseLines(formData.get("excludedMn"))
      },
      itinerary: parseItinerary(formData.get("itineraryEn"), formData.get("itineraryMn"))
    };

    await onSave(payload);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-[28px] border border-slate-200 bg-white p-6">
      <input type="hidden" name="id" defaultValue={tour.id} />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="font-semibold text-slate-700">Title EN</span>
          <input
            name="titleEn"
            defaultValue={tour.title.en}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-semibold text-slate-700">Title MN</span>
          <input
            name="titleMn"
            defaultValue={tour.title.mn}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm sm:col-span-2">
          <span className="font-semibold text-slate-700">Slug</span>
          <input
            name="slug"
            defaultValue={tour.slug}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm sm:col-span-2">
          <span className="font-semibold text-slate-700">Intro EN</span>
          <textarea
            name="introEn"
            defaultValue={tour.intro.en}
            rows={3}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm sm:col-span-2">
          <span className="font-semibold text-slate-700">Intro MN</span>
          <textarea
            name="introMn"
            defaultValue={tour.intro.mn}
            rows={3}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-semibold text-slate-700">Destination EN</span>
          <input
            name="destinationEn"
            defaultValue={tour.destination.en}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-semibold text-slate-700">Destination MN</span>
          <input
            name="destinationMn"
            defaultValue={tour.destination.mn}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-semibold text-slate-700">Duration days</span>
          <input
            type="number"
            name="durationDays"
            defaultValue={tour.durationDays}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-semibold text-slate-700">Price</span>
          <input
            type="number"
            name="price"
            defaultValue={tour.price}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-semibold text-slate-700">Duration label EN</span>
          <input
            name="durationLabelEn"
            defaultValue={tour.durationLabel.en}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-semibold text-slate-700">Duration label MN</span>
          <input
            name="durationLabelMn"
            defaultValue={tour.durationLabel.mn}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm sm:col-span-2">
          <span className="font-semibold text-slate-700">{ui.admin.guidesHint}</span>
          <input
            name="guideNamesCsv"
            defaultValue={toCsv(tour.guideNames)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm sm:col-span-2">
          <span className="font-semibold text-slate-700">Dates CSV</span>
          <input
            name="datesCsv"
            defaultValue={toCsv(tour.dates)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm sm:col-span-2">
          <span className="font-semibold text-slate-700">Gallery CSV</span>
          <textarea
            name="galleryCsv"
            rows={3}
            defaultValue={toLines(tour.gallery)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-semibold text-slate-700">Highlights EN</span>
          <textarea
            name="highlightsEn"
            rows={4}
            defaultValue={toLines(tour.highlights.en)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-semibold text-slate-700">Highlights MN</span>
          <textarea
            name="highlightsMn"
            rows={4}
            defaultValue={toLines(tour.highlights.mn)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-semibold text-slate-700">Included EN</span>
          <textarea
            name="includedEn"
            rows={4}
            defaultValue={toLines(tour.included.en)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-semibold text-slate-700">Included MN</span>
          <textarea
            name="includedMn"
            rows={4}
            defaultValue={toLines(tour.included.mn)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-semibold text-slate-700">Excluded EN</span>
          <textarea
            name="excludedEn"
            rows={4}
            defaultValue={toLines(tour.excluded.en)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-semibold text-slate-700">Excluded MN</span>
          <textarea
            name="excludedMn"
            rows={4}
            defaultValue={toLines(tour.excluded.mn)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-semibold text-slate-700">Itinerary EN</span>
          <textarea
            name="itineraryEn"
            rows={6}
            defaultValue={itineraryToLines(tour.itinerary, "en")}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-semibold text-slate-700">Itinerary MN</span>
          <textarea
            name="itineraryMn"
            rows={6}
            defaultValue={itineraryToLines(tour.itinerary, "mn")}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
      </div>
      <div className="flex flex-wrap gap-3">
        <button className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white" type="submit">
          {ui.common.saveChanges}
        </button>
        <button
          className="rounded-full border border-rose-200 px-5 py-3 text-sm font-semibold text-rose-700"
          type="button"
          onClick={() => onDelete(tour.id)}
        >
          {ui.common.delete}
        </button>
      </div>
    </form>
  );
}

export function AdminDashboard({ snapshot, language, ui }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function saveTour(payload) {
    startTransition(async () => {
      await fetch(`/api/admin/tours/${payload.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      router.refresh();
    });
  }

  async function deleteTour(tourId) {
    startTransition(async () => {
      await fetch(`/api/admin/tours/${tourId}`, {
        method: "DELETE"
      });
      router.refresh();
    });
  }

  async function addTour(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    const payload = {
      slug: formData.get("slug"),
      title: { en: formData.get("titleEn"), mn: formData.get("titleMn") },
      intro: { en: formData.get("introEn"), mn: formData.get("introMn") },
      destination: { en: formData.get("destinationEn"), mn: formData.get("destinationMn") },
      durationDays: Number(formData.get("durationDays") || 1),
      durationLabel: { en: formData.get("durationLabelEn"), mn: formData.get("durationLabelMn") },
      price: Number(formData.get("price") || 0),
      dates: parseCsv(formData.get("datesCsv")),
      guideNames: parseCsv(formData.get("guideNamesCsv")),
      gallery: parseCsv(formData.get("galleryCsv")),
      highlights: { en: parseLines(formData.get("highlightsEn")), mn: parseLines(formData.get("highlightsMn")) },
      included: { en: parseLines(formData.get("includedEn")), mn: parseLines(formData.get("includedMn")) },
      excluded: { en: parseLines(formData.get("excludedEn")), mn: parseLines(formData.get("excludedMn")) },
      itinerary: parseItinerary(formData.get("itineraryEn"), formData.get("itineraryMn"))
    };

    startTransition(async () => {
      await fetch("/api/admin/tours", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      router.refresh();
      form.reset();
    });
  }

  async function updateBooking(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const bookingId = formData.get("bookingId");

    startTransition(async () => {
      await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: formData.get("status"),
          paymentStatus: formData.get("paymentStatus")
        })
      });
      router.refresh();
    });
  }

  async function updateSite(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      ...snapshot.site,
      contactPerson: formData.get("contactPerson"),
      contact: {
        phone: formData.get("phone"),
        email: formData.get("email"),
        officeLocation: formData.get("officeLocation"),
        socialLinks: {
          instagram: formData.get("instagram"),
          facebook: formData.get("facebook"),
          x: formData.get("x")
        }
      },
      home: {
        ...snapshot.site.home,
        heroTitle: { en: formData.get("heroTitleEn"), mn: formData.get("heroTitleMn") },
        heroSubtitle: { en: formData.get("heroSubtitleEn"), mn: formData.get("heroSubtitleMn") },
        storyTitle: { en: formData.get("storyTitleEn"), mn: formData.get("storyTitleMn") },
        storyBody: { en: formData.get("storyBodyEn"), mn: formData.get("storyBodyMn") }
      },
      about: {
        ...snapshot.site.about,
        title: { en: formData.get("aboutTitleEn"), mn: formData.get("aboutTitleMn") },
        intro: { en: formData.get("aboutIntroEn"), mn: formData.get("aboutIntroMn") },
        approachTitle: { en: formData.get("approachTitleEn"), mn: formData.get("approachTitleMn") },
        approachBody: { en: formData.get("approachBodyEn"), mn: formData.get("approachBodyMn") }
      },
      contactPage: {
        title: { en: formData.get("contactTitleEn"), mn: formData.get("contactTitleMn") },
        body: { en: formData.get("contactBodyEn"), mn: formData.get("contactBodyMn") }
      }
    };

    startTransition(async () => {
      await fetch("/api/admin/site", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      router.refresh();
    });
  }

  return (
    <div className="space-y-10">
      <section className="glass-panel p-6 sm:p-8 lg:p-10">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">{ui.admin.siteTitle}</p>
        <h2 className="mt-4 font-display text-4xl">{ui.admin.contentTitle}</h2>
        <form onSubmit={updateSite} className="mt-8 grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">{ui.common.contactPerson}</span>
            <input
              name="contactPerson"
              defaultValue={snapshot.site.contactPerson}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Phone</span>
            <input
              name="phone"
              defaultValue={snapshot.site.contact.phone}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Email</span>
            <input
              name="email"
              defaultValue={snapshot.site.contact.email}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Office location</span>
            <input
              name="officeLocation"
              defaultValue={snapshot.site.contact.officeLocation}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Instagram</span>
            <input
              name="instagram"
              defaultValue={snapshot.site.contact.socialLinks.instagram}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Facebook</span>
            <input
              name="facebook"
              defaultValue={snapshot.site.contact.socialLinks.facebook}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm sm:col-span-2">
            <span className="font-semibold text-slate-700">X</span>
            <input
              name="x"
              defaultValue={snapshot.site.contact.socialLinks.x}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Hero title EN</span>
            <textarea
              name="heroTitleEn"
              rows={3}
              defaultValue={snapshot.site.home.heroTitle.en}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Hero title MN</span>
            <textarea
              name="heroTitleMn"
              rows={3}
              defaultValue={snapshot.site.home.heroTitle.mn}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Hero subtitle EN</span>
            <textarea
              name="heroSubtitleEn"
              rows={4}
              defaultValue={snapshot.site.home.heroSubtitle.en}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Hero subtitle MN</span>
            <textarea
              name="heroSubtitleMn"
              rows={4}
              defaultValue={snapshot.site.home.heroSubtitle.mn}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Story title EN</span>
            <textarea
              name="storyTitleEn"
              rows={3}
              defaultValue={snapshot.site.home.storyTitle.en}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Story title MN</span>
            <textarea
              name="storyTitleMn"
              rows={3}
              defaultValue={snapshot.site.home.storyTitle.mn}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Story body EN</span>
            <textarea
              name="storyBodyEn"
              rows={4}
              defaultValue={snapshot.site.home.storyBody.en}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Story body MN</span>
            <textarea
              name="storyBodyMn"
              rows={4}
              defaultValue={snapshot.site.home.storyBody.mn}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">About title EN</span>
            <textarea
              name="aboutTitleEn"
              rows={3}
              defaultValue={snapshot.site.about.title.en}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">About title MN</span>
            <textarea
              name="aboutTitleMn"
              rows={3}
              defaultValue={snapshot.site.about.title.mn}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">About intro EN</span>
            <textarea
              name="aboutIntroEn"
              rows={4}
              defaultValue={snapshot.site.about.intro.en}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">About intro MN</span>
            <textarea
              name="aboutIntroMn"
              rows={4}
              defaultValue={snapshot.site.about.intro.mn}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Approach title EN</span>
            <textarea
              name="approachTitleEn"
              rows={3}
              defaultValue={snapshot.site.about.approachTitle.en}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Approach title MN</span>
            <textarea
              name="approachTitleMn"
              rows={3}
              defaultValue={snapshot.site.about.approachTitle.mn}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Approach body EN</span>
            <textarea
              name="approachBodyEn"
              rows={4}
              defaultValue={snapshot.site.about.approachBody.en}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Approach body MN</span>
            <textarea
              name="approachBodyMn"
              rows={4}
              defaultValue={snapshot.site.about.approachBody.mn}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Contact title EN</span>
            <textarea
              name="contactTitleEn"
              rows={3}
              defaultValue={snapshot.site.contactPage.title.en}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Contact title MN</span>
            <textarea
              name="contactTitleMn"
              rows={3}
              defaultValue={snapshot.site.contactPage.title.mn}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Contact body EN</span>
            <textarea
              name="contactBodyEn"
              rows={4}
              defaultValue={snapshot.site.contactPage.body.en}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Contact body MN</span>
            <textarea
              name="contactBodyMn"
              rows={4}
              defaultValue={snapshot.site.contactPage.body.mn}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <div className="sm:col-span-2">
            <button className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white" type="submit">
              {isPending ? "..." : ui.common.saveChanges}
            </button>
          </div>
        </form>
      </section>

      <section className="glass-panel p-6 sm:p-8 lg:p-10">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">{ui.admin.toursTitle}</p>
        <div className="mt-8 space-y-8">
          {snapshot.tours.map((tour) => (
            <TourEditor
              key={tour.id}
              tour={tour}
              onSave={saveTour}
              onDelete={deleteTour}
              ui={ui}
              language={language}
            />
          ))}
        </div>
      </section>

      <section className="glass-panel p-6 sm:p-8 lg:p-10">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">{ui.common.addTour}</p>
        <h2 className="mt-4 font-display text-4xl">{ui.common.addTour}</h2>
        <form onSubmit={addTour} className="mt-8 grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Title EN</span>
            <input name="titleEn" className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Title MN</span>
            <input name="titleMn" className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
          </label>
          <label className="space-y-2 text-sm sm:col-span-2">
            <span className="font-semibold text-slate-700">Slug</span>
            <input name="slug" className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Intro EN</span>
            <textarea name="introEn" rows={3} className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Intro MN</span>
            <textarea name="introMn" rows={3} className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Destination EN</span>
            <input name="destinationEn" className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Destination MN</span>
            <input name="destinationMn" className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Duration days</span>
            <input type="number" name="durationDays" className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Price</span>
            <input type="number" name="price" className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Duration label EN</span>
            <input name="durationLabelEn" className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Duration label MN</span>
            <input name="durationLabelMn" className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
          </label>
          <label className="space-y-2 text-sm sm:col-span-2">
            <span className="font-semibold text-slate-700">{ui.admin.guidesHint}</span>
            <input name="guideNamesCsv" className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
          </label>
          <label className="space-y-2 text-sm sm:col-span-2">
            <span className="font-semibold text-slate-700">Dates CSV</span>
            <input name="datesCsv" className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
          </label>
          <label className="space-y-2 text-sm sm:col-span-2">
            <span className="font-semibold text-slate-700">Gallery CSV</span>
            <textarea name="galleryCsv" rows={3} className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Highlights EN</span>
            <textarea name="highlightsEn" rows={4} className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Highlights MN</span>
            <textarea name="highlightsMn" rows={4} className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Included EN</span>
            <textarea name="includedEn" rows={4} className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Included MN</span>
            <textarea name="includedMn" rows={4} className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Excluded EN</span>
            <textarea name="excludedEn" rows={4} className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Excluded MN</span>
            <textarea name="excludedMn" rows={4} className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Itinerary EN</span>
            <textarea name="itineraryEn" rows={6} className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Itinerary MN</span>
            <textarea name="itineraryMn" rows={6} className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
          </label>
          <div className="sm:col-span-2">
            <button className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white" type="submit">
              {ui.common.addTour}
            </button>
          </div>
        </form>
      </section>

      <section className="glass-panel p-6 sm:p-8 lg:p-10">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">{ui.admin.bookingsTitle}</p>
        <div className="mt-8 space-y-4">
          {snapshot.bookings.map((booking) => (
            <form
              key={booking.id}
              onSubmit={updateBooking}
              className="grid gap-4 rounded-[24px] border border-slate-200 bg-white p-5 lg:grid-cols-[1.3fr_1fr_1fr_auto]"
            >
              <input type="hidden" name="bookingId" value={booking.id} />
              <div>
                <p className="font-semibold text-ink">{booking.name}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {typeof booking.tourTitle === "string" ? booking.tourTitle : booking.tourTitle[language]}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {booking.date} · {booking.people}
                </p>
              </div>
              <label className="space-y-2 text-sm">
                <span className="font-semibold text-slate-700">Status</span>
                <select
                  name="status"
                  defaultValue={booking.status}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                >
                  <option value="pending">pending</option>
                  <option value="paid">paid</option>
                  <option value="cancelled">cancelled</option>
                  <option value="failed">failed</option>
                  <option value="refunded">refunded</option>
                </select>
              </label>
              <label className="space-y-2 text-sm">
                <span className="font-semibold text-slate-700">Payment status</span>
                <select
                  name="paymentStatus"
                  defaultValue={booking.paymentStatus}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                >
                  <option value="pending">pending</option>
                  <option value="paid">paid</option>
                  <option value="cancelled">cancelled</option>
                  <option value="failed">failed</option>
                  <option value="refunded">refunded</option>
                </select>
              </label>
              <div className="flex items-end">
                <button className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white" type="submit">
                  {ui.common.updateStatus}
                </button>
              </div>
            </form>
          ))}
        </div>
      </section>
    </div>
  );
}
