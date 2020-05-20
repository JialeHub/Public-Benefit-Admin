import {axiosF, axiosFs} from "./request";

/**
 * @module 图片
 * */
const uploadPictureUrl = 'file/uploadPictureFile';

export const uploadPictureApi = data => axiosF(uploadPictureUrl, data);
export const uploadPicturePlusApi = data => axiosFs(uploadPictureUrl, data);

/**
 * @module 音频
 * */
const uploadAudioUrl = 'file/uploadAudioFile';

export const uploadAudioApi = data => axiosF(uploadAudioUrl, data);
export const uploadAudioPlusApi = data => axiosFs(uploadAudioUrl, data);

/**
 * @module 视频
 * */
const uploadVideoUrl = 'file/uploadVideoFile';

export const uploadVideoApi = data => axiosF(uploadVideoUrl, data);
export const uploadVideoPlusApi = (data, callback, source) => axiosFs(uploadVideoUrl, data, callback, source);

/**
 * @module 文档
 * */
const uploadDocumentsUrl = 'file/uploadDocumentsFile';

export const uploadDocumentsApi = data => axiosF(uploadDocumentsUrl, data);
export const uploadDocumentsPlusApi = data => axiosFs(uploadDocumentsUrl, data);
