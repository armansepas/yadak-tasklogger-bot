# Task 01: Project Initialization & Understanding

## Overview

Initialize the project by setting up Bun, Drizzle, Git, and understanding the existing codebase.

## Core Logic

- Check if Bun.js runtime is available
- Initialize Git repository if not already initialized
- Read package.json to understand project dependencies
- Check README.md for setup instructions
- Identify the project entry point and structure

## Relations to Code Files

- package.json
- README.md
- .git/ (if exists)

## Steps

1. Check Bun.js version and availability
2. Initialize Git repository if not exists (`git init`)
3. Read package.json to understand dependencies:
   - grammy (Telegram bot library)
   - drizzle-orm (Database ORM)
   - dotenv (Environment configuration)
4. Read README.md for setup and usage instructions
5. Identify source files in /src directory
6. Install dependencies: `bun install`

## Checklist

- [x] Bun.js verified and available
- [x] Git repository initialized
- [x] package.json read and dependencies understood
- [x] README.md read
- [x] Dependencies installed with `bun install`
- [x] Project structure identified
