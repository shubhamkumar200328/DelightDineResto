// components/OrderStatus.tsx
export default function OrderStatus({ status }: { status: string }) {
  const steps = ['Pending', 'Preparing', 'Out for Delivery', 'Delivered'];

  return (
    <div className="flex gap-4 mt-2">
      {steps.map((step) => (
        <div
          key={step}
          className={`px-3 py-1 rounded ${
            steps.indexOf(step) <= steps.indexOf(status)
              ? 'bg-green-500 text-white'
              : 'bg-gray-200'
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  );
}
