import { useState } from 'react';
import { Plus, Users, Phone, Calendar, CheckCircle, XCircle, Edit } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Worker } from '../types';

export function Workers() {
  const { workers, addWorker, updateWorker, attendance, addAttendance } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingWorker, setEditingWorker] = useState<Worker | null>(null);
  const [showAttendance, setShowAttendance] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.filter((a) => a.date === today);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Workers</h2>
          <p className="text-gray-600 mt-1">Manage your workforce and attendance</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAttendance(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <CheckCircle size={20} />
            Mark Attendance
          </button>
          <button
            onClick={() => {
              setEditingWorker(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
          >
            <Plus size={20} />
            Add Worker
          </button>
        </div>
      </div>

      {showForm && (
        <WorkerForm
          worker={editingWorker}
          onClose={() => {
            setShowForm(false);
            setEditingWorker(null);
          }}
          onSave={(worker) => {
            if (editingWorker) {
              updateWorker(editingWorker.id, worker);
            } else {
              addWorker(worker);
            }
            setShowForm(false);
            setEditingWorker(null);
          }}
        />
      )}

      {showAttendance && (
        <AttendanceModal
          workers={workers}
          todayAttendance={todayAttendance}
          onClose={() => setShowAttendance(false)}
          onSave={(workerId, present) => {
            addAttendance({
              workerId,
              date: today,
              present,
            });
          }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workers.map((worker) => {
          const workerAttendance = todayAttendance.find((a) => a.workerId === worker.id);
          const isPresent = workerAttendance?.present || false;

          return (
            <div
              key={worker.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-3 rounded-lg ${
                      worker.status === 'Active' ? 'bg-green-100' : 'bg-gray-100'
                    }`}
                  >
                    <Users
                      className={`w-6 h-6 ${
                        worker.status === 'Active' ? 'text-green-600' : 'text-gray-600'
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{worker.name}</h3>
                    <p className="text-sm text-gray-600">{worker.role}</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    worker.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {worker.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={16} />
                  <span>{worker.contact}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={16} />
                  <span>Joined: {new Date(worker.joinDate).toLocaleDateString()}</span>
                </div>
              </div>

              {workerAttendance && (
                <div
                  className={`flex items-center gap-2 p-3 rounded-lg mb-4 ${
                    isPresent ? 'bg-green-50' : 'bg-red-50'
                  }`}
                >
                  {isPresent ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-semibold text-green-700">
                        Present Today
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span className="text-sm font-semibold text-red-700">
                        Absent Today
                      </span>
                    </>
                  )}
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    setEditingWorker(worker);
                    setShowForm(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  <Edit size={16} />
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WorkerForm({
  worker,
  onClose,
  onSave,
}: {
  worker: Worker | null;
  onClose: () => void;
  onSave: (worker: Omit<Worker, 'id'>) => void;
}) {
  const [formData, setFormData] = useState({
    name: worker?.name || '',
    role: worker?.role || '',
    contact: worker?.contact || '',
    status: worker?.status || 'Active',
    joinDate: worker?.joinDate || new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Omit<Worker, 'id'>);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-xl font-bold text-gray-800">
            {worker ? 'Edit Worker' : 'Add Worker'}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Worker Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as Worker['status'],
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Contact</label>
            <input
              type="tel"
              required
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Join Date</label>
            <input
              type="date"
              required
              value={formData.joinDate}
              onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
            >
              {worker ? 'Update' : 'Add'} Worker
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

function AttendanceModal({
  workers,
  todayAttendance,
  onClose,
  onSave,
}: {
  workers: Worker[];
  todayAttendance: { workerId: string; present: boolean }[];
  onClose: () => void;
  onSave: (workerId: string, present: boolean) => void;
}) {
  const [attendance, setAttendance] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    todayAttendance.forEach((a) => {
      initial[a.workerId] = a.present;
    });
    return initial;
  });

  const handleSave = () => {
    Object.entries(attendance).forEach(([workerId, present]) => {
      onSave(workerId, present);
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <h3 className="text-xl font-bold text-gray-800">Mark Today's Attendance</h3>
        </div>

        <div className="p-6 space-y-3">
          {workers.map((worker) => (
            <div
              key={worker.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-semibold text-gray-800">{worker.name}</p>
                <p className="text-sm text-gray-600">{worker.role}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setAttendance({ ...attendance, [worker.id]: true })}
                  className={`px-4 py-2 rounded-lg transition ${
                    attendance[worker.id] === true
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Present
                </button>
                <button
                  onClick={() => setAttendance({ ...attendance, [worker.id]: false })}
                  className={`px-4 py-2 rounded-lg transition ${
                    attendance[worker.id] === false
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Absent
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
          >
            Save Attendance
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
