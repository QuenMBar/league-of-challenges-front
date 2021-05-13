import { Paper, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Iron from "../assets/Emblem_Iron.png";
import Bronze from "../assets/Emblem_Bronze.png";
import Silver from "../assets/Emblem_Silver.png";
import Gold from "../assets/Emblem_Gold.png";
import Platinum from "../assets/Emblem_Platinum.png";
import Diamond from "../assets/Emblem_Diamond.png";
import Master from "../assets/Emblem_Master.png";
import GrandMaster from "../assets/Emblem_Grandmaster.png";
import Challenger from "../assets/Emblem_Challenger.png";

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

function summonerRank (rank) {
  const tier = {
    99: "Iron",
    199: "Bronze",
    299: "Silver",
    399: "Gold",
    499: "Platinum",
    599: "Diamond",
    699: "Master",
    799: "GrandMaster",
    800: "Challenger",
  };
  switch (true) {
    case rank <= 99:
      return tier[99];
    case rank <= 199:
      return tier[199];
    case rank <= 299:
      return tier[299];
    case rank <= 399:
      return tier[399];
    case rank <= 499:
      return tier[499];
    case rank <= 599:
      return tier[599];
    case rank <= 699:
      return tier[699];
    case rank <= 799:
      return tier[799];
    case rank >= 800:
      return tier[800];
    default:
      return "Unranked";
  }
}

export default function RankContainer(props) {
    let linked = {
        "Iron": Iron,
        "Bronze": Bronze,
        "Silver": Silver,
        "Gold": Gold,
        "Platinum": Platinum,
        "Diamond": Diamond,
        "Master": Master ,
        "GrandMaster": GrandMaster,
        "Challenger": Challenger,
    }
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <div className={classes.imgDiv}>
                <img src={linked[summonerRank(props.data.score)]} alt="Ranked Icon Img" className={classes.img} />
            </div>

            <div className={classes.text}>
                <Typography variant="h5" component="h5">
                    Rank: {summonerRank(props.data.score)}
                </Typography>
                <Typography variant="h5" component="h5">
                    Score: {props.data.score}
                </Typography>
            </div>
        </Paper>
    );
}
