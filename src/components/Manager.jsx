import React from 'react';
import { useRef, useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    // here the 'key name' must match with the input's 'name'
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    const togglePassword = () => {
        if (ref.current.src.includes("hide.svg")) {
            ref.current.src = "eye.svg";
            passwordRef.current.type = 'text';
        } else {
            ref.current.src = "hide.svg";
            passwordRef.current.type = 'password';
        }
    }
    const savePassword = () => {
        if (form.site.length < 3 || form.username.length < 3 || form.password.length < 3) {
            toast('Error: Min 3 character required');
        } else {            
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));
            setform({ site: "", username: "", password: "" });
            toast('Password saved successfully!');
        }
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (x) => {
        navigator.clipboard.writeText(x);
        toast('🦄 Copied to clipboard!');
    }

    const editPassword = (id) => {
        setform(passwordArray.filter(x => id == x.id)[0]);
        // now delete this entry
        setPasswordArray(passwordArray.filter(x => x.id != id));
    }

    // id is passed as a parameter to delete the particular row with the same id
    const deletePassword = (id) => {
        let x = confirm("Are you sure about deleting this password");
        if (x) {
            setPasswordArray(passwordArray.filter(x => x.id != id));
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(x => x.id != id)));
            toast('Password deleted!');
        }
    }

    return (
        <>
            {/* <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            /> */}
            {/* Same as */}
            <ToastContainer />
            <div className='p-2 md:px-0'>
                <h1 className='text-center font-bold text-xl'>
                    <span className='text-green-600'>&lt;PassOP/&gt;</span>
                </h1>
                <p className="text-center text-green-900 text-lg">Your own Password Manager</p>
                <div className='flex flex-col gap-4 p-4 items-center'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border-green-500 border w-full px-4 py-1' type="text" name="site" id="site" />
                    <div className='flex gap-4 md:gap-6 w-full flex-col md:flex-row'>
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='md:w-1/2 border border-green-400 rounded-full px-3' type="text" name="username" id="user" />
                        <div className='relative md:w-1/2'>
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='border border-green-400 w-full rounded-full px-3' type="password" name="password" id="pass" />
                            <span onClick={togglePassword} className='absolute right-1 cursor-pointer'>
                                <img ref={ref} src="hide.svg" alt="show" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='bg-green-400 rounded-full hover:bg-green-300 px-3 py-1 w-fit border border-green-900 flex items-center gap-1'>
                        <lord-icon
                            src="https://cdn.lordicon.com/zrkkrrpl.json"
                            trigger="hover"
                            delay="1000">
                        </lord-icon>
                        Save
                    </button>
                </div>

                <div className="showPasswords mb-10 md:px-1 overflow-x-auto">
                    <h2 className='font-black text-xl pb-1 text-center'>Your Passwords</h2>
                    {passwordArray.length == 0 && <div> No passwords to show </div>}
                    {passwordArray.length != 0 && <table className='w-full rounded-lg min-w-full table-auto'>
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th>Website</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item) => {
                                return <tr>
                                    <td className='border-2 border-white'>
                                        <div className='flex justify-center gap-2'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <img onClick={() => copyText(item.site)} className='cursor-pointer' src="copy.svg" alt="copy" />
                                        </div>
                                    </td>
                                    <td className='border-2 border-white'>
                                        <div className='flex justify-center gap-2'>
                                            {item.username}
                                            <img onClick={() => copyText(item.username)} className='cursor-pointer' src="copy.svg" alt="copy" />
                                        </div>
                                    </td>
                                    <td className='border-2 border-white'>
                                        <div className='flex justify-center gap-2'>
                                            {item.password}
                                            <img onClick={() => copyText(item.password)} className='cursor-pointer' src="copy.svg" alt="copy" />
                                        </div>
                                    </td>
                                    <td className='text-center border-2 border-white'>
                                        <span onClick={() => editPassword(item.id)} className='cursor-pointer mx-1'>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/ghhwiltn.json"
                                                trigger="hover"
                                                style={{ "width": "25px", height: "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span onClick={() => deletePassword(item.id)} className='cursor-pointer mx-1'>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/drxwpfop.json"
                                                trigger="hover"
                                                style={{ "width": "25px", height: "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager

// https://www.npmjs.com/package/react-toastify