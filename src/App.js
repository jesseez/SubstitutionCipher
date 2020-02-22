import React from "react";
import { HashRouter, Route, Link } from 'react-router-dom';
import "./App.css";
import { createMuiTheme } from '@material-ui/core/styles';
import Home from './components/Home';
import Encrypt from './components/encrypt/Encrypt';
import Decrypt from './components/decrypt/Decrypt';
import ThemeProvider from "@material-ui/core/styles/MuiThemeProvider";



function App() {
    return (
        <HashRouter basename="/">
            <ThemeProvider theme={theme}>
                <div className="App">
                    <header className="App-header">
                        <div>
                            <Link to="/" className="App-title">
                                <span>Substitution Cipher</span>
                            </Link>
                        </div>
                        <div>
                            <Link to="/" className="App-nav-option">
                                <span>Home</span>
                            </Link>
                        </div>
                        <div>
                            <Link to="/encrypt" className="App-nav-option">
                                <span>Encrypt</span>
                            </Link>
                        </div>
                        <div>
                            <Link to="/decrypt" className="App-nav-option">
                                <span>Decrypt</span>
                            </Link>
                        </div>
                        <div className="my-name">
                            <span>Jessee Zhang</span>
                        </div>
                    </header>
                    <div className="App-body">
                        <Route exact path="/" component={Home} />
                        <Route path="/encrypt" component={Encrypt} />
                        <Route path="/decrypt" component={Decrypt} />
                    </div>
                </div>
            </ThemeProvider>
        </HashRouter>
    );
}

export default App;

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#620235',
            dark: '#2E0219'
        }
    }
})