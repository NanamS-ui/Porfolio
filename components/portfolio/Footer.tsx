import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Portfolio</h3>
            <p className="text-slate-400">
              Développeur Full Stack passionné par la création d'expériences web exceptionnelles.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Navigation</h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Projets
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-white transition-colors">
                  Compétences
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-white transition-colors">
                  Expérience
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Me suivre</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@example.com"
                className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
          <p>© {currentYear} Portfolio. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
