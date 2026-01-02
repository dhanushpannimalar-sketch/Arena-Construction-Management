import { useState } from 'react';
import { Settings as SettingsIcon, Save, Building2, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Settings() {
  const { user } = useApp();
  const [companyName, setCompanyName] = useState('Arena CMS');
  const [username, setUsername] = useState(user?.username || '');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Settings</h2>
        <p className="text-gray-600 mt-1">Manage your application preferences</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 max-w-2xl">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-2">
            <SettingsIcon size={20} className="text-gray-600" />
            <h3 className="text-lg font-bold text-gray-800">General Settings</h3>
          </div>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 size={18} className="text-gray-600" />
              <h4 className="font-semibold text-gray-800">Company Information</h4>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <User size={18} className="text-gray-600" />
              <h4 className="font-semibold text-gray-800">User Profile</h4>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                <input
                  type="text"
                  value={user?.role || 'manager'}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 capitalize"
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-700">
              <strong>Note:</strong> This is a demo application. All settings are stored locally
              and will reset on refresh.
            </p>
          </div>

          {saved && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-sm font-semibold text-green-700">
                Settings saved successfully!
              </p>
            </div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-semibold"
          >
            <Save size={20} />
            Save Settings
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 max-w-2xl mt-6 p-6">
        <h4 className="font-bold text-gray-800 mb-4">Demo Information</h4>
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <strong className="text-gray-700">Version:</strong> 1.0.0 (Demo)
          </p>
          <p>
            <strong className="text-gray-700">Purpose:</strong> Construction Management System
            Prototype
          </p>
          <p>
            <strong className="text-gray-700">Features:</strong> Projects, Materials, Workers,
            Scheduling, Reporting
          </p>
        </div>
      </div>
    </div>
  );
}
