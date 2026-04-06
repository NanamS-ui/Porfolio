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
    setLoading(true);

    try {
      // Étape 1 : enregistrer dans la base de données
      const { error: dbError } = await supabase
          .from('contact_messages')
          .insert([formData]);

      if (dbError) throw dbError;

      // Étape 2 : appeler la fonction Deno pour envoyer l’email
      const response = await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-contact-email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify(formData),
          }
      );

      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.error || "Erreur lors de l’envoi de l’email.");
      }

      // Étape 3 : afficher le succès et réinitialiser le formulaire
      toast({
        title: "Message envoyé ✅",
        description: "Merci pour votre message ! Je vous répondrai dès que possible.",
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      console.error("Erreur contact:", error.message);
      toast({
        title: "Erreur ❌",
        description: "Impossible d’envoyer le message. Veuillez réessayer.",
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
    <section id="contact" className="py-32 px-4 section-dark-alt section-grid overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="text-center space-y-6 mb-20">
          <motion.div
            className="inline-block px-4 py-2 glass rounded-full text-sm font-medium text-sky-300 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            Contact
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight gradient-text">
            Me Contacter
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Vous avez un projet en tête ? Discutons-en ensemble
          </p>
        </AnimatedSection>

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="glass-strong glow-primary bg-transparent">
            <CardHeader className="text-center pb-8">
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-sky-600 to-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-sky-500/20"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Mail className="h-10 w-10 text-white" />
              </motion.div>
              <CardTitle className="text-3xl font-bold text-white">Envoyez-moi un message</CardTitle>
              <CardDescription className="text-base mt-3 text-slate-300">
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
                    <label htmlFor="name" className="text-sm font-medium text-slate-300">
                      Nom complet
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Jean Dupont"
                      className="bg-white/5 border-sky-200/20 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-300">
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
                      className="bg-white/5 border-sky-200/20 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all duration-300"
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
                  <label htmlFor="subject" className="text-sm font-medium text-slate-300">
                    Sujet
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="À propos de..."
                    className="bg-white/5 border-sky-200/20 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <label htmlFor="message" className="text-sm font-medium text-slate-300">
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
                    className="bg-white/5 border-sky-200/20 text-white placeholder:text-slate-500 resize-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all duration-300"
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
                    className="w-full bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-500 hover:to-cyan-400 text-white h-14 text-base font-medium shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-300 border-0"
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
