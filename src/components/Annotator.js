import React from 'react'
//import CSVReader from "react-csv-reader";
import { TokenAnnotator } from 'react-text-annotate'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import { CSVReader } from 'react-papaparse';



class Annotator extends React.Component {

    state = {
        totalDocs: 1,
        entities: [],
        value: [{ text: "", position: [] }],
        tag: '',
        currentDoc: 0
    }

    handleChange = metaData => {
        const newState = { ...this.state }
        newState.value[newState.currentDoc].position = metaData
        this.setState(newState)
    }

    handleTagChange = e => {
        this.setState({ tag: e.target.value })
    }

    onChange = e => {
        this.setState({ entity: e.target.value.toUpperCase() })
    }
    onSubmit = e => {
        e.preventDefault();
        this.setState({ entities: [...this.state.entities, this.state.entity], entity: '' })
        console.log(this.state.entities)
    };

    handleOnDrop = (results) => {
        let currentText = 0
        let totalDocs = results.length
        const newState = { ...this.state }
        while (totalDocs > 0) {
            if (currentText === 0) {
                newState.value[0] = { text: results[currentText].data[0], position: [] }
                newState.totalDocs = results.length
            } else {
                newState.value.push({ text: results[currentText].data[0], position: [] })
            }
            this.setState(newState)
            currentText++
            totalDocs -= 1
        }

    }

    handleNext = () => {
        const newState = { ...this.state }
        if (newState.currentDoc === newState.totalDocs - 1) {
            alert("Docs Over")
        } else {
            newState.currentDoc += 1
            this.setState(newState)
        }
    }

    handlePrevious = () => {
        const newState = { ...this.state }
        if (newState.currentDoc === 0) {
            alert("Docs Over")
        } else {
            newState.currentDoc -= 1
            this.setState(newState)
        }
    }

    handleDownload = () =>{
        console.log(this.state)
        let tagData = JSON.stringify(this.state.value)
        var data = new Blob([tagData], {type: 'text/csv'});
    var txtURL = window.URL.createObjectURL(data);
    var tempLink = document.createElement('a');
    tempLink.href = txtURL;
    tempLink.setAttribute('download', 'filename.txt');
    tempLink.click();
    }

    render() {
        return (
            <div style={{ padding: 24, fontFamily: "monospace" }}>
                <div style={{ display: 'flex', marginBottom: 24 }}>
                    <Paper elevation={5}>
                        <div style={{ backgroundColor: "#8A2BE2", fontSize: "30px", padding: "10px", fontWeight: 800, color: "white" }}>
                            Mark Master
                        </div>
                        <div style={{ margin: "1rem" }}>
                            <div style={{ marginTop: "2rem", marginBottom: "1rem" }}>
                                <CSVReader
                                    onDrop={this.handleOnDrop}
                                    onError={this.handleOnError}
                                    addRemoveButton
                                    onRemoveFile={this.handleOnRemoveFile}
                                >
                                    <span>Click or Drag to upload.</span>
                                </CSVReader>
                            </div>
                            <form className="form" onSubmit={this.onSubmit} style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                                <FormControl variant="outlined" onSubmit={this.onSubmit}>
                                    <InputLabel >Entity Tag</InputLabel>
                                    <OutlinedInput value={this.state.entity} onChange={this.onChange} label="Entity Tag" />
                                </FormControl>
                                <Fab color="primary" aria-label="add" type="submit">
                                    <AddIcon />
                                </Fab>
                            </form>
                            <div style={{marginBottom: "1rem"}}>
                            <FormControl variant="outlined">
                                <InputLabel required="true">Tag</InputLabel>
                                <Select
                                    value={this.state.tag}
                                    onChange={this.handleTagChange}
                                    label="Entity"
                                >
                                    {this.state.entities.map((entity) => <MenuItem value={entity}>{entity}</MenuItem>)}
                                </Select>
                            </FormControl>
                            </div>
                            <TokenAnnotator
                                style={{
                                    fontFamily: "monospace",
                                    lineHeight: 2,
                                    fontSize: "20px",
                                    borderRadius: "25px",
                                    border: "2px solid #838383",
                                    padding: "20px",
                                    height: "10rem",
                                    minWidth: '70rem',
                                    overflow: "auto"
                                }}
                                tokens={this.state.value[this.state.currentDoc].text.split(" ")}
                                value={this.state.value[this.state.currentDoc].position}
                                onChange={this.handleChange}
                                getSpan={span => ({
                                    ...span,
                                    tag: this.state.tag,
                                    color: '#00ffa2',
                                })}
                            />
                            <div style={{ marginTop: "2rem" }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={2}>
                                        <Button variant="contained" color="primary" onClick={this.handlePrevious}>
                                            Prev
</Button>
                                    </Grid>  
                                    <Grid item xs={2}>
                                        <h3>
                                            {this.state.currentDoc + 1}/{this.state.totalDocs}
                                        </h3>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button variant="contained" color="primary" onClick={this.handleNext}>
                                            Next
</Button>
                                    </Grid>
                                </Grid>
                                <Button variant="contained" color="secondary" onClick={this.handleDownload}>
                                            Download
</Button>
                            </div>
                        </div>
                    </Paper>
                </div>
                {/* <Paper>
                    <h4>Current Value</h4>
                    <pre>{JSON.stringify(this.state)}</pre>
                </Paper> */}
            </div>
        )
    }
}

export default Annotator