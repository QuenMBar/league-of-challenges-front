import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import cyan from "@material-ui/core/colors/cyan";
import red from "@material-ui/core/colors/red";
import LandingPage from "./components/LandingPage";
import SummonerPage from "./components/SummonerPage";
import ErrorPage from "./components/ErrorPage";
import NavBar from "./components/NavBar";

class App extends Component {
    theme = createMuiTheme({
        palette: {
            primary: {
                main: cyan[200],
            },
            secondary: red,
        },
    });

    render() {
        return (
            <div className="App">
                <ThemeProvider theme={this.theme}>
                    <Router>
                        <NavBar />
                        <Switch>
                            <Route exact path="/">
                                <LandingPage />
                            </Route>
                            <Route path="/summoner/:name" render={(props) => <SummonerPage {...props} />} />
                            <Route path="*">
                                <ErrorPage />
                            </Route>
                        </Switch>
                    </Router>
                </ThemeProvider>
            </div>
        );
    }
}

export default App;
