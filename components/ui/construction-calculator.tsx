"use client";

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ChevronDown } from 'lucide-react';

interface CostItem {
    work: string;
    area: number;
    unit: string;
    rate: number;
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

const packages = [
    { name: "Basic Package @ ₹1500/sqft", rate: 1500 },
    { name: "Standard Package @ ₹2099/sqft", rate: 2099 },
    { name: "Premium Package @ ₹2500/sqft", rate: 2500 },
];

const floorOptions = [
    "Ground",
    "Ground + 1",
    "Ground + 2",
    "Ground + 3",
];

export function ConstructionCalculator() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        email: '',
        location: '',
        totalLandArea: '',
        floors: 'Ground + 2',
        package: packages[1].name,
    });

    const [costItems, setCostItems] = useState<CostItem[]>([
        { work: "Area for Ground Floor", area: 0, unit: "sqft", rate: 2099 },
        { work: "Area for First Floor", area: 0, unit: "sqft", rate: 2099 },
        { work: "Area for Second Floor", area: 0, unit: "sqft", rate: 2099 },
        { work: "Size of RCC Water Sump (3000 litre)", area: 0, unit: "litre", rate: 35 },
        { work: "Size of Septic Tank (10000 litre)", area: 0, unit: "litre", rate: 20 },
        { work: "Compound Wall (Height 5ft)", area: 0, unit: "RFT", rate: 1850 },
    ]);

    // Update rates when package changes
    const selectedPackage = packages.find(p => p.name === formData.package) || packages[1];

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

    const handleAreaChange = (index: number, value: string) => {
        const numValue = parseFloat(value) || 0;
        setCostItems(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], area: numValue };
            return updated;
        });
    };

    const calculateCost = (item: CostItem) => {
        const rate = item.unit === "sqft" ? selectedPackage.rate : item.rate;
        return item.area * rate;
    };

    const totalCost = useMemo(() => {
        return updatedCostItems.reduce((sum, item) => sum + calculateCost(item), 0);
    }, [updatedCostItems, selectedPackage.rate]);

    const handleSubmit = () => {
        // Form validation
        if (!formData.name || !formData.phone || !formData.email || !formData.location) {
            alert("Please fill all required fields");
            return;
        }

        // Create estimate message
        const message = `
New Construction Estimate Request:
---------------------------------
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Location: ${formData.location}
Total Land Area: ${formData.totalLandArea}
Number of Floors: ${formData.floors}
Package: ${formData.package}

Cost Breakdown:
${updatedCostItems.map(item => `${item.work}: ${item.area} ${item.unit} x ₹${item.unit === "sqft" ? selectedPackage.rate : item.rate} = ₹${calculateCost(item).toLocaleString()}`).join('\n')}

TOTAL ESTIMATED COST: ₹${totalCost.toLocaleString()}
        `.trim();

        // Open WhatsApp with the estimate
        const whatsappUrl = `https://wa.me/917448556198?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <section className="py-16 md:py-20 bg-blue-50">
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 mb-4">
                        <Calculator className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Home Construction Cost Calculator (2025) Chennai
                    </h2>
                    <p className="text-amber-600 font-medium">
                        Estimate your construction cost here
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
                >
                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter name"
                                value={formData.name}
                                onChange={(e) => handleFormChange('name', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                placeholder="Enter phone number"
                                value={formData.phone}
                                onChange={(e) => handleFormChange('phone', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter email address"
                                value={formData.email}
                                onChange={(e) => handleFormChange('email', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Location <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter location"
                                value={formData.location}
                                onChange={(e) => handleFormChange('location', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>

                        {/* Total Land Area */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Total Land Area <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter total area"
                                value={formData.totalLandArea}
                                onChange={(e) => handleFormChange('totalLandArea', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>

                        {/* Number of Floors */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                No. of Floors <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    value={formData.floors}
                                    onChange={(e) => handleFormChange('floors', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white"
                                >
                                    {floorOptions.map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Package Selection */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Package <span className="text-red-500">*</span>
                        </label>
                        <div className="relative max-w-md">
                            <select
                                value={formData.package}
                                onChange={(e) => handleFormChange('package', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white"
                            >
                                {packages.map((pkg) => (
                                    <option key={pkg.name} value={pkg.name}>{pkg.name}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                        </div>
                    </div>

                    {/* Cost Calculation Table */}
                    <div className="overflow-x-auto rounded-xl border border-gray-200">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-blue-600 text-white">
                                    <th className="py-4 px-4 text-left font-semibold">Work</th>
                                    <th className="py-4 px-4 text-center font-semibold">Area</th>
                                    <th className="py-4 px-4 text-center font-semibold">Unit</th>
                                    <th className="py-4 px-4 text-center font-semibold">Rate</th>
                                    <th className="py-4 px-4 text-center font-semibold">Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {updatedCostItems.map((item, index) => (
                                    <tr
                                        key={index}
                                        className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                                    >
                                        <td className="py-4 px-4 text-gray-700 font-medium">{item.work}</td>
                                        <td className="py-4 px-4">
                                            <input
                                                type="number"
                                                placeholder={item.unit === "sqft" ? "Area in sqft" : "Value"}
                                                value={item.area || ''}
                                                onChange={(e) => handleAreaChange(index, e.target.value)}
                                                className="w-full max-w-[120px] mx-auto block px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                            />
                                        </td>
                                        <td className="py-4 px-4 text-center text-gray-600">{item.unit}</td>
                                        <td className="py-4 px-4 text-center text-gray-600">
                                            Rs.{item.unit === "sqft" ? selectedPackage.rate : item.rate}
                                        </td>
                                        <td className="py-4 px-4 text-center font-semibold text-red-500">
                                            Rs.{calculateCost(item).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="bg-gray-100">
                                    <td colSpan={4} className="py-4 px-4 text-right font-bold text-gray-900">
                                        Total Estimated Cost:
                                    </td>
                                    <td className="py-4 px-4 text-center font-bold text-green-600 text-xl">
                                        ₹{totalCost.toLocaleString()}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        onClick={handleSubmit}
                        className="w-full mt-8 py-4 px-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        GET FREE ESTIMATE NOW
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
