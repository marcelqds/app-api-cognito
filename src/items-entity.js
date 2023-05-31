const { randomUUID } = require('node:crypto');


class Items{
	#props = {};
	#errors = ''; 
	
	constructor(props = {}, id){		
		this.#id = id;
		this.#description = props.description;
		this.#price = props.price;
		if(this.#errors.length > 0){			
			throw new Error(this.#errors);
		}
	}

	values(){
		const props = {...this.#props};
		return props;
	}

	toJSON(){
		return JSON.stringify(this.#props);
	}
	
	set #id(value){
		const regId = /^[\w\d]{8}\-[\w\d]{4}\-4[\w\d]{3}\-[\w\d]{4}\-[\w\d]{12}$/;
		if(!value) return this.#props.id = randomUUID();
		else if(!regId.test(value)) 
			return this.#errors += "Informe um id válido.\n";			
		this.#props.id = value;
	}
	
	set #description(value = ""){
		value = value
		.trim()
		.replace(/\s{2,}/g,' ');
		if(value.length < 3) 
			return this.#errors += 'O nome deve conter 3 ou mais caracteres\n';
		this.#props.description = value;
		
	}
	
	set #price(value){
		value = parseFloat(value);
		if(isNaN(value)) 
			return this.#errors +='Informe um valor válido para o preço\n';
		this.#props.price = value;
	}	
}

module.exports = Items;
