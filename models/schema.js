const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const budgetSchema = new Schema({
    title: {type: String,required:true},
    budget: {type: Number,required:true},
    color: {type: String,required:true ,
        validate: {
            validator: function(v) {
                console.log(v);
              return /^#([A-Fa-f0-9]{6})$/.test(v);
            },
            message: props => `${props.value} is not a valid hex format for color!`
          }
    }
});


module.exports = budgetSchema;
