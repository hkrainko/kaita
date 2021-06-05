import {createStyles, makeStyles, Theme} from "@material-ui/core";
import Footer from "../footer/Footer";
import React from "react";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);


export default function Home() {
    return (
        <React.Fragment>
            <div>
                Home
            </div>
            <Footer/>
        </React.Fragment>

    )
}
