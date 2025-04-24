import fs from "fs";
import { parse } from "yaml";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// YAMLファイルからユーザー情報を読み込む関数
function getUserFromYAML(filePath: string) {
  const file = fs.readFileSync(filePath, "utf8"); // YAMLファイルを読み込む
  const user = parse(file); // YAMLファイルをパース
  return user as { id: string; email: string };
}

// JWTを生成する関数
function generateJWT(user: { id: string; email: string }) {
  const payload = {
    sub: user.id,
    email: user.email,
    aud: "authenticated",
  };

  // 環境変数から秘密鍵を取得
  const secret = process.env.SUPABASE_AUTH_JWT_SECRET || "your-secret-key";

  // JWTのオプション設定
  const options = {
    expiresIn: "365d", // トークンの有効期限を1年間に設定
  };

  // トークンの生成
  const token = jwt.sign(payload, secret, options);
  return token;
}

// YAMLファイルからユーザー情報を取得し、JWTを生成
const user = getUserFromYAML("auth.mock.yaml");
const token = generateJWT(user);
console.log("Generated JWT:", token);
