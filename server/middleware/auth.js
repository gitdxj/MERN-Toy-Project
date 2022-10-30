import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

// wants to like a post
// click the like button -> auth middleware (next) -> like controller

const CLIENT_ID = "338159092446-gjnhq00ojdaarfo32url72a03bcqrv2a.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

const auth = async (req, res, next) => {
    try {
        // console.log("middleware/auth.js ");
        // console.log(req.headers);
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData.id;
        } else {
            // decodedData = jwt.verify(token);
            // req.userId = decodedData.sub;

            // use google auth to verify token
            try {
                const ticket = await client.verifyIdToken({
                    idToken: token,
                    audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                    // Or, if multiple clients access the backend:
                    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
                });
                const payload = ticket.getPayload();
                req.userId = payload['sub'];
            } catch (error) {
                console.log(error);
            }
            
        }

        next();

    } catch (error) {
       console.log(error); 
    }
};

export default auth;