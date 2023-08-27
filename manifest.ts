import { Manifest } from "deno-slack-sdk/mod.ts";
import ClickUpWorkflowDef from "./workflows/clickup.ts";

export default Manifest({
  name: "Clickup",
  description: "Clickup webhook",
  icon: "assets/logo.png",
  workflows: [ClickUpWorkflowDef],
  outgoingDomains: ["api.clickup.com"],
  botScopes: ["chat:write", "chat:write.public"],
});
