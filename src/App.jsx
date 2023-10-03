// import { useState } from 'react'

import './App.css'
import { Button, Container, Form } from 'react-bootstrap'
import ProductsTable from './components/ProductsTable.jsx'
import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'

async function fetchProducts() {
    return (
        await axios.get('https://63fa69b9897af748dccebef2.mockapi.io/items?')
    ).data
}

async function createProduct(data) {
    return await axios.post(
        'https://63fa69b9897af748dccebef2.mockapi.io/items?',
        data
    )
}

function App() {
    const queryClient = useQueryClient()
    const { data, isLoading } = useQuery('products', fetchProducts)

    const mutation = useMutation((newProduct) => createProduct(newProduct), {
        onSuccess: () => queryClient.invalidateQueries(['products']),
    })

    // const mutationDelete = useDeleteJob((oldData, id) =>
    //     oldData.filter((item) => item.id !== id)
    // )

    // const onDelete = async (id) => {
    //     try {
    //         await mutationDelete.mutateAsync(id)
    //     } catch (e) {
    //         pushNotification(`Cannot delete the job`)
    //     }
    // }

    if (isLoading) {
        return <h3>Идет загрузка...</h3>
    }

    if (!data) {
        return <h3>Нет данных.</h3>
    }

    const onSubmit = (event) => {
        event.preventDefault()

        const formData = new FormData(event.target)
        const fields = Object.fromEntries(formData)
        console.log(fields)
        mutation.mutate(fields)
        event.target.reset()
    }

    return (
        <Container style={{ marginTop: 30, maxWidth: 600 }}>
            <ProductsTable data={data} />

            <hr />

            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control
                        name="name"
                        type="text"
                        placeholder="Название"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        name="price"
                        type="number"
                        placeholder="Цена"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Добавить
                </Button>
            </Form>
        </Container>
    )
}

export default App
