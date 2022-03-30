const Search = require('../../models/Search');

module.exports = {
    Query: {
        async getSearch(){
            try{
                const search = await Search.find();
                return search;
            }catch(err){
                throw new Error(err);
            }
        }
    }
}