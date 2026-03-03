'use client';

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
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
    { icon: FaGithub, href: siteConfig.links.github, label: 'GitHub', url: siteConfig.links.github },
    { icon: FaLinkedin, href: siteConfig.links.linkedin, label: 'LinkedIn', url: siteConfig.links.linkedin },
    { icon: FaTwitter, href: siteConfig.links.twitter, label: 'Twitter', url: siteConfig.links.twitter },
  ];

  return (
    <section
      id="contact"
      className="relative py-20 px-6 bg-neutral-dark overflow-hidden min-h-screen"
    >
      {/* Content Overlay */}
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-5xl md:text-6xl font-black gradient-text">Contactez-moi</h2>
          <div className="w-32 h-1.5 bg-primary mx-auto rounded-full glow-primary" />
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Une question ? Un projet ? N&apos;hésitez pas à me contacter !
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {/* Information Card */}
            <div className="glass-strong p-8 rounded-3xl border-2 border-primary/30 hover:border-primary/50 smooth-transition group">
              <h3 className="text-2xl font-bold mb-6 text-white group-hover:gradient-text smooth-transition">
                Informations
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <div
                    key={info.label}
                    className="flex items-start space-x-4 transition-transform hover:translate-x-1"
                  >
                    <div className="w-12 h-12 rounded-xl glass border border-primary/30 flex items-center justify-center flex-shrink-0 group-hover:border-primary smooth-transition">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-primary hover:text-secondary smooth-transition hover:underline"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-300">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links Card */}
            <div className="glass-strong p-8 rounded-3xl border-2 border-secondary/30 hover:border-secondary/50 smooth-transition group">
              <h3 className="text-xl font-bold mb-6 text-white group-hover:gradient-text smooth-transition">
                Suivez-moi
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl glass border-2 border-primary/30 hover:border-primary hover:glow-primary hover:scale-110 active:scale-95 hover:-translate-y-1 smooth-transition group/icon inline-block transition-transform"
                    aria-label={link.label}
                  >
                    <link.icon className="w-7 h-7 text-white group-hover/icon:text-primary smooth-transition" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="glass-strong p-8 rounded-3xl border-2 border-primary/30 hover:border-primary/50 smooth-transition">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-bold mb-2 text-gray-200"
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
                    className="w-full px-4 py-3 rounded-xl glass border-2 border-primary/20 focus:border-primary focus:glow-primary outline-none smooth-transition text-white placeholder-gray-400 border-box"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold mb-2 text-gray-200"
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
                    className="w-full px-4 py-3 rounded-xl glass border-2 border-primary/20 focus:border-primary focus:glow-primary outline-none smooth-transition text-white placeholder-gray-400 border-box"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-bold mb-2 text-gray-200"
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
                    className="w-full px-4 py-3 rounded-xl glass border-2 border-primary/20 focus:border-primary focus:glow-primary outline-none smooth-transition resize-none text-white placeholder-gray-400 border-box"
                    placeholder="Votre message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full px-6 py-4 rounded-xl font-bold text-lg border-2 border-primary bg-primary/20 hover:bg-primary/30 text-white hover:glow-primary hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center gap-3">
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Envoi en cours...
                    </span>
                  ) : (
                    'Envoyer le message'
                  )}
                </button>

                {status === 'success' && (
                  <div className="flex items-center space-x-3 glass border-2 border-primary/50 p-4 rounded-xl animate-fade-in">
                    <HiCheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-primary">Message envoyé avec succès !</p>
                      <p className="text-xs text-gray-300 mt-1">L&apos;avion en papier a décollé 🚀</p>
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <div className="flex items-center space-x-3 glass border-2 border-accent/50 p-4 rounded-xl animate-fade-in">
                    <HiExclamation className="w-6 h-6 text-accent flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-accent">Erreur lors de l&apos;envoi</p>
                      <p className="text-xs text-gray-300 mt-1">
                        Vérifiez que EmailJS est bien configuré dans .env.local
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
