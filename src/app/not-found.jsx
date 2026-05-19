import Link from "next/link";
import { FiArrowLeft, FiSearch } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-base-100 px-4 py-12 text-center sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-2xl border border-base-200 bg-base-100 p-8 shadow-xl sm:p-12">
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-base-200 text-neutral mb-6">
          <span className="font-mono text-4xl font-extrabold tracking-tighter select-none">
            404
          </span>
          <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-neutral text-neutral-content shadow-md">
            <FiSearch className="h-4 w-4" />
          </div>
        </div>

        <div className="space-y-2 mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-base-content font-sans">
            Lost in the stacks?
          </h1>
          <p className="text-sm text-base-content/60 max-w-xs mx-auto">
            The study space or resource you are looking for doesn't exist or has
            been relocated.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="btn btn-neutral w-full normal-case text-sm font-medium shadow-md group"
          >
            <FiArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Home
          </Link>

      
        </div>

        {/* Optional Subtle Subtext Footer */}
        <p className="text-xs text-base-content/40 mt-8">
          Think this is a mistake? Contact your library administrator.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
