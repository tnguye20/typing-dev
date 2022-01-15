export interface IDao<T> {
  getOne: (id: string) => Promise<T | undefined>,
  // getAll: () => Promise<T[]>,
  get?: () => Promise<T>,
  addOne: (content: T, id: string | undefined) => Promise<void>,
  // upsertOne: (content: T, id: string | null) => Promise<void>,
  // updateOne: (id: string, update: Record<string, unknown>) => Promise<void>,
  // deleteOne: (id: string) => Promise<void>
}