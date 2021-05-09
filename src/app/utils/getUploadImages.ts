import imageCompression from "browser-image-compression";

const getUploadImages = async (files: File[]) => {
    let results: File[] = []
    for (const file of files) {
        console.log(`processing file size: ${file.size / 1024 / 1024}MB`);
        if (file.size <= 10 * 1024 * 1024) {
            console.log(`file size <= 10MB use origin file`);
            results.push(file);
            continue
        }
        console.log(`file size > 10MB compressing`);
        const options = {
            maxSizeMB: 10,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        };
        try {
            const compressedFile = await imageCompression(file, options);
            console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
            console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
            results.push(compressedFile)
        } catch (error) {
            console.log(error);
        }
    }
    return results
}

export default getUploadImages
