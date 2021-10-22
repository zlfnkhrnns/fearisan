import React, { Component } from 'react';
import axios from 'axios';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class useForm extends Component{
    constructor(props) {
        super(props);

        this.onNameChange = this.onNameChange.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nama: '',
            gambar:''
        }
    }

    onNameChange(e) {
        this.setState({ nama: e.target.value })
    }
    onImageChange(e) {
        this.setState({ gambar: e.target.files[0] })
    }

    onSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('nama', this.state.nama)
        formData.append('gambar', this.state.gambar)
        axios.post("http://localhost:5000/kategori", formData, {
        }).then(res => {
            console.log(res)
        })
    }
    render() {
        return (
            <Dialog
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" style={{ color: "#4C27D7" }}>
                Tambah Kategori
                </DialogTitle>
                <DialogContent>
                    <div className="container">
                    <div className="row">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" onChange={this.onNameChange} />
                            </div>
                            <div className="form-group">
                                <input type="file" onChange={this.onImageChange} />
                            </div>
                            <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                        </form>
                </div>
            </div>
            </DialogContent>
            </Dialog> 
    )
  }
};