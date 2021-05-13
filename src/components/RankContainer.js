import { Paper, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import plat from "../assets/Emblem_Platinum.png";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "80%",
        marginTop: 20,
        width: "45%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    img: {
        height: "100%",

        // display: "inline",
        // float: "left",
    },
    imgDiv: {
        height: "80%",
        flexGrow: "2",
    },
    text: {
        marginLeft: "5%",
        flexGrow: "3",
        textAlign: "left",
        // display: "inline",
        // float: "right",
    },
}));

export default function RankContainer(props) {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <div className={classes.imgDiv}>
                <img src={plat} alt="Ranked Icon Img" className={classes.img} />
            </div>

            <div className={classes.text}>
                <Typography variant="h5" component="h5">
                    Rank: Plat
                </Typography>
                <Typography variant="h5" component="h5">
                    Score: 1005
                </Typography>
            </div>
        </Paper>
    );
}
