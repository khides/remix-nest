import { glob } from "glob";
import fs from "fs-extra";
import path from "path";

async function run() {
  const { replaceInFile } = await import("replace-in-file");

  // 除外するファイルのパターンを設定
  const ignorePatterns = [
    "websocket/server.ts",
    "websocket/supabaseExtension.ts",
  ];

  const options = {
    files: "app/**/*.{ts,tsx}",
    from: /import\s+(.*?)\s+from\s+["'](\.{1,2}\/.*)["']/g,
    to: (match, p1, p2, offset, string) => {
      const currentDir = path.dirname(string);
      const absolutePath = path.resolve(currentDir, p2);
      const relativePathFromApp = path.relative(
        path.resolve("app"),
        absolutePath
      );
      return `import ${p1} from "~/${relativePathFromApp}"`;
    },
  };

  try {
    const files = await glob("app/**/*.{ts,tsx}", { ignore: ignorePatterns });
    for (const file of files) {
      const results = await replaceInFile({
        files: file,
        from: options.from,
        to: (match, p1, p2) => {
          const currentDir = path.dirname(file);
          const absolutePath = path.resolve(currentDir, p2);
          const relativePathFromApp = path.relative(
            path.resolve("app"),
            absolutePath
          );
          return `import ${p1} from "~/${relativePathFromApp}"`;
        },
      });
      console.log(`Updated ${file}`);
    }
  } catch (err) {
    console.error(err);
  }
}

run();
