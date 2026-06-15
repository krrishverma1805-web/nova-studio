export interface Project {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  createdAt: Date;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

export interface Stat {
  id: number;
  label: string;
  value: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface ContactLog {
  name: string;
  email: string;
  submittedAt: Date;
  ip: string;
  userAgent: string;
}

export interface AnalyticsEvent {
  eventType: string;
  page: string;
  element: string;
  timestamp: Date;
  sessionId: string;
}

export interface ApiError {
  error: string;
}
