import mascotImg from '@/assets/agata-mascot.png';

export const mascotImage = mascotImg;
export const expressions = {
  happy: { src: mascotImg, label: 'Happy' },
  love: { src: mascotImg, label: 'Friendly' },
  excited: { src: mascotImg, label: 'Excited' },
  curious: { src: mascotImg, label: 'Curious' },
  reading: { src: mascotImg, label: 'Helpful' },
  sleepy: { src: mascotImg, label: 'Resting' },
  peek: { src: mascotImg, label: 'Always here' },
  success: { src: mascotImg, label: 'All set' },
  alert: { src: mascotImg, label: 'Heads up' },
} as const;
export type Expression = keyof typeof expressions;

export function Mascot({ mood = 'happy', className = 'size-9' }: { mood?: Expression; className?: string }) {
  return <img src={expressions[mood].src} alt={`Ágata — ${expressions[mood].label.toLowerCase()}`} className={`mascot-mark ${className}`} />;
}
export const AgataMark = Mascot;
export function Wordmark() {
  return <span className="flex items-center gap-2"><Mascot /><span className="text-xl font-medium">Ágata</span></span>;
}
