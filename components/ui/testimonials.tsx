import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export default function Testimonials() {
    return (
        <section className="py-16 md:py-32 bg-gray-50">
            <div className="mx-auto max-w-6xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
                    <h2 className="text-4xl font-bold lg:text-5xl text-gray-900">
                        What Our Clients Say
                    </h2>
                    <p className="text-xl text-gray-700">
                        Hear from our satisfied clients about their experience working with Kalai Construction.
                        Quality work and customer satisfaction are our top priorities.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {/* Featured Large Testimonial - spans 2 columns */}
                    <Card className="sm:col-span-2 bg-white border-gray-200">
                        <CardContent className="pt-6">
                            <blockquote className="grid gap-4">
                                <p className="text-lg md:text-xl font-medium text-gray-900">
                                    Kalai Construction transformed our vision into reality. Their attention to detail
                                    and commitment to quality is unmatched. From planning to execution, every step
                                    was handled professionally. Our dream home is now a beautiful reality!
                                </p>

                                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                                    <Avatar className="size-12">
                                        <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">RK</AvatarFallback>
                                    </Avatar>

                                    <div>
                                        <cite className="text-sm font-semibold text-gray-900 not-italic">Rajesh Kumar</cite>
                                        <span className="text-gray-600 block text-sm">Homeowner, Thirunindravur</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>

                    {/* Small Testimonial - Vijay Prakash */}
                    <Card className="bg-white border-gray-200">
                        <CardContent className="h-full pt-6">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-4">
                                <p className="text-gray-900">
                                    Outstanding craftsmanship! They built our apartment complex with precision.
                                    Great value for money.
                                </p>

                                <div className="grid grid-cols-[auto_1fr] gap-3">
                                    <Avatar className="size-12">
                                        <AvatarFallback className="bg-pink-100 text-pink-700 font-semibold">VP</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Vijay Prakash</p>
                                        <span className="text-gray-600 block text-sm">Property Developer, Tambaram</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>

                    {/* Small Testimonial - Saravanan Muthu */}
                    <Card className="bg-white border-gray-200">
                        <CardContent className="h-full pt-6">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-4">
                                <p className="text-gray-900">
                                    Timely completion and excellent finishing work. The team was responsive and
                                    professional throughout!
                                </p>

                                <div className="grid grid-cols-[auto_1fr] gap-3">
                                    <Avatar className="size-12">
                                        <AvatarFallback className="bg-indigo-100 text-indigo-700 font-semibold">SM</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Saravanan Muthu</p>
                                        <span className="text-gray-600 block text-sm">Homeowner, Porur</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>

                    {/* Medium Testimonial - spans 2 columns */}
                    <Card className="sm:col-span-2 bg-white border-gray-200">
                        <CardContent className="pt-6">
                            <blockquote className="grid gap-4">
                                <p className="text-lg md:text-xl font-medium text-gray-900">
                                    Excellent service and professional team. They completed our commercial building
                                    on time and within budget. Highly recommended for any construction needs!
                                </p>

                                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                                    <Avatar className="size-12">
                                        <AvatarFallback className="bg-emerald-100 text-emerald-700 font-semibold">MS</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <cite className="text-sm font-semibold text-gray-900 not-italic">Murugan Selvam</cite>
                                        <span className="text-gray-600 block text-sm">Business Owner, Chennai</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>

                    {/* Small Testimonial - Karthik Raj */}
                    <Card className="bg-white border-gray-200">
                        <CardContent className="h-full pt-6">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-4">
                                <p className="text-gray-900">
                                    Best construction company in the area. Quality materials and skilled workers.
                                    My house looks amazing!
                                </p>

                                <div className="grid items-center gap-3 [grid-template-columns:auto_1fr]">
                                    <Avatar className="size-12">
                                        <AvatarFallback className="bg-purple-100 text-purple-700 font-semibold">KR</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <cite className="text-sm font-semibold text-gray-900 not-italic">Karthik Raj</cite>
                                        <span className="text-gray-600 block text-sm">Homeowner, Avadi</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>

                    {/* Small Testimonial - Anbu Arasan */}
                    <Card className="bg-white border-gray-200">
                        <CardContent className="h-full pt-6">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-4">
                                <p className="text-gray-900">
                                    Professional team with great work ethics. They handled our renovation project
                                    perfectly. Very satisfied with the results!
                                </p>

                                <div className="grid grid-cols-[auto_1fr] gap-3">
                                    <Avatar className="size-12">
                                        <AvatarFallback className="bg-orange-100 text-orange-700 font-semibold">AA</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Anbu Arasan</p>
                                        <span className="text-gray-600 block text-sm">Homeowner, Poonamallee</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
