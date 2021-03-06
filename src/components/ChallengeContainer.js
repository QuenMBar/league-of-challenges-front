import { Typography, List } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

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
    accordion: {
        width: "97%",
    },
}));

export default function ChallengeContainer(props) {
    const classes = useStyles();

    return (
        <Fragment>
            {props.allChallenges.length === 0 ? (
                <Typography className={classes.heading}>User has no challenges yet</Typography>
            ) : null}
            <List className={classes.list}>
                <div className={classes.accordion}>
                    {props.allChallenges.map((data, i) => (
                        <ChallengeAccordion
                            key={data.id}
                            data={data}
                            i={i}
                            updateNote={props.updateNote}
                            deleteChallenge={props.deleteChallenge}
                        />
                    ))}
                </div>
            </List>
        </Fragment>
    );
}
