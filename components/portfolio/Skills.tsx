'use client';

import { useState, useEffect } from 'react';
import { supabase, type Skill } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/animations/MotionComponents';
import { useLanguage } from '@/components/language-provider';
import { localize } from '@/lib/localize';
import { TechIcon } from '@/components/tech-icon';

function SkillCardSkeleton() {
  return (
    <Card className="surface-card h-full">
      <CardHeader className="pb-6">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <Skeleton className="h-6 w-32" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-28 rounded-xl" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Skills() {
  const { t, language } = useLanguage();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('category', { ascending: true })
      .order('order_index', { ascending: true })
        .order('proficiency', { ascending: false })
    ;

    if (data && !error) {
      setSkills(data);
    }
    setLoading(false);
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categoryNames: Record<string, string> = t.skills.categories;

  const categoryIcons: Record<string, string> = {
    frontend: '🎨',
    backend: '⚙️',
    database: '🗄️',
    tools: '🛠️',
    design: '✨',
  };

  return (
    <section id="skills" className="py-28 px-4 section-alt section-grid overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center space-y-5 mb-16">
          <div className="eyebrow-badge mx-auto w-fit">{t.skills.eyebrow}</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t.skills.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t.skills.subtitle}
          </p>
        </AnimatedSection>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkillCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <StaggerItem key={category}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <Card className="surface-card transition-shadow duration-300 hover:shadow-lg h-full">
                    <CardHeader className="pb-6">
                      <CardTitle className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                        <span className="icon-chip w-10 h-10 text-lg">
                          {categoryIcons[category] || (categoryNames[category] || category).charAt(0)}
                        </span>
                        {categoryNames[category] || category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {categorySkills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill.id}
                            className="group inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-sm transition-all duration-300"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: skillIndex * 0.04, duration: 0.3 }}
                            whileHover={{ y: -2 }}
                          >
                            <TechIcon name={skill.name} icon={skill.icon} className="h-5 w-5 shrink-0" />
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                              {localize(skill.name, skill.name_en, language)}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        {!loading && skills.length === 0 && (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400">
            {t.skills.empty}
          </div>
        )}
      </div>
    </section>
  );
}
