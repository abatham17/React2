//import io from 'socket.io-client';
export const appConstants = {    
   // socket:io(process.env.REACT_APP_URL),
    paAppURL:process.env.REACT_APP_URL,
}; 

export const config = {
  bucketName: process.env.REACT_APP_AWS_BUCKET_NAME,
  dirName: process.env.REACT_APP_AWS_DIR_NAME,
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  googleMapKey: process.env.REACT_APP_GOOGLE_MAP_KEY
};