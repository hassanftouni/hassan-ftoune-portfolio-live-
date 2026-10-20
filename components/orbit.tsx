"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import type { OrbitItem } from "@/lib/content";

type Ring = { items: OrbitItem[]; size: number; duration: number; reverse?: boolean };

// Logos circling a centre like planets. Each ring spins; each logo counter-spins so it stays upright.
// Hovering the system pauses it.
export function Orbit({
  inner,
  outer,
  center,
}: {
  inner: OrbitItem[];
  outer: OrbitItem[];
  center: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-40, 0]);

  const rings: Ring[] = [
    { items: inner, size: 58, duration: 40 },
    { items: outer, size: 96, duration: 60, reverse: true },
  ];

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, rotate }}
      className="orbit relative mx-auto aspect-square w-full max-w-[560px]"
    >
      {/* faint concentric guides */}
      <div className="absolute left-1/2 top-1/2 aspect-square w-[24%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper-2" />

      {rings.map((ring, r) => (
        <div
          key={r}
          className="orbit-spin absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-line"
          style={{
            width: `${ring.size}%`,
            animationDuration: `${ring.duration}s`,
            animationDirection: ring.reverse ? "reverse" : "normal",
          }}
        >
          {ring.items.map((item, i) => {
            const angle = (i / ring.items.length) * Math.PI * 2 + r * 0.6;
            return (
              <div
                key={item.name}
                className="absolute"
                style={{
                  left: `${50 + 50 * Math.cos(angle)}%`,
                  top: `${50 + 50 * Math.sin(angle)}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  className="orbit-spin"
                  style={{
                    animationDuration: `${ring.duration}s`,
                    animationDirection: ring.reverse ? "normal" : "reverse",
                  }}
                >
                  <Planet item={item} />
                </div>
              </div>
            );
          })}
        </div>
      ))}

      <div className="absolute left-1/2 top-1/2 w-[22%] -translate-x-1/2 -translate-y-1/2">{center}</div>
    </motion.div>
  );
}

function Planet({ item }: { item: OrbitItem }) {
  const initials = item.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="group relative">
      <div
        className={`flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-line bg-white shadow-[0_6px_20px_-8px_rgba(26,25,23,0.25)] transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16 ${
          item.round ? "" : "p-2.5 sm:p-3"
        }`}
      >
        {item.logo ? (
          <Image
            src={item.logo}
            alt={item.name}
            width={64}
            height={64}
            unoptimized={item.logo.endsWith(".svg")}
            className={item.round ? "h-full w-full object-cover" : "h-full w-full object-contain"}
          />
        ) : (
          <span className="font-serif text-lg sm:text-xl" aria-label={item.name}>
            {initials}
          </span>
        )}
      </div>
      <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-2.5 py-1 text-[11px] text-paper opacity-0 transition-opacity group-hover:opacity-100">
        {item.name}
      </span>
    </div>
  );
}
