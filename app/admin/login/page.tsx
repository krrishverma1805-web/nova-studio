'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { z } from 'zod';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginData>({ username: '', password: '' });
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: keyof LoginData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        router.push('/admin');
        router.refresh();
      }
    } catch {
      setLoginError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0F172A',
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
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, rgba(15, 23, 42, 0) 70%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="xs" sx={{ zIndex: 1 }}>
        <Card
          sx={{
            backgroundColor: '#1E293B',
            border: '1px solid rgba(255, 255, 255, 0.10)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
        >
          <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                color: 'primary.light',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
              }}
            >
              <LockOutlinedIcon />
            </Box>

            <Typography variant="h5" align="center" sx={{ fontWeight: 700, mb: 1 }}>
              Admin Portal
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
              Sign in to manage Nova Studio
            </Typography>

            {loginError && (
              <Alert severity="error" variant="filled" sx={{ width: '100%', mb: 3 }}>
                {loginError}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}
            >
              <TextField
                id="login-username"
                label="Username"
                value={formData.username}
                onChange={handleChange('username')}
                error={!!errors.username}
                helperText={errors.username}
                fullWidth
                required
                autoComplete="username"
              />

              <TextField
                id="login-password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange('password')}
                error={!!errors.password}
                helperText={errors.password}
                fullWidth
                required
                autoComplete="current-password"
              />

              <Button
                id="login-submit"
                type="submit"
                variant="contained"
                size="large"
                disabled={isLoading}
                fullWidth
                sx={{ py: 1.5, mt: 1, fontWeight: 700 }}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginPage;
