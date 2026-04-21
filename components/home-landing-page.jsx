"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { formatTourPriceRange } from "@/lib/format";
import { localize } from "@/lib/i18n";

const WHY_POINTS = [
  {
    title: "Authentic local experiences",
    body: "Meet nomadic families, experience traditional hospitality, and explore the culture of Mongolia in a real and meaningful way."
  },
  {
    title: "Comfortable and well-organized tours",
    body: "We take care of accommodation, meals, transport, and guiding so you can enjoy your trip without stress."
  },
  {
    title: "Experienced local guides",
    body: "Our guides help you understand Mongolia's nature, culture, and history while making your journey safe and enjoyable."
  },
  {
    title: "Flexible travel options",
    body: "Choose from our standard tours or request a custom-made itinerary based on your interests and schedule."
  }
];

const DESTINATIONS = [
  {
    title: "Terelj National Park",
    body: "A beautiful natural area near Ulaanbaatar, known for rock formations, fresh air, horseback riding, and scenic landscapes.",
    image:
      "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Kharkhorin",
    body: "The ancient capital of the Mongol Empire and home to the famous Erdene Zuu Monastery.",
    image:
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Elsen Tasarkhai",
    body: "A unique area of sand dunes, perfect for camel riding and experiencing Mongolia's semi-desert scenery.",
    image:
      "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Khuvsgul Lake",
    body: "One of Mongolia's most beautiful natural wonders, surrounded by forests, mountains, and peaceful wilderness.",
    image:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Gobi Desert",
    body: "A land of dramatic beauty featuring Yol Valley, Khongor Sand Dunes, and unforgettable desert adventures.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80"
  }
];

const TESTIMONIALS = [
  {
    quote:
      "An unforgettable experience. The landscapes were stunning, and the nomadic family visit was the highlight of our trip.",
    author: "Happy Traveler"
  },
  {
    quote: "Everything was well organized, and our guide made the journey even more special.",
    author: "Guest Review"
  }
];

function Reveal({ children, className = "", delay = 0, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function HomeLandingPage({ language, tours, site }) {
  const prefersReducedMotion = useReducedMotion();
  const contactEmail = site?.contact?.email || "info@mongolway.com";

  return (
    <div className="landing-page">
      <section className="landing-hero">
        <motion.div
          className="landing-video-shell"
          initial={prefersReducedMotion ? false : { scale: 1.02 }}
          animate={prefersReducedMotion ? undefined : { scale: 1.08 }}
          transition={{ duration: 9, ease: "easeOut" }}
        >
          <video
            className="landing-video"
            src="/huske.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        </motion.div>
        <div className="landing-video-overlay" />
        <div className="landing-video-vignette" />

        <div className="landing-hero-content shell-container flex flex-col items-center justify-center text-center">
          <div className="landing-hero-stack max-w-5xl">
            <motion.p
              className="landing-eyebrow text-[color:var(--mw-landing-hero-muted)]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Mongolway
            </motion.p>
            <motion.h1
              className="landing-hero-brand !w-full"
              initial={{ opacity: 0, filter: "blur(18px)", y: 22 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Discover the Real Mongolia
            </motion.h1>
            <motion.p
              className="mx-auto max-w-3xl text-base leading-8 text-[color:var(--mw-landing-hero-muted)] sm:text-lg sm:leading-8"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              Authentic journeys through Mongolia's breathtaking landscapes, nomadic culture, and unforgettable adventures.
            </motion.p>

            <motion.div
              className="landing-hero-actions flex-wrap gap-3"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                whileHover={prefersReducedMotion ? undefined : { y: -3, scale: 1.01 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
              >
                <Link href="/tours" className="landing-primary-button">
                  View Tours
                </Link>
              </motion.div>
              <motion.div
                whileHover={prefersReducedMotion ? undefined : { y: -3, scale: 1.01 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
              >
                <Link href="/booking" className="landing-secondary-button">
                  Book Now
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="landing-scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.8 }}
          >
            <span>Scroll</span>
          </motion.div>
        </div>
      </section>

      <section id="welcome" className="landing-section">
        <div className="shell-container">
          <Reveal className="landing-section-intro">
            <p className="landing-eyebrow">Welcome to Mongolway</p>
            <h2 className="landing-section-title">Your local travel partner for discovering the true beauty of Mongolia.</h2>
            <p className="landing-section-body">
              Mongolway is your local travel partner for discovering the true beauty of Mongolia. We create meaningful
              travel experiences for visitors who want to explore more than just famous places.
            </p>
            <p className="landing-section-body">
              From the peaceful valleys of Terelj to the ancient heritage of Kharkhorin, the crystal-clear waters of
              Khuvsgul Lake, and the dramatic landscapes of the Gobi Desert, our tours bring you closer to the heart
              of Mongolia.
            </p>
          </Reveal>

          <div id="why-travel" className="landing-card-grid">
            {WHY_POINTS.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <article className="landing-card">
                  <p className="landing-card-index">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="landing-card-title">{item.title}</h3>
                  <p className="landing-card-body">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="featured-tours" className="landing-section pt-0">
        <div className="shell-container">
          <Reveal className="landing-section-intro">
            <p className="landing-eyebrow">Our Most Popular Tours</p>
            <h2 className="landing-section-title">Featured journeys designed to show Mongolia in a real and memorable way.</h2>
          </Reveal>

          <div className="mt-8 grid gap-6 xl:grid-cols-2">
            {tours.map((tour, index) => (
              <Reveal key={tour.id} delay={index * 0.08}>
                <article className="glass-panel overflow-hidden">
                  <div
                    className="h-64 bg-cover bg-center"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(20,32,43,0.08), rgba(20,32,43,0.34)), url('${tour.gallery[0]}')`
                    }}
                  />
                  <div className="space-y-5 p-6 sm:p-7">
                    <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.24em] faint-text">
                      <span className="rounded-full border border-[color:var(--mw-border)] bg-[var(--mw-control-bg)] px-3 py-1">
                        {localize(tour.durationLabel, language)}
                      </span>
                      <span>{localize(tour.route, language)}</span>
                    </div>
                    <div>
                      <h3 className="font-display text-3xl">{localize(tour.title, language)}</h3>
                      <p className="mt-3 prose-copy">{localize(tour.overview || tour.intro, language)}</p>
                    </div>
                    <div className="surface-soft p-4 text-sm muted-text">
                      <p>
                        <span className="detail-value">Included:</span>{" "}
                        {(localize(tour.included, language) || []).join(", ")}
                      </p>
                      <p className="mt-3">
                        <span className="detail-value">Price:</span> {formatTourPriceRange(tour, language)} per person
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link href={`/tours/${tour.slug}`} className="btn-secondary btn-cta px-5">
                        View Details
                      </Link>
                      <Link href={`/booking?tour=${tour.id}`} className="btn-primary btn-cta px-5">
                        Book This Tour
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section pt-0">
        <div className="shell-container">
          <Reveal className="landing-section-intro" id="destinations">
            <p className="landing-eyebrow">Top Destinations in Mongolia</p>
            <h2 className="landing-section-title">Landscapes, heritage, and adventure across the country.</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {DESTINATIONS.map((destination, index) => (
              <Reveal key={destination.title} delay={index * 0.05}>
                <article className="landing-card h-full overflow-hidden">
                  <div
                    className="h-44 rounded-[1.2rem] bg-cover bg-center"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(20,32,43,0.08), rgba(20,32,43,0.32)), url('${destination.image}')`
                    }}
                  />
                  <h3 className="landing-card-title">{destination.title}</h3>
                  <p className="landing-card-body">{destination.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section pt-0">
        <div className="shell-container">
          <Reveal className="landing-feature-panel">
            <p className="landing-eyebrow">Experience Mongolia Beyond Ordinary Travel</p>
            <h2 className="landing-feature-title">Travel that creates connection, not just checklists.</h2>
            <p className="landing-section-body">
              At Mongolway, we believe travel should be more than just sightseeing. It should be about connection with
              nature, with people, and with culture.
            </p>
            <p className="landing-section-body">
              Our tours are designed for travelers who want to experience Mongolia in an authentic, comfortable, and
              memorable way.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="reviews" className="landing-section pt-0">
        <div className="shell-container">
          <Reveal className="landing-section-intro">
            <p className="landing-eyebrow">What Our Travelers Say</p>
            <h2 className="landing-section-title">Real stories from unforgettable journeys.</h2>
          </Reveal>
          <div className="landing-feature-grid mt-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <Reveal key={testimonial.author} delay={index * 0.08} className="landing-quote-panel">
                <p className="landing-quote-mark">“</p>
                <p className="landing-quote text-[2.2rem] sm:text-[2.8rem]">{testimonial.quote}</p>
                <p className="landing-inline-link no-underline">{testimonial.author}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="custom-tour" className="landing-section pt-0">
        <div className="shell-container">
          <Reveal className="landing-feature-panel">
            <p className="landing-eyebrow">Looking for a Custom Tour?</p>
            <h2 className="landing-feature-title">Tell us your dates, group size, and interests.</h2>
            <p className="landing-section-body">
              We can create a personalized itinerary based on your travel dates, group size, and interests.
            </p>
            <p className="landing-section-body">
              Whether you want a private tour, family trip, adventure holiday, or cultural journey, we are here to
              help you plan it.
            </p>
            <Link href="/contact" className="landing-inline-link">
              Request a Custom Tour
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="contact-cta" className="landing-section pt-0">
        <div className="shell-container">
          <Reveal className="landing-closing-panel">
            <p className="landing-eyebrow">Ready to Explore Mongolia?</p>
            <h2 className="landing-closing-title">Let Mongolway help you create an unforgettable journey.</h2>
            <p className="landing-section-body">
              Travel through one of the world's most unique destinations with local expertise, thoughtful planning, and
              authentic experiences from start to finish.
            </p>
            <div className="landing-closing-links">
              <Link href="/contact" className="landing-secondary-button">
                Send Inquiry
              </Link>
              <a href={`mailto:${contactEmail}`} className="landing-text-link">
                Contact Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
