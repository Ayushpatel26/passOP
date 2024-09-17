import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-black text-white py-2 px-5 flex justify-between items-center'>
      <div>&lt;PassOP/&gt;</div>
      {/* <ul>
        <li className='flex gap-3'>
            <a href="/">Home</a>
            <a href="#">About</a>
            <a href="#">Contacts</a>
        </li>
      </ul> */}
      <a href="https://github.com/Ayushpatel26/passOP" target='passOP'>
        <button className='flex cursor-pointer gap-1 bg-green-500 p-1 rounded-sm ring-1 ring-white'>
          <img className='invert' src="github.svg" alt="github" />
          <span>Github</span>
        </button>
      </a>
    </nav>
  )
}

export default Navbar
