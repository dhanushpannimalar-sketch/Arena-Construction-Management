import {
  FolderKanban,
  CheckCircle,
  Clock,
  AlertCircle,
  Package,
  Users,
  TrendingUp,
  Calendar,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Dashboard() {
  const { projects, schedule, materials, attendance } = useApp();

  const today = new Date().toISOString().split('T')[0];
  const activeProjects = projects.filter((p) => p.status === 'In Progress').length;
  const todaySchedule = schedule.filter((s) => s.date === today);
  const todayScheduled = todaySchedule.length;
  const todayCompleted = todaySchedule.filter((s) => s.status === 'Completed').length;
  const todayInProgress = todaySchedule.filter((s) => s.status === 'In Progress').length;
  const pendingTasks = schedule.filter((s) => s.status === 'Planned').length;
  const todayAttendance = attendance.filter((a) => a.date === today && a.present);
  const workersPresent = todayAttendance.length;
  const lowStock = materials.filter((m) => m.quantity <= m.minQuantity).length;

  const cards = [
    {
      title: 'Active Projects',
      value: activeProjects,
      icon: <FolderKanban className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: "Today's Scheduled",
      value: todayScheduled,
      icon: <Calendar className="w-8 h-8" />,
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-50',
      textColor: 'text-cyan-600',
    },
    {
      title: "Today's In Progress",
      value: todayInProgress,
      icon: <Clock className="w-8 h-8" />,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
    },
    {
      title: "Today's Completed",
      value: todayCompleted,
      icon: <CheckCircle className="w-8 h-8" />,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: 'Pending Tasks',
      value: pendingTasks,
      icon: <AlertCircle className="w-8 h-8" />,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
    },
    {
      title: 'Workers Present',
      value: workersPresent,
      icon: <Users className="w-8 h-8" />,
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600',
    },
    {
      title: 'Low Stock Items',
      value: lowStock,
      icon: <Package className="w-8 h-8" />,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
    },
    {
      title: 'Material Categories',
      value: new Set(materials.map((m) => m.category)).size,
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-600 mt-1">Welcome back! Here's your project overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`${card.bgColor} p-3 rounded-lg`}>
                <div className={card.textColor}>{card.icon}</div>
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{card.title}</h3>
            <p className="text-3xl font-bold text-gray-800">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Projects</h3>
          <div className="space-y-3">
            {projects.slice(0, 3).map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-semibold text-gray-800">{project.name}</p>
                  <p className="text-sm text-gray-600">{project.location}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    project.status === 'In Progress'
                      ? 'bg-blue-100 text-blue-700'
                      : project.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {project.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Today's Schedule</h3>
          <div className="space-y-3">
            {todaySchedule.length > 0 ? (
              todaySchedule.map((entry) => {
                const project = projects.find((p) => p.id === entry.projectId);
                return (
                  <div
                    key={entry.id}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div
                      className={`mt-1 w-2 h-2 rounded-full ${
                        entry.status === 'Completed'
                          ? 'bg-green-500'
                          : entry.status === 'In Progress'
                            ? 'bg-blue-500'
                            : 'bg-gray-400'
                      }`}
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm">
                        {entry.workDescription}
                      </p>
                      <p className="text-xs text-gray-600">{project?.name}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center py-4">No tasks scheduled for today</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
