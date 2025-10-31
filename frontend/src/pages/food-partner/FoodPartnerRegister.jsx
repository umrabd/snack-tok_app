import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import Button from '../../components/Button';

const FoodPartnerRegister = () => {
  return (
    <Layout>
      <section className="flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-xl shadow-card p-6">
            <h2 className="text-2xl font-semibold text-text mb-1">Partner sign up</h2>
            <p className="text-sm text-muted mb-6">Register your business to sell on SnackTok.</p>

            <form className="space-y-4">
              <div>
                <label className="text-sm text-muted mb-1 block">Business name</label>
                <input className="input" placeholder="Tasty Bites LLC" />
              </div>

              <div>
                <label className="text-sm text-muted mb-1 block">Contact email</label>
                <input type="email" className="input" placeholder="owner@example.com" />
              </div>
<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div>
                <label className="text-sm text-muted mb-1 block">Contact Name</label>
                <input className="input" placeholder="John Doe" />
              </div>
              <div>
                <label className="text-sm text-muted mb-1 block">Phone (optional)</label>
                <input className="input" placeholder="+1 555 555 555" />
              </div>
</div>

<div>
                <label className="text-sm text-muted mb-1 block">Location</label>
                <input className="input" placeholder="123 Snack St, Food City" />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm text-muted mb-1 block">Password</label>
                  <input type="password" className="input" placeholder="••••••••" />
                </div>
                <div>
                  <label className="text-sm text-muted mb-1 block">Confirm</label>
                  <input type="password" className="input" placeholder="••••••••" />
                </div>
              </div>

              <Button btnText="Create partner account"/>

              <div className="flex items-center justify-between text-sm text-muted">
                <span>Already partner?</span>
                <Link to="/food-partner/login" className="text-primary font-medium">Sign in</Link>
              </div>

              <div className="border-t pt-4 text-center text-sm text-muted">
                Want a user account? <Link to="/user/register" className="text-primary font-medium">User signup</Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FoodPartnerRegister;