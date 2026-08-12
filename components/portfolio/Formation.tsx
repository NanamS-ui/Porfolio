'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Formation } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/animations/MotionComponents';
import { Loader2 } from 'lucide-react';

export default function Formation() {
    const [formations, setFormations] = useState<Formation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFormations = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('formations')
                .select('*')
                .order('order_index', { ascending: true });

            if (error) {
                console.error('Erreur lors du fetch des formations:', error);
            } else if (data) {
                setFormations(data);
            }

            setLoading(false);
        };

        fetchFormations();
    }, []);

    if (loading) {
        return (
            <section id="formation" className="px-4 py-24 section-alt section-grid">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
                        Formation
                    </h2>
                    <div className="flex justify-center items-center py-20">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                            <Loader2 className="h-10 w-10 text-blue-600" />
                        </motion.div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="formation" className="px-4 py-28 section-alt section-grid overflow-hidden">
            <div className="max-w-5xl mx-auto">
                <AnimatedSection className="text-center space-y-5 mb-16">
                    <div className="eyebrow-badge mx-auto w-fit">Académique</div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
                        Formation
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Parcours académique et certifications
                    </p>
                </AnimatedSection>

                <StaggerContainer className="mt-10 grid gap-5">
                    {formations.map((f, index) => (
                        <StaggerItem key={f.id}>
                            <motion.article
                                className="rounded-2xl surface-card transition-shadow duration-300 hover:shadow-lg p-5 md:p-6"
                                whileHover={{ y: -3 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            >
                                <div className="flex items-start gap-4">
                                    {f.logo_url && (
                                        <motion.img
                                            src={f.logo_url}
                                            alt={f.institution}
                                            className="h-12 w-12 md:h-14 md:w-14 rounded-xl bg-white object-contain p-1 border border-slate-200"
                                            loading="lazy"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1, type: 'spring' }}
                                        />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <h3 className="text-lg md:text-xl font-semibold text-slate-900">
                                                {f.diploma}
                                            </h3>
                                            <span className="text-xs md:text-sm text-slate-500 whitespace-nowrap">
                                                {f.period}
                                            </span>
                                        </div>
                                        <p className="text-blue-700 mt-1 font-medium">{f.institution}</p>
                                        {f.location && (
                                            <p className="text-slate-500 text-sm">{f.location}</p>
                                        )}

                                        {f.description && (
                                            <p className="text-slate-600 mt-3">{f.description}</p>
                                        )}

                                        {f.debouches?.length > 0 && (
                                            <div className="mt-4">
                                                <p className="text-slate-700 font-medium mb-2">Débouchés :</p>
                                                <ul className="flex flex-wrap gap-2">
                                                    {f.debouches.map((d, i) => (
                                                        <motion.li
                                                            key={i}
                                                            className="text-xs md:text-sm px-2.5 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-700"
                                                            initial={{ opacity: 0, scale: 0 }}
                                                            whileInView={{ opacity: 1, scale: 1 }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: i * 0.05 + 0.2, type: 'spring', stiffness: 200 }}
                                                            whileHover={{ scale: 1.05, borderColor: 'rgba(37, 99, 235, 0.35)' }}
                                                        >
                                                            {d}
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.article>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
