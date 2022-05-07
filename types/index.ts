export interface Movie {
  title: string;
  photoUrL: string;
  id: string;
}

export interface Category {
  id: string;
  items: Movie[];
  title: string;
}
