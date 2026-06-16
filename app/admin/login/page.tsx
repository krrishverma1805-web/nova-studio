'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { z } from 'zod';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginData = z.infer<typeof loginSchema>;

const inputSx = {
  width: '100%',
  padding: '12px 14px',
  backgroundColor: '#161616',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  borderRadius: '8px',
  color: '#FFFFFF',
  fontSize: '0.9rem',
  fontFamily: 'var(--font-inter), sans-serif',
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
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

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginData>({ username: '', password: '' });
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (field: keyof LoginData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    setLoginError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: { username?: string; password?: string } = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof LoginData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    setLoginError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        setLoginError('Invalid username or password');
      } else {
        window.location.href = '/admin';
      }
    } catch {
      setLoginError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const focusStyle = { borderColor: '#F97316', boxShadow: '0 0 0 3px rgba(249,115,22,0.08)' };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0A0A0A',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        backgroundAttachment: 'fixed',
        position: 'relative',
        overflow: 'hidden',
        px: 2,
      }}
    >
      {/* Background radial glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, rgba(10, 10, 10, 0) 70%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          zIndex: 1,
          backgroundColor: 'rgba(17,17,17,0.9)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          p: 4.5,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '12px',
              backgroundColor: 'rgba(249, 115, 22, 0.1)',
              color: '#F97316',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
              border: '1px solid rgba(249, 115, 22, 0.2)',
            }}
          >
            <LockOutlinedIcon />
          </Box>

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '1.25rem',
              color: '#FFFFFF',
              mb: 0.5,
              fontFamily: 'var(--font-inter), sans-serif',
            }}
          >
            Admin Portal
          </Typography>
          <Typography
            sx={{
              fontSize: '0.85rem',
              color: '#525252',
              fontFamily: 'var(--font-inter), sans-serif',
            }}
          >
            Sign in to manage Nova Studio
          </Typography>
        </Box>

        {loginError && (
          <Box
            sx={{
              width: '100%',
              mb: 3,
              p: 1.5,
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '8px',
            }}
          >
            <Typography
              sx={{
                color: '#EF4444',
                fontSize: '0.8rem',
                fontWeight: 500,
                textAlign: 'center',
                fontFamily: 'var(--font-inter), sans-serif',
              }}
            >
              {loginError}
            </Typography>
          </Box>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2.5 }}
        >
          {/* Username */}
          <Box>
            <label style={labelSx} htmlFor="login-username">Username</label>
            <input
              id="login-username"
              type="text"
              value={formData.username}
              onChange={handleChange('username')}
              onFocus={() => setFocused('username')}
              onBlur={() => setFocused(null)}
              autoComplete="username"
              style={{ ...inputSx, ...(focused === 'username' ? focusStyle : {}) }}
            />
            {errors.username && <p style={errSx}>{errors.username}</p>}
          </Box>

          {/* Password */}
          <Box>
            <label style={labelSx} htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              value={formData.password}
              onChange={handleChange('password')}
              onFocus={() => setFocused('password')}
              onBlur={() => setFocused(null)}
              autoComplete="current-password"
              style={{ ...inputSx, ...(focused === 'password' ? focusStyle : {}) }}
            />
            {errors.password && <p style={errSx}>{errors.password}</p>}
          </Box>

          {/* Submit */}
          <button
            id="login-submit"
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              height: 48,
              background: isLoading ? '#EA580C' : '#F97316',
              color: '#000000',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-inter), sans-serif',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              marginTop: 8,
              opacity: isLoading ? 0.8 : 1,
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => { if (!isLoading) (e.currentTarget as HTMLButtonElement).style.background = '#EA580C'; }}
            onMouseLeave={(e) => { if (!isLoading) (e.currentTarget as HTMLButtonElement).style.background = '#F97316'; }}
          >
            {isLoading ? <CircularProgress size={20} sx={{ color: '#000' }} /> : 'Sign In'}
          </button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
