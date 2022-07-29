const IUserResponse = {
    __resolveType(obj) {
        if (obj.currentUser) return 'GetCurrentUserResponse';
        else if (obj.users) return 'GetUsersResponse';
        else if (obj.user) return 'GetUserResponse';
        else return 'UserResponse';
    }
}

export default IUserResponse;