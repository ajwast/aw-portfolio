export interface User {
  username: string;
  password: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  link: string;
  image: string;
}

export interface ProjectIn {
  name: string;
  description: string;
  link: string;
  image: string;
}
