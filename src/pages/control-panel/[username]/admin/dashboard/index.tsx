import {
    Container,
    Paper
} from '../../../../../styles/pages/shared/control-panel.styles'
import { Grid, ChartBack } from '../../../../../styles/pages/dashboard'
import { CustomLineChart } from '../../../../../components/dashboard/line-chart'
import { CustomPieChart } from '../../../../../components/dashboard/pie-chart'
import { InfoCard } from '../../../../../components/dashboard/info-card'
import { SidebarLayout } from '../../../../../components/layouts/sidebar-layout'
import Head from '../../../../../infra/components/Head'

function Dashboard() {
    const data = [
        {
            name: 'Jan',
            ActiveUser: 4000
        },
        {
            name: 'Fev',
            ActiveUser: 3000
        },
        {
            name: 'Mar',
            ActiveUser: 2800
        },
        {
            name: 'Abr',
            ActiveUser: 1900
        },
        {
            name: 'Mai',
            ActiveUser: 5600
        },
        {
            name: 'Jun',
            ActiveUser: 3500
        }
    ]

    return (
        <Container>
            <Head title="Painel Administrativo | RVHistory" />
            <Grid autoFit>
                <ChartBack>
                    <InfoCard
                        iconType="house"
                        title="Sítios registrados"
                        content="25"
                        colorType="green"
                    />
                </ChartBack>

                <ChartBack>
                    <InfoCard
                        iconType="body"
                        title="Usuários registrados"
                        content="200"
                    />
                </ChartBack>
            </Grid>
            <Grid>
                <ChartBack colBg="1/9" colMd="1/8" colSm="1/13">
                    <CustomLineChart data={data} />
                </ChartBack>
                <ChartBack colBg="9/13" colMd="8/13" colSm="1/13">
                    <CustomPieChart />
                </ChartBack>
            </Grid>
        </Container>
    )
}

Dashboard.Layout = SidebarLayout

export default Dashboard
