import FormData from 'form-data';
import axios from 'axios';
import fs from 'fs';

const JWT =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxYmFmNDc5My1hNmMyLTQ2MTMtYWU2Ny04MjBkMTNiNWY4OTkiLCJlbWFpbCI6InRoYW5ocXVpc2cyNEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiOTA4YjhlZjIzY2M4ODhmZjNlYWUiLCJzY29wZWRLZXlTZWNyZXQiOiJkNjUzZGI2YjU1OGI5ZGQxY2YyMGIyODc1YmIxYTBlYjVjYzg2MGNjMWIyMzUxMzdlMzRjMjNlZThhMGViYmUxIiwiaWF0IjoxNjc2MzYyODUwfQ.7IA5fKDOvMh9YUfM7k6xRDB_TgG5T_73TCjt0bW4L2s';

const pinFileToIPFS = async () => {
  const formData = new FormData();
  const src = './GettyImages-845712410.jpg';

  const file = fs.createReadStream(src);
  formData.append('file', file);

  const metadata = JSON.stringify({
    name: 'ok name',
  });
  formData.append('pinataMetadata', metadata);

  const options = JSON.stringify({
    cidVersion: 0,
  });
  formData.append('pinataOptions', options);

  try {
    const res = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
          Authorization: JWT,
        },
      },
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

pinFileToIPFS().then();
