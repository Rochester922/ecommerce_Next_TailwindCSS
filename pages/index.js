import { useEffect } from 'react'
import { getLocaleDirection } from 'aryana'
import { Grid, Card, Text, useTheme } from '@geist-ui/core'
import essentials from '../helpers/getEssentials'

export default function ({ auth }) {
    const {
        config,
        i18n,
        useThemeProvider,
        useAuth,
        useRouter,
        Link,
        Head,
        axios,
        useMeta,
    } = essentials

    const { setMeta } = useMeta()
    const theme = useTheme()
    const { locale = config['defaultLocale'] } = useRouter()
    const { isAuthenticated, setLocalAuthentication } = useAuth()

    useEffect(() => {
        setLocalAuthentication(auth)
    }, [])

    const { title, description, content } = i18n['pages']['index']

    useEffect(() => {
        setMeta({
            title: title[locale],
            description: description[locale],
            image: 'https://i.imgur.com/NitQE9d.jpg',
        })
    }, [locale])

    return (
        <Grid.Container gap={1}>
            <Grid xs={24}>
                <Card
                    width="100%"
                    style={{
                        backgroundColor: theme.palette.accents_1,
                    }}
                >
                    <Text
                        type="secondary"
                        style={{
                            direction: getLocaleDirection(locale),
                        }}
                    >
                        {content[locale]}
                    </Text>
                </Card>
            </Grid>
        </Grid.Container>
    )
}

export async function getServerSideProps(ctx) {
    const { AJWT } = ctx.req.cookies

    return {
        props: { auth: AJWT ? true : false },
    }
}
