import { Link } from '@tanstack/react-router';
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { Wordmark } from './Logo';

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .65, delay }}>{children}</motion.div>;
}
export function Eyebrow({ children }: { children: ReactNode }) { return <p className="text-xs font-medium text-mineral">{children}</p>; }
export function Footer() {
  return <footer className="section-shell mt-24 border-t py-10 pb-28"><div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-center"><Link to="/"><Wordmark /></Link><div className="flex gap-6 text-xs text-muted-foreground"><Link to="/projects" className="hover:text-foreground">Projects</Link><Link to="/workspaces" className="hover:text-foreground">Workspaces</Link></div></div><div className="mt-10 flex flex-col justify-between gap-3 border-t pt-6 text-[11px] text-muted-foreground sm:flex-row"><p>© 2026 Ágata. Create beyond limits.</p><p>Not affiliated with Roblox Corporation.</p></div></footer>;
}
