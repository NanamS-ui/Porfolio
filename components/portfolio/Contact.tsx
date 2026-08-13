'use client';

import { useState } from 'react';
import { supabase, type ContactMessage } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/animations/MotionComponents';

export default function Contact() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (!name || !email || !subject || !message) {
      toast({
        title: "Champs manquants",
        description: "Merci de remplir tous les champs avant d'envoyer votre message.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Étape 1 (critique) : enregistrer le message dans la base de données.
      // Tant que cette étape réussit, le message est bien reçu même si la notification email échoue.
      const { error: dbError } = await supabase
        .from('contact_messages')
        .insert([{ name, email, subject, message }]);

      if (dbError) throw dbError;

      toast({
        title: "Message envoyé ✅",
        description: "Merci pour votre message ! Je vous répondrai dès que possible.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Étape 2 (best-effort) : notifier par email via la fonction Supabase.
      // Un échec ici ne doit pas faire croire au visiteur que son message n'est pas arrivé.
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseAnonKey) {
        try {
          const response = await fetch(`${supabaseUrl}/functions/v1/send-contact-email`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${supabaseAnonKey}`,
            },
            body: JSON.stringify({ name, email, subject, message }),
          });

          if (!response.ok) {
            console.warn('Notification email non envoyée (fonction indisponible), le message reste enregistré.');
          }
        } catch (emailError) {
          console.warn('Notification email impossible, le message reste enregistré.', emailError);
        }
      }
    } catch (error: any) {
      console.error('Erreur contact:', error?.message ?? error);
      toast({
        title: "Erreur ❌",
        description: "Impossible d'enregistrer votre message. Veuillez réessayer dans quelques instants.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-28 px-4 section-alt section-grid overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="text-center space-y-5 mb-16">
          <div className="eyebrow-badge mx-auto w-fit">Contact</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Me Contacter
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Vous avez un projet en tête ? Discutons-en ensemble
          </p>
        </AnimatedSection>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="surface-card shadow-md">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 icon-chip rounded-2xl mx-auto mb-6">
                <Mail className="h-8 w-8" />
              </div>
              <CardTitle className="text-3xl font-bold text-slate-900 dark:text-white">Envoyez-moi un message</CardTitle>
              <CardDescription className="text-base mt-3 text-slate-600 dark:text-slate-400">
                Remplissez le formulaire ci-dessous et je vous répondrai dans les plus brefs délais
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Nom complet
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Jean Dupont"
                      className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="jean@example.com"
                      className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-300"
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <label htmlFor="subject" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Sujet
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="À propos de..."
                    className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Votre message..."
                    rows={6}
                    className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:placeholder:text-slate-500 resize-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white h-14 text-base font-medium shadow-md shadow-blue-600/20 transition-all duration-300 border-0"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Envoyer le message
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
