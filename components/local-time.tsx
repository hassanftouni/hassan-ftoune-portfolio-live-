"use client";

import { useEffect, useState } from "react";

// Shows the current time in the given timezone, e.g. "14:32".
export function LocalTime({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit" }).format(new Date());
    setTime(format());
    const id = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return <span suppressHydrationWarning>{time ?? "--:--"}</span>;
}
