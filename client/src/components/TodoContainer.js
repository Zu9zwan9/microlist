import React, {useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import {Route, Routes} from 'react-router-dom';
import Header from './Header';
import InputTodo from './InputTodo';
import TodosList from './TodosList';
import About from '../pages/About';
import NotMatch from '../pages/NotMatch';
import Navbar from './Navbar';

const TodoContainer = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        console.log('fetching');
        fetch('/api/todos/get-items', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
            .then((res) => res.json())
            .then((data) => {
                setTodos(data.messages);
            });
    }, []);

    const handleChange = (id) => {
        const newState = !todos.filter((s) => s.id === id)[0].completed;
        setTodos((prevState) => prevState.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completed: !todo.completed,
                };
            }
            return todo;
        }));
        const result = fetch('/api/todos/update', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    itemId: id,
                    completed: newState,
                },
            ),
        });
        console.log(result);
    };

    const delTodo = (id) => {
        setTodos([...todos.filter((todo) => todo.id !== id)]);
        const result = fetch('/api/todos/delete', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    itemId: id,
                },
            ),
        });
        console.log(result);
    };

    const addTodoItem = (title) => {
        const result = fetch('/api/todos/save-item', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    item: {
                        title,
                        completed: false,
                    },
                },
            ),
        });
        console.log(result);
        const newTodo = {
            id: uuidv4(),
            title,
            completed: false,
        };
        setTodos([...todos, newTodo]);
    };

    const setUpdate = (updatedTitle, id) => {
        const result = fetch('/api/todos/update', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    itemId: id,
                    title: updatedTitle,
                    completed: false,
                },
            ),
        });
        console.log(result);
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    // eslint-disable-next-line no-param-reassign
                    todo.title = updatedTitle;
                }
                return todo;
            }),
        );
    };

    return (
        <div className="container">
            <div className="inner">
                <Routes>
                    <Route
                        path="/"
                        element={(
                            <>
                                <Navbar/>
                                <Header/>
                                <InputTodo addTodoProps={addTodoItem}/>
                                <TodosList
                                    todos={todos}
                                    handleChangeProps={handleChange}
                                    deleteTodoProps={delTodo}
                                    setUpdate={setUpdate}
                                />
                            </>
                        )}
                    />
                    <Route path="/about" element={<About/>}/>
                    <Route path="/about" element={<NotMatch/>}/>
                </Routes>
            </div>
        </div>
    );
};

export default TodoContainer;
