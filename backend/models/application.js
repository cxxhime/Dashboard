import mongoose from 'mongoose'

const applicationSchema = mongoose.Schema(
  {
    entreprise: {
      type: String,
      minLength: 3,
      required: true 
    },
    status: {
      type: String,
      enum: ['En attente', 'Acceptée', 'Refusée'],
      default: 'En attente'
    },
    offer: {
      type: String,
      minLength: 3,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    relaunchDate: {
      type: Date
    },

  } , {
    timestamps: true
   }
)

export default mongoose.model('application', applicationSchema)