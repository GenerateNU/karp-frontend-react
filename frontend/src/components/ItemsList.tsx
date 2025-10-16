import { useState } from 'react';
import { useItems } from '@/hooks/useItems';
import { ItemForm } from '@/components/ItemForm';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/ui/button';

export function ItemsList() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { data: items, isLoading, error } = useItems();

  if (isLoading) {
    return <div className="p-4">Loading items...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading items</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Items</h1>
        <Button onClick={() => setShowCreateModal(true)}>
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create Item
        </Button>
      </div>

      {items && items.length > 0 ? (
        <div className="grid gap-4">
          {items.map(item => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Posted: {new Date(item.time_posted).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Expires: {new Date(item.expiration).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 mt-2">
                    Price: {item.price} coins
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-800'
                        : item.status === 'IN_REVIEW'
                          ? 'bg-yellow-100 text-yellow-800'
                          : item.status === 'APPROVED'
                            ? 'bg-blue-100 text-blue-800'
                            : item.status === 'REJECTED'
                              ? 'bg-red-100 text-red-800'
                              : item.status === 'CLAIMED'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {item.status}
                  </span>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Vendor ID: {item.vendor_id}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No items found. Create your first item!</p>
        </div>
      )}

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Item"
        size="lg"
      >
        <ItemForm onSuccess={() => setShowCreateModal(false)} />
      </Modal>
    </div>
  );
}
