# VaultSign — Signup & Dashboard 🔐

> **NSCC SRMIST · Technical Recruitment Task · 1st Year · Task 1**
>
> A polished, beginner-friendly client-side signup application demonstrating form validation, password hashing, DOM manipulation, and browser storage — built with **HTML, CSS, and vanilla JavaScript**.

[![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](index.html)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](style.css)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript&logoColor=111)](script.js)
[![Web Crypto](https://img.shields.io/badge/Web%20Crypto-SHA--256-8B7CFF)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)

## ✨ What is VaultSign?

VaultSign is a small signup-and-user-management interface created for the NSCC SRM first-year technical task. The goal was not just to make a form that works, but to make the complete flow feel like a real mini product:

**Enter details → Validate → Hash password → Store locally → View dashboard → Delete users**

Everything runs in the browser, so no backend or database setup is needed.

---

## 🎯 Task Requirements Covered

| Requirement | Implementation |
|---|---|
| Username cannot be empty | ✅ Trimmed input + validation |
| Email must be properly formatted | ✅ Regex validation |
| Password must be at least 6 characters | ✅ Client-side length validation |
| Password hashed before storage | ✅ SHA-256 using Web Crypto API |
| Signup button | ✅ Form submission flow |
| Store details in `localStorage` | ✅ JSON-based browser storage |
| Dashboard table | ✅ Username, Email, Password hash |
| Delete user | ✅ Per-user Delete action |

The official task also asks for the complete source code, a well-written README, and a short demo video. This repository contains the source code and documentation; the demo video remains a submission item to record separately. fileciteturn0file0

---

## 🚀 Features

### Core
- 🧾 Signup form with three required fields
- 🔎 Regex-based email validation
- 🔐 SHA-256 password hashing before local storage
- 💾 Persistent user data using `localStorage`
- 📊 Live dashboard table
- 🗑️ Delete individual users

### Extra polish
- ✨ Responsive dark interface
- 👁️ Show/hide password control
- 📈 Live registered-user count
- 💪 Password-length strength indicator
- 🧹 Clear-all users action with confirmation
- 🔔 Lightweight success/error toast messages
- 🛡️ HTML escaping before user data is inserted into the dashboard
- 📱 Mobile-friendly layout
- ♿ Semantic labels and accessible status messaging

---

## 🧠 Concepts Demonstrated

This project intentionally stays within beginner-friendly web technologies while demonstrating several concepts that are useful beyond the assignment.

### 1. HTML
The page uses semantic sections, forms, labels, buttons, tables, and accessible attributes.

### 2. CSS
The UI demonstrates:
- CSS variables
- Flexbox and Grid
- Responsive media queries
- Transitions and hover states
- Glass-style panels
- Mobile-first considerations

### 3. JavaScript DOM manipulation
JavaScript reads form elements, changes validation messages, creates table rows, updates counters, and responds to user actions.

### 4. Event listeners
The application listens for:
- Form submission
- Input/blur events
- Password toggle clicks
- Delete button clicks
- Clear-all confirmation

### 5. Regular expressions
The email field uses a simple regex to check for a practical `name@domain.extension`-style format.

### 6. `localStorage`
Users are stored as JSON under the key:

```text
nsccTask1Users
```

Because `localStorage` survives page refreshes, registered users remain visible when the page is reopened in the same browser profile.

### 7. Web Crypto API
The password is transformed into a SHA-256 hexadecimal hash using `crypto.subtle.digest()` before it is stored.

> **Important:** This is an educational client-side project, not a production authentication system. Real applications should hash passwords on a trusted server using a password-specific hashing algorithm such as Argon2id, bcrypt, or scrypt, and should never use browser `localStorage` as the primary credential store.

---

## 📁 Project Structure

```text
nscc-task1-signup-dashboard/
│
├── index.html      # Page structure and form
├── style.css       # Responsive visual design
├── script.js       # Validation, hashing, storage and dashboard logic
└── README.md       # Project documentation
```

No build tools, frameworks, package managers, or backend are required.

---

## ▶️ How to Run

### Option 1 — Open directly

1. Download or clone the repository.
2. Open `index.html` in a modern browser.
3. Start creating accounts.

### Option 2 — VS Code Live Server

If you use Visual Studio Code:

1. Open the project folder.
2. Install the **Live Server** extension if needed.
3. Right-click `index.html`.
4. Select **Open with Live Server**.

Using a local server is recommended because browser security policies can affect some Web Crypto functionality in unusual file contexts.

---

## 🧪 How to Test It

Try these cases before submitting:

### Invalid username
Leave the username empty and submit.

**Expected:** A validation message appears and the account is not stored.

### Invalid email
Try something like:

```text
hello@example
```

**Expected:** The email validation fails.

### Short password
Try:

```text
12345
```

**Expected:** The password validation fails because it contains fewer than six characters.

### Valid account
Try:

```text
Username: devanshi08
Email: devanshi@example.com
Password: hello123
```

**Expected:** The account appears in the dashboard and the password column shows a hash rather than the original password.

### Persistence
Refresh the page.

**Expected:** The registered user remains in the dashboard.

### Delete
Click **Delete** beside a user.

**Expected:** That user disappears and is removed from `localStorage`.

### Duplicate email
Try signing up again with the same email.

**Expected:** The application prevents duplicate registration.

---

## 🔐 How Password Hashing Works

The password never gets placed directly into the stored user object.

Conceptually:

```text
plain password
      ↓
TextEncoder
      ↓
crypto.subtle.digest("SHA-256", ...)
      ↓
ArrayBuffer
      ↓
hexadecimal string
      ↓
localStorage
```

For example, the stored object follows this general structure:

```json
{
  "username": "devanshi08",
  "email": "devanshi@example.com",
  "passwordHash": "<64-character SHA-256 hexadecimal hash>",
  "createdAt": "<ISO timestamp>"
}
```

The dashboard therefore never displays the original password.

---

## 🧩 Important Implementation Decisions

### Why vanilla JavaScript?
The task expects first-year students to demonstrate HTML, CSS, JavaScript, DOM manipulation, event listeners, and `localStorage`. Vanilla JavaScript keeps the implementation transparent and makes every major concept easy to trace.

### Why Web Crypto instead of a library?
The browser already provides the Web Crypto API. Using it avoids adding unnecessary dependencies and demonstrates how a native browser API can perform cryptographic hashing.

### Why store an array?
An array of user objects makes it straightforward to add, render, delete, and persist multiple registrations.

### Why hash before storage?
The assignment specifically requires password hashing before storing the details. The application therefore converts the password to a SHA-256 hash before saving it.

---

## 🗺️ Application Flow

```text
┌─────────────────┐
│   Signup Form   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Validate fields │
└────────┬────────┘
         │ valid
         ▼
┌─────────────────┐
│ Check duplicate  │
│      email       │
└────────┬────────┘
         │ unique
         ▼
┌─────────────────┐
│ SHA-256 password│
│      hashing    │
└────────┬────────┘
         ▼
┌─────────────────┐
│   localStorage  │
└────────┬────────┘
         ▼
┌─────────────────┐
│    Dashboard    │
│  View / Delete  │
└─────────────────┘
```

---

## 🌱 What I Learned

While completing this task, the most useful learning points were:

- How browser forms can be validated without a backend
- How regular expressions can validate structured text such as email addresses
- How DOM elements can be selected and updated using JavaScript
- How event listeners connect user actions to application logic
- How objects can be converted to JSON for browser storage
- How `localStorage` persists data between page refreshes
- How the Web Crypto API can perform hashing in the browser
- Why password hashing is different from encryption
- Why client-side storage is not appropriate for production credentials
- How small UX details such as feedback messages and empty states make an interface feel much more complete

---

## ⚠️ Limitations

This is deliberately a **client-side educational project**.

- There is no backend server.
- `localStorage` is browser-specific and can be cleared by the user.
- There is no real authentication/session management.
- SHA-256 alone is not an appropriate production password-storage strategy.
- The dashboard is local to the browser/device.

These limitations are intentional because they match the scope of the first-year task.

---

## 🔮 Possible Future Improvements

If this were developed beyond the recruitment task, the next steps could include:

- Backend authentication with a secure database
- Argon2id/bcrypt/scrypt password hashing on the server
- Login and logout functionality
- Password reset flow
- Session/token management
- User roles and permissions
- Search and sorting in the dashboard
- Exporting registered users
- Automated tests
- Deployment with a real backend

---

## 👩‍💻 Author

**Devanshi Mishra**  
B.Tech Artificial Intelligence · SRM Institute of Science and Technology

Built as part of the **NSCC SRM Technical Recruitment Task — 1st Year, Task 1**.

---

## 📜 License

This project is created for educational and recruitment-task purposes. Feel free to study the implementation and adapt the ideas for learning.
