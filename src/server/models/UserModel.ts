import UserEntity from "./UserEntity";

export default {
    createUser: async (user: any) => await UserEntity.create(user),

    getUserByName: async (user_name: string)=> {
        return await UserEntity.findOne({ where: { user_name } })
    }
}