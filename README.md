# LINE BOT parroting with Azure Functions

## Development

### Start local server

`npm start`

Use ngrok to setup a public url and set it as the webhook url in your LINE developer console admin.

```yaml
ngrok http 7071
```

### Variables

Set your variables in `Values` at your `local.settings.json` file.

```yaml
LINE_CHANNEL_ACCESS_TOKEN #line channel access token
LINE_CHANNEL_SECRET #line channel channel secret
```
