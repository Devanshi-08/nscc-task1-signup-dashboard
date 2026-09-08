const STORAGE_KEY = "nsccTask1Users";

const form = document.getElementById("signupForm");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const passwordToggle = document.getElementById("passwordToggle");
const strengthBar = document.getElementById("strengthBar");
const userTableBody = document.getElementById("userTableBody");
const emptyState = document.getElementById("emptyState");
const userCount = document.getElementById("userCount");
const clearAllButton = document.getElementById("clearAllButton");
const toast = document.getElementById("toast");

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    console.error("Could not read saved users:", error);
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(byte => byte.toString(16).padStart(2, "0"))
    .join("");
}

function setFieldState(input, messageElement, message, valid) {
  const group = input.closest(".field-group");
  group.classList.toggle("valid", valid);
  messageElement.textContent = message;
}

function validateUsername() {
  const value = usernameInput.value.trim();
  const message = document.getElementById("usernameMessage");

  if (!value) {
    setFieldState(usernameInput, message, "Username cannot be empty.", false);
    return false;
  }

  setFieldState(usernameInput, message, "Looks good.", true);
  return true;
}

function validateEmail() {
  const value = emailInput.value.trim();
  const message = document.getElementById("emailMessage");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(value)) {
    setFieldState(emailInput, message, "Enter a valid email address.", false);
    return false;
  }

  setFieldState(emailInput, message, "Valid email format.", true);
  return true;
}

function validatePassword() {
  const value = passwordInput.value;
  const message = document.getElementById("passwordMessage");

  if (value.length < 6) {
    setFieldState(passwordInput, message, "Password must be at least 6 characters.", false);
    return false;
  }

  setFieldState(passwordInput, message, "Password length is valid.", true);
  return true;
}

function updateStrength() {
  const length = passwordInput.value.length;
  const percentage = Math.min(length / 12, 1) * 100;
  strengthBar.style.width = `${percentage}%`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function maskHash(hash) {
  return `${hash.slice(0, 12)}…${hash.slice(-10)}`;
}

function renderUsers() {
  const users = getUsers();
  userTableBody.innerHTML = "";
  userCount.textContent = users.length;
  emptyState.hidden = users.length > 0;

  users.forEach((user, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><strong>${escapeHtml(user.username)}</strong></td>
      <td>${escapeHtml(user.email)}</td>
      <td><span class="hash" title="${user.passwordHash}">${maskHash(user.passwordHash)}</span></td>
      <td class="action-column"><button class="delete-button" type="button" data-index="${index}">Delete</button></td>
    `;
    userTableBody.appendChild(row);
  });
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  })[character]);
}

form.addEventListener("submit", async event => {
  event.preventDefault();

  const usernameValid = validateUsername();
  const emailValid = validateEmail();
  const passwordValid = validatePassword();

  if (!usernameValid || !emailValid || !passwordValid) {
    showToast("Please fix the highlighted fields.");
    return;
  }

  const users = getUsers();
  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();

  if (users.some(user => user.email.toLowerCase() === email.toLowerCase())) {
    setFieldState(emailInput, document.getElementById("emailMessage"), "This email is already registered.", false);
    showToast("An account with this email already exists.");
    return;
  }

  const passwordHash = await hashPassword(passwordInput.value);

  users.push({
    username,
    email,
    passwordHash,
    createdAt: new Date().toISOString()
  });

  saveUsers(users);
  form.reset();
  strengthBar.style.width = "0";
  document.querySelectorAll(".field-group").forEach(group => group.classList.remove("valid"));
  document.querySelectorAll(".field-message").forEach(message => message.textContent = "");
  renderUsers();
  showToast("Account created and saved securely.");
});

[usernameInput, emailInput, passwordInput].forEach(input => {
  input.addEventListener("blur", () => {
    if (input === usernameInput) validateUsername();
    if (input === emailInput) validateEmail();
    if (input === passwordInput) validatePassword();
  });
});

passwordInput.addEventListener("input", updateStrength);

passwordToggle.addEventListener("click", () => {
  const showing = passwordInput.type === "text";
  passwordInput.type = showing ? "password" : "text";
  passwordToggle.textContent = showing ? "Show" : "Hide";
  passwordToggle.setAttribute("aria-label", showing ? "Show password" : "Hide password");
});

userTableBody.addEventListener("click", event => {
  if (!event.target.matches(".delete-button")) return;

  const index = Number(event.target.dataset.index);
  const users = getUsers();
  const deletedUser = users[index];

  users.splice(index, 1);
  saveUsers(users);
  renderUsers();
  showToast(`${deletedUser.username} was removed.`);
});

clearAllButton.addEventListener("click", () => {
  const users = getUsers();
  if (!users.length) {
    showToast("There are no accounts to clear.");
    return;
  }

  if (confirm("Delete all registered users from localStorage?")) {
    localStorage.removeItem(STORAGE_KEY);
    renderUsers();
    showToast("All accounts have been removed.");
  }
});

renderUsers();
