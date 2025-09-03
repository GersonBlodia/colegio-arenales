"use client";
import "./PlansStyle.css";
import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";

interface Plan {
    name: string;
    price: number;
    description: string;
    features: string[];
    recommended?: boolean;
}

export const plans: Plan[] = [
    {
        name: "Plan básico",
        price: 106,
        description:
            "Nuestro propósito es construir soluciones que eliminen las barreras que impiden a las personas...",
        features: [
            "Monitoreo del sistema 24 horas al día, 7 días a la semana",
            "Gestión de seguridad",
            "Copia de seguridad financiera segura",
            "Soporte remoto",
        ],
    },
    {
        name: "Plan estándar",
        price: 180,
        description:
            "Animamos a cada miembro del equipo a ser una persona completa. Tenemos un equipo flexible.",
        features: [
            "Monitoreo del sistema 24 horas al día, 7 días a la semana",
            "Gestión de seguridad",
            "Copia de seguridad financiera segura",
            "Soporte remoto",
        ],
        recommended: true,
    },
    {
        name: "Plan Extendido",
        price: 217,
        description:
            "Lo que diferencia a Evocode de todas las demás agencias de diseño web es la capacidad de ofrecer.",
        features: [
            "Monitoreo del sistema 24 horas al día, 7 días a la semana",
            "Gestión de seguridad",
            "Copia de seguridad financiera segura",
            "Soporte remoto",
        ],
    },
];

interface PricingCardProps {
    plan: Plan;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
    return (
        <div
            className={`p-6 rounded-lg shadow-lg text-left border border-gray-200 w-full max-w-xs ${plan.recommended ? "bg-gray-100" : "bg-white"
                }`}
        >
            <h3 className="text-lg font-extrabold text-gray-800">{plan.name}</h3>
            <p className="text-gray-600 mt-2">{plan.description}</p>

            {/* Precio dentro de una franja de color */}
            <div className="bg-indigo-100 p-2 mt-4 text-center"
                style={{
                    background: "linear-gradient(to bottom, #7114EF, #1475F7)",
                    transition: "background 0.3s ease-in-out",
                }}
            >
                <p className="text-3xl font-bold text-white">
                    S/.{plan.price} <span className="text-sm text-white">/ mensual</span>
                </p>
            </div>

            <ul className="mt-4 space-y-2 text-gray-700">
                {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                        <span className="text-indigo-600">
                            <Check size={15} />
                        </span>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <button className="mt-6 text-white w-full text-center py-3 rounded-full hover:bg-indigo-700 transition"
                style={{
                    background: "linear-gradient(to bottom, #7114EF, #1475F7)",
                    transition: "background 0.3s ease-in-out",
                    fontSize: "14px",
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundImage = "linear-gradient(to bottom, #5B0DC9, #0F5BD4)"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundImage = "linear-gradient(to bottom, #7114EF, #1475F7)"}
            >
                Obtenga una prueba gratuita
            </button>
        </div>
    );
};

const PricingSection: React.FC = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="w-full flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-planes bg-cover bg-center">
            {/* TÍTULO */}
            <div className="text-center mb-4">
                <div className="bg-white px-4 py-3 rounded-full shadow-lg inline-block">
                    <span className="text-violet-600 font-bold">~Plan de precios~</span>
                </div>
                <h2 className="text-3xl font-bold mt-4 ">
                    Nuestros <span className="text-violet-600 inline">Fabulosos</span> Planes de Precios
                </h2>
            </div>

            <div className="plans-container flex flex-nowrap justify-center gap-6 w-full max-w-6xl overflow-x-auto">
                {plans.map((plan, index) => (
                    <PricingCard key={index} plan={plan} />
                ))}
            </div>
        </div>
    );
};

export default PricingSection;
