import { Paper } from "@material-ui/core";
import React, { Component } from "react";
import ChallengeContainer from "./ChallengeContainer";
import RankContainer from "./RankContainer";
import SummonerContainer from "./SummonerContainer";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
    root: {
        "display": "flex",
        "flexDirection": "column",
        "flexFlow": "column",
        "height": "calc(100% - 90px)",
        "@global": {
            "*::-webkit-scrollbar": {
                width: "6px",
            },
            "*::-webkit-scrollbar-track": {
                "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
                "borderRadius": "5px",
            },
            "*::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,96,100,.6)",
                borderRadius: "5px",
            },
        },
    },
    userInfo: {
        width: "70%",
        marginLeft: "15%",
        height: "220px",
        display: "flex",
        justifyContent: "space-between",
        // flex: "0 1 auto",
    },
    challengeDiv: {
        width: "60%",
        marginLeft: "20%",
        height: "calc(100vh - 90px - 220px)",
        // flex: "1 1 auto",
    },
});
class SummonerPage extends Component {
    state = {
        userData: {},
        allChallengesData: [],
    };

    componentDidMount() {
        this.getSummonerInfo(this.props.match.params.name);
        this.unlisten = this.props.history.listen((location, action) => {
            if (location.pathname.split("/")[2] !== undefined) {
                this.getSummonerInfo(location.pathname.split("/")[2]);
            }
        });
    }

    getSummonerInfo = (name) => {
        fetch(`https://loc-backend.herokuapp.com/summoners/${name}`)
            .then((data) => data.json())
            .then((summonerData) => {
                this.setState(
                    {
                        userData: summonerData,
                    },
                    this.getChallengesInfo
                );
            });
    };

    getJustSummonerInfo = () => {
        fetch(`https://loc-backend.herokuapp.com/summoners/${this.state.userData.name}`)
            .then((data) => data.json())
            .then((summonerData) => {
                this.setState({
                    userData: summonerData,
                });
            });
    };

    getChallengesInfo = () => {
        fetch(`https://loc-backend.herokuapp.com/created_challenges/${this.state.userData.name}`)
            .then((data) => data.json())
            .then((challengeData) => {
                if (Array.isArray(challengeData)) {
                    console.log(challengeData);
                    this.setState(
                        {
                            allChallengesData: challengeData,
                        },
                        this.getJustSummonerInfo
                    );
                }
            });
    };

    getNewChallenges = () => {
        fetch(`https://loc-backend.herokuapp.com/created_challenges`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                summoner: this.state.userData.name,
            }),
        })
            .then((data) => data.json())
            .then((challengeData) => {
                console.log(challengeData);
                this.getChallengesInfo();
            });
    };

    deleteChallenge = (id) => {
        fetch(`https://loc-backend.herokuapp.com/created_challenges/${id}`, {
            method: "DELETE",
        })
            .then((data) => data.json())
            .then((deleteData) => {
                console.log(deleteData);
                this.getChallengesInfo();
            });
    };

    updateNote = (note, id) => {
        fetch(`https://loc-backend.herokuapp.com/created_challenges/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                notes: note,
            }),
        })
            .then((data) => data.json())
            .then((noteData) => {
                console.log(noteData);
            });
    };

    componentWillUnmount() {
        this.unlisten();
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.userInfo}>
                    <RankContainer data={this.state.userData} />
                    <SummonerContainer
                        data={this.state.userData}
                        refresh={this.getChallengesInfo}
                        newChallenge={this.getNewChallenges}
                        allChallenges={this.state.allChallengesData}
                        deleteChallenge={this.deleteChallenge}
                    />
                </div>

                <Paper className={classes.challengeDiv}>
                    <ChallengeContainer
                        updateNote={this.updateNote}
                        refresh={this.getChallengesInfo}
                        newChallenge={this.getNewChallenges}
                        allChallenges={this.state.allChallengesData}
                        deleteChallenge={this.deleteChallenge}
                    />
                </Paper>
            </div>
        );
    }
}

export default withStyles(useStyles)(SummonerPage);
