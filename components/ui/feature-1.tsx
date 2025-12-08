import { Button } from "@/components/ui/button";

interface Feature1Props {
    title: string;
    description?: string;
    imageSrc: string;
    imageAlt: string;
    buttonPrimary?: {
        label: string;
        href: string;
    };
    buttonSecondary?: {
        label: string;
        href: string;
    };
}

export const Feature1 = ({
    title,
    description,
    imageSrc,
    imageAlt,
    buttonPrimary,
    buttonSecondary,
}: Feature1Props) => {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid items-center gap-4 lg:gap-6 lg:grid-cols-2">
                    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                        <h2 className="my-6 mt-0 text-3xl md:text-4xl font-semibold text-balance lg:text-5xl text-gray-900">
                            {title}
                        </h2>
                        <p className="mb-8 max-w-xl text-gray-600 lg:text-lg leading-relaxed">
                            {description}
                        </p>
                        {(buttonPrimary || buttonSecondary) && (
                            <div className="flex w-full flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                                {buttonPrimary && (
                                    <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white">
                                        <a href={buttonPrimary.href}>
                                            {buttonPrimary.label}
                                        </a>
                                    </Button>
                                )}
                                {buttonSecondary && (
                                    <Button variant="outline" asChild className="border-gray-300 text-gray-700 hover:bg-gray-50">
                                        <a href={buttonSecondary.href}>
                                            {buttonSecondary.label}
                                        </a>
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                    <img
                        src={imageSrc}
                        alt={imageAlt}
                        className="max-h-96 w-full rounded-xl object-cover shadow-lg"
                    />
                </div>
            </div>
        </section>
    );
};
