import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import Button from '../../components/Button';

const UserLogin = () => {
  return (
    <Layout>
      <section className="flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-xl shadow-card p-6">
            <h2 className="text-2xl font-semibold text-text mb-1">Welcome back</h2>
            <p className="text-sm text-muted mb-6">Sign in to continue to SnackTok.</p>

            <form className="space-y-4">
              <div>
                <label className="text-sm text-muted mb-1 block">Email</label>
                <input type="email" className="input" placeholder="you@example.com" />
              </div>

              <div>
                <label className="text-sm text-muted mb-1 block">Password</label>
                <input type="password" className="input" placeholder="••••••••" />
              </div>

              <Button btnText="Sign in"/>

              <div className="flex items-center justify-between text-sm text-muted">
                <span>New here?</span>
                <Link to="/user/register" className="text-primary font-medium">Create account</Link>
              </div>

              <div className="border-t pt-4 text-center text-sm text-muted">
                Partner with us? <Link to="/food-partner/login" className="text-primary font-medium">Partner login</Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UserLogin;