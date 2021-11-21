import { useCallback, useRef } from 'react';
import { loadScript } from 'simpleLoad';

export default function useOpenCV() {
  const cvRef = useRef<Record<string, any>>();

  const load = useCallback(async () => {
    await loadScript('https://quickamethyst.github.io/opencvwasm/opencv.js');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cvRef.current = await window.cv;
  }, []);

  const open = useCallback((el: HTMLImageElement) => {
    const cv = cvRef.current;
    if (!cv) return null;
    const mat = cv.imread(el);
    return mat;
  }, []);

  const show = useCallback((mat: unknown, canvasId: string) => {
    const cv = cvRef.current;
    if (!cv) return;
    cv.imshow(canvasId, mat);
  }, []);

  const grayscale = useCallback((mat: unknown) => {
    const cv = cvRef.current;
    if (!cv) return null;
    const dst = new cv.Mat();
    cv.cvtColor(mat, dst, cv.COLOR_BGR2GRAY);
    return dst;
  }, []);

  const gaussianBlur = useCallback((mat: unknown) => {
    const cv = cvRef.current;
    if (!cv) return null;
    const dst = new cv.Mat();
    const ksize = new cv.Size(5, 5);
    cv.GaussianBlur(mat, dst, ksize, 0, 0, cv.BORDER_DEFAULT);
    return dst;
  }, []);

  const sharpness = useCallback((mat: unknown) => {
    const cv = cvRef.current;
    if (!cv) return null;
    const dst = new cv.Mat();
    const kernel = cv.matFromArray(3, 3, cv.CV_32FC1, [0, -1, 0, -1, 5, -1, 0, -1, 0]);
    const anchor = new cv.Point(-1, -1);
    cv.filter2D(mat, dst, cv.CV_8U, kernel, anchor, 0, cv.BORDER_DEFAULT);
    return dst;
  }, []);

  return {
    load,
    show,
    open,
    grayscale,
    gaussianBlur,
    sharpness,
  };
}
