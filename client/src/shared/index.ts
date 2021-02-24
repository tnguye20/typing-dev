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
  MAX_RANDOM_RECORDS: 100,
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
      {
        repo_name: 'airbytehq/airbyte',
        url: 'https://raw.githubusercontent.com/airbytehq/airbyte/master/airbyte-db/src/main/java/io/airbyte/db/Database.java',
        owner: {
          avatar_url: 'https://avatars.githubusercontent.com/u/59758427?s=200&v=4',
          login: 'airbytehq'
        },
        html_url: 'https://github.com/airbytehq/airbyte',
        path: 'airbyte-db/src/main/java/io/airbyte/db/Database.java'
      },
    ],
    rust: [
      {
        repo_name: 'rustcc/writing-an-os-in-rust',
        url: 'https://raw.githubusercontent.com/rustcc/writing-an-os-in-rust/master/dummy.rs',
        owner: {
          avatar_url: 'https://avatars.githubusercontent.com/u/9246834?s=200&v=4',
          login: 'rustcc'
        },
        html_url: 'https://github.com/rustcc/writing-an-os-in-rust',
        path: 'dummy.rs'
      },
      {
        repo_name: 'project-oak/oak',
        url: 'https://raw.githubusercontent.com/project-oak/oak/main/sdk/rust/oak/src/io/sender.rs',
        owner: {
          avatar_url: 'https://avatars.githubusercontent.com/u/43030739?s=200&v=4',
          login: 'project-oak'
        },
        html_url: 'https://github.com/project-oak/oak',
        path: 'sdk/rust/oak/src/io/sender.rs'
      },
      {
        repo_name: 'invertase/react-native-firebase',
        url: 'https://raw.githubusercontent.com/invertase/react-native-firebase/8916e19c6631d6e2c18ba18a1b86f906fa0c0077/packages/database/e2e/reference/push.e2e.js',
        owner: {
          avatar_url: 'https://avatars.githubusercontent.com/u/13588260?s=200&v=4',
          login: 'invertase'
        },
        html_url: 'https://github.com/invertase/react-native-firebase',
        path: 'packages/database/e2e/reference/push.e2e.js'
      },
    ],
    python: [
      {
        repo_name: 'google/model_search',
        url: 'https://raw.githubusercontent.com/google/model_search/master/model_search/utils.py',
        owner: {
          avatar_url: 'https://avatars.githubusercontent.com/u/1342004?s=200&v=4',
          login: 'google'
        },
        html_url: 'https://github.com/google/model_search',
        path: 'model_search/utils.py'
      },
    ],
    // html: [

    // ],
    php: [
      {
        repo_name: 'laravel/framework',
        url: 'https://raw.githubusercontent.com/laravel/framework/8.x/src/Illuminate/Auth/CreatesUserProviders.php',
        owner: {
          avatar_url: 'https://avatars.githubusercontent.com/u/958072?s=200&v=4',
          login: 'laravel'
        },
        html_url: 'https://github.com/laravel/framework',
        path: '8.x/src/Illuminate/Auth/CreatesUserProviders.php'
      },
    ]
  }
}

export {
  config
};