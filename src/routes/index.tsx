import { createFileRoute, Link } from '@tanstack/react-router';
import { motion, useReducedMotion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Footer, Reveal, Tilt } from '@/components/agata/primitives';
import { mascotImage } from '@/components/agata/Logo';
import { useAgata } from '@/components/agata/AgataExperience';
import { useAuth } from '@/lib/auth';
import { useI18n } from '@/lib/i18n';
import { projectModules, workspaceSpaces } from '@/lib/platform';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Ágata — Create beyond limits' },
    { name: 'description', content: 'Ágata is a Roblox development platform organised by projects, workspaces and teams — in development.' },
    { property: 'og:title', content: 'Ágata — Create beyond limits' },
    { property: 'og:description', content: 'A Roblox development platform organised by projects, workspaces and teams.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Home,
});

function Home() {
  const { t } = useI18n(); const agata = useAgata(); const reduced = useReducedMotion(); const { user } = useAuth();
  const accessLabel = user ? t('enter') : t('cta');
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const copyRot = useTransform(scrollYProgress, [0, 1], [0, 18]);
  const copyOpacity = useTransform(scrollYProgress, [0, .8], [1, 0]);
  const mascotScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const mascotScrollY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const mRotY = useTransform(mx, [-.5, .5], [-8, 8]);
  const mRotX = useTransform(my, [-.5, .5], [6, -6]);
  const onHeroMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduced) return; const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - .5); my.set((e.clientY - r.top) / r.height - .5);
  };
  return <main>
    <section ref={heroRef} onPointerMove={onHeroMove} onPointerLeave={() => { mx.set(0); my.set(0); }} className="hero-scene relative overflow-hidden" style={{ perspective: 1200 }}>
      <motion.img src={mascotImage} alt="Ágata, the hooded mascot, holding an agate crystal" className="hero-mascot" style={reduced ? undefined : { scale: mascotScale, y: mascotScrollY, rotateX: mRotX, rotateY: mRotY }} />
      <div className="hero-shade" />
      <div className="section-shell hero-content relative">
        <motion.div className="hero-copy max-w-xl" style={reduced ? undefined : { y: copyY, rotateX: copyRot, opacity: copyOpacity, transformOrigin: '50% 0%' }} initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9 }}>
                    <h1 className="hero-title font-normal">{t('title1')}<br /><span className="accent">{t('title2')}</span></h1>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={agata.access} className="h-12 rounded-full bg-hero-foreground px-6 text-hero-background hover:bg-hero-foreground/90">{accessLabel} <ArrowRight /></Button>
            <Button asChild variant="glass" size="lg" className="h-12 rounded-full px-6"><Link to="/projects">{t('projects')}</Link></Button>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="section-shell py-32">
      <Reveal className="max-w-3xl">
        <h2 className="section-title">Built around projects. Each one carries its purpose, its guide, and everything needed to plug it into your tools.</h2>
      </Reveal>
      <div className="mt-20 grid gap-x-16 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{projectModules.map((m, i) => <Reveal key={m.title} delay={(i % 3) * .08}><Tilt><h3 className="font-medium">{m.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.text}</p></Tilt></Reveal>)}</div>
      <Button asChild variant="ghost" className="mt-14 px-0 text-mineral hover:bg-transparent"><Link to="/projects">How projects work <ArrowRight /></Link></Button>
    </section>

    <section className="collection-band py-32"><div className="section-shell grid gap-14 lg:grid-cols-2">
      <Reveal><h2 className="section-title">Spaces for the way you work.</h2><p className="mt-5 max-w-md leading-relaxed text-muted-foreground">From a solo builder to a full studio — workspaces, teams and roles keep everything in its place.</p><Button asChild variant="ghost" className="mt-6 px-0 text-mineral hover:bg-transparent"><Link to="/workspaces">Explore workspaces <ArrowRight /></Link></Button></Reveal>
      <div className="divide-y border-y">{workspaceSpaces.map((s, i) => <Reveal key={s.title} delay={i * .08} className="py-6"><Tilt><h3 className="font-medium">{s.title}</h3><p className="mt-1 text-sm text-muted-foreground">{s.text}</p></Tilt></Reveal>)}</div>
    </div></section>

    <section className="section-shell py-32"><Reveal className="flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between">
      <h2 className="section-title max-w-lg">Be there when it opens.</h2>
      <div className="flex flex-wrap gap-3">
        <Button onClick={agata.access} className="h-12 rounded-full bg-hero-foreground px-7 text-hero-background hover:bg-hero-foreground/90">{accessLabel} <ArrowRight /></Button>
        <Button asChild variant="glass" size="lg" className="h-12 rounded-full px-6"><Link to="/projects">{t('projects')}</Link></Button>
      </div>
    </Reveal></section>
    <Footer />
  </main>;
}
