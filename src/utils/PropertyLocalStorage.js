const STORAGE_KEY = "propertyFilesState";

// Función para obtener el estado desde localStorage
export const getFilesState = () => {
    const storedState = localStorage.getItem(STORAGE_KEY);
    return storedState ? JSON.parse(storedState) : {
        lup_pdf: { upload: false, delete: false, current_url: "", temp_url: "" },
        poa_pdf: { upload: false, delete: false, current_url: "", temp_url: "" },
        images_database: [],
        videos_database: [],
        images_to_upload: [],
        videos_to_upload: []
    };
};

// Función para guardar el estado en localStorage
export const setFilesState = (state) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const deleteFilesState = () => {
    localStorage.removeItem(STORAGE_KEY);
}

// CRUD operations
export const addImageToUpload = (image) => {
    const state = getFilesState();
    state.images_to_upload.push(structuredClone(image));
    setFilesState(state);
};

export const deleteImageToUpload = (image) => {
  const state = getFilesState();
  state.images_to_upload = state.images_to_upload.filter((img) => img.id !== image.id);
  setFilesState(state);
};

export const addVideoToUpload = (video) => {
    const state = getFilesState();
    state.videos_to_upload.push(structuredClone(video));
    setFilesState(state);
};

export const deleteVideoToUpload = (video) => {
  const state = getFilesState();
  state.videos_to_upload = state.videos_to_upload.filter((vid) => vid.id !== video.id);
  setFilesState(state);
};

export const deleteImage = (image) => {
    const state = getFilesState();
    const img = state.images_database.find((img) => img.url === image.url);
    if (img) img.delete = true;
    setFilesState(state);
};

export const deleteVideo = (video) => {
    const state = getFilesState();
    const vid = state.videos_database.find((vid) => vid.url === video.url);
    if (vid) vid.delete = true;
    setFilesState(state);
};

export const deleteLUPPDF = () => {
    const state = getFilesState();
    state.lup_pdf.temp_url = "";
    state.lup_pdf.upload = false;
    state.lup_pdf.delete = true;
    setFilesState(state);
};

export const deletePOAPDF = () => {
    const state = getFilesState();
    state.poa_pdf.temp_url = "";
    state.poa_pdf.upload = false;
    state.poa_pdf.delete = true;
    setFilesState(state);
};

export const uploadLUPPDF = (new_url) => {
    const state = getFilesState();
    state.lup_pdf.upload = true;
    state.lup_pdf.temp_url = new_url;
    setFilesState(state);
};

export const uploadPOAPDF = (new_url) => {
    const state = getFilesState();
    state.poa_pdf.upload = true;
    state.poa_pdf.temp_url = new_url;
    setFilesState(state);
};

export const setFilesStateFromAPIResponse = (response) => {
    const state = {
        lup_pdf: { upload: false, delete: false, current_url: response.land_use_permit || "", temp_url: "" },
        poa_pdf: { upload: false, delete: false, current_url: response.proof_of_address || "", temp_url: "" },
        images_database: response.photos.map(photo => ({ url: photo.url, delete: false })),
        videos_database: response.videos.map(video => ({ url: video.url, delete: false })),
        images_to_upload: [],
        videos_to_upload: []
    };
    setFilesState(state);
};

console.log("Estado inicial de archivos:", getFilesState());