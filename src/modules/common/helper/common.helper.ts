import axios from 'axios';
import {
  PINATA_FILE_TO_IPFS,
  PINATA_JSON_TO_IPFS,
} from 'src/constants/Url.constant';

class CommonHepler {
  constructor() {}
  async postPinata(formData: FormData) {
    try {
      const res = await axios.post(PINATA_FILE_TO_IPFS, formData, {
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': `multipart/form-data;`,
          pinata_api_key: process.env.API_KEY_PINATA,
          pinata_secret_api_key: process.env.API_SECRET_PINATA,
        },
      });
      return res.data;
    } catch (error) {
      console.error('Error post Pinata:', error.response.data);
      throw error.response.data;
    }
  }

  uploadMetadataToIPFS = async (data: any) => {
    try {
      const res = await axios.post(PINATA_JSON_TO_IPFS, data, {
        headers: {
          'Content-Type': 'application/json',
          pinata_api_key: process.env.API_KEY_PINATA,
          pinata_secret_api_key: process.env.API_SECRET_PINATA,
        },
      });
      return res.data;
    } catch (error) {
      console.error('Error uploading metadata to IPFS:', error.response.data);
    }
  };
}

export default new CommonHepler();
