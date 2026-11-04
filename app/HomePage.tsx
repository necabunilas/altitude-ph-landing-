'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { Menu } from './menu';
import { HOURS, SITE, formatHour, getStoreStatus, type StoreStatus } from './site';

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'menu', label: 'Menu' },
  { id: 'community', label: 'Community' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'visit', label: 'Visit' },
];

const COMMUNITY = [
  {
    title: 'Cycling',
    body: "Weekly group rides, from casual cruises to challenging climbs. There's a ride for everyone.",
    src: '/gallery/6CCF93EA-0E83-423B-9504-6BAA73BEF798_4_5005_c.jpeg',
    alt: 'An Altitude aid station with drinks and a road bike under tall trees',
    position: 'object-[50%_78%]',
  },
  {
    title: 'Running',
    body: 'Connect with fellow runners, share routes, and train together, then recover over a post-run coffee.',
    src: '/gallery/8BE81068-CE48-4439-9BE0-545B60B4157F.jpeg',
    alt: 'A group of runners wearing medals and race bibs at a finish area',
    position: 'object-[50%_68%]',
  },
  {
    title: 'Outdoors',
    body: 'From hiking trails to weekend camping trips, we get the community out into nature together.',
    src: '/gallery/A095E589-437D-416C-B987-A826C8EC5EA5_1_105_c.jpeg',
    alt: 'Friends relaxing in camp chairs under a canopy on a green hillside',
    position: 'object-[50%_75%]',
  },
];

const GALLERY = [
  { file: '7633BB11-090D-4FA9-ACB9-E5611D3FE477_1_105_c.jpeg', width: 768, height: 1024, alt: 'Latte with rosetta art in a patterned cup on a wooden table' },
  { file: '0ADB1F94-8390-4581-BD89-7C877EC56D9F.jpeg', width: 4032, height: 3024, alt: 'A large group posing in front of a colorful sun mural inside the shop' },
  { file: 'B3D4475F-D5E4-46BA-A6CA-F315C1F59CEA_1_105_c.jpeg', width: 768, height: 1024, alt: 'Two plates of open-faced toast on a live-edge wooden table' },
  { file: '84FEC9CE-21F9-4989-9432-8E6BCD9F9827.png', width: 2048, height: 2048, alt: 'A family chatting with the barista at the counter' },
  { file: '53247178-B5F8-4398-8958-D65EAFC0595D_1_105_c.jpeg', width: 768, height: 1024, alt: 'Two friends holding baskets of freshly picked red coffee cherries' },
  { file: '05FE0350-8F73-456F-86CB-A9880CA215BB_1_105_c.jpeg', width: 768, height: 1024, alt: 'Guests on stools in the shop at dusk' },
  { file: '8CD910EF-B5A9-48E1-B0FE-4C28CBD67F18_1_105_c.jpeg', width: 768, height: 1024, alt: 'A toasted sandwich on a plate on a dark wooden table beside a plant' },
  { file: '1BF03A2E-9E3C-44FD-A236-7CA084E8F6E9_1_105_c.jpeg', width: 1024, height: 768, alt: 'A group in sun hats standing on a green farm path' },
  { file: 'BBACDE71-BFCC-456E-B8E8-CCDB73E0D947_1_105_c.jpeg', width: 768, height: 1024, alt: 'A small latte on the edge of a live-edge wooden table' },
  { file: 'C8EF3D05-5BEB-4802-8FF0-B532EAB1D9BA_1_105_c.jpeg', width: 1024, height: 768, alt: 'A crowd with bikes gathered outside a wooden building under a blue sky' },
  { file: 'C09D7B8D-DE29-451E-9D96-D6930051D4FD_1_105_c.jpeg', width: 768, height: 1024, alt: 'Guests sitting together inside the shop while the barista works' },
  { file: '9083CD6C-EF73-4919-AAA9-0A5C84DAE84B_1_105_c.jpeg', width: 768, height: 1024, alt: 'A hand holding a latte on a large slab of polished wood' },
];

// Staggers .reveal elements that enter the viewport together.
const revealDelay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as React.CSSProperties;

const eyebrow = 'text-xs font-bold uppercase tracking-[0.3em]';
const heading = 'text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight';
const button =
  'inline-flex min-h-14 items-center justify-center px-4 text-center text-sm sm:px-8 font-bold uppercase tracking-widest transition-colors duration-200';

// The ridge line from the Altitude race kit, used as a section edge.
function Ridge({ className, fill }: { className?: string; fill: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={`pointer-events-none block h-14 w-full sm:h-20 lg:h-28 ${className ?? ''}`}
      style={{ fill }}
    >
      <path d="M0 120V92l96-30 74 26 118-68 92 52 70-24 128 58 104-44 66 22 150-84 104 62 62-26 116 60 90-34 70 26l100-20V120z" />
    </svg>
  );
}

function StatusBadge({ status, className }: { status: StoreStatus | null; className?: string }) {
  return (
    <p className={`flex min-h-6 items-center gap-2.5 text-sm font-semibold ${className ?? ''}`} aria-live="polite">
      {status && (
        <>
          <span className={`h-2.5 w-2.5 rounded-full ${status.isOpen ? 'bg-emerald-400' : 'bg-red-400'}`} aria-hidden="true" />
          {status.label}
        </>
      )}
    </p>
  );
}

export default function HomePage({ menu }: { menu: Menu }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [status, setStatus] = useState<StoreStatus | null>(null);
  const [menuTab, setMenuTab] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  const stepGallery = (step: number) =>
    setSelectedIndex((i) => (i === null ? i : (i + step + GALLERY.length) % GALLERY.length));

  // Keep the open/closed status current
  useEffect(() => {
    const update = () => setStatus(getStoreStatus());
    const first = setTimeout(update, 0);
    const interval = setInterval(update, 60000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, []);

  // Active nav link and scroll-to-top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      const position = window.scrollY + 120;
      const current = NAV_LINKS.find(({ id }) => {
        const el = document.getElementById(id);
        return el && position >= el.offsetTop && position < el.offsetTop + el.offsetHeight;
      });
      setActiveSection(current?.id ?? '');
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reveal elements as they scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.reveal:not(.is-in)').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [menuTab]);

  // Lightbox keyboard controls, focus and scroll lock
  const lightboxOpen = selectedIndex !== null;
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') stepGallery(-1);
      else if (e.key === 'ArrowRight') stepGallery(1);
      else if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const distance = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(distance) > 50) stepGallery(distance > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const selected = selectedIndex === null ? null : GALLERY[selectedIndex];

  return (
    <div className="min-h-screen bg-white text-altitude-ink">
      <noscript>
        <style>{'.reveal{opacity:1;transform:none}'}</style>
      </noscript>

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-altitude-gold focus:px-6 focus:py-3 focus:font-bold focus:text-black"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <nav className="fixed top-0 z-40 w-full bg-altitude-ink/90 text-white backdrop-blur-md" aria-label="Main navigation">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-18 items-center justify-between">
            <a href="#hero" className="text-lg font-black uppercase tracking-[0.18em]">
              {SITE.name}
            </a>

            <div className="hidden items-center gap-9 md:flex">
              {NAV_LINKS.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  aria-current={activeSection === id ? 'true' : undefined}
                  className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors hover:text-altitude-gold ${activeSection === id ? 'text-altitude-gold' : 'text-white'}`}
                >
                  {label}
                </a>
              ))}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="-mr-2 flex h-12 w-12 items-center justify-center md:hidden"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 7h16M4 12h16M4 17h16'}
                />
              </svg>
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="flex flex-col border-t border-white/15 py-2 md:hidden">
              {NAV_LINKS.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex min-h-12 items-center text-sm font-bold uppercase tracking-[0.2em] ${activeSection === id ? 'text-altitude-gold' : 'text-white'}`}
                >
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      <main id="main-content">
        {/* Hero */}
        <section id="hero" className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-altitude-ink text-white lg:justify-center">
          <div className="absolute inset-x-0 top-0 h-[42svh] lg:inset-y-0 lg:left-1/2 lg:h-auto">
            <Image
              src="/gallery/F5FFDA25-8DAD-484B-B5A4-A9768ECEE7CE.jpeg"
              alt="A biscuit being dipped into a latte in a blue and white patterned cup"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[50%_85%] lg:object-[50%_80%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-altitude-ink via-altitude-ink/10 to-transparent lg:bg-gradient-to-r lg:via-transparent" />
          </div>

          <div className="hero-copy relative mx-auto w-full max-w-7xl px-4 pb-24 pt-[38svh] sm:px-6 lg:px-8 lg:py-32">
            <div className="lg:max-w-[46%]">
              <p className={`${eyebrow} mb-5 text-altitude-gold`}>
                {SITE.city}, {SITE.province}
              </p>
              <h1 className="mb-6 text-5xl font-black leading-[0.98] tracking-tight sm:text-7xl xl:text-8xl">
                Coffee, brewed up high.
              </h1>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
                Your pit stop for cycling, running, and the outdoors.
              </p>
              <div className="mb-7 flex gap-3">
                <a href="#menu" className={`${button} flex-1 bg-altitude-gold text-black hover:bg-white sm:flex-none`}>
                  See the menu
                </a>
                <a href="#visit" className={`${button} flex-1 border border-white/40 text-white hover:border-white hover:bg-white hover:text-black sm:flex-none`}>
                  Find us
                </a>
              </div>
              <StatusBadge status={status} className="text-white/85" />
            </div>
          </div>

          <Ridge className="absolute inset-x-0 bottom-0" fill="var(--altitude-teal)" />
        </section>

        {/* About */}
        <section id="about" className="bg-altitude-teal px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="reveal">
              <p className={`${eyebrow} mb-5 text-altitude-gold`}>About</p>
              <h2 className={`${heading} mb-7`}>Where the ride starts and the run ends.</h2>
              <div className="space-y-5 text-base leading-relaxed text-white/85 lg:text-lg">
                <p>
                  altitude.cc is a community hub where coffee lovers and outdoor enthusiasts come together. Gear up for a
                  morning ride, recover from a trail run, or just settle in for good coffee and conversation.
                </p>
                <p>We believe good coffee fuels great adventures, and that a good community pushes us further.</p>
              </div>
            </div>
            <div className="reveal relative aspect-[4/3] overflow-hidden" style={revealDelay(200)}>
              <Image
                src="/gallery/E398FA98-68C6-4E05-B951-802224DF1B0F_1_105_c.jpeg"
                alt="A big group of runners gathered under tall pine trees at sunrise"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="reveal-zoom object-cover"
              />
            </div>
          </div>
        </section>

        {/* Menu */}
        <section id="menu" className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="reveal">
              <p className={`${eyebrow} mb-5 text-altitude-teal`}>Menu</p>
              <h2 className={`${heading} mb-10`}>What we&apos;re pouring.</h2>
            </div>

            {menu.categories.length === 0 ? (
              <p className="reveal text-neutral-600">Our menu is being updated. Message us or drop by to see what&apos;s on today.</p>
            ) : (
              <>
                <div className="reveal mb-10 flex flex-wrap gap-2" style={revealDelay(100)} role="group" aria-label="Menu categories">
                  {menu.categories.map(({ label }, i) => (
                    <button
                      key={label}
                      onClick={() => setMenuTab(i)}
                      aria-pressed={menuTab === i}
                      className={`min-h-12 px-5 text-xs font-bold uppercase tracking-[0.15em] transition-colors ${menuTab === i ? 'bg-altitude-ink text-white' : 'bg-altitude-off-white text-altitude-ink hover:bg-neutral-200'}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <ul className="grid gap-x-16 md:grid-cols-2">
                  {menu.categories[menuTab].items.map(({ name, price, description }, i) => (
                    <li key={name} className="reveal border-t border-neutral-200 py-5" style={revealDelay((i % 2) * 100)}>
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="text-lg font-extrabold tracking-tight">{name}</h3>
                        <span className="font-bold tabular-nums">₱{price}</span>
                      </div>
                      {description && <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{description}</p>}
                    </li>
                  ))}
                </ul>

                <p className="mt-8 border-t border-neutral-200 pt-6 text-sm text-neutral-600">
                  {menu.addOns.length > 0 && `Add-ons: ${menu.addOns.map((a) => `${a.name} +₱${a.price}`).join(' · ')}. `}
                  Prices may change.
                </p>
              </>
            )}
          </div>
        </section>

        {/* Community */}
        <section id="community" className="bg-altitude-ink px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="reveal mb-12 max-w-2xl lg:mb-16">
              <p className={`${eyebrow} mb-5 text-altitude-gold`}>Community</p>
              <h2 className={heading}>More than a coffee stop.</h2>
            </div>
            <div className="grid gap-10 md:grid-cols-3 md:gap-8">
              {COMMUNITY.map(({ title, body, src, alt, position }, i) => (
                <article key={title} className="reveal" style={revealDelay(i * 150)}>
                  <div className="relative mb-6 aspect-[4/3] overflow-hidden">
                    <Image src={src} alt={alt} fill sizes="(min-width: 768px) 33vw, 100vw" className={`reveal-zoom object-cover ${position}`} />
                  </div>
                  <h3 className="mb-3 text-2xl font-black uppercase tracking-tight">{title}</h3>
                  <p className="leading-relaxed text-white/70">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="bg-altitude-off-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="reveal mb-12 lg:mb-16">
              <p className={`${eyebrow} mb-5 text-altitude-teal`}>Gallery</p>
              <h2 className={heading}>Seen around the shop.</h2>
            </div>
            <div className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
              {GALLERY.map((photo, index) => (
                <button
                  key={photo.file}
                  onClick={() => setSelectedIndex(index)}
                  className="reveal group mb-3 block w-full break-inside-avoid overflow-hidden md:mb-4"
                  style={revealDelay((index % 4) * 80)}
                  aria-label={`View photo: ${photo.alt}`}
                >
                  <Image
                    src={`/gallery/${photo.file}`}
                    alt=""
                    width={photo.width}
                    height={photo.height}
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Visit */}
        <section id="visit" className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
            <div className="reveal">
              <p className={`${eyebrow} mb-5 text-altitude-teal`}>Visit</p>
              <h2 className={`${heading} mb-6`}>Come for the coffee, stay for the community.</h2>
              <StatusBadge status={status} className="mb-8" />

              <dl className="mb-8">
                {[1, 2, 3, 4, 5, 6, 0].map((d) => {
                  const { day, open, close } = HOURS[d];
                  const isToday = status?.today === d;
                  return (
                    <div key={day} className={`flex justify-between border-t border-neutral-200 py-3 text-sm ${isToday ? 'font-extrabold' : 'font-medium'}`}>
                      <dt>{day}</dt>
                      <dd className={`tabular-nums ${open === null ? 'text-neutral-500' : ''}`}>
                        {open === null || close === null ? 'Closed' : `${formatHour(open)} to ${formatHour(close)}`}
                      </dd>
                    </div>
                  );
                })}
              </dl>

              <p className="mb-6 leading-relaxed">
                {SITE.street}, {SITE.city}, {SITE.province}
                <br />
                <a href={SITE.phoneHref} className="font-bold underline decoration-altitude-gold decoration-2 underline-offset-4">
                  {SITE.phone}
                </a>
              </p>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${button} w-full bg-altitude-ink text-white hover:bg-altitude-teal sm:w-auto`}
              >
                Get directions
              </a>
            </div>

            <div className="reveal relative h-96 bg-altitude-off-white lg:h-auto lg:min-h-[32rem]" style={revealDelay(200)}>
              <iframe
                src={SITE.mapsEmbedUrl}
                className="absolute inset-0 h-full w-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map showing the altitude.cc location"
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <div className="bg-white">
        <Ridge fill="var(--altitude-ink)" />
      </div>
      <footer className="bg-altitude-ink px-4 pb-24 pt-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-3xl font-black uppercase tracking-[0.18em] sm:text-5xl">{SITE.name}</p>
          <p className="mb-1 text-white/70">{SITE.tagline}</p>
          <p className={`${eyebrow} mb-10 text-altitude-gold`}>{SITE.city}</p>

          <div className="flex flex-col-reverse gap-6 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs uppercase tracking-widest text-white/60">© 2026 {SITE.name}. All rights reserved.</p>
            <div className="flex gap-3">
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center bg-white/10 transition-colors hover:bg-altitude-gold hover:text-black"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center bg-white/10 transition-colors hover:bg-altitude-gold hover:text-black"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/95"
          onClick={() => setSelectedIndex(null)}
          onTouchStart={(e) => (touchStartX.current = e.targetTouches[0].clientX)}
          onTouchEnd={onTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <div className="absolute inset-4 sm:inset-x-20 sm:inset-y-8">
            <Image src={`/gallery/${selected.file}`} alt={selected.alt} fill sizes="100vw" className="object-contain" />
          </div>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 px-3 py-1 text-sm font-semibold tabular-nums text-white">
            {(selectedIndex ?? 0) + 1} / {GALLERY.length}
          </p>
          <button
            ref={closeButton}
            onClick={() => setSelectedIndex(null)}
            className="absolute right-3 top-3 flex h-12 w-12 items-center justify-center bg-black/60 text-white hover:text-altitude-gold"
            aria-label="Close photo viewer"
          >
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              stepGallery(-1);
            }}
            className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-black/60 text-white hover:text-altitude-gold"
            aria-label="Previous photo"
          >
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              stepGallery(1);
            }}
            className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-black/60 text-white hover:text-altitude-gold"
            aria-label="Next photo"
          >
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-5 left-4 z-30 flex h-12 w-12 items-center justify-center bg-altitude-gold text-black shadow-lg transition-colors hover:bg-white md:left-6"
          aria-label="Scroll to top"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Messenger */}
      <a
        href={SITE.messenger}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#0084FF] text-white shadow-lg transition-colors hover:bg-[#0066CC] md:right-6"
        aria-label="Message us on Facebook Messenger"
      >
        <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.912 1.45 5.51 3.717 7.217V22l3.406-1.87c.91.252 1.876.387 2.877.387 5.523 0 10-4.145 10-9.243S17.523 2 12 2zm.993 12.478l-2.557-2.73-4.992 2.73 5.488-5.823 2.617 2.73 4.933-2.73-5.489 5.823z" />
        </svg>
      </a>
    </div>
  );
}
