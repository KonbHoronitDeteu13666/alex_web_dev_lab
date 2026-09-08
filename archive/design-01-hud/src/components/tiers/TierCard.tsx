"use client";

import { useState } from "react";
import type { Tier } from "@/data/tiers";
import CardFace, { cardShell } from "@/components/ui/CardFace";
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
        className={cardShell(true)}
      >
        <CardFace
          title={tier.title}
          text={tier.gist}
          term={tier.term}
          basePrice={tier.basePrice}
          mock={tier.mock}
        />
      </button>

      <TierDialog tier={tier} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
