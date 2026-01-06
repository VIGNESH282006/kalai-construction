"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
    Calculator,
    ChevronDown,
    Sparkles,
    Home,
    Crown,
    Gem,
    Building,
    Droplets,
    Fence,
    ArrowRight,
    Check,
    User,
    Phone,
    Mail,
    MapPin,
    Ruler,
    Loader2
} from 'lucide-react';

// EmailJS Configuration
const EMAILJS_PUBLIC_KEY = 'AmWgMD6ARfk-PSYDf';
const EMAILJS_SERVICE_ID = 'service_l63y4vf';
const EMAILJS_TEMPLATE_ID = 'template_53wpur8';

interface CostItem {
    id: string;
    work: string;
    area: number;
    unit: string;
    rate: number;
    icon: typeof Home;
    category: 'floor' | 'utility' | 'compound';
}

interface FormData {
    name: string;
    phone: string;
    email: string;
    location: string;
    totalLandArea: string;
    floors: string;
    package: string;
}

interface Package {
    id: string;
    name: string;
    displayName: string;
    rate: number;
    color: string;
    gradient: string;
    icon: typeof Home;
    description: string;
}

const packages: Package[] = [
    {
        id: 'basic',
        name: "Basic Package",
        displayName: "Basic",
        rate: 2200,
        color: "blue",
        gradient: "from-blue-500 to-cyan-500",
        icon: Home,
        description: "Essential construction"
    },
    {
        id: 'standard',
        name: "Standard Package",
        displayName: "Standard",
        rate: 2400,
        color: "purple",
        gradient: "from-indigo-500 to-purple-500",
        icon: Crown,
        description: "Most popular choice"
    },
    {
        id: 'premium',
        name: "Premium Package",
        displayName: "Premium",
        rate: 3000,
        color: "amber",
        gradient: "from-amber-500 to-orange-500",
        icon: Gem,
        description: "Luxury construction"
    },
];

const floorOptions = [
    { value: "Ground", label: "Ground Only", floors: 1 },
    { value: "Ground + 1", label: "Ground + 1", floors: 2 },
    { value: "Ground + 2", label: "Ground + 2", floors: 3 },
    { value: "Ground + 3", label: "Ground + 3", floors: 4 },
];

export function ConstructionCalculator() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        email: '',
        location: '',
        totalLandArea: '',
        floors: 'Ground + 2',
        package: 'standard',
    });

    const [costItems, setCostItems] = useState<CostItem[]>([
        { id: 'ground', work: "Ground Floor Area", area: 0, unit: "sqft", rate: 2400, icon: Building, category: 'floor' },
        { id: 'first', work: "First Floor Area", area: 0, unit: "sqft", rate: 2400, icon: Building, category: 'floor' },
        { id: 'second', work: "Second Floor Area", area: 0, unit: "sqft", rate: 2400, icon: Building, category: 'floor' },
        { id: 'third', work: "Third Floor Area", area: 0, unit: "sqft", rate: 2400, icon: Building, category: 'floor' },
        { id: 'sump', work: "RCC Water Sump", area: 0, unit: "litre", rate: 35, icon: Droplets, category: 'utility' },
        { id: 'septic', work: "Septic Tank", area: 0, unit: "litre", rate: 20, icon: Droplets, category: 'utility' },
        { id: 'compound', work: "Compound Wall (5ft)", area: 0, unit: "RFT", rate: 1850, icon: Fence, category: 'compound' },
    ]);

    const [isLoading, setIsLoading] = useState(false);

    // Get number of floors to display based on selection
    const getVisibleFloorCount = () => {
        const selected = floorOptions.find(opt => opt.value === formData.floors);
        return selected ? selected.floors : 3;
    };

    // Floor IDs in order
    const floorIds = ['ground', 'first', 'second', 'third'];

    const selectedPackage = packages.find(p => p.id === formData.package) || packages[1];

    const updatedCostItems = useMemo(() => {
        return costItems.map(item => {
            if (item.unit === "sqft") {
                return { ...item, rate: selectedPackage.rate };
            }
            return item;
        });
    }, [costItems, selectedPackage.rate]);

    const handleFormChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleAreaChange = (id: string, value: string) => {
        const numValue = parseFloat(value) || 0;
        setCostItems(prev => prev.map(item =>
            item.id === id ? { ...item, area: numValue } : item
        ));
    };

    const calculateCost = (item: CostItem) => {
        const rate = item.unit === "sqft" ? selectedPackage.rate : item.rate;
        return item.area * rate;
    };

    // Get visible floor items only
    const getVisibleFloorItems = () => {
        const visibleCount = getVisibleFloorCount();
        return updatedCostItems
            .filter(item => item.category === 'floor')
            .filter(item => floorIds.indexOf(item.id) < visibleCount);
    };

    const totalCost = useMemo(() => {
        const visibleFloorCost = getVisibleFloorItems().reduce((sum, item) => sum + calculateCost(item), 0);
        const otherCost = updatedCostItems
            .filter(item => item.category !== 'floor')
            .reduce((sum, item) => sum + calculateCost(item), 0);
        return visibleFloorCost + otherCost;
    }, [updatedCostItems, selectedPackage.rate, formData.floors]);

    const floorCost = useMemo(() => {
        return getVisibleFloorItems().reduce((sum, item) => sum + calculateCost(item), 0);
    }, [updatedCostItems, selectedPackage.rate, formData.floors]);

    const utilityCost = useMemo(() => {
        return updatedCostItems.filter(item => item.category === 'utility').reduce((sum, item) => sum + calculateCost(item), 0);
    }, [updatedCostItems]);

    const compoundCost = useMemo(() => {
        return updatedCostItems.filter(item => item.category === 'compound').reduce((sum, item) => sum + calculateCost(item), 0);
    }, [updatedCostItems]);

    const handleSubmit = async () => {
        if (!formData.name || !formData.phone || !formData.email || !formData.location) {
            alert("Please fill all required fields");
            return;
        }

        setIsLoading(true);

        // Build cost breakdown text
        const costBreakdown = updatedCostItems
            .filter(item => item.area > 0)
            .map(item => `• ${item.work}: ${item.area} ${item.unit} × ₹${item.unit === "sqft" ? selectedPackage.rate : item.rate} = ₹${calculateCost(item).toLocaleString()}`)
            .join('\n');

        // EmailJS template parameters
        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            location: formData.location,
            land_area: formData.totalLandArea || 'Not specified',
            floors: formData.floors,
            package: selectedPackage.displayName,
            package_lower: selectedPackage.id,
            package_rate: selectedPackage.rate.toLocaleString(),
            cost_breakdown: costBreakdown || 'No items added',
            floor_total: `₹${floorCost.toLocaleString()}`,
            utility_total: `₹${utilityCost.toLocaleString()}`,
            compound_total: `₹${compoundCost.toLocaleString()}`,
            grand_total: `₹${totalCost.toLocaleString()}`,
            date: new Date().toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        };

        try {
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams,
                EMAILJS_PUBLIC_KEY
            );
            alert("✅ Estimate request sent successfully! We'll contact you soon.");

            // Reset form
            setFormData({
                name: '',
                phone: '',
                email: '',
                location: '',
                totalLandArea: '',
                floors: 'Ground + 2',
                package: 'standard',
            });
            setCostItems(prev => prev.map(item => ({ ...item, area: 0 })));
        } catch (error) {
            console.error('EmailJS Error:', error);
            alert("❌ Failed to send request. Please try again or contact us directly.");
        } finally {
            setIsLoading(false);
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
    };

    return (
        <section id="cost-calculator" className="relative py-16 md:py-24 bg-gradient-to-b from-gray-50 via-blue-50/30 to-white overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"
                    animate={{ x: [0, 30, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-1/4 -right-20 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl"
                    animate={{ x: [0, -20, 0], y: [0, -15, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <motion.div
                className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Header */}
                <motion.div className="text-center mb-12" variants={fadeInUp}>
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-200 mb-6"
                        whileHover={{ scale: 1.05 }}
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                            <Calculator className="h-4 w-4 text-blue-600" />
                        </motion.div>
                        <span className="text-sm font-medium text-blue-700">Cost Estimator</span>
                        <Sparkles className="h-4 w-4 text-amber-500" />
                    </motion.div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                        <span className="text-gray-900">Construction</span>{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#001f3f] via-blue-500 to-cyan-400">
                            Cost Calculator
                        </span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto !text-center">
                        Get an instant estimate for your dream home construction in Chennai
                    </p>
                </motion.div>

                {/* Main Content */}
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                    variants={staggerContainer}
                >
                    {/* Left Column - Contact Form */}
                    <motion.div
                        className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 h-fit"
                        variants={fadeInUp}
                    >
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                                <User className="w-4 h-4 text-blue-600" />
                            </div>
                            Your Details
                        </h3>

                        <div className="space-y-4">
                            {/* Name & Phone Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Your name"
                                            value={formData.name}
                                            onChange={(e) => handleFormChange('name', e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 hover:bg-white"
                                        />
                                    </div>
                                </div>
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="tel"
                                            placeholder="Phone number"
                                            value={formData.phone}
                                            onChange={(e) => handleFormChange('phone', e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 hover:bg-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Email & Location Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="email"
                                            placeholder="Email address"
                                            value={formData.email}
                                            onChange={(e) => handleFormChange('email', e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 hover:bg-white"
                                        />
                                    </div>
                                </div>
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Your location"
                                            value={formData.location}
                                            onChange={(e) => handleFormChange('location', e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 hover:bg-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Land Area & Floors */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Land Area</label>
                                    <div className="relative">
                                        <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Area in sqft"
                                            value={formData.totalLandArea}
                                            onChange={(e) => handleFormChange('totalLandArea', e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 hover:bg-white"
                                        />
                                    </div>
                                </div>
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">No. of Floors</label>
                                    <div className="relative">
                                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <select
                                            value={formData.floors}
                                            onChange={(e) => handleFormChange('floors', e.target.value)}
                                            className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 hover:bg-white appearance-none"
                                        >
                                            {floorOptions.map((option) => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Package Selection */}
                        <div className="mt-8">
                            <h4 className="text-sm font-medium text-gray-700 mb-4">Select Package</h4>
                            <div className="grid grid-cols-3 gap-3">
                                {packages.map((pkg) => (
                                    <motion.button
                                        key={pkg.id}
                                        onClick={() => handleFormChange('package', pkg.id)}
                                        className={`relative p-4 rounded-xl border-2 transition-all ${formData.package === pkg.id
                                            ? `border-${pkg.color}-500 bg-gradient-to-br ${pkg.gradient} text-white shadow-lg`
                                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <pkg.icon className={`w-6 h-6 mx-auto mb-2 ${formData.package === pkg.id ? 'text-white' : 'text-gray-600'}`} />
                                        <div className={`text-xs font-semibold ${formData.package === pkg.id ? 'text-white' : 'text-gray-900'}`}>
                                            {pkg.displayName}
                                        </div>
                                        <div className={`text-xs mt-1 ${formData.package === pkg.id ? 'text-white/80' : 'text-gray-500'}`}>
                                            ₹{pkg.rate.toLocaleString()}/sqft
                                        </div>
                                        {formData.package === pkg.id && (
                                            <motion.div
                                                className="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                            >
                                                <Check className="w-3 h-3 text-green-600" />
                                            </motion.div>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Cost Breakdown */}
                    <motion.div
                        className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8"
                        variants={fadeInUp}
                    >
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                                <Calculator className="w-4 h-4 text-purple-600" />
                            </div>
                            Cost Breakdown
                        </h3>

                        {/* Floor Areas */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Building className="w-4 h-4 text-blue-600" />
                                <span className="text-sm font-medium text-gray-700">Floor Areas</span>
                            </div>
                            <div className="space-y-3">
                                {updatedCostItems
                                    .filter(item => item.category === 'floor')
                                    .filter(item => {
                                        const floorIndex = floorIds.indexOf(item.id);
                                        return floorIndex < getVisibleFloorCount();
                                    })
                                    .map((item) => (
                                        <motion.div
                                            key={item.id}
                                            className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="flex-1">
                                                <div className="text-sm font-medium text-gray-800">{item.work}</div>
                                                <div className="text-xs text-gray-500">₹{selectedPackage.rate.toLocaleString()}/sqft</div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    value={item.area || ''}
                                                    onChange={(e) => handleAreaChange(item.id, e.target.value)}
                                                    className="w-24 px-3 py-2 text-sm border border-gray-200 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                                />
                                                <span className="text-xs text-gray-500 w-8">sqft</span>
                                            </div>
                                            <div className="w-28 text-right">
                                                <span className="text-sm font-semibold text-blue-600">
                                                    ₹{calculateCost(item).toLocaleString()}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                            </div>
                        </div>

                        {/* Utilities */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Droplets className="w-4 h-4 text-cyan-600" />
                                <span className="text-sm font-medium text-gray-700">Utilities</span>
                            </div>
                            <div className="space-y-3">
                                {updatedCostItems.filter(item => item.category === 'utility').map((item) => (
                                    <div key={item.id} className="flex items-center gap-3 p-3 bg-cyan-50/50 rounded-xl border border-cyan-100">
                                        <div className="flex-1">
                                            <div className="text-sm font-medium text-gray-800">{item.work}</div>
                                            <div className="text-xs text-gray-500">₹{item.rate}/litre</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="number"
                                                placeholder="0"
                                                value={item.area || ''}
                                                onChange={(e) => handleAreaChange(item.id, e.target.value)}
                                                className="w-24 px-3 py-2 text-sm border border-gray-200 rounded-lg text-center focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                                            />
                                            <span className="text-xs text-gray-500 w-8">litre</span>
                                        </div>
                                        <div className="w-28 text-right">
                                            <span className="text-sm font-semibold text-cyan-600">
                                                ₹{calculateCost(item).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Compound */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Fence className="w-4 h-4 text-amber-600" />
                                <span className="text-sm font-medium text-gray-700">Compound</span>
                            </div>
                            <div className="space-y-3">
                                {updatedCostItems.filter(item => item.category === 'compound').map((item) => (
                                    <div key={item.id} className="flex items-center gap-3 p-3 bg-amber-50/50 rounded-xl border border-amber-100">
                                        <div className="flex-1">
                                            <div className="text-sm font-medium text-gray-800">{item.work}</div>
                                            <div className="text-xs text-gray-500">₹{item.rate.toLocaleString()}/RFT</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="number"
                                                placeholder="0"
                                                value={item.area || ''}
                                                onChange={(e) => handleAreaChange(item.id, e.target.value)}
                                                className="w-24 px-3 py-2 text-sm border border-gray-200 rounded-lg text-center focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                                            />
                                            <span className="text-xs text-gray-500 w-8">RFT</span>
                                        </div>
                                        <div className="w-28 text-right">
                                            <span className="text-sm font-semibold text-amber-600">
                                                ₹{calculateCost(item).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Cost Summary */}
                        <div className="border-t border-gray-200 pt-6 mt-6">
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Floor Construction</span>
                                    <span className="font-medium text-gray-900">₹{floorCost.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Utilities</span>
                                    <span className="font-medium text-gray-900">₹{utilityCost.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Compound Wall</span>
                                    <span className="font-medium text-gray-900">₹{compoundCost.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Total */}
                            <motion.div
                                className="p-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                                animate={{ scale: totalCost > 0 ? [1, 1.02, 1] : 1 }}
                                transition={{ duration: 0.3 }}
                                key={totalCost}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Total Estimated Cost</span>
                                    <span className="text-2xl font-bold">₹{totalCost.toLocaleString()}</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* CTA Button */}
                        <motion.button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="w-full mt-6 py-4 px-6 bg-gradient-to-r from-[#001f3f] via-blue-500 to-cyan-400 hover:from-[#001a35] hover:via-blue-600 hover:to-cyan-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                            whileHover={{ scale: isLoading ? 1 : 1.02 }}
                            whileTap={{ scale: isLoading ? 1 : 0.98 }}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    Get Free Estimate
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </motion.button>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
