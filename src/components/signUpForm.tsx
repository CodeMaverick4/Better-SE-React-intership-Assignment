import { Key, Mail } from 'lucide-react';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {useFormik} from 'formik'

interface SignUpFormValues {
    email: string;
    password: string;
   firstName: string;
    lastName: string;

  }

const SignupForm: React.FC = () => {
    const [passwordStrength, setPasswordStrength] = useState<string>('');

    // Function to check the strength of the password
    const checkPasswordStrength = (password: string) => {
        const strengthRegex = {
            weak: /^(?=.*[a-z]).{6,}$/, // At least 6 characters and one lowercase letter
            medium: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/, // At least 8 characters, one lowercase, and one uppercase
            strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, // At least 8 characters, one lowercase, one uppercase, one number, and one special character
        };

        if (strengthRegex.strong.test(password)) {
            setPasswordStrength('Strong');
        } else if (strengthRegex.medium.test(password)) {
            setPasswordStrength('Medium');
        } else if (strengthRegex.weak.test(password)) {
            setPasswordStrength('Weak');
        } else {
            setPasswordStrength('Too short');
        }        
    };
   
    const {values,handleChange,handleBlur,handleSubmit,errors,touched} = useFormik<SignUpFormValues>({
        initialValues: {
            firstName:'',
            lastName:'',
          email: '',
          password: '',
        },
        validate: (values) => {
          const errors: Partial<SignUpFormValues> = {};

          if (!values.firstName) {
            errors.firstName = 'first name is required';
          } else if ( !(/^[a-zA-Z]+$/.test(values.firstName)) ) {
            errors.firstName = 'Name must contain characters';
          }

          if (!values.lastName) {
            errors.lastName = 'last name is required';
          } else if ( !(/^[a-zA-Z]+$/.test(values.lastName)) ) {
            errors.lastName = 'Name must contain characters';
          }
    
          if (!values.email) {
            errors.email = 'Email is required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }
    
          if (!values.password) {
            errors.password = 'Password is required';
          } else if (values.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
          }        
    
          return errors;
        },
        onSubmit: (values) => {
            // handleSubmitFunc(values);
            console.log('Form submitted:', values);
        alert(`Login successful for: ${values.email}`);
        },
      });


      const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e);
        checkPasswordStrength(e.target.value);
    };

  return (
    <div className='h-screen bg-[#fcf5eb] flex justify-center items-center font-mono text-xs'>
        <div className='flex flex-col gap-5 border-2 border-black rounded-lg bg-white w-[35%] px-12 py-8'>
            <h1 className='text-center text-3xl font-semibold  mb-3'>Sign Up</h1>
            {/* <div className='border border-gray-400'></div> */}
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4'>
                    
                    <div className='flex  gap-3'>
                        <div className='flex flex-col flex-grow gap-1 '>
                            <label htmlFor="" className='font-bold pl-2 text-sm'  >First Name</label>                    
                            <input type="text"  className='px-3 py-2 w-full max-w-full rounded-md border border-black outline-none' placeholder='Jhon' name='firstName' value={values.firstName} onChange={handleChange} onBlur={handleBlur}/>                    
                            {touched.firstName && errors.firstName && (
                                <div className="text-red-500 text-xs">{errors.firstName}</div>
                            )}
                            
                        </div>
                        
                        <div className='flex flex-col flex-grow gap-1 '>
                            <label htmlFor="" className='font-bold pl-2 text-sm'  >Last Name</label>                    
                            <input type="text"  className='px-3 py-2 w-full max-w-full rounded-md border border-black outline-none' placeholder='Doe' name='lastName' value={values.lastName} onChange={handleChange} onBlur={handleBlur}/>                    
                            {touched.lastName && errors.lastName && (
                                <div className="text-red-500 text-xs">{errors.lastName}</div>
                            )}
                            
                        </div>
                        
                    </div>                    
    
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="" className='font-bold pl-2 text-sm'  >Email</label>
                        <div className='relative '>
                            <Mail className='absolute left-3 top-1/2 -translate-y-1/2' size={18} stroke='gray'/><input type="email"  className='px-10 py-2 w-full rounded-md border border-black outline-none' placeholder='Enter your email address' name='email' value={values.email} onChange={handleChange} onBlur={handleBlur}/>
                        </div>
                        {touched.email && errors.email && (
                                <div className="text-red-500 text-xs">{errors.email}</div>
                            )}
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor="" className='font-bold pl-2 text-sm '  >Password</label>
                        <div className='relative '>
                            <Key className='absolute left-3 top-1/2 -translate-y-1/2' size={27}/><input type="password"  className='px-14 py-2 w-full rounded-md border border-black outline-none' placeholder='************' name='password' value={values.password} onChange={handlePasswordChange} onBlur={handleBlur}/>
                        </div>

                        <div className="mt-2">
                             <span className="text-xs">
                                 Password strength: <strong>{passwordStrength}</strong>
                             </span>
                         </div>
                        {touched.password && errors.password && (                            
                                <div className="text-red-500 text-xs">{errors.password}</div>
                            )}
                    </div>

                    <Link to="#" className="text-blue-500 underline">Forget Password?</Link>
                    
                    <div className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="remember" id="remember" />
                        <label htmlFor="remember">Remember me</label>
                    </div>

                    <div className='flex justify-center'>
                        <button type='submit'  className='bg-blue-600 hover:bg-blue-700 py-2 px-6 rounded-md text-white font-semibold'>Sign me Up! </button>
                    </div>

                    <h1 className='text-center'>Already have account <Link to={'/'} className="text-blue-500 underline">Sign In</Link></h1>

                </div>
            </form>
        </div>
    
    </div>
  );
};

export default SignupForm;
