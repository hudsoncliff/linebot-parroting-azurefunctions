import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import {
  Client,
  ClientConfig,
  MessageEvent,
  TextEventMessage,
  TextMessage,
  WebhookRequestBody,
} from "@line/bot-sdk";

const config: ClientConfig = {
  channelAccessToken: process.env["LINE_CHANNEL_ACCESS_TOKEN"] as string,
  channelSecret: process.env["LINE_CHANNEL_SECRET"] as string,
};

const client = new Client(config);

export async function linebotHttpTrigger(
  req: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${req.url}"`);
  const body = await req.text();

  const parseBody = JSON.parse(body) as WebhookRequestBody;
  if (Object.keys(parseBody).length === 0) {
    return {
      status: 400,
    };
  }

  const event = parseBody.events[0] as MessageEvent;

  if (event.type == "message" || (parseBody && event)) {
    console.dir(event);
    const message = event.message as TextEventMessage;
    const textMessage: TextMessage = {
      type: "text",
      text: message.text,
    };
    if (event.replyToken) {
      await client.replyMessage(event.replyToken, textMessage);
    }
  }
  return {
    status: 200,
  };
}

app.http("linebotHttpTrigger", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: linebotHttpTrigger,
});
