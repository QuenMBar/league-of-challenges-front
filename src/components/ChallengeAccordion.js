import {
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails,
    IconButton,
    TextField,
    Divider,
    AccordionActions,
    Button,
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
    textfeild: {
        width: "80%",
        marginRight: "15%",
    },
    detailsDiv: {
        width: "100%",
    },
    typeDiv: {
        textAlign: "left",
        width: "100%",
        marginLeft: "5%",
        marginRight: "5%",
    },
}));

export default function ChallengeAccordion(props) {
    const classes = useStyles();
    const [queue, setQueue] = useState({});
    const [expanded, setExpanded] = React.useState(false);
    const [challengeString, setChallengeString] = React.useState("");
    const [notes, setNotes] = React.useState("");

    const handleChange = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        if (props.data.notes !== null) {
            setNotes(props.data.notes);
        }

        let request = props.data.challenge.text;
        if (request.includes("<summoner_spell>")) {
            fetch(`http://localhost:3000/summoner_spells/${props.data.summoner_spell}`)
                .then((resp) => resp.json())
                .then((data) => {
                    setChallengeString(request.replace("<summoner_spell>", data.name));
                });
        } else if (request.includes("<champion_spell>")) {
            let championSpell = "";
            switch (Number.parseInt(props.data.champion_spell)) {
                case 1:
                    championSpell = props.data.champion.spell_1_name;
                    break;
                case 2:
                    championSpell = props.data.champion.spell_2_name;
                    break;
                case 3:
                    championSpell = props.data.champion.spell_3_name;
                    break;
                case 4:
                    championSpell = props.data.champion.spell_4_name;
                    break;
                default:
                    championSpell = "unknown";
                    break;
            }
            setChallengeString(request.replace("<champion_spell>", championSpell));
        } else {
            setChallengeString(request);
        }
        if (!props.data.attempted) {
            setExpanded(true);
        }
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
        <Accordion expanded={expanded} onChange={handleChange} className={classes.challenge}>
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
                        {props.data.challenge_succeeded !== null ? (
                            <Fragment>Challenge Completed: {props.data.challenge_succeeded.toString()} </Fragment>
                        ) : null}
                    </Typography>
                </div>
                <div className={classes.div2}>
                    <Typography className={classes.heading}>
                        Challenge: {props.data.challenge.name.toString()}
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
                <div className={classes.detailsDiv}>
                    <div className={classes.typeDiv}>
                        <Typography>Challenge: {challengeString}</Typography>
                        {props.data.attempted ? <Typography>Result: {props.data.challenge_status}</Typography> : null}
                    </div>

                    <br />
                    <TextField
                        id="notes"
                        label="notes"
                        placeholder="Add Notes Here"
                        multiline
                        variant="outlined"
                        className={classes.textfeild}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
            </AccordionDetails>
            <Divider />
            <AccordionActions>
                <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={() => props.updateNote(notes, props.data.id)}
                >
                    Save
                </Button>
            </AccordionActions>
        </Accordion>
    );
}
