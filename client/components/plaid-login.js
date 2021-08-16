import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux'
import { PlaidLink } from "react-plaid-link";
import axios from 'axios';

const PlaidLogin = () => {
  const user = useSelector(state => state.user)
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
    await axios.post('/api/plaid/exchange_public_token', {public_token, user})
    .then(window.location.href = '/home')
  },[user]);

  return token === null ? (
    <div className="loader"></div>
  ) : (
    <PlaidLink
      token={token}
      onSuccess={onSuccess}
    >
      Connect a bank account
    </PlaidLink>
  );
};

export default PlaidLogin;