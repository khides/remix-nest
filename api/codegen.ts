import { Project, Type } from "ts-morph";
import * as fs from "fs";
import * as path from "path";
// import { fileURLToPath } from "url";
// import { dirname } from "path";

// TypeScriptプロジェクトの設定
const project = new Project();
const schemaSourceFile = project.addSourceFileAtPath(
    "./src/__generated__/schema.ts"
); // `schema.ts`のパスを指定
// 現在のファイルの絶対パスを取得
// const __filename = fileURLToPath(import.meta.url);

// 現在のディレクトリの絶対パスを取得
// const __dirname = dirname(__filename);
console.log(__dirname);

// `public`スキーマの関数を取得する
const publicFunctions = schemaSourceFile
    .getTypeAliasOrThrow("Database")
    .getType()
    .getProperty("public")!
    .getTypeAtLocation(schemaSourceFile)
    .getProperty("Functions")!
    .getTypeAtLocation(schemaSourceFile)
    .getProperties();

// TypeScript型を文字列化してインターフェースを生成
function typeToInterface(type: Type, indent = 2): string {
    // `Json` 型の場合はそのまま 'Json' として返す
    if (
        type.getText() ===
        `import("${__dirname}/src/__generated__/schema").Json[]`
    ) {
        return "Json[]";
    }

    if (
        type.getText() ===
        `import("${__dirname}/src/__generated__/schema").Json`
    ) {
        return "Json";
    }

    // プリミティブ型の場合はそのまま返す
    if (
        type.isString() ||
        type.isNumber() ||
        type.isBoolean() ||
        (type.isUnion() && type.getUnionTypes().every((t) => t.isStringLiteral()))
    ) {
        return type.getText(); // string, number, booleanなどのプリミティブ型として返す
    }

    // 配列のケース
    if (type.isArray()) {
        return `${typeToInterface(type.getArrayElementTypeOrThrow())}[]`;
    }

    // オブジェクトのケース
    const properties = type.getProperties();
    const entries = properties.map((prop) => {
        const name = prop.getName();
        const propType = prop.getTypeAtLocation(schemaSourceFile);
        const isOptional = prop.isOptional() ? "?" : "";
        return `${name}${isOptional}: ${typeToInterface(propType)}`;
    });
    return `{\n${" ".repeat(indent)}${entries.join(
        `;\n${" ".repeat(indent)}`
    )}\n}`;
}

function generateInterface(
    name: string,
    argsType: Type,
    returnType: Type
): string {
    const pascalName = toPascalCase(name); // 名前を PascalCase に変換
    const transformType = (type: Type, suffix: string) => {
        if (
            type.getText() ===
            `import("${__dirname}/src/__generated__/schema").Json[]`
        ) {
            return `export type ${pascalName}${suffix} = Json[];`;
        } else if (
            type.getText() ===
            `import("${__dirname}/src/__generated__/schema").Json`
        ) {
            return `export type ${pascalName}${suffix} = Json;`;
        } else if (
            type.isString() ||
            type.isNumber() ||
            type.isBoolean() ||
            (type.isUnion() && type.getUnionTypes().every((t) => t.isStringLiteral()))
        ) {
            return `export type ${pascalName}${suffix} = ${type.getText()};`;
        } else if (type.isArray()) {
            return `export type ${pascalName}${suffix} = ${typeToInterface(type)};`;
        } else {
            return `export interface ${pascalName}${suffix} ${typeToInterface(type)}`;
        }
    };
    const argsInterface = transformType(argsType, "Request");
    const returnsInterface = transformType(returnType, "Response");

    return `${argsInterface}\n\n${returnsInterface}`;
}

// snake_case を PascalCase に変換する関数
function toPascalCase(snakeStr: string) {
    return snakeStr
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join("");
}

// インターフェース定義の生成
const interfaces = publicFunctions
    .map((func) => {
        const funcType = func.getTypeAtLocation(schemaSourceFile);
        const argsType = funcType
            .getProperty("Args")!
            .getTypeAtLocation(schemaSourceFile);
        const returnType = funcType
            .getProperty("Returns")!
            .getTypeAtLocation(schemaSourceFile);
        return generateInterface(func.getName(), argsType, returnType);
    })
    .join("\n\n");

// インポート文を追加
const outputContent = `import { Json } from './schema';\n\n${interfaces}`;

// 出力先ディレクトリとファイルパス
const outputPath = "./src/__generated__/supabase.interface.d.ts";
const outputDir = path.dirname(outputPath);

// ディレクトリが存在しない場合は作成
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// インターフェースをファイルに出力
fs.writeFileSync(outputPath, outputContent);

console.log(`Interfaces generated in ${outputPath}`);
