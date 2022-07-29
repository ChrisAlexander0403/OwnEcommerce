const IClientResponse = {
    __resolveType(obj) {
        if (obj.currentClient) return 'GetCurrentClientResponse';
        else if (obj.updatedClient) return 'GetUpdatedClientResponse';
        else if (obj.clients) return 'GetClientsResponse';
        else return 'ClientResponse';
    }
}

export default IClientResponse;