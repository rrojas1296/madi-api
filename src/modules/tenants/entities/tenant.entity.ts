import { DocumentType, Nationality } from '@prisma/client';

interface TenantProps {
  id?: string;
  name: string;
  lastName: string;
  primaryPhone: string;
  emergencyPhone?: string;
  email: string;
  paymentDay: number;
  documentType: DocumentType;
  numberDocument: string;
  nationality: Nationality;
  birthDate: string;
  entryDate: string;
  outDate?: string;
  ownerId: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  apartmentId?: string;
}

export class TenantEntity {
  constructor(private readonly props: TenantProps) {}

  toJSON() {
    return this.props;
  }
}
