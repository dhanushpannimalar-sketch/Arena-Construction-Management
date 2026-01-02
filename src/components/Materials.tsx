import { useState } from 'react';
import { Plus, Package, AlertTriangle, Edit, TrendingDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Material } from '../types';

export function Materials() {
  const { materials, addMaterial, updateMaterial } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [filter, setFilter] = useState<'all' | 'low-stock'>('all');

  const filteredMaterials =
    filter === 'low-stock'
      ? materials.filter((m) => m.quantity <= m.minQuantity)
      : materials;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Raw Materials</h2>
          <p className="text-gray-600 mt-1">Manage your inventory and stock levels</p>
        </div>
        <button
          onClick={() => {
            setEditingMaterial(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
        >
          <Plus size={20} />
          Add Material
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition ${
              filter === 'all'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Materials
          </button>
          <button
            onClick={() => setFilter('low-stock')}
            className={`px-4 py-2 rounded-lg transition ${
              filter === 'low-stock'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Low Stock
          </button>
        </div>
      </div>

      {showForm && (
        <MaterialForm
          material={editingMaterial}
          onClose={() => {
            setShowForm(false);
            setEditingMaterial(null);
          }}
          onSave={(material) => {
            if (editingMaterial) {
              updateMaterial(editingMaterial.id, material);
            } else {
              addMaterial(material);
            }
            setShowForm(false);
            setEditingMaterial(null);
          }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMaterials.map((material) => {
          const isLowStock = material.quantity <= material.minQuantity;
          const stockPercentage = (material.quantity / material.minQuantity) * 100;

          return (
            <div
              key={material.id}
              className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border ${
                isLowStock ? 'border-red-300' : 'border-gray-100'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-3 rounded-lg ${
                      isLowStock ? 'bg-red-100' : 'bg-teal-100'
                    }`}
                  >
                    {isLowStock ? (
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    ) : (
                      <Package className="w-6 h-6 text-teal-600" />
                    )}
                  </div>
                  <div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        material.category === 'Turf'
                          ? 'bg-green-100 text-green-700'
                          : material.category === 'Base'
                            ? 'bg-blue-100 text-blue-700'
                            : material.category === 'Accessories'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {material.category}
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-2">{material.name}</h3>

              <div className="space-y-3">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-800">
                      {material.quantity}
                    </span>
                    <span className="text-gray-600">{material.unit}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Min. required: {material.minQuantity} {material.unit}
                  </p>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Stock Level</span>
                    <span>{Math.round(stockPercentage)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        isLowStock
                          ? 'bg-red-500'
                          : stockPercentage < 150
                            ? 'bg-amber-500'
                            : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    setEditingMaterial(material);
                    setShowForm(true);
                  }}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  <Edit size={14} />
                  Edit
                </button>
                {isLowStock && (
                  <span className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 bg-red-50 rounded-lg">
                    <TrendingDown size={14} />
                    Low Stock
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No materials found</p>
        </div>
      )}
    </div>
  );
}

function MaterialForm({
  material,
  onClose,
  onSave,
}: {
  material: Material | null;
  onClose: () => void;
  onSave: (material: Omit<Material, 'id'>) => void;
}) {
  const [formData, setFormData] = useState({
    name: material?.name || '',
    unit: material?.unit || '',
    quantity: material?.quantity || 0,
    minQuantity: material?.minQuantity || 0,
    category: material?.category || 'Turf',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Omit<Material, 'id'>);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-xl font-bold text-gray-800">
            {material ? 'Edit Material' : 'Add Material'}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Material Name
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as Material['category'],
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="Turf">Turf</option>
                <option value="Base">Base</option>
                <option value="Accessories">Accessories</option>
                <option value="Equipment">Equipment</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Unit</label>
              <input
                type="text"
                required
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                placeholder="e.g., sq.ft, tons"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Quantity
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: Number(e.target.value) })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Min. Quantity
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.minQuantity}
                onChange={(e) =>
                  setFormData({ ...formData, minQuantity: Number(e.target.value) })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
            >
              {material ? 'Update' : 'Add'} Material
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
