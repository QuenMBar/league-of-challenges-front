import { Accordion, AccordionSummary, Button, Typography, AccordionDetails, IconButton } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

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
}));

export default function ChallengeContainer(props) {
    const classes = useStyles();

    return (
        <div>
            <Button onClick={props.newChallenge} variant="contained" color="primary">
                New Challenge
            </Button>
            <Button onClick={props.refresh} variant="contained" color="secondary">
                Refresh
            </Button>
            {props.allChallenges.map((data, i) => (
                <Accordion key={data.id}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>Challenge {i}</Typography>
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                props.deleteChallenge(data.id);
                            }}
                            className={classes.iconButton}
                            aria-label="delete"
                        >
                            <DeleteForeverIcon />
                        </IconButton>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Typography>{JSON.stringify(data)}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}
