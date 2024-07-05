import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../CSS/Dashboard.css';
import { supabase } from '../supabase';

const Dashboard = () => {
  const [partnersCount, setPartnersCount] = useState(0);
  const [newLeadsCount, setLeadsCount] = useState(0);
  const [totalLeadsValue, setLeadsValue] = useState(0);


  const fetchTotalClaimsAmount = async () => {
    const { data, error } = await supabase
      .from('clients')
      .select('claims_amount');
  
    if (error) {
      console.error('Error fetching claims amount:', error);
    } else {
      const totalAmount = data.reduce((acc, client) => acc + (client.claims_amount || 0), 0);
      setLeadsValue(totalAmount);
    }
  };
  fetchTotalClaimsAmount();

  useEffect(() => {
    const fetchPartnersCount = async () => {
      const { count, error } = await supabase
        .from('sourcing_partners')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('Error fetching partners count:', error);
      } else {
        setPartnersCount(count);
      }
    };

    fetchPartnersCount();
  }, []);
  useEffect(() => {
    const fetchLeadsCount = async () => {
      const { count, error } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true });
  
      if (error) {
        console.error('Error fetching leads count:', error);
      } else {
        setLeadsCount(count);
      }
    };
  
    fetchLeadsCount();
  }, []);
  

  return (
    <>
      <Navbar />
      <div className="dashboard-main">
        <div className="dashboard-container">
          <div className="widget widget-1">
            <h2>Active Sourcing Partners</h2>
            <p>Total Sourcing Partners: {partnersCount}</p>
          </div>
          <div className="widget widget-2">
            <h2>Leads in the Pipeline</h2>
            <p>New Leads Count: {newLeadsCount}</p>
          </div>
          <div className="widget widget-3">
            <h2>Leads Closed</h2>
            <p>Not Set up yet</p>
          </div>
          <div className="widget widget-4">
            <h2>Closed Deals</h2>
            <p>Not set up yet</p>
          </div>
          <div className="widget widget-5">
            <h2>Total Value of Closed Leads</h2>
            <p>${totalLeadsValue} USD</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
