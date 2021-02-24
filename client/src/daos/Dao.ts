export interface IDao<T> {
  getOne: (id: string) => Promise<T | null>,
  // getAll: () => Promise<T[]>,
  addOne: (content: T, id: string | null) => Promise<void>,
  // upsertOne: (content: T, id: string | null) => Promise<void>,
  // updateOne: (id: string, update: Record<string, unknown>) => Promise<void>,
  // deleteOne: (id: string) => Promise<void>
}