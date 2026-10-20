"use client";

import {
  MotionConfig,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useIntroDone } from "@/components/intro";

const ease = [0.22, 1, 0.36, 1] as const;

// Respects the visitor's "reduce motion" OS setting for every animation below.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent"
    />
  );
}

// Fades and lifts its children into place the first time they scroll into view.
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export function Stagger({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}

// Slides each word up from behind a mask, one after another.
export function SplitWords({
  text,
  className,
  delay = 0,
  onLoad = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  /** Animate immediately instead of waiting to scroll into view */
  onLoad?: boolean;
}) {
  const words = text.split(" ");
  const introDone = useIntroDone();
  const trigger = onLoad
    ? { animate: introDone ? "show" : "hidden" }
    : { whileInView: "show", viewport: { once: true } };
  return (
    <motion.span
      className={className}
      initial="hidden"
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-top">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%" },
              show: { y: "0%", transition: { duration: 0.9, ease } },
            }}
          >
            {word}
            {i < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

// Portrait in an arched frame: unveils after the intro, tilts toward the cursor,
// and drifts slower than the page while scrolling.
export function HeroPhoto({ src, alt, badge, tag }: { src: string; alt: string; badge: string; tag: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const introDone = useIntroDone();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });

  return (
    <div
      ref={ref}
      className="relative [perspective:1000px]"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.div style={{ rotateX, rotateY }} className="relative">
        <motion.div
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={introDone ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
          transition={{ duration: 1.4, delay: 0.15, ease }}
          className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-paper-2"
        >
          {/* multiply (on the moving layer, which is its own group) drops the photo's white backdrop onto the frame colour */}
          <motion.div style={{ y, scale }} className="absolute inset-0 mix-blend-multiply">
            <Image
              src={src}
              alt={alt}
              fill
              priority
              sizes="(min-width: 1024px) 420px, 50vw"
              className="object-cover object-[50%_30%] brightness-[1.05] contrast-[1.03]"
            />
          </motion.div>
        </motion.div>

        {/* floating "currently" tag */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={introDone ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.8, delay: 1.1, ease }}
          className="absolute -right-3 top-[24%] hidden sm:block lg:-right-8"
        >
          <div className="float-y flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-paper px-3.5 py-2 text-xs shadow-[0_10px_30px_-12px_rgba(26,25,23,0.35)]">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {tag}
          </div>
        </motion.div>

        {/* spinning circular badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
          animate={introDone ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
          transition={{ duration: 1, delay: 0.9, ease }}
          className="absolute -bottom-4 -left-4 w-16 sm:-bottom-5 sm:-left-7 sm:w-24"
        >
          <RotatingBadge text={badge} />
        </motion.div>
      </motion.div>
    </div>
  );
}

// Text running around a circle that slowly spins, with an arrow in the middle.
export function RotatingBadge({ text }: { text: string }) {
  return (
    <div className="relative aspect-square rounded-full bg-ink text-paper">
      <svg viewBox="0 0 100 100" className="badge-spin absolute inset-0 h-full w-full">
        <defs>
          <path id="badge-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text className="fill-current font-mono text-[8.2px] uppercase">
          {/* textLength stretches the text to exactly one lap of the circle (2π × 37) */}
          <textPath href="#badge-circle" textLength={230} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-serif text-lg sm:text-2xl">↓</span>
    </div>
  );
}

// Pulls its child gently toward the cursor while hovered.
export function Magnetic({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
  const x = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 });
  const y = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 });
  return (
    <motion.div
      className="inline-block"
      style={{ x, y }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

// Giant name whose letters rise one by one as the footer scrolls into view.
export function BigName({ text }: { text: string }) {
  return (
    <motion.div
      aria-hidden
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
      className="flex select-none overflow-hidden whitespace-nowrap font-serif text-[18vw] leading-[0.9] tracking-tight lg:text-[13rem]"
    >
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{ hidden: { y: "100%" }, show: { y: "0%", transition: { duration: 1, ease } } }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </motion.div>
  );
}

// Soft circle that trails the cursor and swells over links. Desktop pointers only.
export function CursorDot() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useSpring(-100, { stiffness: 500, damping: 40, mass: 0.5 });
  const y = useSpring(-100, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHovering(!!(e.target as Element).closest?.("a, button"));
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden
      style={{ x, y }}
      className="pointer-events-none fixed left-0 top-0 z-[90] mix-blend-difference"
    >
      <motion.div
        animate={{ scale: hovering ? 1 : 0.25 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="-ml-6 -mt-6 h-12 w-12 rounded-full bg-paper"
      />
    </motion.div>
  );
}

// A band of large words that slides sideways as the page scrolls.
export function ScrollMarquee({ words }: { words: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const xLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]);
  const row = [...words, ...words, ...words];

  return (
    <div ref={ref} aria-hidden className="relative select-none overflow-hidden py-16 sm:py-24">
      {[xLeft, xRight].map((x, r) => (
        <motion.div
          key={r}
          style={{ x }}
          className={`flex whitespace-nowrap font-serif text-6xl leading-[1.1] sm:text-8xl ${
            r === 1 ? "italic text-muted" : ""
          }`}
        >
          {row.map((word, i) => (
            <span key={i} className="flex items-center">
              {word}
              <span className="mx-6 text-[0.4em] text-accent sm:mx-10">✳</span>
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

// Vertical rule that grows as its container scrolls through the viewport.
export function DrawLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <div ref={ref} aria-hidden className={`absolute inset-y-0 w-px bg-line ${className ?? ""}`}>
      <motion.div style={{ scaleY }} className="h-full w-full origin-top bg-ink" />
    </div>
  );
}
