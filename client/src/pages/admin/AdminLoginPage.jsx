import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('admin@shreejifarsan.com');
  const [password, setPassword] = useState('Admin@Farsan2026!');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-6 left-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-saffron-600 to-amber-500 text-white flex items-center justify-center font-serif text-2xl font-bold mx-auto shadow-xl">
          श्री
        </div>
        <h2 className="mt-4 font-serif text-2xl sm:text-3xl font-extrabold text-white">
          Admin Control Center
        </h2>
        <p className="mt-1 text-xs text-stone-400">
          Sign in to manage farsan inventory, orders, catering, and business settings.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-stone-800/90 backdrop-blur-md py-8 px-6 sm:px-10 rounded-3xl border border-stone-700 shadow-2xl">
          {error && (
            <div className="mb-6 p-3.5 bg-red-900/40 border border-red-700/60 rounded-xl text-xs text-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-saffron-400" />
                <span>Admin Email</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@shreejifarsan.com"
                className="w-full px-3.5 py-2.5 bg-stone-900/80 border border-stone-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-saffron-500/30 focus:border-saffron-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-saffron-400" />
                <span>Password</span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 bg-stone-900/80 border border-stone-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-saffron-500/30 focus:border-saffron-500"
              />
            </div>

            {/* Quick credentials hint */}
            <div className="p-3 bg-stone-900/50 rounded-xl border border-stone-700/50 text-[11px] text-stone-400">
              <div className="font-semibold text-stone-300">Default Initial Credentials:</div>
              <div>Email: <code className="text-saffron-400">admin@shreejifarsan.com</code></div>
              <div>Pass: <code className="text-saffron-400">Admin@Farsan2026!</code></div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 px-4 bg-saffron-600 hover:bg-saffron-500 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition shadow-md flex items-center justify-center gap-2 active:scale-95"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sign In as Admin</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
