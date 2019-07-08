const Helper = require('../utils/helper');

class Fields {
  constructor(database) {
    this.helper = new Helper();
    this.database = database;
  }

  async getFields({ limit, offset }) {
    const { count } = await this.database.getRecordsCount('field');

    const query = `select "type", "schema", "version" from field t1 where t1.version =(select max(version) from
    field t2 where t2.type = t1.type) LIMIT ${limit} OFFSET ${offset}`;

    const response = await this.database.queryMethod('field', query);

    return { count, response };
  }

  async getFieldsByType(payloadData) {
    const { type, version } = payloadData;
    const attribute = [ 'version', 'schema', 'type' ];
    const orderby = [ [ 'version', 'DESC' ] ];
    let query = { type };

    if (version) {
      query = { version, ...query };
    }

    const args = {
      where: query,
      attributes: attribute,
      order: orderby,
    };

    const response = await this.database.getSingleRow('field', args);

    return response;
  }

  async save({ schema, type }) {
    const typeLowerCase = type.toLowerCase().trim();

    const data = { type: typeLowerCase, schema };

    const response = await this.database.getMaxValue(
      'field',
      'version',
      {
        where: { type: typeLowerCase },
      },
    );

    data.version = Number.isNaN(response) ? 1 : response + 1;

    const savedField = await this.database.create('field', data);

    return savedField;
  }
}

module.exports = Fields;
