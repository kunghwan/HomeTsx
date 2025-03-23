interface User {
  email: string;
  password: string;
  newPassword: string;
  uid?: string;
  name: string;
  error?: string;
  success?: string;
}

interface Loading {
  error: string;
  loading: boolean;
  data: DataItem;
}

interface DataItem {
  id: string;
  name: string;
}
