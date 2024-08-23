import { Account, Client, ID } from "appwrite";
import config from "../conf/config";

type AccountType = {
  email: string;
  password: string;
  userName: string;
};

class authServices {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(config.appwriteEndPoint);
    this.client.setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  // create a new user account
  async createUser({ email, password, userName }: AccountType) {
    try {
      const newAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        userName
      );

      if (newAccount) {
        return "Created your new account";
      } else {
        return "Failed to create your new account";
      }
    } catch (error) {
      console.error("Appwrite authServices :: createAccount :: error", error);
    }
  }

  // login to user account
  async logIn({ email, password }: AccountType) {
    try {
      const loginAccount = await this.account.createEmailPasswordSession(
        email,
        password
      );
      if (loginAccount) {
        return "Login to your account";
      } else {
        return "Failed to login";
      }
    } catch (error) {
      console.error("Appwrite authServices :: logIn :: error", error);
    }
  }

  // login to guest account
  async guestLogin() {
    try {
      await this.account.createAnonymousSession();
      return "Login to guest account";
    } catch (error) {
      console.error("Appwrite authServices :: guestLogin :: error", error);
      return "Failed to login";
    }
  }

  // logout to user account
  async logOut() {
    try {
      await this.account.deleteSessions();
      return "Log out to your account";
    } catch (error) {
      console.error("Appwrite authServices :: logOut :: error", error);
      return "Failed to log out";
    }
  }

  // get user information
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Appwrite authServices :: getCurentUser :: error", error);
    }
  }

  // delete user account
  async deleteUser(identityId: string) {
    try {
      await this.account.deleteIdentity(identityId);
      return "Deleted your account";
    } catch (error) {
      console.error("Appwrite authServices :: deleteUser :: error", error);
      return "Failed to delete";
    }
  }
}

export default authServices;
