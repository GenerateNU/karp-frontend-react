export interface Item {
  id: string;
  name: string;
  status: 'APPROVED' | 'IN_REVIEW' | 'REJECTED' | 'DELETED' | 'ACTIVE';
  vendor_id: string;
  time_posted: string;
  expiration: string;
  price: number;
  image_url?: string; //?
}

export interface CreateItemRequest {
  name: string;
  expiration: string;
  image_url?: string;
}

export interface UpdateItemRequest {
  name?: string;
  price?: number;
  expiration?: string;
  status?: Item['status'];
}

export type ItemSortParam = 'date' | 'name' | 'coins';
export type SortOrder = 'asc' | 'desc';
