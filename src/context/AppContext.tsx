import { createContext, useContext, useState, ReactNode } from 'react';
import {
  User,
  Project,
  Material,
  Supplier,
  Worker,
  WorkerAttendance,
  ScheduleEntry,
  DailyReport,
  MaterialUsage,
  WorkDoneReport,
  ViewType,
} from '../types';
import {
  mockProjects,
  mockMaterials,
  mockSuppliers,
  mockWorkers,
  mockAttendance,
  mockSchedule,
  mockDailyReports,
  mockMaterialUsage,
  mockWorkDoneReports,
} from '../data/mockData';

interface AppContextType {
  user: User | null;
  currentView: ViewType;
  selectedProjectId: string | null;
  projects: Project[];
  materials: Material[];
  suppliers: Supplier[];
  workers: Worker[];
  attendance: WorkerAttendance[];
  schedule: ScheduleEntry[];
  dailyReports: DailyReport[];
  materialUsage: MaterialUsage[];
  workDoneReports: WorkDoneReport[];
  login: (username: string, password: string) => boolean;
  logout: () => void;
  setCurrentView: (view: ViewType) => void;
  setSelectedProjectId: (id: string | null) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  addMaterial: (material: Omit<Material, 'id'>) => void;
  updateMaterial: (id: string, material: Partial<Material>) => void;
  addSupplier: (supplier: Omit<Supplier, 'id'>) => void;
  updateSupplier: (id: string, supplier: Partial<Supplier>) => void;
  addWorker: (worker: Omit<Worker, 'id'>) => void;
  updateWorker: (id: string, worker: Partial<Worker>) => void;
  addAttendance: (attendance: Omit<WorkerAttendance, 'id'>) => void;
  addScheduleEntry: (entry: Omit<ScheduleEntry, 'id'>) => void;
  updateScheduleEntry: (id: string, entry: Partial<ScheduleEntry>) => void;
  addDailyReport: (report: Omit<DailyReport, 'id'>) => void;
  updateDailyReport: (id: string, report: Partial<DailyReport>) => void;
  addMaterialUsage: (usage: Omit<MaterialUsage, 'id'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [materials, setMaterials] = useState<Material[]>(mockMaterials);
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [workers, setWorkers] = useState<Worker[]>(mockWorkers);
  const [attendance, setAttendance] = useState<WorkerAttendance[]>(mockAttendance);
  const [schedule, setSchedule] = useState<ScheduleEntry[]>(mockSchedule);
  const [dailyReports, setDailyReports] = useState<DailyReport[]>(mockDailyReports);
  const [materialUsage, setMaterialUsage] = useState<MaterialUsage[]>(mockMaterialUsage);
  const [workDoneReports, setWorkDoneReports] = useState<WorkDoneReport[]>(
    mockWorkDoneReports
  );

  const login = (username: string, password: string): boolean => {
    if (username && password) {
      setUser({
        id: 'u1',
        username,
        name: username === 'admin' ? 'Admin User' : 'Demo User',
        role: 'manager',
      });
      setCurrentView('dashboard');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setCurrentView('dashboard');
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: `p${Date.now()}` };
    setProjects([...projects, newProject]);
  };

  const updateProject = (id: string, project: Partial<Project>) => {
    setProjects(projects.map((p) => (p.id === id ? { ...p, ...project } : p)));
  };

  const addMaterial = (material: Omit<Material, 'id'>) => {
    const newMaterial = { ...material, id: `m${Date.now()}` };
    setMaterials([...materials, newMaterial]);
  };

  const updateMaterial = (id: string, material: Partial<Material>) => {
    setMaterials(materials.map((m) => (m.id === id ? { ...m, ...material } : m)));
  };

  const addSupplier = (supplier: Omit<Supplier, 'id'>) => {
    const newSupplier = { ...supplier, id: `s${Date.now()}` };
    setSuppliers([...suppliers, newSupplier]);
  };

  const updateSupplier = (id: string, supplier: Partial<Supplier>) => {
    setSuppliers(suppliers.map((s) => (s.id === id ? { ...s, ...supplier } : s)));
  };

  const addWorker = (worker: Omit<Worker, 'id'>) => {
    const newWorker = { ...worker, id: `w${Date.now()}` };
    setWorkers([...workers, newWorker]);
  };

  const updateWorker = (id: string, worker: Partial<Worker>) => {
    setWorkers(workers.map((w) => (w.id === id ? { ...w, ...worker } : w)));
  };

  const addAttendance = (att: Omit<WorkerAttendance, 'id'>) => {
    const newAttendance = { ...att, id: `a${Date.now()}` };
    setAttendance([...attendance, newAttendance]);
  };

  const addScheduleEntry = (entry: Omit<ScheduleEntry, 'id'>) => {
    const newEntry = { ...entry, id: `sch${Date.now()}` };
    setSchedule([...schedule, newEntry]);
  };

  const updateScheduleEntry = (id: string, entry: Partial<ScheduleEntry>) => {
    setSchedule(schedule.map((s) => (s.id === id ? { ...s, ...entry } : s)));
  };

  const addDailyReport = (report: Omit<DailyReport, 'id'>) => {
    const newReport = { ...report, id: `dr${Date.now()}` };
    setDailyReports([...dailyReports, newReport]);
  };

  const updateDailyReport = (id: string, report: Partial<DailyReport>) => {
    setDailyReports(dailyReports.map((r) => (r.id === id ? { ...r, ...report } : r)));
  };

  const addMaterialUsage = (usage: Omit<MaterialUsage, 'id'>) => {
    const newUsage = { ...usage, id: `mu${Date.now()}` };
    setMaterialUsage([...materialUsage, newUsage]);
    const material = materials.find((m) => m.id === usage.materialId);
    if (material) {
      updateMaterial(material.id, {
        quantity: material.quantity - usage.quantity,
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        currentView,
        selectedProjectId,
        projects,
        materials,
        suppliers,
        workers,
        attendance,
        schedule,
        dailyReports,
        materialUsage,
        workDoneReports,
        login,
        logout,
        setCurrentView,
        setSelectedProjectId,
        addProject,
        updateProject,
        addMaterial,
        updateMaterial,
        addSupplier,
        updateSupplier,
        addWorker,
        updateWorker,
        addAttendance,
        addScheduleEntry,
        updateScheduleEntry,
        addDailyReport,
        updateDailyReport,
        addMaterialUsage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
