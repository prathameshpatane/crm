
import { User, UserRole, AttendanceRecord } from './types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@attendx.com',
    role: UserRole.ADMIN,
    avatar: 'https://i.pravatar.cc/150?u=admin',
    department: 'Human Resources'
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@attendx.com',
    role: UserRole.EMPLOYEE,
    avatar: 'https://i.pravatar.cc/150?u=john',
    department: 'Engineering'
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'jane@attendx.com',
    role: UserRole.EMPLOYEE,
    avatar: 'https://i.pravatar.cc/150?u=jane',
    department: 'Marketing'
  },
  // Adding more dummy users to reach ~100
  ...Array.from({ length: 97 }, (_, i) => ({
    id: (i + 4).toString(),
    name: `Employee ${i + 4}`,
    email: `employee${i + 4}@attendx.com`,
    role: UserRole.EMPLOYEE,
    avatar: `https://i.pravatar.cc/150?u=emp${i + 4}`,
    department: ['Engineering', 'Marketing', 'Sales', 'Finance', 'Operations'][i % 5]
  }))
];

export const mockAttendance: AttendanceRecord[] = [
  {
    id: '101',
    userId: '2',
    date: '2023-10-25',
    checkIn: '08:55',
    checkOut: '17:05',
    status: 'Present',
    totalHours: 8.1
  },
  {
    id: '102',
    userId: '2',
    date: '2023-10-24',
    checkIn: '09:15',
    checkOut: '18:15',
    status: 'Late',
    totalHours: 9.0
  },
  {
    id: '103',
    userId: '3',
    date: '2023-10-25',
    checkIn: '08:30',
    checkOut: '16:30',
    status: 'Present',
    totalHours: 8.0
  }
];
