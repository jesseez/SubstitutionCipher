import React, { Component } from "react";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Snackbar } from "@material-ui/core";
import encryptionUtils from "../../utils/encryptionUtils";
import stringUtils from "../../utils/stringUtils";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default class Encrypt extends Component {
    shortLetterCount = 100;
    encryptionTypes = {
        shift: { name: 'Shift', strategy: encryptionUtils.shift, description: '"Easy, I\'ve got this."' },
        shiftHalf: { name: 'Split Shift', strategy: encryptionUtils.shiftHalf, description: '"Okay this is pretty hard."' },
        random: { name: 'Random', strategy: encryptionUtils.randomize, description: '"Wtf??"' }
    };
    tooShortMessage = "Note: messages that are too short tend to be too hard to solve. For best results, type longer messages.";

    constructor() {
        super();
        this.state = {
            originalText: '',
            width: window.innerWidth,
            selectedEncryption: this.encryptionTypes.shift,
            snackbarOpen: false,
            encryptedText: ''
        };
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }
    
    // make sure to remove the listener
    // when the component is not mounted anymore
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }
    
    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };

    onUpdateText(event) {
        this.setState({ originalText: event.target.value });
    }

    onEncryptionTypeChange(event) {
        this.setState({ selectedEncryption: event.target.value });
    }

    encrypt() {
        const encryptedText = this.state.selectedEncryption.strategy(this.state.originalText);
        this.setState({ encryptedText });
    }

    onSnackbarClose() {
        this.setState({ snackbarOpen: false });
    }

    onCopy() {
        this.setState({ snackbarOpen: true });
    }
    
    render() {
        const isEmpty = !this.state.originalText || 0 === this.state.originalText.length; 
        const isShort = stringUtils.getLetterCount(this.state.originalText) < this.shortLetterCount;
        const width = this.state.width <= 500 ? styles.mobileWidth : styles.desktopWidth;
        
        return (
            <div>
                <div style={styles.title}>
                    <span>Encrypt a message</span>
                </div>
                <TextField 
                    style={width} 
                    multiline 
                    rows="10" 
                    autoFocus={true} 
                    placeholder="Enter your message here" 
                    variant="outlined" 
                    onChange={this.onUpdateText.bind(this)}/>

                <div style={{...styles.optionsContainer, ...width}}>
                    <div style={styles.selectionContainer}>
                        <FormControl style={styles.formControl}>
                            <InputLabel>Encryption Type</InputLabel>
                            <Select
                                value={this.state.selectedEncryption}
                                onChange={this.onEncryptionTypeChange.bind(this)}
                            >
                                {Object.keys(this.encryptionTypes).map((type, i) => (
                                    <MenuItem key={i} value={this.encryptionTypes[type]}>{this.encryptionTypes[type].name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div style={styles.encryptionDescription}><span>{this.state.selectedEncryption.description}</span></div>
                    </div>
                    <div style={styles.buttonContainer}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            disabled={isEmpty} 
                            onClick={this.encrypt.bind(this)}>Encrypt</Button>
                    </div>
                </div>
                {
                    this.state.encryptedText &&
                    <div style={{...styles.results, ...width}}>
                        <div style={styles.errorContainer}>
                            {
                                isShort && <div><span>{this.tooShortMessage}</span></div>
                            }
                        </div>
                        <div style={styles.encryptedContainer}>
                            <div style={styles.encryptedText}>
                                <span>{this.state.encryptedText}</span>
                            </div>
                        </div>
                        <CopyToClipboard text={this.state.encryptedText} onCopy={this.onCopy.bind(this)}>
                            <Button 
                                variant='contained' 
                                color='primary' 
                            >
                                Copy
                            </Button>
                        </CopyToClipboard>
                    </div>
                }
                <Snackbar
                    anchorOrigin={styles.snackbar}
                    open={this.state.snackbarOpen}
                    onClose={this.onSnackbarClose.bind(this)}
                    message='Copied!'
                    autoHideDuration={2000}
                />
            </div>
        );
    }
}

const styles = {
    desktopWidth: {
        width:'50vw'
    },
    mobileWidth: {
        width:'75vw'
    },
    input: {
        maxHeight: '50vh'
    },
    title: {
        fontSize: '20px',
        padding: '16px'
    },
    optionsContainer: {
        display: 'inline-flex',
        justifyContent: 'space-between',
        margin: '20px'
    },
    selectionContainer: {
        display: 'inline-flex',
        flexWrap: 'wrap'
    },
    formControl: {
        marginRight: '8px',
        marginBottom: '8px',
        minWidth: '120px',
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    encryptionDescription: {
        display: 'flex',
        alignItems: 'center',
        marginRight: '8px'
    },
    results: {
        display: 'inline-block',
        paddingBottom: '32px'
    },
    errorContainer: {
        textAlign: 'start',
        padding: '8px',
    },
    encryptedContainer: {
        textAlign: 'start',
    },
    encryptedText: {
        marginBottom: '8px',
        backgroundColor: '#eff0f1',
        padding: '8px',
        paddingLeft: '16px',
        overflowWrap: 'break-word'
    }
}