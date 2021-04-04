export interface GitRepository {
  full_name: string,
  id: string,
  owner: {
      avatar_url: string,
      login: string,
  },
  html_url: string,
  language?: keyof typeof LANGUAGES
}

export interface GitFile {
  url: string,
  name: string,
  path: string,
  repository: GitRepository
}

export interface GitFileURLs {
  download_url: string
}

export enum LANGUAGES {
  typescript = 'typyscript',
  javascript = 'javascript',
  java = 'java',
  rust = 'rust',
  python = 'python',
  php = 'php',
  go = 'go',
  'c++' = 'c++'
}

export interface GitFileInfo {
  repo_name: string,
  url: string,
  owner: GitRepository['owner'],
  html_url: string,
  path: string
  content: string
}

export interface FormValues {
  email?: string,
  password?: string,
  verifyPassword?: string,
  name?: string,
}
export interface IUser {
  uid?: string,
  name: string,
  email: string,
  wpm: number[],
  cpm: number[],
  acc: number[],
  tests: number
}
export class User implements IUser {
  uid: string | undefined;
  name: string;
  email: string;
  wpm: number[];
  cpm: number[];
  acc: number[];
  tests: number;

  constructor(email: string, name: string, uid?: string | undefined) {
    this.name = name;
    this.email = email;
    this.wpm = [];
    this.cpm = [];
    this.acc = [100];
    this.tests = 0;
    this.uid = uid ? uid : undefined;
  }
}

export interface IAuthToken {
    uid: string | null,
    idToken: string | null
}

export class AuthToken implements IAuthToken {
    constructor(public uid: string | null, public idToken: string | null) {
        this.uid = uid;
        this.idToken = idToken;
    }
}
