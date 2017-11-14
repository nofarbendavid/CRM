import React, { Component }         from 'react';
import PropTypes                    from 'prop-types';
import autoBind                     from 'react-autobind';
import Button                       from './Button';
import Header                       from './Header';
import ReactDOM                     from 'react-dom';
import  momoent                     from 'moment';
import {Redirect, Link}             from 'react-router-dom';

const mandatoryFormFields = ["firstName", "lastName", "dateOfBirth", "address"];

class CreateNewCutomerScreen extends Component{

    constructor(){
        super();
        autoBind(this);
        this.promises = [];
        this.state = {
            customerGender: "male",
            error: null
        }
    }


    _onSubmit(e) {
        e.preventDefault();
        e.stopPropagation();

        let missingMandatoryFields = this._checkForm();

        if (!missingMandatoryFields) {
            let serializedForm = this._serialize(this.refs.createForm);

            Promise.all(this.promises)
                .then(() => {
                    this.props.customerActions.createCustomer(serializedForm);
                    this.props.customerActions.toggleCreateNewCustomerView();
                });
        }
    }


    _checkForm() {
        let missingMandatory = false;


        mandatoryFormFields.forEach(property => {
            let propertyValue = ReactDOM.findDOMNode(this.refs[property]).value;

            if (propertyValue === '') {
                this.refs[property].style.border = '1px solid red';
                missingMandatory = true;
                this.setState({
                    error: "Mandatory fields are missing"
                });
            } else {
                this.refs[property].style.border = '';
                this.setState({
                    error: null
                });
            }
        })
        
        return missingMandatory;
    }


    _serialize(form) {
        if (form) {
            let formElements = [];
            let results = {};
            const elementNames = ['input'];

            elementNames.forEach(element => {
                formElements = [...formElements, ...form.getElementsByTagName(element)];
            })

            formElements.forEach(element => {
                if (element.type === 'radio') {
                    if (element.checked === true) {
                        results[element.name] = element.value;
                    }
                } else if(element.type === 'file'){
                    if (element.files && element.files[0]) {

                        let promise = new Promise((resolve, reject) => {
                                var imgFile = element.files[0];
                                var reader = new FileReader();
                                reader.readAsDataURL(imgFile);
                                reader.onload = (event) => {
                                    var dataUri = event.target.result;
                                    results[element.name] = dataUri;
                                    resolve();
                                };
                                reader.onerror = (event) => {
                                    console.error("File could not be read!");
                                    reject();
                                };
                            })
                        this.promises.push(promise);
                    }

                } else if (element.type === 'date'){
                    results[element.name] = momoent(element.value).format('DD/MM/YYYY');
                } else if (element.value !== "") {
                    results[element.name] = element.value;
                }
            })
            return results;
        }
    }

    _handleFormGenderChanged(e) {
        this.setState({
            customerGender: e.target.value
        })
    }

    _handleClear(e) {
        e.preventDefault();
        e.stopPropagation();


        mandatoryFormFields.forEach(property => {
            ReactDOM.findDOMNode(this.refs[property]).value = '';
            this.refs[property].style.border = '';
        })

        this.setState({
            customerGender: "male",
            error: null
        });
    }


    render() {
        if(!this.props.data.openCreateNewCustomerScreen){
            return <Redirect to='/customers'/>
        }
        return (
            <div className="create-new-container">
                <Header text="Create New Customer"/>
                <form className="create-new-form" onSubmit={this._onSubmit} ref="createForm">

                    <div className="section">
                        <div className="title">First Name:</div>
                        <input autoFocus type="text" ref="firstName" name="firstName" maxLength="20"/>
                    </div>

                    <div className="section">
                        <div className="title">Last Name:</div>
                        <input type="text" ref="lastName" name="lastName" maxLength="20"/>
                    </div>

                    <div className="section">
                        <div className="title">Gender:</div>
                        <input type="radio" ref="gender" name="gender" value="male"
                               checked={this.state.customerGender === "male"}
                               onChange={this._handleFormGenderChanged}/> <span
                        className="title">Male</span>

                        <input type="radio" ref="gender" name="gender" value="female"
                               checked={this.state.customerGender === "female"}
                               onChange={this._handleFormGenderChanged}/> <span
                        className="title">Female</span>
                    </div>

                    <div className="section">
                        <div className="title">Date Of Birth:</div>
                        <input type="date" ref="dateOfBirth" name="dateOfBirth" />
                    </div>

                    <div className="section">
                        <div className="title">Address:</div>
                        <input type="text" ref="address" name="address" maxLength="40"
                               style={{width: '250px'}}/>
                    </div>


                    <div className="section">
                        <div className="title">Profile Image:</div>
                        <input id="inputFile" type="file" accept="image/*" ref="profileImage"
                               name="profileImage"
                               style={{width: '250px'}}/>
                    </div>


                    <div className="section button-section">
                        <button type="submit">Create</button>
                        <Button handleClick={this._handleClear} title="Clear"/>
                        <Link to='/customers'>
                            <Button handleClick={this.props.customerActions.toggleCreateNewCustomerView} title="Back"/>
                        </Link>
                    </div>

                </form>
                <div className="error">{this.state.error}</div>
            </div>
        )
    }
}

CreateNewCutomerScreen.PropTypes= {
    data: PropTypes.object.isRequired,
    userActions: PropTypes.object.isRequired,
    customerActions: PropTypes.object.isRequired
}


export default CreateNewCutomerScreen;



