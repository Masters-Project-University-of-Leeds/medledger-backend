# 🏥 MedLedger Backend - Server-side Implementation for MedLedger XRPL

> 🎓 Collaboration: This backend is developed in conjunction with the MedLedger XRPL project under the guidance of professors from the University of Leeds, United Kingdom.

---

## 📖 Table of Contents

- [🎉 Introduction](#-introduction)
- [🌟 Key Features](#-key-features)
- [🛠 Installation](#-installation)
- [🔧 Endpoints](#-endpoints)
- [📔 License](#-license)

---

## 🎉 Introduction

Welcome to the MedLedger Backend, the server-side component of the MedLedger XRPL project. This backend is designed to handle authentication, QR code generation, and UUID verification for the MedLedger XRPL front-end. It serves as the bridge between the frontend and the XRPL, ensuring secure and efficient operations.

---

## 🌟 Key Features

- **Secure Authentication**: Utilizing QR codes and UUIDs for a two-factor authentication process.
- **XRPL Integration**: Direct interactions with the XRP Ledger for blockchain-specific operations.
- **Scalability**: Designed to handle a large number of requests efficiently.
- **Modular Design**: Clear separation of concerns with modular routes and controllers.

---

## 🛠 Installation

Follow these steps to set up the MedLedger Backend on your local machine:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Masters-Project-University-of-Leeds/medledger-backend.git
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd medledger-backend
   ```

3. **Install Dependencies**:
   If you're using npm:
   ```bash
   npm install
   ```
   If you're using yarn:
   ```bash
   yarn install
   ```

4. **Set Up Environment Variables**:
   Copy the `.env.example` file and rename it to `.env`. Fill in the required environment variables.

5. **Start the Server**:
   If you're using npm:
   ```bash
   npm start
   ```
   If you're using yarn:
   ```bash
   yarn start
   ```

The server should now be running on the specified port (default is 3000). You can access it at `http://localhost:3000`.

---

## 🔧 Endpoints

### 1. Generate QR (`POST /generateQR`)

**Description**:  
Handles the generation of QR codes for authentication.

**Request Body**:
```json
{
  "userAddress": "string"
}
```

**Success Response**:
```json
{
  "uuid": "string",
  "qr_png": "string (URL to the generated QR code)"
}
```

**Error Response**:
```json
{
  "error": "Description of the error"
}
```

### 2. Sign In (`POST /signIn`)

**Description**:  
Manages user sign-in operations. Validates user credentials and, upon successful validation, returns a JWT token.

**Request Body**:
```json
{
  "userAddress": "string"
}
```

**Success Response**:
```json
{
  "token": "string (JWT token)",
  "type": "string (User type: Admin/User)"
}
```

**Error Response**:
```json
{
  "error": "Description of the error"
}
```

### 3. Verify UUID (`GET /verifyUUID`)

**Description**:  
Verifies the UUID provided during the authentication process. Validates the user's unique identifier with the Xumm app.

**Request Parameters**:
```json
{
  "uuid": "string"
}
```

**Success Response**:
```json
{
  "payload_uuidv4": "string",
  "exists": "boolean",
  "is_xapp": "boolean",
  "user_token": "boolean",
  "multisign": "boolean",
  "submit": "boolean",
  "destination": "string",
  "resolved_at": "string",
  "txid": "string",
  "txblob": "string",
  "payload": {
    "application_uuidv4": "string",
    "response": {
      "account": "string",
      "txjson": {
        "TransactionType": "string",
        "Account": "string",
        ...
      }
    },
    "custom_meta": {
      "identifier": "string",
      "blob": "string",
      "instruction": "string"
    }
  }
}
```

**Error Response**:
```json
{
  "error": "Description of the error"
}
```

---

## 📔 License

This project is licensed under the [MIT License](LICENSE). The license provides all the details regarding permissions, conditions, and disclaimers.

For collaborations, contributions, queries, or suggestions, feel free to reach out via email.

---
