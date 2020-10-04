export interface IRepositoriesData {
  total: number;
  data: IRepository[];
}

export interface IRepositoriesState {
  data: IRepository[] | [];
  total: number;
  isLoading: boolean;
  error: string | null;
}

export interface IRepository {
  name: string;
  html_url: string;
  description: string;
  created_at: string;
  avatar_url: string;
  type: string;
  login: string;
  stargazers_count: number;
  id: number;
}

export interface IRepositoriesQuery {
  date?: string;
  language?: string;
  sort?: string;
  order?: string;
  page?: number;
  perPage?: number;
}