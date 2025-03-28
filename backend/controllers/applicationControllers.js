import ModelApplication from '../models/application.js'

export const createApplication = async (req, res) => {
  try {    
    const response = await ModelApplication.create(req.body)
    res.status(201).json({ message: 'a été ajouté', response })
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const readApplication = async (req, res) => {
  try {
    const response = await ModelApplication.find()
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error.message)

  }
}

export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedApp = await ModelApplication.findByIdAndDelete(id);
    if (!deletedApp) {
      return res.status(404).json({ message: 'n\'a pas été trouvé' });
    }
    res.status(200).json({ 
      message: 'a été supprimé',
      response: deletedApp 
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};


export const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedApp = await ModelApplication.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedApp) {
      return res.status(404).json({ message: 'n\'a pas été trouvé' });
    }
    res.status(200).json({ 
      message: 'a été mis à jour',
      response: updatedApp 
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};



export const relaunchApplication = async (req, res) => {
  try {
    const datelimite = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    const applications = await ModelApplication.find({
      status: 'En attente',
      date: { $lte: datelimite },
      $or: [
        { relaunchDate: { $exists: false } }, 
        { relaunchDate: { $lte: datelimite } }
      ]
    });

    res.status(200).json(applications);
    
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getStats = async (req, res) => {
  try {
    const stats = await ModelApplication.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } } 
    ]);
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json(error.message);
  }
};