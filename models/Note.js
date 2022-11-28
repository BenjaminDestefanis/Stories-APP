
const moongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

//nuestro primer Esquema 
const noteShema = new moongoose.Schema(
    
    //first Argument
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },

        title: {
            type: String,
            required: true
        },

        text: {
            type: String,
            required: true

        },

        complete: {
            type: Boolean,
            default: false
        }
    },

//Second Argument
    {
        timestamps: true
    }
)

noteShema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 500
})

module.exports = mongoose.model('Note', noteShema)