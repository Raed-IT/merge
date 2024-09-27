import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterForms from '../../../src/components/register-forms';
import { SnackbarProvider } from 'notistack';
import { useRouter } from 'next/navigation';
import { createMockRouter } from '../../test-utils/createMockRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));


describe('RegisterForms Component', () => {
    const queryClient = new QueryClient();
    
    beforeEach(() => {
        jest.clearAllMocks();
    });


    const renderWithProvider = (ui) => {
        render(
            <QueryClientProvider client={queryClient}>
                <SnackbarProvider>
                    {ui}
                </SnackbarProvider>
            </QueryClientProvider>
        );
    };

    beforeEach(() => {
        useRouter.mockReturnValue(createMockRouter({}));
    });

    describe('Rendering', () => {
        it('renders UserForm by default', () => {
            renderWithProvider(<RegisterForms />);
            expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
            expect(screen.getAllByLabelText(/Password/i)[0]).toBeInTheDocument();
        });

        it('renders OrgForm when currentForm is set to org', async () => {
            renderWithProvider(<RegisterForms />);

            // Fill user form to transition to org form
            fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
            fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
            fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
            fireEvent.change(screen.getAllByLabelText(/Password/i)[0], { target: { value: 'password123' } });
            fireEvent.click(screen.getByRole('checkbox'));
            fireEvent.click(screen.getByRole('button', { name: /GET STARTED/i }));

            await waitFor(() => {
                expect(screen.getByLabelText(/Organization name/i)).toBeInTheDocument();
                expect(screen.getByLabelText(/Your position/i)).toBeInTheDocument();
            });
        });
    });

    describe('UserForm Validation', () => {
        it('shows validation errors on submit with empty fields in UserForm', async () => {
            renderWithProvider(<RegisterForms />);

            fireEvent.click(screen.getByRole('button', { name: /GET STARTED/i }));

            await waitFor(() => {
                expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
                expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
                expect(screen.getByText(/email is required/i)).toBeInTheDocument();
                expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
            });
        });
    });

    describe('OrgForm Validation', () => {
        it('shows validation errors on submit with empty fields in OrgForm', async () => {
            renderWithProvider(<RegisterForms />);

            // Fill user form to transition to org form
            fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
            fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
            fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
            fireEvent.change(screen.getAllByLabelText(/Password/i)[0], { target: { value: 'password123' } });
            fireEvent.click(screen.getByRole('checkbox'));
            fireEvent.click(screen.getByRole('button', { name: /GET STARTED/i }));

            await waitFor(() => {
                fireEvent.click(screen.getByRole('button', { name: /GET STARTED/i }));

                expect(screen.getByText(/Organization name is required/i)).toBeInTheDocument();
                expect(screen.getByText(/Position name is required/i)).toBeInTheDocument();
                expect(screen.getByText(/Identifier is required/i)).toBeInTheDocument();
                expect(screen.getByText(/country is required/i)).toBeInTheDocument();
                expect(screen.getByText(/currency is required/i)).toBeInTheDocument();
                expect(screen.getByText(/localization is required/i)).toBeInTheDocument();
                expect(screen.getByText(/company size is required/i)).toBeInTheDocument();
            });
        });
    });

    describe('Form Submission', () => {
        it('submits user form and transitions to org form', async () => {
            renderWithProvider(<RegisterForms />);

            fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
            fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
            fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
            fireEvent.change(screen.getAllByLabelText(/Password/i)[0], { target: { value: 'password123' } });
            fireEvent.click(screen.getByRole('checkbox'));
            fireEvent.click(screen.getByRole('button', { name: /GET STARTED/i }));

            await waitFor(() => {
                expect(screen.getByLabelText(/Organization name/i)).toBeInTheDocument();
            });
        });

        it('submits org form with valid data', async () => {
            const router = createMockRouter({});
            useRouter.mockReturnValue(router);
        
            renderWithProvider(<RegisterForms />);
        
            // Fill user form to transition to org form
            fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
            fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
            fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
            fireEvent.change(screen.getAllByLabelText(/Password/i)[0], { target: { value: 'password123' } });
            fireEvent.click(screen.getByRole('checkbox'));
            fireEvent.click(screen.getByRole('button', { name: /GET STARTED/i }));
        
            await waitFor(() => {
                // Check if the OrgForm is rendered
                expect(screen.getByLabelText(/Organization name/i)).toBeInTheDocument();
            });
        
            // Fill org form
            fireEvent.change(screen.getByLabelText(/Organization name/i), { target: { value: 'Test Organization' } });
            fireEvent.change(screen.getByLabelText(/Your position/i), { target: { value: 'CEO' } });
            fireEvent.change(screen.getByLabelText(/Identifier/i), { target: { value: '12345' } });
            fireEvent.change(screen.getByLabelText(/Choose a country/i), { target: { value: 'USA' } });
            fireEvent.change(screen.getByLabelText(/Currency/i), { target: { value: 'USD' } });
            fireEvent.change(screen.getByLabelText(/Localization/i), { target: { value: 'North America' } });
            fireEvent.change(screen.getByLabelText(/Company size/i), { target: { value: '100' } });
        
            fireEvent.click(screen.getByRole('button', { name: /GET STARTED/i }));
        
            await waitFor(() => {
                expect(screen.getByText(/registered successfully/i)).toBeInTheDocument();
                expect(router.push).toHaveBeenCalledWith('/login');
            });
        });
    });
});
