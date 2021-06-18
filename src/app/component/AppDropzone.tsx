import {DropzoneProps, DropzoneRootProps, useDropzone} from "react-dropzone";
import {useMemo} from "react";
import {makeStyles, StandardProps} from "@material-ui/core";

const useStyles = makeStyles({
    root: {},
    box: {}
});

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

interface Props extends DropzoneProps, StandardProps<any, any> {

}

export default function AppDropzone(props: Props) {

    const classes = useStyles(props);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone(props);

    const baseStyle = useMemo(() => {
        return {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            borderWidth: 2,
            borderRadius: 2,
            borderColor: '#eeeeee',
            borderStyle: 'dashed',
            backgroundColor: '#ffffff',
            color: '#bdbdbd',
            outline: 'none',
            transition: 'border .24s ease-in-out',
            ...props.classes,
        }
    }, [props])

    const style: DropzoneRootProps = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [baseStyle, isDragActive, isDragAccept, isDragReject]);

    return (
        <div className="container">
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                <p>拖放到此處或單擊以選擇</p>
            </div>
        </div>
    );
}
