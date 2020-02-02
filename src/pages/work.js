import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import Layout from "../components/Layout";
import { LayoutContainer } from "../components/Layout";
import colors from "styles/colors";
import dimensions from "styles/dimensions";
import Company from "../components/work/Company"
import Educator from "../components/work/Educator"
import Join from "../components/work/Join"
import Role from "../components/work/Role"

const WorkTitle = styled("h1")`
    margin-bottom: 1em;
`

const Section = styled("div")`
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    @media(max-width:${dimensions.maxwidthTablet}px) {
        margin-bottom: 4em;
    }

    &:nth-child(even) {
        background-color: ${colors.visorblue};
        color: white;
    }

    &:last-of-type {
        margin-bottom: 0;
    }
`

const Work = ({ companies, meta }) => (
    <>
        <Helmet
            title={`Work | Prist, Gatsby & Prismic Starter`}
            titleTemplate={`%s | Work | Prist, Gatsby & Prismic Starter`}
            meta={[
                {
                    name: `description`,
                    content: meta.description,
                },
                {
                    property: `og:title`,
                    content: `Work | Prist, Gatsby & Prismic Starter`,
                },
                {
                    property: `og:description`,
                    content: meta.description,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: meta.author,
                },
                {
                    name: `twitter:title`,
                    content: meta.title,
                },
                {
                    name: `twitter:description`,
                    content: meta.description,
                },
            ].concat(meta)}
        />
        <Layout>
            <Section>
                <LayoutContainer>
                    <Role />
                </LayoutContainer>
            </Section>
            <Section id='teacher'>
                <LayoutContainer>
                    <Educator />
                </LayoutContainer>
            </Section>
            <Section id='company'>
                <LayoutContainer>
                    <Company companies={companies}/>
                </LayoutContainer>
            </Section>
            <Section id='university'>
                <LayoutContainer>
                    <Join />
                </LayoutContainer>
            </Section>
        </Layout>
    </>
);

export default ({ data }) => {
    const companies = data.prismic.allCompanys.edges;
    const meta = data.site.siteMetadata;

    if (!companies) return null;

    return (
        <Work companies={companies} meta={meta}/>
    )
}

Work.propTypes = {
    companies: PropTypes.array.isRequired,
};

export const query = graphql`
    {
        prismic {
            allCompanys {
                edges {
                    node {
                        company_logo
                        company_name
                        company_website {
                            _linkType
                            ... on PRISMIC__ExternalLink {
                                _linkType
                                url
                            }
                        }
                    }
                }
            }
        }
        site {
            siteMetadata {
                title
                description
                author
            }
        }
    }
`

