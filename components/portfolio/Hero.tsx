'use client';

import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Download, ArrowDown } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const publicUrl = "https://res.cloudinary.com/drakabvg2/image/upload/v1759923729/001_nysary_mayy4m.jpg"

  return (
      <section className="min-h-screen flex items-center justify-center relative px-4 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 -z-10" />

        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-20 right-20 w-72 h-72 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-slate-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-10">
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-slate-600 to-slate-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <img
                  src={publicUrl}
                  alt="Profile"
                  className="relative w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-white shadow-2xl ring-2 ring-slate-200
             transform transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 text-center">
            <span className="block bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
              Toky Ralison
            </span>
              <span className="block bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
              RAHAJAMANANA
            </span>
            </h1>

            <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
              Développeur Full Stack
            </span>
            </h2>

            <div className="flex items-center justify-center gap-2 text-slate-700">
              <img
                  src="https://flagcdn.com/w40/mg.png"
                  alt="Drapeau de Madagascar"
                  className="h-4 w-6 rounded-sm shadow-sm"
                  loading="lazy"
              />
              <span className="text-sm md:text-base font-medium">Malgache · Madagascar</span>
            </div>

            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Je crée des expériences web modernes et performantes avec une attention particulière aux détails et à l'expérience utilisateur
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center items-center pt-6">
            <Button
                size="lg"
                onClick={() => scrollToSection('contact')}
                className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Mail className="mr-2 h-5 w-5" />
              Me Contacter
            </Button>

            <Button
                asChild
                size="lg"
                variant="outline"
                className="border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all duration-300"
            >
              <a href="https://nrqjrzgmifkjamiikcxd.supabase.co/storage/v1/object/public/CV_portfolio/CV_Toky%20(1).pdf" download>
                <Download className="mr-2 h-5 w-5" />
                Télécharger mon CV
              </a>
            </Button>

          </div>

          <div className="flex gap-4 justify-center pt-8">
            <a
                href="https://github.com/NanamS-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all duration-300"
            >
              <Github className="h-6 w-6 text-slate-700" />
            </a>

            <a
                href="http://linkedin.com/in/toky-ralison-1bb162340"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all duration-300"
            >
              <Linkedin className="h-6 w-6 text-slate-700" />
            </a>

            <a
                href="mailto:rahajamananatoky@gmail.com"
                className="p-3 rounded-full bg-white border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all duration-300"
            >
              <Mail className="h-6 w-6 text-slate-700" />
            </a>

          </div>

        </div>
      </section>
  );
}
