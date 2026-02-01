'use client'

interface AnnouncementBanner {
    text: string
    linkText: string
    linkHref: string
}

interface CallToAction {
    text: string
    href: string
    variant: 'primary' | 'secondary'
}

interface HeroLandingProps {
    // Hero content
    title: string
    description: string
    announcementBanner?: AnnouncementBanner
    callToActions?: CallToAction[]

    // Styling options
    titleSize?: 'small' | 'medium' | 'large'
    gradientColors?: {
        from: string
        to: string
    }

    // Additional customization
    className?: string
}

const defaultProps: Partial<HeroLandingProps> = {
    titleSize: "large",
    gradientColors: {
        from: "oklch(0.646 0.222 41.116)",
        to: "oklch(0.488 0.243 264.376)"
    },
    callToActions: [
        { text: "Get started", href: "#", variant: "primary" },
        { text: "Learn more", href: "#", variant: "secondary" }
    ]
}

export function HeroLanding(props: HeroLandingProps) {
    const {
        title,
        description,
        announcementBanner,
        callToActions,
        titleSize,
        gradientColors,
        className
    } = { ...defaultProps, ...props }

    const getTitleSizeClasses = () => {
        switch (titleSize) {
            case 'small':
                return 'text-2xl sm:text-3xl md:text-5xl'
            case 'medium':
                return 'text-2xl sm:text-4xl md:text-6xl'
            case 'large':
            default:
                return 'text-3xl sm:text-5xl md:text-7xl'
        }
    }

    const renderCallToAction = (cta: CallToAction, index: number) => {
        if (cta.variant === 'primary') {
            return (
                <a
                    key={index}
                    href={cta.href}
                    className="rounded-lg bg-blue-600 px-4 py-3 sm:px-5 sm:py-3.5 text-sm sm:text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
                >
                    {cta.text}
                </a>
            )
        } else {
            return (
                <a
                    key={index}
                    href={cta.href}
                    className="text-sm sm:text-base font-semibold text-white hover:text-white/80 transition-colors"
                >
                    {cta.text} <span aria-hidden="true">→</span>
                </a>
            )
        }
    }

    return (
        <div className={`min-h-screen w-full overflow-hidden relative ${className || ''}`}>
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1920&auto=format&fit=crop')"
                }}
            />
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-black/50" />

            <div className="relative isolate px-6 pt-4 min-h-screen flex flex-col justify-center">
                <div className="mx-auto max-w-4xl pt-20 sm:pt-25">
                    {/* Announcement banner */}
                    {announcementBanner && (
                        <div className="hidden sm:mb-4 sm:flex sm:justify-center">
                            <div className="relative rounded-full px-3 py-1.5 text-sm text-white/80 ring-1 ring-white/30 hover:ring-white/50 transition-all bg-white/10 backdrop-blur-sm">
                                {announcementBanner.text}{' '}
                                <a href={announcementBanner.linkHref} className="font-semibold text-blue-300 hover:text-blue-200 transition-colors">
                                    <span aria-hidden="true" className="absolute inset-0" />
                                    {announcementBanner.linkText} <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                    )}

                    <div className="text-center">
                        <h1 className={`${getTitleSizeClasses()} font-semibold tracking-tight text-balance text-white`}>
                            {title}
                        </h1>
                        <p className="mt-6 sm:mt-8 text-base font-medium text-pretty text-white/80 sm:text-xl/8">
                            {description}
                        </p>

                        {/* Call to action buttons */}
                        {callToActions && callToActions.length > 0 && (
                            <div className="mt-8 sm:mt-10 flex items-center justify-center gap-x-4 sm:gap-x-6">
                                {callToActions.map((cta, index) => renderCallToAction(cta, index))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

// Export types for consumers
export type { HeroLandingProps, AnnouncementBanner, CallToAction }
