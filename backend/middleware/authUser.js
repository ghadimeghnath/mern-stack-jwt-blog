import jwt from 'jsonwebtoken'

const AuthUser = (req,res, next)=>{
    const token = req.cookies.token;
    
    if(!token){
       return res.status(401).json({success: false, message: "Not Authorized"})
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if (tokenDecode.id) {
           req.userId = tokenDecode.id;
        }else{
           return res.status(403).json({success: false, message: "Not Authorized"});
        }
        next();
    } catch (error) {
        res.status(403).json({success: false, message: error.message})
    }
}

export default AuthUser;