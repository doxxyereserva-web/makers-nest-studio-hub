import { Link } from '@tanstack/react-router';
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { Wordmark } from './Logo';

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} style={{ transformPerspective: 1000, transformOrigin: '50% 100%' }} initial={reduced ? false : { opacity: 0, y: 40, rotateX: 28, scale: .96, filter: 'blur(6px)' }} whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)' }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .9, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
export function Tilt({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    e.currentTarget.style.setProperty('--rx', `${-y * 10}deg`); e.currentTarget.style.setProperty('--ry', `${x * 12}deg`);
    e.currentTarget.style.setProperty('--mx', `${(x + .5) * 100}%`); e.currentTarget.style.setProperty('--my', `${(y + .5) * 100}%`);
  };
  const onLeave = (e: React.PointerEvent<HTMLDivElement>) => { e.currentTarget.style.setProperty('--rx', '0deg'); e.currentTarget.style.setProperty('--ry', '0deg'); };
  return <div className={`tilt-3d ${className ?? ''}`} onPointerMove={onMove} onPointerLeave={onLeave}>{children}</div>;
}
export function Eyebrow({ children }: { children: ReactNode }) { return <p className="text-xs font-medium text-mineral">{children}</p>; }
export function Footer() {
  return <footer className="section-shell mt-24 border-t py-10 pb-28"><div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-center"><Link to="/"><Wordmark /></Link><div className="flex gap-6 text-xs text-muted-foreground"><Link to="/projects" className="hover:text-foreground">Projects</Link><Link to="/workspaces" className="hover:text-foreground">Workspaces</Link></div></div><div className="mt-10 flex flex-col justify-between gap-3 border-t pt-6 text-[11px] text-muted-foreground sm:flex-row"><p>© 2026 Ágata. Create beyond limits.</p><p>Not affiliated with Roblox Corporation.</p></div></footer>;
}
