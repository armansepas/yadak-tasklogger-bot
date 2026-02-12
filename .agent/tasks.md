# Project Tasks

A numbered list of tasks to build the yadak-tasklog-bot from initialization to full feature implementation.

Each task has its own file under `.agent/tasks/` folder with detailed breakdown.

---

## Phase 1: Project Initialization & Setup

| #   | Task                                           | File                                                               |
| --- | ---------------------------------------------- | ------------------------------------------------------------------ |
| 1   | Read and understand package.json and README.md | [01-project-initialization.md](tasks/01-project-initialization.md) |
| 2   | Set up environment variables in .env           | [02-env-setup.md](tasks/02-env-setup.md)                           |
| 3   | Create project folder structure                | [03-folder-structure.md](tasks/03-folder-structure.md)             |

---

## Phase 2: Database Layer

| #   | Task                                | File                                                 |
| --- | ----------------------------------- | ---------------------------------------------------- |
| 4   | Create drizzle schema with 5 tables | [04-database-schema.md](tasks/04-database-schema.md) |
| 5   | Run database migrations             | [05-db-migrations.md](tasks/05-db-migrations.md)     |

---

## Phase 3: Bot Core Setup

| #   | Task                                       | File                                               |
| --- | ------------------------------------------ | -------------------------------------------------- |
| 6   | Initialize grammY bot with token and proxy | [06-bot-core-setup.md](tasks/06-bot-core-setup.md) |

---

## Phase 4: Middleware & Access Control

| #   | Task                                    | File                                                                     |
| --- | --------------------------------------- | ------------------------------------------------------------------------ |
| 7   | Implement middleware for access control | [07-middleware-access-control.md](tasks/07-middleware-access-control.md) |
| 8   | Implement Group Discovery Flow          | [08-group-discovery-flow.md](tasks/08-group-discovery-flow.md)           |

---

## Phase 5: Super Admin Commands

| #   | Task                         | File                                               |
| --- | ---------------------------- | -------------------------------------------------- |
| 9   | Implement all admin commands | [09-admin-commands.md](tasks/09-admin-commands.md) |

---

## Phase 6: Group Commands & Start/Finish Work

| #   | Task                                 | File                                                                         |
| --- | ------------------------------------ | ---------------------------------------------------------------------------- |
| 10  | Implement /start and inline keyboard | [10-group-commands-start-finish.md](tasks/10-group-commands-start-finish.md) |
| 11  | Start/Finish Work message formatting | [11-start-finish-messages.md](tasks/11-start-finish-messages.md)             |

---

## Phase 7: Daily Report (Azure DevOps Integration)

| #   | Task                        | File                                                           |
| --- | --------------------------- | -------------------------------------------------------------- |
| 12  | Create Azure DevOps service | [12-azure-devops-service.md](tasks/12-azure-devops-service.md) |
| 13  | PAT token management        | [13-pat-token-management.md](tasks/13-pat-token-management.md) |
| 14  | Daily Report button handler | [14-daily-report-handler.md](tasks/14-daily-report-handler.md) |

---

## Phase 8: Scheduler

| #   | Task                                  | File                                                   |
| --- | ------------------------------------- | ------------------------------------------------------ |
| 15  | Implement job scheduler (60s polling) | [15-scheduler.md](tasks/15-scheduler.md)               |
| 16  | Off-day reminder scheduling           | [16-offday-reminders.md](tasks/16-offday-reminders.md) |

---

## Phase 9: Message Management

| #   | Task                             | File                                                       |
| --- | -------------------------------- | ---------------------------------------------------------- |
| 17  | Bot message tracking and cleanup | [17-message-management.md](tasks/17-message-management.md) |

---

## Phase 10: Bot Startup

| #   | Task                    | File                                         |
| --- | ----------------------- | -------------------------------------------- |
| 18  | Create main entry point | [18-bot-startup.md](tasks/18-bot-startup.md) |

---

## Task File Format

Each task file follows this structure:

```markdown
# Task XX: Title

## Overview

Brief description of the task

## Core Logic

Key implementation details

## Relations to Code Files

Files that will be created or modified

## Steps

Step-by-step implementation guide

## Checklist

Checklist of subtasks to complete
```

---

## Total Tasks: 18
