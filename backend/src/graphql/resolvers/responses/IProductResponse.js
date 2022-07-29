const IProductResponse = {
    __resolveType(obj) {
        if (obj.phone) return 'GetPhoneResponse';
        else if (obj.phones) return 'GetPhonesResponse';
        else if (obj.accessories) return 'GetAccessoriesResponse';
        else if (obj.accessory) return 'GetAccessoryResponse';
        else return 'ProductResponse';
    }
}

export default IProductResponse;