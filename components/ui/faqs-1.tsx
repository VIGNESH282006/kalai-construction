import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export function FaqsSection() {
    return (
        <div className="mx-auto w-full max-w-3xl space-y-7 px-4 pt-16">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
                <p className="text-muted-foreground max-w-2xl">
                    Here are some common questions about our construction packages. If you
                    don&apos;t find the answer you&apos;re looking for, feel free to reach out.
                </p>
            </div>
            <Accordion
                type="single"
                collapsible
                className="bg-card dark:bg-card/50 w-full -space-y-px rounded-lg "
                defaultValue="item-1"
            >
                {questions.map((item) => (
                    <AccordionItem
                        value={item.id}
                        key={item.id}
                        className="relative border-x first:rounded-t-lg first:border-t last:rounded-b-lg last:border-b"
                    >
                        <AccordionTrigger className="px-4 py-4 text-[15px] leading-6 hover:no-underline">
                            {item.title}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-4 px-4">
                            {item.content}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
            <p className="text-muted-foreground">
                Can&apos;t find what you&apos;re looking for? Contact our{' '}
                <a href="/contact" className="text-primary hover:underline">
                    customer support team
                </a>
            </p>
        </div>
    );
}

const questions = [
    {
        id: 'item-1',
        title: "What's included in each package?",
        content:
            'Each package includes the material and labor required for constructing your home, along with project management, a dedicated site engineer, mobile app to track your project, and a 10-year warranty on the structure and 1-year warranty on materials. For a full list of inclusions, please refer to the pricing table above.',
    },
    {
        id: 'item-2',
        title: "What's the difference between each package?",
        content:
            'The main differences between our packages lie in the quality of materials (such as cement and steel brands), the capacity of underground and overhead tanks, and the wallet amount for tiles, granite, kitchen and bathroom fittings, paint finishes, doors, windows, and switches.',
    },
    {
        id: 'item-3',
        title: 'Can I customize a package?',
        content:
            'Yes, you can! Each package comes with a fixed wallet amount for items like tiles, fittings, and finishes.',
    },
    {
        id: 'item-4',
        title: 'Will I get choices in fittings?',
        content:
            "Yes, you'll have choices for fittings, so you can pick what suits your style and budget.",
    },
    {
        id: 'item-5',
        title: 'What is a wallet amount?',
        content:
            "A wallet amount is a pre-set budget included in your package that you can use to choose items like tiles, doors, and fittings. If you select items that cost more than the wallet amount, you'll need to pay the difference.",
    },
    {
        id: 'item-6',
        title: 'What are the hidden costs?',
        content:
            "There are no hidden costs. All expenses are clearly outlined in the contract before the project starts, so you'll know exactly what to expect.",
    },
    {
        id: 'item-7',
        title: 'Is compound wall included in the package?',
        content:
            'Not all homes require a compound wall, and some may only need it on two or three sides. To keep costs fair, we offer the compound wall as an optional add-on, so only clients who choose it will pay for it.',
    },
    {
        id: 'item-8',
        title: 'Will Kalai Construction packages cover my approvals if needed?',
        content:
            'Kalai Construction assists in the approval process through the Construction Professionals onboarded on the platform. We are not directly involved in the approval process but our partners ensure that the clients get a completely hassle-free experience.',
    },
];
