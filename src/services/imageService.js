import axios from "axios";

export async function getImageUploaded(file) {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "gvmigrsg")
    const response = await axios.post("https://api.cloudinary.com/v1_1/ds2tbtsxd/image/upload/", formData)
    const url = await response.data.url
    return url
}

