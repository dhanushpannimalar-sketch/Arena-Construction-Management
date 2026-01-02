import {
  Project,
  Material,
  Supplier,
  Worker,
  WorkerAttendance,
  ScheduleEntry,
  DailyReport,
  MaterialUsage,
  WorkDoneReport,
} from '../types';

export const mockProjects: Project[] = [
  {
    id: 'p1',
    name: 'Arena Turf – Chennai',
    turfType: 'Cricket',
    location: 'Chennai, Tamil Nadu',
    startDate: '2026-01-01',
    expectedCompletion: '2026-01-25',
    status: 'In Progress',
    description: 'Professional cricket turf installation with drainage system',
  },
  {
    id: 'p2',
    name: 'Football Arena – Bangalore',
    turfType: 'Football',
    location: 'Bangalore, Karnataka',
    startDate: '2026-01-10',
    expectedCompletion: '2026-02-05',
    status: 'In Progress',
    description: 'FIFA standard football turf with shock pad',
  },
  {
    id: 'p3',
    name: 'Multi-Sport Complex – Mumbai',
    turfType: 'Multi-purpose',
    location: 'Mumbai, Maharashtra',
    startDate: '2025-12-15',
    expectedCompletion: '2026-01-10',
    actualCompletion: '2026-01-08',
    status: 'Completed',
    description: 'Multi-purpose turf for cricket and football',
  },
];

export const mockMaterials: Material[] = [
  {
    id: 'm1',
    name: 'Artificial Grass Roll',
    unit: 'sq.ft',
    quantity: 5000,
    minQuantity: 1000,
    category: 'Turf',
  },
  {
    id: 'm2',
    name: 'Sand (Fine)',
    unit: 'tons',
    quantity: 25,
    minQuantity: 10,
    category: 'Base',
  },
  {
    id: 'm3',
    name: 'Rubber Granules',
    unit: 'bags',
    quantity: 45,
    minQuantity: 20,
    category: 'Turf',
  },
  {
    id: 'm4',
    name: 'Shock Pad',
    unit: 'sq.ft',
    quantity: 2500,
    minQuantity: 500,
    category: 'Base',
  },
  {
    id: 'm5',
    name: 'Adhesive Glue',
    unit: 'liters',
    quantity: 120,
    minQuantity: 50,
    category: 'Accessories',
  },
  {
    id: 'm6',
    name: 'Joining Tape',
    unit: 'meters',
    quantity: 350,
    minQuantity: 100,
    category: 'Accessories',
  },
  {
    id: 'm7',
    name: 'Drainage Pipes',
    unit: 'meters',
    quantity: 180,
    minQuantity: 50,
    category: 'Equipment',
  },
];

export const mockSuppliers: Supplier[] = [
  {
    id: 's1',
    name: 'ABC Turf Supplies',
    contact: '9876543210',
    email: 'contact@abcturf.com',
    materials: ['Artificial Grass Roll', 'Shock Pad', 'Joining Tape'],
    rating: 4.5,
    notes: 'Reliable supplier, on-time delivery',
  },
  {
    id: 's2',
    name: 'Prime Sand & Aggregates',
    contact: '9876543211',
    email: 'sales@primesand.com',
    materials: ['Sand (Fine)', 'Rubber Granules'],
    rating: 4.2,
    notes: 'Good quality materials',
  },
  {
    id: 's3',
    name: 'SportTech Solutions',
    contact: '9876543212',
    email: 'info@sporttech.com',
    materials: ['Adhesive Glue', 'Drainage Pipes', 'Joining Tape'],
    rating: 4.8,
    notes: 'Premium quality products',
  },
];

export const mockWorkers: Worker[] = [
  {
    id: 'w1',
    name: 'Ramesh Kumar',
    role: 'Installer',
    contact: '9123456780',
    status: 'Active',
    joinDate: '2024-06-15',
  },
  {
    id: 'w2',
    name: 'Vijay Singh',
    role: 'Supervisor',
    contact: '9123456781',
    status: 'Active',
    joinDate: '2024-03-10',
  },
  {
    id: 'w3',
    name: 'Suresh Babu',
    role: 'Installer',
    contact: '9123456782',
    status: 'Active',
    joinDate: '2024-08-20',
  },
  {
    id: 'w4',
    name: 'Prakash Reddy',
    role: 'Helper',
    contact: '9123456783',
    status: 'Active',
    joinDate: '2025-01-05',
  },
  {
    id: 'w5',
    name: 'Manoj Sharma',
    role: 'Installer',
    contact: '9123456784',
    status: 'Active',
    joinDate: '2024-07-12',
  },
  {
    id: 'w6',
    name: 'Anil Verma',
    role: 'Helper',
    contact: '9123456785',
    status: 'Active',
    joinDate: '2024-09-18',
  },
  {
    id: 'w7',
    name: 'Rajesh Nair',
    role: 'Equipment Operator',
    contact: '9123456786',
    status: 'Active',
    joinDate: '2024-05-22',
  },
];

export const mockAttendance: WorkerAttendance[] = [
  {
    id: 'a1',
    workerId: 'w1',
    date: '2026-01-02',
    present: true,
    projectId: 'p1',
  },
  {
    id: 'a2',
    workerId: 'w2',
    date: '2026-01-02',
    present: true,
    projectId: 'p1',
  },
  {
    id: 'a3',
    workerId: 'w3',
    date: '2026-01-02',
    present: true,
    projectId: 'p2',
  },
  {
    id: 'a4',
    workerId: 'w4',
    date: '2026-01-02',
    present: false,
  },
  {
    id: 'a5',
    workerId: 'w5',
    date: '2026-01-02',
    present: true,
    projectId: 'p1',
  },
  {
    id: 'a6',
    workerId: 'w6',
    date: '2026-01-02',
    present: true,
    projectId: 'p2',
  },
  {
    id: 'a7',
    workerId: 'w7',
    date: '2026-01-02',
    present: true,
    projectId: 'p1',
  },
];

export const mockSchedule: ScheduleEntry[] = [
  {
    id: 'sch1',
    date: '2026-01-02',
    projectId: 'p1',
    workDescription: 'Base preparation and leveling',
    assignedWorkers: ['w1', 'w2', 'w5'],
    requiredMaterials: [
      { materialId: 'm2', quantity: 5 },
      { materialId: 'm7', quantity: 20 },
    ],
    status: 'In Progress',
  },
  {
    id: 'sch2',
    date: '2026-01-02',
    projectId: 'p2',
    workDescription: 'Shock pad installation',
    assignedWorkers: ['w3', 'w6'],
    requiredMaterials: [{ materialId: 'm4', quantity: 500 }],
    status: 'Planned',
  },
  {
    id: 'sch3',
    date: '2026-01-03',
    projectId: 'p1',
    workDescription: 'Turf roll installation - Phase 1',
    assignedWorkers: ['w1', 'w2', 'w5', 'w7'],
    requiredMaterials: [
      { materialId: 'm1', quantity: 1000 },
      { materialId: 'm5', quantity: 10 },
      { materialId: 'm6', quantity: 50 },
    ],
    status: 'Planned',
  },
];

export const mockDailyReports: DailyReport[] = [
  {
    id: 'dr1',
    date: '2026-01-01',
    projectId: 'p1',
    workPerformed: 'Site clearance and marking completed. Foundation work started.',
    workersPresent: ['w1', 'w2', 'w5', 'w7'],
    materialsUsed: [{ materialId: 'm2', quantity: 3 }],
    remarks: 'Weather conditions favorable. Work progressing as planned.',
  },
  {
    id: 'dr2',
    date: '2026-01-01',
    projectId: 'p2',
    workPerformed: 'Initial ground leveling completed',
    workersPresent: ['w3', 'w6'],
    materialsUsed: [{ materialId: 'm2', quantity: 2 }],
    remarks: 'Minor delay due to equipment issue, resolved by afternoon',
  },
];

export const mockMaterialUsage: MaterialUsage[] = [
  {
    id: 'mu1',
    projectId: 'p1',
    materialId: 'm2',
    quantity: 3,
    date: '2026-01-01',
    notes: 'Foundation work',
  },
  {
    id: 'mu2',
    projectId: 'p2',
    materialId: 'm2',
    quantity: 2,
    date: '2026-01-01',
    notes: 'Ground leveling',
  },
  {
    id: 'mu3',
    projectId: 'p3',
    materialId: 'm1',
    quantity: 2500,
    date: '2025-12-28',
    notes: 'Final turf installation',
  },
];

export const mockWorkDoneReports: WorkDoneReport[] = [
  {
    id: 'wdr1',
    projectId: 'p3',
    duration: 24,
    totalWorkers: 8,
    totalMaterialCost: 450000,
    remarks:
      'Project completed successfully. Client satisfied with quality. All safety protocols followed.',
    generatedDate: '2026-01-08',
  },
];
