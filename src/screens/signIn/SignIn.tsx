import * as Yup from 'yup';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';

import { AxiosError } from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../types/RoutePaths.enum';

type Props = {};
type InputValues = {
  email: string;
  password: string;
};

const SignIn: React.FC<Props> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();
  const initialValues: InputValues = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('This field is required!'),
    password: Yup.string().required('This field is required!'),
  });
  const auth = useAuth();

  if (auth && auth.user) {
    navigate(RoutePaths.DASHBOARD_ROUTE);
  };

  const handleSignIn = async (formValue: InputValues) => {
    const { email, password } = formValue;
    setMessage('');
    setLoading(true);
    await auth
      ?.signIn(email, password)
      .catch((error: AxiosError<{ message: string }>) => {
        console.error(error);
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        setMessage(resMessage);
      });
    navigate(RoutePaths.DASHBOARD_ROUTE);
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignIn}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="email">email</label>
              <Field name="email" type="text" className="form-control" />
              <ErrorMessage
                name="email"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>
            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SignIn;
