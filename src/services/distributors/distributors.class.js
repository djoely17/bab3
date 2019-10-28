const { Service } = require('feathers-mongoose');

exports.Distributors = class Distributors extends Service {
 //  async get (id, params) {
 //    // const find = this.app.service('distributors');
 //    // const message = await getClass.get(1, params);
 //    if (id=='getProduct'){
 //    	// const getClass = this.app.service('distributors');
 //    	const message = await this.find(params);
 //    	// const data = await message.populate({
	// 				// 	        schema: {
	// 				// 	          include: [
	// 				// 	            {
	// 				// 	              service: 'products',
	// 				// 	              nameAs: 'product',
	// 				// 	              parentField: '_id',
	// 				// 	              childField: 'distributor',
	// 				// 	              query: {
	// 				// 	                $select: { 
	// 				// 	                  product_name: ['product_name'], 
	// 				// 	                  price: ['price'] 
	// 				// 	                }
	// 				// 	              }
	// 				// 	            }
	// 				// 	          ]
	// 				// 	        }
	// 				// 	      })
	//     // console.log(data);
	//     return message;
	// } else {
	// 	const message = await this.get(id, params);
	// 	return message;
	// }
 //    // return {
 //    //   id, text: `A new message with ID: ${id}!`
 //    // };
 //  }
  // async find (params) {
  //   // const distributor = find.app.service('distributors');
  //   // const message = await distributor.find(params);
    
  //   // return { message };
  //   const { Model } = context.app.service('sales');
  //   const listSales = await Model.aggregate([ 
  //     { $unwind: '$list' },
  //     { $project: { list: 1, product: 1, idProduct: { product: '$list.product' } } },
  //     { $group: { _id: '$list.product', sales: { $sum: '$list.qty' } } } ]);

  //   return [{
  //     id: 1,
  //     text: 'Message 1'
  //   }, {
  //     id: 2,
  //     text: 'Message 2'
  //   }];
  // }
};
