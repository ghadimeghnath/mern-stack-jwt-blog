import jwt from "jsonwebtoken"

const authAdmin = async (req, res, next)=>{
    try {
        const token = await req.cookies.adminToken;
    if (!token) {
       return res.json({success: false, message: "Not Authorized"})
    }
    const decodedAdminToken = jwt.verify(token, process.env.JWT_SECRET);
    if(decodedAdminToken.email){
        req.email = decodedAdminToken.email;
    }
    next();
    } catch (error) {
        return res.json({success: false, message: error.message});
    }


}

export default authAdmin