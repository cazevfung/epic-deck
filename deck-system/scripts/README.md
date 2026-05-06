# Scripts Structure

## Why TypeScript Exists

The TypeScript layer exists to make content structure explicit and eventually validate inputs before pages are assembled.

It should stay lightweight and practical.

## Initial Responsibilities

- define page template IDs,
- define page brief structure,
- define required fields by page type,
- create a path for validation tooling later.

## Suggested Growth Path

### Step 1

Keep shared types and schemas in this folder.

### Step 2

Add validation scripts that flag:

- missing takeaway,
- too many bullets,
- missing sources,
- unsupported template IDs.

### Step 3

If needed, use the validated structure to support templated page generation.
