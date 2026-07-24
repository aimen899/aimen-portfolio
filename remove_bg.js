import sharp from 'sharp';

async function removeBackground() {
  const inputPath = 'C:\\Users\\NexGen\\.gemini\\antigravity-ide\\brain\\4d682164-31ad-4e5b-bfff-6d0d03ab38ee\\aimen_3d_stylized_girl_avatar_1784841854721.png';
  const outputPath = 'c:\\All Projects\\My Portfolio Website\\src\\assets\\aimen_3d_stylized_girl_avatar.png';

  const image = sharp(inputPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

  const channels = info.channels;
  const newBuffer = Buffer.alloc(info.width * info.height * 4);

  for (let i = 0; i < info.width * info.height; i++) {
    const r = data[i * channels];
    const g = data[i * channels + 1];
    const b = data[i * channels + 2];

    const brightness = (r + g + b) / 3;

    let alpha = 255;
    if (brightness > 225) {
      alpha = Math.max(0, Math.min(255, Math.floor((252 - brightness) * 11)));
    }

    newBuffer[i * 4] = r;
    newBuffer[i * 4 + 1] = g;
    newBuffer[i * 4 + 2] = b;
    newBuffer[i * 4 + 3] = alpha;
  }

  await sharp(newBuffer, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  })
  .png()
  .toFile(outputPath);

  console.log('Successfully created transparent stylized 3D girl avatar!');
}

removeBackground().catch(console.error);
