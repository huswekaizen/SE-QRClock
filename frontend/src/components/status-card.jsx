// src/components/StatusCard.jsx
export default function StatusCard({ title, value, Icon, iconColor }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow border flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
      </div>
      <Icon className={`w-8 h-8 ${iconColor}`} />
    </div>
  );
}