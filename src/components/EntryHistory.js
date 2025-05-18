import React from "react";

export const EntryHistory = ({
  entries = [],
  onAddEntry,
  onDeleteEntry,
  onEditEntry,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
          <i className="fas fa-history text-lg"></i>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Entry History</h2>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-100">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {entries && entries.length > 0 ? (
              entries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {new Date(entry.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-indigo-600">
                    {entry.amount}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {entry.details || "No details"}
                  </td>
                  <td className="px-4 py-3 text-right text-sm">
                    <button
                      onClick={() => onDeleteEntry(entry.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-3 text-sm text-gray-500 text-center"
                >
                  No entries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
