import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AddTaskModal } from "./AddTaskModal";

const mockAddTask = jest.fn();
const mockOnClose = jest.fn();

const mockFormValues = {
  title: "New Task",
  description: "Some description",
};

jest.mock("../../store/tasksStore", () => ({
  useTaskActions: () => ({
    addTask: mockAddTask,
  }),
}));

describe("AddTaskModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls addTask and onClose on valid submit", async () => {
    render(<AddTaskModal isOpen={true} onClose={mockOnClose} />);

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: mockFormValues.title },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: mockFormValues.description },
    });

    fireEvent.click(screen.getByRole("button", { name: /^add$/i }));

    await waitFor(() => {
      expect(mockAddTask).toHaveBeenCalledWith(mockFormValues);
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it("does not call addTask if validation fails", async () => {
    render(<AddTaskModal isOpen={true} onClose={mockOnClose} />);

    fireEvent.click(screen.getByRole("button", { name: /^add$/i }));

    await waitFor(() => {
      expect(mockAddTask).not.toHaveBeenCalled();
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  it("displays error messages if validation fails", async () => {
    render(<AddTaskModal isOpen={true} onClose={mockOnClose} />);

    fireEvent.click(screen.getByRole("button", { name: /^add$/i }));

    await waitFor(() => {
      const errors = screen.getAllByText(/field is required/i);
      expect(errors).toHaveLength(2);
    });
  });
});
