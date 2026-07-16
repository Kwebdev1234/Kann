# Case Study — Building Kann

## Overview

Kann was built as a learning project to understand how modern workflow automation platforms like Zapier and n8n are architected.

Instead of cloning the UI, the goal was to understand the engineering challenges behind authentication, workflow orchestration, AI integrations, asynchronous execution, billing, and production deployment.
Before Kann, I had extensive frontend experience. Building Kann gave me practical exposure to authentication, event-driven workflows and background processing. It changed how I approach system design by encouraging modularity and clear separation of concerns.

---

# Problem Statement

Modern businesses use dozens of SaaS products.

Moving information between those systems usually requires manual work or expensive automation platforms.

## Kann demonstrates how such a platform can be designed using modern web technologies.

# Goals

The primary goals were:

- Build production-grade SaaS platform
- Learn workflow execution engines
- Integrate multiple AI providers
- Learn event-driven architecture
- Understand SaaS billing
- Improve system design skills

---

# Architecture

Workflow execution follows this simplified flow:

```
Trigger

↓

Workflow

↓

Execution Engine

↓

Action Nodes

↓

External APIs

↓

Execution History
```

---

# Technical Challenges

## 1. OAuth Authentication Flickering

### Problem

After GitHub login the dashboard appeared briefly before the application redirected back to the login page.

The user eventually became authenticated but the experience looked broken.

### Root Cause

An authentication race condition.

The server-side route guard and client-side OAuth callback were both attempting to control navigation before the session had fully synchronized.

### Solution

- Unified redirect destinations
- Allowed the server auth guard to become the single source of truth
- Removed competing client-side navigation

Result:

Smooth authentication without visual flickering.

---

## 2. Billing Synchronization Failure

### Problem

OAuth login occasionally failed because Polar customer creation threw an error.

### Root Cause

Polar prevented updating an existing customer's immutable external ID.

### Solution

Deleted the stale customer record and allowed Better Auth to recreate the customer correctly.

---

## 3. Slow Navigation

### Problem

Switching between dashboard pages felt slow.

### Improvements

Implemented:

- Route prefetching
- React Query caching
- Loading overlays
- Reduced unnecessary refetches

Result:

Significantly improved perceived performance.

---

## 4. Workflow Execution

One challenge was keeping workflow execution modular.

Instead of tightly coupling triggers and actions, each node was designed to be independently executable, making future integrations much easier.

---

# Lessons Learned

Building Kann reinforced several software engineering principles:

- Authentication is often more difficult than expected.
- UX performance matters as much as raw speed.
- Type safety prevents entire classes of runtime bugs.
- Modular architecture makes future features easier to add.
- Production debugging requires understanding systems rather than individual components.

---

# Future Improvements

The project has a strong foundation and can be extended with:

- Slack
- Discord
- Gmail
- WhatsApp
- Scheduled workflows
- Conditional branching
- Parallel execution
- Retry policies
- Workflow marketplace

---

# Key Takeaways

This project significantly improved my understanding of:

- Full-stack architecture
- Authentication systems
- OAuth flows
- Workflow orchestration
- AI integrations
- Billing systems
- Event-driven programming
- Performance optimization
- Production debugging

More importantly, it strengthened my ability to diagnose complex engineering problems rather than simply implement features.
