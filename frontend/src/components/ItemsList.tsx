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
    return <div className="p-4 text-karp-orange">Error loading items</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-karp-font">Items</h1>
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
              className="bg-karp-background border border-karp-font/20 rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:border-karp-primary/50"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-karp-font">
                    {item.name}
                  </h3>
                  <p className="text-sm text-karp-font/60">
                    Posted: {new Date(item.time_posted).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-karp-font/60">
                    Expires: {new Date(item.expiration).toLocaleDateString()}
                  </p>
                  <p className="text-karp-font/70 mt-2">
                    Price: {item.price} coins
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === 'ACTIVE'
                        ? 'bg-karp-green/20 text-karp-green'
                        : item.status === 'IN_REVIEW'
                          ? 'bg-karp-yellow/20 text-karp-yellow'
                          : item.status === 'APPROVED'
                            ? 'bg-karp-primary/20 text-karp-primary'
                            : item.status === 'REJECTED'
                              ? 'bg-karp-orange/20 text-karp-orange'
                              : 'bg-karp-font/10 text-karp-font'
                    }`}
                  >
                    {item.status}
                  </span>
                  <div className="mt-2 text-sm text-karp-font/70">
                    <p>Vendor ID: {item.vendor_id}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-karp-font/70">
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
