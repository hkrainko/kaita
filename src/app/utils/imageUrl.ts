import config from "../config";

export enum ImageSize {
    Small,
    Middle,
    Large,
    Raw
}

const imgBySize = (size: ImageSize, path: string): string => {
    // if (!path) {
    //     return undefined
    // }
    let imgPath = config.IMG_PATH
    const ss = path.split(".")
    if (ss.length > 2) {
        return imgPath + path
    }

    switch (size) {
        case ImageSize.Small:
            return imgPath + ss[0] + config.IMG_SMALL_SUFFIX
        case ImageSize.Middle:
            return imgPath + ss[0] + config.IMG_MIDDLE_SUFFIX
        case ImageSize.Large:
            return imgPath + ss[0] + config.IMG_LARGE_SUFFIX
        default:
            return imgPath + path
    }
}

export default imgBySize
