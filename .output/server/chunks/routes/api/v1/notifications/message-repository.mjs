import { MongoClient } from 'mongodb';
import { d as debug, l as log } from '../../../../_/logger.mjs';

class MessageRepository {
  constructor(URL, DB) {
    this.database = DB;
    this.collection = "messages";
    this.connection = URL;
    debug(`database:${this.database}`);
    debug(`connection${this.connection}`);
  }
  async insert(record) {
    let client;
    let result;
    try {
      client = await MongoClient.connect(this.connection, {});
      const dbo = client.db(this.database);
      const col = dbo.collection(this.collection);
      result = await col.insertOne(record);
      debug("Inserted", "message-repository");
    } catch (e) {
      log(JSON.stringify(e.stack, null, 2), "message-repository");
    } finally {
      client.close();
    }
    return result;
  }
  async select(record) {
    debug("Selecting " + record._id);
    let client;
    let result = [];
    try {
      client = await MongoClient.connect(this.connection, {});
      const dbo = client.db(this.database);
      const col = dbo.collection(this.collection);
      result = await col.find(record).toArray();
      debug("Selected", "message-repository");
    } catch (e) {
      log(JSON.stringify(e.stack, null, 2), "message-repository");
    } finally {
      client.close();
    }
    return result;
  }
  async update(record, newValues) {
    debug("Updating " + record._id);
    let client;
    let result;
    try {
      client = await MongoClient.connect(this.connection, {});
      const dbo = client.db(this.database);
      const col = dbo.collection(this.collection);
      result = await col.updateMany(record, newValues);
      debug("Updated", "message-repository");
    } catch (e) {
      log(JSON.stringify(e.stack, null, 2), "message-repository");
    } finally {
      client.close();
    }
    return result;
  }
  async deleteRecord(record) {
    debug("Deleting " + record._id);
    let client;
    let result;
    try {
      client = await MongoClient.connect(this.connection, {});
      const dbo = client.db(this.database);
      const col = dbo.collection(this.collection);
      result = await col.deleteMany(record);
      debug("Deleted", "message-repository");
    } catch (e) {
      log(JSON.stringify(e.stack, null, 2), "message-repository");
    } finally {
      client.close();
    }
    return result;
  }
}

export { MessageRepository as default };
//# sourceMappingURL=message-repository.mjs.map
