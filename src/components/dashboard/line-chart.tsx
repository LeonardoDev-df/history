import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts'

import {
    Container,
    ChartContainer,
    Divider,
    Footer,
    Main,
    StClock,
    BodyContainer
} from './styles'

interface ChartProps {
    data: any[]
}

export function CustomLineChart({ data }: ChartProps) {
    return (
        <Container>

                <ResponsiveContainer width="100%" aspect={4 / 1.5}>
                    <LineChart data={data}>
                        <XAxis
                            dataKey="name"
                            stroke="#ffffff"
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#ffffff"
                            tickLine={false}
                            axisLine={false}
                        />

                        <Line
                            type="monotone"
                            dataKey="ActiveUser"
                            stroke="#ffffff"
                            color="#000"
                        />

                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(255, 255, 255, 0.25)"
                        />
                        <Tooltip
                            labelStyle={{
                                color: 'black'
                            }}
                            itemStyle={{
                                color: 'rgba(89,166,243,1)'
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
           
            <BodyContainer>
                <Main>
                    <h3>Usuários ativos</h3>
                    <p>Última campanha de perfomance</p>
                </Main>

                <Footer>
                    <Divider />
                    <StClock />
                    <small>atualizado a 4 minutos atrás</small>
                </Footer>
            </BodyContainer>
        </Container>
    )
}
