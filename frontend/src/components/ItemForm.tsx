import { useState } from 'react';
import { useCreateItem } from '@/hooks/useItems';
import type { CreateItemRequest } from '@/types/item';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { uploadImage } from '@/api/utils/image';

interface ItemFormProps {
  onSuccess?: () => void;
}

export function ItemForm({ onSuccess }: ItemFormProps) {
  const [formData, setFormData] = useState<Partial<CreateItemRequest>>({
    name: '',
    expiration: '',
  });

  const createItemMutation = useCreateItem();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.expiration) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const newItem = await createItemMutation.mutateAsync(
        formData as CreateItemRequest
      );
      if (imageFile) {
        const uploadResult = await uploadImage("item", newItem.id, imageFile);
        formData.image_url = uploadResult.upload_url;
      }
      alert('Item created successfully!');
      onSuccess?.();
    } catch (error) {
      console.error('Failed to create item:', error);
      alert('Failed to create item');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Card className="bg-white">
      <CardHeader className="bg-white">
        <CardTitle className="text-gray-900">Create New Item</CardTitle>
      </CardHeader>
      <CardContent className="bg-white">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-900">
              Item Name *
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter item name"
              className="bg-white border-gray-300 text-gray-900"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiration" className="text-gray-900">
              Expiration Date *
            </Label>
            <Input
              type="datetime-local"
              id="expiration"
              name="expiration"
              value={formData.expiration}
              onChange={handleChange}
              required
              className="bg-white border-gray-300 text-gray-900"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="text-gray-900">
              Upload Image
            </Label>
            <Input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={e => {
                const file = e.target.files?.[0] || null;
                setImageFile(file);
              }}
              className="bg-white border-gray-300 text-gray-900"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={createItemMutation.isPending}
              className="flex-1"
            >
              {createItemMutation.isPending ? 'Creating...' : 'Create Item'}
            </Button>
          </div>
          
        </form>
      </CardContent>
    </Card>
  );
}
