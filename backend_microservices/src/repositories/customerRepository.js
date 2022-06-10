import BaseRepository from './baseRepository';
import Customer from '../models/customer';

class CustomerRepository extends BaseRepository {
    constructor() {
        super(Customer);
    }

    async getAll() {
        return await this.model.find();
    }

    async findCustomer({ email }){
        return await this.model.findOne({ email: email });
    }
}

export default CustomerRepository;