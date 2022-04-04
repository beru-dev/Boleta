import UserEntity from "./UserEntity";
import isValidEmail from "../utils/isValidEmail";

export default {
    createUser: async (user: any) => {
        const { user_name, user_email, password, user_role } = user;
        if(!user_name) throw new Error("User name not provided");
        if(!isValidEmail(user_email)) throw new Error("Invalid email address");
        if(!password) throw new Error("Password not provided");
        if(!user_role) throw new Error("User role not provided");

        return await UserEntity.create(user);
    },

    getUserByName: async (user_name: string) => {
        return await UserEntity.findOne({ where: { user_name } })
    }
}