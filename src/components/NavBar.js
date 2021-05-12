import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
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
            <InputBase
                className={classes.input}
                placeholder="Search Your Summoner Name"
                value={search}
                onChange={(data) => setSearch(data.target.value)}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}
