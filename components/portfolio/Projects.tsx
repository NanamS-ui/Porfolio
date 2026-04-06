'use client';

import { useState, useEffect } from 'react';
import { supabase, type Project } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, Github, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '@/components/animations/MotionComponents';

const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: easeOut,
    },
  }),
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true });

    if (data && !error) {
      setProjects(data);
    }
    setLoading(false);
  };

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-32 px-4 section-dark-alt section-grid overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center space-y-6 mb-20">
          <motion.div
            className="inline-block px-4 py-2 glass rounded-full text-sm font-medium text-sky-300 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            Portfolio
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight gradient-text">
            Mes Projets
          </h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Une sélection de mes réalisations récentes démontrant mes compétences techniques et ma créativité
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-12">
            <TabsList className="flex flex-wrap justify-center gap-2 h-auto bg-transparent">
              {categories.map(category => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="capitalize px-6 py-2 text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-sky-600 data-[state=active]:to-teal-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-sky-500/25 border border-white/10 data-[state=active]:border-sky-400 rounded-xl transition-all duration-300"
                >
                  {category === 'all' ? 'Tous' : category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </AnimatedSection>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Loader2 className="h-10 w-10 text-sky-400" />
            </motion.div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <Card className="group glass-surface hover:border-sky-400/45 hover:shadow-2xl hover:shadow-sky-500/15 transition-all duration-500 overflow-hidden h-full bg-transparent">
                    <div className="relative overflow-hidden aspect-video">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#06111d] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                      />
                      {project.featured && (
                        <Badge className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg z-20">
                          Featured
                        </Badge>
                      )}
                    </div>

                    <CardHeader>
                      <CardTitle className="text-xl text-white group-hover:text-sky-300 transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-slate-300/90">
                        {project.short_description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech, i) => (
                          <Badge key={i} variant="secondary" className="text-xs bg-white/5 text-slate-200 border border-sky-200/20">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 4 && (
                          <Badge variant="secondary" className="text-xs bg-white/5 text-slate-200 border border-sky-200/20">
                            +{project.technologies.length - 4}
                          </Badge>
                        )}
                      </div>
                    </CardContent>

                    <CardFooter className="gap-2">
                      {project.demo_url && (
                        <Button
                          variant="default"
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-500 hover:to-cyan-400 border-0 shadow-lg shadow-sky-500/20"
                          asChild
                        >
                          <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Demo
                          </a>
                        </Button>
                      )}
                      {project.github_url && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-sky-200/20 bg-white/5 text-white hover:bg-white/10"
                          asChild
                        >
                          <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            Code
                          </a>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {!loading && filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-20 text-slate-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Aucun projet trouvé dans cette catégorie
          </motion.div>
        )}
      </div>
    </section>
  );
}
