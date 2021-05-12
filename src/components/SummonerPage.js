import { Paper } from "@material-ui/core";
import React, { Component } from "react";
import ChallengeContainer from "./ChallengeContainer";

export default class SummonerPage extends Component {
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
        fetch(`http://localhost:3000/summoners/${name}`)
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

    getChallengesInfo = () => {
        fetch(`http://localhost:3000/summoners/${this.state.userData.name}/all_challenges`)
            .then((data) => data.json())
            .then((challengeData) => {
                this.setState({
                    allChallengesData: challengeData,
                });
            });
    };

    getNewChallenges = () => {
        fetch(`http://localhost:3000/summoners/${this.state.userData.name}/new_challenges`)
            .then((data) => data.json())
            .then((challengeData) => {
                console.log(challengeData);
                this.getChallengesInfo();
            });
    };

    deleteChallenge = (id) => {
        fetch(`http://localhost:3000/created_challenges/${id}`, {
            method: "DELETE",
        })
            .then((data) => data.json())
            .then((deleteData) => {
                console.log(deleteData);
                this.getChallengesInfo();
            });
    };

    componentWillUnmount() {
        this.unlisten();
    }

    render() {
        return (
            <Paper>
                Name: {this.props.match.params.name}
                <br />
                Data: {JSON.stringify(this.state.userData)}
                <ChallengeContainer
                    refresh={this.getChallengesInfo}
                    newChallenge={this.getNewChallenges}
                    allChallenges={this.state.allChallengesData}
                    deleteChallenge={this.deleteChallenge}
                />
            </Paper>
        );
    }
}
