import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { FaArrowDown, FaArrowUp, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdDeleteForever, MdOutlineGridView } from "react-icons/md";

const Home = () => {
    const [rows, setRows] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortBy, setSortBy] = useState('grandTotal'); 
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/products');
                setRows(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`http://localhost:8080/api/products/${id}`);
                const updatedRows = rows.filter(row => row.id !== id);
                setRows(updatedRows);
                toast.success(`Product with ID ${id} deleted successfully!`);
            } catch (error) {
                console.error('Error deleting product:', error);
                toast.error(`Failed to delete product with ID ${id}`);
            }
        }
    };

    const sortRows = () => {
        return [...rows].sort((a, b) => {
            if (sortBy === 'grandTotal') {
                return sortOrder === 'asc' ? a.grandTotal - b.grandTotal : b.grandTotal - a.grandTotal;
            } else if (sortBy === 'createdAt') {
                return sortOrder === 'asc' ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt);
            }
            return 0;
        });
    };

    const sortedRows = sortRows();

    const filteredRows = sortedRows.filter(row =>
        row.grandTotal.toString().includes(searchTerm)
    );

    return (
        <div className='container'>
            <Row className='align-items-center'>
                <Col md={2} className="d-flex">
                    <h1>OrderList</h1>
                </Col>
                <Col md={3}>
                    <Button
                        onClick={() => { setSortOrder('asc'); setSortBy('grandTotal'); }}
                        style={{ backgroundColor: "blue", color: "white" }}>
                        <FaArrowUp />
                        Asc Total
                    </Button> &nbsp;
                    <Button
                        onClick={() => { setSortOrder('desc'); setSortBy('grandTotal'); }} 
                        style={{ backgroundColor: "blue", color: "white" }}>
                        <FaArrowDown />
                        Des Total
                    </Button> &nbsp;
                </Col>
                <Col md={3}>
                    <Button
                        onClick={() => { setSortOrder('asc'); setSortBy('createdAt'); }} 
                        style={{ backgroundColor: "green", color: "white" }}>
                        <FaArrowUp />
                        Asc Date
                    </Button> &nbsp;
                    <Button
                        onClick={() => { setSortOrder('desc'); setSortBy('createdAt'); }} 
                        style={{ backgroundColor: "green", color: "white" }}>
                        <FaArrowDown />
                        Des Date
                    </Button>
                </Col>
                <Col md={2}>
                    <input
                        type="text"
                        placeholder='search by total'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Col>

                <Col md={2} className="text-md-end mt-2 mt-md-0">
                    <div className='d-flex gap-5'>
                        <Button
                            style={{ backgroundColor: "darkorange", border: "2px solid darkorange" }}
                            onClick={() => navigate('/create')}
                            className='d-flex align-items-center'>
                            <FaPlus />Create
                        </Button>
                    </div>
                </Col>
            </Row>

            <Table bordered>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Order Id</th>
                        <th>Total Amount</th>
                        <th>Show</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRows
                        .filter((order, index, self) =>
                            index === self.findIndex((o) => o.ord_id === order.ord_id)
                        )
                        .map((order, index) => (
                            <tr key={order.id}>
                                <td>{index + 1}</td>
                                <td>{order.ord_id}</td>
                                <td>{order.grandTotal}</td>
                                <td>
                                    <span className='d-flex gap-5'>
                                        <Button
                                            style={{ backgroundColor: "darkorange", border: "2px solid darkorange" }}
                                            onClick={() => navigate(`/orderlist/${order.ord_id}`)}
                                            className='d-flex align-items-center'
                                        >
                                            <MdOutlineGridView /> View
                                        </Button>
                                        <Button
                                            style={{ backgroundColor: "red", border: "2px solid red" }}
                                            onClick={() => handleDelete(order.ord_id)}
                                            className='d-flex align-items-center'
                                        >
                                            <MdDeleteForever /> Delete
                                        </Button>
                                    </span>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Home;
