import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { ClickUpFunctionDef } from "../functions/clickup.ts";

const ClickUpWorkflowDef = DefineWorkflow({
  callback_id: "clickup_workflow",
  title: "ClickUp Workflow",
  input_parameters: {
    properties: {
      channel: {
        type: Schema.slack.types.channel_id,
      },
      customer_id: {
        type: Schema.slack.types.user_context.id,
      },
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
    },
    required: [
      "channel",
      "requestType",
      "project",
      "environment",
      "impact",
      "title",
      "customer_id",
    ],
  },
});

const createTicketStep = ClickUpWorkflowDef.addStep(ClickUpFunctionDef, {
  customer_id: "123",
  requestType: "FEATURE",
  project: "Other",
  environment: "Not sure",
  impact: "HIGH",
  title: "",
  apiType: "",
  apiPayload: "",
  apiResponse: "",
  channel: "",
});

ClickUpWorkflowDef.addStep(Schema.slack.functions.SendMessage, {
  channel_id: ClickUpWorkflowDef.inputs.channel,
  message: createTicketStep.outputs.message,
});

export default ClickUpWorkflowDef;
