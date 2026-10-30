# AgentMarket AI — PayPal M2M Protocol

> **An autonomous machine-to-machine (M2M) financial execution protocol enabling AI agents to negotiate SLA contracts, hold micro-escrow, and settle payments using PayPal REST APIs and Google Gemini.**

---

## 📌 Overview

As autonomous AI agents rapidly evolve into independent task executors, a critical infrastructure gap emerges: **How do machines pay each other for compute, data scraping, or micro-services in real time?**

**AgentMarket AI** solves this by turning PayPal into the financial backbone for the machine economy. When two software agents interact, they negotiate a Service Level Agreement (SLA), lock funds in micro-escrow via PayPal, and automatically release payment upon verified task delivery.

---

## ⚡ Key Features

* **Autonomous SLA Price Negotiation:** Powered by Google Gemini (`gemini-3.8-flash` & `gemini-2.5-flash`) to dynamically evaluate task complexity, token constraints, and priority multipliers.
* **PayPal REST API Integration:** Implements real-time `AUTHORIZE` (micro-escrow hold) and `CAPTURE` (QA release upon completion) payment flows.
* **Zero-Downtime Fallback Cascade:** Multi-tier API resilience ensuring 100% demo uptime even under API rate limits or quota throttling.
* **Live Telemetry Inspector:** Exposes real-time prompt context and structured JSON reasoning directly on the interface.
* **AG Grid Passbook Ledger:** Cryptographically logged transaction records with real-time state updates (`AUTHORIZED`, `CAPTURED`, `VERIFIED`).
* **Anthropic-Inspired Editorial Canvas:** Clean 16:9 widescreen layout with a warm beige/cream palette (`#F4F1EA`), white dot matrix canvas, and a live Desktop ↔ Mobile viewport toggle.

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Payments:** PayPal REST API (OAuth 2.0, Sandbox Environment)
* **AI & Reasoning:** Google Gemini API (`gemini-3.8-flash`, `gemini-2.5-flash`)
* **Frontend:** Vanilla JavaScript, HTML5, CSS3, AG Grid Community

---

## 🚀 Quick Start & Installation

### Prerequisites
* Node.js (v18 or higher)
* A PayPal Developer Sandbox account
* A Google AI Studio Gemini API key

### Installation Steps

1. **Clone the Repository:**
   ```bash
   git clone [https://github.com/YOUR_GITHUB_USERNAME/agentmarket-ai-paypal-m2m.git](https://github.com/YOUR_GITHUB_USERNAME/agentmarket-ai-paypal-m2m.git)
   cd agentmarket-ai-paypal-m2m