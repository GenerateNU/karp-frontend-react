export type OrganizationStatus =
  | 'APPROVED'
  | 'IN_REVIEW'
  | 'REJECTED'
  | 'DELETED';

export type Organization = {
  id: string;
  name: string;
  description: string;
  status: OrganizationStatus;
};

export type UpdateOrganizationRequest = {
  name: string;
  description: string;
  status: OrganizationStatus;
};
