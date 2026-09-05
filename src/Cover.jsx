import { Link } from "react-router";

const ANNOUNCEMENTS = ["Free cash on delivery, all over Pakistan", "7‑day returns", "Handpicked watches & straps"];

const Cover = () => {
  return (
    <div>
      {/* Hero */}
      <div
        className="relative mt-[72px] flex h-[420px] w-full items-center justify-center overflow-hidden bg-cover bg-center text-white sm:h-[520px]"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(20,16,13,0.55) 0%, rgba(20,16,13,0.72) 100%), url('https://cdn.shopify.com/s/files/1/0627/5517/files/02-26-20_Aidan_264883.jpg?v=1603213851')",
        }}
      >
        <div className="page-enter mx-6 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-bronze-light">HM Store</p>
          <h1 className="mt-4 font-display text-[clamp(2.5rem,8vw,4.5rem)] font-semibold leading-[1.05]">
            Watches built to be worn, not just owned.
          </h1>
          <p className="mt-5 text-balance text-base text-white/85 sm:text-lg">
            Curated timepieces and leather straps, delivered across Pakistan with cash on delivery.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/listing"
              className="rounded-full bg-white px-7 py-3 text-sm font-semibold tracking-wide text-ink transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Shop the collection
            </Link>
            <Link
              to="/about"
              className="rounded-full border border-white/50 px-7 py-3 text-sm font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-white/10"
            >
              Our story
            </Link>
          </div>
        </div>
      </div>

      {/* Announcement strip: content is duplicated once so the -50% marquee
          loop is seamless, and the whole track pauses/holds still for
          prefers-reduced-motion via the global rule in index.css. */}
      <div className="overflow-hidden border-y border-line bg-paper-dim py-3">
        <div className="marquee-track flex w-max items-center gap-16">
          {[...ANNOUNCEMENTS, ...ANNOUNCEMENTS].map((text, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-sm font-medium tracking-wide text-ink-soft"
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cover;
