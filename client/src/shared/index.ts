const EXTENSION_MAP = {
  'typescript': 'ts',
  'javascript': 'js',
  'java': 'java',
  'html': 'html',
  'python': 'py',
  'php': 'php',
  'rust': 'rs'
}
const CODE_SAMPLE_MAP = {
  'typescript': `
    const func = (): void => {
      console.log("Hello World!");
    }
  `,
  'javascript': `
    const func = () => {
      console.log("Hello World!");
    }
  `,
  'java': `
    public static void func() {
      System.out.println("Hello World!");
    }
  `,
  'html': `
    <div>
       <p>Hello World!</p>
    </div>
  `,
  'python': `
    def func:
      print("Hello World!")

  `,
  'php': `
    <?php
      echo "Hello World!";
    ?>
  `,
  'rust': `
    fn main() {
        println!("Hello World!");
    }
  `
}

const config = {
  CODE_SAMPLE_MAP,
  EXTENSION_MAP,
  CHUNK: process.env.NODE_ENV === 'production' ? 11: 5,
  DEFAULT_PATHS: {
    typescript: [
      {
        repo_name: 'Sairyss/domain-driven-hexagon',
        url: 'https://raw.githubusercontent.com/Sairyss/domain-driven-hexagon/master/src/main.ts',
        owner: {
          avatar_url: 'https://avatars.githubusercontent.com/u/42232541?s=460&u=b1867702021ddbc1f4bad4e2bed7036b7c34a307&v=4',
          login: 'Sairyss'
        },
        html_url: 'https://github.com/Sairyss/domain-driven-hexagon',
        path: 'src/main.ts'
      },
      {
        repo_name: 'pavlobu/deskreen',
        url: 'https://raw.githubusercontent.com/pavlobu/deskreen/master/app/utils/installExtensions.ts',
        owner: {
          avatar_url: 'https://avatars.githubusercontent.com/u/42232541?s=460&u=b1867702021ddbc1f4bad4e2bed7036b7c34a307&v=4',
          login: 'pavlobu'
        },
        html_url: 'https://github.com/pavlobu/deskreen',
        path: 'app/utils/installExtensions.ts'
      },
      {
        repo_name: 'Nault/Nault',
        url: 'https://raw.githubusercontent.com/Nault/Nault/master/src/app/pipes/account.pipe.ts',
        owner: {
          avatar_url: 'https://avatars.githubusercontent.com/u/68386746?s=200&v=4',
          login: 'Nault'
        },
        html_url: 'https://github.com/Nault/Nault',
        path: 'src/app/pipes/account.pipe.ts'
      }
    ],
    javascript: [
      {
        repo_name: 'firebase/functions-sample',
        url: 'https://raw.githubusercontent.com/firebase/functions-samples/master/bigquery-import/functions/index.js',
        owner: {
          avatar_url: 'https://avatars.githubusercontent.com/u/1335026?s=200&v=4',
          login: 'firebase'
        },
        html_url: 'https://github.com/firebase/functions-samples',
        path: 'bigquery-import/functions/index.js'
      },
      {
        repo_name: 'firebase/functions-sample',
        url: 'https://raw.githubusercontent.com/firebase/functions-samples/master/exif-images/functions/index.js',
        owner: {
          avatar_url: 'https://avatars.githubusercontent.com/u/1335026?s=200&v=4',
          login: 'firebase'
        },
        html_url: 'https://github.com/firebase/functions-samples',
        path: 'exif-images/functions/index.js'
      },
      {
        repo_name: 'firebase/functions-sample',
        url: 'https://raw.githubusercontent.com/firebase/functions-samples/master/authorized-https-endpoint/functions/index.js',
        owner: {
          avatar_url: 'https://avatars.githubusercontent.com/u/1335026?s=200&v=4',
          login: 'firebase'
        },
        html_url: 'https://github.com/firebase/functions-samples',
        path: 'authorized-https-endpoint/functions/index.js'
      },
    ],
    java: [

    ],
    rust: [

    ],
    python: [

    ],
    html: [

    ],
    php: [

    ]
  }
}

export {
  config
};