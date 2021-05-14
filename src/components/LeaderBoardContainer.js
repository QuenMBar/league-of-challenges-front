import { Typography, Paper } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Iron from "../assets/Emblem_Iron.png";
import Bronze from "../assets/Emblem_Bronze.png";
import Silver from "../assets/Emblem_Silver.png";
import Gold from "../assets/Emblem_Gold.png";
import Platinum from "../assets/Emblem_Platinum.png";
import Diamond from "../assets/Emblem_Diamond.png";
import Master from "../assets/Emblem_Master.png";
import GrandMaster from "../assets/Emblem_Grandmaster.png";
import Challenger from "../assets/Emblem_Challenger.png";
import { Link } from "react-router-dom";

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
    paper: {
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
        // maxHeight: "calc(100vh - 90px - 220px)",
        "height": "calc(100vh - 150px)",
        "marginTop": "50px",
        "maxHeight": "100%",
        "overflow": "auto",
        "padding": 10,
        "width": "60%",
        "marginLeft": "20%",
    },
    root: {
        width: "100%",
    },
    container: {
        // maxHeight: 440,
    },
    img: {
        height: 50,
    },
    names: {
        color: "black",
        textDecoration: "none",
    },
}));

function summonerRank(rank) {
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

const columns = [
    { id: "Place", label: "Place", maxWidth: 20 },
    { id: "Icon", label: "Icon", maxWidth: 50 },
    { id: "Name", label: "Name", minWidth: 100 },
    { id: "Level", label: "Level", minWidth: 50 },
    { id: "Tier Icon", label: "Tier Icon", minWidth: 100 },
    { id: "Tier", label: "Tier", minWidth: 100 },
    { id: "Score", label: "Score", minWidth: 100 },
    { id: "Challenges", label: "Challenges", minWidth: 50 },
];

export default function LeaderBoardContainer(props) {
    const classes = useStyles();
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/summoners`)
            .then((resp) => resp.json())
            .then((data) => setLeaders(data));
    }, []);

    // // const classes = useStyles();
    // const [page, setPage] = React.useState(0);
    // const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(+event.target.value);
    //     setPage(0);
    // };

    let linked = {
        Iron: Iron,
        Bronze: Bronze,
        Silver: Silver,
        Gold: Gold,
        Platinum: Platinum,
        Diamond: Diamond,
        Master: Master,
        GrandMaster: GrandMaster,
        Challenger: Challenger,
    };

    return (
        <Paper className={classes.paper}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leaders.map((row, i) => {
                            return (
                                <TableRow hover role="checkbox" key={row.id} tabIndex={-1}>
                                    <TableCell>
                                        <Typography>{i + 1}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <img
                                            src={`http://ddragon.leagueoflegends.com/cdn/11.10.1/img/profileicon/${row.profile_icon_id}.png`}
                                            alt="Ranked Icon Img"
                                            className={classes.img}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/summoner/${row.name}`} className={classes.names}>
                                            <Typography variant="h6" component="h6" className={classes.names}>
                                                {row.name}
                                            </Typography>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{row.summoner_level}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <img
                                            src={linked[summonerRank(row.score)]}
                                            alt="Tier Icon Img"
                                            className={classes.img}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{summonerRank(row.score)}</Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography>{row.score}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{row.attempted_challenges}</Typography>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            /> */}
        </Paper>
    );
}
