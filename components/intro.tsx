"use client";

import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const ease = [0.76, 0, 0.24, 1] as const;

// Tiny shared flag: hero animations wait for the intro curtain to lift before playing.
let introDone = false;
const listeners = new Set<() => void>();

function markIntroDone() {
  introDone = true;
  listeners.forEach((l) => l());
}

export function useIntroDone() {
  const [done, setDone] = useState(introDone);
  useEffect(() => {
    if (introDone) setDone(true);
    const l = () => setDone(true);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return done;
}

// Full-screen ink curtain with a 0 → 100 counter, then slides away.
export function Preloader({ name }: { name: string }) {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);
  const progress = useMotionValue(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setVisible(false);
      markIntroDone();
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const unsub = progress.on("change", (v) => setCount(Math.round(v)));
    const controls = animate(progress, 100, {
      duration: 1.3,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => {
        setVisible(false);
        markIntroDone();
        document.documentElement.style.overflow = "";
      },
    });
    return () => {
      unsub();
      controls.stop();
      document.documentElement.style.overflow = "";
    };
  }, [progress, reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          aria-hidden
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-6 text-paper sm:p-10"
          exit={{ y: "-100%", transition: { duration: 0.9, ease } }}
        >
          <div className="overflow-hidden">
            <motion.p
              className="font-serif text-3xl sm:text-5xl"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              {name}
            </motion.p>
          </div>
          <div className="flex items-end justify-between">
            <div className="h-px w-1/2 bg-paper/20">
              <div className="h-px bg-paper" style={{ width: `${count}%` }} />
            </div>
            <span className="font-serif text-7xl tabular-nums leading-none sm:text-9xl">{count}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Fades/lifts content in once the intro has finished — for elements in the first screen.
export function IntroReveal({
  children,
  delay = 0,
  className,
  y = 16,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const done = useIntroDone();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
