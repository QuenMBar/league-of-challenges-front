import {
    Accordion,
    AccordionSummary,
    Button,
    Typography,
    AccordionDetails,
    IconButton,
    GridList,
    List,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Fragment } from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        // width: "100%",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    iconButton: {
        padding: 10,
    },
    list: {
        maxHeight: "100%",
        overflow: "auto",
        padding: 10,
    },
    challenge: {},
    div2: {
        paddingLeft: 8,
    },
}));

export default function ChallengeAccordion(props) {
    const classes = useStyles();
    const [queue, setQueue] = useState({});

    useEffect(() => {
        fetch(`http://localhost:3000/league_queues/${props.data.map_id}`)
            .then((resp) => resp.json())
            .then((data) => setQueue(data));
    }, []);

    const timeSince = (date) => {
        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    };

    let timeAgo = timeSince(new Date(JSON.parse(props.data.participants_json).gameStartTime));

    return (
        <Accordion className={classes.challenge}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <div>
                    <Typography className={classes.heading}>{queue.description}</Typography>
                    {/* <br /> */}
                    <Typography className={classes.heading}>Played {timeAgo}</Typography>
                </div>
                <div className={classes.div2}>
                    <Typography className={classes.heading}>
                        Challenge Attempted: {props.data.attempted.toString()}
                    </Typography>
                    {/* <br /> */}
                    <Typography className={classes.heading}>
                        Challenge Completed: {props.data.challenge_succeeded}
                    </Typography>
                </div>
                <IconButton
                    onClick={(e) => {
                        e.stopPropagation();
                        props.deleteChallenge(props.data.id);
                    }}
                    className={classes.iconButton}
                    aria-label="delete"
                >
                    <DeleteForeverIcon />
                </IconButton>
            </AccordionSummary>

            <AccordionDetails>
                <Typography>{JSON.stringify(props.data.challenge_status)}</Typography>
            </AccordionDetails>
        </Accordion>
    );
}
