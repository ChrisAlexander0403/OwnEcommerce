import User from "../../models/user";

const Query = {
    hello: () => 'Hello world!',
    currentUser: async (_, { _id }) => await User.findById(_id)
}

export default Query;