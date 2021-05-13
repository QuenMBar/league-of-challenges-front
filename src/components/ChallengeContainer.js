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
import ChallengeAccordion from "./ChallengeAccordion";

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
        // maxHeight: "calc(100vh - 90px - 220px)",
        // height: "calc(100vh - 90px - 220px)",
        maxHeight: "100%",
        overflow: "auto",
        padding: 10,
    },
    challenge: {},
}));

export default function ChallengeContainer(props) {
    const classes = useStyles();

    return (
        <Fragment>
            {props.allChallenges.length === 0 ? (
                <Typography className={classes.heading}>User has no challenges yet</Typography>
            ) : null}
            <List className={classes.list}>
                {props.allChallenges.map((data, i) => (
                    <ChallengeAccordion key={data.id} data={data} i={i} />
                ))}
            </List>
        </Fragment>
    );
}
