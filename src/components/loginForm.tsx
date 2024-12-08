import { Key, Mail } from 'lucide-react';
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useFormik} from 'formik'

interface LoginFormValues {
    email: string;
    password: string;  
  }
const LoginForm: React.FC = () => {
    const navigate = useNavigate();
     
    const {values,handleChange,handleBlur,handleSubmit,errors,touched} = useFormik<LoginFormValues>({
        initialValues: {            
          email: '',
          password: '',
        },
        validate: (values) => {
          const errors: Partial<LoginFormValues> = {};

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
            console.log('Form submitted:', values);
            
            const val = document.getElementById('remember') as HTMLInputElement;
            if(val.checked){
                localStorage.setItem('user details',values.email);
                navigate('/home');
            }
            alert(`Sign Up successful for: ${values.email}`);            
        },
      });

  return (
    <div className='h-screen bg-[#fcf5eb] flex justify-center items-center font-mono text-xs'>
        <div className='flex flex-col gap-5 border-2 border-black rounded-lg bg-white w-[35%] px-12 py-8'>
            <h1 className='text-center text-3xl font-semibold  mb-3'>Sign In</h1>
            {/* <div className='border border-gray-400'></div> */}
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="" className='font-bold pl-2 text-sm'  >Email</label>
                        <div className='relative '>
                            <Mail className='absolute left-3 top-1/2 -translate-y-1/2' size={18} stroke='gray'/><input type="email"  className='px-10 py-3 w-full rounded-md border border-black outline-none' placeholder='Enter your email address' name='email' value={values.email} onChange={handleChange} onBlur={handleBlur}/>
                        </div>
                        {touched.email && errors.email && (
                                    <div className="text-red-500 text-xs">{errors.email}</div>
                                )}
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor="" className='font-bold pl-2 text-sm '  >Password</label>
                        <div className='relative '>
                            <Key className='absolute left-3 top-1/2 -translate-y-1/2' size={18} stroke='gray'/><input type="password" placeholder='********'  className='px-14 py-3 w-full rounded-md border border-black outline-none' name='password' value={values.password} onChange={handleChange} onBlur={handleBlur}/>
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


                    <button className='bg-blue-600 hover:bg-blue-700 py-2 rounded-md text-white font-semibold'>Continue with Email</button>
                    <h1 className='text-center'>Don't have accpunt <Link to={'/signup'} className='text-blue-500 underline'>SignUp</Link></h1>
                </div>
            </form>
        </div>
    
    </div>
  );
};

export default LoginForm;
