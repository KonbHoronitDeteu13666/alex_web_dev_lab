"use client";

import { useState } from "react";
import type { Tier } from "@/data/tiers";
import PriceRow from "@/components/ui/PriceRow";
import TierMock from "./TierMock";
import TierDialog from "./TierDialog";

/** Карточка тарифа. Клик открывает большое окно с живым макетом и описанием. */
export default function TierCard({ tier }: { tier: Tier }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="hud-panel hud-lift grid w-full grid-cols-[96px_1fr] items-center gap-5 rounded-xl p-5 text-left md:grid-cols-[132px_1fr]"
      >
        <TierMock rows={tier.mock} />
        <span className="block">
          <span className="block font-display text-lg font-medium tracking-tight md:text-xl">
            {tier.title}
          </span>
          <span className="mt-1 block font-mono text-[11px] tracking-[0.1em] text-dim">
            {tier.term}
          </span>
          <span className="mt-2.5 block text-sm leading-relaxed text-ink/90">
            {tier.gist}
          </span>
          <PriceRow basePrice={tier.basePrice} />
          <span className="mt-3.5 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-teal uppercase">
            открыть
            <span aria-hidden>→</span>
          </span>
        </span>
      </button>

      <TierDialog tier={tier} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
