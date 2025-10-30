import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import Button from '../../components/Button';

const UserRegister = () => {
  return (
    <Layout>
      <section className="flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-xl shadow-card p-6">
            <h2 className="text-2xl font-semibold text-text mb-1">Create your account</h2>
            <p className="text-sm text-muted mb-6">Quick and simple registration for snack lovers.</p>

            <form className="space-y-4">
              <div>
                <label className="text-sm text-muted mb-1 block">Full name</label>
                <input className="input" placeholder="Jane Doe" />
              </div>

              <div>
                <label className="text-sm text-muted mb-1 block">Email</label>
                <input type="email" className="input" placeholder="you@example.com" />
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

            <Button btnText="Create account"/>

              <div className="flex items-center justify-between text-sm text-muted">
                <span>Already have an account?</span>
                <Link to="/user/login" className="text-primary font-medium">Sign in</Link>
              </div>

              <div className="border-t pt-4 text-center text-sm text-muted">
                Are you a food partner? <Link to="/food-partner/register" className="text-primary font-medium">Join here</Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UserRegister;