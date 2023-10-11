import { Sheet, Table, Typography } from "@mui/joy";
import { useGetProductsQuery } from "../services/api";
import { IProduct } from "../services/models";

export const ProductsTable = () => {
    const { data, isLoading } = useGetProductsQuery({});
    return (
        <Sheet sx={{ padding: '0px 100px' }}>
            <Table
                color="neutral"
                size="lg"
                variant="outlined"
                stickyFooter
                stickyHeader
            >
                <thead>
                    <tr>
                        <th style={{ width: '5%' }} hidden>Id</th>
                        <th>Name</th>
                        <th>Owner&nbsp;(g)</th>
                        <th>Developers&nbsp;(g)</th>
                        <th>Scrum Master&nbsp;(g)</th>
                        <th>Start date&nbsp;(g)</th>
                        <th style={{ width: '5%' }}>Methodology&nbsp;(g)</th>
                        <th style={{ width: '10%' }}>Location&nbsp;(g)</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((prod: IProduct) => <tr key={prod.productId}>
                        <td hidden><Typography level="body-lg">{prod.productId} </Typography ></td>
                        <td><Typography level="body-lg">{prod.productName} </Typography ></td>
                        <td><Typography level="body-lg">{prod.productOwnerName} </Typography ></td>
                        <td>{prod.Developers.map((dev) => <div key={dev}> <Typography level="body-sm">{dev} </Typography ></div>)}</td>
                        <td><Typography level="body-lg">{prod.scrumMasterName} </Typography ></td>
                        <td><Typography level="body-lg">{new Date(prod.startDate).toLocaleDateString()} </Typography ></td>
                        <td><Typography level="body-lg">{prod.methodology} </Typography ></td>
                        <td><Typography level="body-lg">{prod.location} </Typography ></td>
                    </tr>)}
                </tbody>
                <tfoot >
                    <tr>
                        <td>Total products: {data?.length}</td>
                    </tr>
                </tfoot>
            </Table>
        </Sheet >
    );
}
