import * as Yup from 'yup';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';

import { IUser } from '../../types/User.type';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../types/RoutePaths.enum';

const SignUp: React.FC = () => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const auth = useAuth();
  const navigate = useNavigate();
  const initialValues: IUser = {
    email: '',
    password: '',
  };

  if (auth && auth.user) {
    navigate(RoutePaths.DASHBOARD_ROUTE);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('This is not a valid email.')
      .required('This field is required!'),
    password: Yup.string()
      .test(
        'len',
        'The password must be between 6 and 40 characters.',
        (val: any) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required('This field is required!'),
  });

  const handleRegister = async (formValue: IUser) => {
    const { email, password } = formValue;
    await auth
      ?.signUp(email, password);

    setMessage('success');
    setSuccessful(true);
    navigate(RoutePaths.DASHBOARD_ROUTE);
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <h3>SignUp</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="email"> Email </label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password"> Password </label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign Up
                  </button>
                </div>
              </div>
            )}
            {message && (
              <div className="form-group">
                <div
                  className={
                    successful ? 'alert alert-success' : 'alert alert-danger'
                  }
                  role="alert"
                >
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

export default SignUp;
