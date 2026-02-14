
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

export interface Quotation {
  id: string;
  orgId: string;
  quotationNumber: string;
  date: string;
  clientName: string;
  description: string;
  totalAmount: number;
  validityDate: string;
  companyName: string;
  contactInfo: string;
  terms: string;
}

export interface Invoice {
  id: string;
  orgId: string;
  invoiceNumber: string;
  invoiceDate: string;
  clientName: string;
  clientContact: string;
  companyName: string;
  companyContact: string;
  description: string;
  totalAmount: number;
  taxDetails: string;
  dueDate: string;
  paymentStatus: 'Unpaid' | 'Paid' | 'Partial';
}

export interface BusinessProposal {
  id: string;
  orgId: string;
  proposalNumber: string;
  clientName: string;
  introduction: string;
  problemStatement: string;
  proposedSolution: string;
  scopeOfWork: string;
  imageUrls: string[];
  pricing: number;
  timeline: string;
  createdAt: string;
}
