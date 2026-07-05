# GEMINI.md

# Marketing Workspace

## Project Overview

Marketing Workspace is an AI-powered Product Marketing Operating System (Marketing OS) that helps entrepreneurs, startups, e-commerce sellers, and businesses create a complete marketing workspace for individual products.

The platform is **not** an AI chatbot and **not** a company-wide marketing platform.

AI operates entirely behind the scenes through structured workflows.

The core entity of the platform is a **Product**.

Each Product represents a long-lived marketing project that progresses from onboarding to AI analysis, strategy generation, and marketing content creation.

---

# Core Philosophy

## Product First

Everything revolves around a Product.

A Product is **not** a CRUD entity.

A Product is a permanent marketing project.

Once created:

- Cannot be edited
- Cannot be deleted
- May be archived in future phases
- Always preserves generated AI outputs

This guarantees:

- Reproducible AI outputs
- Historical marketing reports
- Subscription abuse prevention
- Stable marketing workspace

---

## AI Philosophy

Users never directly communicate with AI.

There is:

- No chatbot
- No prompt box
- No conversations with AI

Instead users execute structured workflows.

Every AI interaction is orchestrated internally.

---

# Target Users

## Customer

Customers own Products directly.

Customers can:

- Create Products
- Complete onboarding wizard
- Upload product images
- Generate Marketing Workspace
- View Marketing Summary
- Generate Reports
- Generate Marketing Content
- Manage Billing
- Manage Settings

Customers cannot:

- Create Organizations
- Create Teams
- Create Workspaces

---

## Admin

Admins are managed by Super Admins.

Responsibilities:

- Customer Management
- Subscription Management
- AI Monitoring
- Analytics
- Support
- System Monitoring

---

## Super Admin

Full platform access.

Responsibilities:

- Admin Management
- Roles
- Permissions
- Subscription Plans
- Platform Configuration
- System Administration

---

# Subscription Plans

## Free

- 1 Product
- Full AI capabilities
- Marketing Summary
- Reports

Limitation:

Only number of Products.

AI capabilities are not restricted.

---

## Pro

$50/month

- Up to 10 Products per billing cycle
- Unlimited AI processing for owned Products
- Full Marketing Workspace
- Reports

Products count toward the monthly quota even if archived.

This prevents subscription abuse.

---

## Business

Future phase.

Reserved for enterprise capabilities.

---

# High-Level Architecture

```
User
│
├── Subscription
├── Products
└── Settings
```

There are **no**:

- Organizations
- Teams
- Workspaces

Products belong directly to Users.

---

# Product Lifecycle

```
Products List

↓

New Product Wizard

↓

Generate Marketing Workspace

↓

AI Workflow

↓

Marketing Summary

↓

Reports & Content
```

The Marketing Summary becomes the Product homepage.

---

# Products Page

Displays all Products owned by the customer.

Features:

- Search
- Filters
- Status
- Usage Counter
- New Product button

Product statuses:

- Draft (optional)
- Processing
- Completed
- Failed

Products cannot be edited or deleted.

---

# Product Creation Wizard

A multi-step onboarding experience.

## Step 1

Product Information

Fields:

- Product Name
- Category
- Description
- Features
- Price
- Unique Selling Points
- Product URL (optional)

---

## Step 2

Product Images

Uploads:

- Packaging
- Product Images
- Additional Images

---

## Step 3

Brand

Fields:

- Brand Name
- Brand Story
- Brand Voice
- Brand Personality
- Brand Values

---

## Step 4

Target Audience

Fields:

- Age
- Gender
- Interests
- Pain Points
- Buying Motivations
- Customer Information

---

## Step 5

Competitors

Fields:

- Known Competitors
- Competitor URLs
- Market References

AI expands research beyond provided inputs.

---

## Step 6

Business Goals

Examples:

- Increase Sales
- Launch Product
- Improve SEO
- Brand Awareness
- Social Media Growth
- Email Marketing

---

## Step 7

Target Market

Fields:

- Country
- Language
- Currency
- Target Regions

---

## Step 8

Review

Displays all collected information.

Confirmation button:

Generate Marketing Workspace

---

# Processing Experience

After confirmation:

```
Product Created

↓

Workflow Created

↓

Processing Screen

↓

Marketing Summary
```

The Processing Screen shows workflow progress while AI jobs execute.

---

# Product Structure

Each Product contains:

```
Product

├── Basic Information
├── Images
├── Brand
├── Audience
├── Competitors
├── Business Goals
├── Target Market

├── Product Analysis
├── Market Research
├── Competitor Analysis
├── Customer Personas
├── Positioning
├── Value Proposition
├── Marketing Strategy
├── SEO Strategy
├── Generated Content
├── Reports
└── AI Jobs
```

---

# Marketing Summary

The Marketing Summary is the Product workspace.

Sections:

- Product Overview
- Product Analysis
- Market Research
- Competitor Analysis
- Customer Personas
- Positioning
- Value Proposition
- Marketing Strategy
- SEO Strategy
- Generated Content
- Reports
- Workflow Status

---

# AI Architecture

```
Frontend

↓

API

↓

AI Orchestrator

↓

Workflow Engine

↓

Task Router

↓

AI Providers

↓

Database
```

Frontend never communicates directly with AI providers.

---

# AI Providers

## Vision Model

Responsibilities:

- Image Analysis
- OCR
- Packaging Analysis
- Product Feature Extraction
- Visual Insights

---

## Search Model

Responsibilities:

- Market Research
- Competitor Discovery
- SEO Research
- Trend Analysis

---

## Large Language Model

Responsibilities:

- Personas
- Positioning
- Value Proposition
- Marketing Strategy
- SEO Strategy
- Marketing Reports
- Landing Pages
- Product Descriptions
- Social Media Content
- Email Campaigns
- Advertising Copy

---

# AI Workflow

```
Create Product

↓

Analyze Images

↓

Extract Product Information

↓

Market Research

↓

Competitor Analysis

↓

Customer Personas

↓

Positioning

↓

Marketing Strategy

↓

SEO Strategy

↓

Content Generation

↓

Marketing Summary
```

Phase 1 does **not** include AI image generation.

---

# Workflow Engine

Every Product owns a Workflow.

Each Workflow contains dependent Jobs.

```
Workflow

├── Image Analysis
├── Product Extraction
├── Market Research
├── Competitor Analysis
├── Personas
├── Positioning
├── Strategy
├── SEO
├── Content
└── Final Report
```

Every Job:

- Stores status
- Stores result
- Supports retries
- Declares dependencies
- Executes automatically when dependencies are satisfied

Independent jobs may run in parallel.

The Workflow Engine handles scheduling.

---

# Phase 1 Features

## Marketing Website

- Landing Page
- Features
- How It Works
- Pricing
- FAQ
- About
- Contact
- Legal Pages
- SEO

---

## Authentication

- Register
- Login
- Email Verification
- Password Reset
- Protected Routes

---

## Customer Dashboard

- Dashboard
- Sidebar
- Header
- Notifications
- Profile
- Settings

---

## Product Management

- Products List
- Multi-step Wizard
- Product Creation
- Image Upload
- Workflow Status
- Marketing Summary

No editing or deletion after creation.

---

## Marketing Workspace

Each Product includes:

- Product Overview
- Product Analysis
- Market Research
- Competitor Analysis
- Personas
- Positioning
- Value Proposition
- Marketing Strategy
- SEO Strategy
- Generated Marketing Content
- Reports

---

## Reports

- Marketing Summary
- Previous Reports
- Export Reports

---

## Billing

- Subscription Management
- Usage Tracking
- Upgrade to Pro

---

## Admin Platform

- Dashboard
- Customer Management
- Admin Management
- Roles
- Permissions
- Subscription Management
- AI Monitoring
- Analytics
- System Configuration

---

# Deferred Features

Not included in Phase 1:

- AI Image Generation
- Product Mockups
- Ad Creatives
- Lifestyle Images
- Video Generation
- Organizations
- Teams
- Workspaces
- Collaboration
- Shopify Integration
- Amazon Integration
- Meta Integration
- Google Integration
- API Access
- Automation Workflows
- Prompt Management UI

---

# Monorepo Structure

```
apps/
├── marketing
├── app
└── admin

packages/
├── ai
├── api
├── auth
├── database
├── storage
├── ui
├── design-system
├── validation
├── types
├── hooks
├── utils
├── config
├── analytics
├── monitoring
├── email
├── billing
├── reports
└── workflows
```

---

# Development Roadmap

1. Foundation
2. Database & Security
3. Authentication
4. Storage & Billing
5. Customer Dashboard Shell
6. Products Module
7. Multi-step Wizard
8. AI Infrastructure
9. AI Marketing Modules
10. Marketing Summary
11. Reports
12. Marketing Website
13. Admin Platform
14. Monitoring
15. Testing
16. Production Deployment

---

# Security

Security principles apply across every layer.

Features:

- Supabase Authentication
- PostgreSQL Row-Level Security (RLS)
- Role-Based Access Control
- Secure Server Actions
- Secure APIs
- Input Validation
- AI Request Validation
- Private File Storage
- Rate Limiting
- Environment Secret Management
- Audit Logging
- Secure Billing Verification
- HTTPS
- Secure Cookies
- Principle of Least Privilege

---

# Development Principles

When contributing to this project:

- Treat Products as immutable after creation.
- Never expose raw AI providers to the frontend.
- All AI interactions must go through the AI Orchestrator.
- Maintain strict separation between UI, business logic, workflows, and AI providers.
- Prefer modular, reusable packages within the monorepo.
- Build asynchronous workflows with dependency-aware job execution.
- Ensure every AI job is idempotent, retryable, and persistently tracked.
- Follow secure-by-default practices across authentication, authorization, storage, and APIs.
- Optimize for maintainability, scalability, and future enterprise features without introducing unnecessary complexity in Phase 1.