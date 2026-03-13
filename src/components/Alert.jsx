import { X, AlertCircle, CheckCircle, Info } from "lucide-react";

export default function Alert({ message, type = "info", onClose }) {
  const typeStyles = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  const iconStyles = {
    success: "text-green-500",
    error: "text-red-500",
    warning: "text-yellow-500",
    info: "text-blue-500",
  };

  const icons = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    warning: <AlertCircle size={20} />,
    info: <Info size={20} />,
  };

  return (
    <div
      className={`fixed top-4 right-4 border rounded-lg p-4 flex items-center gap-3 shadow-lg max-w-sm animate-slideIn z-50 ${typeStyles[type]}`}
    >
      <div className={iconStyles[type]}>{icons[type]}</div>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="text-current hover:opacity-70 transition"
      >
        <X size={18} />
      </button>
    </div>
  );
}
