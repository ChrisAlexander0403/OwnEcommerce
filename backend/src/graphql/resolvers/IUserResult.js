const IUserResult = {
    __resolveType(obj) {
        return obj.node ? 'UserLogInResult' : 'UserResult'
    }
}

export default IUserResult;