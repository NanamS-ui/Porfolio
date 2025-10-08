'use client';

import { useState, useEffect } from 'react';
import { supabase, type Experience } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, MapPin, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

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
    <section id="experience" className="py-32 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-6 mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
            Expérience
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Mon parcours professionnel et les projets sur lesquels j'ai eu la chance de travailler
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-slate-400" />
          </div>
        ) : (
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-slate-900 via-slate-300 to-slate-900 hidden md:block rounded-full" />

            <div className="space-y-16">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="relative">
                  <div className="hidden md:block absolute left-8 top-8 w-5 h-5 bg-slate-900 rounded-full -translate-x-[9px] ring-4 ring-white shadow-lg" />

                  <Card className="md:ml-24 border-slate-200 hover:shadow-2xl hover:border-slate-300 transition-all duration-500 bg-white">
                    <CardHeader>
                      <div className="flex flex-wrap gap-3 items-start justify-between mb-2">
                        <div className="space-y-1">
                          <CardTitle className="text-2xl text-slate-900">
                            {exp.position}
                          </CardTitle>
                          <CardDescription className="text-lg font-medium text-slate-700">
                            {exp.company}
                          </CardDescription>
                        </div>
                        {exp.is_current && (
                          <Badge className="bg-green-600 hover:bg-green-700">
                            En cours
                          </Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : 'Présent'}
                          </span>
                        </div>
                        {exp.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
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
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
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
