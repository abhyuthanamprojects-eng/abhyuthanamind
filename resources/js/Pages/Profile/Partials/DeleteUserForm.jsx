import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { AlertTriangle } from 'lucide-react';

export default function DeleteUserForm({ className = '', compact = false }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    if (compact) {
        return (
            <section className={className}>
                <div className="flex items-center gap-2.5">
                    <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-rose-100 text-rose-600">
                        <AlertTriangle className="size-3.5" />
                    </span>
                    <h2 className="text-sm font-bold text-rose-700">Delete Account</h2>
                </div>
                <p className="mt-2 text-xs text-rose-700/70">
                    Permanently delete your account and all of its data. This cannot be undone.
                </p>
                <button
                    type="button"
                    onClick={confirmUserDeletion}
                    className="mt-3 w-full rounded-xl border border-rose-300 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                >
                    Delete Account
                </button>

                <Modal show={confirmingUserDeletion} onClose={closeModal}>
                    <form onSubmit={deleteUser} className="p-6">
                        <h2 className="text-base font-bold text-navy">
                            Are you sure you want to delete your account?
                        </h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Once your account is deleted, all of its resources and data will be permanently deleted. Please
                            enter your password to confirm you would like to permanently delete your account.
                        </p>

                        <div className="mt-6">
                            <InputLabel htmlFor="password" value="Password" className="sr-only" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="mt-1 block w-3/4"
                                isFocused
                                placeholder="Password"
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mt-6 flex justify-end">
                            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                            <DangerButton className="ms-3" disabled={processing}>
                                Delete Account
                            </DangerButton>
                        </div>
                    </form>
                </Modal>
            </section>
        );
    }

    return (
        <section className={`space-y-6 ${className}`}>
            <header className="flex items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-rose-100 text-rose-600">
                    <AlertTriangle className="size-4.5" />
                </span>
                <div>
                    <h2 className="text-base font-bold text-rose-700">Delete Account</h2>
                    <p className="mt-1 text-sm text-rose-700/70">
                        Once your account is deleted, all of its resources and data will be permanently deleted. Before
                        deleting your account, please download any data or information that you wish to retain.
                    </p>
                </div>
            </header>

            <DangerButton onClick={confirmUserDeletion}>Delete Account</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-base font-bold text-navy">
                        Are you sure you want to delete your account?
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Once your account is deleted, all of its resources and data will be permanently deleted. Please
                        enter your password to confirm you would like to permanently delete your account.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Password" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Delete Account
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
