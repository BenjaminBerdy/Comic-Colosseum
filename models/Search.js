const{ model, Schema} = require('mongoose');

const searchSchema = new Schema({
    body: String,
    users: [{    //Retrieves array of user schemas with similar name prefix as body
        type: Schema.Types.ObjectId,
        ref: 'users'
    }]
})

module.exports = model('Search', searchSchema)

