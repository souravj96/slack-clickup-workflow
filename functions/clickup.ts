import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
// import GetCustomerInfo from "../helper/get_customer_info.ts";

export const ClickUpFunctionDef = DefineFunction({
  callback_id: "clickup_function",
  title: "ClickUp",
  source_file: "functions/clickup.ts",
  input_parameters: {
    properties: {
      requestType: {
        type: Schema.types.string,
        description: "Type of the request",
      },
      project: {
        type: Schema.types.string,
        description: "Project name",
      },
      environment: {
        type: Schema.types.string,
        description: "Environment",
      },
      impact: {
        type: Schema.types.string,
        description: "Business impact",
      },
      title: {
        type: Schema.types.string,
        description: "Type of the request",
      },
      apiType: {
        type: Schema.types.string,
        description: "Type of the api",
      },
      apiPayload: {
        type: Schema.types.string,
        description: "API payload",
      },
      apiResponse: {
        type: Schema.types.string,
        description: "API response",
      },
      customer_id: {
        type: Schema.types.string,
        description: "The customer's ID",
      },
      channel: {
        type: Schema.types.string,
        description: "The channel ID",
      },
    },
    required: [
      "requestType",
      "project",
      "environment",
      "impact",
      "title",
      "customer_id",
      "channel",
    ],
  },
  output_parameters: {
    properties: {
      message: {
        type: Schema.types.string,
        description: "Hello world message",
      },
    },
    required: ["message"],
  },
});

export default SlackFunction(
  ClickUpFunctionDef,
  async ({ inputs, client }) => {
    let body = JSON.stringify({
      "name": `BE-${inputs.requestType}-${inputs.project}-${inputs.title}`,
      "description": `
        ${inputs.title}
        Requester: ${inputs.customer_id}
        Project: ${inputs.project}
        Environment: ${inputs.environment}
        Task type: ${inputs.requestType}
        Priority: ${inputs.impact}
        Api Type: ${inputs.apiType || ""}
        Payload: ${inputs.apiPayload || ""}
        Response: ${inputs.apiResponse || ""}
      `,
    });
    const response = await fetch(
      "https://api.clickup.com/api/v2/list/900200242115/task?team_id=37307048",
      {
        method: "POST",
        headers: {
          "Authorization":
            "61346127_18eeef231ab05cb2a2e1b9c5a158693026546fdc41bf6f9d74524a2e891cb7e8",
          "Content-Type": "application/json",
        },
        body,
      },
    );
    const status = response.status;
    if (status != 200) {
      const body = await response.text();
      const error = `DeepL API error (status: ${status}, body: ${body})`;
      return {
        outputs: {
          message: error,
        },
      };
    }
    const result = await response.json();
    if (!result || !result.url) {
      const error = `Failed to create the task`;
      return {
        outputs: {
          message: error,
        },
      };
    }
    await client.chat.postMessage({
      channel: inputs.channel,
      text: `🚀 Here you go with your clickup task 🌩  ${result.url}`,
    });
    return {
      outputs: {
        message: result.url,
      },
    };
  },
);
