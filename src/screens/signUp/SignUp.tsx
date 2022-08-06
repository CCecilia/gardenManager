import './SignUp.scss';

import React, { useEffect, useRef, useState } from 'react';

import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../types/RoutePaths.enum';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import { validateEmailString } from '../../utilities/StringHelpers';

const SignUp: React.FC = () => {
  const auth = useAuth();
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [emailInputData, setEmailInputData] = useState<string>('');
  const [passwordInputData, setPasswordInputData] = useState<string>('');
  const [confirmPasswordInputData, setConfirmPasswordInputData] = useState<string>('');

  useEffect(() => {
    if (auth && auth.user) {
      navigate(RoutePaths.DASHBOARD_ROUTE);
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log('handle submit', emailInputData, passwordInputData, validateEmailString(emailInputData.toLowerCase()));
    event.preventDefault();

    if (loading) {
      return;
    };

    setLoading(true);

    if (emailInputData === '') {
      setLoading(false);
      return;
    };

    if (passwordInputData === '') {
      setLoading(false);
      return;
    };

    if (validateEmailString(emailInputData.toLowerCase())) {
      const signInResponse = await auth!.signIn(emailInputData, passwordInputData);
      if (signInResponse.success) {
        navigate(RoutePaths.DASHBOARD_ROUTE);
      };

      const { message } = signInResponse;
      setFormError(message);
    };

    setLoading(false);
  };

  const handleEmailOnChange  = () => {
    const value = emailInputRef.current?.value;

    if (!emailInputRef) {
      return;
    }
    if (!value) {
      setEmailInputData('');
      return;
    };

    setEmailInputData(value);

    if (emailInputRef.current) {
      if (!validateEmailString(value.toLowerCase())) {
        Object.assign(emailInputRef.current.style, {
          'border-bottom': '3px solid red'
        });
      } else {
        Object.assign(emailInputRef.current.style, {
          'border-bottom': '0px'
        });
      };
    };
  };

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>, setStateAction: (data: any) => void) => {
    const { value } = event.currentTarget;
    setStateAction(value);

    if (passwordInputRef.current && confirmPasswordInputRef.current) {
      console.log(passwordInputData, confirmPasswordInputData, passwordInputData.length >= 8 && passwordInputData === confirmPasswordInputData);
      if (passwordInputData.length >= 8 && passwordInputData === confirmPasswordInputData) {
        console.log('password GTG');
        Object.assign(passwordInputRef.current.style, {
          'border-bottom': '0px'
        });
        Object.assign(confirmPasswordInputRef.current.style, {
          'border-bottom': '0px'
        });
      } else {
        Object.assign(passwordInputRef.current.style, {
          'border-bottom': '3px solid red'
        });
        Object.assign(confirmPasswordInputRef.current.style, {
          'border-bottom': '3px solid red'
        });
      };
    };
  };

  const animateLabelUp = (label: HTMLElement) => {
    label.animate([
      {translate: '.2rem 4.2rem', opacity: .25},
      {translate: '.2rem 2rem', opacity: .5},
      {translate: '.2rem 0rem', opacity: 1},
    ],
    {
      duration: 500,
    });
    Object.assign(label.style, {
      translate: '.2rem 0rem',
      opacity: '1'
    });
  };

  const animateLabelOnFocus = (event: React.FocusEvent<HTMLInputElement>, labelId: string, inputRef: React.MutableRefObject<HTMLInputElement | null>) => {
    const label = document.getElementById(labelId);
    const inputValue = inputRef.current?.value;

    if (label && !inputValue) {
      animateLabelUp(label);
    };
  };

  return (<Row className="sign-up-form">
    {formError &&
      <Row className="sign-up-form__error-message">
        <p className="sign-up-form__error-message--text">{ formError }</p>
      </Row>
    }
    <Row>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label id="email-label" className="sign-up-form__label">Email</Form.Label>
          <Form.Control
            id="email"
            name="email"
            placeholder="Email"
            className="form-control sign-up-form__input"
            value={emailInputData}
            onChange={handleEmailOnChange}
            onFocus={(e: any) => animateLabelOnFocus(e, 'email-label', emailInputRef)}
            type="email"
            required={true}
            ref={emailInputRef}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label id="password-label" className="sign-up-form__label">Password</Form.Label>
          <Form.Control
            id="password"
            name="password"
            placeholder="Password"
            className="form-control sign-up-form__input"
            value={passwordInputData}
            onChange={(e: any) => handleOnChange(e, setPasswordInputData)}
            onFocus={(e: any) => animateLabelOnFocus(e, 'password-label', passwordInputRef)}
            required={true}
            type="password"
            ref={passwordInputRef}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label id="confirm-password-label" className="sign-up-form__label">Confirm Password</Form.Label>
          <Form.Control
            id="confirm-password"
            name="confirm-password"
            placeholder="Confirm Password"
            className="form-control sign-up-form__input"
            value={confirmPasswordInputData}
            onChange={(e: any) => handleOnChange(e, setConfirmPasswordInputData)}
            onFocus={(e: any) => animateLabelOnFocus(e, 'confirm-password-label', confirmPasswordInputRef)}
            required={true}
            type="password"
            ref={confirmPasswordInputRef}
          />
        </Form.Group>
        <Button variant="outline-success" type="submit" className="btn-outline-black btn-lg">
          Sign In <FontAwesomeIcon icon={faSignIn}/>
        </Button>
      </Form>
    </Row>
  </Row>);
};

export default SignUp;
