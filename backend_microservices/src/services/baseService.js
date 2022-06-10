export default class BaseService {
    constructor(Repository) {
        this.repository = Repository;
    }

    async getById(_id) {
        if (!_id) {
            return {
                status: 400,
                message: "Bad request"
            }
        }

        const entity = await this.repository.getById(_id);

        if (!entity) {
            return {
                status: 404,
                message: "Entity not found"
            }
        }

        return entity;
    }
}