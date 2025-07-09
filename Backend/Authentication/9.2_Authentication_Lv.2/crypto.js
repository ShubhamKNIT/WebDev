import crypto from "crypto";

// 1. Define the plaintext
const plaintext = "This is a secret message";

// 2. Generate a 32-byte key (for AES-256) and a 16-byte IV
const key = crypto.randomBytes(32);  // 256-bit key
const iv = crypto.randomBytes(16);   // 128-bit IV

// 3. Encrypt
const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
let encrypted = cipher.update(plaintext, "utf-8", "hex");
encrypted += cipher.final("hex");

console.log("🔐 Encrypted Text:", encrypted);

// 4. Decrypt
const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
let decrypted = decipher.update(encrypted, "hex", "utf-8");
decrypted += decipher.final("utf-8");

console.log("🔓 Decrypted Text:", decrypted);

// 5. Optional: Log key and IV (for debug)
console.log("\n🗝️ Key:", key.toString("hex"));
console.log("🧊 IV:", iv.toString("hex"));
