import InputError from '@/Components/InputError';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head, Link, useForm } from '@inertiajs/react';

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
            <Head title="Log in">
                <link rel="stylesheet" href="/admin-theme/css/styles.min.css" />
            </Head>

            <div className="position-relative overflow-hidden text-bg-light min-vh-100 d-flex align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-center w-100">
                    <div className="row justify-content-center w-100">
                        <div className="col-md-8 col-lg-6 col-xxl-3">
                            <div className="card mb-0">
                                <div className="card-body">
                                    <Link href="/" className="text-nowrap logo-img text-center d-block py-3 w-100">
                                        <ApplicationLogo className="w-auto mx-auto" style={{ height: '40px' }} />
                                    </Link>
                                    <p className="text-center">Sign in to your account</p>

                                    {status && <div className="alert alert-success text-center">{status}</div>}

                                    <form onSubmit={submit}>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email Address</label>
                                            <input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                className="form-control"
                                                autoComplete="username"
                                                autoFocus
                                                onChange={(e) => setData('email', e.target.value)}
                                            />
                                            <InputError message={errors.email} className="mt-2" />
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                className="form-control"
                                                autoComplete="current-password"
                                                onChange={(e) => setData('password', e.target.value)}
                                            />
                                            <InputError message={errors.password} className="mt-2" />
                                        </div>

                                        <div className="d-flex align-items-center justify-content-between mb-4">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input primary"
                                                    type="checkbox"
                                                    id="remember"
                                                    name="remember"
                                                    checked={data.remember}
                                                    onChange={(e) => setData('remember', e.target.checked)}
                                                />
                                                <label className="form-check-label text-dark" htmlFor="remember">
                                                    Remember this Device
                                                </label>
                                            </div>
                                            {canResetPassword && (
                                                <Link className="text-primary fw-bold" href={route('password.request')}>
                                                    Forgot Password ?
                                                </Link>
                                            )}
                                        </div>

                                        <button type="submit" className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2" disabled={processing}>
                                            {processing ? 'Signing in...' : 'Sign In'}
                                        </button>

                                        <div className="d-flex align-items-center justify-content-center">
                                            <p className="fs-4 mb-0 fw-bold">New here?</p>
                                            <Link className="text-primary fw-bold ms-2" href={route('register')}>
                                                Create an account
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
