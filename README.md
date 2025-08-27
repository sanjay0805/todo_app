

---

# 📝 Todo Application

A simple **Rails + React** full-stack Todo application that follows **clean architecture and best practices**, enhanced with **AI-powered sentiment analysis**.

---

## 🚀 Tech Stack

### Backend

* **Ruby on Rails** (API-only mode)
- **SQLite** (development)
* **Faraday** (HTTP client)
* **Gemini AI (Google Generative Language API)** – for sentiment analysis of todos
*  **Delayed Job** for background processing

### Frontend

* **React (Functional Components + Hooks)**

* **Axios / Fetch API** (for API requests)

### Others:
- **Foreman** for running Rails and Webpack together in development
- **Webpacker** for React integration


---

## 🏆 Best Practices

* **Service Objects** – AI logic is encapsulated in `SentimentAnalysisService`, keeping controllers/models clean.
* **Model Callbacks** – Todo automatically triggers sentiment analysis after creation.
* **Graceful Fallbacks** – If Gemini API fails or API key is missing, defaults to `{ label: "Neutral", confidence: 0.0 }`.
* **Strict Label Normalization** – Only allows `Positive`, `Negative`, or `Neutral` classifications.
* **JSON Response Consistency** – Unified API responses for success and failure.

Demo Video: [https://www.loom.com/share/29b68b604d7a42329c44e70ac70f3f79?sid=df21da1e-12f5-4d2e-8bf2-a9b5c50f8794](https://www.loom.com/share/3750a13fc42e42f687a1ca833b49c782?sid=bee9bf49-df1a-4c09-9663-8fbf35c1e071)

---

## 🚀 Steps to Run the Application

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/sanjaydotrb/todo_app.git
cd todo_app
gem install bundler
bundle install
yarn install
rails db:create
rails db:migrate
rails db:seed
foreman start -f Procfile.dev



