import { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Users, Package, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function ProjectDetail() {
  const {
    selectedProjectId,
    projects,
    dailyReports,
    materialUsage,
    materials,
    workers,
    schedule,
    setCurrentView,
  } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'daily' | 'materials' | 'workers'>(
    'overview'
  );

  const project = projects.find((p) => p.id === selectedProjectId);
  if (!project) return null;

  const projectReports = dailyReports.filter((r) => r.projectId === project.id);
  const projectMaterials = materialUsage.filter((m) => m.projectId === project.id);
  const projectSchedule = schedule.filter((s) => s.projectId === project.id);

  const workerIds = new Set<string>();
  projectReports.forEach((r) => r.workersPresent.forEach((w) => workerIds.add(w)));
  projectSchedule.forEach((s) => s.assignedWorkers.forEach((w) => workerIds.add(w)));
  const projectWorkers = workers.filter((w) => workerIds.has(w.id));

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: <FileText size={16} /> },
    { id: 'daily' as const, label: 'Daily Work', icon: <Calendar size={16} /> },
    { id: 'materials' as const, label: 'Materials Used', icon: <Package size={16} /> },
    { id: 'workers' as const, label: 'Workers', icon: <Users size={16} /> },
  ];

  return (
    <div>
      <button
        onClick={() => setCurrentView('projects')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft size={20} />
        Back to Projects
      </button>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{project.name}</h2>
            <span
              className={`inline-block px-4 py-1 rounded-lg text-sm font-semibold ${
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={18} />
            <span>{project.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar size={18} />
            <span>
              {new Date(project.startDate).toLocaleDateString()} -{' '}
              {new Date(project.expectedCompletion).toLocaleDateString()}
            </span>
          </div>
        </div>

        {project.description && (
          <p className="mt-4 text-gray-600 border-t pt-4">{project.description}</p>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 font-semibold transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-teal-600 border-b-2 border-teal-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600 font-semibold mb-1">Total Reports</p>
                <p className="text-3xl font-bold text-blue-700">{projectReports.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-600 font-semibold mb-1">Materials Used</p>
                <p className="text-3xl font-bold text-green-700">{projectMaterials.length}</p>
              </div>
              <div className="bg-teal-50 p-4 rounded-lg">
                <p className="text-sm text-teal-600 font-semibold mb-1">Workers Assigned</p>
                <p className="text-3xl font-bold text-teal-700">{projectWorkers.length}</p>
              </div>
            </div>
          )}

          {activeTab === 'daily' && (
            <div className="space-y-4">
              {projectReports.length > 0 ? (
                projectReports.map((report) => (
                  <div key={report.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-semibold text-gray-800">
                        {new Date(report.date).toLocaleDateString()}
                      </p>
                      <span className="text-sm text-gray-600">
                        {report.workersPresent.length} workers
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{report.workPerformed}</p>
                    {report.remarks && (
                      <p className="text-sm text-gray-600 italic">Remarks: {report.remarks}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No daily reports available for this project
                </p>
              )}
            </div>
          )}

          {activeTab === 'materials' && (
            <div className="space-y-3">
              {projectMaterials.length > 0 ? (
                projectMaterials.map((usage) => {
                  const material = materials.find((m) => m.id === usage.materialId);
                  return (
                    <div
                      key={usage.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-semibold text-gray-800">{material?.name}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(usage.date).toLocaleDateString()}
                        </p>
                        {usage.notes && (
                          <p className="text-sm text-gray-600 mt-1">{usage.notes}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">
                          {usage.quantity} {material?.unit}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No material usage recorded for this project
                </p>
              )}
            </div>
          )}

          {activeTab === 'workers' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectWorkers.length > 0 ? (
                projectWorkers.map((worker) => (
                  <div key={worker.id} className="border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-800">{worker.name}</p>
                    <p className="text-sm text-gray-600">{worker.role}</p>
                    <p className="text-sm text-gray-600 mt-1">{worker.contact}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8 col-span-2">
                  No workers assigned to this project yet
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
