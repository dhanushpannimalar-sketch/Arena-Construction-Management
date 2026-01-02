export interface User {
  id: string;
  username: string;
  name: string;
  role: 'owner' | 'manager' | 'supervisor';
}

export interface Project {
  id: string;
  name: string;
  turfType: 'Cricket' | 'Football' | 'Multi-purpose' | 'Tennis';
  location: string;
  startDate: string;
  expectedCompletion: string;
  actualCompletion?: string;
  status: 'Planning' | 'In Progress' | 'Completed' | 'On Hold';
  description?: string;
}

export interface Material {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  minQuantity: number;
  category: 'Turf' | 'Base' | 'Accessories' | 'Equipment';
}

export interface MaterialUsage {
  id: string;
  projectId: string;
  materialId: string;
  quantity: number;
  date: string;
  notes?: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email?: string;
  materials: string[];
  rating: number;
  notes?: string;
}

export interface Worker {
  id: string;
  name: string;
  role: string;
  contact: string;
  status: 'Active' | 'Inactive';
  joinDate: string;
}

export interface WorkerAttendance {
  id: string;
  workerId: string;
  date: string;
  present: boolean;
  projectId?: string;
}

export interface ScheduleEntry {
  id: string;
  date: string;
  projectId: string;
  workDescription: string;
  assignedWorkers: string[];
  requiredMaterials: { materialId: string; quantity: number }[];
  status: 'Planned' | 'In Progress' | 'Completed' | 'Cancelled';
}

export interface DailyReport {
  id: string;
  date: string;
  projectId: string;
  workPerformed: string;
  workersPresent: string[];
  materialsUsed: { materialId: string; quantity: number }[];
  issues?: string;
  remarks?: string;
}

export interface WorkDoneReport {
  id: string;
  projectId: string;
  duration: number;
  totalWorkers: number;
  totalMaterialCost: number;
  remarks: string;
  generatedDate: string;
}

export type ViewType =
  | 'dashboard'
  | 'projects'
  | 'project-detail'
  | 'materials'
  | 'suppliers'
  | 'workers'
  | 'schedule'
  | 'daily-reports'
  | 'work-done-reports'
  | 'reports'
  | 'settings';
