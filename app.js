
const express = require('express');
const multer = require('multer');

const app = express();

// 이미지를 저장할 디렉토리 설정
const upload = multer({ dest: 'uploads/' });

// 이미지 업로드 및 URL 반환
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided' });
  }
  
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// 정적 파일을 호스팅할 경로 설정
app.use('/uploads', express.static('uploads'));

// 서버 실행
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
