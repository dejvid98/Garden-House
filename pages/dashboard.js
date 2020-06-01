import {useEffect, useState} from 'react';
import Head from 'next/head';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import styles from './dashboard.module.scss';
import Panel from '../components/Dashboard/Panel';
import Admin from '../components/Dashboard/Admin/Admin-Dashboard';

const dashboard = ({data}) => {
  const [token, setToken] = useState();
  useEffect(() => {
    const cookie = Cookies.get('JWT');
    jwt.verify(cookie, 'secertToken', async (err, decoded) => {
      setToken(decoded);
    });
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.panelWrapper}>
        <Panel
          admin={token ? token.isadmin : false}
          isAdmin={token ? token.isadmin : false}
        />
      </div>
      <div className={styles.contentWrapper}>
        <Admin />
      </div>
      <Head>
        <title>Admin Dashboard - Garden House</title>
      </Head>
    </div>
  );
};

export default dashboard;
