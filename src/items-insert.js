const { response } = require('./response');
const Items = require('./items-entity');
const Repository = require('./items-dynamodb-repository');


module.exports.itemsInsert = async({ body }) => {
	try{		
		const items = new Items(JSON.parse(body));
		const repository = new Repository();
		await repository.insert(items.values());
		return response({},204);
	}catch(e){
		return response({errors: e.message}, 401);
	}
}