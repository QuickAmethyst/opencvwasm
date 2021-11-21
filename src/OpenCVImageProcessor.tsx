import React, { ChangeEventHandler } from 'react';
import useOpenCV from 'useOpenCV';

const noImageSrc = 'https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=20&m=922962354&s=612x612&w=0&h=f-9tPXlFXtz9vg_-WonCXKCdBuPUevOBkp3DQ-i0xqo=';

export default function OpenCVImageProcessor() {
  const imgEl = React.useRef<HTMLImageElement>(null);
  const cv = useOpenCV();
  const canvasId = 'output';

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const targetFiles = e.target.files;
    if (!targetFiles || !imgEl.current) return;
    imgEl.current.src = URL.createObjectURL(targetFiles[0]);
  };

  const handleGrayscale = () => {
    if (!imgEl.current) return;
    const mat = cv.open(imgEl.current);
    const grayscaleMat = cv.grayscale(mat);
    cv.show(grayscaleMat, canvasId);
    mat.delete();
    grayscaleMat.delete();
  };

  const handleBlur = () => {
    if (!imgEl.current) return;
    const mat = cv.open(imgEl.current);
    const blurMat = cv.gaussianBlur(mat);
    cv.show(blurMat, canvasId);
    mat.delete();
    blurMat.delete();
  };

  const handleSharpening = () => {
    if (!imgEl.current) return;
    const mat = cv.open(imgEl.current);
    const sharpnessMat = cv.sharpness(mat);
    cv.show(sharpnessMat, canvasId);
    mat.delete();
    sharpnessMat.delete();
  };

  React.useEffect(() => {
    cv.load();
  }, [cv]);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <img
          ref={imgEl}
          src={noImageSrc}
          alt="selected"
          width={400}
        />

        <input
          type="file"
          alt="image"
          accept="image/png, image/jpeg"
          onChange={handleChange}
        />
      </div>

      <div>
        <canvas id={canvasId} />
        <button
          type="button"
          onClick={handleGrayscale}
        >
          Grayscale
        </button>
        <button
          type="button"
          onClick={handleBlur}
        >
          Blur
        </button>
        <button
          type="button"
          onClick={handleSharpening}
        >
          Sharpening
        </button>
      </div>
    </div>
  );
}
