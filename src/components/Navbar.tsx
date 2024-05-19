import React from 'react';
import Identicon from 'identicon.js';
import dvideo from '../dvideo.png';

interface NavbarProps {
  account: string;
}

const Navbar: React.FC<NavbarProps> = ({ account }) => {
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow text-monospace">
      <a
        className="navbar-brand col-sm-3 col-md-2 mr-0"
        href="http://www.dappuniversity.com/bootcamp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={dvideo} width="30" height="30" className="d-inline-block align-top" alt="" />
        &nbsp;SolidShare
      </a>
      <div className="d-flex">
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-sm-block">
            <small className="text-secondary">
              <small id="account">{account}</small>
            </small>
          </li>
        </ul>
        {account && <img className='ml-2' width={30} height={30} src={`data:image/png;base64,${new Identicon(account, 30)}`} />}
      </div>
    </nav>
  );
};

export default Navbar;
