const ISessionResponse = {
    __resolveType(obj) {
        if (obj.authenticatedClient) return 'ClientLogInResponse';
        if (obj.authenticatedUser) return 'UserLogInResponse';
        if (obj.tokens) return 'RefreshSessionResponse';
        else return 'SessionResponse';
    }
}

export default ISessionResponse;