import React, { Component } from "react";
import './ContactForm.css'
import Axios from "axios";

const instance = Axios.create({
    withCredentials: true,
    //baseURL: BaseURL,
});

export default class ContactForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            submitDisabled: true,
            hasError: false,
            checkedValues: JSON.parse(localStorage.getItem('checkedValues')) || []
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.onCheckboxChange = this.onCheckboxChange.bind(this)
        this.resetState = this.resetState.bind(this)
    }

    inputHandler(event) {
        let name = event.target.name
        let value = event.target.value
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [name]: value
            }
        }))
    }


    handleSubmit(e) {
        e.preventDefault();
        let formData = null;

        const formEntries = new FormData(e.target).entries();
        formData = Object.assign(...Array.from(formEntries, ([name, value]) => ({[name]: value})));
        delete formData.time;//we dont need it here

        formData = {times: this.state.checkedValues, ...formData}

        console.log(formData)

        instance.post( 'some/url/here', {
            variables: {
                ...formData
            }
        }).then(result => console.log(result));
    };

    onCheckboxChange()
    {
        const { time } = this.form;
        const boxArray = Array.prototype.slice.call(time);
        const checkedBoxes = boxArray.filter(input => input.checked);
        const checkedValues = checkedBoxes.map(input => input.value);

        let submitDisabled = true;
        let hasError = false;

        if (checkedValues.length > 1 && checkedValues.length < 6) {
              submitDisabled = false;
        }

        if (checkedValues.length >= 6) {
            hasError = true;
        }

        this.setState({
            checkedValues: checkedValues,
            submitDisabled: submitDisabled,
            hasError: hasError
        },() => {
            localStorage.setItem('checkedValues', JSON.stringify(this.state.checkedValues))
        })

    }

    resetState () {
        this.form.reset();
        this.setState({
            submitDisabled: true,
            hasError: false,
            checkedValues: []
        },() => {
            localStorage.setItem('checkedValues', JSON.stringify([]))
        })
    }

    render() {
        const {checkedValues, submitDisabled, hasError} = this.state

        return (
            <div>
                <div className={'form-container'}>
                    <h2 className={'form-heading'}>Be the first to register for new townhome releases for first option</h2>
                    <form onSubmit={this.handleSubmit} ref={form => this.form = form}>
                        <div className={'input-wrapper'}>
                            <input type="text" name={'name'} placeholder={'First Name'} className={'input'}/>
                        </div>
                        <div className={'input-wrapper'}>
                            <input type="email" name={'email'} placeholder={'Email'} className={'input'}/>
                        </div>
                        <div className={'input-wrapper'}>
                            <input type="text" name={'phone'} placeholder={'Phone'} className={'input'}/>
                        </div>
                        <div className={'input-wrapper'}>
                            <select placeholder={'When are you looking to buy'} className={'input'} name={'time'}>
                                <option value="">When are you looking to buy</option>
                            </select>
                        </div>
                        <div className={'checkboxes'}>

                            <ul>
                                {Array(8).fill(1).map((el, i) =>
                                    <li><input type={'checkbox'} name={'time'} value={i+1} onChange={this.onCheckboxChange} defaultChecked={checkedValues.includes(String(i + 1))} /> Value {i+1}</li>
                                )}
                            </ul>
                        </div>
                        <div className={'form-buttons'} >
                            <button className={'button submit'} disabled={submitDisabled}>Submit</button>
                            <button className={'button reset'} onClick={this.resetState}>Reset</button>
                        </div>
                        {
                            hasError && <div className={'alert'}>
                                Please select 5 or fewer checkboxes.
                            </div>
                        }

                    </form>
                </div>
            </div>
        );
    }
}