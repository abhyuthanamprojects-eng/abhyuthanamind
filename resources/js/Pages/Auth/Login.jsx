import InputError from '@/Components/InputError';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, Lock, Loader2 } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />

            <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-eco px-4 py-10">
                <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-brand/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -right-24 size-72 rounded-full bg-navy/10 blur-3xl" />

                <div className="relative w-full max-w-md">
                    <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
                        <Link href="/" className="mx-auto block w-fit">
                            <ApplicationLogo className="mx-auto h-10 w-auto" />
                        </Link>
                        <h1 className="mt-5 text-center text-xl font-extrabold text-navy">Welcome back</h1>
                        <p className="mt-1 text-center text-sm text-muted-foreground">Sign in to your account to continue</p>

                        {status && (
                            <div className="mt-5 rounded-2xl bg-accent px-4 py-3 text-center text-sm font-semibold text-accent-foreground">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="mt-7 space-y-4">
                            <div>
                                <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-navy">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="h-11 w-full rounded-2xl border border-border bg-card pl-10 pr-4 text-sm text-navy outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                                        autoComplete="username"
                                        autoFocus
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                </div>
                                <InputError message={errors.email} className="mt-1.5" />
                            </div>

                            <div>
                                <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-navy">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="h-11 w-full rounded-2xl border border-border bg-card pl-10 pr-4 text-sm text-navy outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                </div>
                                <InputError message={errors.password} className="mt-1.5" />
                            </div>

                            <div className="flex items-center justify-between pt-1">
                                <label htmlFor="remember" className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <input
                                        id="remember"
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="size-4 rounded border-border text-brand focus:ring-brand/20"
                                    />
                                    Remember this device
                                </label>
                                {canResetPassword && (
                                    <Link className="text-sm font-semibold text-brand hover:text-brand-dark" href={route('password.request')}>
                                        Forgot password?
                                    </Link>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-brand text-sm font-bold text-brand-foreground shadow-soft transition hover:bg-brand-dark disabled:opacity-60"
                            >
                                {processing && <Loader2 className="size-4 animate-spin" />}
                                {processing ? 'Signing in…' : 'Sign In'}
                            </button>

                            <p className="pt-1 text-center text-sm text-muted-foreground">
                                New here?{' '}
                                <Link className="font-semibold text-brand hover:text-brand-dark" href={route('register')}>
                                    Create an account
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
