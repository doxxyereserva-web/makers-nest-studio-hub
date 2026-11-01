import { createFileRoute, Link } from '@tanstack/react-router';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Footer, Reveal } from '@/components/agata/primitives';
import { mascotImage } from '@/components/agata/Logo';
import { useAgata } from '@/components/agata/AgataExperience';
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
  const { t } = useI18n(); const agata = useAgata(); const reduced = useReducedMotion();
  return <main>
    <section className="hero-scene relative overflow-hidden">
      <img src={mascotImage} alt="Ágata, the hooded mascot, holding an agate crystal" className="hero-mascot" />
      <div className="hero-shade" />
      <div className="section-shell hero-content relative">
        <motion.div className="hero-copy max-w-xl" initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9 }}>
          <p className="text-xs text-hero-muted">{t('eyebrow')}</p>
          <h1 className="hero-title mt-6 font-normal">{t('title1')}<br />{t('title2')}</h1>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-hero-muted">{t('sub')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={agata.access} className="h-12 rounded-full bg-hero-foreground px-6 text-hero-background hover:bg-hero-foreground/90">{t('cta')} <ArrowRight /></Button>
            <Button asChild variant="glass" size="lg" className="h-12 rounded-full px-6"><Link to="/projects">{t('projects')}</Link></Button>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="section-shell py-32">
      <Reveal className="max-w-3xl">
        <h2 className="section-title">Built around projects. Each one carries its purpose, its guide, and everything needed to plug it into your tools.</h2>
      </Reveal>
      <div className="mt-20 grid gap-x-16 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{projectModules.map((m, i) => <Reveal key={m.title} delay={(i % 3) * .05}><h3 className="font-medium">{m.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.text}</p></Reveal>)}</div>
      <Button asChild variant="ghost" className="mt-14 px-0 text-mineral hover:bg-transparent"><Link to="/projects">How projects work <ArrowRight /></Link></Button>
    </section>

    <section className="collection-band py-32"><div className="section-shell grid gap-14 lg:grid-cols-2">
      <Reveal><h2 className="section-title">Spaces for the way you work.</h2><p className="mt-5 max-w-md leading-relaxed text-muted-foreground">From a solo builder to a full studio — workspaces, teams and roles keep everything in its place.</p><Button asChild variant="ghost" className="mt-6 px-0 text-mineral hover:bg-transparent"><Link to="/workspaces">Explore workspaces <ArrowRight /></Link></Button></Reveal>
      <div className="divide-y border-y">{workspaceSpaces.map(s => <div key={s.title} className="py-6"><h3 className="font-medium">{s.title}</h3><p className="mt-1 text-sm text-muted-foreground">{s.text}</p></div>)}</div>
    </div></section>

    <section className="section-shell py-32"><Reveal className="flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between">
      <h2 className="section-title max-w-lg">Be there when it opens.</h2>
      <div className="flex flex-wrap gap-3">
        <Button onClick={agata.access} className="h-12 rounded-full bg-hero-foreground px-7 text-hero-background hover:bg-hero-foreground/90">{t('cta')} <ArrowRight /></Button>
        <Button asChild variant="glass" size="lg" className="h-12 rounded-full px-6"><Link to="/projects">{t('projects')}</Link></Button>
      </div>
    </Reveal></section>
    <Footer />
  </main>;
}
