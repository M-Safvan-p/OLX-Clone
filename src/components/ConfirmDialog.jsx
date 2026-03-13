import { AlertCircle } from "lucide-react";

export default function ConfirmDialog({ title, message, onConfirm, onCancel, confirmText = "Delete", cancelText = "Cancel" }) {
  return (
     <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4">
        
        {/* Icon & Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-red-100 rounded-full p-3">
            <AlertCircle size={24} className="text-red-500" />
          </div>
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        </div>

        {/* Message */}
        <p className="text-gray-600 text-sm mb-6">{message}</p>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition text-sm"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition text-sm"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
