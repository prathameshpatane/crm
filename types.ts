
export enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE'
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
