'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import { z } from 'zod';
import styles from './ContactForm.module.css';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ open: boolean; severity: 'success' | 'error'; message: string }>({
    open: false,
    severity: 'success',
    message: '',
  });

  const handleChange = (field: keyof ContactFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof FieldErrors;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setToast({ open: true, severity: 'success', message: "Message sent successfully! We'll get back to you soon." });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setToast({ open: true, severity: 'error', message: data.error || 'Something went wrong. Please try again.' });
      }
    } catch {
      setToast({ open: true, severity: 'error', message: 'Network error. Please check your connection.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="section" id="contact" className={styles.contactSection}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#F97316',
              display: 'block',
              marginBottom: '0.75rem',
              fontFamily: 'var(--font-inter), sans-serif',
            }}
          >
            Get in Touch
          </span>
          <Typography variant="h2" sx={{ color: '#FFFFFF', fontSize: { xs: '2rem', md: '2.75rem' } }}>
            Start Your Project
          </Typography>
        </Box>

        <div className={styles.formWrapper}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
          >
            <TextField
              id="contact-name"
              label="Name"
              value={formData.name}
              onChange={handleChange('name')}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
              required
            />
            <TextField
              id="contact-email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              required
            />
            <TextField
              id="contact-message"
              label="Message"
              value={formData.message}
              onChange={handleChange('message')}
              error={!!errors.message}
              helperText={errors.message}
              fullWidth
              required
              multiline
              rows={5}
            />

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <motion.button
                id="contact-submit"
                type="submit"
                disabled={isSubmitting}
                whileHover={{ backgroundColor: isSubmitting ? '#F97316' : '#EA580C' }}
                style={{
                  width: '100%',
                  height: 52,
                  background: '#F97316',
                  color: '#000000',
                  border: 'none',
                  borderRadius: 10,
                  fontSize: '1rem',
                  fontWeight: 700,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  fontFamily: 'var(--font-inter), sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  opacity: isSubmitting ? 0.7 : 1,
                  transition: 'opacity 0.2s ease',
                }}
              >
                {isSubmitting ? (
                  <>
                    <CircularProgress size={18} sx={{ color: '#000' }} />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </motion.div>
          </Box>
        </div>
      </Container>

      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
          severity={toast.severity}
          variant="filled"
          sx={{
            width: '100%',
            backgroundColor: toast.severity === 'success' ? '#22C55E' : '#EF4444',
            color: '#FFFFFF',
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactForm;
