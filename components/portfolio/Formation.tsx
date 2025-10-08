'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'; // ton client supabase
import type { Formation } from '@/lib/supabase'; // le type que l'on a défini avant

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
            <section id="formation" className="px-4 py-20 bg-white">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
                        Formation
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Chargement des données...
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section id="formation" className="px-4 py-20 bg-white">
            <div className="max-w-5xl mx-auto">
                <div className="text-center space-y-6 mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
                        Formation
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Parcours académique et certifications
                    </p>
                </div>

                <div className="mt-10 grid gap-6 md:gap-8">
                    {formations.map((f) => (
                        <article
                            key={f.id}
                            className="rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow p-5 md:p-6"
                        >
                            <div className="flex items-start gap-4">
                                {f.logo_url && (
                                    <img
                                        src={f.logo_url}
                                        alt={f.institution}
                                        className="h-12 w-12 md:h-14 md:w-14 rounded bg-slate-50 object-contain p-1 border border-slate-200"
                                        loading="lazy"
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
                                    <p className="text-slate-700 mt-1 font-medium">{f.institution}</p>
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
                                                    <li
                                                        key={i}
                                                        className="text-xs md:text-sm px-2.5 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-700"
                                                    >
                                                        {d}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
