export type Language = 'fr' | 'en';

export interface Dictionary {
  nav: {
    projects: string;
    skills: string;
    experience: string;
    formation: string;
    contact: string;
    cv: string;
    brandRole: string;
    mobileRole: string;
    closeMenu: string;
    openMenu: string;
    backToTop: string;
    skipToContent: string;
  };
  theme: {
    toLight: string;
    toDark: string;
  };
  language: {
    switchTo: string;
  };
  hero: {
    badge: string;
    role: string;
    pitch: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaTertiary: string;
    discover: string;
    photoAlt: string;
    stats: {
      availabilityLabel: string;
      availabilityValue: string;
      profileLabel: string;
      profileValue: string;
      locationLabel: string;
      locationValue: string;
    };
  };
  projects: {
    eyebrow: string;
    title: string;
    subtitle: string;
    all: string;
    featured: string;
    demo: string;
    code: string;
    empty: string;
  };
  skills: {
    eyebrow: string;
    title: string;
    subtitle: string;
    categories: Record<string, string>;
    empty: string;
  };
  experience: {
    eyebrow: string;
    title: string;
    subtitle: string;
    current: string;
    present: string;
    empty: string;
  };
  formation: {
    eyebrow: string;
    title: string;
    subtitle: string;
    outcomes: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cardTitle: string;
    cardDescription: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    toastMissingTitle: string;
    toastMissingDesc: string;
    toastSuccessTitle: string;
    toastSuccessDesc: string;
    toastErrorTitle: string;
    toastErrorDesc: string;
    toastCaptchaTitle: string;
    toastCaptchaDesc: string;
  };
  footer: {
    tagline: string;
    followMe: string;
    navigation: string;
    contactHeading: string;
    availableForProjects: string;
    rights: string;
    madeWith: string;
  };
  notFound: {
    title: string;
    description: string;
    backHome: string;
  };
}

const dictionaries: Record<Language, Dictionary> = {
  fr: {
    nav: {
      projects: 'Projets',
      skills: 'Compétences',
      experience: 'Expérience',
      formation: 'Formation',
      contact: 'Contact',
      cv: 'CV',
      brandRole: 'Développeur Junior',
      mobileRole: 'Développeur Full Stack Junior',
      closeMenu: 'Fermer le menu',
      openMenu: 'Ouvrir le menu',
      backToTop: 'Retour en haut de page',
      skipToContent: 'Aller au contenu principal',
    },
    theme: {
      toLight: 'Activer le mode clair',
      toDark: 'Activer le mode sombre',
    },
    language: {
      switchTo: 'Switch to English',
    },
    hero: {
      badge: 'Disponible pour un poste ou une mission',
      role: 'Développeur Full Stack Junior',
      pitch: "Je conçois des applications web rapides, élégantes et robustes, avec une forte exigence UX et une architecture propre. Toujours motivé à apprendre et à progresser.",
      ctaPrimary: 'Démarrer un projet',
      ctaSecondary: 'Télécharger CV',
      ctaTertiary: 'Voir mes projets',
      discover: 'Découvrir',
      photoAlt: 'Photo de Toky Ralison',
      stats: {
        availabilityLabel: 'Disponibilité',
        availabilityValue: 'Ouvert aux opportunités',
        profileLabel: 'Profil',
        profileValue: 'Développeur Full Stack Junior',
        locationLabel: 'Localisation',
        locationValue: 'Antananarivo, Madagascar',
      },
    },
    projects: {
      eyebrow: 'Portfolio',
      title: 'Mes Projets',
      subtitle: 'Une sélection de mes réalisations récentes démontrant mes compétences techniques et ma créativité',
      all: 'Tous',
      featured: 'En vedette',
      demo: 'Démo',
      code: 'Code',
      empty: 'Aucun projet trouvé dans cette catégorie',
    },
    skills: {
      eyebrow: 'Expertise',
      title: 'Compétences',
      subtitle: 'Technologies et outils que je maîtrise pour créer des applications performantes et innovantes',
      categories: {
        frontend: 'Frontend',
        backend: 'Backend',
        database: 'Bases de données',
        tools: 'Outils & DevOps',
        design: 'Design',
      },
      empty: 'Aucune compétence ajoutée pour le moment',
    },
    experience: {
      eyebrow: 'Parcours',
      title: 'Expérience',
      subtitle: "Mon parcours professionnel et les projets sur lesquels j'ai eu la chance de travailler",
      current: 'En cours',
      present: 'Présent',
      empty: 'Aucune expérience ajoutée pour le moment',
    },
    formation: {
      eyebrow: 'Académique',
      title: 'Formation',
      subtitle: 'Parcours académique et certifications',
      outcomes: 'Débouchés :',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Me Contacter',
      subtitle: 'Vous avez un projet en tête ? Discutons-en ensemble',
      cardTitle: 'Envoyez-moi un message',
      cardDescription: 'Remplissez le formulaire ci-dessous et je vous répondrai dans les plus brefs délais',
      nameLabel: 'Nom complet',
      namePlaceholder: 'Jean Dupont',
      emailLabel: 'Email',
      emailPlaceholder: 'jean@example.com',
      subjectLabel: 'Sujet',
      subjectPlaceholder: 'À propos de...',
      messageLabel: 'Message',
      messagePlaceholder: 'Votre message...',
      submit: 'Envoyer le message',
      submitting: 'Envoi en cours...',
      toastMissingTitle: 'Champs manquants',
      toastMissingDesc: "Merci de remplir tous les champs avant d'envoyer votre message.",
      toastSuccessTitle: 'Message envoyé ✅',
      toastSuccessDesc: 'Merci pour votre message ! Je vous répondrai dès que possible.',
      toastErrorTitle: 'Erreur ❌',
      toastErrorDesc: "Impossible d'enregistrer votre message. Veuillez réessayer dans quelques instants.",
      toastCaptchaTitle: 'Vérification requise',
      toastCaptchaDesc: "Merci de compléter la vérification anti-robot avant d'envoyer votre message.",
    },
    footer: {
      tagline: "Développeur Full Stack Junior passionné par la création d'expériences web exceptionnelles. Motivé pour apprendre, progresser et contribuer à des projets ambitieux.",
      followMe: 'Me suivre',
      navigation: 'Navigation',
      contactHeading: 'Contact',
      availableForProjects: 'Disponible pour projets',
      rights: 'Tous droits réservés.',
      madeWith: 'Conçu et développé avec Next.js & Tailwind CSS',
    },
    notFound: {
      title: 'Page introuvable',
      description: "Le lien suivi est peut-être cassé, ou la page a été déplacée ou supprimée.",
      backHome: "Retour à l'accueil",
    },
  },
  en: {
    nav: {
      projects: 'Projects',
      skills: 'Skills',
      experience: 'Experience',
      formation: 'Education',
      contact: 'Contact',
      cv: 'Resume',
      brandRole: 'Junior Developer',
      mobileRole: 'Junior Full Stack Developer',
      closeMenu: 'Close menu',
      openMenu: 'Open menu',
      backToTop: 'Back to top',
      skipToContent: 'Skip to main content',
    },
    theme: {
      toLight: 'Switch to light mode',
      toDark: 'Switch to dark mode',
    },
    language: {
      switchTo: 'Passer en français',
    },
    hero: {
      badge: 'Available for a position or a freelance mission',
      role: 'Junior Full Stack Developer',
      pitch: 'I build fast, elegant and robust web applications, with a strong focus on UX and clean architecture. Always motivated to learn and grow.',
      ctaPrimary: 'Start a project',
      ctaSecondary: 'Download Resume',
      ctaTertiary: 'See my projects',
      discover: 'Discover',
      photoAlt: 'Photo of Toky Ralison',
      stats: {
        availabilityLabel: 'Availability',
        availabilityValue: 'Open to opportunities',
        profileLabel: 'Profile',
        profileValue: 'Junior Full Stack Developer',
        locationLabel: 'Location',
        locationValue: 'Antananarivo, Madagascar',
      },
    },
    projects: {
      eyebrow: 'Portfolio',
      title: 'My Projects',
      subtitle: 'A selection of my recent work showcasing my technical skills and creativity',
      all: 'All',
      featured: 'Featured',
      demo: 'Demo',
      code: 'Code',
      empty: 'No projects found in this category',
    },
    skills: {
      eyebrow: 'Expertise',
      title: 'Skills',
      subtitle: 'Technologies and tools I use to build performant, innovative applications',
      categories: {
        frontend: 'Frontend',
        backend: 'Backend',
        database: 'Databases',
        tools: 'Tools & DevOps',
        design: 'Design',
      },
      empty: 'No skills added yet',
    },
    experience: {
      eyebrow: 'Journey',
      title: 'Experience',
      subtitle: 'My professional journey and the projects I have had the chance to work on',
      current: 'Current',
      present: 'Present',
      empty: 'No experience added yet',
    },
    formation: {
      eyebrow: 'Academic',
      title: 'Education',
      subtitle: 'Academic background and certifications',
      outcomes: 'Career paths:',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Get In Touch',
      subtitle: 'Have a project in mind? Let’s talk about it',
      cardTitle: 'Send me a message',
      cardDescription: "Fill out the form below and I'll get back to you as soon as possible",
      nameLabel: 'Full name',
      namePlaceholder: 'John Doe',
      emailLabel: 'Email',
      emailPlaceholder: 'john@example.com',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'About...',
      messageLabel: 'Message',
      messagePlaceholder: 'Your message...',
      submit: 'Send message',
      submitting: 'Sending...',
      toastMissingTitle: 'Missing fields',
      toastMissingDesc: 'Please fill in all fields before sending your message.',
      toastSuccessTitle: 'Message sent ✅',
      toastSuccessDesc: "Thanks for your message! I'll get back to you as soon as possible.",
      toastErrorTitle: 'Error ❌',
      toastErrorDesc: 'Could not save your message. Please try again in a moment.',
      toastCaptchaTitle: 'Verification required',
      toastCaptchaDesc: 'Please complete the anti-robot check before sending your message.',
    },
    footer: {
      tagline: 'Junior Full Stack Developer passionate about building exceptional web experiences. Motivated to learn, grow and contribute to ambitious projects.',
      followMe: 'Follow me',
      navigation: 'Navigation',
      contactHeading: 'Contact',
      availableForProjects: 'Available for projects',
      rights: 'All rights reserved.',
      madeWith: 'Designed and built with Next.js & Tailwind CSS',
    },
    notFound: {
      title: 'Page not found',
      description: 'The link you followed may be broken, or the page may have been moved or removed.',
      backHome: 'Back to home',
    },
  },
};

export function getDictionary(language: Language): Dictionary {
  return dictionaries[language];
}
