'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase, type Skill } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/animations/MotionComponents';

function AnimatedProgressBar({ value, delay = 0 }: { value: number; delay?: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(value), delay * 1000);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, delay]);

  return (
    <div ref={ref} className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${width}%` }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
    </div>
  );
}

export default function Skills() {
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

  const categoryNames: Record<string, string> = {
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Bases de données',
    tools: 'Outils & DevOps',
    design: 'Design',
  };

  const categoryIcons: Record<string, string> = {
    frontend: '🎨',
    backend: '⚙️',
    database: '🗄️',
    tools: '🛠️',
    design: '✨',
  };

  return (
    <section id="skills" className="py-32 px-4 section-dark overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center space-y-6 mb-20">
          <motion.div
            className="inline-block px-4 py-2 glass rounded-full text-sm font-medium text-cyan-300 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            Expertise
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight gradient-text">
            Compétences
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Technologies et outils que je maîtrise pour créer des applications performantes et innovantes
          </p>
        </AnimatedSection>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Loader2 className="h-10 w-10 text-violet-400" />
            </motion.div>
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(groupedSkills).map(([category, categorySkills], catIndex) => (
              <StaggerItem key={category}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <Card className="glass hover:border-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-500 h-full bg-transparent">
                    <CardHeader className="pb-6">
                      <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                        <motion.div
                          className="w-10 h-10 bg-gradient-to-br from-violet-600 to-cyan-600 rounded-lg flex items-center justify-center text-lg shadow-lg shadow-violet-500/20"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          {categoryIcons[category] || (categoryNames[category] || category).charAt(0)}
                        </motion.div>
                        {categoryNames[category] || category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {categorySkills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.id}
                          className="space-y-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: skillIndex * 0.05, duration: 0.4 }}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-slate-300">{skill.name}</span>
                            <Badge variant="secondary" className="text-xs bg-white/5 text-violet-300 border border-white/10">
                              {skill.proficiency}%
                            </Badge>
                          </div>
                          <AnimatedProgressBar
                            value={skill.proficiency}
                            delay={catIndex * 0.2 + skillIndex * 0.05}
                          />
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        {!loading && skills.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            Aucune compétence ajoutée pour le moment
          </div>
        )}
      </div>
    </section>
  );
}
