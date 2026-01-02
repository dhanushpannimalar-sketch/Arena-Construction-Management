import { ClipboardCheck, Calendar, Users, DollarSign, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function WorkDoneReports() {
  const { workDoneReports, projects } = useApp();

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Work Done Reports</h2>
        <p className="text-gray-600 mt-1">Project completion summaries and analysis</p>
      </div>

      <div className="space-y-6">
        {workDoneReports.length > 0 ? (
          workDoneReports.map((report) => {
            const project = projects.find((p) => p.id === report.projectId);

            return (
              <div
                key={report.id}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{project?.name}</h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={16} />
                      <span>
                        Report Generated:{' '}
                        {new Date(report.generatedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold">
                    Completed
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-500 rounded-lg">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-sm font-semibold text-blue-700">Duration</p>
                    </div>
                    <p className="text-3xl font-bold text-blue-900">{report.duration}</p>
                    <p className="text-sm text-blue-600 mt-1">days</p>
                  </div>

                  <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-teal-500 rounded-lg">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-sm font-semibold text-teal-700">Total Workers</p>
                    </div>
                    <p className="text-3xl font-bold text-teal-900">{report.totalWorkers}</p>
                    <p className="text-sm text-teal-600 mt-1">team members</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-green-500 rounded-lg">
                        <DollarSign className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-sm font-semibold text-green-700">Material Cost</p>
                    </div>
                    <p className="text-3xl font-bold text-green-900">
                      ₹{report.totalMaterialCost.toLocaleString()}
                    </p>
                    <p className="text-sm text-green-600 mt-1">estimated</p>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-5 h-5 text-gray-700" />
                    <h4 className="font-semibold text-gray-800">Final Remarks</h4>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{report.remarks}</p>
                </div>

                <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => window.print()}
                    className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                  >
                    Print Report
                  </button>
                  <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                    Export PDF
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12 border border-gray-100 text-center">
            <ClipboardCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No work done reports available</p>
            <p className="text-sm text-gray-400 mt-2">
              Reports will be generated when projects are completed
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
