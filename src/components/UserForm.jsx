import { useState } from 'react';
import styles from './UserForm.module.css';

export default function UserForm (){
    // Default vals for users
    const initVal = {
        'firstName': '',
        'lastName': '',
        'email': '',
        'password': '',
        'confirmPass': ''
    }

    // Users info
    const [ users, setUsers ] = useState({ ...initVal });

    // Errors
    const [ err, setErr ] = useState({ ...initVal });

    // Conditional Form Rendering
    const [ hasBeenSubmitted, setHasBeenSubmitted ] = useState( false );


    // Create Users
    const createUsers = (e) => {

        // prevent the default state of the form.
        e.preventDefault();

        setUsers({ ...initVal });
        setErr({ ...initVal });

        setHasBeenSubmitted(true);

    }

    // Validator for Form inputs
    const validators = {

        'firstName': [ 'minChar', 2 ],
        'lastName': [ 'minChar', 2 ],
        'email': [ 'minChar', 5 ],
        'password': [ 'minChar', 8 ],
        'confirmPass': [ 'match', 'password' ]
    }

    const handleChange = (e) => {

        // Get objName and handleChange
        let name = e.target.name;

        // set current state being inputted
        setUsers( currentUsers => ({ ...currentUsers, [ name ]: e.target.value }));
        let err = '';

        const [ validator, compare ] = validators[name];

        if ( validator === 'minChar' && e.target.value.length === 0){
            err = '';
        } else if ( validator === 'minChar'){
            err = e.target.value.length < compare ? `${name} must be at least ${compare} characters long`: '';
        } else if (validator === 'match' && e.target.value.length === 0){
            err = '';
        } else if (validator === 'match'){
            err = e.target.value !== users[compare] ? `${name} must match ${compare}.`: '';
        }

        setErr(currentErr => ({...currentErr, [name]: err}));
    }

    return (

        <>
        <form onSubmit={ createUsers } className={ styles.users_form }>
        <div>
            {
                !hasBeenSubmitted ? 
                    <h1>Welcome! Please submit this form</h1> :
                    <h1>Thank you for submitting your form</h1>
            }
        </div>
        <div className={ styles.input }>
            <label htmlFor="firstname">First Name: </label>
            <input onChange={ handleChange } type="text" value={ users.firstName } name='firstName' className={styles.inputFields}/>

            { err.firstName && <p className={ styles.errFields }> { err.firstName } </p> }
        </div>
        <div className={ styles.input }>
            <label htmlFor="lastname">Last Name: </label>
            <input onChange={ handleChange } type="text" value={ users.lastName } name='lastName' className={styles.inputFields}/>

            { err.lastName && <p className={ styles.errFields }> { err.lastName } </p> }
        </div>
        <div className={ styles.input }>
            <label htmlFor="email">Email: </label>
            <input onChange={ handleChange } type="text" value={ users.email } name='email' className={styles.inputFields}/>

            { err.email && <p className={ styles.errFields }> { err.email } </p> }
        </div>
        <div className={ styles.input }>
            <label htmlFor="password">Password: </label>
            <input onChange={ handleChange } type="text" value={ users.password } name='password' className={styles.inputFields}/>

            { err.password && <p className={ styles.errFields }> { err.password } </p> }
        </div>
        <div className={ styles.input }>
            <label htmlFor="confirmPass">Confirm Password: </label>
            <input onChange={ handleChange } type="text" value={ users.confirmPass } name='confirmPass' className={styles.inputFields}/>

            { err.confirmPass && <p className={ styles.errFields }> { err.confirmPass } </p> }
        </div>

        <input type="submit" />
        </form>

        <div>
                <h2>Your Form Data</h2>
                <p>First Name: { users['firstName'] }</p>
                <p>Last Name: { users['lastName'] }</p>
                <p>Email: { users['email'] }</p>
                <p>Password: { users['password'] }</p>
                <p>Confirm Password: { users['confirmPass'] }</p>
            </div>
        </>
    )

}