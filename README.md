# mcp-shell-server

MCP server that exposes shell command execution. Any MCP client can connect and run arbitrary shell commands, getting back stdout, stderr, and exit code.

## Why

Claude Desktop's built-in MCP shell server has issues on Windows. This is a standalone replacement that works reliably.

## Install

```
npm install -g mcp-shell-server
```

## Configure Claude Desktop

Ask Claude Desktop (requires filesystem MCP plugin):

> Add an MCP server called "shell-server" with command "mcp-shell-server" to your Claude Desktop config

Or manually add `mcpServers` to your Claude Desktop config file:

```json
{
  "mcpServers": {
    "shell-server": {
      "command": "mcp-shell-server"
    }
  }
}
```

Restart Claude Desktop after configuring.

### Ensure Claude prefers this server

In Claude Desktop, tell Claude to remember:

> Always use shell-server:execute_command for running shell commands, not the built-in Windows MCP shell.

This adds it to Claude Desktop's memory so it persists across conversations.
