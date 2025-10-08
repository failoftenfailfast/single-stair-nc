# Sanity.io MCP Server Setup

The Sanity.io MCP (Model Context Protocol) server has been installed and configured for this project.

## What's Installed

- `@sanity/mcp-server@0.12.1` - The official Sanity.io MCP server package
- `mcp-server.json` - Configuration file for MCP server setup
- `mcp-server` script in package.json for easy execution

## Setup Requirements

Before running the MCP server, you need to:

1. **Create a `.env` file** from `env.example` and fill in your Sanity project details:
   ```bash
   cp env.example .env
   ```

2. **Configure your Sanity project credentials** in the `.env` file:
   ```env
   SANITY_PROJECT_ID=your_actual_project_id
   SANITY_DATASET=your_dataset_name
   SANITY_API_TOKEN=your_api_token_with_read_permissions
   ```

## How to Run the MCP Server

### Option 1: Using npm script (recommended)
```bash
npm run mcp-server
```

### Option 2: Direct execution
```bash
node node_modules/@sanity/mcp-server/dist/index.js
```

### Option 3: Using the configuration file
The `mcp-server.json` file can be used with MCP-compatible clients.

## Environment Variables Required

The MCP server needs these environment variables to connect to your Sanity project:

- `SANITY_PROJECT_ID` - Your Sanity project ID
- `SANITY_DATASET` - Your dataset name (usually "production")
- `SANITY_API_TOKEN` - API token with read permissions

## What the MCP Server Provides

Once running, the MCP server allows AI assistants to:

- Query your Sanity content
- Access document schemas
- Perform content searches
- Retrieve asset information
- Access project configuration

This enables more intelligent interactions with your Sanity CMS content directly from AI assistants that support the MCP protocol.
