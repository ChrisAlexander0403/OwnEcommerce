const IClientResponse = {
    __resolveType(obj) {
        if (obj.currentClient) return 'GetCurrentClientResponse';
        else return 'ClientResponse';
    }
}

export default IClientResponse;