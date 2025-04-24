# Welcome andtopic-app

📖 See the [Remix docs](https://remix.run/docs) and the [Remix Vite docs](https://remix.run/docs/en/main/future/vite) for details on supported features.

## Icon

- https://fonts.google.com/icons
- Size: 150
- Color: #5F6368
- Weight: 400-700
- Grade: 200
- Optical Size: 48px

## Log

```bash
docker compose -f docker-compose.yml -f ./.devcontainer/frontend/docker-compose.yml logs -f
```

## Format

```
npm run format
```

## Check package.json

```
npx depcheck
```

## Development

Run the Vite dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

## Shadcn UI

To add a Shadcn UI component, use the following command:

```bash
npx shadcn-ui@latest add <component_name>
```

This will add the component to the `app/components/ui` directory.

## Template

When you want to create a component file & a storybook file, you can use automation shell script.

```
    $ cmp.sh < component name > < option >
```

Options here :

```
    -a | --atoms : create an atom
    -m | --molecules : create a molecule
    -o | --organisms : create an organism
    -t | --templates : create a template
```

It can be executed in any directory, since the path is passed through the environment variable and permissions are granted.

The snippet is in /app/bin/snp and can be changed as needed.

For any other questions, please contact Matsushima.
