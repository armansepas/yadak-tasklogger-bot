# Task 15: Job Scheduler

## Overview

Implement database-backed job scheduler that polls for due jobs every 60 seconds.

## Core Logic

- Poll Job table every 60 seconds
- Execute jobs when dueAt <= now
- Delete completed jobs after execution
- Must be restart-safe (track executing jobs)
- Used for off-day reminders

## Relations to Code Files

- /src/app/scheduler/index.ts - Scheduler main loop
- /src/app/scheduler/worker.ts - Job execution logic
- /src/app/services/jobService.ts - Job CRUD operations

## Steps

1. Create scheduler polling loop
2. Implement job fetching by due time
3. Implement job execution logic
4. Add restart safety (track executing jobs)
5. Delete completed jobs after execution

## Checklist

- [ ] Scheduler polling every 60 seconds
- [ ] Jobs executed when due
- [ ] Completed jobs deleted
- [ ] Restart-safe implementation
- [ ] Error handling for failed jobs
