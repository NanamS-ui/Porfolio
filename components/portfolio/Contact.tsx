'use client';

import { useEffect, useRef, useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useTheme } from 'next-themes';
import { supabase, type ContactMessage } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/animations/MotionComponents';
import { useLanguage } from '@/components/language-provider';

const hcaptchaSiteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;

export default function Contact() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  // Honeypot: invisible to real visitors, but simple bots fill in every field.
  // A non-empty value here means the submission is spam, so we drop it silently.
  const [honeypot, setHoneypot] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);

  useEffect(() => setMounted(true), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot.trim()) {
      return;
    }

    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (!name || !email || !subject || !message) {
      toast({
        title: t.contact.toastMissingTitle,
        description: t.contact.toastMissingDesc,
        variant: "destructive",
      });
      return;
    }

    if (hcaptchaSiteKey && !captchaToken) {
      toast({
        title: t.contact.toastCaptchaTitle,
        description: t.contact.toastCaptchaDesc,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      // Étape 1 (critique) : enregistrer le message.
      // On passe par l'Edge Function submit-contact, qui vérifie le token hCaptcha
      // côté serveur avant d'insérer (RLS interdit désormais l'insertion directe).
      // Si la fonction n'est pas encore déployée (404), on retombe sur l'insertion
      // directe pour ne jamais perdre un message pendant la mise en place du captcha -
      // ce filet de secours cesse de fonctionner de lui-même dès que la policy RLS
      // d'insertion anonyme est retirée (voir la migration correspondante).
      let handledByFunction = false;

      if (supabaseUrl && supabaseAnonKey) {
        try {
          const response = await fetch(`${supabaseUrl}/functions/v1/submit-contact`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${supabaseAnonKey}`,
            },
            body: JSON.stringify({ name, email, subject, message, captchaToken }),
          });

          if (response.status !== 404) {
            handledByFunction = true;
            const result = await response.json().catch(() => ({}));
            if (!response.ok) {
              throw new Error(result.error || 'Vérification anti-robot échouée.');
            }
          }
        } catch (fnError) {
          if (handledByFunction) throw fnError;
          console.warn('submit-contact indisponible, insertion directe en secours.', fnError);
        }
      }

      if (!handledByFunction) {
        const { error: dbError } = await supabase
          .from('contact_messages')
          .insert([{ name, email, subject, message }]);

        if (dbError) throw dbError;
      }

      toast({
        title: t.contact.toastSuccessTitle,
        description: t.contact.toastSuccessDesc,
      });
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Étape 2 (best-effort) : notifier par email via la fonction Supabase.
      // Un échec ici ne doit pas faire croire au visiteur que son message n'est pas arrivé.
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
        title: t.contact.toastErrorTitle,
        description: t.contact.toastErrorDesc,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setCaptchaToken(null);
      captchaRef.current?.resetCaptcha();
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
          <div className="eyebrow-badge mx-auto w-fit">{t.contact.eyebrow}</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t.contact.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t.contact.subtitle}
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
              <CardTitle className="text-3xl font-bold text-slate-900 dark:text-white">{t.contact.cardTitle}</CardTitle>
              <CardDescription className="text-base mt-3 text-slate-600 dark:text-slate-400">
                {t.contact.cardDescription}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field: hidden from sighted/keyboard users, but visible to simple bots that fill in every input. */}
                <div className="absolute left-0 top-0 h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t.contact.nameLabel}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={t.contact.namePlaceholder}
                      className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t.contact.emailLabel}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={t.contact.emailPlaceholder}
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
                    {t.contact.subjectLabel}
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder={t.contact.subjectPlaceholder}
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
                    {t.contact.messageLabel}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder={t.contact.messagePlaceholder}
                    rows={6}
                    className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:placeholder:text-slate-500 resize-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-300"
                  />
                </motion.div>

                {hcaptchaSiteKey && mounted && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.45 }}
                    className="flex justify-center"
                  >
                    <HCaptcha
                      ref={captchaRef}
                      sitekey={hcaptchaSiteKey}
                      onVerify={setCaptchaToken}
                      onExpire={() => setCaptchaToken(null)}
                      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
                    />
                  </motion.div>
                )}

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
                        {t.contact.submitting}
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        {t.contact.submit}
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
