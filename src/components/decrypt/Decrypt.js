import React, { Component } from "react";
import { TextField, Button, Snackbar } from "@material-ui/core";
import stringUtils from "../../utils/stringUtils";

export default class Decrypt extends Component {
    constructor() {
        super();
        
        this.state = {
            encryptedText: '',
            width: window.innerWidth,
            letterMap: new Map(),
            snackbarOpen: false
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

    onUpdateEncryptedText(event) {
        this.setState({ encryptedText: event.target.value });
    }

    renderText(text) {
        return text.split('\n').map((p, i) => this.renderParagraph(p, i));
    }

    renderParagraph(paragraph, key) {
        if(paragraph) {
            return (
                <div key={key} style={styles.paragraph}>
                    {paragraph.split(/(\s+)/).map((w, i) => this.renderWord(w.trim(), i))}
                </div>
            );
        }
    }

    renderWord(word, key) {
        if(word) {
            return(
                <div key={key} style={styles.word}>
                    {
                        word.split('').map((x, i) =>
                            stringUtils.isLetter(x)
                                ? this.renderLetter(x.trim(), this.state.letterMap[x.toLowerCase()], i)
                                : <div key={i} style={styles.symbol}><span>{x}</span></div>
                        )
                    }
                </div>
            );
        }
    }

    renderLetter(letter, translation, key) {
        if (translation) {
            translation = letter === letter.toUpperCase() ? translation.toUpperCase() : translation;
        }
        
        return <TextField 
                    key={key}
                    label={letter} 
                    value={translation || ''} 
                    variant="outlined" 
                    style={styles.letterInputProps} 
                    inputProps={styles.letterInputInputProps}
                    InputLabelProps={styles.letterInputLabelProps}
                    onChange={this.getOnLetterChange(letter).bind(this)}
                />;
    }

    getOnLetterChange(letter) {
        return (event) => {
            const {value} = event.target;
            var index = value.length - 1;
            while(index >= 0 && !stringUtils.isLetter(value[index])) {
                index--;
            }

            const map = this.state.letterMap;
            map[letter.toLowerCase()] = index >= 0 ? value[index].toLowerCase() : '';
            this.setState({ letterMap: map });
        };
    }

    translateMessage() {
        var message = '';
        const {encryptedText, letterMap} = this.state;

        for(var i = 0; i < encryptedText.length; i++) {
            var c = encryptedText[i];
            const isUpper = c === c.toUpperCase();
            if(stringUtils.isLetter(c)) {
                message += isUpper ? letterMap[c.toLowerCase()].toUpperCase() : letterMap[c.toLowerCase()];
            } else {
                message += c;
            }
        }
        return message;
    }

    onSnackbarClose() {
        this.setState({ snackbarOpen: false });
    }

    onCopy() {
        navigator.clipboard.writeText(this.translateMessage())
        this.setState({ snackbarOpen: true });
    }

    render() {
        const width = this.state.width <= 500 ? styles.mobileWidth : styles.desktopWidth;
        const inputWidth = width.input;
        const decryptWidth = width.decrypt;
        const distinctLetters = [...new Set(this.state.encryptedText.toLowerCase())].filter(stringUtils.isLetter);
        const isSolved = distinctLetters.length > 0 && distinctLetters.length === Object.values(this.state.letterMap).length;

        return (
            <div>
                <div style={styles.title}>
                    <span>Decrypt a message</span>
                </div>
                <TextField 
                    style={inputWidth} 
                    multiline 
                    rows="10" 
                    autoFocus={true} 
                    placeholder="Enter the encrypted message here" 
                    variant="outlined" 
                    onChange={this.onUpdateEncryptedText.bind(this)}/>

                <div style={{...styles.decryptContainer, ...decryptWidth}}>
                    <div>
                        {this.renderText(this.state.encryptedText)}
                    </div>
                </div>
                <div style={{...styles.decryptedMessage, ...inputWidth}}>
                    { isSolved &&
                        <div>
                            <div><span>Your decrypted message:</span></div>
                            <div style={styles.decryptedTextContainer}>
                                <div style={styles.decryptedText}>
                                    {this.translateMessage()}
                                </div>
                            </div>
                            <Button 
                                variant='contained' 
                                color='primary' 
                                onClick={this.onCopy.bind(this)}
                            >
                                Copy
                            </Button>
                        </div>
                    }
                    </div>
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
        input: {
            width:'50vw'
        },
        decrypt: {
            width:'65vw'
        }
    },
    mobileWidth: {
        input: {
            width:'75vw'
        },
        decrypt: {
            width:'85vw'
        }
    },
    input: {
        maxHeight: '50vh'
    },
    title: {
        fontSize: '20px',
        padding: '16px'
    },
    letterInputProps: {
        width: '34px',
        textAlign: 'center'
    },
    letterInputInputProps: {
        style: {
            textAlign: 'center',
            paddingLeft: '0px',
            paddingRight:'0px'
        }
    },
    letterInputLabelProps: {
        shrink: true
    },
    paragraph: {
        display: 'inline-flex',
        flexWrap: 'wrap'
    },
    word: {
        flex: 'none',
        padding: '16px',
        paddingLeft: '0px',
        paddingRight: '16px'
    },
    symbol: {
        display: 'inline-flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: '4px',
        paddingRight: '4px',
        fontSize: '20px'
    },
    decryptContainer: {
        display: 'inline-block',
        paddingBottom: '32px',
        paddingTop: '32px',
        overflowX: 'auto',
        marginTop: '32px',
        marginBottom: '32px'
    },
    decryptedTextContainer: {
        textAlign: 'start'
    },
    decryptedText: {
        marginTop: '8px',
        marginBottom: '8px',
        backgroundColor: '#eff0f1',
        padding: '8px',
        paddingLeft: '16px'
    },
    decryptedMessage: {
        padding: '16px',
        display: 'inline-block',
        overflowWrap: 'break-word'
    },
    snackbar: {
        vertical: 'bottom',
        horizontal: 'center'
    }
}