'use client';
import { motion } from 'framer-motion';
import { Play, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { DollarSign } from 'lucide-react';
import { Radio } from 'lucide-react';
import { ArrowRight } from 'lucide-react';


export default function ITServiceSection() {
return (
    <section className="w-full flex justify-center p-10 bg-white text-container"
    style= {{
        backgroundImage: 'url("/images/bg-white2.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }}
    >
<div className="flex flex-col md:flex-row items-center justify-center gap-16 max-w-5xl">
        <div className="relative">
        <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-5 -left-5 w-32 h-32 bg-gradient-to-r from-purple-500 to-transparent rounded-full opacity-30"
        />
        <Image
        src="/images/intro-video.jpg"
        width={300}
        height={220}
        alt="Woman with clipboard"
        className="rounded-lg shadow-lg max-w-[500px] md:max-w-[600px] h-auto object-cover"
        />
        <Link href="https://www.tiktok.com/@evocodeteam/video/7463350237378219270" target="_blank">
        <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute bottom-4 right-0 mr-6 bg-purple-600 p-4 rounded-full shadow-lg cursor-pointer"
        >
        <Play className="text-white w-8 h-8" />
        </motion.div>
        </Link>
        </div>

        <div className="max-w-lg text-left">
        <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            Acerca de nuestra empresa ~
        </span>
        <h2 className="text-4xl font-bold mt-4">
            Elija <span className="text-purple-600">la mejor</span> empresa de servicios de TI
        </h2>
        <p className="text-gray-600 mt-4">
            Tu negocio necesita lo mejor. Nosotros te lo damos. Innovación, soporte y tecnología de alto nivel para que obtengas resultados desde el primer día.
        </p>

        <div className="flex flex-wrap gap-6 mt-6">
            <div className="flex items-center gap-2">
            <span className="text-violet-600 p-2 rounded-full"><DollarSign size={50}/></span>
            <span className="font-semibold text-lg">Garantía de <br/> devolución de <br/> dinero</span>
            </div>
            <div className="flex items-center gap-2">
            <span className="text-violet-600 p-2 rounded-full"><Radio size={50}/></span>
            <span className="font-semibold text-lg">Apoyo técnico</span>
            </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 mt-6">
            <Link href="/contact">
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold shadow-lg">
                ¡Contáctanos! <ArrowRight size={20} />
            </button>

            </Link>
            <motion.div
            animate={{ x: [-2, 2, -2] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="flex items-center gap-2 text-purple-600 font-bold cursor-pointer"
            >
            <Phone className="w-6 h-6"/> +51 922 196 988
            </motion.div>
        </div>
        </div>
    </div>
    </section>
);
}
