import { useState } from 'react';
import {
  Building2,
  LayoutDashboard,
  FolderKanban,
  Package,
  Truck,
  Users,
  Calendar,
  FileText,
  ClipboardCheck,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ViewType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { currentView, setCurrentView, user, logout } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems: { view: ViewType; icon: React.ReactNode; label: string }[] = [
    { view: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { view: 'projects', icon: <FolderKanban size={20} />, label: 'Projects' },
    { view: 'materials', icon: <Package size={20} />, label: 'Raw Materials' },
    { view: 'suppliers', icon: <Truck size={20} />, label: 'Suppliers' },
    { view: 'workers', icon: <Users size={20} />, label: 'Workers' },
    { view: 'schedule', icon: <Calendar size={20} />, label: 'Schedule' },
    { view: 'daily-reports', icon: <FileText size={20} />, label: 'Daily Reports' },
    {
      view: 'work-done-reports',
      icon: <ClipboardCheck size={20} />,
      label: 'Work Done Reports',
    },
    { view: 'reports', icon: <BarChart3 size={20} />, label: 'Reports' },
    { view: 'settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  const handleMenuClick = (view: ViewType) => {
    setCurrentView(view);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Building2 className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold">Arena CMS</h1>
              <p className="text-xs text-teal-50">Construction Management</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="font-semibold">{user?.name}</p>
              <p className="text-xs text-teal-50 capitalize">{user?.role}</p>
            </div>
            <button
              onClick={logout}
              className="p-2 hover:bg-white/10 rounded-lg transition"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transition-transform duration-300 ease-in-out mt-[73px] lg:mt-0`}
        >
          <nav className="p-4 space-y-1 h-full overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleMenuClick(item.view)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  currentView === item.view
                    ? 'bg-teal-50 text-teal-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 p-4 lg:p-6 min-h-[calc(100vh-73px)]">{children}</main>
      </div>
    </div>
  );
}
