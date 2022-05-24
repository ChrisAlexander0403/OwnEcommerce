const IUserResponse = {
    __resolveType(obj) {
        if (obj.currentUser) return 'GetCurrentUserResponse';
        else return 'UserResponse';
    }
}

export default IUserResponse;