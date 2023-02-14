import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const styles = {
  TextB: {
    borderRadius: "0px",
    backgroundColor: "transparent",
  },
  ulS: {
    padding: "0px",
  },
};

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">

            <h1 className="m-0">airDnD</h1>
          </Link>
          <p className="m-0">Where Fantasy and Reality Collide</p>

        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="btn btn-lg btn-light ml-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <div className='flex'>
              <div
                className="linkBtnS mgR bgG"
              ><Link className="link" to="/login">
                  Log-in
                </Link></div>

              <div
                className="linkBtnS bgT"
              ><Link className="link" to="/signup">
                  Signup
                </Link></div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
