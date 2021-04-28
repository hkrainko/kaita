import 'react-image-crop/dist/ReactCrop.css';
import React, {useCallback, useEffect, useRef, useState} from "react";
import ReactCrop from "react-image-crop";

export default function AppImageCrop({src}: {src: string}) {
    const [crop, setCrop] = useState({ aspect: 1 });

    return( <ReactCrop src={src} crop={crop} onChange={(newCrop: any) => setCrop(newCrop)} circularCrop={true} />)
}
