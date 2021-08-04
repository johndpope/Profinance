import React, { useEffect, useState, useCallback } from 'react';
import { PlaidLink } from "react-plaid-link";
import axios from 'axios';

const PlaidLogin = () => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    async function createLinkToken() {
      let response = await fetch("/api/plaid/create_link_token", {
        method: "POST",
      });
      const { link_token } = await response.json();
      setToken(link_token);
    }
    createLinkToken();
  }, []);

  const onSuccess = useCallback(async (public_token, metadata) => {
    // eslint-disable-next-line no-unused-vars
    const res = await axios.post('/api/plaid/exchange_public_token', {public_token})
    .then(window.location.reload()) 
  },[]);

  return token === null ? (
    <div className="loader"></div>
  ) : (
    <PlaidLink
      token={token}
      onSuccess={onSuccess}
      // onExit={...}
      // onEvent={...}
    >
      Connect a bank account
    </PlaidLink>
  );
};

export default PlaidLogin;