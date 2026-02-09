
export enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
  CLIENT = 'CLIENT'
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar: string;
  department: string;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  date: string;
  checkIn: string;
  checkOut: string | null;
  status: 'Present' | 'Late' | 'Absent' | 'On Leave';
  totalHours: number;
}

export interface Stats {
  totalEmployees: number;
  presentToday: number;
  lateToday: number;
  onLeave: number;
}

// Client Dashboard Interfaces
export interface ClientProfile {
  id: string;
  companyName: string;
  taxId: string;
  address: string;
  email: string;
  phone: string;
  industry: string;
}

export interface ClientContact {
  id: string;
  orgId: string;
  name: string;
  role: string;
  email: string;
  isPrimary: boolean;
}

export interface ActivityLog {
  id: string;
  orgId: string;
  event: string;
  date: string;
  category: 'Billing' | 'Reporting' | 'Settings' | 'Profile' | 'Manual';
}

export interface SupportTicket {
  id: string;
  orgId: string;
  subject: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'Pending' | 'Closed';
  createdAt: string;
}

export interface PaymentMethod {
  id: string;
  orgId: string;
  type: string;
  lastFour: string;
  expiry: string;
  isDefault: boolean;
}
