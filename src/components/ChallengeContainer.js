import { Accordion, AccordionSummary, Button, Typography, AccordionDetails } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
    root: {
        // width: "100%",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
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
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>Challenge {i}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{JSON.stringify(data)}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}
