#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { exec } from "child_process";

const server = new McpServer({
  name: "shell-server",
  version: "1.0.0",
});

server.tool(
  "execute_command",
  "Run a shell command and return stdout, stderr, and exit code",
  {
    command: z.string().describe("The shell command to execute"),
  },
  async ({ command }) => {
    return new Promise((resolve) => {
      exec(command, { timeout: 30000 }, (error, stdout, stderr) => {
        resolve({
          content: [
            {
              type: "text",
              text: JSON.stringify({
                stdout: stdout.toString(),
                stderr: stderr.toString(),
                exitCode: error?.code ?? 0,
              }),
            },
          ],
        });
      });
    });
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main();
