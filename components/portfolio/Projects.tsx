'use client';

import { useState, useEffect } from 'react';
import { supabase, type Project } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, Github, Loader2 } from 'lucide-react';

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
    <section id="projects" className="py-32 px-4 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-6 mb-20">
          <div className="inline-block px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-700 mb-4">
            Portfolio
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
            Mes Projets
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Une sélection de mes réalisations récentes démontrant mes compétences techniques et ma créativité
          </p>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-12">
          <TabsList className="flex flex-wrap justify-center gap-2 h-auto bg-transparent">
            {categories.map(category => (
              <TabsTrigger
                key={category}
                value={category}
                className="capitalize px-6 py-2 data-[state=active]:bg-slate-900 data-[state=active]:text-white"
              >
                {category === 'all' ? 'Tous' : category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-slate-400" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card
                key={project.id}
                className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-slate-200 overflow-hidden bg-white"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden aspect-video bg-slate-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                  />
                  {project.featured && (
                    <Badge className="absolute top-4 right-4 bg-slate-900 text-white shadow-lg z-20">
                      Featured
                    </Badge>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-slate-700 transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.short_description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
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
                      className="flex-1 bg-slate-900 hover:bg-slate-800"
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
                      className="flex-1 border-slate-300 hover:bg-slate-50"
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
            ))}
          </div>
        )}

        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            Aucun projet trouvé dans cette catégorie
          </div>
        )}
      </div>
    </section>
  );
}
