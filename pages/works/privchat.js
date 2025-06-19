import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Work = () => {
    return (
        <Layout title="PrivChat - PII Detection Web Application with NER and Text Sanitation through LLMs">
            <Container>
                <Title>
                    PrivChat - PII Detection Web Application with NER and Text
                    Sanitation through LLMs <Badge>2025</Badge>
                </Title>
                <P>
                    A privacy-focused web application that detects Personally
                    Identifiable Information (PII) in text using advanced NLP
                    techniques and provides AI-powered paraphrasing to help
                    users protect their sensitive information. It leverages
                    Named Entity Recognition (NER) and Large Language Models
                    (LLMs) to identify and sanitize PII, ensuring that users can
                    share information securely without compromising their
                    privacy.
                </P>
                <List ml={4} my={4}>
                    <ListItem>
                        <Meta>Website</Meta>
                        <Link href="https://github.com/tanush-g/llm-task">
                            https://github.com/tanush-g/llm-task
                            <ExternalLinkIcon mx="2px" />
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Meta>Platform</Meta>
                        <span>Web/Windows/MacOS/Linux/Source</span>
                    </ListItem>
                    <ListItem>
                        <Meta>Stack</Meta>
                        <span>
                            Python, FastAPI, SpaCy, Google AI Studio, HTML, CSS,
                            Javascript
                        </span>
                    </ListItem>
                </List>

                <WorkImage src="/images/works/ner.webp" alt="PrivChat NER" />
                <WorkImage
                    src="/images/works/demo.gif"
                    alt="PrivChat Demo"
                    unoptimized
                />
            </Container>
        </Layout>
    )
}

export default Work
