// const Items = require('./items-entity');
const { response } = require('./response');
const Repository = require('./items-dynamodb-repository');


module.exports.itemsGet = async({pathParameters:{ id }}) => {		
	try{
		const repository = new Repository();
		let items = await repository.getById(id);		
		return response(items);
	}catch(e){
		return response({errors: e.message}, 401);
	}	
}