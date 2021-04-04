import { db } from '../libs';
import { User } from "../interfaces";
import { IDao } from "./Dao";

export class UserDao implements IDao<User> {
  ref: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
  userRef!: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;

  constructor(uid?: string) {
    this.ref = db.collection('users');
    if (uid) {
      this.userRef = this.ref.doc(uid);
    }
  }

  async getOne(uid: string) {
    const c = await this.ref.doc(uid).get();
    if (c.exists) {
      const user = {
        ...c.data()
      } as User;
      return user;
    }
    throw new Error('Invalid ID');
  }

  async get() {
    if (!this.userRef) {
      throw new Error('No user set to query');
    }
    const c = await this.userRef.get();
    if (c.exists) {
      const user = {
        ...c.data()
      } as User;
      return user;
    }
    throw new Error('Invalid ID');
  }

  async addOne(newUser: User, uid?: string) {
    if (this.userRef && !uid) {
      this.userRef.set({ ...newUser });
    }
    else {
      this.ref.doc(uid).set({ ...newUser });
    }
  }

  async updateOne(uid: string, data: Record<string, any>) {
    if (!this.userRef) {
      this.userRef = this.ref.doc(uid);
    }
    this.userRef.update({ ...data });
  }
  async update(data: Record<string, any>) {
    this.userRef.update({ ...data });
  }
}