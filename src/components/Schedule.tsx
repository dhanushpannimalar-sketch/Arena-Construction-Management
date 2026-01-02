import { useState } from 'react';
import { Plus, Calendar, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScheduleEntry } from '../types';

export function Schedule() {
  const {
    schedule,
    projects,
    workers,
    materials,
    addScheduleEntry,
    updateScheduleEntry,
  } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const dateSchedule = schedule.filter((s) => s.date === selectedDate);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Work Schedule</h2>
          <p className="text-gray-600 mt-1">Plan and track your daily work activities</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
        >
          <Plus size={20} />
          Add Schedule
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Select Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>

      {showForm && (
        <ScheduleForm
          date={selectedDate}
          projects={projects}
          workers={workers}
          materials={materials}
          onClose={() => setShowForm(false)}
          onSave={(entry) => {
            addScheduleEntry(entry);
            setShowForm(false);
          }}
        />
      )}

      <div className="space-y-4">
        {dateSchedule.length > 0 ? (
          dateSchedule.map((entry) => {
            const project = projects.find((p) => p.id === entry.projectId);
            const assignedWorkersList = workers.filter((w) =>
              entry.assignedWorkers.includes(w.id)
            );

            return (
              <div
                key={entry.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-800">
                        {entry.workDescription}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          entry.status === 'Completed'
                            ? 'bg-green-100 text-green-700'
                            : entry.status === 'In Progress'
                              ? 'bg-blue-100 text-blue-700'
                              : entry.status === 'Cancelled'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {entry.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{project?.name}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                          Assigned Workers:
                        </p>
                        <div className="space-y-1">
                          {assignedWorkersList.map((worker) => (
                            <div
                              key={worker.id}
                              className="text-sm text-gray-600 flex items-center gap-2"
                            >
                              <span className="w-2 h-2 bg-teal-500 rounded-full" />
                              {worker.name} - {worker.role}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                          Required Materials:
                        </p>
                        <div className="space-y-1">
                          {entry.requiredMaterials.map((mat, idx) => {
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
                  </div>
                </div>

                {entry.status !== 'Completed' && entry.status !== 'Cancelled' && (
                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    {entry.status === 'Planned' && (
                      <button
                        onClick={() =>
                          updateScheduleEntry(entry.id, { status: 'In Progress' })
                        }
                        className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      >
                        <Clock size={16} />
                        Start Work
                      </button>
                    )}
                    {entry.status === 'In Progress' && (
                      <button
                        onClick={() => updateScheduleEntry(entry.id, { status: 'Completed' })}
                        className="flex items-center gap-2 px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                      >
                        <CheckCircle size={16} />
                        Mark Complete
                      </button>
                    )}
                    <button
                      onClick={() => updateScheduleEntry(entry.id, { status: 'Cancelled' })}
                      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <XCircle size={16} />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12 border border-gray-100 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No work scheduled for this date</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ScheduleForm({
  date,
  projects,
  workers,
  materials,
  onClose,
  onSave,
}: {
  date: string;
  projects: { id: string; name: string }[];
  workers: { id: string; name: string }[];
  materials: { id: string; name: string; unit: string }[];
  onClose: () => void;
  onSave: (entry: Omit<ScheduleEntry, 'id'>) => void;
}) {
  const [formData, setFormData] = useState({
    date,
    projectId: '',
    workDescription: '',
    assignedWorkers: [] as string[],
    requiredMaterials: [] as { materialId: string; quantity: number }[],
    status: 'Planned' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addMaterial = () => {
    setFormData({
      ...formData,
      requiredMaterials: [
        ...formData.requiredMaterials,
        { materialId: '', quantity: 0 },
      ],
    });
  };

  const updateMaterial = (
    index: number,
    field: 'materialId' | 'quantity',
    value: string | number
  ) => {
    const updated = [...formData.requiredMaterials];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, requiredMaterials: updated });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <h3 className="text-xl font-bold text-gray-800">Add Schedule Entry</h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
            <label className="block text-sm font-semibold text-gray-700 mb-2">Project</label>
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

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Work Description
            </label>
            <textarea
              required
              value={formData.workDescription}
              onChange={(e) => setFormData({ ...formData, workDescription: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Assign Workers
            </label>
            <div className="border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto">
              {workers.map((worker) => (
                <label key={worker.id} className="flex items-center gap-2 p-2 hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.assignedWorkers.includes(worker.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          assignedWorkers: [...formData.assignedWorkers, worker.id],
                        });
                      } else {
                        setFormData({
                          ...formData,
                          assignedWorkers: formData.assignedWorkers.filter(
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
                Required Materials
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
              {formData.requiredMaterials.map((mat, idx) => (
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

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
            >
              Add to Schedule
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
