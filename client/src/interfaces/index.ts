export interface GitRepository {
  full_name: string,
  id: string,
  owner: {
      avatar_url: string,
      login: string,
  },
  html_url: string
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
  // html = 'html',
  php = 'php'
}

export interface GitFileInfo {
  repo_name: string,
  url: string,
  owner: GitRepository['owner'],
  html_url: string,
  path: string
  content: string
}