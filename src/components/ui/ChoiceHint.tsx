import Link from "next/link";
import type { Route } from "@/lib/routes";

/** Подсказка выбора категории: когда хватит этой, когда нужна другая. */
export default function ChoiceHint({
  stayTitle,
  stayText,
  leaveTitle,
  leaveText,
  leaveHref,
  leaveLabel,
}: {
  stayTitle: string;
  stayText: string;
  leaveTitle: string;
  leaveText: string;
  leaveHref?: Route;
  leaveLabel?: string;
}) {
  return (
    <div className="grid gap-5 rounded-xl border border-line bg-panel/55 p-6 backdrop-blur-sm md:grid-cols-2 md:p-7">
      <div>
        <h3 className="font-display text-base font-medium">{stayTitle}</h3>
        <p className="mt-2 text-sm leading-relaxed text-dim">{stayText}</p>
      </div>
      <div>
        <h3 className="font-display text-base font-medium">{leaveTitle}</h3>
        <p className="mt-2 text-sm leading-relaxed text-dim">
          {leaveText}{" "}
          {leaveHref && leaveLabel && (
            <Link href={leaveHref} className="text-teal hover:underline">
              {leaveLabel}
            </Link>
          )}
        </p>
      </div>
    </div>
  );
}
