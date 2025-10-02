
# fiberx-dbms-client-app-client-app

FiberX DBMS Admin Panel – A modern, responsive dashboard for managing applications, roles, permissions, and users within the FiberX ecosystem. Built for performance and flexibility.

---

## 🌐 Project Type
**Frontend (Vue 3 + Tailwind CSS + Vite)**

## 🚀 Getting Started

These instructions will help you get the frontend app running locally.

### ✅ Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- `.env` file (see `.env_sample` for reference)

---

### 📦 Installation

```bash
git clone https://github.com/fiberx-innovations/fiberx-dbms-client-app-client-app.git
cd fiberx-dbms-client-app-client-app
npm install
````

Or with Yarn:

```bash
yarn install
```

---

### 🧪 Development Server

```bash
npm run dev
```

Tailwind watcher:

```bash
npm run devcss
```

This will launch the app on:
`http://localhost:5172`

---

### 🏗️ Production Build

```bash
npm run build
```

This will output your production-ready files into the `dist/` directory.

---

## 📁 Folder Structure

```
.
├── public/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── input.css
│   │   │   └── output.css
│   │   └── img/
│   │       ├── ico/
│   │       └── logo.ico
│   └── index.html
├── src/
│   ├── api/
│   │   └── base_api.js
│   ├── modules/
│   │   └── base_app/
│   │       ├── components/
│   │       ├── controllers/
│   │       ├── validators/
│   │       └── views/
│   ├── resources/
│   ├── utils/
│   ├── App.vue
│   ├── main.js
│   └── router.js
├── .env
├── .env_sample
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## ⚙️ Environment Variables

Start by copying the sample:

```bash
cp .env_sample .env
```

Then edit `.env` to match your local or staging config.

---

## 🧩 Scripts

| Script           | Description                       |
| ---------------- | --------------------------------- |
| `npm run dev`    | Starts Vite dev server            |
| `npm run devcss` | Watches and compiles Tailwind CSS |
| `npm run build`  | Builds the app for production     |
| `npm run lint`   | Fixes linting issues using ESLint |
| `npm run format` | Formats code using Prettier       |

---

## 👨‍💻 Contributing

1. Fork the repo
2. Create a branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 👤 Author

**FiberX Innovations**

---

## 📄 License

This project is licensed under the **MIT** license.
