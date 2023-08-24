import { callApi } from 'dhm/services/auth/apis';

export const apiS3 = {
  uploadAvatar: (type) => `/s3/presigned-url/${type}`,
};

async function getS3PresignedUrl({ fileList }) {
  const res = await callApi({
    method: 'post',
    url: apiS3.uploadAvatar('avatar'),
    data: fileList[0],
  });
  return res;
}

export { getS3PresignedUrl };
