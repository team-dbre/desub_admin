export interface Admin {
  role: 'Master' | 'Admin';
  email: string;
  name: string;
  phone: string;
  createdAt: string;
  passwordChangedAt: string;
  status: string;
}

export interface AdminFormData {
  id: string;
  password: string;
  name: string;
  phone: string;
}
