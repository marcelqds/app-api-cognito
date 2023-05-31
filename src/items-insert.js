const { response } = require('./response');
const Items = require('./items-entity');
const Repository = require('./items-dynamodb-repository');


module.exports.itemsInsert = async(event) => {
	try{
		/*const body = {
			description: "Bike",
			price: "1500"
		}*/
				
		const items = new Items(event.body);		
		const repository = new Repository();
		await repository.insert(items.values());
		return response({},204);
	}catch(e){
		return response({errors: e.message}, 401);
	}
}