'use client';

import { useState, useEffect } from 'react';
import { supabase, type Experience } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/animations/MotionComponents';
import { useLanguage } from '@/components/language-provider';
import { localize } from '@/lib/localize';

function ExperienceCardSkeleton() {
  return (
    <Card className="md:ml-24 surface-card">
      <CardHeader>
        <div className="flex flex-wrap gap-3 items-start justify-between mb-2">
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
        <Skeleton className="h-4 w-56" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function ExperienceSection() {
  const { t, language } = useLanguage();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .order('start_date', { ascending: false });

    if (data && !error) {
      setExperiences(data);
    }
    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM yyyy', { locale: language === 'en' ? enUS : fr });
  };

  return (
    <section id="experience" className="py-28 px-4 section-grid overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="text-center space-y-5 mb-16">
          <div className="eyebrow-badge mx-auto w-fit">{t.experience.eyebrow}</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t.experience.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t.experience.subtitle}
          </p>
        </AnimatedSection>

        {loading ? (
          <div className="space-y-10">
            {Array.from({ length: 3 }).map((_, i) => (
              <ExperienceCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="relative">
            <motion.div
              className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800 hidden md:block rounded-full"
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            />

            <div className="space-y-10">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  className="relative"
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.12,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <motion.div
                    className="hidden md:flex absolute left-8 top-8 w-4 h-4 items-center justify-center bg-blue-600 dark:bg-blue-500 rounded-full -translate-x-[7px] ring-4 ring-white dark:ring-slate-950 shadow-sm"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 300, delay: index * 0.12 + 0.3 }}
                  />

                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    <Card className="md:ml-24 surface-card transition-shadow duration-300 hover:shadow-lg">
                      <CardHeader>
                        <div className="flex flex-wrap gap-3 items-start justify-between mb-2">
                          <div className="space-y-1">
                            <CardTitle className="text-2xl text-slate-900 dark:text-white">
                              {localize(exp.position, exp.position_en, language)}
                            </CardTitle>
                            <CardDescription className="text-lg font-medium text-blue-700 dark:text-blue-400">
                              {exp.company}
                            </CardDescription>
                          </div>
                          {exp.is_current && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring', delay: 0.5 }}
                            >
                              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-0">
                                {t.experience.current}
                              </Badge>
                            </motion.div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                            <span>
                              {formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : t.experience.present}
                            </span>
                          </div>
                          {exp.location && (
                            <div className="flex items-center gap-1.5">
                              <MapPin className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                              <span>{exp.location}</span>
                            </div>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                          {localize(exp.description, exp.description_en, language)}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.05 + 0.3 }}
                            >
                              <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 font-normal">
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {!loading && experiences.length === 0 && (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400">
            {t.experience.empty}
          </div>
        )}
      </div>
    </section>
  );
}
