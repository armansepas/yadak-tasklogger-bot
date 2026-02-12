# Task 16: Off-Day Reminder Scheduling

## Overview

Implement automatic off-day reminder scheduling using the job scheduler.

## Core Logic

- Detect Iranian weekends (Thursday/Friday)
- Create reminder jobs for off-days
- Jobs are scheduled to send reminder messages

## Relations to Code Files

- /src/app/scheduler/reminders.ts - Reminder job creation
- /src/app/services/jobService.ts

## Steps

1. Implement Iranian weekend detection
2. Create function to schedule off-day reminders
3. Set up recurring job creation
4. Handle reminder message sending

## Checklist

- [ ] Weekend detection working
- [ ] Reminder jobs created
- [ ] Reminders sent on off-days
- [ ] Jobs scheduled correctly
