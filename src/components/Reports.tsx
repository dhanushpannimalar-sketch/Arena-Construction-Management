import { useState } from 'react';
import { BarChart3, Filter, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Reports() {
  const { projects, dailyReports, materialUsage, attendance, materials } = useApp();
  const [reportType, setReportType] = useState<
    'daily-progress' | 'material-usage' | 'worker-attendance' | 'project-timeline'
  >('daily-progress');
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');

  const filterByDate = (date: string) => {
    if (!dateFrom && !dateTo) return true;
    if (dateFrom && !dateTo) return date >= dateFrom;
    if (!dateFrom && dateTo) return date <= dateTo;
    return date >= dateFrom && date <= dateTo;
  };

  const filteredDailyReports = dailyReports.filter(
    (r) =>
      (selectedProject === 'all' || r.projectId === selectedProject) && filterByDate(r.date)
  );

  const filteredMaterialUsage = materialUsage.filter(
    (m) =>
      (selectedProject === 'all' || m.projectId === selectedProject) && filterByDate(m.date)
  );

  const filteredAttendance = attendance.filter((a) => filterByDate(a.date));

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Reports & Analytics</h2>
        <p className="text-gray-600 mt-1">Generate and view comprehensive reports</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} className="text-gray-600" />
          <h3 className="text-lg font-bold text-gray-800">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) =>
                setReportType(
                  e.target.value as
                    | 'daily-progress'
                    | 'material-usage'
                    | 'worker-attendance'
                    | 'project-timeline'
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="daily-progress">Daily Progress</option>
              <option value="material-usage">Material Usage</option>
              <option value="worker-attendance">Worker Attendance</option>
              <option value="project-timeline">Project Timeline</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Project</label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Projects</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">From Date</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">To Date</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        {reportType === 'daily-progress' && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Daily Progress Report</h3>
            {filteredDailyReports.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Project
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Work Performed
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Workers
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredDailyReports.map((report) => {
                      const project = projects.find((p) => p.id === report.projectId);
                      return (
                        <tr key={report.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {new Date(report.date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {project?.name}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {report.workPerformed}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {report.workersPresent.length}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No data available</p>
            )}
          </div>
        )}

        {reportType === 'material-usage' && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Material Usage Report</h3>
            {filteredMaterialUsage.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Project
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Material
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredMaterialUsage.map((usage) => {
                      const project = projects.find((p) => p.id === usage.projectId);
                      const material = materials.find((m) => m.id === usage.materialId);
                      return (
                        <tr key={usage.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {new Date(usage.date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {project?.name}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {material?.name}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {usage.quantity} {material?.unit}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {usage.notes || '-'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No data available</p>
            )}
          </div>
        )}

        {reportType === 'worker-attendance' && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Worker Attendance Report</h3>
            {filteredAttendance.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <p className="text-sm font-semibold text-green-700 mb-2">Total Present</p>
                  <p className="text-4xl font-bold text-green-800">
                    {filteredAttendance.filter((a) => a.present).length}
                  </p>
                </div>
                <div className="bg-red-50 p-6 rounded-lg">
                  <p className="text-sm font-semibold text-red-700 mb-2">Total Absent</p>
                  <p className="text-4xl font-bold text-red-800">
                    {filteredAttendance.filter((a) => !a.present).length}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No data available</p>
            )}
          </div>
        )}

        {reportType === 'project-timeline' && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Project Timeline Report</h3>
            {projects.length > 0 ? (
              <div className="space-y-4">
                {projects
                  .filter((p) => selectedProject === 'all' || p.id === selectedProject)
                  .map((project) => {
                    const start = new Date(project.startDate);
                    const end = new Date(project.expectedCompletion);
                    const totalDays = Math.ceil(
                      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
                    );
                    const today = new Date();
                    const daysElapsed = Math.ceil(
                      (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
                    );
                    const progress = Math.min((daysElapsed / totalDays) * 100, 100);

                    return (
                      <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-gray-800">{project.name}</h4>
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
                        <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                          <div>
                            <p className="text-gray-600">Start Date</p>
                            <p className="font-semibold text-gray-800">
                              {start.toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Expected End</p>
                            <p className="font-semibold text-gray-800">
                              {end.toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Duration</p>
                            <p className="font-semibold text-gray-800">{totalDays} days</p>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{Math.round(progress)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-teal-600 h-2 rounded-full transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No projects available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
