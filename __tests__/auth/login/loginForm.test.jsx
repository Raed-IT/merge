import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from '../../../src/components/login-form';
import { SnackbarProvider } from 'notistack';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { createMockRouter } from '../../test-utils/createMockRouter';
 import QueryProvider from "@/lib/query-provider";

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

jest.mock('next-auth/react', () => ({
    signIn: jest.fn(),
}));

jest.mock('../../../src/stores/authStore', () => ({
    useAuthStore: jest.fn()
}));

describe('LoginForm Component', () => {
 
    beforeEach(() => {
        useRouter.mockReturnValue(createMockRouter({}));
    });

    const renderWithProvider = (ui) => {
        render(
            <QueryProvider>
                <SnackbarProvider>
                    {ui}
                </SnackbarProvider>
         </QueryProvider>
        );
    };

    describe('Rendering', () => {
        it('renders login form correctly', () => {
            renderWithProvider(<LoginForm />);
            expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
            expect(screen.getAllByLabelText(/Password/i)[0]).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
        });
    });

    describe('Validation', () => {
        it('shows validation errors on submit with empty fields', () => {
            renderWithProvider(<LoginForm />);
            fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));
            expect(screen.getByText(/email is required/i)).toBeInTheDocument();
            expect(screen.getByText(/password is required/i)).toBeInTheDocument();
        });
    });

    describe('Form Submission', () => {
        it('submits form with valid data', async () => {
            renderWithProvider(<LoginForm />);
            fireEvent.change(screen.getByLabelText(/Email/i), {
                target: { value: 'sappro@gmail.com' },
            });
            fireEvent.change(screen.getAllByLabelText(/Password/i)[0], {
                target: { value: 'S@ppro123' },
            });
            fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));
            expect(await screen.findByText(/successful login/i)).toBeInTheDocument();
        });
    });

    describe('Login Handling', () => {
        it('handles login success', async () => {
            signIn.mockResolvedValueOnce({ error: null });

            const router = createMockRouter({});
            useRouter.mockReturnValue(router);

            renderWithProvider(<LoginForm />);
            fireEvent.change(screen.getByLabelText(/Email/i), {
                target: { value: 'test@example.com' },
            });
            fireEvent.change(screen.getAllByLabelText(/Password/i)[0], {
                target: { value: 'password' },
            });
            fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

            await waitFor(() => expect(screen.getByText(/successful login/i)).toBeInTheDocument(), { timeout: 5000 });

            expect(router.push).toHaveBeenCalledWith('/organizations');
        });

        it('handles login error', async () => {
            signIn.mockResolvedValueOnce({ error: 'Invalid credentials' });

            const router = createMockRouter({});
            useRouter.mockReturnValue(router);

            renderWithProvider(<LoginForm />);
            fireEvent.change(screen.getByLabelText(/Email/i), {
                target: { value: 'test@example.com' },
            });
            fireEvent.change(screen.getAllByLabelText(/Password/i)[0], {
                target: { value: 'wrongpassword' },
            });
            fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

            await waitFor(() => expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument(), { timeout: 5000 });
        });
    });
});
