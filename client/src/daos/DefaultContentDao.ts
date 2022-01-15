import { db } from '../libs';
import { GitFileInfo } from "../interfaces";
import { IDao } from "./Dao";

export class DefaultContentDao implements IDao<GitFileInfo> {
  ref: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
  languageRef!: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;

  constructor(language: string) {
    this.ref = db.collection('default_content');
    this.setLanguage(language);
  }

  setLanguage(language: string) {
    this.languageRef = this.ref.doc(language).collection('contents');
  }

  async getOne(id: string) {
    if (!this.languageRef) {
      throw new Error('No language set to query');
    }
    const c = await this.languageRef!.doc(id).get();
    if (c.exists) {
      const content = {
        ...c.data()
      } as GitFileInfo;
      return content;
    }
    throw new Error('Invalid ID');
  }

  async addOne(content: GitFileInfo, id: string | undefined) {
    if (!this.languageRef) {
      throw new Error('No language set to query');
    }
    if (id) {
      this.languageRef.doc(id).set(content);
    }
    else {
      this.languageRef.add(content);
    }
  }

}