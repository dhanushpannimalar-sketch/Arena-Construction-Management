import { useState } from 'react';
import { Plus, FileText, Calendar, Edit } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DailyReport } from '../types';

export function DailyReports() {
  const {
    dailyReports,
    projects,
    workers,
    materials,
    addDailyReport,
    updateDailyReport,
  } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingReport, setEditingReport] = useState<DailyReport | null>(null);

  const sortedReports = [...dailyReports].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Daily Work Reports</h2>
          <p className="text-gray-600 mt-1">Record daily progress and activities</p>
        </div>
        <button
          onClick={() => {
            setEditingReport(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
        >
          <Plus size={20} />
          New Report
        </button>
      </div>

      {showForm && (
        <DailyReportForm
          report={editingReport}
          projects={projects}
          workers={workers}
          materials={materials}
          onClose={() => {
            setShowForm(false);
            setEditingReport(null);
          }}
          onSave={(report) => {
            if (editingReport) {
              updateDailyReport(editingReport.id, report);
            } else {
              addDailyReport(report);
            }
            setShowForm(false);
            setEditingReport(null);
          }}
        />
      )}

      <div className="space-y-4">
        {sortedReports.length > 0 ? (
          sortedReports.map((report) => {
            const project = projects.find((p) => p.id === report.projectId);
            const reportWorkers = workers.filter((w) =>
              report.workersPresent.includes(w.id)
            );

            return (
              <div
                key={report.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-teal-100 rounded-lg">
                      <FileText className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{project?.name}</h3>
                      <div className="flex items-center gap-2 mt-1 text-gray-600">
                        <Calendar size={16} />
                        <span>{new Date(report.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setEditingReport(report);
                      setShowForm(true);
                    }}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                  >
                    <Edit size={18} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Work Performed:</p>
                    <p className="text-gray-700">{report.workPerformed}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Workers Present ({reportWorkers.length}):
                      </p>
                      <div className="space-y-1">
                        {reportWorkers.map((worker) => (
                          <div
                            key={worker.id}
                            className="text-sm text-gray-600 flex items-center gap-2"
                          >
                            <span className="w-2 h-2 bg-green-500 rounded-full" />
                            {worker.name}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Materials Used:
                      </p>
                      <div className="space-y-1">
                        {report.materialsUsed.map((mat, idx) => {
                          const material = materials.find((m) => m.id === mat.materialId);
                          return (
                            <div key={idx} className="text-sm text-gray-600">
                              {material?.name}: {mat.quantity} {material?.unit}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {report.issues && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm font-semibold text-red-700 mb-1">Issues/Delays:</p>
                      <p className="text-sm text-red-600">{report.issues}</p>
                    </div>
                  )}

                  {report.remarks && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <p className="text-sm font-semibold text-gray-700 mb-1">Remarks:</p>
                      <p className="text-sm text-gray-600">{report.remarks}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12 border border-gray-100 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No daily reports yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

function DailyReportForm({
  report,
  projects,
  workers,
  materials,
  onClose,
  onSave,
}: {
  report: DailyReport | null;
  projects: { id: string; name: string }[];
  workers: { id: string; name: string }[];
  materials: { id: string; name: string; unit: string }[];
  onClose: () => void;
  onSave: (report: Omit<DailyReport, 'id'>) => void;
}) {
  const [formData, setFormData] = useState({
    date: report?.date || new Date().toISOString().split('T')[0],
    projectId: report?.projectId || '',
    workPerformed: report?.workPerformed || '',
    workersPresent: report?.workersPresent || ([] as string[]),
    materialsUsed:
      report?.materialsUsed || ([] as { materialId: string; quantity: number }[]),
    issues: report?.issues || '',
    remarks: report?.remarks || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addMaterial = () => {
    setFormData({
      ...formData,
      materialsUsed: [...formData.materialsUsed, { materialId: '', quantity: 0 }],
    });
  };

  const updateMaterial = (
    index: number,
    field: 'materialId' | 'quantity',
    value: string | number
  ) => {
    const updated = [...formData.materialsUsed];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, materialsUsed: updated });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <h3 className="text-xl font-bold text-gray-800">
            {report ? 'Edit Daily Report' : 'New Daily Report'}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project
              </label>
              <select
                required
                value={formData.projectId}
                onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Work Performed
            </label>
            <textarea
              required
              value={formData.workPerformed}
              onChange={(e) => setFormData({ ...formData, workPerformed: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Describe the work completed today..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Workers Present
            </label>
            <div className="border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto">
              {workers.map((worker) => (
                <label key={worker.id} className="flex items-center gap-2 p-2 hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.workersPresent.includes(worker.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          workersPresent: [...formData.workersPresent, worker.id],
                        });
                      } else {
                        setFormData({
                          ...formData,
                          workersPresent: formData.workersPresent.filter(
                            (id) => id !== worker.id
                          ),
                        });
                      }
                    }}
                    className="rounded text-teal-600"
                  />
                  <span className="text-sm text-gray-700">{worker.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-gray-700">
                Materials Used
              </label>
              <button
                type="button"
                onClick={addMaterial}
                className="text-sm text-teal-600 hover:text-teal-700"
              >
                + Add Material
              </button>
            </div>
            <div className="space-y-2">
              {formData.materialsUsed.map((mat, idx) => (
                <div key={idx} className="grid grid-cols-2 gap-2">
                  <select
                    required
                    value={mat.materialId}
                    onChange={(e) => updateMaterial(idx, 'materialId', e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Select Material</option>
                    {materials.map((material) => (
                      <option key={material.id} value={material.id}>
                        {material.name} ({material.unit})
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    required
                    min="0"
                    value={mat.quantity}
                    onChange={(e) => updateMaterial(idx, 'quantity', Number(e.target.value))}
                    placeholder="Quantity"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Issues / Delays
            </label>
            <textarea
              value={formData.issues}
              onChange={(e) => setFormData({ ...formData, issues: e.target.value })}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Any issues or delays encountered..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Remarks</label>
            <textarea
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Additional notes or observations..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
            >
              {report ? 'Update Report' : 'Save Report'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
