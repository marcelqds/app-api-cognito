const DynamoDB = require('aws-sdk/clients/dynamodb');

class ItemsDynamoDBRepository{
	#dynamodb;
	#tableName = 'Items';
	
	constructor(){
		this.#dynamodb = new DynamoDB({region: 'sa-east-1'});
	}

	async insert(item){
		const params = {
			TableName: this.#tableName,
			Item:{
				id: {S: item.id},
				description: {S: item.description},
				price: {N: item.price}
			}
		}

		return new Promise((res) => {
			this.#dynamodb.putItem(params, (err,data) => {
				if(err)	 throw new Error("Não foi possível incluir o item");
				res(true);
			});
		});
	}
	
	async getById(id){
		const params = {
			TableName: this.#tableName,
			key:{
				id: {S: id}
			}
		}
		return new Promise((res) =>{
			this.#dynamodb.getItem(params,(err, data) => {
				if(err)	throw new Error("Não foi possível trazer o item solicitado");
				data = {
					id: data.Items.id.S,
					description: data.Items.description.S,
					price: data.Items.price.N
				}
				res(data);
			});
		});
	}
}

module.exports = ItemsDynamoDBRepository;
