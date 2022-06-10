import CustomerRepository from "../repositories/customerRepository";

class CustomerService {
    constructor(){
        this.repository = new CustomerRepository();
    }

    async customerRegister(args, ctx) {
        const newCustomer = await this.repository.create({
            
        });
        console.log(newCustomer);
    }

}

export default CustomerService;