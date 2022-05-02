const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET
});
export async function handleUpload(file) {
  console.log(process.env.API_KEY, process.env.API_SECRET, process.env.CLOUD_NAME )
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto"
  });
  return res;
}
