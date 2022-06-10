class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async getById(_id) {
        return await this.model.findById(_id);
    }

    async create(entity) {
        return await this.model.create(entity);
    }

    async update(_id, entity) {
        return await this.model.findByIdAndUpdate(_id, entity, { new: true });
    }

    async delete(_id) {
        await this.model.findByIdAndDelete(_id);
        return true;
    }
}

export default BaseRepository;