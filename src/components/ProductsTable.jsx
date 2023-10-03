import axios from 'axios'
import { Button, Table } from 'react-bootstrap'
import { useMutation, useQueryClient } from 'react-query'

async function deleteProduct(id) {
    return await axios.delete(
        `https://63fa69b9897af748dccebef2.mockapi.io/items/${id}`
    )
}

const ProductsTable = ({ data }) => {
    const queryClient = useQueryClient()
    const mutation = useMutation((id) => deleteProduct(id), {
        onSuccess: () => queryClient.invalidateQueries(['products']),
    })

    async function deleteProductItem(id) {
        await mutation.mutate(id)
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {data &&
                    data.map((obj) => (
                        <tr
                            key={obj.id}
                            onClick={() => deleteProductItem(obj.id)}
                        >
                            <td>{obj.id}</td>
                            <td>{obj.name}</td>
                            <td>{obj.price}</td>
                            <td>
                                <Button variant="primary">Delete</Button>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </Table>
    )
}

export default ProductsTable
