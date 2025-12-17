'use client';

import React, { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
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

// Dynamically import 3D components
const Scene = dynamic(() => import('@/components/3d/Scene').then(mod => ({ default: mod.Scene })), { ssr: false });
const NetworkWeb = dynamic(() => import('@/components/3d/contact/NetworkWeb').then(mod => ({ default: mod.NetworkWeb })), { ssr: false });
const PaperPlane = dynamic(() => import('@/components/3d/contact/PaperPlane').then(mod => ({ default: mod.PaperPlane })), { ssr: false });

export function Contact() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isPlaneFlying, setIsPlaneFlying] = useState(false);

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

      // Trigger paper plane flying animation
      setIsPlaneFlying(true);
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
      ref={ref}
      className="relative py-20 px-6 bg-neutral-dark overflow-hidden min-h-screen"
    >
      {/* 3D Background with Network Web and Paper Plane */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Suspense fallback={<div className="w-full h-full bg-neutral-dark" />}>
          <Scene camera={{ position: [0, 0, 8], fov: 75 }} enablePostProcessing={false}>
            <NetworkWeb
              socialLinks={socialLinks}
              onNodeClick={(url) => window.open(url, '_blank')}
            />
            <PaperPlane
              isFlying={isPlaneFlying}
              onAnimationComplete={() => setIsPlaneFlying(false)}
            />
          </Scene>
        </Suspense>
      </div>

      {/* Content Overlay */}
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-black gradient-text">Contactez-moi</h2>
          <div className="w-32 h-1.5 bg-primary mx-auto rounded-full glow-primary" />
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Une question ? Un projet ? N&apos;hésitez pas à me contacter !
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
            {/* Information Card */}
            <div className="glass-strong p-8 rounded-3xl border-2 border-primary/30 hover:border-primary/50 smooth-transition group">
              <h3 className="text-2xl font-bold mb-6 text-white group-hover:gradient-text smooth-transition">
                Informations
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <motion.div
                    key={info.label}
                    whileHover={{ x: 5 }}
                    className="flex items-start space-x-4"
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
                  </motion.div>
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
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 rounded-xl glass border-2 border-primary/30 hover:border-primary hover:glow-primary smooth-transition group/icon"
                    aria-label={link.label}
                  >
                    <link.icon className="w-7 h-7 text-white group-hover/icon:text-primary smooth-transition" />
                  </motion.a>
                ))}
              </div>

              {/* 3D Network Web hint */}
              <p className="text-sm text-gray-400 mt-6 text-center">
                <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse mr-2" />
                Explorez le réseau 3D en arrière-plan
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
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
                    className="w-full px-4 py-3 rounded-xl glass border-2 border-primary/20 focus:border-primary focus:glow-primary outline-none smooth-transition text-white placeholder-gray-400"
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
                    className="w-full px-4 py-3 rounded-xl glass border-2 border-primary/20 focus:border-primary focus:glow-primary outline-none smooth-transition text-white placeholder-gray-400"
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
                    className="w-full px-4 py-3 rounded-xl glass border-2 border-primary/20 focus:border-primary focus:glow-primary outline-none smooth-transition resize-none text-white placeholder-gray-400"
                    placeholder="Votre message..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                  whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                  className="w-full px-6 py-4 rounded-xl font-bold text-lg border-2 border-primary bg-primary/20 hover:bg-primary/30 text-white hover:glow-primary smooth-transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center gap-3">
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Envoi en cours...
                    </span>
                  ) : (
                    'Envoyer le message'
                  )}
                </motion.button>

                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center space-x-3 glass border-2 border-primary/50 p-4 rounded-xl"
                  >
                    <HiCheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-primary">Message envoyé avec succès !</p>
                      <p className="text-xs text-gray-300 mt-1">L&apos;avion en papier a décollé 🚀</p>
                    </div>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center space-x-3 glass border-2 border-accent/50 p-4 rounded-xl"
                  >
                    <HiExclamation className="w-6 h-6 text-accent flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-accent">Erreur lors de l&apos;envoi</p>
                      <p className="text-xs text-gray-300 mt-1">
                        Vérifiez que EmailJS est bien configuré dans .env.local
                      </p>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
