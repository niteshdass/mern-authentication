

exports.read = (req,res) =>{
      req.profile.hashed_password = undefined
       return res.status(200).json(req.profile)
}