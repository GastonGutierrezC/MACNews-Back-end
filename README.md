# MAC News - Backend API

##  Description

This project is the **backend API** of the aplication web:

**"Responsive Web Application for News Publishing and Consumption Using Artificial Intelligence Based on the UNESCO International Code of Journalistic Ethics (Case Study: El Elector)"**

The API is responsible for managing the **entire workflow of news publishing and consumption**, including user management, content creation, recommendations, and analytics.

### Purpose

This backend addresses key challenges in digital journalism:

- Lack of **personalized news delivery**
- Inefficient **manual ethical review processes**
- Delays in **news publication workflows**

By integrating **Artificial Intelligence agents**, the system improves:
- Content personalization
- Automated ethical validation
- Faster and more efficient publication processes

---

##  Features

-  JWT Authentication & Authorization
-  User management & roles
-  News creation, update, approval, and filtering
-  AI-powered:
   - News ethical review
   - Content improvement
   - Personalized recommendations
   - Comment-based metrics
   - Journalist application evaluation
-  Channels management
-  Follow channels
-  Comments system
-  Channel metrics & visits tracking
-  Intelligent search with Elasticsearch
-  Search history tracking
-  Image upload (Cloudinary)
-  Reports & analytics
-  Journalist application system

---

##  Technologies

- **Node.js** v24.14.0
- **NestJS** v11.0.16
- **MySQL** (Docker: `mysql:8.0`)
- **JWT (Authentication)**
- **Docker**
  - MySQL
  - Elasticsearch
  - Kibana
  - Ngrok (to expose local endpoints)
- **n8n (Deployed on Render)**
  - Used to orchestrate AI agents
  - Backend consumes n8n endpoints

---

##  Main Endpoints

###  Auth
- `POST /auth/register`
- `POST /auth/login`

###  Users
- `GET /users/profile`
- `PATCH /users`
- `PATCH /users/changeRole/{id}`

###  News
- `POST /news`
- `GET /news`
- `GET /news/{id}`
- `PATCH /news/{id}`
- `PATCH /news/bulk/approve-all`
- `POST /news/update-by-agent`
- `GET /news/recommendations`
- `GET /news/searchIntelligent`

###  Channels
- `POST /channels`
- `GET /channels/top`
- `GET /channels/journalist`

###  Follow Channels
- `POST /followChannels`
- `GET /followChannels/user`
- `DELETE /followChannels/{ChannelID}`

###  AI Features
- `POST /applicationForm/evaluate-with-agent`
- `POST /news/update-by-agent`
- `GET /comment-post/metrics/{channelId}`

###  Metrics & Reports
- `GET /channel-metrics/channel/{channelId}`
- `GET /reports/users-by-month`
- `GET /reports/news-review`

---

##  Installation & Setup

```bash
# Run containers
docker-compose up

# Install dependencies
npm install
npm update

# Run project
npm run start:dev

```

### Troubleshooting

If you encounter dependency issues:

```bash
# Remove lock file
rm package-lock.json

# Reinstall dependencies
npm install
npm update
```

### Environment Variables (.env)

```bash
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
ENCRYPTION_KEY=
```

## Docker Configuration (docker-compose.yml)

This project uses **Docker Compose** to orchestrate all required services for local development, including the database, search engine, visualization tools, and public tunneling.

###  Services Overview

---

###  MySQL Database

- **Image:** `mysql:8.0`
- Runs the main relational database
- Initializes automatically using `init.sql`
- Data is persisted using Docker volumes

**Configuration:**
- Port: `3307 → 3306`
- Database: `MACNews`
- Credentials defined via environment variables

---

###  Elasticsearch

- **Image:** `elasticsearch:8.13.0`
- Used for **intelligent search and indexing**
- Enables advanced search features (e.g., full-text search, relevance scoring)

**Configuration:**
- Single-node mode
- Security disabled (for development)
- Memory optimized for local usage

---

###  Kibana

- **Image:** `kibana:8.13.0`
- Provides a **visual interface for Elasticsearch**
- Useful for:
  - Data exploration
  - Index monitoring
  - Debugging search queries

**Access:**
- http://localhost:5601

---

###  Ngrok

- **Image:** `ngrok/ngrok`
- Exposes the local backend to the internet

**Purpose:**
- Allows external services (like **n8n AI agents**) to access local endpoints
- Useful for testing webhooks and integrations

**Configuration:**
- Public tunnel to: `http://localhost:3002`
- Web interface: http://localhost:4040

---

###  Volumes

- `mysql_data`: persists MySQL data
- `elastic_data`: persists Elasticsearch data

---

###  How to Run

```bash
docker-compose up
```

## Artificial Intelligence Integration

This backend integrates multiple AI agents, orchestrated through n8n workflows.

### Where AI is used

* Journalist application evaluation
* News content improvement
* Ethical validation of news
* Comment-based metrics analysis
* Personalized recommendations

### AI Agents

Implemented in:

* CommentPostMetrics.intelligentAgent.ts
* JournalistApplications.IntelligentAgent.ts
* NewsReview.IntelligentAgent.ts
* NewsUpdate.intelligentAgent.ts
* PersonalizedRecommendations.IntelligentAgents.ts

### How it works
AI agents are exposed as endpoints via n8n (deployed on Render)

The backend consumes these endpoints
Each agent performs a specific task:
* ✅ Evaluate journalist applications
* ✅ Improve news content
* ✅ Analyze comments for metrics
* ✅ Validate ethical compliance
* ✅ Generate personalized recommendations

### Important Notes
* You must provide API keys for AI services (e.g., OpenAI / Gemini)
* AI workflows are preconfigured
* A folder with JSON files is included:
  * These contain the configuration of each n8n workflow
  * No need to build flows from scratch

##  n8n Setup (Render Deployment)

This project relies on **n8n** to orchestrate multiple **AI agents** used by the backend.

n8n is deployed externally using **Render**, and the backend communicates with it via HTTP endpoints.

---

###  Step-by-Step Setup on Render

#### 1. Create a Render Account
- Go to: https://render.com
- Sign up or log in

---

#### 2. Deploy n8n as a Web Service

- Click **"New +" → Web Service**
- Connect your GitHub repository (or use Docker)

**Recommended:** Use Docker with the official n8n image

---

#### 3. Basic Configuration

- **Environment:** Docker
- **Image:** `n8nio/n8n`
- **Port:** `5678`

---

#### 4. Set Environment Variables

Add the following variables in Render:

```env
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=your_password
N8N_HOST=your-render-url.onrender.com
N8N_PORT=5678
N8N_PROTOCOL=https
WEBHOOK_URL=https://your-render-url.onrender.com

```
#### 5. Persistent Storage (IMPORTANT)

Enable a disk in Render to persist workflows:

* Add a Disk
* Mount path:
  * /home/node/.n8n

This ensures workflows are not lost after redeploys.

#### 6. Deploy the Service
* Click Deploy
* Wait until the service is live
* Access n8n via your Render URL

#### Useful Resources
* n8n Official Docs: https://docs.n8n.io
* Deploy n8n with Docker: https://docs.n8n.io/hosting/installation/docker/
* Render Web Services Guide: https://render.com/docs/web-services
* n8n Environment Variables: https://docs.n8n.io/hosting/configuration/environment-variables/
* n8n Webhooks: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/

##  Project Structure

The project follows a **layered architecture inspired by Clean Architecture**, ensuring scalability, maintainability, and separation of concerns.

- src/
 - ├── ApplicationLayer
 - ├── constants
 - ├── DomainLayer
 - ├── InfrastructureLayer
 - ├── InterfaceAdaptersLayer
 - ├── modules
 - └── app.module.ts

### ApplicationLayer
Contains the **application logic and use cases** of the system.

- Coordinates workflows between different layers
- Implements business use cases (e.g., creating news, evaluating applications)
- Acts as a bridge between controllers and domain logic

---

### DomainLayer
Represents the **core business logic and rules** of the application.

- Entities (e.g., User, News, Channel)
- Business rules and validations
- Domain services

---

### InfrastructureLayer
Handles **external services and technical implementations**.

- Database configuration (MySQL)
- Third-party integrations (Cloudinary, AI services, etc.)
- External APIs communication

---

### InterfaceAdaptersLayer
Responsible for **connecting the outside world with the application**.

- Controllers (HTTP endpoints)
- DTOs (Data Transfer Objects)
- Translates external requests into internal logic

---

### Modules
Organizes the application into **feature-based modules** (NestJS style).

- Groups related functionality (e.g., Users, News, Channels)
- Improves modularity and scalability

---

### constants
Stores **global constants and configuration values**.

- Static values
- Shared configuration data

---

###  app.module.ts
The **main entry point of the NestJS application**.

- Registers all modules
- Configures global dependencies
- Initializes the application

---

## Author
Gaston Gutierrez Condori