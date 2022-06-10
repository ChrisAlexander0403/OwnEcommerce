const IClientResponse = {
    __resolveType(obj) {
        if (obj.currentClient) return 'GetCurrentClientResponse';
        else if(obj.updatedClient) return 'GetUpdatedClientResponse';
        else return 'ClientResponse';
    }
}

export default IClientResponse;