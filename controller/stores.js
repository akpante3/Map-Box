const Store = require('../models/store')
// @desc Get all stores
// @route Get /api/v1/stores
//  @access Public

exports.getStores = async (req,res,next) => {
   try {
       const stores = await Store.find();

       return res.status(200).json({
           success: true,
           count: stores.length,
           data: stores
       })
   } catch (error) {
       
   }
}