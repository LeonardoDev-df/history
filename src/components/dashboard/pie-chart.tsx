import { PieChart, Pie, ResponsiveContainer, Tooltip } from 'recharts'

import {
    Container,
    Main,
    Divider,
    Footer,
    StClock,
    ChartContainer,
    BodyContainer
} from './styles'

const data01 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 }
]
const data02 = [
    { name: 'J. Kub', value: 15 },
    { name: 'Os. Nie', value: 24 },
    { name: 'C. Alm', value: 30 },
    { name: 'Mu. Agr', value: 8 }
]

export function CustomPieChart() {
    return (
        <Container>
            <ChartContainer colorType="orange">
                <ResponsiveContainer aspect={4 / 3}>
                    <PieChart>
                        {/* <Pie
                            data={data01}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            outerRadius={25}
                            fill="#fff"
                            stroke="#fb8c00"
                        /> */}
                        <Pie
                            data={data02}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            innerRadius={35}
                            outerRadius={55}
                            fill="#ffffff"
                            stroke="#fb8c00"
                            label
                        />
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </ChartContainer>
            <BodyContainer>
                <Main>
                    <h3>Likes por sítios</h3>
                    <p>Última campanha de likes</p>
                </Main>

                <Footer>
                    <Divider />
                    <StClock />
                    <small>atualizado a 1 dia atrás</small>
                </Footer>
            </BodyContainer>
        </Container>
    )
}
