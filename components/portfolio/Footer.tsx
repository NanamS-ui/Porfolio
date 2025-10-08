'use client';

import { Github, Linkedin, Mail, Heart, ArrowUp, Code, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const socialLinks = [
    {
      href: "https://github.com/NanamS-ui",
      icon: Github,
      label: "GitHub",
      color: "hover:bg-slate-700 hover:text-white"
    },
    {
      href: "http://linkedin.com/in/toky-ralison-1bb162340",
      icon: Linkedin,
      label: "LinkedIn",
      color: "hover:bg-blue-600 hover:text-white"
    },
    {
      href: "mailto:rahajamananaralisontoky@gmail.com",
      icon: Mail,
      label: "Email",
      color: "hover:bg-red-600 hover:text-white"
    }
  ];

  const navigationLinks = [
    { href: "#projects", label: "Projets" },
    { href: "#skills", label: "Compétences" },
    { href: "#experience", label: "Expérience" },
    { href: "#contact", label: "Contact" }
  ];

  return (
      <>
        {/* Scroll to top button */}
        {showScrollTop && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-bounce-slow"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
        )}

        <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 px-4 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900/50 to-slate-800/50"></div>
            <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
            <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '3s' }} />
          </div>

          <div className="max-w-7xl mx-auto relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* Brand section */}
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <Code className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                      Toky Ralison
                    </h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed max-w-md">
                    Développeur Full Stack passionné par la création d'expériences web exceptionnelles.
                    Spécialisé dans les technologies modernes et l'innovation.
                  </p>
                </div>

                {/* Social links */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Me suivre</h4>
                  <div className="flex gap-4">
                    {socialLinks.map((social, index) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target={social.href.startsWith('mailto:') ? '_self' : '_blank'}
                            rel="noopener noreferrer"
                            className={`group p-3 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-slate-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${social.color}`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <social.icon className="h-5 w-5 group-hover:animate-pulse" />
                          <span className="sr-only">{social.label}</span>
                        </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-white">Navigation</h4>
                <ul className="space-y-3">
                  {navigationLinks.map((link, index) => (
                      <li key={link.label}>
                        <a
                            href={link.href}
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToSection(link.href.substring(1));
                            }}
                            className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <span className="w-1 h-1 bg-slate-500 rounded-full group-hover:bg-white transition-colors duration-200"></span>
                          {link.label}
                        </a>
                      </li>
                  ))}
                </ul>
              </div>

              {/* Contact info */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-white">Contact</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-300">
                    <Mail className="h-4 w-4 text-blue-400" />
                    <span className="text-sm">rahajamananaralisontoky@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <div className="w-4 h-4 bg-gradient-to-br from-green-400 to-blue-400 rounded-full"></div>
                    <span className="text-sm">Antananarivo, Madagascar</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Sparkles className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm">Disponible pour projets</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom section */}
            <div className="border-t border-slate-700 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <span>© {currentYear} Toky Ralison. Tous droits réservés.</span>
                  <Heart className="h-4 w-4 text-red-500 animate-pulse" />
                </div>

                <div className="flex items-center gap-6 text-sm text-slate-400">
                  <span>Fait avec</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <span>Next.js & Tailwind CSS</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </>
  );
}
