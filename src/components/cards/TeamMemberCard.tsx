import Image from 'next/image'
import Link from 'next/link'

interface TeamMemberCardProps {
  size: 'large' | 'small'
  fullName: string
  title: string
  shortBio?: string
  yearsExperience?: number
  photoUrl?: string
  linkedIn?: string
  specializations?: string[]
  serviceNames?: string[]
}

export default function TeamMemberCard({
  size, fullName, title, shortBio, yearsExperience, photoUrl, linkedIn, specializations, serviceNames
}: TeamMemberCardProps) {
  const isLarge = size === 'large'
  return (
    <div className={`bg-white rounded-lg border border-[#E2E8F0] shadow-card-1 hover:shadow-card-2 transition-all overflow-hidden ${isLarge ? '' : 'flex gap-4 p-4'}`}>
      {/* Photo */}
      <div className={`relative flex-shrink-0 ${isLarge ? 'w-full h-56' : 'w-16 h-16 rounded-full overflow-hidden'}`}>
        <Image
          src={photoUrl || '/images/placeholder-avatar.svg'}
          alt={fullName}
          fill
          className="object-cover"
          sizes={isLarge ? '(max-width: 768px) 100vw, 400px' : '64px'}
        />
      </div>
      {/* Content */}
      <div className={isLarge ? 'p-6' : 'flex-1 min-w-0'}>
        <h3 className={`font-playfair font-semibold text-navy ${isLarge ? 'text-xl mb-1' : 'text-base mb-0.5'}`}>{fullName}</h3>
        <p className={`text-teal font-semibold ${isLarge ? 'text-sm mb-3' : 'text-xs mb-1'}`}>{title}</p>
        {yearsExperience !== undefined && yearsExperience > 0 && (
          <span className="inline-block text-xs font-semibold text-gold border border-gold/30 bg-gold/10 rounded-full px-2 py-0.5 mb-2">
            {yearsExperience}+ yrs
          </span>
        )}
        {shortBio && isLarge && <p className="text-sm text-slate-600 mb-4 line-clamp-3">{shortBio}</p>}
        {serviceNames && serviceNames.length > 0 && isLarge && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {serviceNames.slice(0, 3).map((s, i) => (
              <span key={i} className="text-xs bg-teal/10 text-teal border border-teal/20 rounded-full px-2 py-0.5">{s}</span>
            ))}
          </div>
        )}
        {specializations && specializations.length > 0 && !isLarge && (
          <p className="text-xs text-slate-500 truncate">{specializations.slice(0, 2).join(' · ')}</p>
        )}
        {linkedIn && isLarge && (
          <Link href={linkedIn} target="_blank" rel="noopener noreferrer"
            className="text-sm text-teal hover:text-navy font-semibold transition-colors">
            LinkedIn →
          </Link>
        )}
      </div>
    </div>
  )
}
