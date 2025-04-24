# Supabase

- [Local Development](https://supabase.com/docs/guides/cli/local-development)
- [Managing Environments](https://supabase.com/docs/guides/cli/managing-environments)
- [Seeding your database](https://supabase.com/docs/guides/cli/seeding-your-database)

## Environment Setup

packageのセットアップ

```bash
cd path/to/andtopic/supabase

rm -rf node_modules

npm i
```

## Execute

supabaseコンテナの立ち上げ
```bash
npx supabase start
```

supabaseコンテナの終了
```bash
npx supabase stop
```

migrationgファイルの生成
```bash
npx supabase db diff -f [migration名]
```

dbのリセット
```bash
npx supabase db reset
```

型定義ファイルの生成
```bash
npm run codegen
```

データのdump
```bash
npx supabase db dump --local --data-only > dump.sql
```

リモート環境の紐づけ
```bash
npx supabase link --project-url [project-url]
```

リモート環境と同期
```bash
npx supabase db reset --linked
```

## CLI

その他のコマンド

| Command                                         | Description                                                                |
|-------------------------------------------------|----------------------------------------------------------------------------|
| `supabase start`                                | Start the Supabase container                                               |
| `supabase stop`                                 | Stop the Supabase container                                                |
| `supabase stop --backup`                        | Stop the Supabase container and save the schema and data in tables         |
| `supabase db reset`                             | Revert to the state after the last migration                               |
| `supabase db diff -f [filename]`                | Save the local schema differences in a new migration file                  |
| `supabase db diff --linked -f [filename]`       | Save the server-side schema differences in a new migration file            |
| `supabase db remote commit -p [Database Password]` | Create a new migration file from changes in the server database           |
| `supabase db push -p [Database Password]`       | Send and apply new migrations to the server database                       |
| `supabase db push -p [Database Password] --dry-run` | Rehearse the db push command                                              |
| `supabase migration list`                       | View the status of local and server migrations                             |
| `supabase migration repair --status applied [timestamp]` | Apply the specified migration                                         |
| `supabase migration repair --status reverted [timestamp]` | Revert the specified migration to the pre-applied state (i.e., disable)  |

## References

- [official document](https://supabase.com/docs/guides/local-development?queryGroups=package-manager&package-manager=brew)
- [qiita article](https://qiita.com/masakinihirota/items/685f70770d8224ba2fa5)
