import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            if (error.code === 409) {
                throw new Error("Email already exists");
            }
            console.error("Error during account creation:", error);
            throw new Error("An error occurred during signup. Please try again.");
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            if (error.code === 401) {
                throw new Error("Invalid credentials");
            }
            console.error("Error during login:", error);
            throw new Error("An error occurred during login. Please try again.");
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            if (error.code === 401) {
                // Treat as guest if not authenticated
                return null; // Return null for guests
            }
            console.error("Error fetching current user:", error);
            return null; // Also return null for other errors
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Error during logout:", error);
        }
    }

    // Fallback user details using current user data
    async getUserById(userId) {
        try {
            const user = await this.account.get(); // This will give you the current user's details if authenticated
            return user ? user : null; // Return user details or null for guests
        } catch (error) {
            console.log("Error fetching user by ID:", error);
            return null; // Return null if user not found or error occurs
        }
    }
}

const authService = new AuthService();
export default authService;
