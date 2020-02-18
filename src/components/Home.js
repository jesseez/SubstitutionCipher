import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <div style={styles.title}>
                <span>What would you like to do?</span>
            </div>
            <div>
                <Link to="/encrypt" style={styles.buttonContainer}>
                    <Button variant="contained" color="primary" style={styles.button}>Encrypt a message</Button>
                </Link>
            </div>
            <div>
                <Link to="/decrypt" style={styles.buttonContainer}>
                    <Button variant="contained" color="primary" style={styles.button}>Crack a code</Button>
                </Link>
            </div>
        </div>
    );
}

const styles = {
    buttonContainer: {
        textDecoration:"none"
    },
    button: {
        margin: '12px',
        width: '240px'
    },
    title: {
        fontSize: '20px',
        padding: '16px'
    }
}