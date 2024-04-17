import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Swal from 'sweetalert2';
import { FaTrash } from 'react-icons/fa';



const Todolist = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/todos")
            .then((response) => response.json())
            .then((data) => {
                setTodos(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleAddTodo = async () => {
        if (!newTodo.trim()) {
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ description: newTodo }),
            });
            if (response.ok) {
                const responseData = await response.json();
                setTodos(responseData.todos);
                setNewTodo("");
                Swal.fire('Success', 'Todo added successfully', 'success');
                setTimeout(() => {
                    setAlertMessage("");
                }, 3000); 
            } else {
                console.error("Failed to add todo");
            }
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    const handleDeleteTodo = async (id) => {
        const todoToDelete = todos.find(todo => todo.id === id);
        const description = todoToDelete ? todoToDelete.description : '';
    
        const result = await Swal.fire({
            title: 'Are you sure?',
            html: `You are about to delete the following todo,<strong>${description}</strong>`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        });
    
        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:5000/todos/${id}`, {
                    method: "DELETE",
                });
    
                if (response.ok) {
                    const updatedTodos = await response.json();
                    setTodos(updatedTodos);
                    Swal.fire('Deleted!', `Todo "${description}" has been deleted.`, 'success');
                } else {
                    console.error("Failed to delete todo");
                }
            } catch (error) {
                console.error("Error deleting todo:", error);
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelled', 'Your todo is safe :)', 'error');
        }
    };
    
    
    

    return (
        <>
            <Navbar />
            <div className="container mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Todo List</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Enter todo description"
                        className="border border-gray-300 rounded px-2 py-1 mr-2 focus:outline-none focus:border-blue-500"
                    />
                    <button
                        onClick={handleAddTodo}
                        className="bg-blue-500 text-white px-4 py-1 rounded focus:outline-none hover:bg-blue-600"
                    >
                        Add Todo
                    </button>
                    {alertMessage && <div className="text-green-600">{alertMessage}</div>}
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {todos.map((todo) => (
                        <div
                            key={todo.id}
                            className="bg-white p-4 rounded shadow-md flex items-center justify-between"
                        >
                            <p className="text-sm text-gray-600">{todo.description}</p>
                            <button
                                onClick={() => handleDeleteTodo(todo.id)}
                                className="text-red-500"
                            >
                             <FaTrash />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Todolist;
