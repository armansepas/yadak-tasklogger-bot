# Task 03: Create Project Folder Structure

## Overview

Create the modular folder structure for the project following the simplicity and modularity principles.

## Core Logic

- Create dedicated folders for different concerns
- Each folder should have a single responsibility
- Large folders should have README.md explaining purpose

## Relations to Code Files

- /src/app/ - Application code
- /src/app/bot/ - Bot handlers and middleware
- /src/app/db/ - Database layer
- /src/app/scheduler/ - Job scheduler
- /src/app/services/ - Business logic services
- /src/app/utils/ - Utility functions

## Steps

1. Create /src/app directory
2. Create subdirectories: bot, db, scheduler, services, utils
3. Create README.md in each folder explaining its purpose

## Checklist

- [x] /src/ folder exists with proper structure
- [x] /src/bot/ folder created with README.md
- [x] /src/db/ folder created with README.md
- [x] /src/scheduler/ folder created with README.md
- [x] /src/services/ folder created with README.md
- [x] /src/utils/ folder created with README.md
