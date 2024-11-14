import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../../firebase.js"; // Make sure your Firebase app is initialized here
import uniqid from "uniqid";

export async function POST(req) {
  const data = await req.formData();

  if (data.get("file")) {
    const file = data.get("file");

    // Initialize Firebase Storage
    const storage = getStorage(app);

    // Generate a unique file name for the image
    const ext = file.name.split(".").slice(-1)[0]; // Extract the file extension
    const newFileName = uniqid() + "." + ext;

    // Create a reference to the file in Firebase Storage
    const storageRef = ref(storage, newFileName);

    try {
      // Upload the file directly (without converting to buffer)
      await uploadBytes(storageRef, file, { contentType: file.type });

      // Get the download URL of the uploaded file
      const link = await getDownloadURL(storageRef);

      // Return the file link as a JSON response
      return Response.json(link);
    } catch (error) {
      console.error("Error uploading file:", error);
      return Response.json({ error: "Upload failed" }, { status: 500 });
    }
  }

  return Response.json({ error: "No file found in request" }, { status: 400 });
}
