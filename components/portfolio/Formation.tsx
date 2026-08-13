'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Formation } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/animations/MotionComponents';
import { Skeleton } from '@/components/ui/skeleton';
import { optimizeImageUrl } from '@/lib/cloudinary';

function FormationCardSkeleton() {
  return (
    <div className="rounded-2xl surface-card p-5 md:p-6">
      <div className="flex items-start gap-4">
        <Skeleton className="h-12 w-12 md:h-14 md:w-14 rounded-xl shrink-0" />
        <div className="flex-1 min-w-0 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}

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
            <section id="formation" className="px-4 py-28 section-alt section-grid">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Formation
                        </h2>
                    </div>
                    <div className="grid gap-5">
                        {Array.from({ length: 2 }).map((_, i) => (
                            <FormationCardSkeleton key={i} />
                        ))}
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
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Formation
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
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
                                            src={optimizeImageUrl(f.logo_url, { width: 112, height: 112, crop: 'fit' })}
                                            alt={f.institution}
                                            className="h-12 w-12 md:h-14 md:w-14 rounded-xl bg-white dark:bg-slate-800 object-contain p-1 border border-slate-200 dark:border-slate-700"
                                            loading="lazy"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1, type: 'spring' }}
                                        />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white">
                                                {f.diploma}
                                            </h3>
                                            <span className="text-xs md:text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                                {f.period}
                                            </span>
                                        </div>
                                        <p className="text-blue-700 dark:text-blue-400 mt-1 font-medium">{f.institution}</p>
                                        {f.location && (
                                            <p className="text-slate-500 dark:text-slate-400 text-sm">{f.location}</p>
                                        )}

                                        {f.description && (
                                            <p className="text-slate-600 dark:text-slate-400 mt-3">{f.description}</p>
                                        )}

                                        {f.debouches?.length > 0 && (
                                            <div className="mt-4">
                                                <p className="text-slate-700 dark:text-slate-300 font-medium mb-2">Débouchés :</p>
                                                <ul className="flex flex-wrap gap-2">
                                                    {f.debouches.map((d, i) => (
                                                        <motion.li
                                                            key={i}
                                                            className="text-xs md:text-sm px-2.5 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
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
