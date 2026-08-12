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
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: easeOut,
    },
  }),
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
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
    <section id="projects" className="py-28 px-4 section-grid overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center space-y-5 mb-16">
          <div className="eyebrow-badge mx-auto w-fit">Portfolio</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
            Mes Projets
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Une sélection de mes réalisations récentes démontrant mes compétences techniques et ma créativité
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-12">
            <TabsList className="flex flex-wrap justify-center gap-2 h-auto bg-transparent">
              {categories.map(category => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="capitalize px-5 py-2 text-slate-600 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm border border-slate-200 data-[state=active]:border-blue-600 rounded-lg transition-all duration-300"
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
              <Loader2 className="h-10 w-10 text-blue-600" />
            </motion.div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <Card className="group surface-card-interactive overflow-hidden h-full">
                    <div className="relative overflow-hidden aspect-video bg-slate-100">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        loading="lazy"
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                      {project.featured && (
                        <Badge className="absolute top-3 right-3 bg-blue-600 text-white border-0 shadow-sm">
                          En vedette
                        </Badge>
                      )}
                    </div>

                    <CardHeader>
                      <CardTitle className="text-xl text-slate-900 group-hover:text-blue-700 transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-slate-600">
                        {project.short_description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech, i) => (
                          <Badge key={i} variant="secondary" className="text-xs bg-slate-100 text-slate-700 border border-slate-200 font-normal">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 4 && (
                          <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700 border border-slate-200 font-normal">
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
                          className="flex-1 bg-blue-600 hover:bg-blue-700 border-0 shadow-sm"
                          asChild
                        >
                          <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Démo
                          </a>
                        </Button>
                      )}
                      {project.github_url && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50"
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
