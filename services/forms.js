const uuidV1 = require('uuid/v1');
const Helper = require('../utils/helper');

class Forms {
  constructor(database) {
    this.helper = new Helper();
    this.database = database;
  }

  async getForms(payload) {
    const {
      tenantId,
      limit,
      offset,
    } = payload;
    const response = [];

    const { count } = await this.database.getRecordsCount('form');

    const query = {
      attributes: [ 'public_id', 'tenant_id', 'schema' ],
      order: [ [ 'created_at', 'ASC' ] ],
      where: {
        tenant_id: tenantId || { $eq: null },
      },
      offset,
      limit,
    };

    const dataArray = await this.database.getAllRows('form', query);

    dataArray.map((data) => {
      const { dataValues } = data;

      response.push(this.helper.convertSnakeToCamel(dataValues));

      return true;
    });

    return { count, response };
  }

  async getByPublicId({ publicId }) {
    const query = this.helper.convertCamelObjectToSnake({ publicId });
    const args = {
      attributes: [ 'public_id', 'tenant_id', 'schema' ],
      where: query,
    };
    let response;

    const data = await this.database.getSingleRow('form', args);

    if (data) {
      const { dataValues } = data;

      response = this.helper.convertSnakeToCamel(dataValues);
    }

    return response;
  }

  async save(payload) {
    const data = { ...payload };

    /**
     * Using uuid v1 because of uniqueness with unix timestamp value
     */
    data.public_id = uuidV1();

    const { dataValues: { public_id: publicId } } = await this.database.create('form', data);

    return publicId;
  }
}

module.exports = Forms;
