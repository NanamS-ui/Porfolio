'use client';

import { useState, useEffect } from 'react';
import { supabase, type Skill } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

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
      .order('order_index', { ascending: true });

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

  return (
    <section id="skills" className="py-32 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-6 mb-20">
          <div className="inline-block px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-700 mb-4">
            Expertise
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
            Compétences
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Technologies et outils que je maîtrise pour créer des applications performantes et innovantes
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-slate-400" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <Card key={category} className="border-slate-200 hover:shadow-xl hover:border-slate-300 transition-all duration-300 bg-gradient-to-br from-white to-slate-50">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                      {(categoryNames[category] || category).charAt(0)}
                    </div>
                    {categoryNames[category] || category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-slate-700">{skill.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {skill.proficiency}%
                        </Badge>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-slate-900 rounded-full transition-all duration-500"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
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
