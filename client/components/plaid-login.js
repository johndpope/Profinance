import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { PlaidLink } from "react-plaid-link";
import axios from 'axios';
import '../../public/styles/plaid-login.css'

const PlaidLogin = () => {
  const user = useSelector(state => state.user)
  const [token, setToken] = useState(null);
  useEffect(() => {
    async function createLinkToken() {
      let response = await fetch("/api/plaid/create_link_token", {
        method: "POST",
      }).catch(err => console.error(err));
      const { link_token } = await response.json();
      setToken(link_token);
    }
    createLinkToken();
  }, []);

  const onSuccess = async (public_token, metadata) => {
    await axios.post('/api/plaid/exchange_public_token', {public_token, user})
    .then(window.location.href = '/home')
    .catch(err => console.log(err));
  }

  return token === null ? (
    <div className="loader"></div>
  ) : (
    <div className="plaid-container">
      <PlaidLink
        className="plaid-login"
        token={token}
        onSuccess={onSuccess}
      >
        Connect a bank account
      </PlaidLink>
    </div>
  );
};

export default PlaidLogin;