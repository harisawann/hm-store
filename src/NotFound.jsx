import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="mt-[90px] flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-display text-[clamp(3.5rem,12vw,6rem)] leading-none text-bronze">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-ink sm:text-3xl">This page wandered off</h1>
      <p className="mt-3 max-w-md text-muted">
        The page you're looking for doesn't exist, or the link may be out of date.
      </p>
      <Link
        to="/home"
        className="mt-8 inline-flex items-center rounded-full bg-ink px-7 py-3 text-sm font-medium tracking-wide text-paper transition-colors hover:bg-bronze-dark"
      >
        Back to home
      </Link>
    </div>
  );
};

export default NotFound;
