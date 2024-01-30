import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { message, Form, Input, Button } from 'antd';
import Logo from "../../images/Abnw.png";
import { useState } from 'react';

function ForgotPassword() {
  const navigate = useNavigate();


  const handleForgotPassword = async (values) => {
    const { email, password, confirmPassword } = values;
    const symbolRegex = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;

    if (password.length < 8) {
      message.error('Password must be at least 8 characters long');
      return;
    }

    if (!symbolRegex.test(password)) {
      message.error('Password must contain at least one symbol');
      return;
    }

    if (password === confirmPassword) {
      try {
        const response = await fetch('http://127.0.0.1:8000/app/forgotpassword/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        if (response.ok) {
          message.success('Password reset successful. Please log in with your new password.');
          navigate('/login');
        } else {
          message.error('Failed to reset password. Please try again later.');
        }
      } catch (error) {
        message.error('Error: Failed to reset password. ' + error.message);
      }
    } else {
      message.error('Passwords do not match');
    }
  }

  return (
    <div>
      <div className="flex h-screen mx-auto max-w-l bg-gradient-to-tl from-gray-900 to-sky-900 overflow-hidden">
        <div className="h-screen w-2/3 shadow-lg bg-white justify-start p-10">
          <div className="flex flex-col items-start mt-5 p-10 pb-2 md:mb-0">
            <span className="text-3xl font-medium whitespace-nowrap dark:text-dark-900">
              Forgot Password?
            </span>

            <span className="text-sm mt-2 dark:text-dark-900">
              <span className='text-red-500'>
                Your new password must be different than you previously registered with.<br></br>
              </span>
              Wanna return back?
              <Link to="/login" class="font-medium text-blue-500 hover:text-blue-800 hover:underline">
               
                Go to login page
              </Link>
            </span>
          </div>
          <div className="grid grid-rows-2 grid-flow-row gap-4 max-w-xl">
            <Form className="md:flex flex-col space-y-4 p-8  justify-center" onFinish={handleForgotPassword}>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                    type: 'email'
                  }
                ]}
              >
                <Input placeholder="example@gmail.com" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!'
                  }
                ]}
              >
                <Input.Password placeholder="***********" />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!'
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords do not match!'));
                    }
                  })
                ]}
              >
                <Input.Password placeholder="***********" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="flex flex-col bg-blue-500 hover:bg-blue-700 text-white text-lg font-medium  px-40 rounded-lg focus:outline-none focus:shadow-outline">
                  Reset Password
                </Button>
                
              </Form.Item>
              <div className="flex flex-col justify-center items-center p-3">
                <div className="sm:flex sm:items-center sm:justify-center mt-10 ">
                  <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © 2023{" "}
                    <a href="#" className="hover:underline">
                      Avalon
                    </a>
                    . All Rights Reserved.
                  </span>
                </div>
              </div>
            </Form>
          </div>
        </div>

        <div className="flex flex-row  w-screen justify-center items-center ">
          <div className="mb-6 md:mb-0 items-center ">
            <a href="#" className="flex flex-row items-center">
              <img src={Logo} className="h-20 mr-2" alt="FlowBite Logo" />
              <span className="self-center text-6xl font-semibold whitespace-nowrap dark:text-white align-center">Avalon Hirings</span>
            </a>
          </div>
        </div>

      </div>
    </div>

  )
}

export default ForgotPassword;
