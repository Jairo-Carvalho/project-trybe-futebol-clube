export interface ICRUDModelCreator<T> {
  create(data: Omit<T, 'id'>): Promise<T>,
}

export interface ICRUDModelReader<T> {
  findAll?(): Promise<T[]>,
  findById?(id: number): Promise<T | null>,
}

export interface ICRUDModelLogin<T> {
  findOne(email: string): Promise<T | null>,
}

export interface ICRUDModelUpdater<T> {
  update(id: number, data: Partial<T>): Promise<T | null>,
}

export interface ICRUDModelDeleter {
  delete(id: number): Promise<number>,
}

export interface ICRUDModel<T>
  extends
  ICRUDModelCreator<T>,
  ICRUDModelReader<T>,
  ICRUDModelUpdater<T>,
  ICRUDModelLogin<T>,
  ICRUDModelDeleter { }
