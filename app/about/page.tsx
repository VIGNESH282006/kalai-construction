import { Navbar } from '@/components/ui/navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, Award, Target } from 'lucide-react';
import { SplitHero } from '@/components/ui/split-hero';

export default function AboutPage() {
    const values = [
        {
            icon: Building2,
            title: 'Quality Construction',
            description: 'We deliver exceptional quality in every project, ensuring durability and excellence.',
        },
        {
            icon: Users,
            title: 'Expert Team',
            description: 'Our skilled professionals bring years of experience to every construction project.',
        },
        {
            icon: Award,
            title: 'Award Winning',
            description: 'Recognized for our commitment to excellence and innovative building solutions.',
        },
        {
            icon: Target,
            title: 'On-Time Delivery',
            description: 'We pride ourselves on completing projects on schedule without compromising quality.',
        },
    ];

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <SplitHero
                title="Building Dreams, Creating Landmarks"
                description="With over two decades of experience, Kalai Construction has been at the forefront of innovative building solutions, transforming visions into reality with precision and care."
                image1Src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop"
                image2Src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=800&auto=format&fit=crop"
                stats={[
                    { value: "20+", label: "Years Experience" },
                    { value: "500+", label: "Projects Done" },
                    { value: "100%", label: "Satisfaction" }
                ]}
            />

            <div className="max-w-7xl mx-auto px-6 py-20">
                {/* Mission Statement */}
                <div className="mb-20">
                    <Card className="bg-white border border-gray-200 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-3xl text-gray-900">Our Mission</CardTitle>
                            <CardDescription className="text-gray-700 text-lg mt-4">
                                To provide world-class construction services that exceed expectations while
                                maintaining the highest standards of safety, sustainability, and innovation.
                                We are committed to building lasting relationships with our clients through
                                transparency, reliability, and exceptional craftsmanship.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>

                {/* Core Values */}
                <div className="mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <Card
                                key={index}
                                className="bg-white border border-gray-200 shadow-md hover:shadow-xl hover:border-blue-300 transition-all duration-300 hover:scale-105"
                            >
                                <CardHeader>
                                    <div className="mb-4 p-3 bg-blue-100 rounded-lg w-fit">
                                        <value.icon className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <CardTitle className="text-gray-900 text-xl">{value.title}</CardTitle>
                                    <CardDescription className="text-gray-700 mt-2">
                                        {value.description}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
