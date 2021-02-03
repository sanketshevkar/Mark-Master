import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

class CreateProject extends React.Component {
    state = {
    }

    handleChange = event => {
      };


    render() {
        return (
            <div style={{margin: "3rem"}}>
                <FormControl variant="outlined">
        <InputLabel htmlFor="component-outlined">Name</InputLabel>
        <OutlinedInput id="component-outlined" value="name" onChange={this.handleChange} label="Name" />
        <Button
        style={{marginTop: "2rem"}}
        variant="contained"
        color="default"
        startIcon={<CloudUploadIcon />}>
            <input type='file'/>
        </Button>
      </FormControl>
            </div>
        )
    }
}

export default CreateProject