'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useInView } from '@/hooks/useInView';
import { ContactForm } from '@/types';
import { siteConfig } from '@/config/site';
import {
  HiMail,
  HiLocationMarker,
  HiCheckCircle,
  HiExclamation,
} from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export function Contact() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Vérifier que les clés EmailJS sont configurées
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey ||
        serviceId.includes('ton_') || templateId.includes('ton_') || publicKey.includes('ta_')) {
      console.error('EmailJS not configured. Please add your keys in .env.local');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }

    try {
      // Préparer les données pour le template EmailJS
      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        time: new Date().toLocaleString('fr-FR', {
          dateStyle: 'short',
          timeStyle: 'short'
        }),
        // Variables optionnelles pour plus de flexibilité
        from_name: formData.name,
        from_email: formData.email,
        to_name: siteConfig.name,
      };

      // Envoyer l'email avec EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Reset status après 5 secondes
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: HiMail,
      label: 'Email',
      value: siteConfig.links.email,
      href: `mailto:${siteConfig.links.email}`,
    },
    {
      icon: HiLocationMarker,
      label: 'Location',
      value: 'Dakar, Sénégal',
      href: null,
    },
  ];

  const socialLinks = [
    { icon: FaGithub, href: siteConfig.links.github, label: 'GitHub' },
    { icon: FaLinkedin, href: siteConfig.links.linkedin, label: 'LinkedIn' },
    { icon: FaTwitter, href: siteConfig.links.twitter, label: 'Twitter' },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 px-6 bg-light-surface/50 dark:bg-dark-surface/50"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold">Contactez-moi</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Une question ? Un projet ? N'hésitez pas à me contacter !
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <Card>
              <h3 className="text-2xl font-bold mb-6">Informations</h3>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700 dark:text-gray-300">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-primary hover:underline"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Social Links */}
            <Card>
              <h3 className="text-xl font-bold mb-4">Suivez-moi</h3>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-primary transition-all hover:scale-110 group"
                    aria-label={link.label}
                  >
                    <link.icon className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    placeholder="Votre message..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={status === 'loading'}
                >
                  {status === 'loading'
                    ? 'Envoi en cours...'
                    : 'Envoyer le message'}
                </Button>

                {status === 'success' && (
                  <div className="flex items-center space-x-2 text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20 p-4 rounded-lg">
                    <HiCheckCircle className="w-5 h-5" />
                    <p className="text-sm">Message envoyé avec succès !</p>
                  </div>
                )}

                {status === 'error' && (
                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20 p-4 rounded-lg">
                    <HiExclamation className="w-5 h-5" />
                    <p className="text-sm">
                      Erreur lors de l'envoi. Vérifiez que EmailJS est bien configuré dans .env.local
                    </p>
                  </div>
                )}
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
