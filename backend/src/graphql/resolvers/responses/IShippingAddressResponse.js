const IShippingAddressResponse = {
    __resolveType(obj) {
        if (obj.shippingAddresses) return 'GetClientShippingAddressesResponse';
        if (obj.shippingAddress) return 'GetClientShippingAddressResponse';
        else return 'ShippingAddressResponse';
    }
}

export default IShippingAddressResponse;