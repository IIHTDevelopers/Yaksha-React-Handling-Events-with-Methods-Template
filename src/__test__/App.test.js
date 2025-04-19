import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom/extend-expect'; // Importing jest-dom to use toBeInTheDocument

describe('boundary', () => {
    test('AppComponent boundary renders the Task List header', () => {
        render(<App />);
        const headerElement = screen.getByText('Task List');
        expect(headerElement).toBeInTheDocument();
    });

    test('AppComponent boundary renders all initial tasks', () => {
        render(<App />);
        const taskElements = screen.getAllByRole('heading', { level: 3 });
        expect(taskElements.length).toBe(3); // Ensure there are three tasks
    });

    test('AppComponent boundary renders the first task name and description', () => {
        render(<App />);
        const taskName = screen.getByText('Task 1');
        const taskDescription = screen.getByText('This is the first task');
        expect(taskName).toBeInTheDocument();
        expect(taskDescription).toBeInTheDocument();
    });

    test('AppComponent boundary renders the second task name and description', () => {
        render(<App />);
        const taskName = screen.getByText('Task 2');
        const taskDescription = screen.getByText('This is the second task');
        expect(taskName).toBeInTheDocument();
        expect(taskDescription).toBeInTheDocument();
    });

    test('AppComponent boundary renders the third task name and description', () => {
        render(<App />);
        const taskName = screen.getByText('Task 3');
        const taskDescription = screen.getByText('This is the third task');
        expect(taskName).toBeInTheDocument();
        expect(taskDescription).toBeInTheDocument();
    });

    test('AppComponent boundary indicates if a task is completed', () => {
        render(<App />);
        const statusElement = screen.getByText('Status: Completed'); // Check the status text
        expect(statusElement).toBeInTheDocument();
    });

    test('AppComponent boundary adds a new task when the form is submitted', () => {
        render(<App />);

        // Fill in the new task form
        fireEvent.change(screen.getByPlaceholderText('Task Name'), { target: { value: 'New Task' } });
        fireEvent.change(screen.getByPlaceholderText('Task Description'), { target: { value: 'This is a new task' } });

        // Submit the form
        fireEvent.click(screen.getByText('Add Task'));

        // Check if the new task is rendered
        const taskName = screen.getByText('New Task');
        const taskDescription = screen.getByText('This is a new task');
        expect(taskName).toBeInTheDocument();
        expect(taskDescription).toBeInTheDocument();
    });

    test('AppComponent boundary resets the form after adding a new task', () => {
        render(<App />);

        // Fill in the new task form
        fireEvent.change(screen.getByPlaceholderText('Task Name'), { target: { value: 'New Task' } });
        fireEvent.change(screen.getByPlaceholderText('Task Description'), { target: { value: 'This is a new task' } });

        // Submit the form
        fireEvent.click(screen.getByText('Add Task'));

        // Check if the form fields are reset
        const nameInput = screen.getByPlaceholderText('Task Name');
        const descriptionInput = screen.getByPlaceholderText('Task Description');
        expect(nameInput.value).toBe('');
        expect(descriptionInput.value).toBe('');
    });
});
