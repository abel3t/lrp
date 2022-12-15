// ** React Imports
import { useEffect, useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography, { TypographyProps } from '@mui/material/Typography'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'

interface FileProp {
  name: string
  type: string
  size: number
}

const UploadImage = ({ file, setFile, imageUrl }: any) => {
  // ** State
  const [files, setFiles] = useState<File[]>([])

  useEffect(() => {
    if (file) {
      setFiles([file]);
    }
  }, [file])

  const handleChangeFile = (acceptedFiles: File[]) => {
    const dropFiles: File[] = [];
    acceptedFiles.forEach((file: File) => {
      dropFiles.push(Object.assign(file));
      setFile(file);
    });

    setFiles(dropFiles);
  }

  // ** Hook
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: handleChangeFile
  })

  return (
    <Box {...getRootProps({ className: 'dropzone' })} sx={{ height: 205, boxSizing: 'content-box',  border: '1px solid', borderRadius: '5px', color: 'text.disabled', display: 'flex',  alignItems: 'center', cursor: 'pointer' }}>
      <input {...getInputProps()} />

      {
        !!imageUrl && !files.length &&
        <img alt={'N/A'} className='single-file-image' src={imageUrl} width={200} height={200} />
      }

      {
        !!files.length && files?.map((file: FileProp) => (
          <img key={file.name} alt={file.name} className='single-file-image' src={URL.createObjectURL(file as any)} width={200} height={200} />
        ))
      }

      {!imageUrl && !files.length &&
        <Box sx={{padding: '15px'}}>
          <Typography color='textSecondary' >
            Drop image here or click to share your story...
          </Typography>
        </Box> }
    </Box>
  )
}

export default UploadImage
