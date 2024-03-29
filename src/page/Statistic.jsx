import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout/Layout'
import { Card, Col, DatePicker, Row, Table } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { handleStatisticOrder } from '../redux/reducers/order.slice';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const { RangePicker } = DatePicker;

const Statistic = () => {
    const dispatch = useDispatch();
    const { statisticOrder, subtotalStatistic } = useSelector((state) => state.orderReducer);

    const [data, setData] = useState({});

    const handleChooseDate = async (date, dateString) => {
        const startDate = moment(dateString[0]).unix();
        const endDate = moment(dateString[0]).unix();

        dispatch(handleStatisticOrder(startDate, endDate));
    }

    useEffect(() => {
        let labelDate = [];
        let colorLabel = []
        let listTotal = [];
        statisticOrder.map(item => {
            let subtotal = item.products.reduce((prev, current) => prev + current.price * current.quantity, 0);
            labelDate.push(moment(item.createdAt).format("DD-MM-YYYY"));
            colorLabel.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
            listTotal.push(subtotal);
        });

        let dataStatistic = {
            labels: labelDate,
            datasets: [
                {
                    label: "Total",
                    data: listTotal,
                    backgroundColor: colorLabel,
                    borderWidth: 1
                }
            ]
        }
        setData(dataStatistic);
    }, [statisticOrder])

    return (
        <Layout>
            <div id="" style={{ padding: "20px" }}>
                <h3>Thống kê</h3>
                <RangePicker onChange={handleChooseDate} />

                <div style={{ padding: "15px 0" }}>
                    <h2>Tổng: ${subtotalStatistic}</h2>
                </div>

                <Row gutter={[8, 8]}>
                    <Col span={24} sm={24} md={16}>
                        <Card
                            size="small"
                            title=""
                            className="product"
                            bodyStyle={{ height: 'calc(100vh - 150px)', overflow: 'auto' }}
                        >
                            <Table dataSource={statisticOrder} size="middle" pagination={false}>
                                <Table.Column title="ID" dataIndex="_id" />
                                {/* <Table.Column title="Quantity Item" dataIndex="products" render={(_, product) => <span>{product.products && product.products.length}</span>} />
                                <Table.Column title="Products" dataIndex="products" render={(_, product) => (
                                    product.products && product.products.map(item => <span>{item.name}, </span>)
                                )} /> */}
                                <Table.Column title="Tổng" dataIndex="products" render={(_, product) => {
                                    let subtotal = product.products.reduce((prev, current) => prev + current.price * current.quantity, 0);
                                    return (
                                        <span>${subtotal}</span>
                                    )
                                }} />
                                <Table.Column title="Ngày mua" dataIndex="createdAt" render={(_, createdAt) => <span>{moment(createdAt).format("DD-MM-YYYY")}</span>} />
                            </Table>
                        </Card>
                    </Col>
                    <Col span={24} sm={24} md={8}>
                        {statisticOrder && statisticOrder.length &&
                            <Pie size="medium" data={data} />
                        }
                    </Col>
                </Row>

            </div>
        </Layout>
    )
}

export default Statistic