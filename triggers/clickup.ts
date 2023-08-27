// Contents of ./triggers/hello_world.ts
import { Trigger } from "deno-slack-sdk/types.ts";
import { TriggerTypes } from "deno-slack-api/mod.ts";
import HelloWorldWorkflow from "../workflows/clickup.ts";

const trigger: Trigger<typeof HelloWorldWorkflow.definition> = {
  type: TriggerTypes.Shortcut,
  name: "Reverse a string",
  description: "Starts the workflow to reverse a string",
  workflow: `#/workflows/${HelloWorldWorkflow.definition.callback_id}`,
  inputs: {
    channel: {
      value: HelloWorldWorkflow.inputs.channel,
    },
    customer_id: {
      value: HelloWorldWorkflow.inputs.customer_id,
    },
    requestType: {
      value: HelloWorldWorkflow.inputs.requestType,
    },
    project: {
      value: HelloWorldWorkflow.inputs.project,
    },
    environment: {
      value: HelloWorldWorkflow.inputs.environment,
    },
    impact: {
      value: HelloWorldWorkflow.inputs.impact,
    },
    title: {
      value: HelloWorldWorkflow.inputs.title,
    },
    apiType: {
      value: HelloWorldWorkflow.inputs.apiType,
    },
    apiPayload: {
      value: HelloWorldWorkflow.inputs.apiPayload,
    },
    apiResponse: {
      value: HelloWorldWorkflow.inputs.apiResponse,
    },
  },
};

export default trigger;
