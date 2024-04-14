import React, { useState } from 'react';
import { AiFillLock, AiOutlineMail } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signUp, UserAuth } from '../context/AuthContext';

const Signup = () => {
    const [error, setError] = useState(''); // Declare the error state
    const navigate = useNavigate();
    const { signUp } = UserAuth();

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
    });

    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
            await signUp(values.email, values.password);
            navigate('/account');
        } catch (error) {
            setError(error.message); // Set the error message
        }
        setSubmitting(false);
    };

    return (
        <div>
            <div className={`max-w-[400px] mx-auto min-h-[600x] px-4 py-20`}>
                <h1 className={`text-2xl font-bold`}>Sign Up</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        {error && <p className={`bg-red-300 p-3 my-2`}>{error}</p>}
                        <div className={`py-4`}>
                            <label>Email</label>
                            <div className={`my-2 w-full relative rounded-2xl shadow-xl`}>
                                <Field
                                    name="email"
                                    type="email"
                                    className={`w-full p-2 bg-primary border border-input rounded-2xl`}
                                />
                                <AiOutlineMail className={`absolute right-2 top-3 text-gray-400`} />
                            </div>
                            <ErrorMessage name="email" component="div" className={`text-red-500`} />
                        </div>
                        <div className={`py-4`}>
                            <label>Password</label>
                            <div className={`my-2 w-full relative rounded-2xl shadow-xl`}>
                                <Field
                                    name="password"
                                    type="password"
                                    className={`w-full p-2 bg-primary border border-input rounded-2xl`}
                                />
                                <AiFillLock className={`absolute right-2 top-3 text-gray-400`} />
                            </div>
                            <ErrorMessage name="password" component="div" className={`text-red-500`} />
                        </div>
                        <button className={`w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl`} type="submit">
                            Sign up
                        </button>
                    </Form>
                </Formik>
                <p className={`my-4`}>
                    Already have an account? <Link className={`text-accent`} to={`/signin`}>Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
