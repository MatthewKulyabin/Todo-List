export interface TaskAttributes {
  title: string;
  description: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
  publishedAt?: Date;
  id?: number;
}

export interface TaskInterface {
  id: number;
  attributes: TaskAttributes;
}
