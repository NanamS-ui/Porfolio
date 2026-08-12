'use client';

import { useState, useEffect } from 'react';
import { supabase, type Experience } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, MapPin, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/animations/MotionComponents';

export default function ExperienceSection() {
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
    return format(new Date(dateString), 'MMM yyyy', { locale: fr });
  };

  return (
    <section id="experience" className="py-28 px-4 section-grid overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="text-center space-y-5 mb-16">
          <div className="eyebrow-badge mx-auto w-fit">Parcours</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
            Expérience
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Mon parcours professionnel et les projets sur lesquels j'ai eu la chance de travailler
          </p>
        </AnimatedSection>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Loader2 className="h-10 w-10 text-blue-600" />
            </motion.div>
          </div>
        ) : (
          <div className="relative">
            <motion.div
              className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 hidden md:block rounded-full"
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
                    className="hidden md:flex absolute left-8 top-8 w-4 h-4 items-center justify-center bg-blue-600 rounded-full -translate-x-[7px] ring-4 ring-white shadow-sm"
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
                            <CardTitle className="text-2xl text-slate-900">
                              {exp.position}
                            </CardTitle>
                            <CardDescription className="text-lg font-medium text-blue-700">
                              {exp.company}
                            </CardDescription>
                          </div>
                          {exp.is_current && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring', delay: 0.5 }}
                            >
                              <Badge className="bg-emerald-100 text-emerald-700 border-0">
                                En cours
                              </Badge>
                            </motion.div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            <span>
                              {formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : 'Présent'}
                            </span>
                          </div>
                          {exp.location && (
                            <div className="flex items-center gap-1.5">
                              <MapPin className="h-4 w-4 text-slate-400" />
                              <span>{exp.location}</span>
                            </div>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p className="text-slate-600 leading-relaxed">
                          {exp.description}
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
                              <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700 border border-slate-200 font-normal">
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
          <div className="text-center py-20 text-slate-500">
            Aucune expérience ajoutée pour le moment
          </div>
        )}
      </div>
    </section>
  );
}
