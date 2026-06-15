'use client';

import { useState } from 'react';
import { Box, Typography, CircularProgress, MenuItem } from '@mui/material';
import { z } from 'zod';

const projectSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  category: z.string().min(2, 'Please select a category'),
  imageUrl: z.string().url('Please enter a valid image URL (e.g. https://...)'),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => Promise<void>;
  isLoading: boolean;
}

const CATEGORIES = ['Web Design', 'Branding', 'Development'];

const inputSx = {
  width: '100%',
  padding: '11px 12px',
  background: '#0A0A0A',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '8px',
  color: '#FFFFFF',
  fontSize: '0.875rem',
  fontFamily: 'var(--font-inter), sans-serif',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  boxSizing: 'border-box' as const,
};

const labelSx = {
  fontSize: '0.78rem',
  color: '#A3A3A3',
  fontWeight: 500,
  marginBottom: '6px',
  display: 'block',
  fontFamily: 'var(--font-inter), sans-serif',
};

const errSx = {
  fontSize: '0.75rem',
  color: '#EF4444',
  marginTop: '4px',
  fontFamily: 'var(--font-inter), sans-serif',
};

const ProjectForm = ({ onSubmit, isLoading }: ProjectFormProps) => {
  const [formData, setFormData] = useState<ProjectFormData>({ title: '', category: '', imageUrl: '' });
  const [errors, setErrors] = useState<{ [k in keyof ProjectFormData]?: string }>({});
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (field: keyof ProjectFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = projectSchema.safeParse(formData);
    if (!result.success) {
      const fe: { [k in keyof ProjectFormData]?: string } = {};
      result.error.issues.forEach((err) => {
        const f = err.path[0] as keyof ProjectFormData;
        fe[f] = err.message;
      });
      setErrors(fe);
      return;
    }
    setErrors({});
    try {
      await onSubmit(formData);
      setFormData({ title: '', category: '', imageUrl: '' });
    } catch (err) {
      console.error('Submit failed:', err);
    }
  };

  const focusStyle = { borderColor: '#F97316', boxShadow: '0 0 0 3px rgba(249,115,22,0.08)' };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: 'rgba(17,17,17,0.9)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '14px',
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: '1rem',
          color: '#FFFFFF',
          mb: 2.5,
          fontFamily: 'var(--font-inter), sans-serif',
        }}
      >
        Add New Project
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Title */}
        <Box>
          <label style={labelSx} htmlFor="project-title">Project Title</label>
          <input
            id="project-title"
            type="text"
            value={formData.title}
            onChange={handleChange('title')}
            onFocus={() => setFocused('title')}
            onBlur={() => setFocused(null)}
            placeholder="e.g. Brand Refresh for Acme"
            style={{ ...inputSx, ...(focused === 'title' ? focusStyle : {}) }}
          />
          {errors.title && <p style={errSx}>{errors.title}</p>}
        </Box>

        {/* Category */}
        <Box>
          <label style={labelSx} htmlFor="project-category">Category</label>
          <select
            id="project-category"
            value={formData.category}
            onChange={handleChange('category')}
            onFocus={() => setFocused('category')}
            onBlur={() => setFocused(null)}
            style={{
              ...inputSx,
              ...(focused === 'category' ? focusStyle : {}),
              cursor: 'pointer',
            }}
          >
            <option value="" style={{ background: '#111' }}>Select a category...</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c} style={{ background: '#111' }}>{c}</option>
            ))}
          </select>
          {errors.category && <p style={errSx}>{errors.category}</p>}
        </Box>

        {/* Image URL */}
        <Box>
          <label style={labelSx} htmlFor="project-image-url">Image URL</label>
          <input
            id="project-image-url"
            type="url"
            value={formData.imageUrl}
            onChange={handleChange('imageUrl')}
            onFocus={() => setFocused('imageUrl')}
            onBlur={() => setFocused(null)}
            placeholder="https://..."
            style={{ ...inputSx, ...(focused === 'imageUrl' ? focusStyle : {}) }}
          />
          {errors.imageUrl && <p style={errSx}>{errors.imageUrl}</p>}
          {!errors.imageUrl && (
            <p style={{ ...errSx, color: '#525252', marginTop: '4px' }}>Must be a valid absolute HTTPS URL</p>
          )}
        </Box>

        {/* Submit */}
        <button
          id="project-submit"
          type="submit"
          disabled={isLoading}
          style={{
            width: '100%',
            height: 44,
            background: isLoading ? '#EA580C' : '#F97316',
            color: '#000000',
            border: 'none',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontFamily: 'var(--font-inter), sans-serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginTop: 4,
            opacity: isLoading ? 0.8 : 1,
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => { if (!isLoading) (e.currentTarget as HTMLButtonElement).style.background = '#EA580C'; }}
          onMouseLeave={(e) => { if (!isLoading) (e.currentTarget as HTMLButtonElement).style.background = '#F97316'; }}
        >
          {isLoading ? <CircularProgress size={18} sx={{ color: '#000' }} /> : 'Create Project'}
        </button>
      </Box>
    </Box>
  );
};

export default ProjectForm;
