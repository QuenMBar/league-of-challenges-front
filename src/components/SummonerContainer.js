import { Button, Paper, ThemeProvider, Typography } from "@material-ui/core";
import React from "react";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { teal } from "@material-ui/core/colors";
import AddIcon from "@material-ui/icons/Add";
import RefreshIcon from "@material-ui/icons/Refresh";

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
    ncButton: {
        marginTop: 20,
    },
    rButton: {
        marginTop: 20,
        marginLeft: 10,
    },
}));

const refreshTheme = createMuiTheme({
    palette: {
        primary: teal,
    },
});

export default function SummonerContainer(props) {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <div className={classes.imgDiv}>
                <img
                    src={`http://ddragon.leagueoflegends.com/cdn/11.10.1/img/profileicon/${props.data.profile_icon_id}.png`}
                    alt="Ranked Icon Img"
                    className={classes.img}
                />
            </div>

            <div className={classes.text}>
                <Typography variant="h5" component="h5">
                    Name: {props.data.name}
                </Typography>
                <Button
                    onClick={props.newChallenge}
                    variant="contained"
                    color="primary"
                    className={classes.ncButton}
                    endIcon={<AddIcon />}
                >
                    New Challenges
                </Button>
                <ThemeProvider theme={refreshTheme}>
                    <Button
                        onClick={props.refresh}
                        color="primary"
                        variant="contained"
                        className={classes.rButton}
                        endIcon={<RefreshIcon />}
                    >
                        Refresh
                    </Button>
                </ThemeProvider>
            </div>
        </Paper>
    );
}
