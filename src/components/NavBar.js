import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";
import icon from "../assets/lolIcon.png";
import logo from "../assets/TextLogo.png";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "2px 4px",
        display: "flex",
        whiteSpace: "nowrap",
        // alignItems: "center",
        marginLeft: "20%",
        width: "60%",
        backgroundColor: theme.palette.primary.main,
        height: "60px",
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        height: 50,
        padding: 10,
        // display: "inline-block",
        float: "left",
        paddingRight: "1%",
        marginRight: "1%",
    },
    divider: {
        height: 28,
        margin: 4,
    },
    searchDiv: {
        height: 40,
        width: 400,
        // justifyContent: "right",
        display: "flex",
        float: "right",
        marginRight: "10%",
        marginLeft: "auto",
        marginTop: 7.5,
    },
    icon: {
        height: 40,
        paddingBottom: 10,
    },
    logo: {
        marginLeft: 7,
        height: 50,
    },
    logoDiv: {
        // display: "inline-block",
        paddingLeft: "2%",
    },
}));

export default function NavBar(props) {
    const classes = useStyles();
    const history = useHistory();
    const [search, setSearch] = useState("");
    const formSubmit = (e) => {
        e.preventDefault();
        history.push(`/summoner/${search.replaceAll(" ", "%20")}`);
        setSearch("");
    };

    return (
        <Paper component="form" onSubmit={formSubmit} className={classes.root}>
            <IconButton className={classes.iconButton} onClick={() => history.push(`/`)} aria-label="home">
                <HomeIcon />
            </IconButton>
            <Divider orientation="vertical" flexItem />
            <div className={classes.logoDiv}>
                <img src={icon} alt="League Icon" className={classes.icon} />
                <img src={logo} alt="League of Challenges Logo" className={classes.logo} />
            </div>
            <Paper className={classes.searchDiv}>
                <InputBase
                    className={classes.input}
                    placeholder="Search Your Summoner Name"
                    value={search}
                    onChange={(data) => setSearch(data.target.value)}
                />
                <IconButton type="submit" aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
        </Paper>
    );
}
