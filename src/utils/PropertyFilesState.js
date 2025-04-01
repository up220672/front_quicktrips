import { de } from "date-fns/locale";

export const propertyFilesState = {
    lup_pdf: {
        upload: false,
        delete: false,
        current_url: "",
        temp_url: "",
    },
    poa_pdf: {
        upload: false,
        delete: false,
        current_url: "",
        temp_url: "",
    },
    images_database: [],
    videos_database: [],
    images_to_upload: [],
    videos_to_upload: [],
};

// CRUD operations
export const addImageToUpload = (image) => {
    propertyFilesState.images_to_upload.push(structuredClone(image));
};

export const deleteImageToUpload = (image) => {
    propertyFilesState.images_to_upload = propertyFilesState.images_to_upload.filter((img) => img !== image);
};

export const addVideoToUpload = (video) => {
    propertyFilesState.videos_to_upload.push(structuredClone(video));
};

export const deleteVideoToUpload = (video) => {
    propertyFilesState.videos_to_upload = propertyFilesState.videos_to_upload.filter((vid) => vid !== video);
};

export const deleteImage = (image) => {
    const img = propertyFilesState.images_database.find((img) => img.url === image.url);
    if (img) img.delete = true;
};

export const deleteVideo = (video) => {
    const vid = propertyFilesState.videos_database.find((vid) => vid.url === video.url);
    if (vid) vid.delete = true;
};

export const deleteLUPPDF = () => {
    propertyFilesState.lup_pdf.delete = true;
};

export const deleteLocalLUPPDF = () => {
    propertyFilesState.lup_pdf.temp_url = "";
    propertyFilesState.lup_pdf.upload = false;
}

export const deletePOAPDF = () => {
    propertyFilesState.poa_pdf.delete = true;
};

export const deleteLocalPOAPDF = () => {
    propertyFilesState.poa_pdf.temp_url = "";
    propertyFilesState.poa_pdf.upload = false;
}

export const uploadLUPPDF = (new_url) => {
    console.log("Actualizando LUP: ", new_url)
    propertyFilesState.lup_pdf.upload = true;
    propertyFilesState.lup_pdf.temp_url = new_url;
};

export const uploadPOAPDF = (new_url) => {
    console.log("Actualizando POA", new_url)
    propertyFilesState.poa_pdf.upload = true;
    propertyFilesState.poa_pdf.temp_url = new_url;
};


// setFilesState

export const setFilesStateFromAPIResponse = (response) => {
    // clean up
    propertyFilesState.lup_pdf = {
        upload: false,
        delete: false,
        current_url: "",
        temp_url: "",
    };
    propertyFilesState.poa_pdf = {
        upload: false,
        delete: false,
        current_url: "",
        temp_url: "",
    };
    propertyFilesState.images_database = [];
    propertyFilesState.videos_database = [];
    propertyFilesState.images_to_upload = [];
    propertyFilesState.videos_to_upload = [];

    // Declarar correctamente las variables antes de usarlas
    const images = response.photos.map((photo) => ({
        url: photo.url,
        delete: false,
    }));
    for (const image of images) {
        propertyFilesState.images_database.push(image);
    }

    const videos = response.videos.map((video) => ({
        url: video.url,
        delete: false,
    }));
    for (const video of videos) {
        propertyFilesState.videos_database.push(video);
    }

    if (response.land_use_permit) {
        propertyFilesState.lup_pdf.current_url = response.land_use_permit;
    }

    if (response.proof_of_address) {
        propertyFilesState.poa_pdf.current_url = response.proof_of_address;
    }

    console.log("El estado de los archivos es: ", propertyFilesState);
};
